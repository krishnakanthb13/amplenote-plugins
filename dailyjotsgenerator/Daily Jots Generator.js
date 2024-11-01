{
    insertText: {
        /**
         * Generates a list of formatted dates based on user input for tags, number of days, start date,
         * and chronological order. Outputs the dates in the console.
         */
        "List": async function (app) {

            // Initialize today's date and format it as MM/DD/YYYY for default prompt input.
            const today = new Date();
            const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
			// console.log("formattedDate:", formattedDate);  // Outputs: MM/DD/YYYY

            // Prompt the user for details to configure the correlation matrix.
            const result = await app.prompt("Select details for Correlation Matrix for Tags", {
                inputs: [
                    { label: "Select the Tags (Default: daily-jots)", type: "tags", limit: 1 },
                    { label: "Select the Number of Days (Default: 10, if left blank)", type: "string" },
                    { label: "Reverse Chronological Order (Default: Chronological)", type: "checkbox" },
                    { label: "Select the Start Date (MM/DD/YYYY)", type: "string", value: `${formattedDate}` },
                ]
            });

            // Destructure user input into variables.
            const [tagNames, numberDays, chronoSelect, startDatex] = result;
			// console.log("result:", result);

            // Default tag selection to 'daily-jots' if none provided.
            const tagSelect = tagNames || "daily-jots";
            // Use startDatex from user input, or default to today if left empty.
            const startDate = startDatex ? new Date(startDatex) : today;
            // Parse number of days input; defaults to 10 if blank.
            const numberOfDays = parseInt(numberDays) || 10;
            // Check if the user selected reverse chronological order.
            const chronoOrder = chronoSelect;

            /**
             * Generates a list of dates starting from a specified date.
             * Dates are formatted with tags and include ordinal suffixes.
             * 
             * @param {Date} startDate - The starting date for date generation.
             * @param {number} days - Number of days to generate from startDate.
             * @returns {Array} - An array of formatted date strings.
             */
            function generateDates(startDate, days) {
                const dates = [];
                for (let i = 0; i < days; i++) {
                    // Calculate date by adding i days to the start date.
                    const date = new Date(startDate);
                    date.setDate(date.getDate() + i);

                    // Format the date with the tag and add ordinal suffix.
                    const day = date.getDate();
                    const suffix = getSuffix(day);
                    const formattedDate = `@~/${tagSelect}/${date.toLocaleString('en-US', { month: 'long' })} ${day}${suffix}, ${date.getFullYear()}`;

                    dates.push(formattedDate);
                }
                // Reverse the date order if chronological order is unchecked.
                return chronoOrder ? dates : dates.reverse();
            }

            /**
             * Determines the appropriate ordinal suffix for a day.
             * 
             * @param {number} day - The day of the month.
             * @returns {string} - The ordinal suffix for the day.
             */
            function getSuffix(day) {
                if (day >= 11 && day <= 13) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            // Generate dates based on the user input.
            let dates = generateDates(startDate, numberOfDays);
            dates = dates.join('\n');
            // console.log(dates);
			return dates+`\n`;
        }
    }
}