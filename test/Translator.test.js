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
});
