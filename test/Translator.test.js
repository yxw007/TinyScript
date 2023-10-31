import { describe, expect, it } from "vitest";
import { Parser } from "../src/parser/Parser";
import { Translator } from "../src/translator";

describe("Translator", () => {
	it("declareStmt", () => {
		const source = `var a = 1`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		expect(program.toString()).toBe("a = 1");
	});

	it("assignStmt", () => {
		const source = `a = 2`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		expect(program.toString()).toBe(`a = 2`);
	});

	it("expression", () => {
		const source = `a = 3*4`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(`p0 = 3 * 4\na = p0`);
	});

	it("block", () => {
		const source = `
		var a = 1
		{
			var b = a + 1
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(`a = 1\nSP -1\np0 = a + 1\nb = p0\nSP 1`);
	});

	it("if", () => {
		const source = `
		if(a){
			b=1
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe("IF a ELSE L0\nSP -1\nb = 1\nSP 1\nL0:");
	});

	it("if-else", () => {
		const source = `
		if(a==1){
			b=1
		}else{
			b=100
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(
			"p0 = a == 1\n" +
				"IF p0 ELSE L0\n" +
				"SP -2\n" +
				"b = 1\n" +
				"SP 2\n" +
				"GOTO L1\n" +
				"L0:\n" +
				"SP -2\n" +
				"b = 100\n" +
				"SP 2\n" +
				"L1:"
		);
	});

	it("if-else-if", () => {
		const source = `
		if(a==1){
			b=1
		}else if(a==2){
			b=100
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(
			"p0 = a == 1\n" +
				"IF p0 ELSE L0\n" +
				"SP -2\n" +
				"b = 1\n" +
				"SP 2\n" +
				"GOTO L2\n" +
				"L0:\n" +
				"p1 = a == 2\n" +
				"IF p1 ELSE L1\n" +
				"SP -3\n" +
				"b = 100\n" +
				"SP 3\n" +
				"L1:\n" +
				"L2:"
		);
	});

	it("if-else-if-else", () => {
		const source = `
		if(a==1){
			b=1
		}else if(a==2){
			b=100
		}else{
			b=1000
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(
			"p0 = a == 1\n" +
				"IF p0 ELSE L0\n" +
				"SP -2\n" +
				"b = 1\n" +
				"SP 2\n" +
				"GOTO L3\n" +
				"L0:\n" +
				"p1 = a == 2\n" +
				"IF p1 ELSE L1\n" +
				"SP -3\n" +
				"b = 100\n" +
				"SP 3\n" +
				"GOTO L2\n" +
				"L1:\n" +
				"SP -3\n" +
				"b = 1000\n" +
				"SP 3\n" +
				"L2:\n" +
				"L3:"
		);
	});

	it("declare function", () => {
		const source = `
		func add(int a,int b) int {
			return a + b
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe("L0:\n" + "p0 = a + b\n" + "RETURN p0");
	});

	it("declare function complex", () => {
		const source = `
		func fact(int n)  int {
			if(n == 0) {
				return 1
			}
			return fact(n-1) * n
		}
		`;
		const ast = Parser.parse(source);
		const translator = new Translator();
		const program = translator.translate(ast);
		const target = program.toString();
		expect(target).toBe(
			"L0:\n" +
				"p0 = n == 0\n" +
				"IF p0 ELSE L1\n" +
				"SP -2\n" +
				"RETURN 1\n" +
				"SP 2\n" +
				"L1:\n" +
				"p3 = n - 1\n" +
				"PARAM p3 0\n" +
				"SP -5\n" +
				"CALL L0\n" +
				"SP 5\n" +
				"p4 = p1 * n\n" +
				"RETURN p4"
		);
	});
});
