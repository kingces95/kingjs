# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
${canInclude('./test/readme.js') ? expand('./md/USAGE.t.md') : ''}
${api ? expand('./md/API.t.md') : ''}
${remarks ? expand('./md/REMARKS.t.md') : ''}
${expand('./md/FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
