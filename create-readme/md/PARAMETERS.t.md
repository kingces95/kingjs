### Parameters
${join('- `${key}`: ${value}${join("  - `${key}`: ${value}", value.callback, "\\n", "\\n")}', parameters, '\n')}
${returns ? expand('./RETURNS.t.md') : ''}