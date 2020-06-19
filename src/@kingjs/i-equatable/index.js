var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
module[Export]({
  members: { 
    equals: null,
    getHashcode: null,
  },
})