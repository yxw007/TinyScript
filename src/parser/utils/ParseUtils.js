import { Factor } from "../index";

export class ParseUtils {
	/* 将抽象语法树，转成后续表达式 */
	static toPostfixExpr(node) {
		if (node instanceof Factor) {
			return node.lexeme.getValue();
		}

		let res = [];
		for (const child of node.getChildren()) {
			res.push(ParseUtils.toPostfixExpr(child));
		}
		const lexemeStr = node.lexeme?.getValue() ?? "";
		if (lexemeStr.length > 0) {
			return `${res.join(" ")} ${lexemeStr}`;
		} else {
			return res.join(" ");
		}
	}
}
