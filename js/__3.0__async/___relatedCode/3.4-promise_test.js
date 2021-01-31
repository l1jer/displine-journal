// 片段1
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});

promise.then(() => {
    console.log(3);
});
console.log(4);

const promise = Promise.
    resolve(1).
    then(2).
    then(Promise.resolve(3)).
    then(console.log);

const promise1 = Promise.resolve(1);
const promise2 = promise1.then(2);
const promise3 = promise2.then(Promise.resolve(3));
const promise4 = promise3.then(console.log); 