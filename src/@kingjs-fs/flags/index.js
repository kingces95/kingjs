var {
  '@kingjs': {
    '-module': { ExportEnum },
  }
} = module[require('@kingjs-module/dependencies')]()

module.exports = {
  OpenForAppending: 'a',
  OpenForReadingAndAppending: 'a+',

  OpenForSynchronousAppending: 'as',
  OpenForReadingAndSynchronousAppending: 'as',

  OpenForWriting: 'w',
  OpenForReadingAndWriting: 'w+',

  OpenNewForAppending: 'ax',
  OpenNewForReadingAndAppending: 'ax+',

  OpenNewForWriting: 'wx',
  OpenNewForReadingAndWriting: 'wx+',

  OpenExistingForReading: 'r',
  OpenExistingForReadingAndWriting: 'r+',
  OpenExistingForReadingAndSynchronousWriting: 'rs+',
}