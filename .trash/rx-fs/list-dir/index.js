var {
  '@kingjs': {
    EmptyObject,
    IObservable,
    IEquatable: { GetHashcode, Equals },
    '-string': { GetHashcode: GetStringHashcode },
    '-fs-dir': { List },
    '-rx': {
      '-sync': { GroupSetBy, Regroup, Select }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Observe changes to a directory listing.
 * @this any An `IObservable` whose emissions trigger a scan of the directory.
 * @param selectDir The path of the directory to list.
 * @returns Returns an `IObservable` that emits an `IGroupedObservable` for each
 * directory entry with key { name, type }, which in turn emits the event that
 * triggered the scan.
 * 
 * @remarks The `IGroupedObservable` key is `IEquatable`.
 **/
function listDir(dir, options = EmptyObject) {
  options = { ...options, withFileTypes: true }
  return this
    [Select](() => dir[List](options))
    [GroupSetBy]()
    [Regroup](dirent => dirent[Select](x => x.value))
}


module[ExportInterfaceExtension](IObservable, listDir)