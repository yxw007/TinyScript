import { it, expect } from "vitest";
import Lexer from '../src/lexer/Lexer';
import arrayToGenerator from '../src/common/arrayToGenerator';
import TokenType from '../src/lexer/TokenType';

function assertToken(token, value, type) {
	expect(token.getValue()).toEqual(value)
	expect(token.getType()).toEqual(type)
}

describe("Lexer", () => {

	it("declare stmt", () => {
		const source = "int a=1";
		const lexer = new Lexer();
		const tokens = lexer.analyse(arrayToGenerator([...source]));
		assertToken(tokens[0], "int", TokenType.KEYWORD);
		assertToken(tokens[1], "a", TokenType.VARIABLE);
		assertToken(tokens[2], "=", TokenType.OPERATOR);
		assertToken(tokens[3], "1", TokenType.INTEGER);
	})

	it("expression", () => {
		const source = '(a+b)^100.12==+100-20'
		const lexer = new Lexer()
		const tokens = lexer.analyse(arrayToGenerator([...source]))
		expect(tokens.length).toEqual(11)

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
