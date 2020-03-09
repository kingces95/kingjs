var assert = require('assert')
var shell = require('..')
var { Subscribe } = require('@kingjs/rx.i-observable')

var observable = shell(['ls'])
observable[Subscribe]()