exports['@kingjs'] = {
  fs: {
    rx: {
      InodeSubject: require('@kingjs/fs.rx.inode-subject'),
    },
  },
  rx: {
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    Select: require('@kingjs/rx.select'),
  },
}
exports['fs'] = require('fs')