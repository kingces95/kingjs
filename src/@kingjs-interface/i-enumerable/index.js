var {
  '@kingjs': {
    '-reflect': { createInterface }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IEnumerable` has a single member `getEnumerator`.
 */
module.exports = createInterface(
  '@kingjs/IEnumerable', {
    members: { getEnumerator: null },
  }
);