var {
  ['@kingjs']: {
    is,
    string: { expand },
    functionEx: { rename: Rename }
  }
} = require('./dependencies');

/**
 * @description Renames functions found in a descriptor.
 * 
 * @this any The descriptor whose functions will be renamed.
 * 
 * @param template The name to assign to each function. A 
 * placeholder for `name` will be expanded to the name of 
 * the function being replaced.
 * 
 * @returns Returns the descriptor with its functions renamed.
 */
function rename(template) {

  if (is.symbol(template))
    template = template.toString();

  if (this.value)
    defineName.call(this.value, template);
  
  if (this.get)
    defineName.call(this.get, template);
  
  if (this.set)
    defineName.call(this.set, template);

  return this;
}

function defineName(template) {
  var name = this.name;
  name = expand.call(template, { name });
  this[Rename](name);
}

module.exports = rename;