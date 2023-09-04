import TokenType from "../../lexer/TokenType";
import ASTNode from "./ASTNode";
import Variable from "./Variable";

class Factor extends ASTNode {
	constructor(token) {
		super();
		this.lexeme = token;
		this.label = token.getValue();
	}
	static parse(it) {
		const token = it.peek();
		const type = token.getType();
		if (type == TokenType.VARIABLE) {
			it.next();
			return new Variable(token);
		} else if (token.isScalar()) {
			it.next();
			return new Scalar(token);
		}
		return null;
	}
}

export default Factor;
