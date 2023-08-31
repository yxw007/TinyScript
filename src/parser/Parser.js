import Lexer from '../lexer/Lexer'
import arrayToGenerator from '../common/arrayToGenerator';
import PeekTokenIterator from './utils/PeekTokenIterator';
import Program from './ast/Program';

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

export default Parser;
