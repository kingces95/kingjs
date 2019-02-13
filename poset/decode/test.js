'use strict';

var decodePoset = require('.');

var Dictionary = require('@kingjs/dictionary');
var assert = require('assert');

function readMe() {

  var vertices = new Dictionary();

  var edges = decodePoset.call({
    a$b$c: 1,
    b$d: 2,
    c$d: 3,
    d: 4,
  }, vertices);

  assert(Object.keys(vertices).length == 4);
  assert(vertices.a == 1);
  assert(vertices.b == 2);
  assert(vertices.c == 3);
  assert(vertices.d == 4);

  assert(Object.keys(edges).length == 3);

  assert(edges.a.length == 2);
  assert(edges.a[0] == 'b');
  assert(edges.a[1] == 'c');

  assert(edges.b.length == 1);
  assert(edges.b[0] == 'd');

  assert(edges.c.length == 1);
  assert(edges.c[0] == 'd');
}
readMe();