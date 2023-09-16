import { ASTNodeType, Factor } from "../index";

export class Variable extends Factor {
	constructor(type, label) {
		super(type, label);
		this.typeLexeme = null;
	}
	static create(token) {
		let instance = new Variable(ASTNodeType.VARIABLE, token.getValue());
		instance.setLexeme(token);
		return instance;
	}
	setTypeLexeme(lexeme) {
		this.typeLexeme = lexeme;
	}
	getTypeLexeme() {
		return this.typeLexeme;
	}
}
