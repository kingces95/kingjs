var {
  Path,
  '@kingjs': { 
    fs: { Dir },
  }
} = require('./dependencies')

function expand(templatePath, substitutions) {
  var dir = new Dir(Path.dirname(templatePath))

  // gather substitutions
  substitutions = {
    expand: (path) => dir.expand(path, substitutions), 
    include: (path) => dir.read(path), 
    exists: (path) => dir.exists(path),
    join: (template, source, separator) => 
      template[ExpandForEach](source, substitutions, separator),

    ...substitutions,
  }

  // include template
  return dir.expand(Path.basename(templatePath), substitutions)
}

module.exports = expand