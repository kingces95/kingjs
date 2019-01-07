'use strict';

var {
  '@kingjs/define-interface': defineInterface,
  '@kingjs/define-symbols': defineSymbols,
} = require('@kingjs/require-packages').call(module);

var {
  IInterface,
} = defineInterface;

Symbol.kingjs = {
  IIdentifiable,
  IPolymorphic,  
}

defineSymbols(Symbol, 'kingjs', {

});
