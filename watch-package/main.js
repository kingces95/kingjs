var {
  assert, fs, path: Path,
  ['@kingjs']: { 
    IObservable: { Subscribe },
    IObserver: { Next },
    IGroupedObservable: { Key },
    rx: { create, Subject, SelectMany, GroupBy, DebounceTime },
    reflect: { is } 
  },
  chokidar,
  shelljs,
} = require('./dependencies');

var LogLevel = 2;
var DebounceMs = 250;
var PostCallSleepMs = DebounceMs * 2;

var All = 'all';
var Task = 'build';
var EmptyArray = [ ];
var EmptyObject = { };

var EmptyPackage = { 
  files: EmptyArray,
  scripts: EmptyObject
};
var PackagesGlob = [ 
  '**/package.json' 
];
var DotDirGlob = [
  '**/node_modules/**',
  /(^|[\/\\])\../
];

var cwd = process.cwd();
console.log('watching:', cwd)

/**
 * @description A tool which, for each `package.json` found
 * in any subdirectory, excluding dot directories, runs 
 * `npm run build`  in the subdirectory whenever a change 
 * is made to any file explicitly included in the package.
 * 
 * @remarks - This tool was developed to automate manual tasks 
 * that updated and/or generated files from source code.
 * For example, updating `package.json` description and/or
 * generating `README.md` from JsDoc comments found in source.
 * 
 * @remarks - Various heuristics are used to attempt to only kick
 * off runs in response to manual interactions:
 * @remarks -- After a change is detected, a timer starts. If
 * 100ms elapses without another change then `npm run build`
 * is executed in the `package.json` directory. If another
 * change is detected with that 100ms, then the timer restarts.
 * This should batch changes made by Save All or Replace All.
 * @remarks -- Watching is suspended while `npm run build` is
 * executing. This way changes made by the run itself do not
 * schedule subsequent runs.
 * 
 * @remarks - The watched files are those specified in `files`
 * in the `package.json`. If `files` is not specified, then no files 
 * are watched for that package. 
 **/
function watchFiles(glob, options) {
  return create((observer) => {
    try {

      options = { 
        ...options, 
        ignored: DotDirGlob 
      };

      // spin up package watcher
      var watcher = chokidar.watch(glob, options);

      // report watched events
      watcher.on(
        All,
        (event, path) => {
          observer[Next]({ event, path })
        }
      );

      // stop observing file events
      return () => watcher.close();

    } catch(e) {
      console.log(e);
      return () => null;
    }
  })
}

watchFiles(PackagesGlob)
  [GroupBy](x => x.path)
  [SelectMany](package => {
    const path = package[Key];
    const dir = Path.dirname(path);

    var subject = new Subject();
    var dispose;

    package[Subscribe](p => {
      assert(p.path == path);
      
      // always re-create watcher
      if (dispose) {
        dispose();
        dispose = null;
      }

      var packageJson = tryParsePackage(path);
      var { 
        files, 
        scripts: { [Task]: task } 
      } = packageJson;

      log(1, path, '=>', `{ scripts: { ${Task}: ${task} } }`);
      log(1, path, '=>', `{ files: [${files}] }`);

      // don't spin up a watcher if nothing to do
      if (!task || !files || files.length == 0) {
        assert(!dispose);
        return;
      }

      // watch files specified by the new file glob
      dispose = watchFiles(
        files, { 
          cwd: dir, 
          ignoreInitial: true 
        }
      )[Subscribe](f => {
        log(2, f.event, Path.join(dir, f.path));
        subject[Next](() => exec.bind(dir, task)); 
      });
    });

    return subject
      [DebounceTime](DebounceMs)
      [Call](PostCallSleepMs);
  });

function tryParsePackage(path) {
  try {
    if (!fs.existsSync(path))
      return EmptyPackage;

    var json = JSON.parse(fs.readFileSync(path));

    if (!json)
      return EmptyPackage;

    if (!is.array(json.files))
      return EmptyPackage;

    if (!json.scripts)
      return EmptyPackage;

    return json;
  } catch (e) {
    return EmptyPackage
  }
}

function log(level) {
  if (level > LogLevel)
    return;
  level = ''.padStart(level * 2, ' ');
  console.log.apply(this, arguments);
}

function exec(dir, cmd) {
  process.chdir(dir);

  try {
    console.log(`${dir}$ ${cmd}`);
    var result = shelljs.exec(cmd, { silent:true });

    if (result.stdout)
      console.log(result.stdout.trim());
    if (result.code != 0 || result.stderr)
      console.log(result.stderr.trim());

  } finally {
    process.chdir(cwd);
  }
}