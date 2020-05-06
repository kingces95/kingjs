var path = require('path');
var fs = require('fs');

var { 
  '@kingjs': {
    git: { getDir }
  },
  npmApi,
  shelljs 
} = module[require('@kingjs-module/dependencies')]();

var npm = new npmApi();
var view = npm.view('byUser');
var maintainer =  npm.maintainer('kingces95');
maintainer.repos()
  .then(function(repos) {
    console.log(repos);
    console.log('done');
  }, function(err) {
    console.error(err);
  });
