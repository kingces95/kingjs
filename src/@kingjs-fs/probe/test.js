var { assert,
  '@kingjs': { Path,
    '-fs': { Probe, 
      '-dir': { Remove }, 
      '-file': { Read },
      '-promises': { Save }
    },
    '-json-file': { Read: ReadJsonFile }
  },
} = module[require('@kingjs-module/dependencies')]()

var Async = { async: true }
var Sync = { }

async function test(options) {
  var { async = false } = options

  var acme = Path.parse('acme')
  await acme[Save]({
    myNs: {
      myPkg: {
        'package.json': {
          name: "@acme/myNs.myPkg"
        }
      },
    },
    'npm-scope.json': {
      name: 'acme'
    },
    '.md': {
      'readme.t.md': "#name ${pkg.name}"
    }
  })

  var myPkg = acme.to('root').to('myNs').to('myPkg')

  var npmScopePath = myPkg[Probe]('npm-scope.json', options)
  assert.ok((result instanceof Promise) == async)
  npmScopePath = await npmScopePath

  var { name } = npmScopePath[ReadJsonFile]()
  assert.equal(name, 'acme')

  var readmeTemplate = Path.parse('.md').to('readme.t.md')
  var templatePath = myPkg[Probe](readmeTemplate)
  var text = templatePath[Read]('utf8')
  assert.equal(text, "#name ${pkg.name}")

  assert(await myPkg[Probe]('no.such.file', options) === undefined)

  acme[Remove]()
} 

process.nextTick(async() => {
  await test(Async)
  await test(Sync)
})