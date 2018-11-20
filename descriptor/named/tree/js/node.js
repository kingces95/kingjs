'use strict';

var is = require('@kingjs/is');
var objectEx = require('@kingjs/object-ex');
var assert = require('@kingjs/assert');
var createDescriptor = require('@kingjs/descriptor.create');

var infoName = '@kingjs/descriptor.named.tree.info';

function Node(parent, name, descriptor) {
  this.name = name;
  this.parent = parent;
  init.call(this, descriptor);
};

objectEx.defineFunctions(Node, {
  setInfo: (func, info) => { func[infoName] = info },
  getInfo: (func) => func[infoName],
})

function init(descriptor) {
  if (!descriptor)
    return;

  var info = Node.getInfo(this.constructor);
  if (!info)
    return;

  if (info.defaults)
    descriptor = createDescriptor(descriptor, info.defaults);

  if (info.fields)
    initFields.call(this, info.fields, descriptor);

  if (info.children)
    initChildren.call(this, info.children, descriptor);
}

function initFields(fields, descriptor) {
  for (var name in fields)
    this[name] = descriptor[name];
}

function initChildren(info, children) {
  var ctors = info.ctors;
  if (!ctors)
    return;

  var defaults = info.defaults;

  for (var type in ctors) {
    var ctor = ctors[type];
    var descriptors = children[type];
    var typeDefaults = defaults[type];

    for (var name in descriptors) {
      var descriptor = descriptors[name];

      if (typeDefaults)
        descriptor = createDescriptor(descriptor, typeDefaults);

      this.addChild(ctor, name, descriptor);
    }
  }
}

objectEx.defineWriteOnceFields(Node.prototype, {
  name: undefined,
  parent: undefined
});

objectEx.defineLazyAccessors(Node.prototype, {
  isRoot: '!this.parent',
  root: '!this.parent ? this : this.parent.root',
  children: '{ }',
  path: function() {
    var result = this.name;

    var parent = this.parent;
    if (parent && !parent.isRoot)
      result = parent.path + '.' + result;

    return result; 
  },
});

objectEx.defineFunctions(Node.prototype, {

  addChild: function(ctor, name, descriptor) {
    var child = new ctor(this, name, descriptor);
    objectEx.defineConstField(this.children, name, child);
    return child;
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
    if (!ref)
      return;
    
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