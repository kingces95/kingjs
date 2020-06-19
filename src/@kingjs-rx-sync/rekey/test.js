var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    '-rx': { 
      '-static': { never },
      '-sync': { SubscribeAndAssert, Select, Then, 
        '-static': { of, throws }
      }
    },
  }
} = module[require('@kingjs-module/dependencies')]()