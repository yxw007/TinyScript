import ASTNode from "./ASTNode";
import PriorityTable from "../utils/PriorityTable";

class Expr extends ASTNode {
	constructor() {
		super();
	}

	static fromToken(type, token) {
		const expr = new Expr();
		expr.label = token.getValue();
		expr.lexeme = token;
		expr.type = type;
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
	 * 表达式的其他形式
	 * U -> (E) | ++E | --E
	 * E(t) -> F E_(t) | U E_(t)
	 * ! 此文法如何获得的 ?
	 */
	static parse(it) {
		return Expr.E(it, 0);
	}

	static E(it, k) {
		if (k < PriorityTable.length - 1) {
			return Expr.combine(
				it,
				() => Expr.E(it, k + 1),
				() => Expr.E_(it, k)
			);
		} else {
			return Expr.race(
				it,
				() =>
					Expr.combine(
						it,
						() => Expr.F(it),
						() => Expr.E_(it, k)
					),
				() =>
					Expr.combine(
						it,
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
		const token = it.peek();
		const value = token.getValue();
		if (PriorityTable[k].indexOf(value) !== -1) {
			it.nextMatch(value);
			const expr = Expr.fromToken(ASTNodeType.BINARY_EXPR, token);
			expr.addChild(
				Expr.combine(
					it,
					() => Expr.E(it, k + 1),
					() => Expr.E_(it, k, it)
				)
			);
			return expr;
		}
		return null;
	}

	static U(it) {
		const token = it.peek();
		const value = token.getValue();
		//TODO:
	}

	static combine(it, funcA, funcB) {}

	static race(it, funcA, funcB) {}
}

export default Expr;
