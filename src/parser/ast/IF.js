import ParseException from "../utils/ParseException";
import { ASTNodeType } from "./ASTNodeType";
import { Stmt, Expr, Block } from "../index";

export class IFStmt extends Stmt {
	constructor() {
		super(ASTNodeType.IF_STMT, "if");
	}

	getExpr() {
		return this.getChild(0);
	}

	getBlock() {
		return this.getChild(1);
	}

	getElseBlock() {
		const block = this.getChild(2);
		if (block instanceof Block) {
			return block;
		}
		return null;
	}

	getElseIfStmt() {
		const ifStmt = this.getChild(2);
		if (ifStmt instanceof IFStmt) {
			return ifStmt;
		}
		return null;
	}

	//IFStmt -> if(Expr) {Block} Tail
	static parse(it) {
		const token = it.nextMatch("if");
		if (token == null) {
			throw ParseException.fromToken(token);
		}
		const ifStmt = new IFStmt();
		ifStmt.setLexeme(token);
		it.nextMatch("(");
		const expr = Expr.parse(it);
		ifStmt.addChild(expr);
		it.nextMatch(")");
		const block = Block.parse(it);
		ifStmt.addChild(block);
		const tail = IFStmt.parseTail(it);
		if (tail != null) {
			ifStmt.addChild(tail);
		}
		return ifStmt;
	}

	//Tail -> else IFStmt | else {Block} | ε
	static parseTail(it) {
		if (!it.hasNext() || it.peek().getValue() !== "else") {
			return null;
		}

		it.nextMatch("else");
		const lookahead = it.peek();
		if (lookahead.getValue() == "{") {
			return Block.parse(it);
		} else if (lookahead.getValue() == "if") {
			return IFStmt.parse(it);
		} else {
			return null;
		}
	}
}
