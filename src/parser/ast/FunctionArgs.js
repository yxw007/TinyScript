import { ASTNode, ASTNodeType, Factor } from "../index";

export class FunctionArgs extends ASTNode {
	constructor() {
		super(ASTNodeType.FUNCTION_ARGS, "args");
	}
	/**
	 * int a, int b, string c
	 * @param {*} it
	 */
	static parse(it) {
		const args = new FunctionArgs();

		while (it.peek().isType()) {
			const type = it.next();
			const variable = Factor.parse(it);
			args.addChild(variable);
			variable.setTypeLexeme(type);

			if (it.peek().getValue() !== ")") {
				it.nextMatch(",");
			}
		}

		return args;
	}
}
