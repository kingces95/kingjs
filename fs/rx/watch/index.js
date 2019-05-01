var { 
  fs,
  ['@kingjs']: {
    path: { 
      makeAbsolute 
    },
    rx: { 
      Subject,
      IObserver : { Next, Complete, Error },
      IGroupedObservable: { Key },
    },
  }
} = require('./dependencies')

var Event = {
  Change: 'change',
  Close: 'close',
  Error: 'error'
}

var Options = {
  persistent: true,
  recursive: false,
  encoding: 'utf8'
}

/**
 * @description Watch a path.
 * 
 * @param [path] The path to watch. Default is the
 * current working directory.
 * 
 * @returns Returns a `Subject` which implements `IGroupedObservable`
 * whose key is the absolute path being watched and which emits 
 * when a change to the path is observed. 
 * 
 * @remarks - Calling `Complete` on the subject stops the watcher.
 * @remarks - The watcher keeps the process alive until completed.
 **/
function watch(
  path = '.') {

  path = makeAbsolute(path)
  
  var result = new Subject(observer => {
    var watcher = fs.watch(path, Options)
    watcher.on(Event.Change, () => observer[Next]())
    watcher.on(Event.Close, () => watcher.removeAllListeners())
    watcher.on(Event.Error, e => observer[Error](e))
    return () => watcher.close()
  })

  result[Key] = path

  return result;
}

module.exports = watch