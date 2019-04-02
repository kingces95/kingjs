var { 
  assert,
  chokidar,
  ['@kingjs']: {
    rx: { create },
    reflect: { 
      exportExtension
    },
    IObservable,
    IObservable: { Subscribe },
    IObserver: { Next }
  }
} = require('./dependencies');

var All = 'all';
var EmptyString = '';
var AllFilesAndDirs = '**/*';

var DefaultFileSelector = o => o;
var DefaultFileSelector = (o, e) => { ...o, ...e };

var cwd = process.cwd();
console.log('watching:', cwd)

/**
 * @description Transform files specified by the source `IObservable`
 * into file change events.
 * 
 * @this any The source `IObservable`.
 * 
 * @param [options] `chokidar` initialization options.
 * @param [options.observations] An object on which to define a property of `name`
 * that returns an array of files currently being watched. 
 * @param [options.name] The name of the property to add to `observations`
 * that returns an array of files currently being watched.
 * @param [fileSelector] A callback to select the files to watch given an 
 * emission from the source `IObservable`.
 * @param [selector] A callback to select a result given the last emission
 * from the source `IObservable` and a file event.
 * 
 * @returns Returns an `IObservable` which emits file changed events.
 **/
function watch(
  options, 
  fileSelector = DefaultFileSelector, 
  selector = DefaultSelector) {

  var observable = this;

  return new create(observer => {

    // spin up package watcher
    var watcher = chokidar.watch(EmptyString, options);

    // expose the watched files
    var { observations, name } = options;
    if (observations) {
      assert(name);
      Object.defineProperty(observations, name, { 
        get: watcher.getWatched.bind(watcher)
      })
    }

    // report watched events
    var last;
    watcher.on(All, 
      (event, path) => observer[Next](selector(last, { event, path }))
    );

    var dispose = observable[Subscribe](
      o => {
        last = o;
        watcher.remove(AllFilesAndDirs);
        watcher.add(fileSelector(o));
      }
    )

    return () => {
      watcher.close();
      dispose();
    }
  });
}

exportExtension(module, IObservable, watch);