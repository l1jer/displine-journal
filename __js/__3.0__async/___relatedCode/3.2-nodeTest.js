// console.log(1);
// process.nextTick(() => {
//   console.log("nextTick callback");
// });
// console.log(2);
// process.abort();
// console.log(process.pid);

// setTimeout(_ => {
//   console.log("setTimeout");
// }, 0);
// setImmediate(_ => {
//     console.log("setImmediate");
// });

// const fs = require('fs');
// fs.readFile(__filename, _ => {
//     setTimeout(_ => {
//         console.log("setTimeout");
//       }, 0);
//       setImmediate(_ => {
//           console.log("setImmediate");
//       });
// });

// const fs = require("fs");
// fs.readFile(__filename, _ => {
//   setTimeout(_ => {
//     console.log("setTimeout");
//   }, 0);
//   setImmediate(_ => {
//     console.log("setImmediate");
//     process.nextTick(_ => {
//         console.log("nextTick2");
//       });
//   });
//   process.nextTick(_ => {
//     console.log("nextTick1");
//   });
// });

const fs = require('fs');

function someAsyncOperation(callback) {
  fs.readFile(__dirname, callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

someAsyncOperation(() => {
  const startCallback = Date.now();
  while (Date.now() - startCallback < 200) {
    // do nothing
  }
});
