var { fs,
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
function writeFile(data) {
  return fs.writeFileSync(this.buffer, data)
}

module[ExportExtension](Path.Builder, writeFile)