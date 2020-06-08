var { assert,
  '@kingjs': { Path,
    '-fs-promises': { Save, Find,
      '-dir': { Remove: RemoveDir }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var acme = Path.parse('acme')
  await acme[Save]({
    myNs: {
      myPkg: {
        'package.json': { }
      },
    },
  })

  var expected = acme.to('myNs').to('myPkg').to('package.json')

  var result = []
  for await (var path of acme[Find]('package.json'))
    result.push(path)

  assert.ok(result.length == 1)
  var actual = result.pop()
  assert.ok(actual.equals(expected))

  acme[RemoveDir]()
})