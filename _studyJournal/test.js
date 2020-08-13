(function (root) {
  var _ = function () {
    if (!(this instanceof _)) {
      return new_();
    }
  };

  _.unique = function () {};

  _.process = function (target) {
    var result = [];
    for (var name in target) {
      result.push(name);
    }
    return result;
  };

  var beforeHook = function (keys, callback) {
    for (var i = 0; i < keys.length; i++) {
      callback(keys[i]);
    }
  };

  _.mixin = function (object) {
    beforeHook(_.process(object), function (key) {
      object.prototype[key] = function () {};
      console.log(key);
    });
  };

  _.mixin(_);
  root._ = _;
})(this);
