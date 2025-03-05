const analyze = (ast) => {

    if (ast.type === "BinaryExpression") {

        analyze(ast.left);
        analyze(ast.right);

    }
};