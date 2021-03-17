function readFilesByCallback() {
  const fs = require("fs");
  const files = [
    "/Users/kitty/testgenerator/1.json",
    "/Users/kitty/testgenerator/2.json",
    "/Users/kitty/testgenerator/3.json",
  ];
  fs.readFile(files[0], function (err, data) {
    console.log(data.toString());
    fs.readFile(files[1], function (err, data) {
      console.log(data.toString());
      fs.readFile(files[2], function (err, data) {
        console.log(data.toString());
      });
    });
  });
}
// 调用
readFilesByCallback();

function* readFilesByGenerator() {
  const fs = require("fs");
  const files = [
    "/Users/kitty/testgenerator/1.json",
    "/Users/kitty/testgenerator/2.json",
    "/Users/kitty/testgenerator/3.json",
  ];
  let fileStr = "";
  function readFile(filename) {
    fs.readFile(filename, function (err, data) {
      console.log(data.toString());
      f.next(data.toString());
    });
  }
  yield readFile(files[0]);
  yield readFile(files[1]);
  yield readFile(files[2]);
}
// 调用
const f = readFilesByGenerator();

f.next();
