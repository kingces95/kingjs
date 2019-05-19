exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Dirent: require('@kingjs/fs.rx.subject.dirent'),
        Inode: require('@kingjs/fs.rx.subject.inode'),
      },
    },
  },
  linq: {
    ZipJoin: require('@kingjs/linq.zip-join'),
  },
  rx: {
    GroupBy: require('@kingjs/rx.group-by'),
    RollingSelect: require('@kingjs/rx.rolling-select'),
    SelectMany: require('@kingjs/rx.select-many'),
  },
}
exports['fs'] = require('fs')