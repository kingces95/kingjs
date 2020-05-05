require('@kingjs/shim')
var assert = require('assert')
var PathBuffer = require('@kingjs/path-buffer')
var { Complete } = require('@kingjs/rx.i-observer')
var { Subscribe } = require('@kingjs/rx.i-observable')
var WatchSubject = require('@kingjs/fs.rx.subject.watch')
var LinkSubject = require('@kingjs/fs.rx.subject.link')
var PathSubject = require('..')

process.chdir('../../../../..')
var pwdBuffer = PathBuffer.create()
var pwd = PathSubject.create(
  pwdBuffer,
  o => new WatchSubject(o.buffer)
)

var i = 0;

function watch(pathSubject) {
  assert(pathSubject instanceof PathSubject)

  var children = { }

  pathSubject
    [Subscribe](
      o => {
        assert(o instanceof LinkSubject)
        assert(o.isDirectory || o.isFile)

        var path = o.isFile ? o.path : o.pathAsDir
        //console.log(i++, '+', path, o.ino)
        
        var { name } = o

        if (o.isFile) {

          if (name != 'package.json')
            return

          o[Subscribe](
            x => console.log(i++, 'Δ', path),
            () => console.log(i++, '-', path)
          )
          return
        }

        if (name.length > 1 && name[0] == '.')
          return

        if (name == 'node_modules')
          return

        o[Subscribe](
          x => {
            children[x.name] = x
            x[Subscribe](null, () => delete children[x.name])
            watch(x)
          },
          () => {
            for (var name in children)
              children[name][Complete]()
            //console.log(i++, '-', path)
          }
        )
      }
    )
}

watch(pwd)
return