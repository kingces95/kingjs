var {
  assert,
} = require('./dependencies');

var At = '@';
var ForwardSlash = '/';
var Period = '.';

function parse(scopedName) {
  assert(scopedName[0] == At);
  var rootFullName = scopedName.substring(1).split(ForwardSlash);

  assert(rootFullName.length = 2);
  var scope = rootFullName[0];
  var fullName = rootFullName[1];
  var segments = fullName.split(Period);
  var length = segments.length;
  var name = segments[length - 1];
  
  var namespaces = [];
  var i = [];
  for (var segment of segments) {
    i.push(segment);
    namespaces.push(i.join(Period));
  }

  var namespace = namespaces[namespaces.length - 1];

  return { scope, fullName, segments, namespace, namespaces, name };
}

module.exports = parse;

var test = parse('@kingjs/moo.foo-bar.baz');
return