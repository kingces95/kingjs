## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}${join("  - `${key}`: ${value}", value.callback.parameters, "\\n", "\\n")}', parameters, '\n')}
${returns ? expand('./RETURNS.t.md') : ''}