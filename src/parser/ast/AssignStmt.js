import ParseException from "../utils/ParseException";
import { ASTNodeType, Expr, Stmt, Factor } from "../index";

export class AssignStmt extends Stmt {
	constructor() {
		super(ASTNodeType.ASSIGN_STMT, "assign");
	}
	static parse(it) {
		const stmt = new AssignStmt();
		const token = it.peek();
		const factor = Factor.parse(it);
		if (factor == null) {
			throw ParseException.fromToken(token);
		}
		stmt.addChild(factor);
		const lexeme = it.nextMatch("=");
		const expr = Expr.parse(it);
		stmt.addChild(expr);
		stmt.setLexeme(lexeme);
		return stmt;
	}
}
