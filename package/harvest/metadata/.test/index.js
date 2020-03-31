var harvestMetadata = require('..')

var metadata = harvestMetadata('acme/my-ns/the-b')
metadata.then(o => console.log(o))