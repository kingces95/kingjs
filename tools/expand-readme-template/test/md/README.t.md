# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
${canInclude('./test/readme.js') ? expand('./USAGE.t.md') : ''}
${api ? expand('./API.t.md') : ''}
## Remarks
Run in directory containing `package.json`.
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
