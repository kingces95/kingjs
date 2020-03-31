var harvestDependencies = require('..')

var dependencies = harvestDependencies('acme/my-ns/the-b')
dependencies.then(o => console.log(o))
