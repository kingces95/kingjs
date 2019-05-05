var {
  assert,
  fs,
  fs: { promises: fsp }, 
  path: Path,
  ['@kingjs']: {
    shim,
    fs: {
      rx: { 
        watch,
        watchMany 
      }
    },
    rx: {
      Spy,
      Pool,
      Do,
      DistinctUntilChanged,
      Select,
      SelectMany,
      Where,
      GroupBy,
      SelectMany,
      Debounce,
      IObservable: { Subscribe }
    },
    reflect: { is } 
  },
  npmPacklist,
  deepEquals,
  shelljs,
  rxjs: { Observable, Subject, merge }
} = require('./dependencies');

var LogLevel = 2;
var DebounceMs = 250;
var All = 'all';
var Unlink = 'unlink';
var UnlinkDir = 'unlinkDir';
var Pause = 'pause';
var Resume = 'resume';
var Task = 'build';
var EmptyArray = [ ];
var EmptyObject = { };
var UsePolling = true;

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

process.chdir('.temp/root');

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
var watcher = watchMany()
  [Do](o => {
    o.dir = Path.dirname(o.path)
    o.relPath = Path.relative(cwd, o.path)
    o.basename = Path.basename(o.path)
  })

watcher
  [Where](o => o.basename == 'package.json')
  [Do](o => console.log('+', o.relPath))
  [Subscribe](o => o
    [Pool](() => refresh(o))
    [DistinctUntilChanged](() => ({ 
      files: o.files, 
      task: o.task 
    }))
    [Do](
      () => console.log('Δ', o.relPath, '=>', o.task),
      () => console.log('-', o.relPath)
    )
    [Subscribe](() => watchMany()
      [Do](o => {
        o.dir = Path.dirname(o.path)
        o.relPath = Path.relative(cwd, o.path)
        o.basename = Path.basename(o.path)
      })
      [Where](
        x => x.dir.startsWith(o.dir)
      )
      [SelectMany](
        x => x, 
        (x, y) => x.relPath
      )
      [Subscribe](x => console.log('Δ', x))
    )
  )

/**
 * @description Update `files` and `task` properties on the `IObservable`
 * watching for changes to the `project.json` file.
 * 
 * @param o The `IObservable` reporting changes to project files.
 */
async function refresh(o) {
  try {
    o.files = null
    o.task = null

    // refresh `files` and `task` in parallel
    await Promise.all([
      fsp.readFile(o.path).then(x => {
        var json = JSON.parse((x))
        o.task = json.scripts ? json.scripts[Task] : null
      }),
      npmPacklist({ path: o.dir }).then(
        x => o.files = x
      )
    ])
  } 
  catch(e) {
    console.log('!', o.relPath, { error: e })
  }

  return o;
}

return

var packages = merge(watchFiles(PackagesGlob), control).pipe(
  groupBy(x => {
    console.log('watching: ', x.path)
    return x.path;
  }),
  mergeMap(package => {
    var key = package.key
    var dir = Path.dirname(key);
    var subject = new Subject();
    var files = [ ];
    var subscription;
    var task;
    var isPaused;

    package.subscribe(p => {
      assert(p.path == key);
      var isPause = p.event == Pause;
      var isResume = p.event == Resume;
      var isUnlink = p.event == Unlink || p.event == UnlinkDir;

      isPaused = isResume ? false : isPause ? true : isPaused;
      if (isPaused)
        return;

      var { 
        files: newFiles, 
        scripts: { [Task]: newTask } 
      } = isUnlink ? EmptyPackage : parsePackage(key);

      // no command => don't watch any files
      if (!newTask)
        newFiles = EmptyArray;
      else if (task != newTask)
        log(1, key, '=>', `{ scripts: { ${Task}: ${newTask} } }`);

      // update task
      task = newTask;

      // bail if file glob did not change
      if (deepEquals(files, newFiles))
        return;
      files = newFiles;
      log(1, key, '=>', `{ files: [${files}] }`);

      // file glob changed!
      if (subscription) {

        // stop watching previous file glob
        subscription.unsubscribe();
        subscription = null;
      }

      // optimization; don't spin up a watcher if empty file glob
      if (!files || files.length == 0) {
        assert(!subscription);
        return;
      }

      // watch files specified by the new file glob
      subscription = watchFiles(
        files, { 
          cwd: dir, 
          ignoreInitial: true 
        }
      ).subscribe(f => {
        if (isPaused)
          return;

        log(2, f.event, Path.join(dir, f.path));
        subject.next({ path: key, dir, task }); 
      });
    });

    return subject.pipe(debounceTime(DebounceMs));
  })
)
packages.subscribe(o => {
  var { dir, path, task } = o;

  control.next({ event: Pause, path });
  exec(dir, task);
  setTimeout(function() {
    control.next({ event: Resume, path })
  }, DebounceMs);
  ;
});

function exec(dir, cmd) {
  try {
    process.chdir(dir);
    console.log(`${dir}$ ${cmd}`);
    var result = shelljs.exec(cmd, { silent:true });

    if (result.stdout)
      console.log(result.stdout.trim());
    if (result.code != 0 || result.stderr)
      console.log(result.stderr.trim());

  } catch(e) {
    console.log('exec exception:', e);
  } finally {
    process.chdir(cwd);
  }
}