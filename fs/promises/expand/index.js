var {
  fs: { promises: fs },
  Path,
  '@kingjs': { 
    promises: { fs: { exists } },
    stringEx: { Expand },
  }
} = require('./dependencies')

var printJoin = require('./print-join')

var UTF8 = 'utf8'

async function expand(templatePath, substitutions) {

  // gather substitutions
  substitutions = {
    join: (template, source, separator, keys) => 
      printJoin(template, substitutions, source, separator, keys),
    include: (path) => await fs.readFile(joinCwd(path), UTF8), 
    exists: (path) => await exists(joinCwd(path)),
    expand,

    ...substitutions,
  }

  // establish a stack of directories
  var cwd = Path.dirname(templatePath)
  var stack = [ ]

  // include template
  return await expand(templatePath)

  function pushDir(dir) {
    stack.push(cwd)
    cwd = dir
  }

  function popDir() {
    cwd = stack.pop()
  }

  function joinCwd(path) {
    assert(!Path.isAbsolute(path))
    return Path.join(cwd, path)
  }

  async function expand(path) {
    var path = joinCwd(path)

    pushDir(Path.dirname(path))
    {
      var text = await include(path)
      text = text[Expand](substitutions)
    }
    popDir()

    return text
  }
}

module.exports = expand