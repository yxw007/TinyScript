import ASTNodeType from "./ASTNodeType";
import Factor from "./Factor";

class Scalar extends Factor {
	constructor(token) {
		super(token);
		this.type = ASTNodeType.SCALAR;
	}
}

export default Scalar;
