var Path = require('@kingjs/path.builder')
var HarvestMetadata = require('..')
Path.Cwd.to('acme/my-ns/the-b')[HarvestMetadata]()
  .then(o => console.log(o))