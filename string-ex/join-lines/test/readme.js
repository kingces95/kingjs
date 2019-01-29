var assert = require('assert');
var os = require('os');
var JoinLines = require('..');

var EndOfLine = os.EOL;
var NewLine = '\n';
var CarriageReturn = '\r';

var lines = `foo${NewLine}bar${CarriageReturn}baz${EndOfLine}moo`;

var paragraph = lines[JoinLines]();
assert(paragraph == 'foo bar baz moo');

var fullName = lines[JoinLines]('.');
assert(fullName == 'foo.bar.baz.moo');
