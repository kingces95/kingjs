var { 
  ['@kingjs']: {
    rx: { 
      Subject,
      IObserver: { Next, Complete, Error }
    }
  },
  assert,
  which,
  childProcess: { spawn },
  stringDecoder: { StringDecoder }
} = require('./dependencies')

var SpawnOptions = {
  windowsHide: true
}

/**
 * @description Asynchronously spawns a shell, executes a command, streams stdio,
 * and, if stderr is written, buffers and throws that text.
 * 
 * @param string[] `args` The command to execute in the shell.
 * 
 * @returns Returns an EventSource. 
 */
function shell(exe, args) {
  return new Subject(observer => {

    which(exe, (error, path) => {

      if (error) {
        observer[Error](error.message)
        return
      }

      var decoder = new StringDecoder()
      var decoded = []

      var process = spawn(path, args, SpawnOptions)
      process.stdout.on('data', (data) => observer[Next](data))  
      process.stderr.on('data', (data) => decoded.push(decoder.write(data)))
      process.on('error', (data) => observer[Error](data))
      process.on('close', (code) => {
        if (decoded.length) {
          observer[Error](decoded.join(''))
          return
        }

        if (!code) {
          observer[Error](`Exited with code '${code}'`)
          return
        }

        observer[Complete]()
      })
    })
  })
}

module.exports = shell