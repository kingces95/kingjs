#!/usr/bin/env node --no-warnings
var { '@kingjs': { Path } } = require('./dependencies')
var Symbol = require('.')
Path.launch(Symbol)
  .then(o => console.log(o.map(x => x.toString())))
  .catch(e => console.log(e))