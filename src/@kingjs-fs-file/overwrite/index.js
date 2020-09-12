var {
  '@kingjs': { EmptyObject, Path,
    '-module': { ExportExtension },
    '-fs': { Flags,
      '-dir': { Write },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Reads a file at the path.
 * 
 * @this PathBuilder The path to write.
 * 
 * @returns Binary data or text.
 */
function overwrite(data, options = EmptyObject) {
  var { async, encoding } = options
  return this.dir[Write](this.name, data, { 
    async, encoding, flag: Flags.OpenExistingForReadingAndWriting 
  })
}

module[ExportExtension](Path.Builder, overwrite)