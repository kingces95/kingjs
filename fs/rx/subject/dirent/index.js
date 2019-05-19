var { 
  ['@kingjs']: {
    rx: { Subject },
  }
} = require('./dependencies')

/**
 * @description Given a directory returns the directories entries.
 * 
 * @this any A directory represented by a `PathSubject` whose contents
 * are to be emitted.
 * 
 * @returns Returns an `IObservable` that emits a `PathSubject`
 * for each directory entry each which in turn emit a `DirEntry` for 
 * every emission of the source `PathSubject`.
 * 
 * @remarks - If a source emission is observed before the `dirEntry`s for
 * the previous emission has been read and reported, then the emission
 * is queued. Source emissions beyond that are dropped. 
 * 
 * @remarks - Promise will need to be shimmed to implement `IObservable`
 * 
 * @remarks - A path unlinked between source `PathSubject` emissions results
 * in completion of the previously emitted `PathSubject` for the unlinked path.
 **/
class DirentSubject extends Subject {
  constructor(dir, name) {
    super()

    this.dir = dir
    this.name = name
  }
}

module.exports = DirentSubject