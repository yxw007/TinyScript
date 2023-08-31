import AstNodeType from './ASTNodeType'

class ASTNode {
	#children = [];
	#parent = null;
	#lexeme = null;
	#type = null;
	#label = null;
	/* 存放节点属性 */
	#props = {};
	/**
	 * @param {*} type 类型
	 * @param {*} label 节点名称
	 */
	constructor(type, label) {
		this.#type = type;
		this.#label = label;
	}



}

export default ASTNode;
