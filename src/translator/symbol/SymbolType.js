import Enum from "../../common/Enum";

export const SymbolType = {
	/* 运行时：变量 */
	ADDRESS_SYMBOL: new Enum("ADDRESS_SYMBOL", 1),
	/* 运行时：常量 */
	IMMEDIATE_SYMBOL: new Enum("IMMEDIATE_SYMBOL", 2),
	/* 运行时：跳转 */
	LABEL_SYMBOL: new Enum("LABEL_SYMBOL", 3),
};
