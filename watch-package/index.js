var {
  chokidar
} = require('./dependencies');

var assert = require('assert');
var path = require('path');
var { 
  Observable,
  Subject,
  multicast
} = require('rxjs');

var AllEvents = 'all';
var EmptyObject = { };
var EmptyArray = [ ];
var PackagesGlob = '**/package.json';
var DotDirGlob = [
  '**/node_modules/**',
  /(^|[\/\\])\../
];

var cwd = process.cwd();

/**
 * @description A tool which, for each `package.json` found
 * in any subdirectory, excluding dot directories, runs 
 * `npm run generate`  in the subdirectory whenever a change 
 * is made to any file explicitly included in the package.
 * 
 * @remarks - This tool was developed to automate manual tasks 
 * that updated and/or generated files from source code.
 * For example, updating `package.json` description and/or
 * generating `README.md` from JsDoc comments found in source.
 * 
 * @remarks - Various heuristics are used to attempt to only kick
 * off runs in response to manual interactions:
 * @remarks   - After a change is detected, a timer starts. If
 * 100ms elapses without another change then `npm run generate`
 * is executed in the `package.json` directory. If another
 * change is detected with that 100ms, then the timer restarts.
 * This should batch changes made by Save All or Replace All.
 * @remarks   - Watching is suspended while `npm run generate` is
 * executing. This way changes made by the run itself do not
 * generate subsequent runs.
 * 
 * @remarks - The watched files are those specified in `files`
 * in the `package.json`. If `files` is specified, then no files 
 * are watched for that package. */
var PackageObservable = new Observable((subscriber) => {

  // spin up package watcher
  var watcher = chokidar.watch(
    PackagesGlob, { 
      ignored: DotDirGlob 
    }
  );

  // report watched events
  watcher.on(
    AllEvents,
    (event, path) => subscriber.next({ 
      event,
      path 
    })
  )

  // stop observing file events
  return () => watcher.close();
})

var temp = new Subject();
PackageObservable.subscribe(temp);
PackageObservable = temp; 

var subscription0 = PackageObservable.subscribe({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});

var subscription1 = PackageObservable.subscribe({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});

var subscription = subscription0.add(subscription1);
setTimeout(() => {
  subscription.unsubscribe();
  console.log('done');
}, 2000);