var { 
  os,
} = require('../dependencies');

var poll = require('./poll');
var cpus = os.cpus.bind(os);

function cpusObservable(interval) {
  return interval => poll(cpus, interval);
}

module.exports = cpusObservable;