import { ASTNodeType, Expr } from "../index";

export class CallExpr extends Expr {
	constructor(type, label) {
		super(type, label);
	}
	static create() {
		return new CallExpr(ASTNodeType.CALL_EXPR, "call");
	}
	static parse(factor, it) {
		const expr = CallExpr.create();
		expr.addChild(factor);

		it.nextMatch("(");
		let p = null;
		while ((p = Expr.parse(it)) != null) {
			expr.addChild(p);
			if (!it.peek().getValue() === ")") {
				it.nextMatch(",");
			}
		}
		it.nextMatch(")");
		return expr;
	}
}
