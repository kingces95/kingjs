var { 
  '@kingjs': {
    reflect: { 
      implementIEnumerable,
      exportExtension
    },
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Generates a sequence of elements composed of 
 * elements of another sequence subject to a transform.
 * 
 * @param {*} selector 
 */
function select(selector) {
  var source = this;

  return implementIEnumerable({ }, 
    function createMoveNext() {
      var enumerator = source[GetEnumerator]();
      var i = 0;

      return function moveNext() {
        if (!enumerator[MoveNext]())
          return false;
      
        this.current_ = selector(enumerator[Current], i++);
        return true;
      }
    }
  )
};

exportExtension(module, IEnumerable, select);
