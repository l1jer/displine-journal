// promise 调用

function readFilesByPromise() {
  const fs = require("fs");
  const files = [
    "/Users/kitty/testgenerator/1.json",
    "/Users/kitty/testgenerator/2.json",
    "/Users/kitty/testgenerator/3.json",
  ];
  const readFile = function (src) {
    return new Promise((resolve, reject) => {
      fs.readFile(src, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
  readFile(files[0])
    .then(function (data) {
      console.log(data.toString());
      return readFile(files[1]);
    })
    .then(function (data) {
      console.log(data.toString());
      return readFile(files[2]);
    })
    .then(function (data) {
      console.log(data.toString());
    });
}
// async/await 调用
readFilesByPromise();

async function readFilesByAsync() {
  const fs = require("fs");
  const files = [
    "/Users/kitty/testgenerator/1.json",
    "/Users/kitty/testgenerator/2.json",
    "/Users/kitty/testgenerator/3.json",
  ];
  const readFile = function (src) {
    return new Promise((resolve, reject) => {
      fs.readFile(src, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };

  const str0 = await readFile(files[0]);
  console.log(str0.toString());
  const str1 = await readFile(files[1]);
  console.log(str1.toString());
  const str2 = await readFile(files[2]);
  console.log(str2.toString());
}
// async/await + try...catch + promise调用
readFilesByAsync();

async function f() {
  await Promise.reject("error").catch((err) => {});
  console.log(1);
  await 100;
}

async function f() {
  try {
    await Promise.reject("error");
  } catch (e) {
    // 处理异常
  } finally {
  }
  console.log(1);
  await 100;
}

// Promise 实现原理
async function example(params) {
  // ...
}

function example(params) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
