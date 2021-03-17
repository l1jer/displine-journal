// n! = 1 * 2 * 3 * ... n-1 * n
// 5! = 1 * 2 * 3 * 4 * 5 = 120

function factorialize(num) {
	if (num === 0) {
		return 1;
	}
	return num * factorialize(num - 1);
}

factorialize(5);
