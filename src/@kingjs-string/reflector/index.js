var {
  '@kingjs': { 
    EmptyObject,
    '-string': { Capitalize, Decapitalize }
  }
} = module[require('@kingjs-module/dependencies')]()

function reflector(options = EmptyObject) {
  var { decapitalize, capitalize } = options
  
  return new Proxy(EmptyObject, {
    get: (self, key) => {
      if (decapitalize)
        key = key[Decapitalize]()

      if (capitalize)
        key = key[Capitalize]()

      return key
    }
  })
}

module.exports = reflector