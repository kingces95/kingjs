var Interface = require('@kingjs-interface/interface')
var For = require('@kingjs-symbol/for')

var KingJs = 'kingjs'
var IsLessThan = 'compareTo'

/**
 * @description `IComparable` has a single member `compareTo` which returns
 * true if this object is less than the other object.
 */
class IComparable extends Interface { }
IComparable.IsLessThan = Symbol[For](IComparable.name, { 
  member: IsLessThan, 
  scope: KingJs 
})

module.exports = IComparable