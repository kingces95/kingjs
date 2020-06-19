var {
  '@kingjs': {
    IObservable,
    IEquatable: { GetHashcode, Equals },
    '-string': { GetHashcode: GetStringHashcode },
    '-fs-dir': { List, typeOf },
    '-rx': {
      '-sync': { SelectManyGroups, Regroup, Select }
    },
    '-interface': { ExportExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Options = { withFileTypes: true }
var CompareName = (l, r) => l.name < r.name
var CompareNameAndType = (l, r) => 
  l.name != r.name ? l.name < r.name : l.type < r.type

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
function listDir(dir) {
  return this
    [SelectManyGroups](
      value => {
        var dirents = dir[List](Options)
        dirents.forEach(o => o.value = value)
        dirents.forEach(o => o.type = typeOf(o))
        dirents.sort(CompareName)
        return dirents
      },
      dirent => new Key(dirent.name, dirent.type),
      CompareNameAndType
    )
    [Regroup](dirent => dirent[Select](x => x.value))
}

class Key {
  constructor(name, type) {
    this.name = name
    this.type = type
  }
  [Equals](o) { 
    return o.name == this.name && 
      o.type == this.type 
  }
  [GetHashcode]() { 
    return this.name[GetStringHashcode]() ^ 
      this.type[GetStringHashcode]() 
  }
}

module[ExportExtension](IObservable, listDir)