/**
 * 创建日期: 2023-06-30
 * 文件名称：Lexer.js
 * 创建作者：Potter
 * 开发版本：1.0.0
 * 相关说明：词法分析
 */

import PeekIterator from "../common/PeekIterator";
import { END_CHAR, Keywords } from "../common/common";
import AlphabetHelper from "./AlphabetHelper";
import LexicalException from "./LexicalException";
import Token from "./Token";
import TokenType from "./TokenType";

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
		if (!AlphabetHelper.isNumber(it.peek())) {
			return;
		}

		let state = 0;
		let s = "";

		while (it.hasNext()) {
			let lookahead = it.peek();
			switch (state) {
				case 0: {
					if (lookahead == "0") {
						state = 3;
					} else if (lookahead == "-") {
						state = 1;
					} else if (/[1-9]/.test(lookahead)) {
						state = 2;
					} else {
						throw LexicalException.fromChar(lookahead);
					}
					break;
				}
				case 1: {
					if (lookahead == "0") {
						state = 3;
					} else if (/[1-9]/.test(lookahead)) {
						state = 2;
					} else {
						throw LexicalException.fromChar(lookahead);
					}
					break;
				}
				case 2: {
					if (lookahead == ".") {
						state = 4;
					} else if (AlphabetHelper.isNumber(lookahead)) {
						state = 2;
					} else if (/[e|E]/.test(lookahead)) {
						state = 5;
					} else {
						return new Token(TokenType.INTEGER, s);
					}
					break;
				}
				case 3: {
					if (/[e|E]/.test(lookahead)) {
						state = 5;
					} else if (lookahead == ".") {
						state = 4;
					} else {
						return new Token(TokenType.INTEGER, s);
					}
					break;
				}
				case 4: {
					if (AlphabetHelper.isNumber(lookahead)) {
						state = 6;
					} else {
						throw LexicalException.fromChar(lookahead);
					}
					break;
				}
				case 5: {
					if (AlphabetHelper.isNumber(lookahead)) {
						state = 8;
					} else if (/[+-]/.test(lookahead)) {
						state = 7;
					} else {
						throw LexicalException.fromChar(lookahead);
					}
					break;
				}
				case 6: {
					if (AlphabetHelper.isNumber(lookahead)) {
						state = 6;
					} else if (/[e|E]/.test(lookahead)) {
						state = 5;
					} else {
						return new Token(TokenType.FLOAT, s);
					}
					break;
				}
				case 7: {
					if (AlphabetHelper.isNumber(lookahead)) {
						state = 8;
					} else {
						throw LexicalException.fromChar(lookahead);
					}
					break;
				}
				case 8: {
					if (AlphabetHelper.isNumber(lookahead)) {
						state = 8;
					} else {
						return new Token(
							s.indexOf(".") >= 0 ? TokenType.FLOAT : TokenType.INTEGER,
							s
						);
					}
				}
			}

			s += lookahead;
			it.next();
		}

		throw new LexicalException("Unexpected error");
	}

	static processOperator(it) {
		let state = 0;
		while (it.hasNext()) {
			let lookahead = it.next();

			switch (state) {
				case 0:
					switch (lookahead) {
						case "+":
							state = 1;
							break;
						case "-":
							state = 2;
							break;
						case "*":
							state = 3;
							break;
						case "/":
							state = 4;
							break;
						case ">":
							state = 5;
							break;
						case "<":
							state = 6;
							break;
						case "=":
							state = 7;
							break;
						case "!":
							state = 8;
							break;
						case "&":
							state = 9;
							break;
						case "|":
							state = 10;
							break;
						case "^":
							state = 11;
							break;
						case "%":
							state = 12;
							break;
						case ",":
							return new Token(TokenType.OPERATOR, ",");
						case ";":
							return new Token(TokenType.OPERATOR, ";");
					}
					break;
				case 1: {
					if (lookahead == "+") {
						return new Token(TokenType.OPERATOR, "++");
					} else if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "+=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "+");
					}
				}
				case 2:
					if (lookahead == "-") {
						return new Token(TokenType.OPERATOR, "--");
					} else if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "-=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "-");
					}
				case 3:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "*=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "*");
					}
				case 4:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "/=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "/");
					}
				case 5:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, ">=");
					} else if (lookahead == ">") {
						return new Token(TokenType.OPERATOR, ">>");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, ">");
					}
				case 6:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "<=");
					} else if (lookahead == "<") {
						return new Token(TokenType.OPERATOR, "<<");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "<");
					}
				case 7:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "==");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "=");
					}
				case 8:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "!=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "!");
					}
				case 9:
					if (lookahead == "&") {
						return new Token(TokenType.OPERATOR, "&&");
					} else if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "&=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "&");
					}
				case 10:
					if (lookahead == "|") {
						return new Token(TokenType.OPERATOR, "||");
					} else if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "|=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "|");
					}
				case 11:
					if (lookahead == "^") {
						return new Token(TokenType.OPERATOR, "^^");
					} else if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "^=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "^");
					}
				case 12:
					if (lookahead == "=") {
						return new Token(TokenType.OPERATOR, "%=");
					} else {
						it.putBack();
						return new Token(TokenType.OPERATOR, "%");
					}
			}
		}

		throw new LexicalException("Unexpected error");
	}

	static processSignNumber(it, tokens = []) {
		if (!AlphabetHelper.isSign(it.peek())) {
			return;
		}

		let c = it.next();
		let lookahead = it.peek();
		if (AlphabetHelper.isNumber(lookahead)) {
			let lastToken = tokens.length && tokens[tokens.length - 1];
			//! 说明：+b or =+b  都需要识别成数字+b
			if (lastToken == null || !lastToken.isValue()) {
				const token = Lexer.processNumber(it);
				token.setValue(c + token.getValue());
				return token;
			}
		}
		it.putBack();
	}

	analyse(source) {
		const tokens = [];
		const it = new PeekIterator(source, "\0");

		while (it.hasNext()) {
			let c = it.peek();
			if (c == END_CHAR) {
				break;
			}

			//! 0.识别空字符
			if (AlphabetHelper.isEmpty(c)) {
				it.next();
				continue;
			}

			//! 1.识别注释
			if (Lexer.processComment(it)) {
				continue;
			}

			//! 2.识别括号
			let token = null;
			if ((token = Lexer.processBracket(it))) {
				tokens.push(token);
				continue;
			}

			//! 3.识别letter
			if ((token = Lexer.processVarOrKeyword(it))) {
				tokens.push(token);
				continue;
			}

			//! 4.识别Number
			if ((token = Lexer.processNumber(it))) {
				tokens.push(token);
				continue;
			}

			//! 5.识别, +b or =+b  都需要识别成数字+b
			if ((token = Lexer.processSignNumber(it, tokens))) {
				tokens.push(token);
				continue;
			}

			//! 5.识别Operator
			if ((token = Lexer.processOperator(it))) {
				tokens.push(token);
				continue;
			}

			throw LexicalException.fromChar(c);
		}

		return tokens;
	}
}

export default Lexer;
