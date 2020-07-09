var {
  '@kingjs': { IEnumerable,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ILookup` extends
 * `IEnumerable` with members `has` and `get`.
 */
module[ExportInterface]({
  members: { 
    has: null, 
    get: null 
  },
  bases: [ IEnumerable ]
})