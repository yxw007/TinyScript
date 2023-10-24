import { SymbolTable, TAInstruction, TAInstructionType } from ".";

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

	addLabel() {
		const label = "L" + this.#labelCounter++;
		const instruction = new TAInstruction(TAInstructionType.LABEL, null, null);
		instruction.setArg1(label);
		this.add(instruction);
		return instruction;
	}

	getInstructions() {
		return this.#instructions;
	}
}
