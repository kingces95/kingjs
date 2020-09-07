var {
  '@kingjs': { 
    IEqualityComparer,
    '-module': { ExportInterface }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 */
module[ExportInterface]({
  members: { 
    isLessThan: null, 
  },
  bases: [ IEqualityComparer ]
})