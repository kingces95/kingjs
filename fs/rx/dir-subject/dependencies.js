exports['@kingjs'] = {
  fs: {
    rx: {
      InodeSubject: require('@kingjs/fs.rx.inode-subject'),
      LinkSubject: require('@kingjs/fs.rx.link-subject'),
    },
  },
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  rx: {
    GroupBy: require('@kingjs/rx.group-by'),
    Log: require('@kingjs/rx.log'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['fs'] = require('fs')