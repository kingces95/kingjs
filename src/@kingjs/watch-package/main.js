var {
  assert, fs, path: Path,
  ['@kingjs']: { 
    IObservable: { Subscribe },
    IObserver: { Next },
    IGroupedObservable: { Key },
    fs: { Watch },
    rx: { 
      create, 
      of, 
      Subject, 
      SelectMany, 
      GroupBy, 
      DebounceTime, 
      DistinctUntilChanged, 
      Do 
    },
    reflect: { is } 
  },
  deepEqual,
  chokidar,
  shelljs,
} = module[require('@kingjs-module/dependencies')]();

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
of(PackagesGlob)
  [Watch]()
  [GroupBy](x => x.path)
  [SelectMany](package => {
    const path = package[Key];
    const dir = Path.dirname(path);

    const files = package
      [Select](tryParsePackage)
      [Select](o => { o.files, o.scripts[Task] })
      [DistinctUntilChanged](deepEqual)
      [PublishBehavior]();
    
    const result = new Subject();
    watchFiles.call(files, result);

    return result
      [Select](o => exec.bind(dir, o.task));

    function watchFiles(result) {
      const subject = new Subject();
      const dispose = subject[Subscribe](this);
      subject
        [Watch]({ cwd: dir, ignoreInitial: true }, o => o.files)
        [DebounceTime](DebounceMs)
        [Spy](dispose)
        [Last]()
        [Pipe](result);
    }
  })
  [Spy](o => log(2, o.event, Path.join(dir, o.path)))
  [Call](PostCallSleepMs);

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