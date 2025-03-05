const runtime = (code) => {
    return eval(code);
};

console.log(runtime("(1 + 2)"));