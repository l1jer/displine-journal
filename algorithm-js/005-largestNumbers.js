// Return the largest number in an array
// Solution 1
function largestOfFour(arr) {
	return arr.map((subArr) => Math.max(...subArr));
}

// Solution 2
function largestOfFour(arr) {
	let res = [];

	for (let i = 0; i < arr.length; i++) {
		let max = -Infinity; // There are posibilities in negative numbers
		// i -> elements in arr
		for (let j = 0; j < arr[i].length; j++) {
			max = Math.max(max, arr[i][j]);
			// j -> nums in each array
		}
		res.push(max);
	}
	return res;
	// Each largest number is each array
}

largestOfFour([
	[5, 2, 6, 9],
	[56, 45, 32, 95],
	[1235, 4568, 9856, 1245],
	[-78, -56, -1, -13],
	[456, -5, 123, 8],
]);

// Reduce()
function largestOfFour(arr) {
	let arr = [85, 1, 55, 6, 13];
	arr.reduce((accum, curr) => Math.max(accum, curr), -Infinity);
}
console.log(largestOfFour);
