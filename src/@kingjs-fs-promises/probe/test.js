var { assert,
  '@kingjs': { Path,
    '-json-file': { read: ReadJsonFile },
    '-fs-promises': { Save, Probe,
      '-dir': { Remove: RemoveDir },
      '-file': { Read: ReadFile }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

async function test() {
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

  var npmScopePath = await myPkg[Probe]('npm-scope.json')
  var { name } = await npmScopePath[ReadJsonFile]()
  assert.equal(name, 'acme')

  var readmeTemplate = Path.parse('.md').to('readme.t.md')
  var templatePath = await myPkg[Probe](readmeTemplate)
  var text = await templatePath[ReadFile]('utf8')
  assert.equal(text, "#name ${pkg.name}")

  assert(await myPkg[Probe]('no.such.file') === undefined)

  acme[RemoveDir]()
} 
test()