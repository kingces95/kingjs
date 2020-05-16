var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerator` has members `current` and `moveNext`.
 */
module[Export]({
  members: { 
    moveNext: null,
    current: null,
  },
})