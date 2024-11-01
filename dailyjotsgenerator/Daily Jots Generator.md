---
title: Daily Jots Generator
uuid: 9508ccfe-9826-11ef-980c-fde8113e5c94
version: 146
created: '2024-11-01T13:24:56+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

Welcome to the Date List Generator! This tool is designed to help you quickly create a customized list of dates for tagging, logging, or organizing projects. With a few inputs, you can define specific tags, set the number of days, choose a start date, and arrange the dates in either chronological or reverse order, creating a date sequence tailored to your needs.

\

Whether you're tracking daily updates, managing project timelines, or simply organizing notes, this generator provides a flexible, user-friendly solution to streamline your date management. Simply input your preferences, and the tool will deliver a formatted list of dates that’s ready to use. Enjoy effortless organization and enhanced productivity!

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

### <mark>General - Calling the Plugin - Daily Jots Generator</mark>

 ![](https://images.amplenote.com/9508ccfe-9826-11ef-980c-fde8113e5c94/3fe0a35a-8e14-47b7-8c5a-9c20f5d50681.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

## How to:

- Call the Plugins using `{Daily Jots Generator: List}`

- Fill in the details in the prompt window. Details give below.

- Get the results mentioned below.

## Let’s walk through a typical usage example:

### Input Example

- **Tags**: "project-update"

- **Number of Days**: `7`

- **Reverse Chronological Order**: `Un-checked`

- **Start Date**: `01/01/2024`

> **Note: If fields are left blank (e.g., “daily-jots” as the tag, today’s date as the start date, 10 days for number of days, and in chronological order).**

### Output

- If the above inputs are entered, the code will generate a list of seven dates in reverse chronological order, starting from January 1, 2024. Each date will have the tag `@\~/project-update/` prefixed:


  ```
  @~/project-update/January 7th, 2024
  @~/project-update/January 6th, 2024
  @~/project-update/January 5th, 2024
  @~/project-update/January 4th, 2024
  @~/project-update/January 3rd, 2024
  @~/project-update/January 2nd, 2024
  @~/project-update/January 1st, 2024
  ```

## Tips for Use

- **Input Validity**: Ensure dates are in `MM/DD/YYYY` format to avoid errors.

- **Long Lists**: For large lists (e.g., 100+ days), consider using chronological order for readability.

- **Default Settings**: Use default tags like `"daily-jots"` for generic logging purposes; modify the start date and number of days for specific projects.

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name|Daily Jots Generator|
|icon<!-- {"cell":{"colwidth":116}} -->|note_add|
|description<!-- {"cell":{"colwidth":116}} -->|Gives you a list of dynamic new note creation or existing note linking option, based on few basic inputs.|
|instructions|Trigger the User Prompt using `{Daily Jots Generator: List}`, and get the list anywhere in the note.<br />[Daily Jots Generator - Docs](https://www.amplenote.com/notes/cd147828-9826-11ef-8733-7b5929f76244) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
    insertText: {
        /**
         * Generates a list of formatted dates based on user input for tags, number of days, start date,
         * and chronological order. Outputs the dates in the console.
         */
        "List": async function (app) {

            // console.log("Start:");
			// Initialize today's date and format it as MM/DD/YYYY for default prompt input.
            const today = new Date();
            const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
			// console.log("formattedDate:", formattedDate);  // Outputs: MM/DD/YYYY

            // Prompt the user for details to configure the correlation matrix.
            const result = await app.prompt("Select details for Generating Daily Jots List", {
                inputs: [
                    { label: "Select the Tags (Default: daily-jots)", type: "tags", limit: 1 },
                    { label: "Select the Number of Days (Default: 10, if left blank)", type: "string" },
                    { label: "Reverse Chronological Order (Default: Chronological)", type: "checkbox" },
                    { label: "Select the Start Date (MM/DD/YYYY)", type: "string", value: `${formattedDate}` },
                ]
            });

			// ------- Check if the user has cancelled the operation -------
			if (!result) {
			  // console.log("User cancelled the operation");
			  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
			  return;
			}

            // Destructure user input into variables.
            const [tagNames, numberDays, chronoSelect, startDatex] = result;
			// const [tagNames = "daily-jots", numberDays = "10", chronoSelect = false, startDatex = null] = result;
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
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- October 26th, 2024: Built the basic working skeleton functions and features which I expected. And tested the code.

- November 1st, 2024: Added user prompt selections, tag, start date, sorting, number of days. Then made the corrections and bug fixes and limitations. Tested the code.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Remove selected tags using `\~`.~~

- ~~Include tags of interest to broaden the options.~~

- ~~Specify the number of days to generate starting from the selected date.~~

- ~~Implement various sorting options for flexibility in output.~~

- ~~Add user prompt selection for a more intuitive experience.~~

- ~~Conduct thorough testing, fine-tuning, and bug fixes to ensure reliability.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Explore additional options to incorporate it here.

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[Code Explanation!][^1]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 1h + 2h 30m = 3h 30m \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: [Code Explanation!]()

    ### Here's a high-level explanation of the code:

    - Prompts the user to input settings for generating a date list, including:

        - Tags (default is "daily-jots"),

        - Number of days to generate,

        - Start date,

        - Chronological or reverse order.

    - Uses today’s date as the default start date and “daily-jots” as the default tag if the user provides none.

    - Generates a list of dates starting from the chosen start date, extending for the specified number of days.

    - Formats each date with:

        - The specified tag,

        - Month name,

        - Day with ordinal suffix (e.g., “1st,” “2nd”).

    - Orders dates based on user preference (chronologically or reverse chronologically).

    - Outputs the formatted list of dates in the console for easy viewing and further use.

