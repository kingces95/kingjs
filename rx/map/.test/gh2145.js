var { Subscribe } = require('@kingjs/i-observable');
var Map = require('..');
var of = require('@kingjs/rx.of');

try {
  of(1)[Map](() => { throw new Error('lol') })[Subscribe]();
} 
catch (err) {
  console.log('throws');
}