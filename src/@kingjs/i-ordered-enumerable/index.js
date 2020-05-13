var {
  '@kingjs-interface': { 
    define: defineInterface,
    IEnumerable
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IOrderedEnumerable` extends
 * `IEnumerable` with  a single member 
 * `createOrderedEnumerable`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IOrderedEnumerable', {
    members: { createOrderedEnumerable: null },
    extends: [ IEnumerable ]
  }
)