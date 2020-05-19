var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Asynchronously executes a callback deffed by a time span.
 */
module[Export]({
  members: { 
    time: null,
    schedule: null,
  },
})