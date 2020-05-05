var Path = require('path')

function logs(path) {
  console.log({
    path: path,
    parse: Path.parse(path),
    dir: Path.dirname(path),
    basename: Path.basename(path),
    extname: Path.extname(path),
  })
}
logs('')
logs('.')
logs('/')
logs('foo.js')
logs('./foo.js')
logs('/foo.js')
logs('d/foo.js')
logs('./d/foo.js')
logs('/d/foo.js')
logs('..')
logs('../../foo')

console.log(Path.normalize('foo/../foo/bar/./.'))
console.log(Path.normalize('foo/../..'))
console.log(Path.join('..', 'foo'))

console.log('---')
console.log(Path.relative('foo/bar.js', 'foo/baz.js'))
console.log(Path.relative('foo/bar', 'foo/baz'))
