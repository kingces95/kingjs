'use strict';

var Node = require('./js/node');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');

function testRoot(root) {
  assert(!root.parent);
  assert(root instanceof Node);
  assert(root.name === null);
  assert(root.fullName === null);
  assert(root.isResolvable);
}

function testNode(node, name, parent) {
  assert(node instanceof Node);
  assert(node.name == name);
  assert(node.parent == parent);
  assert(node.path == parent.path ? parent.path + '.' + name : name);
  assert(parent.children[name] == node);
  assert(parent.resolve(name) == node);
  assert(node.getAncestor() == parent);
  assert(node.getAncestor(parent.constructor) == parent);
}

function testResolutions(node, refs) {
  for (var path in refs) 
    assert(node.resolve(path) == refs[path]);
}

function test() {
  var root = new Node();
  testRoot(root);
  
  var foo = root.addChild(Node, 'foo');
  testNode(foo, 'foo', root);

  var moo = foo.addChild(Node, 'moo');
  testNode(moo, 'moo', foo);

  var bar = root.addChild(Node, 'bar');
  testNode(bar, 'bar', root);

  var baz = bar.addChild(Node, 'baz');
  testNode(baz, 'baz', bar);
  testResolutions(baz, {
    [foo.fullName]: foo,
    [moo.fullName]: moo,
  })
}
test();
