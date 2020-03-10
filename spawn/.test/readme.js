var assert = require('assert')
var spawn = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')
const { StringDecoder } = require('string_decoder')

var std = new StringDecoder()

var observable = spawn('gitt', ['ls-files', '--other', '--exclude-standard'])
observable[Subscribe](
  o => console.log(std.write(o)),
  () => console.log('completed'),
  o => console.log(o)
)