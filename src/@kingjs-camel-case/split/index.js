var ExportExtension = require("@kingjs-module/export-extension")

/**
 * @description Splits a string on its capital letters.
 * 
 * @param name A camel case name to split.
 * 
 * @returns Array of names, all lower case, composing the camel case name.
 */
function split() {
  return this.split(/(?=[A-Z])/).map(x => x.toLowerCase())  
}

module[ExportExtension](String, split)