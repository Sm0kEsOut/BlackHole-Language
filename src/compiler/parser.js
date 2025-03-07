const { lexer, TokenType } = require('./lexer');

class ASTNode {
    constructor(type) {
        this.type = type;
    }
}

class Program extends ASTNode {
    constructor(statements) {
        super('Program');
        this.statements = statements;
    }
}

class VariableDeclaration extends ASTNode {
    constructor(type, identifier, operator, initializer, punctuation) {
        super('VariableDeclaration');
        this.type = type;
        this.identifier = identifier;
        this.operator = operator
        this.initializer = initializer;
        this.punctuation = punctuation;
    }
}

class FunctionDeclaration extends ASTNode {
    constructor(type, name, parameters, body) {
        super('FunctionDeclaration');
        this.type = type;
        this.name = name; // Function name
        this.parameters = parameters; // Array of parameter names
        this.body = body; // Block of statements
    }
}

class Block extends ASTNode {
    constructor(statements) {
        super('Block');
        this.statements = statements;
    }
}

class IfStatement extends ASTNode {
    constructor(condition, thenBlock, elseifClauses, elseBlock) {
        super('IfStatement');
        this.condition = condition;
        this.thenBlock = thenBlock;
        this.elseifClauses = elseifClauses;
        this.elseBlock = elseBlock;
    }
}

class WhileStatement extends ASTNode {
    constructor(condition, body) {
        super('WhileStatement');
        this.condition = condition;
        this.body = body;
    }
}

class RepeatStatement extends ASTNode {
    constructor(body, condition) {
        super('RepeatStatement');
        this.body = body;
        this.condition = condition;
    }
}

class ReturnStatement extends ASTNode {
    constructor(expression) {
        super('ReturnStatement');
        this.expression = expression;
    }
}

class PrintStatement extends ASTNode {
    constructor(expression) {
        super('PrintStatement');
        this.expression = expression;
    }
}

class BreakStatement extends ASTNode {
    constructor() {
        super('BreakStatement');
    }
}

class ExpressionStatement extends ASTNode {
    constructor(expression) {
        super('ExpressionStatement');
        this.expression = expression;
    }
}

class Comment extends ASTNode {
    constructor(value) {
        super('Comment');
        this.value = value;
    }
}

