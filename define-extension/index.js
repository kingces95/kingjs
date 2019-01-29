
/**
 * @description Defines a property on a target with a symbol name 
 * derived from `package` and `version`.
 * 
 * @param target The target on which to declare the property.
 * @param package The name of the package containing the extension.
 * @param version The version of the package containing the extension.
 * @param descriptor The descriptor describing the property. 
 * 
 * @returns The symbol name of the property.
 * 
 * @remarks If `descriptor` is a function, then it will be wrapped in an 
 * object with name `value`.
 */
function defineExtension(target, package, version, descriptor) {
  var symbol = Symbol(`${package}, ${version}`);

  if (typeof descriptor == 'function')
    descriptor = { value: descriptor };

  Object.defineProperty(target, symbol, descriptor);
  return symbol;
}

//throw 'hi'
module.exports = defineExtension;