const Lexer = require('../lexer/Lexer')
const arrayToGenerator = require('../common/arrayToGenerator')
const { assert } = require("chai");
const TokenType = require('../lexer/TokenType');

function assertToken(token, value, type) {
	assert.equal(token.getValue(), value)
	assert.equal(token.getType(), type)
}

describe("Lexer", () => {
	it("expression", () => {
		const source = '(a+b)^100.12==+100-20'
		const lexer = new Lexer()
		const tokens = lexer.analyse(arrayToGenerator([...source]))
		assert.equal(tokens.length, 11)

		assertToken(tokens[0], '(', TokenType.BRACKET)
		assertToken(tokens[1], "a", TokenType.VARIABLE);
		assertToken(tokens[2], "+", TokenType.OPERATOR);
		assertToken(tokens[3], "b", TokenType.VARIABLE);
		assertToken(tokens[4], ")", TokenType.BRACKET);
		assertToken(tokens[5], "^", TokenType.OPERATOR);
		assertToken(tokens[6], "100.12", TokenType.FLOAT);
		assertToken(tokens[7], "==", TokenType.OPERATOR);
		assertToken(tokens[8], "+100", TokenType.INTEGER);
		assertToken(tokens[9], "-", TokenType.OPERATOR);
		assertToken(tokens[10], "20", TokenType.INTEGER);
	});
});
