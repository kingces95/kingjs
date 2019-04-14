var { 
  path: Path,
  ['@kingjs']: {
    reflect: { exportExtension },
  }
} = require('./dependencies');

/**
 * @description Returns an buffer representing the path.
 * 
 * @param relative A relative or absolute path.
 * @param [base] An absolute path to be used as a base path. Defaults
 * to the present working directory.
 * 
 * @returns Returns a buffer representing th path.
 * 
 * @remarks The buffer is composed of interned segments so that 
 * paths with common bases share the same base buffer just concatenated
 * with their different file or directory names.
 */
function toBuffer(path) {    
  
};

module.exports = toBuffer;
