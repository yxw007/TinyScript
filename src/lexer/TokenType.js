import Enum from "../common/Enum";

export const TokenType = {
	KEYWORD: new Enum("KEYWORD", 1),
	VARIABLE: new Enum("VARIABLE", 2),
	OPERATOR: new Enum("OPERATOR", 3),
	BRACKET: new Enum("BRACKET", 4),
	INTEGER: new Enum("INTEGER", 5),
	FLOAT: new Enum("FLOAT", 6),
	BOOLEAN: new Enum("BOOLEAN", 7),
	STRING: new Enum("STRING", 8),
};

export default TokenType;
