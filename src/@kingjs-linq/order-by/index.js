var { 
  '@kingjs': {
    lessThan: defaultLessThan,
    IEnumerable,
    IEnumerable: { GetEnumerator },
    IEnumerator: { MoveNext, Current },
    IOrderedEnumerable: { CreateOrderedEnumerable },
    '-module': { ExportInterfaceExtension },
    '-linq': {
      '-reduction': { ToArray }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

function defaultKeySelector(x) {
  return x
}

function defineCompare(stack, i) {
  if (stack.length == i)
    return null

  var keySelector = stack[i++]
  var lessThan = stack[i++]
  var descending = stack[i++]
  var thenBy = defineCompare(stack, i)

  return function(l, r) { 
    
    var x = keySelector(descending ? r : l)
    var y = keySelector(descending ? l : r)
    
    if (lessThan(x, y))
      return -1
    
    if (lessThan(y, x))
      return 1
    
    if (!thenBy)
      return 0
    
    return thenBy(l, r)
  }
}

/**
 * @description Generates a sequence of elements in ascending 
 * order according to a key.
 * 
 * @param {*} keySelector 
 * @param {*} lessThan 
 * @param {*} descending_ 
 * @param {*} stack_ 
 */
function orderBy(keySelector, lessThan, descending_, stack_) {
  if (!keySelector)
    keySelector = defaultKeySelector

  if (!lessThan)
    lessThan = defaultLessThan

  var source = this
  var compare = null
  var stack = null

  // TODO: ugly
  return Object.defineProperties({ }, {
    stack_: { 
      get: function() {
        if (!stack) {
          stack = stack_ ? Object.create(stack_) : [ ]
          stack.push(keySelector, lessThan, descending_)
        }
        return stack
      } 
    },

    [GetEnumerator]: {
      value : function getEnumerator() {
        var i = 0
        var sortedArray = null
        var current = null
        
        compare = defineCompare(this.stack_, 0)

        return Object.defineProperties({ }, {
          [Current]: { 
            get: function() { return current } 
          },
          [MoveNext]: { 
            value: function moveNext() {

              if (!sortedArray)
                sortedArray = source[ToArray]().sort(compare)
              
              if (i == sortedArray.length) {
                current = undefined
                return false
              }
              
              current = sortedArray[i++]
              return true
            }
          }
        })
      }
    },

    [CreateOrderedEnumerable]: {
      value: function(keySelector, lessThan, descending) {
        return orderBy.call(
          this, keySelector, lessThan, descending, this.stack_)
      }
    }
  })
}

module[ExportInterfaceExtension](IEnumerable, orderBy)
