function initializeName(name, type) {
  var value  = `${name.toString()}`;

  if (this.function)
    defineName.call(this.value, value, type);
  
  if (this.get)
    defineName.call(this.get, value, type);
  
  if (this.set)
    defineName.call(this.set, value, type);
}

function defineName(value, type) {
  if (!type)
    type = value.name;
    
  if (type)
    value += ` (${type})`;

  Object.defineProperty(this, 'name', { 
    configurable: true,
    value 
  });
}

module.exports = initializeName;