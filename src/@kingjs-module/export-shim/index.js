var {
  '@kingjs': {
    '-module': { 
      Module, 
      ExportStaticExtension, 
      ExportExtension 
    },
    '-interface': { Implement }
  },
} = module[require('@kingjs-module/dependencies')]()

function implement(iface, type, descriptor) {
  this[ExportStaticExtension](type, 
    function implement() {
      iface[Implement](type.prototype, descriptor)
    }
  )
}

module[ExportExtension](Module, implement)