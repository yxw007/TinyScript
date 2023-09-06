import ASTNode from "./ASTNode";
import PriorityTable from "../utils/PriorityTable";
import ASTNodeType from "./ASTNodeType";
import Factor from "./Factor";

class Expr extends ASTNode {
	constructor(type, label) {
		super(type, label);
	}

	static fromToken(type, token) {
		const expr = new Expr(type, token.getValue());
		expr.lexeme = token;
		return expr;
	}

	/**
	 * 左递归文法：
	 * E(k) -> E(k) op(k) E(k+1) | E(k+1)
	 *
	 * 消除左递归=>转成右递归文法
	 * E(k) -> E(k+1) E_(k)
	 * 	const e = new Expr();  e.left = E(k+1); e.right = E_(k).child(0)
	 *  combine 关系
	 *
	 * E_(k) -> op(k) E(k+1) E_(k) | ε
	 * race 关系
	 *
	 * 最终推导文法：
	 * E(t) -> F E_(t) | U E_(t)
	 * U -> (E) | ++E | --E
	 */
	static parse(it) {
		return Expr.E(it, 0);
	}

	/**
	 * 文法的一般形式
	 * E(k) -> E(k+1) E_(k)
	 * E_(k) -> op(k) E(k+1) E_(k) | ε
	 *
	 * 最终推导文法：
	 * E(t) -> F E_(t) | U E_(t)
	 *
	 * 比如：1*3 or ++a
	 * @param {*} it
	 * @param {*} k
	 */
	static E(it, k) {
		if (!it.hasNext()) {
			return null;
		}

		if (k < PriorityTable.length - 1) {
			return Expr.combine(
				() => Expr.E(it, k + 1),
				() => Expr.E_(it, k)
			);
		} else {
			return Expr.race(
				() =>
					Expr.combine(
						() => Expr.F(it),
						() => Expr.E_(it, k)
					),
				() =>
					Expr.combine(
						() => Expr.U(it),
						() => E_(it, k)
					)
			);
		}
	}

	/**
	 * E_(k) -> op(k) E(k+1) E_(k) | ε
	 * @param {*} it
	 * @param {*} k
	 */
	static E_(it, k) {
		if (!it.hasNext()) {
			return null;
		}

		const token = it.peek();
		const value = token.getValue();
		if (PriorityTable[k].indexOf(value) !== -1) {
			it.nextMatch(value);
			const expr = Expr.fromToken(ASTNodeType.BINARY_EXPR, token);
			expr.addChild(
				Expr.combine(
					() => Expr.E(it, k + 1),
					() => Expr.E_(it, k, it)
				)
			);
			return expr;
		}
		return null;
	}

	static F(it) {
		const factor = Factor.parse(it);
		if (!factor) {
			return null;
		}
		if (it.hasNext() && it.peek().getValue() === "(") {
			return CallExpr.parse(factor, it);
		}

		return factor;
	}

	//U -> (E) | ++E | --E | !E
	static U(it) {
		if (!it.hasNext()) {
			return null;
		}

		const token = it.peek();
		const value = token.getValue();
		if (value === "(") {
			it.nextMatch("(");
			const expr = Expr.parse(it);
			it.nextMatch(")");
			return expr;
		} else if (value === "++" || value === "--" || value === "!") {
			const t = it.peek();
			it.nextMatch(value);
			const expr = Expr.fromToken(ASTNodeType.UNARY_EXPR, t);
			expr.addChild(Expr.parse(it));
			return expr;
		}
		return null;
	}

	static combine(funcA, funcB) {
		const a = funcA();
		if (a == null) {
			return null;
		}

		const b = funcB();
		if (b == null) {
			return a;
		}

		const expr = Expr.fromToken(ASTNodeType.BINARY_EXPR, b.lexeme);
		expr.addChild(a);
		expr.addChild(b.getChild(0));
		return expr;
	}

	static race(funcA, funcB) {
		const a = funcA();
		if (a == null) {
			return funcB();
		}
		return a;
	}
}

export default Expr;
