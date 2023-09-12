import { ASTNodeType, Expr } from "../index";

export class CallExpr extends Expr {
	constructor(type, label) {
		super(type, label);
	}
	static create() {
		return new CallExpr(ASTNodeType.CALL_EXPR, "call");
	}
}
