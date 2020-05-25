var {
  '@kingjs': { IEnumerable,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedEnumerable` extends `IEnumerable` and 
 * adds a single new member `key`.
 */
module[Export]({
  members: { key: null },
  bases: [ IEnumerable ]
})