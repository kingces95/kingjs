exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Inode: require('@kingjs/fs.rx.subject.inode'),
      },
    },
  },
  rx: {
    DistinctUntilChanged: require('@kingjs/rx.distinct-until-changed'),
    Publish: require('@kingjs/rx.publish'),
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['assert'] = require('assert')