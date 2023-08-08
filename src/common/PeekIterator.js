/**
 * 创建日期: 2023-06-28
 * 文件名称：PeekIterator.js
 * 创建作者：Potter
 * 开发版本：1.0.0
 * 相关说明：迭代器
 *
 * 读取迭代器工具，方便词法分析、语法分析等
 */

const linkedlist = require("linkedlist");
const { END_CHAR } = require("./common");
class PeekIterator {
	#it = null;
	#endToken = null;
	#stackPutBack = null;
	#queueCache = null;
	#cacheSize = 10;
	constructor(it, endToken = END_CHAR) {
		this.#it = it;
		this.#endToken = endToken;
		//! 放回的元素栈
		this.#stackPutBack = new linkedlist();
		//! 缓存队列
		this.#queueCache = new linkedlist();
	}
	peek() {
		if (this.#stackPutBack.length > 0) {
			return this.#stackPutBack.tail;
		}

		let e = this.next();
		this.putBack();
		return e;
	}
	putBack() {
		if (this.#queueCache.length > 0) {
			this.#stackPutBack.push(this.#queueCache.pop());
		}
	}
	hasNext() {
		return this.#endToken || !!this.peek();
	}
	next() {
		let e = null;
		if (this.#stackPutBack.length > 0) {
			e = this.#stackPutBack.pop();
		} else {
			e = this.#it.next().value;
			if (e == null) {
				e = this.#endToken;
				this.#endToken = null;
			}
		}

		if (e) {
			while (this.#queueCache.length > this.#cacheSize - 1) {
				this.#queueCache.shift();
			}
			//!说明：从stackPutBack pop出来的元素，也需要push进缓存
			this.#queueCache.push(e);
		}

		return e;
	}
}

module.exports = PeekIterator;
