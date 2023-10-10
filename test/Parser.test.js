import { describe, expect, it } from "vitest";
import { Parser } from "../src/parser/Parser";
import {
	ASTNodeType,
	AssignStmt,
	Block,
	DeclareStmt,
	FunctionDeclareStmt,
	IFStmt,
} from "../src/parser";
import { ParseUtils } from "../src/parser/utils/ParseUtils";

import Lexer from "../src/lexer/Lexer";
import arrayToGenerator from "../src/common/arrayToGenerator";
import PeekTokenIterator from "../src/parser/utils/PeekTokenIterator";

function createTokenIterator(src) {
	const lexer = new Lexer();
	const tokens = lexer.analyse(arrayToGenerator([...src]));
	const tokenIterator = new PeekTokenIterator(arrayToGenerator(tokens));
	return tokenIterator;
}

describe("Parser", () => {
	it("parse expr base", () => {
		let program = Parser.parse("1+2");
		expect(program.childSize).toBe(1);

		let expr = program.getChild(0);

		expect(expr.childSize).toBe(2);
		expect(expr.label).toBe("+");
		expect(expr.getChild(0).lexeme.getValue()).toBe("1");
		expect(expr.getChild(1).lexeme.getValue()).toBe("2");
	});

	it("parse expr mix", () => {
		let program = Parser.parse("1*2+3");
		expect(program.childSize).toBe(1);

		let expr = program.getChild(0);

		expect(ParseUtils.toPostfixExpr(expr)).toBe("1 2 * 3 +");
	});
});

describe("Parser Stmt", () => {
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

	it("Block 2", () => {
		const it = createTokenIterator(`
		{ 
			var a = 1
			var b = 2
		}`);
		const block = Block.parse(it);
		expect(block).not.toBe(null);
		expect(block.label).toBe("block");
		expect(block.childSize).toBe(2);
		expect(ParseUtils.toPostfixExpr(block.getChild(0))).toBe("a 1 =");
		expect(ParseUtils.toPostfixExpr(block.getChild(1))).toBe("b 2 =");
	});

	it("if", () => {
		const it = createTokenIterator("if(a){var b=3}");
		const stmt = IFStmt.parse(it);
		const expr = stmt.getChild(0);
		const block = stmt.getChild(1);
		const tail = stmt.getChild(2);

		expect(expr.getLexeme().getValue()).toBe("a");
		expect(ParseUtils.toPostfixExpr(block)).toBe("b 3 =");
		expect(tail).toBe(null);
	});

	it("if-else", () => {
		const it = createTokenIterator(`
			if(a==1){
				b = 1
			}else{
				b = 2
			}
		`);

		const stmt = IFStmt.parse(it);
		const expr = stmt.getChild(0);
		const block = stmt.getChild(1);
		const tail = stmt.getChild(2);

		expect(expr.getLexeme().getValue()).toBe("==");
		expect(ParseUtils.toPostfixExpr(expr)).toBe("a 1 ==");

		expect(ParseUtils.toPostfixExpr(block)).toBe("b 1 =");
		expect(ParseUtils.toPostfixExpr(tail)).toBe("b 2 =");
	});

	it("if-else if", () => {
		const it = createTokenIterator(`
			if(a==1){
				b = 1
			}else if(a==2){
				b = 2
			}else{
				a = 3
			}
		`);

		const stmt = IFStmt.parse(it);
		const expr = stmt.getChild(0);
		const block = stmt.getChild(1);

		const tail = stmt.getChild(2);
		const expr2 = tail.getChild(0);
		const block2 = tail.getChild(1);
		const tail2 = tail.getChild(2);

		expect(expr.getLexeme().getValue()).toBe("==");
		expect(ParseUtils.toPostfixExpr(expr)).toBe("a 1 ==");
		expect(ParseUtils.toPostfixExpr(block)).toBe("b 1 =");

		expect(tail.getLexeme().getValue()).toBe("if");
		expect(ParseUtils.toPostfixExpr(expr2)).toBe("a 2 ==");
		expect(ParseUtils.toPostfixExpr(tail2)).toBe("a 3 =");
	});

	it("function", () => {
		const it = createTokenIterator(`
			func add(int a, int b) int {
  			return a + b
			} 
		`);

		const stmt = FunctionDeclareStmt.parse(it);

		expect(stmt.getFuncVariable().label).toBe("add");
		expect(stmt.getFuncType()).toBe("int");

		const args = stmt.getArgs();
		expect(args.getChild(0).getLexeme().getValue()).toBe("a");
		expect(args.getChild(0).type).toBe(ASTNodeType.VARIABLE);

		expect(args.getChild(1).getLexeme().getValue()).toBe("b");
		expect(args.getChild(1).type).toBe(ASTNodeType.VARIABLE);

		const block = stmt.getBlock();
		expect(block.getChild(0).label).toBe("return");
		expect(ParseUtils.toPostfixExpr(block.getChild(0).getChild(0))).toBe(
			"a b +"
		);
	});
});
