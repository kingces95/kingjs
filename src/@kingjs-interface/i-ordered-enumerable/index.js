var {
  '@kingjs': {
    '-reflect': { createInterface },
    '-interface': IEnumerable
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description `IOrderedEnumerable` extends
 * `IEnumerable` with  a single member 
 * `createOrderedEnumerable`.
 */
module.exports = createInterface(
  '@kingjs/IOrderedEnumerable', {
    members: { createOrderedEnumerable: null },
    extends: [ IEnumerable ]
  }
);