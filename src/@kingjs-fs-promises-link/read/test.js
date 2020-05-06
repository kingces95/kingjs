var { assert, fs: { promises: fs },
  '@kingjs': { Path,
    '-fs-promises-link': { 
      Write: WriteLink,
      Read: ReadLink 
    },
  }
} = module[require('@kingjs-module/dependencies')]()

async function run() {
  await fs.rmdir('.acme', { recursive: true })

  await fs.mkdir('.acme/foo', { recursive: true })
  await fs.writeFile('.acme/foo/file.txt', 'Hello World!', 'utf8')

  var foo = Path.parse('.acme/foo')
  var bar = Path.parse('.acme/bar/baz')
  await bar[WriteLink](foo)

  var rawBarLink = await bar[ReadLink](true)
  assert(Path.parse('../foo').equals(rawBarLink))

  var barLink = await bar[ReadLink]()
  assert(barLink.equals(foo))

  // read file via directory link
  var text = await fs.readFile('.acme/bar/baz/file.txt', 'utf8')
  assert.equal(text, 'Hello World!')

  var file = Path.parse('.acme/foo/file.txt')
  var moo = Path.parse('.acme/moo.txt')
  moo[WriteLink](file, true)

  var rawMooLink = await moo[ReadLink](true)
  assert(Path.parse('foo/file.txt').equals(rawMooLink))

  var mooLink = await moo[ReadLink]()
  assert(mooLink.equals(file))

  // read file via file link
  var text = await fs.readFile('.acme/moo.txt', 'utf8')
  assert.equal(text, 'Hello World!')

  await fs.rmdir('.acme', { recursive: true })
}
run().catch(e => console.log(e))