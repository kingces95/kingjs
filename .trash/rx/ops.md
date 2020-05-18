|done|name|desc|notes|
|---|---|---|---|
||audit|Ignores source values for a duration determined by another Observable, then emits the most recent value from the source Observable, then repeats this process.|It's like auditTime, but the silencing duration is determined by a second Observable.|
||auditTime|Ignores source values for duration milliseconds, then emits the most recent value from the source Observable, then repeats this process.|When it sees a source values, it ignores that plus the next ones for duration milliseconds, and then it emits the most recent value from the source.|
||buffer|Buffers the source Observable values until closingNotifier emits.|Collects values from the past as an array, and emits that array only when another Observable emits.|
||bufferCount|Buffers the source Observable values until the size hits the maximum bufferSize given.|Collects values from the past as an array, and emits that array only when its size reaches bufferSize.|
||bufferTime|Buffers the source Observable values for a specific time period.|Collects values from the past as an array, and emits those arrays periodically in time.|
||bufferToggle|Buffers the source Observable values starting from an emission from openings and ending when the output of closingSelector emits.|Collects values from the past as an array. Starts collecting only when opening emits, and calls the closingSelector function to get an Observable that tells when to close the buffer.|
||bufferWhen|Buffers the source Observable values, using a factory function of closing Observables to determine when to close, emit, and reset the buffer.|Collects values from the past as an array. When it starts collecting values, it calls a function that returns an Observable that tells when to close the buffer and restart collecting.|
||catchError|Catches errors on the observable to be handled by returning a new observable or throwing an error.||
||combineAll|Flattens an Observable-of-Observables by applying combineLatest when the Observable-of-Observables completes.|
||combineLatest|Deprecated in favor of static combineLatest.|
||concat|Deprecated in favor of static concat.|
||concatAll|Converts a higher-order Observable into a first-order Observable by concatenating the inner Observables in order.|Flattens an Observable-of-Observables by putting one inner Observable after the other.|
||concatMap|Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.|Maps each value to an Observable, then flattens all of these inner Observables using concatAll.|
||concatMapTo|Projects each source value to the same Observable which is merged multiple times in a serialized fashion on the output Observable.|It's like concatMap, but maps each value always to the same inner Observable.
|x|count|Counts the number of emissions on the source and emits that number when the source completes.|Tells how many values were emitted, when the source completes.|
||debounce|Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.|It's like debounceTime, but the time span of emission silence is determined by a second Observable.|
||debounceTime|Emits a value from the source Observable only after a particular time span has passed without another source emission.|It's like delay, but passes only the most recent value from each burst of emissions.|
||defaultIfEmpty|Emits a given value if the source Observable completes without emitting any next value, otherwise mirrors the source Observable.|If the source Observable turns out to be empty, then this operator will emit a default value.|
||delay|Delays the emission of items from the source Observable by a given timeout or until a given Date.|Time shifts each item by some specified amount of milliseconds.|
||delayWhen|Delays the emission of items from the source Observable by a given time span determined by the emissions of another Observable.|It's like delay, but the time span of the delay duration is determined by a second Observable.|
||dematerialize|Converts an Observable of Notification objects into the emissions that they represent.|Unwraps Notification objects as actual next, error and complete emissions. The opposite of materialize.|
||distinct|Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.|
||distinctUntilChanged|Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.|
||distinctUntilKeyChanged|Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct.|
||elementAt|Emits the single value at the specified index in a sequence of emissions from the source Observable.|
||endWith|Returns an Observable that emits the items you specify as arguments after it finishes emitting items emitted by the source Observable.|
||every|Returns an Observable that emits whether or not every item of the source satisfies the condition specified.|
||exhaust|Converts a higher-order Observable into a first-order Observable by dropping inner Observables while the previous inner Observable has not yet completed.|
||exhaustMap|Projects each source value to an Observable which is merged in the output Observable only if the previous projected Observable has completed.|
||expand|Recursively projects each source value to an Observable which is merged in the output Observable.|
||filter|Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.|
||finalize|Returns an Observable that mirrors the source Observable, but will call a specified function when the source terminates on complete or error.|
||find|Emits only the first value emitted by the source Observable that meets some condition.|
||findIndex|Emits only the index of the first value emitted by the source Observable that meets some condition.|
||first|Emits only the first value (or the first value that meets some condition) emitted by the source Observable.|
||flatMap|Projects each source value to an Observable which is merged in the output Observable.|
||groupBy|Groups the items emitted by an Observable according to a specified criterion, and emits these grouped items as GroupedObservables, one GroupedObservable per group.|
||ignoreElements|Ignores all items emitted by the source Observable and only passes calls of complete or error.|
||isEmpty||
||last|Returns an Observable that emits only the last item emitted by the source Observable. It optionally takes a predicate function as a parameter, in which case, rather than emitting the last item from the source Observable, the resulting Observable will emit the last item from the source Observable that satisfies the predicate.|
|x|map|Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.|
||mapTo|Emits the given constant value on the output Observable every time the source Observable emits a value.|
||materialize|Represents all of the notifications from the source Observable as next emissions marked with their original types within Notification objects.|
||max|The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the largest value.|
||merge|Deprecated in favor of static merge.|
||mergeAll|Converts a higher-order Observable into a first-order Observable which concurrently delivers all values that are emitted on the inner Observables.|
||mergeMap|Projects each source value to an Observable which is merged in the output Observable.|
||mergeMapTo|Projects each source value to the same Observable which is merged multiple times in the output Observable.|
||mergeScan|Applies an accumulator function over the source Observable where the accumulator function itself returns an Observable, then each intermediate Observable returned is merged into the output Observable.|
||min|The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function), and when source Observable completes it emits a single item: the item with the smallest value.|
||multicast|Returns an Observable that emits the results of invoking a specified selector on items emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
||observeOn|Re-emits all notifications from source Observable with specified scheduler.|
||onErrorResumeNext|When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one that was passed.|
||pairwise|Groups pairs of consecutive emissions together and emits them as an array of two values.|
||partition|Splits the source Observable into two, one with values that satisfy a predicate, and another with values that don't satisfy the predicate.|
||pluck|Maps each source value (an object) to its specified nested property.|
||publish|Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called before it begins emitting items to those Observers that have subscribed to it.
||publishBehavior||
||publishLast|Returns a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.|
||publishReplay||
||race|Returns an Observable that mirrors the first source Observable to emit an item from the combination of this Observable and supplied Observables.|
||reduce|Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.|
||refCount||
||repeat|Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.|
||repeatWhen|Returns an Observable that mirrors the source Observable with the exception of a complete. If the source Observable calls complete, this method will emit to the Observable returned from notifier. If that Observable calls complete or error, then this method will call complete or error on the child subscription. Otherwise this method will resubscribe to the source Observable.|
||retry|Returns an Observable that mirrors the source Observable with the exception of an error. If the source Observable calls error, this method will resubscribe to the source Observable for a maximum of count resubscriptions (given as a number parameter) rather than propagating the error call.|
||retryWhen|Returns an Observable that mirrors the source Observable with the exception of an error. If the source Observable calls error, this method will emit the Throwable that caused the error to the Observable returned from notifier. If that Observable calls complete or error then this method will call complete or error on the child subscription. Otherwise this method will resubscribe to the source Observable.|
||sample|Emits the most recently emitted value from the source Observable whenever another Observable, the notifier, emits.|
||sampleTime|Emits the most recently emitted value from the source Observable within periodic time intervals.|
||scan|Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value.|
||sequenceEqual|Compares all values of two observables in sequence using an optional comparator function and returns an observable of a single boolean value representing whether or not the two sequences are equal.|
||share|Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream hot. This is an alias for multicast(() => new Subject()), refCount().|
||shareReplay||
||single|Returns an Observable that emits the single item emitted by the source Observable that matches a specified predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no items, notify of an IllegalArgumentException or NoSuchElementException respectively. If the source Observable emits items but none match the specified predicate then undefined is emitted.|
||skip|Returns an Observable that skips the first count items emitted by the source Observable.|
||skipLast|Skip the last count values emitted by the source Observable.|
||skipUntil|Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.|
||skipWhile|Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds true, but emits all further source items as soon as the condition becomes false.|
||startWith|Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.|
||subscribeOn|Asynchronously subscribes Observers to this Observable on the specified SchedulerLike.|
||switchAll|Converts a higher-order Observable into a first-order Observable producing values only from the most recent observable sequence.|
||switchMap|Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.|
||switchMapTo|Projects each source value to the same Observable which is flattened multiple times with switchMap in the output Observable.|
||take|Emits only the first count values emitted by the source Observable.|
||takeLast|Emits only the last count values emitted by the source Observable.|
||takeUntil|Emits the values emitted by the source Observable until a notifier Observable emits a value.|
||takeWhile|Emits values emitted by the source Observable so long as each value satisfies the given predicate, and then completes as soon as this predicate is not satisfied.|
||tap|Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.|
||throttle|Emits a value from the source Observable, then ignores subsequent source values for a duration determined by another Observable, then repeats this process.|
||throttleTime|Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.|
||timeInterval|Emits an object containing the current value, and the time that has passed between emitting the current value and the previous value, which is calculated by using the provided scheduler's now() method to retrieve the current time at each emission, then calculating the difference. The scheduler defaults to async, so by default, the interval will be in milliseconds.|
||timeout|Errors if Observable does not emit a value in given time span.|
||timeoutWith|Errors if Observable does not emit a value in given time span, in case of which subscribes to the second Observable.|
||timestamp||
||toArray||
||window|Branch out the source Observable values as a nested Observable whenever windowBoundaries emits.|
||windowCount|Branch out the source Observable values as a nested Observable with each nested Observable emitting at most windowSize values.|
||windowTime||
||windowToggle|Branch out the source Observable values as a nested Observable starting from an emission from openings and ending when the output of closingSelector emits.|
||windowWhen|Branch out the source Observable values as a nested Observable using a factory function of closing Observables to determine when to start a new window.|
||withLatestFrom|Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.|
||zip|Deprecated in favor of static zip.|
||zipAll||