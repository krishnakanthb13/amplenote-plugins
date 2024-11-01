{
	appOption: {
	/* ----------------------------------- */
	"List": async function (app) {
		
	const today = new Date();
	const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
	// console.log(formattedDate);  // Outputs: MM/DD/YYYY

    const result = await app.prompt("Select details for Correlation Matrix for Tags", {
      inputs: [ 
        { label: "Select the Tags (Default: daily-jots)", type: "tags", limit: 1 },
        { label: "Select the Number of Days (Default: 10, if left blank)", type: "string" },
		{ label: "Reverse Chronological Order (Default: Chronological)", type: "checkbox" },
		{ label: "Select the Start Date (MM/DD/YYYY)", type: "string", value: `${formattedDate}` },
      ] 
    });

	const [ tagNames, numberDays, chronoSelect, startDatex ] = result;

	const tagSelect = tagNames || "daily-jots";
	const startDate = startDatex ? new Date(startDatex) : today;  // Use user input for start date, default to today if empty
	const numberOfDays = parseInt(numberDays) || 10;  // Default to 10 days if left blank
	const chronoOrder = chronoSelect;

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
		return chronoOrder ? dates : dates.reverse();  // Reverse the array for descending order if chronoOrder is true
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

	// Example usage: Generate dates based on user input
	let dates = generateDates(startDate, numberOfDays);
	dates = dates.join('\n');
	console.log(dates);
		
		}
	}
}