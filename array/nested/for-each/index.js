function forEach(action) {

  if (!(this instanceof Array)) {
    action(this);
    return;
  }
  
  for (var i = 0; i < this.length; i++)
    forEach.call(this[i], action);
}

Object.defineProperties(module, {
  exports: { value: forEach }
});