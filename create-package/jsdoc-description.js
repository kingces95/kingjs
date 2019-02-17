var { 
  ['@kingjs']: { parseSource }
} = require('./dependencies');

var {
  FirstJSDocTagNode
} = parseSource;

var Space = ' ';
var NewLineRx = /\r\n|\r|\n/g;
var Description = 'description';

function parse(path) {
  var ast = parseSource(path);
  var description = walk(ast);
  description = description.replace(NewLineRx, Space);
  return description;

  function walk(node) {
    for (var name in node) {
      var value = node[name];
      
      if (value instanceof FirstJSDocTagNode) {
        if (value.tagName == Description)
          return value.comment;
      }

      if (value instanceof Object) {
        var result = walk(value);
        if (result)
          return result;
      }
    }
  }
}

module.exports = parse;

//console.log(JSON.stringify(parse('.test/sample.js'), null, 2));
