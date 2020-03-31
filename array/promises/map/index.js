var { 
  ['@kingjs']: { 
    defineExtension,
    run
  }
} = require('./dependencies')

var { name, version } = require('./package.json');

/**
 * @description Removes an element from an array and
 * shifts the other elements down.
 * 
 * @this any The array from which an element is to be removed.
 * @param index THe index to remove from the array.
 * 
 * @returns Returns the array with an element removed and the
 * remaining elements shifted down.
 */
async function map(callback = o => o) {
  var array = this
  var result = []

  await run(async function*() {
    for (var i = 0; i < array.length; i++) {
      yield (async function*(j) {
        result[j] = callback(await array[j])
      })(i)
    }
  })

  return result;
}

module.exports = defineExtension(
  Array.prototype, name, version, map
);