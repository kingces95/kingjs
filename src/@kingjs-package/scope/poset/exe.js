#!/usr/bin/env node --no-warnings
var { 
  '@kingjs': { 
    Path
  } 
} = module[require('@kingjs-module/dependencies')]()
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