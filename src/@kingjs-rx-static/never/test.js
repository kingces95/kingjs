var {
  '@kingjs': {
    '-rx': { 
      '-static': { never },
      '-sync': { SubscribeAndAssert }, 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var cancel = never()
  [SubscribeAndAssert](null, { unfinished: true })

setTimeout(() => {
  cancel()
}, 500)
