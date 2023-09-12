import { expect } from "vitest";
import { Parser } from "../src/parser/Parser";

describe("Parser", () => {
	it("parse", () => {
		let expr = Parser.parse("1*2+3");
		expect(expr).not.toBe(null);
		expect(expr.child(0)).toBe("+");
		expect(expr.child(0)).toBe(1);
	});
});
