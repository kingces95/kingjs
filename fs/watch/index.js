var {
  chokidar,
  ['@kingjs']: {
    IObserver: { Next, Complete, Error },
    rx: { create },
    reflect: { is } 
  },
} = require('./dependencies');

var All = 'all';

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
 **/
function watch(glob, options) {
  return new create((observer) => {
    options = { 
      ...options, 
      ignored: DotDirGlob 
    };

    // spin up package watcher
    var watcher = chokidar.watch(glob, options);

    // report watched events
    watcher.on(
      All,
      (event, path) => observer.next({ 
        event,
        path 
      })
    );
  
    // stop observing file events
    return () => watcher.close();
  })
}

module.exports = watch;