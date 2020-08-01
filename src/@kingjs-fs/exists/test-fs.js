var { assert,
  '@kingjs': {
    IEquatable: { Equals, GetHashcode },
    IComparable: { IsLessThan },
  }
} = module[require('@kingjs-module/dependencies')]()

var Text = 'Hello World!'
var DirName = 'myDir'
var FileName = 'myFile.txt'
var FileLinkName = 'myFileLink.txt'
var FileCopyName = 'myFileCopy.txt'
var LinkOptions = { link: true }
var BufferOptions = { encoding: 'buffer' }

module.exports = async function test(options) {

  var { dot } = options
  var { exists, move, getMTime, getIno } = options
  var { list, make, remove, isDirectory, isFile, isSymbolicLink, getName } = options
  var { copy, read, write, unlink } = options

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

  // read file
  var text = await read(file)
  assert.equal(text, Text)

  // read file (binary)
  var buffer = await read(file, BufferOptions)
  assert.ok(buffer instanceof Buffer)

  // link to file, read as a link and a file
  var link = await write(acme, FileLinkName, file, LinkOptions)
  assert.ok(await exists(link))
  assert.equal(await read(link), Text)

  // reflect on the link itself
  var linkedFile = await read(link, LinkOptions)
  assert.ok(linkedFile[Equals](file))
  assert.equal(linkedFile[GetHashcode](), file[GetHashcode]())
  assert.ok(!linkedFile[IsLessThan](file))

  // list directory
  var dirents = await list(acme)

  // find subdirectory bar
  var directories = dirents.filter(isDirectory)
  assert.deepEqual([ DirName ], directories.map(getName))

  // find file foo.txt
  var files = dirents.filter(isFile)
  assert.deepEqual([ FileName ], files.map(getName))
  
  // find symbolic links
  var files = dirents.filter(isSymbolicLink)
  assert.deepEqual([ FileLinkName ], files.map(getName))

  // remove dir
  await remove(dir)
  assert.ok(!await exists(dir))

  // copy file, verify it exists, and its content matches original
  var fileCopy = await copy(file, acme, FileCopyName)
  assert.ok(await exists(fileCopy))
  var fileCopyText = await read(fileCopy)
  assert.equal(fileCopyText, Text)

  // get mtime
  var mtime = await getMTime(file)
  assert(typeof(mtime) == 'number')
  assert.notEqual(await getMTime(fileCopy), mtime)
  assert.equal(await getMTime(link), mtime)
  assert.ok(await getMTime(link, LinkOptions) > mtime)

  // get ino, see its different than the original
  var ino = await getIno(file)
  assert.notEqual(await getIno(fileCopy), ino)
  assert.notEqual(await getIno(link, LinkOptions), ino)

  // unlink file
  await unlink(fileCopy)
  assert.ok(!await exists(fileCopy))

  // rename copy to original file, check for the swap
  fileCopy = await move(file, acme, FileCopyName)
  assert.ok(!await exists(file))
  assert.ok(await exists(fileCopy))

  // check ino and mtime are the same after rename
  assert.equal(ino, await getIno(fileCopy))
  assert.equal(mtime, await getMTime(fileCopy))

  // cleanup
  await remove(acme)
}