import { TAInstructionType } from ".";
export class TAInstruction {
	#type = null;
	#result = null;
	#op = null;
	#arg1 = null;
	#arg2 = null;
	constructor(type, result, op, arg1 = null, arg2 = null) {
		this.#type = type;
		this.#result = result;
		this.#op = op;
		this.#arg1 = arg1;
		this.#arg2 = arg2;
	}

	toString() {
		switch (this.#type) {
			case TAInstructionType.ASSIGN: {
				if (this.#arg2 == null) {
					return `${this.#result} = ${this.#arg1}`;
				} else {
					return `${this.#result} = ${this.#arg1} ${this.#op} ${this.#arg2}`;
				}
			}
			case TAInstructionType.GOTO: {
				return `GOTO ${this.#arg1}`;
			}
			case TAInstructionType.IF: {
				return `IF ${this.#arg1} ELSE ${this.#arg2}`;
			}
			case TAInstructionType.LABEL: {
				return `${this.#arg1}:`;
			}
			case TAInstructionType.CALL: {
				return `CALL ${this.#arg1}`;
			}
			case TAInstructionType.RETURN: {
				return `RETURN ${this.#arg1}`;
			}
			case TAInstructionType.PARAM: {
				return `PARAM ${this.#arg1} ${this.#arg2}`;
			}
			case TAInstructionType.SP: {
				return `SP ${this.#arg1}`;
			}
			default: {
				throw new Error("unknown opcode type :", this.#type);
			}
		}
	}

	setArg1(arg) {
		this.#arg1 = arg;
	}

	getArg1() {
		return this.#arg1;
	}

	setArg2(arg) {
		this.#arg2 = arg;
	}

	getArg2() {
		return this.#arg2;
	}

	getType() {
		return this.#type;
	}

	getResult() {
		return this.#result;
	}
}
