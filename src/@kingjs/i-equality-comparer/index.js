var {
  '@kingjs': { 
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `IGroupedEnumerable` extends `IEnumerable` and 
 * adds a single new member `key`.
 */
module[ExportInterface]({
  members: { 
    equals: null, 
    getHashcode: null 
  }
})