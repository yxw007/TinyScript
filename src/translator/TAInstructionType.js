import Enum from "../common/Enum";
/* 三地址指令类型 */
export const TAInstructionType = {
	ASSIGN: new Enum("ASSIGN", 1),
	GOTO: new Enum("GOTO", 2),
	IF: new Enum("IF", 3),
	LABEL: new Enum("LABEL", 4),
	CALL: new Enum("CALL", 5),
	RETURN: new Enum("RETURN", 6),
	SP: new Enum("SP", 7),
	PARAM: new Enum("PARAM", 8),
};
