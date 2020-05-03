#!/usr/bin/env node --no-warnings
var { 
  '@kingjs': { 
    Path
  } 
} = require('./dependencies')
var Poset = require('.')

async function run() {
  try {
    await Path.launch(Poset)
  }
  catch(e) {
    console.log(e)
  }
}
run()