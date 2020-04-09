## API
```ts
${api}
```
### Parameters
${join('- `${key}`: ${value}${join("  - `${key}`: ${value}", value.callback ? value.callback.parameters : null, "\\n", "\\n")}', parameters, '\n')}
${returns ? expand('./RETURNS.t.md') : ''}