import { ASTNodeType } from "./ASTNodeType";
import { Expr, Factor, Stmt } from "../index";
import ParseException from "../utils/ParseException";

export class DeclareStmt extends Stmt {
	constructor() {
		super(ASTNodeType.DECLARE_STMT, "declare");
	}
	static parse(it) {
		const stmt = new DeclareStmt();
		it.nextMatch("var");
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
