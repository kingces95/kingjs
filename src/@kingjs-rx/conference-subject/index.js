var { 
  ['@kingjs']: {
    fs: {
      rx: {
        subject: {
          File,
          Dir
        }
      }
    },
    rx: {
      IObservable: { Subscribe },
      IObserver: { Complete, Error },
      Subject,
      ProxySubject,
    },
  }
} = require('./dependencies')

var throwNextTick = x => process.nextTick(() => { throw x })
var DefaultActivate = o => o

class SpeakerSubject extends Subject { }

/**
 * @description A proxy subject that lazily gets its real
 * subject and unsubscribes from its real proxy on complete.
 */
class ConferenceSubject extends ProxySubject {

  constructor(
    id, 
    join, 
    leave,
    activate = DefaultActivate
  ) {

    super(
      () => join(id), 
      conference => {
        var subject = new SpeakerSubject()
        var unsubscribe = conference[Subscribe](subject)

        this[Complete] = () => {
          unsubscribe()
          leave(conference)
          subject[Complete]()
        }

        return activate(subject)
      }
    )
  }

  [Error](e) { throwNextTick(e) }
}

module.exports = ConferenceSubject