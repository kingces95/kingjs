'use strict';

var require = require('../..');
var assert = require('assert');

var loader = require('..');

function testAccessorInfo() {

  var myLoader = loader.fork({
    accessors: { myAccessor: { get: '', set: '' } }
  });

  var info = myLoader.resolve('myAccessor')
  assert(info.isJavascriptNode);
  assert(info.isMember);
  assert(info.isAccessor);

  var getterInfo = info.get;
  assert(!getterInfo.isAbstract);
  assert(getterInfo.isMethod);
  assert(getterInfo.isAccessorMethod);
  assert(getterInfo.isGetter);
  assert(getterInfo.declaringAccessor == info);

  var setterInfo = info.set;
  assert(!setterInfo.isAbstract);
  assert(setterInfo.isMethod);
  assert(setterInfo.isAccessorMethod);
  assert(setterInfo.isSetter);
  assert(setterInfo.declaringAccessor == info);
}
testAccessorInfo();
