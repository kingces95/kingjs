var {
  ['@kingjs']: { 
    rx: { 
      Subject,
    }
  },
} = module[require('@kingjs-module/dependencies')]();

function create(callback) {
  return new Subject(callback);
}

module.exports = create;