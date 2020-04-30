#!/usr/bin/env node --no-warnings
var { '@kingjs': { Path } } = require('./dependencies')
var Poset = require('.')
Path.launch(Poset)
  .then(o => console.log(o))
  .catch(e => console.log(e))