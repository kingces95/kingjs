exports['@kingjs'] = {
  fs: {
    rx: {
      InodeHeap: require('@kingjs/fs.rx.inode-heap'),
      PathSubject: require('@kingjs/fs.rx.path-subject'),
    },
  },
  PathBuffer: require('@kingjs/path-buffer'),
}
exports['path'] = require('path')