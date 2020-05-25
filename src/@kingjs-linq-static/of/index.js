var { 
  '@kingjs': { 
    '-linq-static': { fromIndexable } 
  }
} = module[require('@kingjs-module/dependencies')]()

function of() {
  return fromIndexable(arguments)
}

module.exports = of