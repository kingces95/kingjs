var { fs: { promises: fs },
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options Selects a partition name from each element 
 * 
 * @returns Binary data or text.
 */
async function readFile(options) {
  return fs.readFile(this.buffer, options)
}

module[ExportExtension](Path.Builder, readFile)