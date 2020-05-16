#!/usr/bin/env node
var {
  fs: { promises: fsp }, 
  path: Path,
  minimatch,
  '@kingjs': {
    shim,
    exec,
    pathTest: testPath,
    fs: { '-rx': { watchMany } },
    '-rx': {
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
} = module[require('@kingjs-module/dependencies')]()

process.chdir('.test')
var cwd = process.cwd()

watchMany()
  [Do](o => {
    o.dir = Path.dirname(o.path)
    o.relPath = Path.relative(cwd, o.path)
    o.relDir = Path.relative(cwd, o.dir)
    o.basename = Path.basename(o.path)
    o.dirName = Path.basename(o.dir)
  })
  [Where](o => o.dirName == '.inodes')
  [Do](o => console.log('+', o.relPath))
  [SelectMany](inode => inode
    [Pool](async () => {
      try {
        return JSON.parse(await fsp.readFile(inode.path)) 
      } 
      catch(e) {
        console.log('!', inode.relPath, { error: e })
        return EmptyObject
      }
    })
    [Select](o => ({
      // defaults
      ...o
    }))
    [WindowBy]()
    [Do](
      o => console.log('Δ', inode.relPath, '=>', {
        url: o[Key].url, 
      }),
      () => console.log('-', inode.relPath)
    )
  //   [Pool](async o => {
  //     if (pkg.lastTaskMs && o.ctimeMs < pkg.lastTaskMs)
  //       return

  //     var id = taskId++
  //     var { dir, task } = o

  //     try {
  //       console.log(`>${id} ${dir}$`, { task: task })
  //       var { stdout, stderr, code } = await exec(dir, task)

  //       if (stdout) 
  //         console.log(`√${id} ${dir}$ `, { stdout: stdout.trim() })

  //       if (stderr && !code) 
  //         console.log(`!${id} ${dir}$ `, { code, stderr: stderr.trim() })
  //     }
  //     catch (e) {
  //       console.log(`!${id} ${dir}$`, { exception: e })
  //     }
  //     finally {
  //       pkg.lastTaskMs = Date.now()
  //       console.log(`<${id} ${dir}$`, { task: task})
  //     }
  //   })
  )
  [Subscribe]()
