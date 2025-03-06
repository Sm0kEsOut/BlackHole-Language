const { lexer } = require('../src/compiler/lexer');
const { expect } = require('chai');

describe('Lexer', () => {
  it('should tokenize a simple expression', () => {
    const input = 'local x = "we";';
    const tokens = lexer(input);
    expect(tokens).to.deep.equal([
      { type: 'Keyword', value: 'local', line: 1, column: 1 },
      { type: 'Identifier', value: 'x', line: 1, column: 7 },
      { type: 'Operator', value: '=', line: 1, column: 9 },
      { type: 'Number', value: 'we', line: 1, column: 11 },
      { type: 'Punctuation', value: ';', line: 1, column: 13 },
      { type: 'EOF', value: null, line: 1, column: 14 }
    ]);
  });
});