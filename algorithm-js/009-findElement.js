// 009
// Finders Keepers
// 1.filter()
function findElement(arr, func) {
	return arr.filter(function (num) {
		return func(num);
	})[0]; // filter()[0] = undefined
}

findElement([1, 2, 3, 4], (num) => num % 2 === 0);

// 2.filter()
function findElement(arr, func) {
	return arr.filter(func)[0];
	// 2nd param 'func' is callback
	// if 2nd param is index then it cannot be used in this way
}

findElement([1, 2, 3, 4], (num) => num % 2 === 0);

// Find()
function findElement(arr, func) {
	return arr.find(func);
}

findElement([1, 2, 3, 4], (num) => num % 2 === 0);

// some() return a boolean not value
// So we can't use some() here
