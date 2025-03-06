const { lexer } = require('../src/compiler/lexer');
const { expect } = require('chai');

describe('Lexer', () => {
  it('should tokenize a simple expression', () => {
    const input = 'num x = 42;';
    const tokens = lexer(input);
    expect(tokens).to.deep.equal([
      { type: 'Keyword', value: 'num', line: 1, column: 1 },
      { type: 'Identifier', value: 'x', line: 1, column: 5 },
      { type: 'Operator', value: '=', line: 1, column: 7 },
      { type: 'Number', value: '42', line: 1, column: 9 },
      { type: 'Punctuation', value: ';', line: 1, column: 11 },
      { type: 'EOF', value: null, line: 1, column: 12 } // Add EOF token
    ]);
  });
});