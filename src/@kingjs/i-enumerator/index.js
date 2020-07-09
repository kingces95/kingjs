var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerator` has members `current` and `moveNext`.
 */
module[ExportInterface]({
  members: { 
    moveNext: null,
    current: null,
  },
})