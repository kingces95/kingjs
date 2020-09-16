var { 
  '@kingjs': { 
    '-indexable': { Enumerable } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

function fromIndexable(indexable = EmptyArray) {
  return new Enumerable(indexable)
}

module.exports = fromIndexable