var { 
  assert,
  '@kingjs': {
    LessThan,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    '-module': { ExportInterfaceExtension },
    '-linq-static': { empty, fromGenerator },
  }
} = module[require('@kingjs-module/dependencies')]()

var DefaultKeySelector = o => o
var ResultSelector = (outer, inner, key) => ({ outer, inner, key })
 
/**
 * @description An full outer join of two ordered sequences of unique elements.
 * 
 * @this any The outer `IEnumerable`.
 * @param innerEnumerable The inner `IEnumerable`.
 * @param [outerKeySelector] Selects the outer key. Default is identity.
 * @param [innerKeySelector] Selects the inner key. Default is identity.
 * @param [resultSelector] Selects the result. Default is `{ outer, inner }`.
 * @param [keyComparer] Compare if one key is less than the other.
 * @returns Returns a sequence of values as selected by `resultSelector`.
 * 
 * @callback resultSelector
 * @param outer An element from the outer `IEnumerable` or null
 * @param inner An element from the inner `IEnumerable` or null
 * @param key A key shared by `outer` and `inner` or, if either is null, than
 * the key of the other value.
 * @returns Returns the "zipped" value.
 */
function zipJoin(
  innerEnumerable, 
  outerKeySelector = DefaultKeySelector,
  innerKeySelector = DefaultKeySelector,
  keyComparer = LessThan) {

  var outerEnumerable = this
  var innerEnumerable = innerEnumerable || empty()

  return fromGenerator(function* zipJoin() {
    var outerEnumerator = outerEnumerable[GetEnumerator]()
    var innerEnumerator = innerEnumerable[GetEnumerator]()

    // logic and state to advance outer enumerator
    var outer, outerKey
    function advanceOuter() {
      if (!outerEnumerator[MoveNext]())
        return true
      outer = outerEnumerator[Current]
      outerKey = outerKeySelector(outer)
      return false
    }
    var outerDone = advanceOuter()

    // logic and state to advance inner enumerator
    var inner, innerKey
    function advanceInner() {
      if (!innerEnumerator[MoveNext]())
        return true
      inner = innerEnumerator[Current]
      innerKey = innerKeySelector(inner)
      return false
    }
    var innerDone = advanceInner()

    while (true) {

      // inner behind outer
      if (!innerDone && (outerDone || keyComparer(innerKey, outerKey))) {
        yield ResultSelector(null, inner, innerKey)
        innerDone = advanceInner()
        continue
      }

      // outer behind inner
      if (!outerDone && (innerDone || keyComparer(outerKey, innerKey))) {
        yield ResultSelector(outer, null, outerKey)
        outerDone = advanceOuter()
        continue
      }

      // outer and inner finished
      if (outerDone && innerDone)
        break

      // outer and inner share a common key
      assert(!keyComparer(innerKey, outerKey))
      assert(!keyComparer(outerKey, innerKey))
      yield ResultSelector(outer, inner, innerKey)
      innerDone = advanceInner()
      outerDone = advanceOuter()
    }
  })
}

module[ExportInterfaceExtension](IEnumerable, zipJoin)