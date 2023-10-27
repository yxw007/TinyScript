import { SymbolTable, TAInstruction, TAInstructionType, TAProgram } from ".";
import { PROP_ADDRESS } from "../common";
import { ASTNodeType, Expr } from "../parser";
import ParseException from "../parser/utils/ParseException";

/**
 * 将抽象语法树翻译成3地址指令
 */
export class Translator {
	constructor(astNode) {}

	/**
	 * @param {*} ast
	 * @returns programs
	 */
	translate(ast) {
		const program = new TAProgram();
		const symbolTable = new SymbolTable();
		for (const child of ast.getChildren()) {
			this.translateStmt(program, child, symbolTable);
		}
		program.setStaticSymbols(symbolTable);
		return program;
	}
	translateStmt(program, node, symbolTable) {
		switch (node.type) {
			case ASTNodeType.DECLARE_STMT: {
				this.translateDeclareStmt(program, node, symbolTable);
				break;
			}
			case ASTNodeType.ASSIGN_STMT: {
				this.translateAssignStmt(program, node, symbolTable);
				break;
			}
			case ASTNodeType.BLOCK: {
				this.translateBlock(program, node, symbolTable);
				break;
			}
			case ASTNodeType.IF_STMT: {
				this.translateIfStmt(program, node, symbolTable);
				break;
			}
			case ASTNodeType.FUNCTION_DECLARE_STMT: {
				this.translateFunctionDeclareStmt(program, node, symbolTable);
				break;
			}
			case ASTNodeType.RETURN_STMT: {
				this.translateReturnStmt(program, node, symbolTable);
				break;
			}
			case ASTNodeType.CALL_EXPR: {
				this.translateCallExpr(program, node, symbolTable);
				break;
			}
		}
	}
	translateDeclareStmt(program, node, symbolTable) {
		const lexeme = node.getChild(0).getLexeme();
		if (symbolTable.exist(lexeme)) {
			throw ParseException(
				"Syntax error",
				`${lexeme.getValue()} is already declare !`
			);
		}

		const variableAddress = symbolTable.createSymbolByLexeme(lexeme);
		const expr = node.getChild(1);
		const exprAddress = this.translateExpr(program, expr, symbolTable);
		program.add(
			new TAInstruction(
				TAInstructionType.ASSIGN,
				variableAddress,
				"=",
				exprAddress
			)
		);
	}
	translateAssignStmt(program, node, symbolTable) {
		const lexeme = node.getChild(0).getLexeme();
		const variableAddress = symbolTable.createSymbolByLexeme(lexeme);
		const expr = node.getChild(1);
		const exprAddress = this.translateExpr(program, expr, symbolTable);
		program.add(
			new TAInstruction(
				TAInstructionType.ASSIGN,
				variableAddress,
				"=",
				exprAddress
			)
		);
	}
	translateExpr(program, node, symbolTable) {
		if (node.isValueType()) {
			const address = symbolTable.createSymbolByLexeme(node.getLexeme());
			node.setProp(PROP_ADDRESS, address);
			return address;
		} else if (node.type == ASTNodeType.CALL_EXPR) {
			const address = this.translateCallExpr(program, node, symbolTable);
			address.setProp(PROP_ADDRESS, address);
			return address;
		} else if (node instanceof Expr) {
			const lexeme = node.getLexeme();
			for (const child of node.getChildren()) {
				this.translateExpr(program, child, symbolTable);
			}
			if (node.getProp(PROP_ADDRESS) == null) {
				node.setProp(PROP_ADDRESS, symbolTable.createVariable());
			}
			const address = new TAInstruction(
				TAInstructionType.ASSIGN,
				node.getProp(PROP_ADDRESS),
				lexeme.getValue(),
				node.getChild(0).getProp(PROP_ADDRESS),
				node.getChild(1).getProp(PROP_ADDRESS)
			);
			program.add(address);
			return address.getResult();
		}
	}
	translateBlock(program, node, symbolTable) {
		const newSymbolTable = new SymbolTable();
		symbolTable.addChild(newSymbolTable);

		program.add(
			new TAInstruction(
				TAInstructionType.SP,
				null,
				null,
				-symbolTable.localSize()
			)
		);

		for (const child of node.getChildren()) {
			this.translateStmt(program, child, newSymbolTable);
		}

		program.add(
			new TAInstruction(
				TAInstructionType.SP,
				null,
				null,
				+symbolTable.localSize()
			)
		);
	}
	translateIfStmt(program, node, symbolTable) {
		const expr = node.getExpr();
		const exprAddr = this.translateExpr(program, expr, symbolTable);
		const ifInstruction = new TAInstruction(
			TAInstructionType.IF,
			null,
			null,
			exprAddr,
			null
		);
		program.add(ifInstruction);

		this.translateBlock(program, node.getBlock(), symbolTable);
		let gotoInstruction = null;
		if (node.getChild(2)) {
			//! 如果有2个孩子，为false是需要跳入第2个孩子的第一条指令位置
			gotoInstruction = new TAInstruction(TAInstructionType.GOTO, null, null);
			program.add(gotoInstruction);
			const labelEndif = program.addLabel();
			ifInstruction.setArg2(labelEndif.getArg1());
		}

		if (node.getElseBlock()) {
			this.translateBlock(program, node.getElseBlock(), symbolTable);
		} else if (node.getElseIfStmt()) {
			this.translateIfStmt(program, node.getElseIfStmt(), symbolTable);
		}

		// if(expr) {... GOTO } else {...}
		const labelEnd = program.addLabel();
		if (node.getChild(2)) {
			gotoInstruction.setArg1(labelEnd.getArg1());
		} else {
			ifInstruction.setArg2(labelEnd.getArg1());
		}
	}
	translateFunctionDeclareStmt(program, node, symbolTable) {
		const newSymbolTable = new SymbolTable();
		symbolTable.addChild(newSymbolTable);

		const label = program.addLabel();
		label.setArg2(node.getLexeme().getValue());
		//! 1.方法名加入符号表中
		newSymbolTable.createLabel(label.getArg1(), node.getLexeme());

		//! 2.参数加入符号表
		const args = node.getArgs().getChildren();
		for (const arg of args) {
			newSymbolTable.createSymbolByLexeme(arg.getLexeme());
		}

		//! 3.翻译方法体block
		const block = node.getBlock();
		for (const child of block.getChildren()) {
			this.translateStmt(program, child, newSymbolTable);
		}
	}

	translateReturnStmt(program, node, symbolTable) {
		const result = this.translateExpr(program, node.getChild(0), symbolTable);
		program.add(
			new TAInstruction(TAInstructionType.RETURN, null, null, result)
		);
	}

	translateCallExpr(program, node, symbolTable) {}
}
