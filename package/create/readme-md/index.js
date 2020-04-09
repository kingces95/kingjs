#!/usr/bin/env node
var expand = require('@kingjs/expand-readme')
var templatePath = require.resolve('./md/README.t.md')
expand(templatePath)