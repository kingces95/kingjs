'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var create = require('@kingjs/descriptor.named.create');

var attrSym = require('./attribute');
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
  children: '{ }',
  hasFullName: function() {
    if (is.symbol(this.name))
      return false;

    var parent = this.parent;
    if (parent)
      return parent.hasFullName;

    return true;
  },
  fullName: function() {
    if (!this.hasFullName)
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

function* lazyAddChild(ctor, name, descriptor) {
  name = resolveName.call(this, name);

  var child = new ctor(this, name, descriptor);
  objectEx.defineConstField(this.children, name, child);

  if (descriptor)
    yield* lazyAddChildren.call(child, descriptor);
}

function* lazyAddChildren(children) {
  if (!children)
    return;

  var info = this.constructor[attrSym].info.children;

  for (var group in info)
    yield* lazyAddChildrenOfType.call(this, group, children[group]);
}

function* lazyAddChildrenOfType(group, children) {
  if (is.undefined(children))
    return;

  var info = this.constructor[attrSym].info.children[group];
  var ctor = info.ctor;
  var singleton = info.singleton;
  var defer = info.defer;
  var defaults = info.defaults;

  if (singleton)
    children = { [group]: children };

  // flatten children and apply transforms
  children = create(children, [
    ctor[attrSym].info.defaults, // ctorDefaults
    defaults, // defaults
  ]);

  for (var name in children) {
    var tasks = lazyAddChild.call(this, ctor, name, children[name]);
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

  addChild: function(ctor, name, descriptor) {
    execute(lazyAddChild.call(this, ctor, name, descriptor));
    return this.children[name];
  },

  addChildren: function(children) {
    execute(lazyAddChildren.call(this, children));
  },

  addChildOfType(type, name, child) {
    this.addChildrenOfType(type, { [name]: child });
    return this.children[name];
  },

  addChildrenOfType(type, children) {
    execute(lazyAddChildrenOfType.call(this, type, children));
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

Object.defineProperties(module, {
  exports: { value: Node }
});