/**
 * 创建日期: 2023-06-30
 * 文件名称：Lexer.js
 * 创建作者：Potter
 * 开发版本：1.0.0
 * 相关说明：词法分析
 */

const PeekIterator = require("../common/PeekIterator");
const { END_CHAR } = require("../common/common");
const { isEmpty } = require("./AlphabetHelper");

class Lexer {
	/**
	 * case 1: //
	 * case 2: /** *\/
	 * @param {*} it
	 */
	processComment(it) {
		let c = it.peek();
		if (c == "/") {
			while (c !== "\n") {
				c = it.next();
			}
		} else if (c == "*") {
			it.next();
			let valid = false;
			while (it.hasNext()) {
				c = it.next();
				if (c == "*" && it.peek() == "/") {
					valid = true;
					it.next();
					break;
				}
			}
			if (!valid) {
				throw Error("process comment error");
			}
		}
		return true;
	}

	static analyse(source) {
		const tokens = [];
		const it = new PeekIterator(source);

		while (it.hasNext()) {
			let c = it.next();
			if (c == END_CHAR) {
				break;
			}

			//! 0.识别空字符
			if (isEmpty(c)) {
				continue;
			}

			//! 1.识别注释
			if (c == "/" && processComment(it)) {
				continue;
			}

			//! 2.识别括号

			//! 3.识别letter

			//! 4.识别Number

			//! 5.识别Operator
		}

		return tokens;
	}
}
