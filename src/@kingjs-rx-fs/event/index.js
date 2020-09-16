var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable,
    IObserver: { Next, Complete, Error },
    IGroupedObservable,
    IGroupedObservable: { Subscribe, Key },
    '-string': { Decapitalize },
    '-rx': {
      '-observer': { SubscriptionTracker },
      '-sync': {
        '-static': { create }
      }
    },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

var Plus = '+'
var Minus = '-'
var Delta = 'Δ'
var Arrow = '~'
var Exclamation = '!'

class Event {
  constructor(o) {
    this[name] = this.constructor.name[Decapitalize]()

    if (o.id !== undefined) this.id = id
    if (o.path !== undefined) this.path = path
    if (value !== undefined) this.value = value
    if (o.previousPath !== undefined) this.previousPath = previousPath
  }
}
class Link extends Event { 
  toString() { return `${Plus} ${this.path}` } 
}
class Change extends Event { 
  toString() { return `${Delta} ${this.path}` } 
}
class Unlink extends Event { 
  toString() { return `${Minus} ${this.path}` } 
}
class Move extends Event { 
  toString() { return `${Arrow} ${this.previousPath} -> ${this.path}` } 
}
class Error extends Event { 
  toString() { return `${Exclamation} ${this.value}` } 
}

Event.Link = Link
Event.Change = Change
Event.Unlink = Unlink
Event.Move = Move
Event.Error = Error

module.export = Event
