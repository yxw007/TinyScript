const { BASE_TYPES, Keywords } = require("../common/common");
const TokenType = require("./TokenType");

class Token {
	constructor(type, value) {
		this._type = type;
		this._value = value;
	}

	get type() {
		return this._type;
	}

	get value() {
		return this._value;
	}

	isVariable() {
		return this._type == TokenType.VARIABLE;
	}

	isValue() {
		return this.isScalar() || this.isVariable();
	}

	isScalar() {
		return (
			this._type == TokenType.INTEGER ||
			this._type == TokenType.FLOAT ||
			this._type == TokenType.STRING ||
			this._type == TokenType.BOOLEAN
		);
	}

	isType() {
		return BASE_TYPES.includes(this._type);
	}

	toString() {
		return `type: ${this._type},value:${this._value}`;
	}
}

module.exports = Token;
