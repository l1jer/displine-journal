// 007 Repeat A String
// repeat()
// Solution 1
function repeatStringNumTimes(str, num) {
	if (num < 0) {
		return '';
	}
	return str.repeat(num);
}

repeatStringNumTimes('abc', 3);

// Solution 2
function repeatStringNumTimes(str, num) {
	let res = '';
	for (let i = 0; i < num; i++) {
		res += str;
	}
	return res;
}

repeatStringNumTimes('abc', 3);

// Solution 3
function repeatStringNumTimes(str, num) {
	if (num <= 0) {
		return '';
	}
	return Array(num + 1).join(str);
}

repeatStringNumTimes('abc', 3);

// Solution 4
// Recursive
// TODO: To be continued
