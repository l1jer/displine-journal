# Promise

- [Promise](#promise)
  - [异步编程](#异步编程)
  - [异步状态](#异步状态)
    - [状态说明](#状态说明)
    - [动态改变](#动态改变)
  - [then](#then)
    - [语法说明](#语法说明)
    - [基础知识](#基础知识)
    - [链式调用](#链式调用)
    - [其他类型](#其他类型)
      - [循环调用](#循环调用)
      - [promise](#promise-1)
      - [Thenables](#thenables)
  - [catch](#catch)
    - [处理机制](#处理机制)
    - [定制错误](#定制错误)
  - [Finally](#finally)

## 异步编程

JS 中存在很多异步操作, `Promise` 将异步操作队列化, 按照期望的顺序执行, 返回符合预期的结果, 可以通过链式调用多个 `Promise` 达到目的.

> Promise 在普遍开源库中已经实现, 现在标准化后被浏览器默认支持.

> Promise 是一个拥有 `then` 方法的对象/函数

在没有 `promise` 的时候, 一些问题会造成处理缓慢和不便阅读的代码.

比如 **定时嵌套** (一个定时器执行结束后, 执行另一个定时器, 造成代码不易阅读), **图片加载**(图片设置边框,需要使用回调函数处理, 代码嵌套较复杂), **加载文件**(异步加载外部 JS 需要回调函数执行,并设置错误处理回调函数, 如果是多个脚本还需要嵌套, 不断的回调函数操作将产生回调地狱,使代码难维护), **异步请求**(也会产生回调嵌套的问题).

## 异步状态

现实中举例子的话, promise 可以理解为承诺, 取餐凭票, 餐做好了叫我们=成功, 如果没有食材了无法提供我们食物了=拒绝, 而其中一个 `promise` 必须有一个 `then` 方法用于处理状态改变.

### 状态说明

`pending`: 等待状态, `promise` 状态 = 初始化, 在得到结果前都是 `pending`;
`resolve`: 已经解决, `promise` 状态 = `fulfilled`, 并告知结果;
`reject`: 拒绝处理, `promise` 状态 = `rejected`, 并告知结果;

`promise` 是生产者, 是队列状态, 非常适合需要一定执行时间的异步任务, 其状态一旦改变则不可更改.

### 动态改变

实例中, p2 返回了 p1, 所以此时 p2 的状态已经没有了意义, 后面的 then 是对 p1 状态的处理.

```js
const p1 = new Promise((resolve, reject) => {
  // resolve("fulfilled")
  reject("rejected");
});

const p2 = new Promise((resolve) => {
  resolve(p1);
}).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
```

倘若 `resolve` 参数是一个 `promise`, 将会改变 `promise` 状态, 如下, p1 状态被改变为 p2 的状态:

```js
const p1 = new Promise((resolve, reject) => {
  resolve(
    // p2
    new Promise((s, e) => {
      s("success");
    })
  );
}).then((msg) => {
  console.log(msg);
});
```

当 promise 作为参数传递时, 需要等待 promise 执行完才可以继承, 下面的 p2 需要等待 p1 执行完成

- 因为 p2 的 resolve 返回了 p1 的 promise, 此时 p2 的 then 方法已经是 p1 的了;
- 因此 then 的第一个函数输出了 p1 的 resolve 的参数

## then

一个 `promise` 需要提供一个 `then`方法来访问 `promise`的结果, `then` 用于定义当 `promise` 状态发生改变时的处理, 即 `promise` 处理异步操作, 而 `then` 来处理结果.

- `then` 方法必须返回 `promise`, 用户返回或者系统自动返回
- 第一个函数在 `resolved` 状态时执行 => 执行 `resolve` 时执行 then 第一个函数 => 处理成功状态
- 第二个函数在 `rejected` 状态时执行 => 执行 `reject` 时执行第二个函数 => 处理失败状态, 其函数是可选的.
- 两个函数都接收 `promise` 传出的值 => 参数
- `catch` 可以用来处理失败状态
- 如果 `then` 返回 `promise`, 下一个 `then` 会在当前 `promise` 状态改变后执行.

### 语法说明

onFulfilled -> fulfilled 状态,
onRejected -> rejected 状态
两者不是函数将被忽略, 都只会被调用一次,

```js
promise.then(onFulfilled, onRejected);
```

### 基础知识

第一个函数在 `resolved` 状态时执行 => 执行 `resolve` 时执行 then 第一个函数 => 处理成功状态

- 如果只关心成功, 则不需要传递 then 的第二参数

```js
const promise = new Promise((resolve, reject) => {
  resolve("success");
}).then(
  (value) => {
    console.log("解决:${value}");
  },
  (reason) => {
    console.log("拒绝:${reason}");
  }
);
```

第二个函数在 `rejected` 状态时执行 => 执行 `reject` 时执行第二个函数 => 处理失败状态, 其函数是可选的.

```js
const promise = new Promise((resolve, reject) => {
  reject("is error");
});
// 这里是想告诉自己 promise.then 可以单独拿出来写
promise.then(
  (msg) => {
    console.log(`success`);
  },
  (error) => {
    console.log("failure");
  }
);
```

如果只关心成功则不需要传递 then 的第二个参数:

```js
const promise = new Promise((resolve, reject) => {
  resolve("success");
});
promise.then((msg) => {
  console.log("成功:${msg}");
});
```

同样如果只关心失败时状态, then 的第一个参数传递 null:

```js
const promise = new Promise((resolve, reject) => {
  reject("is err");
});
promise.then(null, (err) => {
  console.log("${err}");
});
```

promise 传向 then 的传递值, 如果 then 没有可处理函数, 会一直向后传递:

```js
let p1 = new Promise((resolve, reject) => {
  reject("rejected");
})
  .then()
  .then(null, (f) => console.log(f));
```

如果 onFulfilled 不是函数且 promise 执行成功, 下例 p2 执行成功并返回相同值:

```js
let promise = new Promise((resolve, reject) => {
  resolve("resolve");
});
let p2 = promise.then();
p2.then().then((resolve) => {
  console.log(resolve);
});
```

同理, onRejected 不是函数且 promise 拒绝执行, p2 拒绝执行并返回相同值:

```js
let promise = new Promise((resolve, reject) => {
  reject("rejected");
});
let p2 = promise.then(() => {});
p2.then(null, null).then(null, (reject) => {
  console.log(reject);
});
```

### 链式调用

每次的 then 都是一个全新的 promise, 默认 then 返回的 promise 状态是 fulfilled.

```js
let promise = new Promise((resolve, reject) => {
  resolve("fulfilled");
})
  .then((resolve) => {
    console.log(resolve);
  })
  .then((resolve) => {
    console.log(resolve);
  });
```

每次的 then 都是一个全新的 promise, 上一个 promise 状态 不会影响以后 then 返回的状态:

```js
let p1 = new Promise((resolve) => {
  resolve();
});
let p2 = p1.then(() => {
  console.log("jerry");
});
p2.then(() => {
  console.log("Jer?");
});
console.log(p1); // Promise {<resolved>}
console.log(p2); // Promise {<pending>}

// 如果放在setTimeout里
setTimeout(() => {
  console.log(p1); // Promise {<resolved>}
  console.log(p2); // Promise {<resolved>}
});
```

then 如果是处理上一个 promise 的 rejected, 每个 then 会是一个新的 promise -> 默认传递 fulfilled 状态:

```js
new Promise((resolve, reject) => {
  reject();
})
  .then(
    (resolve) => console.log("fulfilled"),
    (reject) => console.log("rejected")
  )
  .then(
    (resolve) => console.log("fulfilled"),
    (reject) => console.log("rejected")
  )
  .then(
    (resolve) => console.log("fulfilled"),
    (reject) => console.log("rejected")
  );
/* 结果如下
rejected
fulfilled
fulfilled
Promise {<resolved>: undefined}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined
*/
```

内部返回 promise 时将使用该 promise:

```js
let p1 = new Promise((resolve) => {
  resolve();
});
let p2 = p1.then(() => {
  return new Promise((r) => {
    r("jerry");
  });
});
p2.then((v) => {
  console.log(v);
});
// jerry
// Promise {<resolved>: undefined}
```

如果 then 返回 promise 时, 后面的 then 就是对返回的 promise 的处理, 需要等待该 promise 变更状态后执行:

```js
let promise = new Promise((resolve) => resolve());
let p1 = promise
  .then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("p1");
        resolve();
      }, 2000);
    });
  })
  .then(() => {
    return new Promise((a, b) => {
      console.log("p2");
    });
  });
```

如果 then 返回 promise 时, 返回的 promise 后面的 then 就是处理这个 promise 的. 但是如果没有 return 的话就不会这样执行, 外层 then 的 promise 和内层的 promise 是相互独立的

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then((v) => {
    return new Promise((resolve, reject) => {
      resolve("2nd promise");
    });
  })
  .then((value) => {
    console.log(value);
    return value;
  })
  .then((value) => {
    console.log(value);
  });
```

### 其他类型

Promise 解决过程是一个抽象的操作, 其需输入一个 promise 和一个值, 我们表示为 [[Resolve]](promise, x), 如果 x 有 then 方法且看上去像一个 promise, 解决程序即尝试使 promise 接受 x 的状态; 否则其用 x 的值来执行 promise.

#### 循环调用

如果 then 返回与 promise 相同将禁止执行

```js
let promise = new Promise((resolve) => {
  resolve();
});
let p2 = promise.then(() => {
  return p2;
}); // TypeError: Chaining cycle detected for promise
```

#### promise

如果返回值是 promise 对象, 则需要更新状态后, 才可以继承执行后面的 promise:

```js
new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("解决状态");
      }, 2000);
    })
  );
})
  .then(
    (v) => {
      console.log(`fulfilled:${v}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("失败状态");
        }, 2000);
      });
    },
    (v) => {
      console.log(`rejected:${v}`);
    }
  )
  .catch((error) => console.log(`rejected:${error}`));
/*
  Promise {<pending>}
    __proto__: Promise
    [[PromiseStatus]]: "pending"
    [[PromiseValue]]: undefined
  fulfilled:解决状态
  rejected:失败状态
*/
```

#### Thenables

包含 then 方法的对象就是一个 promise, 系统将传递 resolvePromise 与 rejectPromise 作为函数参数.
实例中使用 resolve 或在 then 方法中反悔了具有 then 方法的对象:

- 该对象即 promise, 要先执行, 并在方法内部更改状态
- 如果不更改状态, 后面的 then 都会是等待状态

```js
new Promise((resolve, reject) => {
  resolve({
    then(resolve, reject) {
      resolve("解决状态");
    },
  });
})
  .then((v) => {
    console.log(`fulfilled:${v}`);
    return {
      then(resolve, reject) {
        setTimeout(() => {
          reject("失败状态");
        }, 2000);
      },
    };
  })
  .then(null, (error) => {
    console.log(`rejected:${error}`);
  });
/*
  fulfilled:解决状态
  Promise {<pending>}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined
  rejected:失败状态
  */
```

包含 then 方法的对象可以当做 promise 来使用:

```js
class user {
  constructor(id) {
    this.id = id;
  }
  then(resolve, reject) {
    resolve(ajax(`http://localhost:8080/php/command.php?id=$(this.id}`));
  }
}
new Promise((resolve, reject) => {
  resolve(ajax(`http://localhost:8080/php/user.php?name=jerry`));
})
  .then((user) => {
    return new user(user.id);
  })
  .then((gender) => {
    console.log(gender);
  });

// 需要ajax
```

promise 中也可以用 类来作为 promise:

```js
new Promise((resolve, reject) => {
  resolve(
    class {
      static then(resolve, reject) {
        setTimeout(() => {
          resolve("解决状态");
        }, 2000);
      }
    }
  );
}).then(
  (v) => {
    console.log(`fulfilled: ${v}`);
  },
  (v) => {
    console.log(`rejected: ${v}`);
  }
);
```

如果对象中的 then 不是函数, 则将对象作为值来传递

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then(() => {
    return {
      then: "jerry?",
    };
  })
  .then((v) => {
    console.log(v);
  });
/*
  {then: "jerry?"}
  Promise {<resolved>: undefined}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined
  */
```

## catch

使用未定义的变量同样会触发失败状态

```js
let promise = new Promise((resolve, reject) => {
  cmd;
}).then(
  (value) => console.log(value),
  (reason) => console.log(reason)
);
/*
ReferenceError: cmd is not defined
    at Promise (<anonymous>:2:3)
    at new Promise (<anonymous>)
    at <anonymous>:1:15
*/
```

如果 onFulfilled / onRejected 抛出异常, 则 p2 拒绝执行并返回原因:

```js
let promise = new Promise((resolve, reject) => {
  throw new Error("fail");
});
let p2 = promise.then();
p2.then().then(null, (resolve) => {
  console.log(resolve + "waht?");
});
/*
Error: failwaht?
Promise {<resolved>: undefined}
  __proto__: Promise
  [[PromiseStatus]]: "resolved"
  [[PromiseValue]]: undefined
*/
```

而这里 catch 用于失败状态的处理函数, 等同于 then(null,reject){}, 建议使用 catch 处理错误, 将 catch 放在最后面用于统一处理前面发生的错误:

```js
const promise = new Promise((resolve, reject) => {
  reject(new Error("Notice: Promise Exception"));
}).catch((msg) => {
  console.log(msg);
});
```

catch 可以捕获之前所有 promise 的错误, 下例中 catch 也可以捕获第一个 then 返回的 promise 错误.

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then(() => {
    return new Promise((resolve, reject) => {
      reject(".then");
    });
  })
  .then(() => {})
  .catch((msg) => {
    console.log(msg);
  });
/*
  .then
  Promise {<resolved>: undefined}
      __proto__: Promise
      [[PromiseStatus]]: "resolved"
      [[PromiseValue]]: undefined
  */
```

错误是冒泡的操作, 下例中没有一个 then 定义第二个函数, 将一直冒泡到 catch 中处理错误:

```js
new Promise((resolve, reject) => {
  reject(new Error("Request failed"));
})
  .then((msg) => {})
  .then((msg) => {})
  .catch((error) => {
    console.log(error);
  });
/*
  Error: Request failed
    at Promise (<anonymous>:2:10)
    at new Promise (<anonymous>)
    at <anonymous>:1:1
  */
```

catch 也可以捕获对 then 抛出的错误处理:

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then((msg) => {
    throw new Error("from then");
  })
  .catch(() => {
    console.log("from catch");
  });
/*
from catch
Promise {<resolved>: undefined}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined
*/
// 有点意思
```

同样, catch 还可以捕获其他错误, 比如 then 中使用了未定义的变量 a, 将会把错误抛出到 catch:

```js
new Promise((resolve, reject) => {
  resolve("success");
})
  .then((msg) => {
    console.log(a);
  })
  .catch((reason) => {
    console.log(reason);
  });
/*
  ReferenceError: a is not defined
    at Promise.then (<anonymous>:5:17)
  Promise {<resolved>: undefined}
    __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: undefined
  */
```

**建议将错误交给 catch 处理而不是在 then 中完成, 下面是一个不良示范:**

```js
new Promise((resolve, reject) => {
  reject(new Error("request failed"));
}).then((msg) => {
  console.log(msg);
}),
  (error) => {
    console.log(error);
  };
```

### 处理机制

在 promise 中抛出的错误也会被 catch 捕获:

```js
const promise = new Promise((resolve, reject) => {
  throw new Error("fail");
}).catch((msg) => {
  console.log(msg.toString() + "Jerry");
});

// 上面可以理解为下面,

const promise = new Promise((resolve, reject) => {
  // try
  try {
    throw new Error("fail");
  } catch (error) {
    // catch
    reject(error);
  }
}).catch((msg) => {
  console.log(msg.toString() + "Jerry");
});

// 但是异步处理throw就不会触发catch,就会报系统错误
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("fail");
  }, 2000);
}).catch((msg) => {
  console.log(msg.toString() + "Jerry");
});
```

- 同样地, 在 then 方法中使用没有定义的函数也会直接抛出到 catch 后报错
- 在 catch 中发生的错误也会抛给最近的 then 中错误处理(如果有的话)

### 定制错误

## Finally

无论状态时 resolve 或 reject 都会执行此动作, 与状态无关

```js
const promise = new Promise((resolve, reject) => {
  reject("aaaa");
}).finally(() => {
  console.log("Reported anway");
});
```
