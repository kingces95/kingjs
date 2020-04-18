var assert = require('assert')
var CreateReadme = require('..')
var Path = require('@kingjs/path.builder')
var Save = require('@kingjs/fs.promises.save')
var ReadFile = require('@kingjs/fs.promises.file.read')
var RemoveDir = require('@kingjs/fs.promises.dir.remove')

async function run() {
  var acme = Path.Cwd.to('acme')
  var foo = acme.to('ns0').to('ns1').to('foo')

  await acme[Save]({
    '.md': {
      'readme.t.md': 
        "npmjs: ${npmjs}\n" +
        "foo.txt: ${canInclude('foo.txt') ? include('foo.txt') : '' }\n" +
        "namespaces: ${namespaces}\n" +
        "segments: ${segments}\n" +
        "pgk.name: ${pkg.name}\n" +
        "info.description: ${info.description}\n" +
        "x.t.md: ${expand('x.t.md')}\n" +
        "y.t.md: ${expand('y.t.md')}",
      'x.t.md': "global x",
      'y.t.md': "global y",
    },
    'npm-scope.json': {
      name: 'acme'
    },
    ns0: { 
      ns1: { 
        foo: {
          '.md': {
            'y.t.md': "local y"
          },
          'foo.txt': "This is foo.txt",
          'index.js': 
            "/**\n" +
            "* @description This is a description.\n" +
            "*/\n" +
            "function foo() { }",
          'package.json': {
            name: '@acme/ns0.ns1.foo',
            main: 'index.js'
          }
        }
      } 
    }
  })

  await foo[CreateReadme]()

  var readme = await foo.to('readme.md')[ReadFile]('utf8')

  assert.equal(
    'npmjs: https://www.npmjs.com/package/\n' +
    'foo.txt: This is foo.txt\n' +
    'namespaces: ns0,ns0.ns1,ns0.ns1.foo\n' +
    'segments: ns0,ns1,foo\n' +
    'pgk.name: @acme/ns0.ns1.foo\n' +
    'info.description: This is a description.\n' +
    'x.t.md: global x\n' +
    'y.t.md: local y',
    readme
  )

  await acme[RemoveDir]()
}
run().catch(o => console.log(o))