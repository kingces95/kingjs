var { 
  ['@kingjs']: {
    reflect: { exportExtension },
    linq: { empty },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = require('./dependencies');

var DefaultLessThan = (l, r) => l < r;
 
/**
 * @description Selects pairs of values from two ordered 
 * `IEnumerable`'s with matching keys or `null` if there is no match.
 * 
 * @this any The outer `IEnumerable`.
 * @param innerEnumerable The inner `IEnumerable`.
 * @param outerKeySelector Callback to select the key 
 * from a value pulled from the outer `IEnumerable`.
 * @param innerKeySelector Callback to select the key 
 * from a value pulled from the inner `IEnumerable`.
 * @param resultSelector Callback to select the result
 * given an outer and inner value sharing a key.
 * @param [keyLessThan] Operator to compare two keys.
 */
function zipJoin(
  innerEnumerable, 
  outerKeySelector,
  innerKeySelector,
  resultSelector,
  keyLessThan = DefaultLessThan) {

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
        yield resultSelector(null, inner);
        innerDone = advanceInner();
        continue;
      }

      // outer behind inner
      if (!outerDone && (innerDone || keyLessThan(outerKey, innerKey))) {
        yield resultSelector(outer, null);
        outerDone = advanceOuter();
        continue;
      }

      // outer and inner finished
      if (outerDone && innerDone)
        break;

      // outer and inner differ
      yield resultSelector(outer, inner);
      innerDone = advanceInner();
      outerDone = advanceOuter();
    }
  }
};

exportExtension(module, IEnumerable, zipJoin);