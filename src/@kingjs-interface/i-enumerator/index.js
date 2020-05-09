var {
  '@kingjs-interface': { define: defineInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerator` has members `current` and `moveNext`.
 */
module.exports = defineInterface(
  '@kingjs-interface/IEnumerator', {
    members: { 
      moveNext: null,
      current: null,
    },
  }
)