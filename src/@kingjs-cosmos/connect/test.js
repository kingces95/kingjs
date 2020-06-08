var { assert,
  '@kingjs': {
    '-cosmos': { connect }
  }
} = module[require('@kingjs-module/dependencies')]()

var Account = 'github-codespace-billing-dev'
var Key = 'NIhSdTKDDEi5HWLJrR4otqgf1J6T62iSZ6iQkZrCVfZ2LH7hbrozIs4lIj2qbT5Lz9sNPQi2CWvi0080SBAcig=='

process.nextTick(async () => {
  var client = await connect(Account, Key)
  var db = client.db('the-database')
  var collection = db.collection('the-collection')

  var i = 44

  // var result = await collection.insertOne({ id: i++ })
  // assert.equal(result.insertedCount, 1)

  // var result = await collection.insertMany([{ id: i++ }, { id: i++ }])
  // assert.equal(result.insertedCount, 2)

  var result = await collection.insertOne({ id: i++, sayHi: () => 'hi' }, {
    serializeFunctions: true,
  })
  assert.equal(result.insertedCount, 1)

  client.close()
})