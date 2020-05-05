var Pairs = Symbol('@kingjs/Object.pairs');
Object.prototype[Pairs] = function* Pairs() {
  for (var name in this)
    yield { name, value: this[name] }
}

module.exports = Pairs;