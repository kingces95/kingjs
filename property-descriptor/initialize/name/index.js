/**
 * @this any The descriptor whose functions will be renamed.
 * @param name The name to assign to each function.
 * @param [type] An optional tag to parenthesize and append to the name (e.g. a stub id).
 * @returns Returns the descriptor with its functions renamed.
 */
function name(name, type) {
  name = `${name.toString()}`;

  if (this.value)
    defineName.call(this.value, name, type);
  
  if (this.get)
    defineName.call(this.get, name, type);
  
  if (this.set)
    defineName.call(this.set, name, type);

  return this;
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

module.exports = name;