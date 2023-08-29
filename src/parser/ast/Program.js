const ASTNode = require("./ASTNode");
const ASTNodeType = require("./ASTNodeType");
const Stmt = require("./Stmt");

class Program extends ASTNode {
	constructor() {
		super(ASTNodeType.PROGRAM, "program");
	}

	static parse(it) {
		const program = new Program()
		let stmt = null
		while ((stmt = Stmt.parse(it)) != null) {
			program.addChild(stmt)
		}
		return program
	}
}

module.exports = Program;
