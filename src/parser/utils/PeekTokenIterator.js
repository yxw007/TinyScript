import PeekIterator from "../../common/PeekIterator"
import ParseException from "./ParseException"

class PeekTokenIterator extends PeekIterator {
	constructor(it) {
		super(it);
	}

	nextMatch(value) {
		const token = this.next();
		if (token.getValue() !== value) {
			throw ParseException.fromToken(token);
		}
		return token;
	}
}

export default PeekTokenIterator;
