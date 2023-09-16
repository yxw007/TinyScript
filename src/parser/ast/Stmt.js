import {
	ASTNode,
	AssignStmt,
	Block,
	DeclareStmt,
	Expr,
	IFStmt,
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
			//TODO: 函数声明语句
		} else if (token.getValue() === "return") {
			//TODO: return 语句
		} else if (token.getValue() === "if") {
			return IFStmt.parse(it);
		} else if (token.getValue() === "{") {
			return Block.parse(it);
		} else {
			return Expr.parse(it);
		}
	}
}
