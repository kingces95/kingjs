# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
${canInclude('./.test/readme.js') ? expand('./USAGE.t.md') : ''}
${api ? expand('./API.t.md') : ''}
${remarks ? expand('./REMARKS.t.md') : ''}
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}