import { Factor, ASTNodeType } from "../index";

export class Scalar extends Factor {
	constructor(type, label) {
		super(type, label);
	}
	static create(token) {
		let instance = new Scalar(ASTNodeType.SCALAR, token.getValue());
		instance.lexeme = token;
		return instance;
	}
}
