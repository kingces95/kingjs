### Parameters
${join('- `${key}`: ${value}${join("  - `${key}`: ${value}", value.callback.parameters, "\\n", "\\n")}${ value.callback.returns ? "\\n  - " + value.callback.returns : ""}', parameters, '\n')}
${returns ? expand('./RETURNS.t.md') : ''}