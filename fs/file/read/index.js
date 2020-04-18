var { 
  fs,
  ['@kingjs']: { 
    path: { Builder: Path },
    module: { ExportExtension },
  }
} = require('./dependencies')

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * @param options Selects a partition name from each element 
 * 
 * @returns Binary data or text.
 */
function readFile(options) {
  return fs.readFileSync(this.buffer, options)
}

module[ExportExtension](Path, readFile)