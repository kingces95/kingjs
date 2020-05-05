var { 
  ['@kingjs']: {
    reflect: { 
      exportExtension
    }
  }
} = module[require('@kingjs-module/dependencies')]();

/**
 * @description Return a promise that is fulfilled when a stream ends.
 * 
 * @this any The stream.
 */
function ended() {
  var stream = this;
  var promise = new Promise(function(resolve, reject) {
    var onError = e => {
      reject(e);
    };
    stream
      .on('error', onError)
      .once('end', () => {
        stream.off('error', onError);
        resolve();
      }
    );
  });

  return promise;
}

exportExtension(module, Stream, ended);