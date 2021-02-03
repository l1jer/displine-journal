// 004
// Find the longest word in a string

// Solution 1
// Recursive method
function findLongestWordLength(str) {
	let res = 0,
		temp = 0;

	for (let i = 0; i < str.length; i++) {
		if (str[i] === ' ') {
			res = Math.max(res, temp);
			// 	if (temp > res) {
			// 		res = temp;
			// 	}
			temp = 0;
		} else {
			temp++;
		}
	}
	return Math.max(res, temp); //if i meets the last word without touching ' '.
}

// Solution 2
// Array & Math.max()
function findLongestWordLength(str) {
	let arr = str.split(' ');
	let res = 0;

	for (let i = 0; i < arr.length; i++) {
		res = Math.max(res, arr[i].length);
	}

	return Math.max(res, temp);
}

// Solution 3
// Map()
function findLongestWordLength(str) {
	let arr = str.split(' ').map((e) => e.length);
	let res = 0;

	for (let i = 0; i < arr.length; i++) {
		res = Math.max(res, arr[i]);
	}

	return Math.max(res, temp);
}

// Solution 4
//Math.max.apply + map()
function findLongestWordLength(str) {
	return Math.max.apply(
		null,
		str.split(' ').map((e) => e.length)
	);
}
