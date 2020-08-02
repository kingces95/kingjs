var { assert, 
  '@kingjs': { Path, PathBuilder,
    '-string': { Capitalize },
    '-fs': { 
      Move: MoveSync,
      Exists: ExistsSync, 
      Stat: StatSync, 
      '-entity': { DirEntry, InoLink, InoVersionLink },
      '-dir': { 
        List: ListSync, 
        Make: MakeSync, 
        Remove: RemoveSync, 
        Write: WriteSync, 
      },
      '-file': { 
        Copy: CopySync, 
        Read: ReadSync, 
        Unlink: UnlinkSync, 
      },
      '-link': { },
      '-promises': { 
        Move: MoveAsync,
        Exists: ExistsAsync, 
        Stat: StatAsync, 
        '-dir': { 
          List: ListAsync, 
          Make: MakeAsync, 
          Remove: RemoveAsync, 
          Write: WriteAsync, 
        },
        '-file': { 
          Copy: CopyAsync, 
          Read: ReadAsync, 
          Unlink: UnlinkAsync, 
        },
        '-link': { }
      } 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

var testFs = require('./test-fs')

var names = ['exists', 'move', 'stat', 'list', 'make', 'remove', 'copy', 'read', 'write', 'unlink']
var capitalizedNames = names.map(o => o[Capitalize]())
var asyncNames = names.map(o => o + 'Async')
var syncSymbols = capitalizedNames.map(o => eval(o + 'Sync'))
var asyncSymbols = capitalizedNames.map(o => eval(o + 'Async'))

async function test(dot, type, Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink) {
  isType = o => { assert.ok(o instanceof type); return o }
  await testFs({
    dot,

    // tests
    getName: o => o.name,
    isDirectory: o => o.isDirectory,
    isFile: o => o.isFile,
    isSymbolicLink: o => o.isSymbolicLink,

    // general
    move: async (o, d, n) => { isType(o); return isType(await o[Move](d, { name: n })) },
    exists: async o => { isType(o); return await o[Exists](o) },
    getMTime: async (o, opt) => { isType(o); return (await o[Stat](opt)).mtimeMs },
    getIno: async (o, opt) => { isType(o); return (await o[Stat](opt)).ino },

    // directory
    list: async o => { 
      isType(o); 
      var result = await o[List]()
      result.forEach(o => type == PathBuilder || isType(o))
      return result
    }, 
    remove: async o => { isType(o); await o[Remove]() },
    make: async (o, n) => { isType(o); return isType(await o[Make](n)) }, 
    write: async (o, n, d, opt) => { isType(o); return isType(await o[Write](n, d, opt)) },

    // file
    read: async (o, opt) => { 
      isType(o); 
      var result = await o[Read](opt)
      if (opt && opt.link) isType(result)
      return result
    },
    unlink: async o => { isType(o); await o[Unlink]() },
    copy: async (o, d, n) => { isType(o); return isType(await o[Copy](d, { name: n })) },
  })
}

process.nextTick(async () => {
  await test(Path.dot, PathBuilder, ...syncSymbols)
  await test(Path.dot, PathBuilder, ...asyncSymbols)

  await test(DirEntry.dot, DirEntry, ...names)
  await test(DirEntry.dot, DirEntry, ...asyncNames)

  await test(InoLink.dot, InoLink, ...names)
  await test(InoLink.dot, InoLink, ...asyncNames)

  await test(InoVersionLink.dot, InoVersionLink, ...names)
  await test(InoVersionLink.dot, InoVersionLink, ...asyncNames)
})