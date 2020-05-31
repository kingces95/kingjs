var {
  '@kingjs': { IEnumerable,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ILookup` extends
 * `IEnumerable` with members `has` and `get`.
 */
module[Export]({
  members: { 
    has: null, 
    get: null 
  },
  bases: [ IEnumerable ]
})