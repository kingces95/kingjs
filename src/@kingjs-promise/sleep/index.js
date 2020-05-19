/**
 * @description Return a promise that resolves after a specified time period.
 * 
 * @param ms Time in milliseconds to sleep.
 */
function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = sleep;