var {
  '@kingjs': { ISubject,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description `ICollectibleSubject` extends `ISubject` and 
 * adds a single new member `isEligible` which provides feedback
 * to a producer that a complete event could now be issued and the
 * subject collected.
 */
module[ExportInterface]({
  members: { isEligible: null },
  bases: [ ISubject ]
})