var harvestMetadata = require('..')

harvestMetadata('acme/my-ns/the-b').then(
  o => console.log(o)
)