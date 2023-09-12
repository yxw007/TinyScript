import TokenType from "../../lexer/TokenType";
import { ASTNode, Variable, Scalar } from "../index";

export class Factor extends ASTNode {
	constructor(type, label) {
		super(type, label);
	}
	static create(token) {
		let instance = new Factor(null, token.getValue());
		instance.lexeme = token;
		return instance;
	}
	static parse(it) {
		const token = it.peek();
		const type = token.getType();
		if (type == TokenType.VARIABLE) {
			it.next();
			return Variable.create(token);
		} else if (token.isScalar()) {
			it.next();
			return Scalar.create(token);
		}
		return null;
	}
}
