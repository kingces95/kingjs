```js
define(target, name, string)
  => define(target, name, { value: lambda, ... })

// inherited from @kingjs/reflect.define-property
define(target, namedFunction)
  => define(target, name, { value: namedFunction, ... })
  
define(target, { value: namedFunction, ... })
  => define(target, name, { value: namedFunction, ... })

define(target, { get|set: namedFunction, ... })
  => define(target, name, { get|set: namedFunction, ... })

define(target, name, { get|set: string, ... })
  => define(target, name, { get|set: lambda, ... })

define(target, name, nonObjectOrNull)
  => define(target, name, { value: nonObjectOrNull })
```
