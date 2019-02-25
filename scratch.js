function* generate() {
  yield 0;
  yield 1;
  return 2
}

function* pipe() {
  var result = yield* generate();
  yield result;
}

for (var o of pipe())
  console.log(o);