var {
  ['@kingjs']: {
    reflect: { defineProperty }
  }
} = require('./dependencies');

var PackageJson = './package.json';
var Exports = 'exports';
var InterfaceId = Symbol.for('@kingjs/IInterface.id');

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
function exportExtension(module, type, x, y) {
  var { package, version } = module.require(PackageJson);
  var symbol = Symbol(`${package}, ${version}`);

  var descriptor = defineProperty(null, symbol, x, y);
  descriptor.extends = () => type;
  defineProperty(Object.prototype, symbol, descriptor);

  defineProperty(module, Exports, symbol);
  return symbol;
}

module.exports = exportExtension;