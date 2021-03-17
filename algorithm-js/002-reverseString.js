// Solution 1
// Pointer from end to beginning
function reverseString(str) {
	let res = '';
	for (let i = str.length - 1; i >= 0; i--) {
		res += res + str[i];
	}
	return res;
}

reverseString('hello');

// Solution 2a - Destructure method in ES6
// Pointer i from the beginning, pointer j from the end
function reverseString(str) {
	let arr = str.split('');
	let i = 0,
		j = str.length - 1;

	while (i < j) {
		[arr[i], (arr[j] = [arr[j], arr[i]])];
		// let temp = arr[i];
		// arr[i] = arr[j];
		// arr[j] = temp;
		// i++;
		// j--;
	}
	return arr.join('');
}

reverseString('hello');

// Solution 2b
// Only one variable i
function reverseString(str) {
	let arr = str.split('');
	let i = 0;

	while (i < Math.floor(arr.length / 2)) {
		let j = arr.length - i - 1;
		[arr[i], (arr[j] = arr[j]), arr[i]];
	}
	return arr.join('');
}
reverseString('hello');

// Solution 3 - reverse()
function reverseString(str) {
	return str.split('').reverse().join('');
	// let arr = str.split('');
	// let reverseArr = arr.reverse();
	// return reverseArr.join('');
}
reverseString('hello');

// Solution 4 - Recursive method
// reverString(abcdefg), then:
// g r(bcdef) a
// gf r(cde) ba
// gfe r(d) cba
// gfedcba
function reverseString(str) {
	if (!str) {
		return '';
	}
	if (str.length === 1) {
		return str;
	}
	let end = str.length - 1;
	return str[end] + reverString(str.slice(1, end)) + str[0];
}
reverseString('hello');
