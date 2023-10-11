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
			//...
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
			//TODO:
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
}
