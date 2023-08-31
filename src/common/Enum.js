class Enum {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	toString() {
		return this.value;
	}
}

export default Enum;
