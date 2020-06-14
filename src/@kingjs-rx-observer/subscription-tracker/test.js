var { assert,
  '@kingjs': {
    IObservable: { Subscribe },
    IObserver: { Subscribed, Next, Complete, Error },
    '-rx': {
      '-subject': { Subject },
      '-observer': { SubscriptionTracker }
    }
  }
} = module[require('@kingjs-module/dependencies')]()

// an observer that cancels its own subscription and so never finishes
var cancel
var observer = {
  [Subscribed](o) { cancel = o },
  [Next](o) { if (o) cancel() },
  [Complete]() { assert.fail },
  [Error]() { assert.fail }
}

// tracker calls cancel on observables that haven not finished
var sourceCancelled = false
var sourceCancel = () => sourceCancelled = true
var source = new Subject(sourceCancel)

var ignoreCancelled = false
var ignoreCancel = () => ignoreCancelled = true
var ignore = new Subject(ignoreCancel)

// assert tracker stops tracking observables that finish
var complete = new Subject(assert.fail)
var error = new Subject(assert.fail)

// track the observables used to generate the observations
var tracker = new SubscriptionTracker(observer)
assert.ok(!tracker.cancelled)
assert.equal(tracker.cancel, cancel)

// observables which generate the observations
source[Subscribe](tracker.track({ [Next](o) { this[Next](o) } }))
ignore[Subscribe](tracker.track())
complete[Subscribe](tracker.track())
error[Subscribe](tracker.track({ [Error]() { /* ignore */ } }))

// generate observations
source[Next](false)
assert.ok(!tracker.cancelled)
assert.ok(!sourceCancelled)

// finish two observables so their cancel functions are released
complete[Complete]()
error[Error]('error')
ignore[Next](false)

// generate an observation that results in self cancel
source[Next](true)
assert.ok(tracker.cancelled)
assert.ok(sourceCancelled)
assert.ok(ignoreCancelled)