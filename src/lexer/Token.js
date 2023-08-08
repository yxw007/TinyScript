const { BASE_TYPES, Keywords } = require("../common/common");
const TokenType = require("./TokenType");

class Token {
	#type = null;
	#value = null;
	constructor(type, value) {
		this.#type = type;
		this.#value = value;
	}

	getType() {
		return this.#type;
	}

	getValue() {
		return this.#value;
	}

	setValue(val) {
		this.#value = val;
	}

	isVariable() {
		return this.#type == TokenType.VARIABLE;
	}

	isValue() {
		return this.isScalar() || this.isVariable();
	}

	isScalar() {
		return (
			this.#type == TokenType.INTEGER ||
			this.#type == TokenType.FLOAT ||
			this.#type == TokenType.STRING ||
			this.#type == TokenType.BOOLEAN
		);
	}

	isType() {
		return BASE_TYPES.includes(this.#type);
	}

	toString() {
		return `type: ${this.#type},value:${this.#value}`;
	}
}

module.exports = Token;