class BinaryExpression extends ASTNode {
    constructor(operator, left, right) {
        super('BinaryExpression');
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
}

class UnaryExpression extends ASTNode {
    constructor(operator, operand) {
        super('UnaryExpression');
        this.operator = operator;
        this.operand = operand;
    }
}

class FunctionCall extends ASTNode {
    constructor(callee, args) {
        super('FunctionCall');
        this.callee = callee;
        this.args = args;
    }
}

class Identifier extends ASTNode {
    constructor(name) {
        super('Identifier');
        this.name = name;
    }
}

class NumberLiteral extends ASTNode {
    constructor(value) {
        super('NumberLiteral');
        this.value = value;
    }
}

class StringLiteral extends ASTNode {
    constructor(value) {
        super('StringLiteral');
        this.value = value;
    }
}

class BooleanLiteral extends ASTNode {
    constructor(value) {
        super('BooleanLiteral');
        this.value = value;
    }
}

class NilLiteral extends ASTNode {
    constructor() {
        super('NilLiteral');
    }
}

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        const statements = [];
        while (!this.isAtEnd()) {
            statements.push(this.parseStatement());
        }
        return new Program(statements);
    }

    parseStatement() {

        if (this.match(['local', 'string', 'boolean', 'bool', 'int', 'num'])) {
            return this.parseVariableDeclaration();
        }
        if (this.match(['function', 'func'])) {
            return this.parseFunctionDeclaration();
        }
        if (this.match(['if'])) {
            return this.parseIfStatement();
        }
        if (this.match(['while'])) {
            return this.parseWhileStatement();
        }
        if (this.match(['repeat'])) {
            return this.parseRepeatStatement();
        }
        if (this.match(['return'])) {
            return this.parseReturnStatement();
        }
        if (this.match(['print'])) {
            return this.parsePrintStatement();
        }
        if (this.match(['break'])) {
            return this.parseBreakStatement();
        }
        if (this.match(['--', '-[['])) {
            return this.parseComment();
        }
        return this.parseExpressionStatement();
    }

    parseVariableDeclaration() {
        const type = this.previous().value;
    
        // Parse the identifier (variable name)
        const identifier = this.consume(TokenType.Identifier, "Expect variable name.").value;
    
        // Parse the assignment operator '='
        const operator = this.consume(TokenType.Operator, "Expect '=' after variable name.").value;
    
        // Parse the initializer expression
        const initializer = this.parseExpression();
    
        // Parse the semicolon ';'
        const punctuation = this.consume(TokenType.Punctuation, "Expect ';' after variable declaration.").value;

        // Return a VariableDeclaration node
        return new VariableDeclaration(type, identifier, operator, initializer, punctuation);
    }

    parseFunctionDeclaration() {
        // Consume the 'function' keyword
        const type = this.previous().value;
    
        // Parse the function name
        const name = this.consume(TokenType.Identifier, "Expect function name.").value;
    
        // Parse the opening parenthesis '('
        this.consume('(', "Expect '(' after function name.");
    
        // Parse the parameters
        const parameters = this.parseParameters();
    
        // Parse the closing parenthesis ')'
        this.consume(')', "Expect ')' after parameters.");
    
        // Parse the function body (block)
        const body = this.parseBlock();
    
        // Return a FunctionDeclaration node
        return new FunctionDeclaration(type, name, parameters, body);
    }

    parseParameters() {
        const parameters = [];
        if (!this.check(')')) { // If there are parameters
            do {
                parameters.push(this.consume(TokenType.Identifier, "Expect parameter name.").value);
            } while (this.match([','])); // Continue if there are more parameters
        }
        return parameters;
    }

    parseBlock() {
        // Parse the opening brace '{'
        this.consume('{', "Expect '{' before block.");
    
        const statements = [];
        while (!this.check('}') && !this.isAtEnd()) { // Parse statements until '}' is found
            statements.push(this.parseStatement());
        }
    
        // Parse the closing brace '}'
        this.consume('}', "Expect '}' after block.");
    
        return new Block(statements);
    }

    parseIfStatement() {
        const type = this.previous().value;
        // this.consume('if', "Expect 'if' keyword.");
        const condition = this.parseExpression();
        const thenBlock = this.parseBlock();
        const elseifClauses = [];
        while (this.match(['elseif'])) {
            const elseifCondition = this.parseExpression();
            const elseifBlock = this.parseBlock();
            elseifClauses.push({ condition: elseifCondition, block: elseifBlock });
        }
        let elseBlock = null;
        if (this.match(['else'])) {
            elseBlock = this.parseBlock();
        }
        return new IfStatement(condition, thenBlock, elseifClauses, elseBlock);
    }

    parseWhileStatement() {
        const type = this.previous().value;
        // this.consume('while', "Expect 'while' keyword.");
        const condition = this.parseExpression();
        const body = this.parseBlock();
        return new WhileStatement(condition, body);
    }

    parseRepeatStatement() {
        const type = this.previous().value;
        // this.consume('repeat', "Expect 'repeat' keyword.");
        const body = this.parseBlock();
        this.consume('until', "Expect 'until' keyword.");
        const condition = this.parseExpression();
        return new RepeatStatement(body, condition);
    }

    parseReturnStatement() {
        const type = this.previous().value;
        // this.consume('return', "Expect 'return' keyword.");
        let expression = null;
        if (!this.check(';')) {
            expression = this.parseExpression();
        }
        this.consume(';', "Expect ';' after return statement.");
        return new ReturnStatement(expression);
    }

    parsePrintStatement() {
        const type = this.previous().value;
        // this.consume('print', "Expect 'print' keyword.");
        const expression = this.parseExpression();
        this.consume(';', "Expect ';' after print statement.");
        return new PrintStatement(expression);
    }

    parseBreakStatement() {
        const type = this.previous().value;
        // this.consume('break', "Expect 'break' keyword.");
        this.consume(';', "Expect ';' after break statement.");
        return new BreakStatement();
    }

    parseComment() {
        const token = this.previous();
        if (token.value.startsWith('--')) {
            return new Comment(token.value);
        } else if (token.value.startsWith('-[[')) {
            return new Comment(token.value);
        }
    }

    parseExpressionStatement() {
        const expression = this.parseExpression();
        this.consume(';', "Expect ';' after expression.");
        return new ExpressionStatement(expression);
    }

    parseExpression() {
        return this.parseLogicalOrExpression();
    }

    parseLogicalOrExpression() {
        let left = this.parseLogicalAndExpression();
        while (this.match(['or'])) {
            const operator = this.previous().value;
            const right = this.parseLogicalAndExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseLogicalAndExpression() {
        let left = this.parseEqualityExpression();
        while (this.match(['and'])) {
            const operator = this.previous().value;
            const right = this.parseEqualityExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseEqualityExpression() {
        let left = this.parseRelationalExpression();
        while (this.match(['==', '!='])) {
            const operator = this.previous().value;
            const right = this.parseRelationalExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseRelationalExpression() {
        let left = this.parseAdditiveExpression();
        while (this.match(['<', '>', '<=', '>='])) {
            const operator = this.previous().value;
            const right = this.parseAdditiveExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseAdditiveExpression() {
        let left = this.parseMultiplicativeExpression();
        while (this.match(['+', '-', '..'])) {
            const operator = this.previous().value;
            const right = this.parseMultiplicativeExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseMultiplicativeExpression() {
        let left = this.parseExponentialExpression();
        while (this.match(['*', '/', '//', '%'])) {
            const operator = this.previous().value;
            const right = this.parseExponentialExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseExponentialExpression() {
        let left = this.parseUnaryExpression();
        while (this.match(['^'])) {
            const operator = this.previous().value;
            const right = this.parseUnaryExpression();
            left = new BinaryExpression(operator, left, right);
        }
        return left;
    }

    parseUnaryExpression() {
        if (this.match(['not', '-', '#'])) {
            const operator = this.previous().value;
            const operand = this.parseUnaryExpression();
            return new UnaryExpression(operator, operand);
        }
        return this.parsePrimaryExpression();
    }

    parsePrimaryExpression() {
        if (this.match([TokenType.Number])) {
            return new NumberLiteral(this.previous().value);
        }
        if (this.match([TokenType.String])) {
            return new StringLiteral(this.previous().value);
        }
        if (this.match([TokenType.BooleanLiteral])) {
            return new BooleanLiteral(this.previous().value);
        }
        if (this.match([TokenType.Identifier])) {
            const identifier = new Identifier(this.previous().value);
            if (this.match(['('])) {
                return this.parseFunctionCall(identifier);
            }
            return identifier;
        }
        if (this.match(['('])) {
            const expression = this.parseExpression();
            this.consume(')', "Expect ')' after expression.");
            return expression;
        }
        if (this.match(['nil', 'null'])) {
            return new NilLiteral();
        }
        if (this.match(['int', 'num', 'string', 'bool'])) { // Handle type keywords
            return new Identifier(this.previous().value); // Treat type keywords as identifiers
        }
        throw new Error(`Unexpected token: ${this.peek().value}`);
    }

    parseFunctionCall(callee) {
        const args = [];
        if (!this.check(')')) {
            do {
                args.push(this.parseExpression());
            } while (this.match([',']));
        }
        this.consume(')', "Expect ')' after arguments.");
        return new FunctionCall(callee, args);
    }

    match(expectedValues) {
        for (const value of expectedValues) {
            if (this.check(value)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    
    check(expectedValue) {
        if (this.isAtEnd()) return false;
        const token = this.peek();
        return token.value === expectedValue || token.type === expectedValue;
    }

    advance() {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    previous() {
        return this.tokens[this.current - 1];
    }

    peek() {
        return this.tokens[this.current];
    }

    isAtEnd() {
        return this.peek().type === TokenType.EOF;
    }

    consume(type, message) {
        if (this.check(type)) return this.advance();
        throw new Error(message);
    }
}

module.exports = { Parser };