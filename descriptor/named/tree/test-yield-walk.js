var done = { };

function* leaf(finish, depends) {
  while (depends && depends in done == false)
    yield;

  console.log(finish);
  done[finish] = true;
}

function* node0() { 
  yield leaf('A', 'B');
  yield leaf('B');
}

function* node1() {
  yield leaf('C', 'A');
}

function* node2() {
  yield node0();
  yield node1();
}

function walk(iterator) {
  var stack = [ iterator ];

  var count = 0;
  while (iterator = stack.shift()) {
    count++;
    var next = iterator.next();
    if (next.done)
      continue;

    stack.push(iterator);

    iterator = next.value;
    if (!iterator)
      continue;

    stack.push(iterator)
  }

  console.log(count);
}
walk(node2());

return;