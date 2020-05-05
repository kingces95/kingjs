exports['@kingjs'] = {
  fs: {
    rx: {
      subject: {
        Dir: require('@kingjs/fs.rx.subject.dir'),
        File: require('@kingjs/fs.rx.subject.file'),
      },
    },
  },
  rx: {
    ConferenceSubject: require('@kingjs/rx.conference-subject'),
  },
}
exports['fs'] = require('fs')
exports['path'] = require('path')