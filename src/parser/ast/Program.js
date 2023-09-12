import { ASTNode, ASTNodeType, Stmt } from "../index";
export class Program extends ASTNode {
	constructor(type, label) {
		super(type, label);
	}

	static create() {
		return new Program(ASTNodeType.PROGRAM, "program");
	}

	static parse(it) {
		const program = Program.create();
		let stmt = null;
		while ((stmt = Stmt.parse(it)) != null) {
			program.addChild(stmt);
		}
		return program;
	}
}
