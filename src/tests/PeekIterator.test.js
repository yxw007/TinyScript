const PeekIterator = require("../common/PeekIterator");
const arrayToGenerator = require("../common/arrayToGenerator");
const { assert } = require("chai");

describe("test PeekIterator", () => {
	it("peek", () => {
		const it = new PeekIterator(arrayToGenerator([..."abcdefg"]));
		assert.equal(it.next(), "a");
		assert.equal(it.next(), "b");
		assert.equal(it.peek(), "c");
		assert.equal(it.peek(), "c");
		assert.equal(it.next(), "c");
		assert.equal(it.next(), "d");
	});

	it("look ahead", () => {
		const it = new PeekIterator(arrayToGenerator([..."abcdefg"]));
		assert.equal(it.next(), "a");
		assert.equal(it.peek(), "b");
		assert.equal(it.peek(), "b");
		assert.equal(it.next(), "b");
		assert.equal(it.next(), "c");
		it.putBack();
		it.putBack();
		assert.equal(it.next(), "b");
		assert.equal(it.next(), "c");
		assert.equal(it.next(), "d");
	});
});
