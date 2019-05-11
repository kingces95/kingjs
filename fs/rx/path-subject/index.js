var { 
  path: Path,
  ['@kingjs']: {
    rx: { 
      Subject,
    },
  }
} = require('./dependencies')

var DefaultPath = '.'
var DefaultParent = null

class PathSubject extends Subject {
  constructor(
    path = DefaultPath, 
    parent = DefaultParent) {
    super()

    this.path = path
    this.parent = parent
    this.dir = Path.dirname(path)
    this.basename = Path.basename(path)
  }
}

module.exports = PathSubject