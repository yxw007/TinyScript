import PeekIterator from "../src/common/PeekIterator"
import arrayToGenerator from "../src/common/arrayToGenerator"
import { assert } from "chai"

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

	it("endToken", () => {
		const it = new PeekIterator(arrayToGenerator([..."abcdefg"]), "\0");
		for (let i = 0; i < 8; i++) {
			if (i == 7) {
				assert.equal(it.next(), "\0");
			} else {
				assert.equal(it.next(), "abcdefg"[i]);
			}
		}
	});

	it("putBack", () => {
		const it = new PeekIterator(arrayToGenerator([..."ab"]), "\0");
		const c = it.next();
		const lookahead = it.peek();
		it.putBack();
		assert.equal(it.peek(), "a");
		assert.equal(it.next(), "a");
		assert.equal(it.next(), "b");
		it.peek();
		assert.equal(it.next(), "\0");
	});
});
