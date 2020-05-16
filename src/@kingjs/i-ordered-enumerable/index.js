var {
  '@kingjs': { IEnumerable,
    '-interface': { Export }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IOrderedEnumerable` extends
 * `IEnumerable` with  a single member 
 * `createOrderedEnumerable`.
 */
module[Export]({
  members: { createOrderedEnumerable: null },
  extends: [ IEnumerable ]
})