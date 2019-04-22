var { 
  assert,
  ['@kingjs']: {
    reflect: { exportExtension },
    linq: { empty },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

var DefaultLessThan = (l, r) => l < r;
var DefaultResultSelector = (outer, inner, key) => ({ outer, inner, key });
 
/**
 * @description Selects pairs of values from two ordered 
 * `IEnumerable`'s with matching keys or `null` if there is no match.
 * 
 * @this any The outer `IEnumerable`.
 * @param innerEnumerable The inner `IEnumerable`.
 * @param outerKeySelector Callback to select the key 
 * from a value pulled from the outer `IEnumerable`.
 * @param [innerKeySelector] Callback to select the key 
 * from a value pulled from the inner `IEnumerable`. Default
 * uses the `outerKeySelector`.
 * @param [resultSelector] Callback to select the result
 * given an outer and inner value sharing a key. Default
 * is produces objects of the form `{ outer, inner }`.
 * @param [keyLessThan] Operator to compare two keys.
 * 
 * @callback resultSelector
 * @param outer An element from the outer `IEnumerable` or null
 * @param inner An element from the inner `IEnumerable` or null
 * @param key A key common to `outer` and `inner` when neither are null
 * @returns Returns the "zipped" value.
 */
function zipJoin(
  innerEnumerable, 
  outerKeySelector,
  innerKeySelector,
  resultSelector = DefaultResultSelector,
  keyLessThan = DefaultLessThan) {

  if (!innerKeySelector)
    innerKeySelector = outerKeySelector;

  var outerEnumerable = this
  var innerEnumerable = innerEnumerable || empty();

  return function* zipJoin() {
    var outerEnumerator = outerEnumerable[GetEnumerator]();
    var innerEnumerator = innerEnumerable[GetEnumerator]();

    // logic and state to advance outer enumerator
    var outer, outerKey;
    function advanceOuter() {
      if (!outerEnumerator[MoveNext]())
        return true;
      outer = outerEnumerator[Current];
      outerKey = outerKeySelector(outer);
      return false;
    }
    var outerDone = advanceOuter();

    // logic and state to advance inner enumerator
    var inner, innerKey;
    function advanceInner() {
      if (!innerEnumerator[MoveNext]())
        return true;
      inner = innerEnumerator[Current];
      innerKey = innerKeySelector(inner);
      return false;
    }
    var innerDone = advanceInner();

    while (true) {

      // inner behind outer
      if (!innerDone && (outerDone || keyLessThan(innerKey, outerKey))) {
        yield resultSelector(null, inner, innerKey);
        innerDone = advanceInner();
        continue;
      }

      // outer behind inner
      if (!outerDone && (innerDone || keyLessThan(outerKey, innerKey))) {
        yield resultSelector(outer, null, outerKey);
        outerDone = advanceOuter();
        continue;
      }

      // outer and inner finished
      if (outerDone && innerDone)
        break;

      // outer and inner share a common key
      assert(!keyLessThan(innerKey, outerKey));
      assert(!keyLessThan(outerKey, innerKey));
      yield resultSelector(outer, inner, innerKey);
      innerDone = advanceInner();
      outerDone = advanceOuter();
    }
  }
};

exportExtension(module, IEnumerable, zipJoin);