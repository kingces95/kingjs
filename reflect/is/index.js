var {
  ['@kingjs']: { 
    Generator,
    AsyncGenerator
  },
} = require('./dependencies');

var is = {
  undefined: o => o === undefined,
  null: o => o === null,
  nullOrUndefined: o => is.null(o) || is.undefined(o),

  boolean: o => typeof o == 'boolean' || o instanceof Boolean,
  number: o => (typeof o == 'number' || o instanceof Number) && o != NaN,
  string: o => typeof o == 'string' || o instanceof String,
  symbol: o => typeof o == 'symbol',
  stringOrSymbol: o => is.string(o) || is.symbol(o),
  
  nonEmptyString: o => is.string(o) && o.length > 0,

  function: o => typeof o == 'function', 
  namedFunction: o => is.function(o) && is.nonEmptyString(o.name),

  objectLiteral: o => typeof o == 'object' && !is.null(o) && o.constructor == Object,
  object: o => (typeof o == 'object' && !is.null(o)),

  array: o => Array.isArray(o),
  arrayLike: o => is.array(o) || (is.object(o) && 'length' in o),

  generator: o => o instanceof Generator,
  asyncGenerator: o => o instanceof AsyncGenerator,
};

module.exports = is;