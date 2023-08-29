const ASTNode = require("./ASTNode");

class Stmt extends ASTNode {
	constructor(type, label) {
		super(type, label);
	}
	static parse(it) {
		//TODO:
	}
}

module.exports = Stmt;
