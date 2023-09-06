import ASTNodeType from "./ASTNodeType";
import Factor from "./Factor";

class Variable extends Factor {
	constructor(token, label = null) {
		super(ASTNodeType.VARIABLE, token?.getValue());
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
