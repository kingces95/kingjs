var HarvestDependencies = require('..')
var Path = require('@kingjs/path.builder')

var dependencies = Path.parse('acme/my-ns/the-b')[HarvestDependencies]()
dependencies.then(o => console.log(o))
