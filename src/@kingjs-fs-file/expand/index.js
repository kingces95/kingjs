var {
  '@kingjs': { Path,
    '-module': { ExportExtension },
    '-string': { Expand },
    '-fs': { Probe, Exists,
      '-file': { Read, Write }, 
    }
  },
} = module[require('@kingjs-module/dependencies')]()

var UTF8 = 'utf8'

/**
 * @description Expands a source file into a target file.
 * 
 * @this any The base directory for `targetRelPath`, `templateRelPath`, 
 * and to start probing ancestors with `probeRelDir`.
 * 
 * @param targetRelPath The relative path to the result file.
 * @param templateRelPath The relative path to be probed for the template.
 * @param probeRelDir A relative path probe. Like 'node_modules' but for templates.
 * @param substitutions The substitutions providing context during expansion.
 * 
 * @remarks An `expand` callback is added to `substitutions` to allow a 
 * template to probe for, and expand sub-templates. 
 */
function expand(targetRelPath, templateRelPath, probeRelDir, substitutions) {
  var dir = this

  probeRelDir = Path.parse(probeRelDir)

  substitutions = { 
    ...substitutions, 
    include,
    expand
  }

  var result = expand(templateRelPath)
  if (!result)
    return

  dir.to(targetRelPath)[Write](result)

  function include(name) {
    var path = dir[Probe](probeRelDir.to(name))
    if (!path || !path[Exists]())
      return
    
    return path[Read](UTF8)
  }

  function expand(name) {
    var template = include(name)
    if (!template)
      return
    
    return template[Expand](substitutions)
  }
}

module[ExportExtension](Path.Builder, expand)