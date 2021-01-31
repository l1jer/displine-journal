// resolved promise
async function test() {
    return 1;
}
const p = test();
console.log(p);
p.then(function(data) {
    console.log(data);
});

// rejected promise
async function test() {
    throw new Error("error");
}
const p = test();
console.log(p);
p.catch(function(data) {
    console.log(data);
});

// promise 读文件
const fs = require("fs");

const readFile = function(src) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};


// 代码
function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    });
}

async function test() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}

test();

// 代码
async function f() {
    await Promise.reject("error");
    console.log(1);
    await 100;
}
f();

// 代码
async function test() {
    return 1;
}
const t = test();
t.then(console.log);

// 代码
async function test() {
    throw new Error("error");
}
const t = test();
t.then(console.log).catch(console.log);

// 代码
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2() {
    return Promise.resolve().then(_ => {
        console.log("async2 promise");
    });
}
async1();
