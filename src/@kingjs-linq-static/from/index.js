var { 
  '@kingjs': { 
    '-linq-static': { FromIndexable } 
  }
} = module[require('@kingjs-module/dependencies')]()

var EmptyArray = []

function from(o = EmptyArray) {
  if (o instanceof Array || typeof o == 'string')
    return FromIndexable(o)

  if (o instanceof Generator)
    return from(o())

  
}

module.exports = from