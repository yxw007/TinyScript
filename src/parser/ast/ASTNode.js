import { ASTNodeType } from "../index";

/**
 * 抽象语法树根节点
 */
export class ASTNode {
	/* 子节点 */
	#children = [];
	/* 父节点 */
	#parent = null;
	/* 词法token */
	#lexeme = null;
	/* 节点类型 */
	#type = null;
	/* 节点名称 */
	#label = null;
	/* 存放节点属性 */
	#props = {};
	/**
	 * @param {*} type 节点类型
	 * @param {*} label 节点名称
	 */
	constructor(type = null, label = null) {
		this.#type = type;
		this.#label = label;
	}

	set lexeme(val) {
		this.#lexeme = val;
	}

	get lexeme() {
		return this.#lexeme;
	}

	getLexeme() {
		return this.#lexeme;
	}

	setLexeme(val) {
		this.#lexeme = val;
	}

	get type() {
		return this.#type;
	}

	get label() {
		return this.#label;
	}

	set parent(val) {
		this.#parent = val;
	}

	get parent() {
		return this.$parent;
	}

	get childSize() {
		return this.#children.length;
	}

	getChildren() {
		return this.#children;
	}

	addChild(node) {
		node.parent = this;
		this.#children.push(node);
	}

	getChild(index) {
		if (!this.#children[index]) {
			return null;
		}
		return this.#children[index];
	}
}
