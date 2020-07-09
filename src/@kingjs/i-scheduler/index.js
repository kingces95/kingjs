var {
  '@kingjs-module': { ExportInterface }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asynchronously executes a callback deffed by a time span.
 */
module[ExportInterface]({
  members: { 
    time: null,
    schedule: null,
  },
})