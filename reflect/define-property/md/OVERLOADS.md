```js
define(target, namedFunction)
  => define(target, name, { value: namedFunction, ... })
  
define(target, { value: namedFunction, ... })
  => define(target, name, { value: namedFunction, ... })

define(target, { get|set: namedFunction, ... })
  => define(target, name, { get|set: namedFunction, ... })

define(target, name, { get|set: string, ... })
  => define(target, name, { get|set: lambda, ... })

define(target, name, { value: string, lazy|extends: truthy, ... })
  => define(target, name, { value: lambda, lazy|extends: truthy, ... })

define(target, name, nonObjectOrNull)
  => define(target, name, { value: nonObjectOrNull })
```
