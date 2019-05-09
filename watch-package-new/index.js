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
      Do,
      Pool,
      Skip,
      Where,
      Select,
      Subject,
      WindowBy,
      Debounce,
      SelectMany,
      SelectMany,
      DistinctUntilChanged,
      IObservable: { Subscribe },
      IGroupedObservable: { Key }
    },
    reflect: { is } 
  },
  minimatch,
  shelljs,
} = require('./dependencies');

var LogLevel = 2;
var DebounceMs = 150;
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
watchMany()
  [Do](o => {
    o.dir = Path.dirname(o.path)
    o.relPath = Path.relative(cwd, o.path)
    o.relDir = Path.relative(cwd, o.dir)
    o.basename = Path.basename(o.path)
  })
  [Where](o => o.basename == 'package.json')
  [Do](o => console.log('+', o.relPath))
  [SelectMany](pkg => pkg
    [Pool](o => getPackageInfo(pkg))
    [WindowBy]()
    [Do](
      o => console.log('Δ', pkg.relPath, '=>', {
        task: o[Key].task, 
        files: o[Key].files
      }),
      () => console.log('-', pkg.relPath)
    )
    [SelectMany](info => watchMany(pkg.dir, info)
      [Do](o => {
        o.dir = Path.dirname(o.path)
        o.relPath = Path.relative(cwd, o.path)
        o.projectPath = Path.relative(pkg.dir, o.path)
        o.basename = Path.basename(o.path)
      })
      [Where](o => info[Key].files.some(x => minimatch(o.projectPath, x)))      
      [Do](o => console.log('', '+', o.relPath))
      [SelectMany](o => o
        [Skip](1)
        [Do](
          () => console.log('', 'Δ', o.relPath),
          () => console.log('', '-', o.relPath)
        )
        [Debounce](DebounceMs)
        [Select](() => ({
          dir: pkg.relDir,
          task: info[Key].task
        }))
      )
    )
    [Do](o => console.log(`> ${o.dir}$ ${o.task}`))
    [Pool](async o => ({ ...o, ...(await execAsync(o.dir, o.task)) }))
    [Do](o => console.log(`< ${o.dir}$ ${o.task}`))
  )
  [Subscribe]()

/**
 * @description Update `files` and `task` properties on the `IObservable`
 * watching for changes to the `project.json` file.
 * 
 * @param o The `IObservable` reporting changes to project files.
 */
async function getPackageInfo(o) {
  var json = EmptyObject

  try {
    var json = JSON.parse(await fsp.readFile(o.path))
  } 
  catch(e) {
    console.log('!', o.relPath, { error: e })
  }

  return { 
    task: json.scripts ? json.scripts[Task] : null,
    files: json.files || EmptyArray
  };
}

function execAsync(dir, cmd) {
  return new Promise((resolve, reject) => {
    var cwd = process.cwd()
    var exception
    
    try {
      process.chdir(dir);
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

function exec(dir, cmd) {
  try {
    process.chdir(dir);
    console.log(`> ${process.cwd()}$ ${cmd}`);
    var result = shelljs.exec(cmd, { silent:true });

    if (result.stdout)
      console.log(result.stdout.trim());
    if (result.code != 0 || result.stderr)
      console.log(result.stderr.trim());

    console.log(`< ${dir}$ ${cmd}`);

  } catch(e) {
    console.log('exec exception:', e);
  } finally {
    process.chdir(cwd);
  }
}