var { 
  shelljs
} = require('./dependencies');

/**
 * @description Asynchronously executes a shell command and returns
 * `{ code, stdout, stderr }`.
 * 
 * @param dir The directory in which to run the command.
 * @param cmd The command to execute.
 * 
 * @returns Returns a promise that resolves to `{ code, stdout, stderr }`.
 */
function exec(dir, cmd) {
  return new Promise((resolve, reject) => {
    var cwd = process.cwd()
    var exception
    
    try {
      if (dir)
        process.chdir(dir)
      shelljs.exec(cmd, (code, stdout, stderr) => {
        resolve({ code, stdout, stderr })
      })
    } 
    catch(e) { 
      exception = e
    } 
    finally {
      process.chdir(cwd)
      if (exception)
        reject(exception)
    }
  })
}

module.exports = exec;