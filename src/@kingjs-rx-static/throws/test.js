var { 
  '@kingjs': {
    IObserver: { Error },
    IObservable: { Subscribe },
    '-rx': {
      '-sync': { SubscribeAndAssert }, 
      '-static': { throws }
    },
  }
} = module[require('@kingjs-module/dependencies')]()

throws()
  [SubscribeAndAssert]([], { error: null })

var nada = throws()
var cancel = nada[Subscribe]({ [Error]: o => null })
cancel()