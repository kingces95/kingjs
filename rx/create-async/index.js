var {
  ['@kingjs']: { 
    rx: { create },
  },
} = require('./dependencies');

/**
 * 
 * @param {*} callback 
 * @param {*} interval 
 */
function createAsync(callback, interval = 0) {
  return create(callback, interval)
}

module.exports = createAsync;