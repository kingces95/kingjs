var { 
  '@kingjs-module': { 
    ExportExtension,
  }
} = require('./dependencies')

/**
 * @description Partition an array into arrays that are assigned to properties of an object.
 * 
 * @this any The array to be partitioned.
 * @param selectKey Selects a partition name from each element 
 * @param selectValue Selects a value from each element to be included in the partition array.
 * 
 * @returns Returns an object with properties for each key whose values
 * are array containing elements that returned the corresponding key.
 */
function partition(selectKey, selectValue = o => o) {
  var result = { }

  for (var value of this) {
    var key = selectKey(value)
    if (key === undefined)
      throw `Key not selected from value '${key}'. `

    var group = result[key]
    if (!group)
      group = result[key] = []
    group.push(selectValue(value))
  }

  return result
}

module[ExportExtension](Array, partition)