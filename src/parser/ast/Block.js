import { ASTNodeType, Stmt } from "../index";

export class Block extends Stmt {
	constructor() {
		super(ASTNodeType.BLOCK, "block");
	}
	static parse(it) {
		it.nextMatch("{");
		const block = new Block();
		let stmt = null;
		while ((stmt = Stmt.parse(it)) != null) {
			block.addChild(stmt);
		}
		it.nextMatch("}");
		return block;
	}
}
