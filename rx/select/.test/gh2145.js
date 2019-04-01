var { Subscribe } = require('@kingjs/i-observable');
var Select = require('..');
var of = require('@kingjs/rx.of');

try {
  of(1)[Select](() => { throw new Error('lol') })[Subscribe]();
} 
catch (err) {
  console.log('throws');
}