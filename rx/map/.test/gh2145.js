var assert = require('assert');
var Map = require('..');
var of = require('@kingjs/rx.of');

try {
  of(1)[Map](() => { throw new Error('lol') }).subscribe();
} 
catch (err) {
  console.log('throws');
}