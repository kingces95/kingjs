var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ISingleton` has a single member `isSingleton`.
 */
module[ExportInterface]({
  members: { isSingleton: null },
})