var prototype = Object.getPrototypeOf((async function* () { })());
prototype = Object.getPrototypeOf(prototype);
var AsyncGenerator = function() { };
AsyncGenerator.prototype = prototype;

module.exports = AsyncGenerator;