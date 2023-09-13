import { expect } from "vitest";
import { Parser } from "../src/parser/Parser";
import { ParseUtils } from "../src/parser/utils/ParseUtils";

describe("Parser", () => {
	it("parse 1", () => {
		let program = Parser.parse("1+2");
		expect(program.childSize).toBe(1);

		let expr = program.getChild(0);

		expect(expr.childSize).toBe(2);
		expect(expr.label).toBe("+");
		expect(expr.getChild(0).lexeme.getValue()).toBe("1");
		expect(expr.getChild(1).lexeme.getValue()).toBe("2");
	});

	it("parse 2", () => {
		let program = Parser.parse("1*2+3");
		expect(program.childSize).toBe(1);

		let expr = program.getChild(0);

		expect(ParseUtils.toPostfixExpr(expr)).toBe("1 2 * 3 +");
	});
});
