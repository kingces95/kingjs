var assert = require('assert')
var create = require('..')
var shell = require('shelljs');
 
// Copy files to release dir
shell.rm('-rf', 'acme');
shell.cp('-R', '../../../.test/acme', 'acme');

create('acme/my-ns/the-b')