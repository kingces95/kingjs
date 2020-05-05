var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    }
  }
} = require('./dependencies');

/**
 * @description Return a promise that is fulfilled when a stream drains.
 * 
 * @this any The stream.
 */
function drained() {
  var stream = this;
  var promise = new Promise(function(resolve, reject) {
    var onError = e => {
      reject(e);
    }
    stream
      .on('error', onError)
      .once('drain', () => {
        stream.off('error', onError);
        resolve();
      })
    });

  return promise;
}

exportExtension(module, Stream, drained);