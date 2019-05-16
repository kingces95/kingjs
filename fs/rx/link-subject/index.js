var { 
  path: Path,
  fs: { promises: fsp }, 
  ['@kingjs']: {
    reflect: { createSymbol },
    fs: { 
      rx: { 
        PathSubject,
      }
    },
    rx: { 
      Pool,
      WindowBy,
      BehaviorSubject,
    },
  }
} = require('./dependencies')

var DefaultSubjectFactory = o => new BehaviorSubject(null)
var SubjectFactory = createSymbol(module, 'subject-factory')

/**
 * @description Represents the link between a path and an inode.
 * 
 * @remarks For each observation, the link is checked and if its 
 * changed then the previously emitted InodeSubject, if any, is
 * closed and a new derivation InodeSubject is emitted.
 */
class LinkSubject extends PathSubject {

  static create(subjectFactory) {
    return new LinkSubject({ subjectFactory })
  }

  static watch(path) {
    var { name, dir } = Path.parse(path)
    if (!dir || dir == RootDir)
    return LinkSubject.create(
      o => new WatchSubject(path)
    )
  }

  constructor({ 
    name, 
    parent, 
    subjectFactory = DefaultSubjectFactory }) {

    super(name, parent, 
      subjectFactory,
      o => o
        [Pool](() => fsp.stat(this.path))
        [WindowBy](
          o => o.ino,
          (o, k) => ({ 
            link: this, 
            stats: o 
          }),
          (o, k) => InodeSubject.create(o)
        )                                                   
      )

    this[SubjectFactory] = subjectFactory
  }

  joinWith(name) {
    return new LinkSubject({ 
      name, 
      parent: this,
      subjectFactory: this[SubjectFactory]
    })
  }
}

module.exports = LinkSubject

var InodeSubject = require('@kingjs/fs.rx.inode-subject')