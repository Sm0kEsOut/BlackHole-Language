const {expect} = require("chai");
const {lexer, parser, generate} = require("./compiler.js");

describe("Compiler", () => {
    it("should tokenize input correctly", () => {
        expect(lexer("1 + 2")).to.deep.equal(["1", "+", "2"]);
    });

    it("should generate correct code", () => {
        const ast = parser("1 + 2");
        expect(generate(ast)).to.equal("(1 + 2)");
    });
});