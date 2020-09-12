var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
  }
} = module[require('@kingjs-module/dependencies')]()

var Text = 'Hello World!'
var AltText = 'Hello World!!'
var DirName = 'myDir'
var FileName = 'myFile.txt'
var FileLinkName = 'myFileLink.txt'
var DirLinkName = 'myDirLink.txt'
var FileCopyName = 'myFileCopy.txt'
var FileMovedName = 'myFileMoved.txt'
var BufferOptions = { encoding: 'buffer' }

module.exports = async function test(options) {

  var { dot } = options
  var { exists, move, stat, refresh } = options
  var { list, make, write, symlinkTo, remove } = options
  var { copy, unlink } = options
  var { read, overwrite } = options
  var { follow } = options

  var debug = dot.__toString

  var acme = await make(dot, 'acme')
  
  // reset
  await remove(acme)
  acme = await make(dot, 'acme')

  // make/exists directory
  var dir = await make(acme, DirName)
  assert.ok(await exists(acme))
  
  // write/exists file
  var file = await write(acme, FileName, Text)
  assert.ok(await exists(file))

  // read file as text
  var text = await read(file)
  assert.equal(text, Text)

  // read file as buffer
  var buffer = await read(file, BufferOptions)
  assert.ok(buffer instanceof Buffer)

  // copy file, verify it exists, and its content matches original
  var fileCopy = await copy(file, acme, FileCopyName)
  assert.ok(await exists(fileCopy))
  var fileCopyText = await read(fileCopy)
  assert.equal(fileCopyText, Text)

  // get mtime
  var mtime = (await stat(file)).mtimeMs
  assert(typeof(mtime) == 'number')
  assert.notEqual((await stat(fileCopy)).mtimeMs, mtime)

  // get ino, see its different than the original
  var ino = (await stat(file)).ino
  assert.notEqual((await stat(fileCopy)).ino, ino)

  // unlink file
  await unlink(fileCopy)
  assert.ok(!await exists(fileCopy))

  // rename
  var fileMoved = await move(file, acme, FileMovedName)
  assert.ok(!await exists(file))
  assert.ok(await exists(fileMoved))

  // check ino and mtime are the same after rename
  assert.equal(ino, (await stat(fileMoved)).ino)
  assert.equal(mtime, (await stat(fileMoved)).mtimeMs)

  // move back
  await move(fileMoved, acme, FileName)

  // list directory
  var dirents = await list(acme)
  assert.ok(dirents[0][Equals](dir))
  assert.ok(dirents[1][Equals](file))

  // link to file
  var fileLink = await symlinkTo(dir, FileLinkName, acme, { name: file.name })
  assert.ok(await exists(fileLink))

  // link's identity is not that of the linked file
  assert.notEqual(fileLink[GetHashcode](), file[GetHashcode]())
  assert.ok(!fileLink[Equals](file))
  assert.ok(fileLink[IsLessThan](file) != file[IsLessThan](fileLink))

  // follow link as a link (dereference)
  var linkedFile = await follow(fileLink)
  assert.ok(linkedFile[Equals](file))
  assert.equal(linkedFile[GetHashcode](), file[GetHashcode]())
  assert.ok(!linkedFile[IsLessThan](file))
  assert.ok(!file[IsLessThan](linkedFile))

  // link to dir
  var dirLink = await symlinkTo(dir, DirLinkName, acme)
  assert.ok(await exists(dirLink))

  // link's identity is not that of the linked dir
  assert.notEqual(acme[GetHashcode](), file[GetHashcode]())
  assert.ok(!dirLink[Equals](acme))
  assert.ok(dirLink[IsLessThan](acme) != acme[IsLessThan](dirLink))

  // follow link as a link (dereference)
  var linkedDir = await follow(dirLink)
  acme = await refresh(acme)
  assert.ok(linkedDir[Equals](acme))
  assert.equal(linkedDir[GetHashcode](), acme[GetHashcode]())
  assert.ok(!linkedDir[IsLessThan](acme))
  assert.ok(!acme[IsLessThan](linkedDir))

  // list directory
  var linkDirents = await list(dir)
  assert.ok(linkDirents[0][Equals](dirLink))
  assert.ok(linkDirents[1][Equals](fileLink))

  // remove dir
  await remove(dir)
  assert.ok(!await exists(dir))

  // overwrite
  var fileOverwrite = await overwrite(file, AltText)
  assert.equal(AltText, await read(fileOverwrite))

  // check ino is the same but mtime changed after overwrite
  assert.equal(ino, (await stat(fileOverwrite)).ino)
  assert.notEqual(mtime, (await stat(fileOverwrite)).mtimeMs)

  // cleanup
  await remove(acme)
}