var { 
  '@kingjs': { 
    '-indexable': { Enumerable } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

function from(indexable = EmptyArray) {
  return new Enumerable(indexable)
}

module.exports = from