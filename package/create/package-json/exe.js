#!/usr/bin/env node --no-warnings
var exe = require('./index')

//var [,,path = process.cwd()] = process.argv
//exe(path).catch(e => { console.log(e); process.exit(1) })
launch(exe)

function launch(exe) {
  try {
    exe(...process.argv.slice(2))
  }
  catch(e) {
    console.log(e)
    process.exit(1)
  }
}