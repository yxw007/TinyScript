class AlphabetHelper {
	static regLetter = /^[a-zA-Z]$/;
	static regNumber = /^[0-9]/;
	static regLiteral = /^[_a-zA-Z0-9]$/;
	static regOperator = /^[+\-*/><=!&|^%,]$/;
	static regEmpty = /^[ \n\r]$/;
	static regBracket = /^[{}()]$/;
	static regSign = /^[+-]$/;

	static isBracket(c) {
		return AlphabetHelper.regBracket.test(c);
	}

	static isLetter(c) {
		return AlphabetHelper.regLetter.test(c);
	}

	static isNumber(c) {
		return AlphabetHelper.regNumber.test(c);
	}

	static isSign(c) {
		return AlphabetHelper.regSign.test(c);
	}

	static isLiteral(c) {
		return AlphabetHelper.regLiteral.test(c);
	}

	static isOperator(c) {
		return AlphabetHelper.regOperator.test(c);
	}

	static isEmpty(c) {
		return AlphabetHelper.regEmpty.test(c);
	}
}

module.exports = AlphabetHelper;
