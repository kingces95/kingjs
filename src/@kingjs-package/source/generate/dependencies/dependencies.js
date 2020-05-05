module.exports = {
  '@kingjs': {
    package: {
      name: {
        parse: require('@kingjs/package.name.parse'),
        construct: require('@kingjs/package.name.construct')
      }
    },
    array: {
      Partition: require('@kingjs/array.partition'),
      GroupBy: require('@kingjs/array.group-by')
    },
    camelCase: {
      join: require('@kingjs/camel-case.join')
    },
    source: {
      generate: require('@kingjs/source.generate')
    }
  }
}