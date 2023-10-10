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
			}
			case TAInstructionType.IF: {
			}
			case TAInstructionType.LABEL: {
			}
			case TAInstructionType.CALL: {
			}
			case TAInstructionType.RETURN: {
			}
			case TAInstructionType.PARAM: {
			}
			case TAInstructionType.SP: {
				return `SP ${this.#arg1}`;
			}
			default: {
				throw new Error("unknown opcode type :", this.#type);
			}
		}
	}

	getType() {
		return this.#type;
	}

	getResult() {
		return this.#result;
	}
}
