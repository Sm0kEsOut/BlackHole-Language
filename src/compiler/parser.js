const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
parser.feed("1 + 2 * (3 - 4)");

console.log(parser.results[0]);