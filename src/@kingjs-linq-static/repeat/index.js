var { 
  '@kingjs': {
    Enumerable
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generate a sequence of a repeated value.
 * 
 * @param {*} element 
 * @param {*} count 
 */
function repeat(element, count) {  
  
  return new Enumerable( 
    function createMoveNext() {
      return function moveNext() {
        
        if (count-- <= 0) {
          this.current = undefined
          return false
        }
        
        this.current = element
        return true
      }
    }
  )
}

module.exports = repeat
