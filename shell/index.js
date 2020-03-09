var { 
  ['@kingjs']: {
    rx: { 
      Subject,
      IObserver: { Next, Complete, Error }
    }
  },
  childProcess: { spawn },
  stringDecoder: { StringDecoder }
} = require('./dependencies')

var PlatformShell = process.platform === "win32" ? process.env.ComSpec : '/bin/sh'

/**
 * @description Asynchronously spawns a shell, executes a command, streams stdio,
 * and, if stderr is written, buffers and throws that text.
 * 
 * @param string[] `args` The command to execute in the shell.
 * 
 * @returns Returns an EventSource.
 */
function shell(args = []) {
  return new Subject(observer => {

    var process = spawn(PlatformShell, ['-c', "' '"])
    var stderrUtf8 = new StringDecoder()
    var stdoutUtf8 = new StringDecoder()

    var { stdout, stderr } = process

    stdout.on('data', (data) => {
      var result = stdoutUtf8.write(data)
    })
    stdout.on('error', (data) => observer[Error](data))

    stderr.on('data', (data) => {
      var result = stderrUtf8.write(data)
      // observer[Error](data)
    })
    stderr.on('error', (data) => observer[Error](data))

    process.on('error', (data) => observer[Error](data))

    // That IObservable cannot elegantly return code should
    // tell us something about IObservable -- it's missing something
    process.on('exit', (code) => observer[Complete]())

  })
}

module.exports = shell