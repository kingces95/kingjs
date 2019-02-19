require('./readme.js')

function boxing() {
  var zero = 0;
  assert(zero == returnThis.call(zero));
  assert(zero !== returnThis.call(zero));

  assert(typeof zero == 'number');
  assert(typeof returnThis.call(zero) == 'object');

  assert(zero instanceof Number == false);
  assert(returnThis.call(zero) instanceof Number);

  var boxedZero = new Number(0);
  assert(boxedZero === returnThis.call(boxedZero));
}
boxing();