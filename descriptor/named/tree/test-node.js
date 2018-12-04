'use strict';

var Node = require('./js/node');
var defineBase = require('./js/define-base');
var attrSym = require('./js/attribute');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert');
var objectEx = testRequire('@kingjs/object-ex');

function testRoot(root) {
  assert(!root.parent);
  assert(root instanceof Node);
  assert(root.root == root);
  assert(root.name === undefined);
  assert(root.path === undefined);
}

function testNode(node, name, parent) {
  testRoot(node.root);

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
    [foo.path]: foo,
    [moo.path]: moo,
  })
}
test();

function testMyNode() {
  function MyRoot() { 
    Node.call(this);
  }
  defineBase(MyRoot, Node);
  MyRoot[attrSym].info = {
    fields: { myRootField: undefined },
  };

  function MyNode(parent, name, descriptor) { 
    Node.call(this, parent, name, descriptor);
  }
  defineBase(MyNode, MyRoot);

  MyNode.prototype.isMyNode = true;

  var myNodeInfo = {
    fields: { otherNode: undefined },
    defaults: { wrap: 'otherNode' },

    children: {
      ctors: {
        myNodes: MyNode
      }, 
      defaults: {
        myNodes: { 
          defaults: { parentIsMyNode: true }
        }
      }
    },
  };

  objectEx.setLazyAccessor(
    MyNode[attrSym], 
    'info', 
    function() { 
      myNodeInfo.baseInfo = this.prototype.info;
      return myNodeInfo; 
    }
  )

  MyNode.prototype.addMyNode = function(name, descriptor) {
    return this.addChild(MyNode, name, descriptor);
  }

  MyRoot.prototype.addMyNode = MyNode.prototype.addMyNode;

  objectEx.defineReference(
    MyNode.prototype,
    'otherNode',
    Node.prototype.resolve
  )

  var root = new MyRoot();
  var foo = root.addMyNode('foo');
  var moo = foo.addMyNode('moo', 'bar.baz');
  var bar = root.addMyNode('bar', {
    myNodes: {
      baz: 'foo.moo'
    }
  });

  // test child creation
  var baz = bar.children.baz;
  assert(baz);

  // sanity checks
  testRoot(root);
  testNode(foo, 'foo', root);
  testNode(moo, 'moo', foo);
  testNode(bar, 'bar', root);
  testNode(baz, 'baz', bar);

  // test type test
  assert(foo.isMyNode);

  // test child defaults
  assert(!foo.parentIsMyNode)
  assert(!bar.parentIsMyNode)
  assert(moo.parentIsMyNode)
  assert(baz.parentIsMyNode)

  // find typed ancestor
  assert(baz.getAncestor(MyRoot) == root);
  assert(baz.getAncestor(MyNode) == bar);

  // dereference test
  assert(baz.otherNode == moo);
  assert(moo.otherNode == baz);
}
testMyNode();