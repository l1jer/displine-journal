// 008
// Truncate A String
// COndition method
function truncateString(str, num) {
	if (str.length > num) {
		return str.slice(0, num - 3) + '...';
		// Above is length includes '...'
		// Below is length excludes '...'
		// return str.slice(0, num-3) + '...';
	}
	return str;
}

// Ternari Method
function truncateString(str, num) {
	return str.length > num ? str.slice(0, num - 3) + '...' : str;
}

truncateString('A-tisket a-tasket A green and yellow basket', 12);
