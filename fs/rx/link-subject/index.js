var { 
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

class LinkSubject extends PathSubject {
  static create(subjectFactory) {
    return new LinkSubject({ subjectFactory })
  }

  constructor({ name, parent, subjectFactory = DefaultSubjectFactory }) {
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

  create(name) {
    return new LinkSubject({ 
      name, 
      parent: this,
      subjectFactory: this[SubjectFactory]
    })
  }
}

module.exports = LinkSubject

var InodeSubject = require('@kingjs/fs.rx.inode-subject')