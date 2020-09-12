var { assert, 
  '@kingjs': { Path, PathBuilder,
    '-string': { Capitalize },
    '-fs': { 
      Link,
      Exists: ExistsSync, 
      Move: MoveSync,
      Stat: StatSync,
      '-dir': { 
        List: ListSync, 
        Make: MakeSync, 
        Remove: RemoveSync, 
        Write: WriteSync, 
        SymlinkTo: SymlinkToSync, 
      },
      '-leaf': { 
        Copy: CopySync, 
        Unlink: UnlinkSync, 
      },
      '-file': { 
        Read: ReadSync, 
        Overwrite: OverwriteSync, 
      },
      '-symlink': {
        Follow: FollowSync, 
      },
      '-promises': { 
        Exists: ExistsAsync, 
        Move: MoveAsync,
        Stat: StatAsync, 
        '-dir': { 
          List: ListAsync, 
          Make: MakeAsync, 
          Remove: RemoveAsync, 
          Write: WriteAsync, 
          SymlinkTo: SymlinkToAsync, 
        },
        '-leaf': { 
          Copy: CopyAsync, 
          Unlink: UnlinkAsync, 
        },
        '-file': { 
          Read: ReadAsync, 
          Overwrite: OverwriteAsync, 
        },
        '-symlink': { 
          Follow: FollowAsync, 
        }
      } 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var testFs = require('./test-fs')
var RefreshAsync = null
var RefreshSync = null

var names = [
  'exists', 'move', 'stat', 'refresh',
  'list', 'make', 'remove', 'write', 'symlinkTo',
  'copy', 'unlink',
  'read', 'overwrite',
  'follow' 
]
var asyncNames = names.map(o => o + 'Async')

var capitalizedNames = names.map(o => o[Capitalize]())
var syncSymbols = capitalizedNames.map(o => eval(o + 'Sync'))
var asyncSymbols = capitalizedNames.map(o => eval(o + 'Async'))

async function test(async, dot, type, 
  Exists, Move, Stat, Refresh,
  List, Make, Remove, Write, SymlinkTo,
  Copy, Unlink,
  Read, Overwrite,
  Follow) {

  p = o => { assert.ok(!async || o instanceof Promise); return o }
  isType = o => { assert.ok(o instanceof type); return o }
  await testFs({
    dot,

    // tests
    getName: o => o.name,
    isDirectory: o => o.isDirectory,
    isFile: o => o.isFile,
    isSymbolicLink: o => o.isSymbolicLink,

    // general
    move: async (o, d, n) => { isType(o); return isType(await p(o[Move](d, { name: n }))) },
    exists: async o => { isType(o); return await p(o[Exists](o)) },
    stat: async (o, opt) => { isType(o); return await p(o[Stat](opt)) },
    refresh: async o => { isType(o); return !Refresh ? o : isType(await p(o[Refresh]())) },

    // directory
    list: async o => { 
      isType(o)
      var result = await p(o[List]())
      result.forEach(o => type == PathBuilder || isType(o))
      return result
    }, 
    remove: async o => { isType(o); await p(o[Remove]()) },
    make: async (o, n) => { isType(o); return isType(await p(o[Make](n))) }, 
    write: async (o, n, d, opt) => { isType(o); return isType(await p(o[Write](n, d, opt))) },
    symlinkTo: async (o, n, d, opt) => { isType(o); return isType(await p(o[SymlinkTo](n, d, opt))) },

    // leaf
    unlink: async o => { isType(o); await p(o[Unlink]()) },
    copy: async (o, d, n) => { isType(o); return isType(await p(o[Copy](d, { name: n }))) },

    // file
    overwrite: async (o, d, opt) => { isType(o); return await p(o[Overwrite](d, opt)) },
    read: async (o, opt) => { isType(o); return await p(o[Read](opt)) },

    // symlink
    follow: async (o, opt) => { isType(o); return isType(await p(o[Follow](opt))) },
  })
}

process.nextTick(async () => {
  await test(false, Link.dot, Link, ...names)
  await test(true, Link.dot, Link, ...asyncNames)

  await test(false, Path.dot, PathBuilder, ...syncSymbols)
  await test(true, Path.dot, PathBuilder, ...asyncSymbols)
})