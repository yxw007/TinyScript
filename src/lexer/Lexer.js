/**
 * 创建日期: 2023-06-30
 * 文件名称：Lexer.js
 * 创建作者：Potter
 * 开发版本：1.0.0
 * 相关说明：词法分析
 */

const PeekIterator = require("../common/PeekIterator");
const { END_CHAR, Keywords } = require("../common/common");
const AlphabetHelper = require("./AlphabetHelper");
const { isEmpty } = require("./AlphabetHelper");
const LexicalException = require("./LexicalException");
const Token = require("./Token");
const TokenType = require("./TokenType");

class Lexer {
	/**
	 * 处理注释
	 * case 1: //
	 * case 2: /** *\/
	 * @param {*} it
	 */
	static processComment(it) {
		if (it.peek() !== "/") {
			return false;
		}

		it.next();
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

	/**
	 * 处理变量or关键词
	 * @param {*} it 
	 */
	static processVarOrKeyword(it) {
		if (!AlphabetHelper.isLetter(it.peek())) {
			return;
		}

		let s = "";
		while (it.hasNext()) {
			let c = it.peek();
			if (AlphabetHelper.isLetter(c)) {
				s += c;
				it.next();
			} else {
				break;
			}
		}

		if (Keywords.has(s)) {
			return new Token(TokenType.KEYWORD, s);
		}

		if (/^(false|true)$/.test(s)) {
			return new Token(TokenType.BOOLEAN, s);
		}

		return new Token(TokenType.VARIABLE, s);
	}

	static processBracket(it) {
		if (!AlphabetHelper.isBracket(it.peek())) {
			return;
		}
		return new Token(TokenType.BRACKET, it.next());
	}

	static processNumber(it) {
		//TODO:
	}

	static processOperator(it) {
		//TODO:
	}

	static analyse(source) {
		const tokens = [];
		const it = new PeekIterator(source);

		while (it.hasNext()) {
			let c = it.peek();
			if (c == END_CHAR) {
				break;
			}

			//! 0.识别空字符
			if (isEmpty(c)) {
				continue;
			}

			//! 1.识别注释
			if (Lexer.processComment(it)) {
				continue;
			}

			//! 2.识别括号
			let token = null;
			if (token = Lexer.processBracket(it)) {
				tokens.push(token);
				continue;
			}

			//! 3.识别letter
			if (token = Lexer.processVarOrKeyword(it)) {
				tokens.push(token);
				continue;
			}

			//! 4.识别Number
			if (token == Lexer.processNumber(it)) {
				tokens.push(token);
				continue;
			}

			//! 5.识别Operator
			if (token == Lexer.processOperator(it)) {
				tokens.push(token);
				continue;
			}

			throw LexicalException.fromChar(c);
		}

		return tokens;
	}
}
