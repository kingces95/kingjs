var harvestDependencies = require('@kingjs/package.harvest.dependencies')
var generateDependencies = require('..')

harvestDependencies('acme/my-ns/the-b').then(package => {
  var js = generateDependencies(package)
  console.log(js)
})