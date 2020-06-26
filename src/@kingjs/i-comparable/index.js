var {
  '@kingjs-interface': { Export }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IComparable` has a single member `compareTo` which returns
 * true if this object is less than the other object.
 */
module[Export]({
  members: { 
    compareTo: null,
  },
})