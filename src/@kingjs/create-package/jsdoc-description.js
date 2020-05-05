var { 
  ['@kingjs']: { parseSource }
} = module[require('@kingjs-module/dependencies')]();

var {
  FirstJSDocTagNode
} = parseSource;

var Space = ' ';
var NewLineRx = /\r\n|\r|\n/g;
var Description = 'description';

function parse(ast) {
  var description = walk(ast);
  if (!description)
    return;
    
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
