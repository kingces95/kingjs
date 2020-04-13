var {
  assert,
  fs,
  Path,
  '@kingjs': { 
    stringEx: { 
      Expand,
    },
  }
} = require('./dependencies')

var UTF8 = 'utf8'

class Dir {
  constructor(path = '.') {
    this.stack = [ ]
    this.path = path
  }

  read(path) {
    return fs.readFileSync(this.join(path), UTF8)
  }

  expand(path, substitutions) {
    var text = this.read(path)

    this.push(Path.dirname(path))
    var expandedText = text[Expand](substitutions)
    this.pop()

    return expandedText
  }

  exists(path) {
    return fs.existsSync(this.join(path))
  }

  push(dir) {
    this.stack.push(this.path)
    this.path = Path.join(this.path, dir)
  }

  pop() {
    this.path = this.stack.pop()
  }

  join(path) {
    assert(!Path.isAbsolute(path))
    return Path.join(this.path, path)
  }

  toString() {
    return this.path
  }
}

module.exports = Dir