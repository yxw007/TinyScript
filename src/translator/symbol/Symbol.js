import { SymbolType } from "../index";

export class Symbol {
	#type = null;
	#label = null;
	/* 偏移量 */
	#offset = 0;
	/* 作用域：层级 */
	#layerOffset = 0;
	#lexeme = null;
	#parent = null;
	constructor(type) {
		this.#type = type;
		this.#label = null;
		this.#offset = 0;
		this.#layerOffset = 0;
		this.#lexeme = null;
		this.#parent = null;
	}

	static createAddressSymbol(lexeme, offset) {
		const symbol = new Symbol(SymbolType.ADDRESS_SYMBOL);
		symbol.lexeme = lexeme;
		symbol.offset = offset;
		return symbol;
	}

	static createImmediateSymbol(lexeme) {
		const symbol = new Symbol(SymbolType.IMMEDIATE_SYMBOL);
		symbol.lexeme = lexeme;
		return symbol;
	}

	static createLabelSymbol(label, lexeme) {
		const symbol = new Symbol(SymbolType.LABEL_SYMBOL);
		symbol.label = label;
		return symbol;
	}

	static clone() {
		const symbol = new Symbol(this.type);
		symbol.label = this.label;
		symbol.offset = this.offset;
		symbol.layerOffset = this.layerOffset;
		symbol.lexeme = this.lexeme;
		symbol.parent = this.parent;
		return symbol;
	}

	get type() {
		return this.#type;
	}

	set type(val) {
		this.#label = val;
	}

	get label() {
		return this.#label;
	}

	set label(val) {
		this.#label = val;
	}

	get offset() {
		return this.#offset;
	}

	set offset(val) {
		this.#offset = val;
	}

	get layerOffset() {
		return this.#layerOffset;
	}

	set layerOffset(val) {
		return (this.#layerOffset = val);
	}

	get lexeme() {
		return this.#lexeme;
	}

	set lexeme(val) {
		return (this.#lexeme = val);
	}

	get parent() {
		return this.#parent;
	}

	set parent(val) {
		this.#parent = val;
	}

	toString() {
		return this.type === SymbolType.LABEL_SYMBOL
			? this.label
			: this.lexeme.getValue();
	}
}
