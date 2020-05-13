var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
module[ExportInterface]({
  members: { GetEnumerator: null },
})