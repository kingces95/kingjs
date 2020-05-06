var { fs: { promises: fs },
  '@kingjs': { Path,
    '-module': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * 
 * @returns Binary data or text.
 */
async function writeFile(data) {
  return fs.writeFile(this.buffer, data)
}

module[ExportExtension](Path.Builder, writeFile)