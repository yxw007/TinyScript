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
	constructor(it, endToken = END_CHAR) {
		this._it = it;
		this._endToken = endToken;
		//! 放回的元素栈
		this._stackPutBack = new linkedlist();
		//! 缓存队列
		this._queueCache = new linkedlist();
		this._cacheSize = 10;
	}
	peek() {
		if (this._stackPutBack.length > 0) {
			return this._stackPutBack.tail;
		}

		let e = this.next();
		this.putBack();
		return e;
	}
	putBack() {
		if (this._queueCache.length > 0) {
			this._stackPutBack.push(this._queueCache.pop());
		}
	}
	hasNext() {
		return this._stackPutBack.length > 0 || this._it.hasNext();
	}
	next() {
		let e = null;
		if (this._stackPutBack.length > 0) {
			e = this._stackPutBack.pop();
		} else {
			e = this._it.next().value;
			if (e == null) {
				e = this._endToken;
				this._endToken = null;
			}
		}

		if (e) {
			while (this._queueCache.length > this._cacheSize - 1) {
				this._queueCache.shift();
			}
			//!说明：从stackPutBack pop出来的元素，也需要push进缓存
			this._queueCache.push(e);
		}

		return e;
	}
}

module.exports = PeekIterator;
