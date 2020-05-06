var { 
  '@kingjs': { 
    '-module': { ExportExtension }
  }
} = module[require('@kingjs-module/dependencies')]()

var Name = 'name';

/**
 * @description Renames a function.
 * 
 * @this any The function to rename.
 * 
 * @param string The name to assign the function.
 * 
 * @returns Returns the function.
 */
function rename(name) {
  return Object.defineProperty(this, Name, { 
    configurable: true,
    value: name
  });
}

module[ExportExtension](Function, rename)