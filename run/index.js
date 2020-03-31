const assert = require('assert')

const BlinkMs = 25

function blink() {
  return new Promise(resolve => setTimeout(resolve, BlinkMs));
}

async function run(asyncGeneratorGenerator) {
  var count = 0

  push(asyncGeneratorGenerator)

  while (count)
    await blink()  

  function push(asyncGeneratorGenerator) {
    count++

    if (asyncGeneratorGenerator instanceof Function)
      asyncGeneratorGenerator = asyncGeneratorGenerator()

    process.nextTick(async () => {
      try { 
        for await (var asyncGenerator of asyncGeneratorGenerator) 
          push(asyncGenerator)
      }
      catch (error) { 
        console.warn(error) 
      }
      finally { count-- }
    })
  }
}

module.exports = run