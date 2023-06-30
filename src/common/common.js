const BASE_TYPES = ["bool", "int", "float", "void", "string"];

const Keywords = new Set([
	"var",
	"if",
	"else",
	"for",
	"while",
	"break",
	"func",
	"return",
	"int",
	"float",
	"bool",
	"void",
	"string",
]);

const END_CHAR = "\0";

module.exports = {
	BASE_TYPES,
	Keywords,
	END_CHAR,
};
