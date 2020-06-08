var { 
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-fs': {
      '-dir': { Partition },
      '-promises-dir': { List }
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var Options = {
  withFileTypes: true
}
var EmptyArray = []

/**
 * @description Searches parent directories for a path.
 * 
 * @param this The directory to start the search.
 * @param pattern The file or directory names to match.
 * 
 * @returns Returns an async generator of paths that match the predicate.
 */
async function* find(pattern) {
  var dir = this

  var list = await dir
    [List](Options)

  list = list
    [Partition]()

  // search files
  for (var name of list.files || EmptyArray) {
    if (name == pattern)
      yield dir.to(name)
  }

  // search directories
  for (var name of list.directories || EmptyArray) {
    if (name == pattern)
      yield dir.to(name)

    yield* find.call(dir.to(name), pattern)
  }
}

module[ExportExtension](Path.Builder, find)