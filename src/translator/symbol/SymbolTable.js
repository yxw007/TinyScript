import { Symbol } from "../index";
import { Token, TokenType } from "../../lexer";

export class SymbolTable {
	#parent = null;
	#children = [];
	#symbols = [];
	/* 临时变量索引 */
	#tempIdx = 0;
	/* 内存符号偏移量 */
	#offsetIdx = 0;
	/* 层级 */
	#level = 0;
	constructor() {
		this.#parent = null;
		this.#children = [];
		this.#symbols = [];
		this.#tempIdx = 0;
		this.#offsetIdx = 0;
		this.#level = 0;
	}

	addSymbol(symbol) {
		symbol.setParent(this);
		this.#symbols.push(symbol);
	}

	cloneFromSymbolTree(lexeme, layerOffset) {
		let symbol = this.#children.find(
			(it) => it.lexeme.getValue() == lexeme.getValue()
		);

		if (symbol) {
			symbol = symbol.clone();
			symbol.setLayoutOffset(layerOffset);
			return symbol;
		}

		if (this.#parent != null) {
			return this.#parent.cloneFromSymbolTree(lexeme, layerOffset + 1);
		}

		return null;
	}

	exist(lexeme) {
		let symbol = this.#children.find(
			(it) => it.lexeme.getValue() == lexeme.getValue()
		);
		if (symbol) {
			return true;
		}
		if (this.#parent) {
			return this.#parent.exist(lexeme);
		}
		return false;
	}

	/* 创建变量or常数symbol*/
	createSymbolByLexeme(lexeme) {
		let symbol = null;
		if (lexeme.isScalar()) {
			symbol = Symbol.createImmediateSymbol(lexeme);
		} else {
			symbol = this.cloneFromSymbolTree(lexeme, 0);
			if (symbol == null) {
				symbol = Symbol.createAddressSymbol(lexeme, this.#offsetIdx++);
			}
		}
		this.addSymbol(symbol);
		return symbol;
	}

	/* 创建临时变量symbol */
	createVariable() {
		const lexeme = new Token(TokenType.VARIABLE, `p${this.#tempIdx++}`);
		const symbol = Symbol.createAddressSymbol(lexeme, this.#offsetIdx++);
		this.addSymbol(symbol);
		return symbol;
	}

	createLabel(label, lexeme) {
		const labelSymbol = Symbol.createLabelSymbol(label, lexeme);
		this.addSymbol(labelSymbol);
	}

	addChild(child) {
		child.parent = this;
		child.level = this.#level + 1;
		this.#children.push(child);
	}

	localSize() {
		return this.#offsetIdx;
	}

	getSymbols() {
		return this.#symbols;
	}

	getChildren() {
		return this.#children;
	}
}
