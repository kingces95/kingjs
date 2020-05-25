var { 
  '@kingjs': {
    IEnumerable,
    IGroupedEnumerable: { Key, GetEnumerator },
    IEnumerator: { MoveNext, Current },
    ILookup: { Get, Has },
    '-interface': { ExportExtension },
    '-linq': {
      '-static': { fromIndexable }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Creates a dictionary from a sequence 
 * where values are groups of elements keyed by a 
 * name common to all members of the group.
 * 
 * @param {*} keySelector 
 * @param {*} valueSelector 
 */
function toLookup(keySelector, valueSelector) {       
  var map = new Map()

  var enumerator = this[GetEnumerator]()
  while (enumerator[MoveNext]()) {
    var value = enumerator[Current]
    var key = keySelector(value)
    if (valueSelector)
      value = valueSelector(value)
    
    var values = map.get(key)
    if (!values)
      map.set(key, values = [])
    
    values.push(value)
  }
  
  return from(map)
}

function from(map) {
  var groups = { }
  var groupEnumerable = { }
  for (var key of map.keys()) {
    groupEnumerable[key] = fromIndexable(map.get(key))

    groups[key] = {
      [Key]: key,
      [GetEnumerator]() {
        return groupEnumerable[this[Key]][GetEnumerator]()
      } 
    }
  }

  var enumerable = fromIndexable(Object.values(groups))
  return {
    [Get]: key => groups[key],
    [Has]: key => map.has(key),
    [GetEnumerator]: () => enumerable[GetEnumerator]()
  }
}

module[ExportExtension](IEnumerable, toLookup)
