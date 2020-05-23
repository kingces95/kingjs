/**
 * @description Wait until the next pass of the event loop.
 */
function tick() {
  return new Promise(resolve => setImmediate(resolve));
}

module.exports = tick;