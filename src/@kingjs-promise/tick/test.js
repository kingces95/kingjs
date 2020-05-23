var { assert,
  '@kingjs': {
    '-promise': { tick },
  }
} = module[require('@kingjs-module/dependencies')]()

process.nextTick(async () => {
  var ticks = 0
  setImmediate(() => ticks++)
  await tick()
  assert.equal(ticks, 1)
})