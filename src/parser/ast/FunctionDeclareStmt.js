import TokenType from "../../lexer/TokenType";
import { ASTNodeType, Block, Factor, FunctionArgs, Stmt } from "../index";
import ParseException from "../utils/ParseException";

export class FunctionDeclareStmt extends Stmt {
	constructor() {
		super(ASTNodeType.FUNCTION_DECLARE_STMT, "func");
	}

	/* 方法形参 */
	getArgs() {
		return this.getChild(1);
	}

	/* 方法名变量 */
	getFuncVariable() {
		return this.getChild(0);
	}

	/* 方法返回值类型 ? */
	getFuncType() {
		return this.getFuncVariable().getTypeLexeme().getValue();
	}

	/* 方法体 */
	getBlock() {
		return this.getChild(2);
	}

	/**
	 * func add(arg) int {}
	 * @param {*} it
	 */
	static parse(it) {
		it.nextMatch("func");

		const func = new FunctionDeclareStmt();

		//add
		const funcVariable = Factor.parse(it);
		func.setLexeme(funcVariable.lexeme);
		func.addChild(funcVariable);

		//args
		it.nextMatch("(");
		const args = FunctionArgs.parse(it);
		func.addChild(args);
		it.nextMatch(")");

		//int
		const keywords = it.nextMatchByType(TokenType.KEYWORD);
		if (!keywords.isType()) {
			throw ParseException.fromToken(keywords);
		}
		funcVariable.setLexeme(keywords);

		//block
		const block = Block.parse(it);
		func.addChild(block);
		return func;
	}
}
