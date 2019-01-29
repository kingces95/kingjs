var assert = require('assert');
var JoinLines = require('..');

var LineTabulation = '\x0B';
var FormFeed = '\x0C';
var NextLine = '\u0085';
var LineSeparator = '\u2028';
var ParagraphSeparator = '\u2029';

var esotericLine = 
  LineTabulation + 
  NextLine + 
  FormFeed + 
  LineSeparator + 
  ParagraphSeparator;
assert(esotericLine[JoinLines]() == ' ');