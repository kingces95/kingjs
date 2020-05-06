var { assert, os,
  '@kingjs': { 
    '-string': { JoinLines }
  }
} = module[require('@kingjs-module/dependencies')]()

var EndOfLine = os.EOL
var NewLine = '\n'
var CarriageReturn = '\r'

var lines = `foo${NewLine}bar${CarriageReturn}baz${EndOfLine}moo`

var paragraph = lines[JoinLines]()
assert(paragraph == 'foo bar baz moo')

var fullName = lines[JoinLines]('.')
assert(fullName == 'foo.bar.baz.moo')
