import { ASTNodeType, Factor } from "../index";

export class Variable extends Factor {
	constructor(type, label) {
		super(type, label);
		this.typeLexeme = null;
	}
	static create(token) {
		return new Variable(ASTNodeType.VARIABLE, token.getValue());
	}
	setTypeLexeme(lexeme) {
		this.typeLexeme = lexeme;
	}
	getTypeLexeme() {
		return this.typeLexeme;
	}
}
