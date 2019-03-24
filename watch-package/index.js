var {
  ['@kingjs']: { reflect: { is } },
  chokidar,
  deepEquals,
  shelljs,
  rxjs: { Observable, Subject, merge }
} = require('./dependencies');

var { 
  groupBy,
  mergeMap,
  debounceTime,
} = require('rxjs/operators');

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var LogLevel = 2;
var DebounceMs = 250;
var All = 'all';
var Unlink = 'unlink';
var Pause = 'pause';
var Resume = 'resume';
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
 * build subsequent runs.
 * 
 * @remarks - The watched files are those specified in `files`
 * in the `package.json`. If `files` is not specified, then no files 
 * are watched for that package. 
 **/
function watchFiles(glob, options) {
  return new Observable((subscriber) => {
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
        (event, path) => subscriber.next({ 
          event,
          path 
        })
      );
    
      // stop observing file events
      return () => watcher.close();

    } catch(e) {
      console.log(e);
      return () => null;
    }
  })
}

var control = new Subject();

var packages = merge(watchFiles(PackagesGlob), control).pipe(
  groupBy(x => {
    return x.path;
  }),
  mergeMap(package => {
    var key = package.key
    var dir = path.dirname(key);
    var subject = new Subject();
    var files = [ ];
    var subscription;
    var task;
    var isPaused;

    package.subscribe(p => {
      assert(p.path == key);
      var isPause = p.event == Pause;
      var isResume = p.event == Resume;
      var isUnlink = p.event == Unlink;

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

        log(2, f.event, path.join(dir, f.path));
        subject.next({ path: key, dir, task }); 
      });
    });

    return subject.pipe(debounceTime(DebounceMs));
  })
)
packages.subscribe(o => {
  control.next({ event: Pause, path: o.path });
  exec(o.dir, o.task);
  setTimeout(function() {
    control.next({ event: Resume, path: o.path })
  }, DebounceMs);
  ;
});

function parsePackage(path) {
  try {
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