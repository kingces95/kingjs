"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var ts = require("typescript");
var indents = [];
function delint(sourceFile) {
    delintNode(sourceFile);
    function delintNode(node) {
        indents.push(' ');
        var indent = indents.join('');
        var name = ts.SyntaxKind[node.kind];
        var line = indent + name + ' ';
        if (node.escapedText)
            line += "'" + node.escapedText + "'";
        if (node.comment)
            line += ' ' + node.comment;
        var text = node.getText();
        console.log(line);
        if (node.jsDoc) {
            for (var _i = 0, _a = node.jsDoc; _i < _a.length; _i++) {
                var doc = _a[_i];
                ts.forEachChild(doc, delint);
            }
        }
        ts.forEachChild(node, delintNode);
        indents.pop();
    }
    function report(node, message) {
        var _a = sourceFile.getLineAndCharacterOfPosition(node.getStart()), line = _a.line, character = _a.character;
        console.log(sourceFile.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    }
}
exports.delint = delint;
//const fileNames = process.argv.slice(2);
var fileNames = ['doc/index.d.ts'];
fileNames.forEach(function (fileName) {
    // Parse a file
    var sourceFile = ts.createSourceFile(fileName, fs_1.readFileSync(fileName).toString(), ts.ScriptTarget.ES2015, 
    /*setParentNodes */ true);
    // delint it
    delint(sourceFile);
});
//# sourceMappingURL=trans.js.map