/**
 * @description A dictionary.
 * 
 * @remarks Javascript objects are often used as dictionaries 
 * of strings to values. This is bad practice! An empty Javascript
 * object is _not_ an empty dictionary. It contains a 
 * `'toString'` key visible to the `in` operator. 
 */
function Dictionary() { }
Dictionary.prototype = Object.create(null);
module.exports = Dictionary;