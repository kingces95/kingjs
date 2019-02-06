var assert = require('assert');

/**
 * @description Assert that `kingjs` has been required by the
 * application which means that registered symbols like
 * `@kingjs/IEnumerable.getEnumerator` will have been set on
 * builtin objects like `string` and `array`.
 */