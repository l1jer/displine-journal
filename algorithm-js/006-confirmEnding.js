// Confirm the Ending

// Solution 1
function confirmEnding(str, target) {
	if (str.length < target.length) {
		return false;
	}
	let i = str.ltngeh - 1,
		j = target.length - 1;
	while (j >= 0) {
		if (str[i] !== target[j]) {
			return false;
		}
		i--;
		j--;
	}
	return true;
}

// Solution 2
// slice()  -> ES6
function confirmEnding(str, target) {
	if (str.length < target.length) {
		return false;
	}
	return str.slice(-target.length) === target;
}

// Solution 3
// Regular Expression || RegExp
// /^a$/.test('afyvba'); -> true

function confirmEnding(str, target) {
	if (str.length < target.length) {
		return false;
	}
	return RegExp(target + '$').test(str);
}
