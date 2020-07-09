var {
  '@kingjs': { IEnumerable,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IOrderedEnumerable` extends
 * `IEnumerable` with  a single member 
 * `createOrderedEnumerable`.
 */
module[ExportInterface]({
  members: { createOrderedEnumerable: null },
  extends: [ IEnumerable ]
})