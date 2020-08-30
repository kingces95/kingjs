var { mongodb: { MongoClient: Client },
  '@kingjs': {
    EmptyObject,
    '-pojo': { ToPairs }
  }
} = module[require('@kingjs-module/dependencies')]()

var Mongodb = 'mongodb'
var AzureDomain = 'mongo.cosmos.azure.com'
var Options = { useUnifiedTopology: true }
var DefaultPort = 10255
var DefaultQuery = { ssl: true }

async function connect(account, key, options = EmptyObject) {
  var { 
    port = DefaultPort, 
    query = { } 
  } = options

  query = {
    appName: `@${account}@`,
    ...DefaultQuery,
    ...query,
  }

  var queryString = query[ToPairs]()
    .map(o => `${o.key}=${o.value}`)
    .join('&')
  
  var url = `${Mongodb}://${account}:${key}@${account}.${AzureDomain}:${port}/?${queryString}`

  var client = new Client(url, Options)
  await client.connect()
  return client
}

module.exports = connect