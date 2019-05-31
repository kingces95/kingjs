var { 
  assert,
  path: Path,
  fs: { promises: fsp }, 
  ['@kingjs']: {
    reflect: { 
      is,
      createSymbol 
    },
    fs: { 
      rx: { 
        subject: { 
          Path,
          File,
          Dir,
          FileLink,
          DirLink
        }
      }
    },
    rx: {
      Pool,
      WindowBy,
      Where,
      ProxySubject,
      Singletons
    },
  }
} = require('./dependencies')

var Dot = '.'
var DefaultCreateSubject = o => new Watch(o.buffer)

/**
 * @description A `ProxySubject` which composes a `PathBuffer`.
 * 
 * @remarks For each observation, the path is checked and if its linked inode 
 * has changed then a new derivation InodeSubject is emitted after closing
 * the previously emitted InodeSubject, if any.
 * 
 * @remarks - `PathSubject.create(createSubject, activate[, isAbsolute])`
 * activates a new instance.
 * @remarks - Same with `PathSubject.createAbsolute(createSubject, activate)` 
 * @remarks - `PathSubject` supports the same properties as a `PathBuffer`
 * with the following exceptions
 * @remarks -- `parent`: Returns a parent `PathSubject`
 * @remarks -- `joinWith(name)`: Returns a `PathSubject` activated with
 * using the parent's `createSubject` and `activate`
 * @remarks -- `root`: Returns a `PathSubject`
 * 
 * ProxySubject implements ISubject
 * InodeSubject(ino) extends ProxySubject
 * DirSubject(ino) extends InodeSubject : PathSubject -> names -> PathSubjects if new paths
 * FileSubject(ino) extends InodeSubject : PathSubject -> ctime -> null if newer
 * PathSubject(name, parent) extends ProxySubject : null -> stats -> InodeSubject
 */
class PathSubject extends ProxySubject {
  
  static create(
    pathBuffer = Dot, 
    createSubject = DefaultCreateSubject) {
    
    var cluster = new Singletons()
  
    var getOrCreate = {
      file: ino => cluster.getOrCreate(ino, ino => new File(ino)),
      dir: ino => cluster.getOrCreate(ino, ino => new Dir(ino))
    }
  
    var unlink = inode => cluster.release(inode)
    var link = function link(path, stats) {
      var { ino } = stats
  
      if (stats.isFile()) 
        return new FileLink(path, ino, getOrCreate.file, unlink)
  
      if (stats.isDirectory())
        return new DirLink(path, ino, getOrCreate.dir, unlink)
  
      assert.fail()
    }
  
    return new Path(pathBuffer, link, createSubject)
  }

  constructor(
    pathBuffer,
    createLink,
    createSubject,
    parent) {

    super(createSubject, o => o
      [Pool](async () => {
        try {
          var stats = await fsp.stat(this.buffer)
          var result = { stats }
          
          if (stats.isDirectory())
            result.dirent = fsp.readdir(this.buffer)
          
          return result
        } catch(e) { } // ignore; assume race lost with deletion 
      })
      [Where]()
      [WindowBy](
        o => o.stats.ino,
        o => o.dirent || o.stats,
        o => createLink.call(this, o.stats)
      )
    )
  
    this.pathBuffer = pathBuffer
    this.parent = parent
  }

  get root() { return this.root = this.parent.root }

  // compose PathBuffer
  get buffer() { return this.pathBuffer.buffer }
  get name() { return this.pathBuffer.name }
  get path() { return this.pathBuffer.path }
  get pathAsDir() { return this.pathBuffer.pathAsDir }
  get dir() { return this.pathBuffer.dir }
  get bufferAsDir() { return this.pathBuffer.bufferAsDir }
  get isAbsolute() { return this.pathBuffer.isAbsolute }

  toString() { return this.pathBuffer.toString() }
}

module.exports = PathSubject