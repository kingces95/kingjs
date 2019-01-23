/**
 * @description Package target, name and a descriptor formed by wrapping value. 
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property. 
 * @param value The value of the property.
 * 
 * @returns An object with properties `target`, `name`, and `descriptor` which itself
 * has a property `value` each with values corresponding to their respective arguments. 
 */
function createField(target, name, value) {
  return { target, name, descriptor: { value } };
}

module.exports = createField;