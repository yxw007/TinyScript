import PeekIterator from "../src/common/PeekIterator"
import arrayToGenerator from "../src/common/arrayToGenerator"
import { expect } from "vitest"

describe("test PeekIterator", () => {
	it("peek", () => {
		const iterator = new PeekIterator(arrayToGenerator([..."abcdefg"]));
		expect(iterator.next()).toBe("a");
		expect(iterator.next()).toBe("b");
		expect(iterator.peek()).toBe("c");
		expect(iterator.peek()).toBe("c");
		expect(iterator.next()).toBe("c");
		expect(iterator.next()).toBe("d");
	});

	it("look ahead", () => {
		const iterator = new PeekIterator(arrayToGenerator([..."abcdefg"]));
		expect(iterator.next()).toBe("a");
		expect(iterator.peek()).toBe("b");
		expect(iterator.peek()).toBe("b");
		expect(iterator.next()).toBe("b");
		expect(iterator.next()).toBe("c");
		iterator.putBack();
		iterator.putBack();
		expect(iterator.next()).toBe("b");
		expect(iterator.next()).toBe("c");
		expect(iterator.next()).toBe("d");
	});

	it("endToken", () => {
		const iterator = new PeekIterator(arrayToGenerator([..."abcdefg"]), "\0");
		for (let i = 0; i < 8; i++) {
			if (i == 7) {
				expect(iterator.next()).toBe("\0");
			} else {
				expect(iterator.next()).toBe("abcdefg"[i]);
			}
		}
	});

	it("putBack", () => {
		const iterator = new PeekIterator(arrayToGenerator([..."ab"]), "\0");
		const c = iterator.next();
		const lookahead = iterator.peek();
		iterator.putBack();
		expect(iterator.peek()).toBe("a");
		expect(iterator.next()).toBe("a");
		expect(iterator.next()).toBe("b");
		iterator.peek();
		expect(iterator.next()).toBe("\0");
	});
});
