class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}

const TokenType = {
    Number: 'Number',
    Identifier: 'Identifier',
    Keyword: 'Keyword',
    Operator: 'Operator',
    Punctuation: 'Punctuation',
    String: 'String',
    Comment: 'Comment',
    EOF: 'EOF'
};

function lexer(input) {
    const tokens = [];
    let pos = 0;
    let line = 1;
    let column = 1;

    const KEYWORDS = ['if', 'else', 'elseif', 'while', 'function', 'return', 'var', 'true', 'false', 'and', 'or', '/', 'not', 'for', 'break', 'func', 'repeat', 'nil', 'null', 'print', 'until', 'type', 'string', 'boolean', 'bool', 'num', 'int', '?'];
    const OPERATORS = ['+', '-', '*', '/', '//', '^', '%', '-', '+=', '-=', '*=', '/=', '//=', '%=', '^=', '..=', '=', '==', '!=', '<', '>', '<=', '>=', '&', '|', '..', '#']; // '//' floor division, '^' exponent, '%' modulus operation, '#' length operator

    const tokenSpecs = [
        // Whitespace
        [/^\s+/, null],
        // Single-line comments (--)
        [/^--.*/, null],
        // Multi-line comments (-[[ ]]-)
        [/^-\[\[[\s\S]*?\]\]-/, null],
        // Strings
        [/^"[^"]*"/, TokenType.String],
        [/^'[^']*'/, TokenType.String],
        // Numbers
        [/^\d+\.\d+/, TokenType.Number],  // Floating point
        [/^\d+/, TokenType.Number],       // Integer
        // Identifiers and keywords
        [/^[a-zA-Z_]\w*/, (value) =>
            KEYWORDS.includes(value) ? TokenType.Keyword : TokenType.Identifier
        ],
        // Operators and punctuation
        [/^(==|!=|<=|>=|&&|\|\|)/, TokenType.Operator],
        [/^[+\-*/=<>(){};,]/, (value) =>
            OPERATORS.includes(value) ? TokenType.Operator : TokenType.Punctuation
        ],
    ];

    while (pos < input.length) {
        let match = null;
        let tokenType = null;

        for (const [regex, typeOrFunc] of tokenSpecs) {
            regex.lastIndex = 0; // Reset regex state
            const substr = input.slice(pos);
            match = regex.exec(substr);

            if (match) {
                const value = match[0];
                tokenType = typeof typeOrFunc === 'function' ? typeOrFunc(value) : typeOrFunc;

                if (tokenType !== null) {
                    tokens.push(new Token(
                        tokenType,
                        value,
                        line,
                        column
                    ));
                }

                // Update position tracking
                const lines = value.split('\n');
                if (lines.length > 1) {
                    line += lines.length - 1;
                    column = lines[lines.length - 1].length + 1;
                } else {
                    column += value.length;
                }

                pos += value.length;
                break;
            }
        }

        if (!match) {
            throw new Error(`Unexpected character '${input[pos]}' at line ${line}, column ${column}`);
        }
    }

    tokens.push(new Token(TokenType.EOF, null, line, column));
    return tokens;
}

module.exports = { lexer };