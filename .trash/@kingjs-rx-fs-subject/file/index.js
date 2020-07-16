var { 
  '@kingjs': {
    '-rx': { Subject, Publish, DistinctUntilChanged,
      '-fs-subject': { Inode: InodeSubject },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

class RealFileSubject extends Subject { }
var createSubject = () => new RealFileSubject()

class FileSubject extends InodeSubject {
  constructor(ino) {
    super(ino, createSubject, o => o
      [DistinctUntilChanged](o => o.ctime.getTime())
      [Publish]()
    )
  }

  get isFile() { return true }
}

module.exports = FileSubject