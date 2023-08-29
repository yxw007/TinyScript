const Lexer = require('../lexer/Lexer')
const arrayToGenerator = require('../common/arrayToGenerator');
const PeekTokenIterator = require('./utils/PeekTokenIterator');
const Program = require('./ast/Program');

class Parser {
	static parse(source) {
		const lexer = new Lexer();
		const tokens = lexer.analyse(arrayToGenerator(...source));
		return Program.parse(new PeekTokenIterator(arrayToGenerator(tokens)));
	}

	static fromFile(filepath) {
		//TODO:
	}
}

module.exports = Parser;
