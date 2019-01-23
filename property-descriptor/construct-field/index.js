/**
 * @description Construct an object `{ target, name, descriptor: { value } }`.
 * 
 * @param target The target on which the property will be defined.
 * @param name The name of the property. 
 * @param value The value of the property.
 * 
 * @returns An object `{ target, name, descriptor: { value } }` whose values
 * correspond to their respective arguments.
 */
function createField(target, name, value) {
  return { target, name, descriptor: { value } };
}

module.exports = createField;