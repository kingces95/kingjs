'use strict';

function Node(parent, name, descriptor) {
  
  if (parent)
    parent.attachChild(name, this);
          
  if (name)
    var fullName = (parent.fullName ? parent.fullName + '.' : emptyString) + name;
  
  defineConstProperties(this, {
    name: name,
    fullName: fullName,    
    parent: parent,
  });
  
  defineConstHiddenProperties(this, {
    _: descriptor,
    children_: { },
  });
};

function tree() {
}

Object.defineProperties(module, {
  exports: { value: tree }
});