var { 
  Path,
  ['@kingjs']: {
    module: { ExportExtension },
    Path,
    fs: {
      promises: {
        Exists 
      }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Searches parent directories for a path.
 * 
 * @param this The directory to start the probe.
 * @param path That relative path to probe for from each parent directory.
 * 
 * @returns Returns the first absolute path found by the probe.
 */
async function probe(path) {
  var cwd = Path.cwd()
  var dir = cwd.to(this)
  
  while (dir) {
    var result = dir.to(path)
    if (await result[Exists]())
      return cwd.toRelative(result)

    var dir = dir.dir
  }
}

module[ExportExtension](Path.Builder, probe)