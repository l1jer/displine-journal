const fs = require("fs");
const Thunk = function(fn) {
  return function(...args) {
    return function(callback) {
      return fn.call(this, ...args, callback);
    };
  };
};
const readFileThunk = Thunk(fs.readFile);

function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}

const g = function*() {
  const s1 = yield readFileThunk("/Users/kitty/testgenerator/1.json");
  console.log(s1.toString());
  const s2 = yield readFileThunk("/Users/kitty/testgenerator/2.json");
  console.log(s2.toString());
  const s3 = yield readFileThunk("/Users/kitty/testgenerator/3.json");
  console.log(s3.toString());
};

run(g);
