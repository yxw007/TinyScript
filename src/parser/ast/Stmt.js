import {
	ASTNode,
	AssignStmt,
	Block,
	DeclareStmt,
	Expr,
	FunctionDeclareStmt,
	IFStmt,
	ReturnStmt,
} from "../index";

export class Stmt extends ASTNode {
	constructor(type, label) {
		super(type, label);
	}
	static parse(it) {
		if (!it.hasNext()) {
			return null;
		}
		const token = it.next();
		const lookahead = it.peek();
		it.putBack();

		if (token.isVariable() && lookahead.getValue() === "=") {
			return AssignStmt.parse(it);
		} else if (token.getValue() === "var") {
			return DeclareStmt.parse(it);
		} else if (token.getValue() === "func") {
			return FunctionDeclareStmt.parse(it);
		} else if (token.getValue() === "return") {
			return ReturnStmt.parse(it);
		} else if (token.getValue() === "if") {
			return IFStmt.parse(it);
		} else if (token.getValue() === "{") {
			return Block.parse(it);
		} else {
			return Expr.parse(it);
		}
	}
}
