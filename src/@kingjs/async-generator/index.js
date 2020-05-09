/**
 * @description A function for testing if another function is
 * an `instanceof` an async generator.
 */
module.exports = (async function* () { }).constructor;

var AsyncGenerator = function() { };
AsyncGenerator.prototype = Object.getPrototypeOf(async function* () { });

module.exports = AsyncGenerator;