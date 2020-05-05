'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('assert');
var create = require('@kingjs/descriptor.named.create');

var define = require('./js/define')
var attrSym = require('./js/attribute');
var period = '.';

var failedToResolveNameError = 'Failed to resolve member name to an id.'

var registry = { };

function Node(parent, name, descriptor) {
  this.name = name || null;
  this.parent = parent || null;

  registry[this.id] = this;
};

objectEx.defineLazyAccessors(Node.prototype, {
  id: 'Symbol(this.fullName)',
  root: { 
    lazy: true,
    get: 'this.parent ? this.parent.root : this'
  },
  children: '{ }',
  isResolvable: function() {
    if (is.symbol(this.name))
      return false;

    var parent = this.parent;
    if (parent)
      return parent.isResolvable;

    return true;
  },
  fullName: function() {
    if (!this.isResolvable)
      return null;

    var result = this.name;

    var parent = this.parent;
    if (parent && parent.fullName)
      result = parent.fullName + '.' + result;

    return result; 
  },
});

function resolveName(name) {
  if (is.string(name) && name.indexOf(period) != -1) {
    var node = this.resolve(name);
    assert(!!node, failedToResolveNameError);
    return node.id;
  }
  return name;
}

function* lazyDefineChild(ctor, name, descriptor) {
  name = resolveName.call(this, name);

  var child = new ctor(this, name, descriptor);
  objectEx.defineConstField(this.children, name, child);

  if (descriptor)
    yield* lazyDefineChildren.call(child, descriptor);
}

function* lazyDefineChildren(children) {
  if (!children)
    return;

  var info = this.constructor[attrSym].info.children;

  for (var group in info)
    yield* lazyDefineChildrenOfType.call(this, group, children[group]);
}

function* lazyDefineChildrenOfType(group, children) {
  if (is.undefined(children))
    return;

  var action = this.constructor[attrSym].info.children[group];
  var ctor = action.type;
  var singleton = action.singleton;
  var defer = action.defer;

  if (singleton)
    children = { [group]: children };

  // flatten children and apply transforms
  var ctorAction = ctor[attrSym].info.action;
  children = create(children, [
    ctorAction,
    action,
  ]);

  for (var name in children) {
    var tasks = lazyDefineChild.call(this, ctor, name, children[name]);
    // allow these children to be resolve in a subsequent pass
    defer ? yield tasks : yield* tasks; // :)
  }
}

function execute(tasks) {
  var deferred = [ ];

  for (var task of tasks)
    deferred.push(task);
    
  for (var task of deferred) {
    var done = task.next().done;
    assert(done);
  }
};

objectEx.defineFunctions(Node.prototype, {

  defineChild: function(ctor, name, descriptor) {
    execute(lazyDefineChild.call(this, ctor, name, descriptor));
    return this.children[name];
  },

  defineChildren: function(children) {
    execute(lazyDefineChildren.call(this, children));
    return this.children;
  },

  defineChildOfType(type, name, child) {
    this.defineChildrenOfType(type, { [name]: child });
    return this.children[name];
  },

  defineChildrenOfType(type, children) {
    execute(lazyDefineChildrenOfType.call(this, type, children));
  },

  getAncestor: function(ctor) {
    var parent = this.parent;

    if (!ctor)
      return parent;
    
    if (!parent || parent instanceof ctor)
      return parent;
    
    return parent.getAncestor(ctor);
  },
  
  resolve: function(ref) {
    if (ref === undefined)
      return undefined;

    if (ref === null)
      return null;

    if (is.symbol(ref))
      return registry[ref];
    
    assert(is.string(ref));
    var split = ref.split('.');

    var ancestorOrThis = this;
    while (ancestorOrThis) {
    
      var result = ancestorOrThis;

      for (var i = 0; i < split.length && result; i++)
        result = result.children[split[i]];
      
      if (result)
        return result;

      ancestorOrThis = ancestorOrThis.parent;
    }
  }
});    

objectEx.defineFunction(Node, 'define', define);

Object.defineProperties(module, {
  exports: { value: Node }
});