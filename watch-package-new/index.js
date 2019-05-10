var {
  fs: { promises: fsp }, 
  path: Path,
  minimatch,
  ['@kingjs']: {
    shim,
    exec,
    path: { test: testPath },
    fs: { rx: { watchMany } },
    rx: {
      Debounce,
      Do,
      Pool,
      Select,
      SelectMany,
      Skip,
      Where,
      WindowBy,

      IObservable: { Subscribe },
      IGroupedObservable: { Key }
    },
  },
} = require('./dependencies')

process.chdir('.temp/root')

var DebounceMs = 350
var Task = 'build'
var EmptyArray = [ ]
var EmptyObject = { }
var EmptyProjectJson = "{ }"

var cwd = process.cwd()
console.log('watching:', cwd)
var taskId = 0

var DotDirGlob = [
  '**/node_modules/**',
  /(^|[\/\\])\../
]

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
    [Pool](async () => {
      try { 
        return JSON.parse(await fsp.readFile(pkg.path)) 
      } 
      catch(e) {
        console.log('!', pkg.relPath, { error: e })
        return EmptyObject
      }
    })
    [Select](o => ({ 
      task: o.scripts ? o.scripts[Task] : null,
      files: o.files || EmptyArray
    }))
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
      [Where](o => testPath(o.projectPath, info[Key].files))
      [Do](o => console.log('', '+', o.relPath))
      [SelectMany](o => o
        [Skip](1)
        [Do](
          () => console.log('', 'Δ', o.relPath),
          () => console.log('', '-', o.relPath)
        )
        [Debounce](DebounceMs)
        [Select](x => ({
          dir: pkg.relDir,
          task: info[Key].task,
          ctimeMs: x.ctimeMs
        }))
      )
    )
    [Pool](async o => {
      if (pkg.lastTaskMs && o.ctimeMs < pkg.lastTaskMs)
        return

      var id = taskId++
      var { dir, task } = o

      try {
        console.log(`>${id} ${dir}$`, { task: task })
        var { stdout, stderr, code } = await exec(dir, task)

        if (stdout) 
          console.log(`√${id} ${dir}$ `, { stdout: stdout.trim() })

        if (stderr && !code) 
          console.log(`!${id} ${dir}$ `, { code, stderr: stderr.trim() })
      }
      catch (e) {
        console.log(`!${id} ${dir}$`, { exception: e })
      }
      finally {
        pkg.lastTaskMs = Date.now()
        console.log(`<${id} ${dir}$`, { task: task})
      }
    })
  )
  [Subscribe]()