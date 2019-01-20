var assert = require('assert');
var os = require('os');
var joinLines = require('..');

var EndOfLine = os.EOL;
var NewLine = '\n';
var CarriageReturn = '\r';

var lines = `foo${NewLine}bar${CarriageReturn}baz${EndOfLine}moo`;

var paragraph = joinLines.call(lines);
assert(paragraph == 'foo bar baz moo');

var fullName = joinLines.call(lines, '.');
assert(fullName == 'foo.bar.baz.moo');
