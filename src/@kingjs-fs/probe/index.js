var { 
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs': { Exists }
  },
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Searches parent directories for a path.
 * 
 * @param this The directory to start the probe.
 * @param path That relative path to probe for from each parent directory.
 * 
 * @returns Returns the first absolute path found by the probe.
 */
function probe(path) {
  var dir = Path.cwd().to(this)
  
  while (dir) {
    var result = dir.to(path)
    if (result[Exists]())
      return result

    var dir = dir.dir
  }
}

module[ExportExtension](Path.Builder, probe)