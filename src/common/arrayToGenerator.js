function* arrayToGenerator(arr) {
	for (const item of arr) {
		yield item;
	}
}

module.exports = arrayToGenerator;
