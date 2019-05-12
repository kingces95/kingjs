# @[kingjs][@kingjs]/[rx][ns0].[proxy-subject][ns1]
A class that that proxies events to a private `IObserver` and subscribes clients to a  private `IObservable`.
## Usage
```js
var assert = require('assert')
var ProxySubject = require('@kingjs/rx.proxy-subject')
var Select = require('@kingjs/rx.select')
var { Subscribe } = require('@kingjs/rx.i-observable')
var { Next, Complete, Error } = require('@kingjs/rx.i-observer')

// select
var proxy = new ProxySubject(
  o => o[Select](x => x + 1)
)

// subscribe
var result = []
proxy[Subscribe](
  o => result.push(o),
  () => result.push('COMPLETE')
)

// execute
proxy[Next](0)
proxy[Complete]()
assert.deepEqual(result, [
  1, 'COMPLETE'
])

// error
var proxy = new ProxySubject()
var result = []
proxy[Subscribe](null, null, e => result.push(e))
proxy[Error]('ERROR')
assert(result[0] == 'ERROR')

// dispose
var proxy = new ProxySubject()
var result = []
var dispose = proxy[Subscribe]()
dispose()
proxy[Subscribe](null, null, e => result.push(e))
assert(result.length == 1)
```



### Parameters
- `createObservable`: Creates  an `IObservable` given `observer` to which subscriptions are proxied. Default is identity.
- `observer`: The observer to which events are proxied.



## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/rx.proxy-subject
```
## Dependencies
|Package|Version|
|---|---|
|[`@kingjs/reflect.create-symbol`](https://www.npmjs.com/package/@kingjs/reflect.create-symbol)|`latest`|
|[`@kingjs/reflect.is`](https://www.npmjs.com/package/@kingjs/reflect.is)|`latest`|
|[`@kingjs/rx.i-observable`](https://www.npmjs.com/package/@kingjs/rx.i-observable)|`latest`|
|[`@kingjs/rx.i-observer`](https://www.npmjs.com/package/@kingjs/rx.i-observer)|`latest`|
|[`@kingjs/rx.subject`](https://www.npmjs.com/package/@kingjs/rx.subject)|`latest`|
## Source
https://repository.kingjs.net/rx/proxy-subject
## License
MIT

![Analytics](https://analytics.kingjs.net/rx/proxy-subject)

[@kingjs]: https://www.npmjs.com/package/kingjs
[ns0]: https://www.npmjs.com/package/@kingjs/rx
[ns1]: https://www.npmjs.com/package/@kingjs/rx.proxy-subject
