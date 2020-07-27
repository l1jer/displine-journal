// 运行代码1


const test = () => {
  let t = +new Date();
  while (true) {
    if (+new Date() - t >= 2000) {
      break;
    }
  }
};
console.log(1);
test();
console.log(2);
console.log(3);

// 运行代码2

console.log(1);
setTimeout(() => {
  console.log(2);
}, 2000);
console.log(3);

const test = () => {
  let t = +new Date();
  while (true) {
    if (+new Date() - t >= 5000) {
      break;
    }
  }
};
setTimeout(() => {
  console.log(2);
}, 2000);
test();


// 演示代码1

for (var i = 1; i <= 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}

// 演示代码2
for (var i = 1; i <= 10; i++) {
  (function(x) {
    setTimeout(function() {
      console.log(x);
    }, 1000 * i);
  })(i);
}



for (var i = 1; i <= 10; i++) {
  var f = function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000 * i);
  };
  f(i);
}

