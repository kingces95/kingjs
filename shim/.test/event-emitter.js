var assert = require('assert');
var { On } = require('@kingjs/i-event-tunable');
var { Off, ListenerCount } = require('@kingjs/i-event-detunable');
var { Emit } = require('@kingjs/i-event-broadcaster');
var { EventEmitter } = require('events');
require('../index');

var Name = 'myEvent';
var E = { };

var count = 0;
var e = new EventEmitter();
assert(e[ListenerCount](Name) == count);

var resultA;
var handlerA = o => resultA = o;
e[On](Name, handlerA); count++;

var resultB;
var handlerB = o => resultB = o;
e[On](Name, handlerB); count++;

assert(e[ListenerCount](Name) == count);

e[Emit](E);
assert(resultA = E);
assert(resultB = E);

e[Off](Name, handlerA); count--;
e[Off](Name, handlerB); count--;
assert(e[ListenerCount](Name) == count);