class Enum {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	toString() {
		return this.value;
	}
}

module.exports = Enum;
