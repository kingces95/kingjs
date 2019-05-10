var { 
  ['@kingjs']: { reflect: { is } }
} = require('../dependencies');
var ZipCentralDirectoryFileHeaderInfo = {
  signature: { bytes: 4, type: [0x50,0x4b,0x01,0x02] }
}