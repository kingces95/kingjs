#!/usr/bin/env node --no-warnings
var { 
  '@kingjs': { 
    Path,
    graph: { 
      poset: { ToTree },
      tree: { Print }
    }
  } 
} = require('./dependencies')
var Poset = require('.')

process.chdir('../..')

async function run() {
  try {
    var poset = await Path.launch(Poset)
    var tree = poset[ToTree]()
    tree[Print]({ postOrder: null })
  }
  catch(e) {
    console.log(e)
  }
}
run()