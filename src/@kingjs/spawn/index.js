var { 
  '@kingjs': {
    rx: { 
      Subject,
      IObserver: { Next, Complete, Error }
    }
  },
  childProcess: { spawn },
  stringDecoder: { StringDecoder }
} = module[require('@kingjs-module/dependencies')]()

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

    var decoder = new StringDecoder()
    var decoded = []

    var process = spawn(exe, args, SpawnOptions)

    process.stdout
      .on('data', (data) => observer[Next](data))  

    process.stderr
      .on('data', (data) => decoded.push(decoder.write(data)))

    process
      .on('error', (data) => observer[Error](data))
      .on('close', (code) => {
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
}

module.exports = shell