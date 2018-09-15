var write = require('./write');

var inherit = require('./inherit');
var merge = require('./merge');
var scorch = require('./scorch');
var update = require('./update');
var filter = require('./filter');
var map = require('./map');

var nested = {
  merge: require('./nested/merge'),
  reduce: require('./nested/reduce'),
  toArray: require('./nested/to-array'),
  update: require('./nested/update')
}

var isCopyOnWrite = {
  inherit: inherit,
  merge: merge,
  scorch: scorch,
  update: update
};

var isTransform = {
  filter: filter, 
  map: map
}

var hasCallback = {
  merge: merge,
  update: update,
  filter: filter,
  map: map
};