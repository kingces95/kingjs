exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Link: require('@kingjs/fs.rx.subject.link'),
      },
    },
  },
  rx: {
    Subject: require('@kingjs/rx.subject'),
  },
}
exports['fs'] = require('fs')
exports['path'] = require('path')