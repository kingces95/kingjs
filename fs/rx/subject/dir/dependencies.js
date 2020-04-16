exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Inode: require('@kingjs/fs.rx.subject.inode'),
      },
    },
  },
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  rx: {
    GroupBy: require('@kingjs/rx.group-by'),
    Pool: require('@kingjs/rx.pool'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
    Subject: require('@kingjs/rx.subject'),
    Where: require('@kingjs/rx.where'),
  },
}
exports['fs'] = require('fs')