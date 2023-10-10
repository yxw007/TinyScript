import { SymbolTable } from ".";

export class TAProgram {
	#instructions = [];
	#labelCounter = 0;
	#staticSymbolTable = null;
	constructor() {
		this.#instructions = [];
		this.#labelCounter = 0;
		this.#staticSymbolTable = new SymbolTable();
	}
	setStaticSymbols(symbolTable) {}

	toString() {
		const lines = [];
		for (const instruction of this.#instructions) {
			lines.push(instruction.toString());
		}
		return lines.join("\n");
	}

	add(instruction) {
		this.#instructions.push(instruction);
	}

	getInstructions() {
		return this.#instructions;
	}
}
