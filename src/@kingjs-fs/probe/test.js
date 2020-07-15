var { assert,
  '@kingjs': { Path,
    '-fs': { Probe: ProbeSync, 
      '-dir': { Remove }, 
      '-file': { Read },
      '-promises': { Save, Probe: ProbeAsync }
    },
    '-json-file': { Read: ReadJsonFile }
  },
} = module[require('@kingjs-module/dependencies')]()

async function test(Probe) {
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

  var npmScopePath = myPkg[Probe]('npm-scope.json')
  assert.ok((npmScopePath instanceof Promise) == (Probe == ProbeAsync))
  npmScopePath = await npmScopePath

  var { name } = await npmScopePath[ReadJsonFile]()
  assert.equal(name, 'acme')

  var readmeTemplate = Path.parse('.md').to('readme.t.md')
  var templatePath = await myPkg[Probe](readmeTemplate)
  var text = templatePath[Read]('utf8')
  assert.equal(text, "#name ${pkg.name}")

  assert(await myPkg[Probe]('no.such.file') === undefined)

  acme[Remove]()
} 

process.nextTick(async() => {
  await test(ProbeSync)
  await test(ProbeAsync)
})