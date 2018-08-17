var caseAt = require('.');
var testRequire = require('..');
var assert = testRequire('@kingjs/assert')
var assertThrows = testRequire('@kingjs/assert-throws')

function readmeTest() {
  assert(caseAt.isRaised("Hello World!", 0));
}
readmeTest();

function readmeChange() {
  assert(caseAt.lower("Hello World!", 6) == "Hello world!");
}
readmeChange();

function testCaseCheck(value, index, isRaised, isLowered) {
  assert(caseAt.isRaised(value, index) == isRaised);
  assert(caseAt.isLowered(value, index) == isLowered);
}
testCaseCheck('', 0, false, false);
testCaseCheck(null, 0, false, false);
testCaseCheck(undefined, 0, false, false);

testCaseCheck('a', 0, false, true);
testCaseCheck('A', 0, true, false);
testCaseCheck('0', 0, true, true);

testCaseCheck('.a', 1, false, true);
testCaseCheck('.A', 1, true, false);
testCaseCheck('.0', 1, true, true);

function testCaseChange(value, index, raised, lowered) {
  assert(caseAt.raise(value, index) == raised);
  assert(caseAt.lower(value, index) == lowered);
}
testCaseChange('a', 0, 'A', 'a');
testCaseChange('A', 0, 'A', 'a');
testCaseChange('0', 0, '0', '0');

testCaseChange('.a', 1, '.A', '.a');
testCaseChange('.A', 1, '.A', '.a');
testCaseChange('.0', 1, '.0', '.0');

function testCaseChangeThrows(value, index) {
  assertThrows(function() { caseAt.raise(value, index); })
  assertThrows(function() { caseAt.lower(value, index); })
}
testCaseChangeThrows('', -1);
testCaseChangeThrows(null, 0);
testCaseChangeThrows(undefined, 0);
testCaseChangeThrows('', 0);
testCaseChangeThrows('a', 1);
