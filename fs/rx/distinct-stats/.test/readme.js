var assert = require('assert')
var fs = require('fs')
var ToPromise = require('@kingjs/rx.to-promise')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Complete } = require('@Kingjs/rx.i-observer')
var watch = require('..')

var fileName = 'temp'

var subject = watch()

subject
  [Subscribe](
    () => console.log('next'),
    () => console.log('complete')
  )

setTimeout(() => {
  console.log('add')
  fs.writeFileSync(fileName)

  setTimeout(() => {
    console.log('remove')
    fs.unlinkSync(fileName)

    setTimeout(() => {
      console.log('stop')
      subject[Complete]()
    }, 10)
  }, 10)
}, 10)