class LexicalException extends Error {
	constructor(msg) {
		super(msg);
	}

	static fromChar(c) {
		return new LexicalException(`unexpected char ${c}`);
	}
}

export default LexicalException;
