import ASTNodeType from "./ASTNodeType";
import Expr from "./Expr";

class CallExpr extends Expr {
	constructor() {
		super(ASTNodeType.CALL_EXPR, "call");
	}
}
