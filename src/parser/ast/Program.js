import ASTNode from "./ASTNode"
import ASTNodeType from "./ASTNodeType"
import Stmt from "./Stmt"

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

export default Program;
