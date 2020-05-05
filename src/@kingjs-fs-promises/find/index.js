var { 
  '@kingjs': { Path },
  '@kingjs-module': { ExportExtension },
  '@kingjs-fs-promises-dir': { List }
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

  var list = await dir[List](Options)
  
  for (var path of list.files || EmptyArray) {
    if (path.name == pattern)
      yield path
  }

  for (var subDir of list.directories || EmptyArray) {
    if (subDir.name == pattern)
      yield subDir

    yield* find.call(subDir, pattern)
  }
}

module[ExportExtension](Path.Builder, find)