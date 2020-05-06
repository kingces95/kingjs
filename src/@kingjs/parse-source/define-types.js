var { 
  typescript: ts,
  '@kingjs': { createConstructor }
} = module[require('@kingjs-module/dependencies')]();

var rx = require('./rx');
var kind = ts.SyntaxKind

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

for (var name in Object.keys(kind).sort()) {

  if (name.match(rx.AnyToken))
    continue;

  if (name.match(rx.AnyKeyword))
    continue;

  exports[name] = createConstructor(name, Node)
}

return;