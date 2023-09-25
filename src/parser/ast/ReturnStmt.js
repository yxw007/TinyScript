import { ASTNodeType, Expr, Stmt } from "../index";

export class ReturnStmt extends Stmt {
	constructor() {
		super(ASTNodeType.RETURN_STMT, "return");
	}
	static parse(it) {
		const lexeme = it.nextMatch("return");
		const expr = Expr.parse(it);
		const stmt = new ReturnStmt();
		stmt.setLexeme(lexeme);
		stmt.addChild(expr);
		return stmt;
	}
}
