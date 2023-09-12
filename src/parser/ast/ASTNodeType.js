import Enum from "../../common/Enum";

export const ASTNodeType = {
	BLOCK: new Enum("BLOCK", 1),
	//二元表达式，比如：+、-、*、/ 等
	BINARY_EXPR: new Enum("BINARY_EXPR", 2),
	//一元表达式，比如：赋值语句，位运算等
	UNARY_EXPR: new Enum("UNARY_EXPR", 3),
	//变量
	VARIABLE: new Enum("VARIABLE", 4),
	//if语句
	IF_STMT: new Enum("IF_STMT", 5),
	//while语句
	WHILE_STMT: new Enum("WHILE_STMT", 6),
	//for语句
	FOR_STMT: new Enum("FOR_STMT", 7),
	//赋值语句
	ASSIGN_STMT: new Enum("ASSIGN_STMT", 8),
	//函数声明语句
	FUNCTION_DECLARE_STMT: new Enum("FUNCTION_DECLARE_STMT", 9),
	//声明语句
	DECLARE_STMT: new Enum("DECLARE_STMT", 10),
	//因子 常数
	SCALAR: new Enum("SCALAR", 11),
	//return 语句
	RETURN_STMT: new Enum("RETURN_STMT", 12),
	//函数参数语句
	FUNCTION_ARGS: new Enum("FUNCTION_ARGS", 13),
	//函数调用语句
	CALL_EXPR: new Enum("CALL_EXPR", 14),
	//程序
	PROGRAM: new Enum("program", 15),
};
