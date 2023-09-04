import ASTNodeType from "./ASTNodeType";
import Factor from "./Factor";

class Variable extends Factor {
	constructor(token) {
		super(token);
		this.type = ASTNodeType.VARIABLE;
		this.typeLexeme = null;
	}
	setTypeLexeme(lexeme) {
		this.typeLexeme = lexeme;
	}
	getTypeLexeme() {
		return this.typeLexeme;
	}
}

export default Variable;
