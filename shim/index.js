'use strict';

require('./define-symbols');

// defineExtension(this IPolymorphic, name: string, extension: function)
require('./define-extension');

// addPolymorphism(this IPolymorphic, polymorphism: function)
require('./add-polymorphism');

// Array : IIterable
require('./shim-array');

// String : IIterable
require('./shim-string');

// Generator : IIterable, IEnumerable
require('./shim-generator');
