var Interface = require('@kingjs-interface/interface')
var For = require('@kingjs-symbol/for')

var KingJs = 'kingjs'
var Equals = 'equals'
var GetHashcode = 'getHashcode'

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
class IEquatable extends Interface { }
IEquatable.Equals = Symbol[For](IEquatable.name, { member: Equals, scope: KingJs })
IEquatable.GetHashcode = Symbol[For](IEquatable.name, { member: GetHashcode, scope: KingJs })

module.exports = IEquatable