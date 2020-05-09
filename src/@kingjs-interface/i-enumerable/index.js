var {
  '@kingjs-interface': { define: defineInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IEnumerable', {
    members: { getEnumerator: null },
  }
)