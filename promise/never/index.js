/**
 * @description Return a promise that never resolves.
 */
function never() {
  return new Promise(resolve => { });
}

module.exports = never;