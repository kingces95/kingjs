#!/usr/bin/env node --no-warnings
var harvestDependencies = require('../../harvest/dependencies')
var generateDependencies = require('./index')
harvestDependencies().then(o => {
  var js = generateDependencies(o)
  console.log(js)
})