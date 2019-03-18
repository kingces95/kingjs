var { 
  os,
} = require('../dependencies');

var poll = require('./poll');
var freemem = os.freemem.bind(os);

function cpusObservable(interval) {
  return interval => poll(freemem, interval);
}

module.exports = cpusObservable;