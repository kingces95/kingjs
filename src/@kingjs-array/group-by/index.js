var { 
  '@kingjs-array': { 
    Partition,
  },
  '@kingjs-module': {
    ExportExtension,
  }
} = require('./dependencies')

/**
 * @description Partition an array into groups { key, value } where value is an array.
 * 
 * @this any The array to be partitioned.
 * @param selectKey Selects a partition name from each element 
 * @param selectValue Selects a value from each element to be included in the partition array.
 * 
 * @returns Returns an array of partitions { key, value } where value is an array.
 */
function groupBy(selectKey, selectValue = o => o) {
  var result = this[Partition](selectKey, selectValue)
  return Reflect.ownKeys(result).sort()
    .map(key => ({ key, group: result[key] }))
}

module[ExportExtension](Array, groupBy)