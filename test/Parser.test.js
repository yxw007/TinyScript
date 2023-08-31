import { expect } from "chai"
import Parser from '../src/parser/Parser'

describe("Parser", () => {
	it("parse", () => {
		let ast = Parser.parse("int a=1");
		expect(ast).to.not.be.null;
	})
});
