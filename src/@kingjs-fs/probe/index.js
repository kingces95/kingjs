var { 
  '@kingjs': { EmptyObject, Path,
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
function probeSync(path, cwd, dir) {
  while (dir) {
    var result = dir.to(path)
    if (result[Exists]())
      return cwd.toRelative(result)

    var dir = dir.dir
  }
}

async function probeAsync(path, cwd, dir) {  
  while (dir) {
    var result = dir.to(path)
    if (await result[Exists]())
      return cwd.toRelative(result)

    var dir = dir.dir
  }
}

function probe(path, options = EmptyObject) {
  var { async = false } = options  
  var cwd = Path.cwd()
  var dir = cwd.to(this)

  return (async ? probeAsync : probeSync).call(this, path, cwd, dir)
}

module[ExportExtension](Path.Builder, probe)