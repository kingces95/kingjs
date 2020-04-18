var { 
  fs,
  ['@kingjs']: { 
    module: { ExportExtension },
    path: { Builder: Path },
  }
} = require('./dependencies')

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to read.
 * 
 * @returns Binary data or text.
 */
async function writeFile(data) {
  return fs.writeFileSync(this.buffer, data)
}

module[ExportExtension](Path, writeFile)