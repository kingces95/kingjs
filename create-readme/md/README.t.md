# @[kingjs][@kingjs]/${join('[${value}][ns${i}]', segments, '.')}
${description}
${canInclude('./test/readme.js') ? expand('./USAGE.t.md') : ''}
${api ? expand('./API.t.md') : ''}
${canInclude('./md/OVERLOADS.md') ? expand('./OVERLOADS.t.md') : ''}
${Object.keys(parameters).length ? expand('./PARAMETERS.t.md') : ''}
${remarks ? expand('./REMARKS.t.md') : ''}
${canInclude('./md/SEE-ALSO.md') ? expand('./SEE-ALSO.t.md') : ''}
${expand('./INSTALL.t.md')}
${Object.keys(dependencies).length ? expand('./DEPENDENCIES.t.md') : ''}
${expand('./FOOTER.t.md')}

[@kingjs]: ${npmjs}kingjs
${join('[ns${i}]: ${npmjs}@kingjs/${value}', namespaces, '\n')}
