function* arrayToGenerator(arr) {
	for (const item of arr) {
		yield item;
	}
}

export default arrayToGenerator;
