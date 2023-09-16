import { describe, expect, it } from "vitest";
import Lexer from "../src/lexer/Lexer";
import arrayToGenerator from "../src/common/arrayToGenerator";
import PeekTokenIterator from "../src/parser/utils/PeekTokenIterator";
import { AssignStmt, Block, DeclareStmt } from "../src/parser";
import { ParseUtils } from "../src/parser/utils/ParseUtils";

function createTokenIterator(src) {
	const lexer = new Lexer();
	const tokens = lexer.analyse(arrayToGenerator([...src]));
	const tokenIterator = new PeekTokenIterator(arrayToGenerator(tokens));
	return tokenIterator;
}

describe("Stmt", () => {
	it("declareStmt", () => {
		const it = createTokenIterator("var i = 3 * 2 + 4");
		const stmt = DeclareStmt.parse(it);
		expect(ParseUtils.toPostfixExpr(stmt)).toBe("i 3 2 * 4 + =");
	});

	it("assignStmt", () => {
		const it = createTokenIterator("i = 100 * 2");
		const stmt = AssignStmt.parse(it);
		expect(ParseUtils.toPostfixExpr(stmt)).toBe("i 100 2 * =");
	});

	it("Block", () => {
		const it = createTokenIterator("{ var a = 3 }");
		const block = Block.parse(it);
		expect(block).not.toBe(null);
		expect(block.label).toBe("block");
		expect(block.childSize).toBe(1);
		expect(ParseUtils.toPostfixExpr(block)).toBe("a 3 =");
	});
});
