{
	appOption: {
	/* ----------------------------------- */
	"List": async function (app) {

	const tagSelect = "-0-planner";
	const startDate = new Date(2024, 11, 1);  // Months are zero-indexed, so 10 is November
	const numberOfDays = "31";
	const chronoOrder = `false`;

	function generateDates(startDate, days) {
		const dates = [];
		for (let i = 0; i < days; i++) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + i);
			
			const day = date.getDate();
			const suffix = getSuffix(day);
			const formattedDate = `@~/${tagSelect}/${date.toLocaleString('en-US', { month: 'long' })} ${day}${suffix}, ${date.getFullYear()}`;
			
			dates.push(formattedDate);
		}
		if (!chronoOrder) {
		  return dates.reverse(); // Reverse the array for descending order
		} else {
		  return dates(); // Array for descending order
		}
	}

	function getSuffix(day) {
		if (day >= 11 && day <= 13) return 'th';
		switch (day % 10) {
			case 1: return 'st';
			case 2: return 'nd';
			case 3: return 'rd';
			default: return 'th';
		}
	}

	// Example usage: Generate dates for November 2024
	let dates = generateDates(startDate, numberOfDays);
	dates = dates.join('\n')
	console.log(dates);
		
		}
	}
}