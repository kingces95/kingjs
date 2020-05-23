var { 
  '@kingjs': { Enumerable }
} = module[require('@kingjs-module/dependencies')]()

var empty = new Enumerable(() => () => false)

module.exports = () => empty