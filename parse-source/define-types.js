var { 
  assert,
  typescript: ts,
  ['@kingjs']: { createConstructor }
} = require('./dependencies');

var AnyTokenRx = /Token$/;
var AnyKeywordRx = /Keyword$/;

function Node() { }

Object.defineProperties(
  Node.prototype, {
    getText: {
      value: function getText() {
        return 'nyi';
      }
    },

    [Symbol.iterator]: {
      value: function* iterate() {
        yield this;
      
        for (var name in this) {
          var value = this[name];
      
          if (value instanceof Array) {
            for (var element of value) {
              if (element instanceof Node)
                yield* element[Symbol.iterator]();
            }
          }
      
          else if (value instanceof Node)
             yield* value[Symbol.iterator]();
        }
      }
    }
  }
)

exports['Node'] = Node;

for (var i = 0; i < ts.SyntaxKind.Count; i++) {
  var name = ts.SyntaxKind[i];
  if (name.match(AnyTokenRx))
    continue;

  if (name.match(AnyKeywordRx))
    continue;

  exports[name] = createConstructor(name, Node)
}

return;