// 迭代代码es5
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

iterator.next();
iterator.next();
iterator.next();
iterator.next();
// yield 例子
function* createIterator() {
    let first = yield 1;
    let second = yield first + 2;
    yield second + 3;
}
let iterator = createIterator();

iterator.next();
iterator.next(4);
iterator.next(5);
iterator.next();

// yield* 例子
function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield 100;
  yield* generator1();
  yield 200;
}

let g2 = generator2();
g2.next();
g2.next();
g2.next();
g2.next();
g2.next();
g2.next();

// generator return 例子
function* createIterator() {
    yield 1;
    yield 2;
    yield 3;
}
let iterator = createIterator();

iterator.next();
iterator.return();
iterator.next();

// generator throw 例子
function* createIterator() {
    let first = yield 1;
    let second;
    try {
        second = yield first + 2;
    } catch (e) {
        second = 6;
    }
    yield second + 3;
}
let iterator = createIterator();

iterator.next();
iterator.next(10);
iterator.throw(new Error("error"));
iterator.next();

function* test() {
    yield 1;
    yield 2;
    return 3;
}

const t = test();

// 代码
function* test() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        if (reset) {
            i = 0;
        }
    }
}

var t = test();

t.next();
t.next();
t.next(true);

// 代码
function* test() {
    const num = 1;
    yield num + 1;
    yield num + 2;
    yield num + 3;
}

for (let v of test()) {
    console.log(v);
}

// 代码
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
