var assert = require('assert')
var fs = require('fs')
var ToPromise = require('@kingjs/rx.to-promise')
var Subject = require('@kingjs/rx.subject')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@Kingjs/rx.i-observer')
var watch = require('..')

var fileName = 'temp'

var subject = new Subject()

var result = [];
watch('.', subject)
  [Subscribe](
    () => result.push('next'),
    () => result.push('complete')
  )

setTimeout(() => {
  result.push('add')
  fs.writeFileSync(fileName)

  setTimeout(() => {
    result.push('remove')
    fs.unlinkSync(fileName)

    setTimeout(() => {
      result.push('stop')
      subject[Complete]()

      setTimeout(() => {
        assert.deepEqual(result, [
          'add', 'next', 'remove', 'next', 'stop', 'complete'
        ])   })
    }, 100)
  }, 100)
}, 100)