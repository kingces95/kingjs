import { readFileSync } from "fs";
import * as ts from "typescript";

var indents = [];
export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    indents.push(' ');
    var indent = indents.join('');

    var name = ts.SyntaxKind[node.kind];
    var line = indent + name + ' ';
    if (node.escapedText)
      line += `'${node.escapedText}'`;
    if (node.comment)
      line += ' ' + node.comment;
    var text = node.getText();
    console.log(line);

    if (node.jsDoc) {
      for (var doc of node.jsDoc)
        ts.forEachChild(doc delint);
    }

    ts.forEachChild(node, delintNode);
    indents.pop();
  }

  function report(node: ts.Node, message: string) {
    let { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart()
    );
    console.log(
      `${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`
    );
  }
}

//const fileNames = process.argv.slice(2);
var fileNames = ['doc/index.d.ts'];
fileNames.forEach(fileName => {
  // Parse a file
  let sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  // delint it
  delint(sourceFile);
});