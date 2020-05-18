# `IObservable` Transforms
A function that 
- extends `IObservable` 
- returns an `IObservable` and

is a  "general transform". A general transform that also
- does not generate its own `complete` or `error` events 

is a "simple transform" or just a "transform".


## Buffer Transform
A transform that buffer observations until it makes on observation on
another observable. 

```js
function buffer(
  observer,       // observes source events as 'undefined'
  observable,     // emits when the buffer should be emit
  bufferFactory,  // activates a new buffer
  reduce          // reduces an observation into a buffer
);
```

## Abstract Transform
A transform that behaves the same regardless of observed values and 
emits only `undefined` values is an "abstract transform".

|name|emits...|
|--|--|
|Count|after n observations|

## Abstract Timing Transform
An abstract transform that is affected by time is an "abstract timing
transform".

|name|emits...|
|--|--|
|Never|never.|
|Timer|once after a delay.|
|Periodic|periodically.|
|Delay|on observation, after a delay.|
|Scheduled|at a scheduled time.|
|Quiescent|on observation followed by a period of time without an observation.|
