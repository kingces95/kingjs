var { assert,
  '@kingjs': {
    Path,
    IComparable,
    IEquatable,
    IComparable: { IsLessThan },
    IEquatable: { Equals, GetHashcode },
    '-fs': {
      '-dir': { DirEntry },
    }
  }
} = module[require('@kingjs-module/dependencies')]()