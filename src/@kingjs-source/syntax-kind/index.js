// see https://github.com/microsoft/TypeScript/issues/37574

var { 
  typescript: ts,
} = require('./dependencies');

var rx = {
  AnyList: /List$/,
  AnyToken: /Token$/,
  AnyLiteral: /Literal$/,
  AnyKeyword: /Keyword$/,
  AnyFirstMaker: /^First/,
  AnyLastMarker: /^Last/,
  AnyNumber: /^\d+/
};

var names = Object.getOwnPropertyNames(ts.SyntaxKind).sort()

var count = 0
for (var name of names) {

  if (name.match(rx.AnyNumber))
    continue

  if (name.match(rx.AnyFirstMaker))
    continue

  if (name.match(rx.AnyLastMarker))
    continue

  var id = ts.SyntaxKind[name]
  exports[name] = id
  exports[id] = name
  Object.defineProperty(exports, id, { enumerable: false })

  count++
}

exports.Count = count

exports.isList = name => name.match(rx.AnyList)
exports.isToken = name => name.match(rx.AnyToken)
exports.isLiteral = name => name.match(rx.AnyLiteral)
exports.isKeyword = name => name.match(rx.AnyKeyword)