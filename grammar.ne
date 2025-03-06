# Program
Program -> Statements

# Statements
Statements -> Statement Statements
            |

Statement -> VariableDeclaration
           | FunctionDeclaration
           | IfStatement
           | WhileStatement
           | ReturnStatement
           | ExpressionStatement
           | PrintStatement
           | BreakStatement
           | RepeatStatement
           | Comment

# Variable declaration
VariableDeclaration -> "local" Identifier "=" Expression ";" | "string" Identifier "=" StringLiteral ";" |  "boolean" Identifier "=" BooleanLiteral ";" | "bool" Identifier "=" BooleanLiteral ";" | "int" Identifier "=" Number ";" | "num" Identifier "=" Number ";"

# Function declaration
FunctionDeclaration -> "function" Identifier "(" Parameters? ")" Block

# Parameters
Parameters -> Identifier ("," Identifier)*

# Blocks
Block -> "{" Statements "}"

# If statement
IfStatement -> "if" Expression Block ("elseif" Expression Block)* ("else" Block)?

# While statement
WhileStatement -> "while" Expression Block

# Repeat statement
RepeatStatement -> "repeat" Block "until" Expression

# Return statement
ReturnStatement -> "return" Expression? ";"

# Print statement
PrintStatement -> "print" Expression ";"

# Break statement
BreakStatement -> "break" ";"

# Expression statement
ExpressionStatement -> Expression ";"

# Comments
Comment -> SingleLineComment | MultiLineComment

SingleLineComment -> "--" _CommentChars "\n"
_CommentChars -> [^\n]:*

MultiLineComment -> "-[[" _MultiLineChars "]]-"
_MultiLineChars -> _MultiLineChar*
_MultiLineChar -> [^]] | "]" [^]]

# Expressions
Expression -> LogicalOrExpression

LogicalOrExpression -> LogicalAndExpression ("or" LogicalAndExpression)*

LogicalAndExpression -> EqualityExpression ("and" EqualityExpression)*

EqualityExpression -> RelationalExpression (("==" | "!=") RelationalExpression)*

RelationalExpression -> AdditiveExpression (("<" | ">" | "<=" | ">=") AdditiveExpression)*

AdditiveExpression -> MultiplicativeExpression (("+" | "-" | "..") MultiplicativeExpression)*

MultiplicativeExpression -> ExponentialExpression (("*" | "/" | "//" | "%") ExponentialExpression)*

ExponentialExpression -> UnaryExpression ("^" UnaryExpression)*

UnaryExpression -> ("not" | "-" | "#") UnaryExpression
                  | PrimaryExpression

PrimaryExpression -> Number
                   | StringLiteral
                   | BooleanLiteral
                   | Identifier
                   | "(" Expression ")"
                   | FunctionCall
                   | NilLiteral

# Function call
FunctionCall -> Identifier "(" Arguments? ")"

Arguments -> Expression ("," Expression)*

# Tokens
Number -> [0-9]+ ("." [0-9]+)?
StringLiteral -> "\"" [^\"]* "\""
BooleanLiteral -> "true" | "false"
NilLiteral -> "nil" | "null"
Identifier -> _Letter _IdentifierChars*
_Letter -> [a-zA-Z_]
_IdentifierChars -> [a-zA-Z0-9_]