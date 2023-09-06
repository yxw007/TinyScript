import ASTNode from "./ASTNode";
import Expr from "./Expr";

class Stmt extends ASTNode {
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
			//TODO: 赋值语句
		} else if (token.getValue() === "var") {
			//TODO: 声明语句
		} else if (token.getValue() === "func") {
			//TODO: 函数声明语句
		} else if (token.getValue() === "return") {
			//TODO: return 语句
		} else if (token.getValue() === "if") {
			//TODO: if 语句
		} else if (token.getValue() === "{") {
			//TODO: block 语句
		} else {
			return Expr.parse(it);
		}
	}
}

export default Stmt;
