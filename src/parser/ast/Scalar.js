import ASTNodeType from "./ASTNodeType";
import Factor from "./Factor";

class Scalar extends Factor {
	constructor(token) {
		super(ASTNodeType.SCALAR, token.getValue());
	}
}

export default Scalar;
