import { ASTNodeType } from "../index";

export class ASTNode {
	#children = [];
	#parent = null;
	/* 词法token */
	#lexeme = null;
	#type = null;
	#label = null;
	/* 存放节点属性 */
	#props = {};
	/**
	 * @param {*} type 类型
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

	set parent(val) {
		this.#parent = val;
	}

	get parent() {
		return this.$parent;
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
