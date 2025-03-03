const { lexer } = require('./lexer');

const code = `
-- This is a single-line comment
let x = 42; -[[ This is a
multi-line comment ]]- let y = 3.14;`;

const tokens = lexer(code);
console.log(tokens.map(t => 
  `${String(t.type).padEnd(12)} '${t.value}' (${t.line}:${t.column})`
));