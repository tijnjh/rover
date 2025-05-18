export function formatNumber(number: number) {
	if (number <= 1000) {
		return number;
	}

	if (number <= 1000000) {
		const num = number / 1000;
		return `${num.toFixed(1)}K`;
	}

	const num = number / 1000000;
	return `${num.toFixed(1)}M`;
}
