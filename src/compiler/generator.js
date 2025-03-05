const generator = (ast) => {

    if (ast.type === "BinaryExpression") {
        return `(${generate(ast.left)} ${ast.operator} ${generate(ast.right)})`;
    }
    if (ast.type === "Literal") {
        return ast.value;
    }
};

console.log(generate(ast));