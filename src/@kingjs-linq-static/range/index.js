var { 
  '@kingjs': {
    Enumerable
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Generate a range of numbers.
 * 
 * @param {*} start 
 * @param {*} count 
 */
function range(start, count) {
  
  return new Enumerable( 
    function createMoveNext() {
      return function moveNext() {
        
        if (count-- <= 0) {
          this.current = undefined
          return false
        }
        
        this.current = start++
        return true
      }
    }
  )
}

module.exports = range
