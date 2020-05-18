var {
  '@kingjs': {
    '-rx': { 
      '-sync': { SubscribeAndAssert }, 
      '-static': { never }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var cancel = never()
  [SubscribeAndAssert](null, { unfinished: true })

setTimeout(() => {
  cancel()
}, 500)
