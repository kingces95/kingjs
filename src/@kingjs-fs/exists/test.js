var { assert, 
  '@kingjs': { Path, PathBuilder,
    '-string': { Capitalize },
    '-fs': { 
      Move: MoveSync,
      Exists: ExistsSync, 
      Stat: StatSync, 
      '-entity': { DirEntry },
      '-dir': { 
        List: ListSync, 
        Make: MakeSync, 
        Remove: RemoveSync, 
      },
      '-file': { 
        Copy: CopySync, 
        Read: ReadSync, 
        Unlink: UnlinkSync, 
        Write: WriteSync, 
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
        },
        '-file': { 
          Copy: CopyAsync, 
          Read: ReadAsync, 
          Unlink: UnlinkAsync, 
          Write: WriteAsync, 
        },
        '-link': { }
      } 
    },
  }
} = module[require('@kingjs-module/dependencies')]()
var testFs = require('./test-fs')

function getCommon(type, Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink) {
  isType = o => { assert.ok(o instanceof type); return o }
  return {

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
    list: async o => { isType(o); return await o[List]() }, 
    remove: async o => { isType(o); await o[Remove]() },
    make: async (o, n) => { isType(o); return isType(await o[Make](n)) }, 

    // file
    read: async (o, opt) => { isType(o); return await o[Read](opt) },
    unlink: async o => { isType(o); await o[Unlink]() },
    copy: async (o, d, n) => { isType(o); return isType(await o[Copy](d, { name: n })) },
  }
}

async function testPath(Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink) {
  isPath = o => assert.ok(o instanceof PathBuilder)

  // Path, PathBuilder
  await testFs({
    ...getCommon(PathBuilder, Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink),

    dot: Path.dot,
  
    // directory
    write: async (o, n, t, opt) => { isPath(o); return await o.to(n)[Write](t, opt) },
  })
}

async function testEntry(Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink) {
  isEntry = o => { assert.ok(o instanceof DirEntry); return o }

  // DirEntry
  await testFs({
    ...getCommon(DirEntry, Exists, Move, Stat, List, Make, Remove, Copy, Read, Write, Unlink),

    dot: DirEntry.dot,

    // directory
    write: async (o, n, t, opt) => { isEntry(o); return isEntry(await o[Write](n, t, opt)) },
  })
}

var names = ['exists', 'move', 'stat', 'list', 'make', 'remove', 'copy', 'read', 'write', 'unlink']
var capitalizedNames = names.map(o => o[Capitalize]())
var asyncNames = names.map(o => o + 'Async')
var syncSymbols = capitalizedNames.map(o => eval(o + 'Sync'))
var asyncSymbols = capitalizedNames.map(o => eval(o + 'Async'))

process.nextTick(async () => {
  await testPath(...syncSymbols)
  await testPath(...asyncSymbols)

  await testEntry(...names)
  await testEntry(...asyncNames)
})