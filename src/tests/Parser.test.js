const { assert } = require("chai");
const Parser = require('../parser/Parser')

describe("Parser", () => {
	it("parse", () => {
		let ast = Parser.parse("int a=1");
		assert.not.equal(ast, null);
	})
});
