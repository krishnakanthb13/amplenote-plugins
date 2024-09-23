---
title: Notes Reviewer
uuid: b7e36f98-532c-11ef-8716-0663d8339c46
version: 1651
created: '2024-08-05T18:44:59+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

\

I am thrilled to introduce you to a powerful tool designed to streamline and enhance your note management process. My plugin offers a comprehensive suite of features to help you efficiently analyze, categorize, and manage your notes with ease. Whether you're a diligent organizer or a casual user looking to improve your note-taking efficiency, this plugin is tailored to meet your needs with precision and flexibility. The core functionality revolves around allowing you to make informed decisions on your notes by offering detailed analysis, personalized filtering options, and sophisticated tagging capabilities. With intuitive prompts and user-friendly interfaces, you can easily sort notes by creation or modification date, apply custom tags, and categorize notes based on predefined criteria.

\

Navigating through the plugin is designed to be as seamless as possible. Start by choosing your preferred analysis method and proceed to refine your note selection with our advanced filtering options. Whether you’re aiming to focus on specific tags, review notes from particular months, or sort by untagged entries, my plugin provides the tools you need to tailor the review process to your exact requirements. The interactive prompts guide you through each step, ensuring that you capture all relevant details while providing flexibility to adapt the process to your unique needs. Furthermore, the inclusion of an audit reporting feature means that every decision made is well-documented, allowing you to track and review changes with a clear and organized format.

\

As you explore and utilize the plugin, we encourage you to take advantage of its robust functionality to maximize your productivity and streamline your note management tasks. Our goal is to provide you with a tool that not only simplifies the process but also enhances your overall note-taking experience. Whether you’re looking to clean up your note repository, make strategic decisions on note management, or gain insights from your notes’ historical data, this plugin is here to support you every step of the way. We’re excited for you to start this journey and are confident that this tool will become an invaluable asset in your note-taking arsenal. Welcome aboard, and happy reviewing!

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/b7e36f98-532c-11ef-8716-0663d8339c46/95450633-bff1-453f-9270-6785e42bf385.gif)

---

![7b24c4c7-1e10-48d0-b39c-9e614f8b16a4.png|600](https://images.amplenote.com/b7e36f98-532c-11ef-8716-0663d8339c46/7b24c4c7-1e10-48d0-b39c-9e614f8b16a4.png) [^1]   ![98d9494e-4726-4599-861e-3dc67c3e1dd7.png|600](https://images.amplenote.com/b7e36f98-532c-11ef-8716-0663d8339c46/98d9494e-4726-4599-861e-3dc67c3e1dd7.png) [^2]

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

## User Guide for Note-Taking Plugin

Welcome to the Note-Taking Plugin! This guide will walk you through the features and help you make the most of the plugin for managing and analyzing your notes.

### **1. Analyzing Your Notes**

**Feature Overview:**

- This feature allows you to analyze your notes to spot trends and patterns over time.

**How to Use:**

1. **Start the Analysis:**

    1. Click on "Analyze!" to begin.

    1. You will be prompted to choose how you want to proceed: by the date the note was created or the date it was last modified.

1. **Viewing the Analysis:**

    1. The plugin will generate a Pivot Table showing your notes summarized by year and month.

    1. This table helps you identify high-activity periods where you took the most notes.

1. **Report Generation:**

    1. After analyzing, you can create a detailed report. Options include a quick random selection of notes or a custom report where you specify the number of notes and filter criteria.

### **2. Creating Custom Reports**

**Feature Overview:**

- Generate customized reports of your notes based on your preferences.

**How to Use:**

1. **Choose Your Options:**

    1. Select “Report!” to open the prompt.

    1. Decide if you want a random selection or a custom report. If you choose custom, you can specify the number of notes, sort options, and filter by month and year.

1. **Report Content:**

    1. The report will include details like note creation and update dates, tags, and links to each note.

    1. You can review the notes and categorize them as you see fit.

### **3. Reviewing and Categorizing Notes**

**Feature Overview:**

- This feature lets you make decisions about individual notes after reviewing them.

**How to Use:**

1. **Make a Decision:**

    1. Click on "Decide!" when reviewing a note.

    1. Choose whether to keep, discard, or review the note later.

1. **Add Tags and Comments:**

    1. You can also add custom tags and comments to provide additional context or organization.

### **General Tips:**

- **Be Patient:** Analysis and report generation might take a few minutes, especially with large notebooks.

- **Stay Organized:** Regularly review and categorize your notes to keep your notebook organized and useful.

- **Explore Options:** Experiment with different settings in the plugin to find what best suits your note-taking and reviewing needs.

If you have any questions or need further assistance, feel free to ask!

Happy note-taking!

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name|Notes Reviewer<!-- {"cell":{"colwidth":648}} -->|
|icon|rate_review<!-- {"cell":{"colwidth":648}} -->|
|description|1. Analyzing Your Notes ; 2. Creating Custom Reports ; 3. Reviewing and Categorizing Notes<!-- {"cell":{"colwidth":648}} -->|
|instructions|Please fine the Instructions here =  [Notes Reviewer Docs](https://www.amplenote.com/notes/1c90442a-532d-11ef-8716-0663d8339c46) <!-- {"cell":{"colwidth":648}} -->|
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{

    
  
  noteOption: { 
    "Analyze!": async function (app, noteHandle) {

    // Prompt the user for how they want to proceed with the analysis
    const result = await app.prompt("Step 1 - Review: Analyze. >> Get a glimpse of your whole bunch of notes", {
        inputs: [
            {
                label: "How do you want to proceed with building the Analysis By?",
                type: "radio",
                options: [
                    { label: "Note Created Date", value: "created" },
                    { label: "Note Last Modified Date (Suggested)", value: "updated" }
                ]
            }
        ]
    });
    // console.log("result:", result);

    // If the result is falsy, the user has canceled the operation
    if (!result) {
        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
        return;
    }
    app.alert("Working on it... This may take a few minutes for large notebooks. The app might seem unresponsive but we're working on it.");
    // Initialize variables
    let notes = [];
    const dateField = result;
	
	// First, filter by tag
	let notesByTag = await app.filterNotes({ tag: "^-reports/-notes-reviewer" });
	// console.log(notesByTag);

	// Then, filter by groups
	let notesByGroup = await app.filterNotes({ group: "^deleted,^plugin" });
	// console.log(notesByGroup);

	// Create a Set of note IDs from the group filtered results for quick lookup
	let notesByGroupSet = new Set(notesByGroup.map(note => note.uuid));

	// Find the intersection of the two sets
	let filteredNotes = notesByTag.filter(note => notesByGroupSet.has(note.uuid));
	// `filteredNotes` now contains the notes that match both the tag and the groups
	// console.log(filteredNotes);

	notes = filteredNotes;
    // console.log("noteHandles:", notes);

    // Month names array for better readability
    const monthNames = ["Jan_1", "Feb_2", "Mar_3", "Apr_4", "May_5", "Jun_6", "Jul_7", "Aug_8", "Sep_9", "Oct_10", "Nov_11", "Dec_12"];

    // Function to create a pivot table
    const pivot = (notes, dateField) => {
        const matrix = {};

        notes.forEach(note => {
            const date = new Date(note[dateField]);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // months are 0-based in JavaScript

            if (!matrix[month]) {
                matrix[month] = {};
            }
            if (!matrix[month][year]) {
                matrix[month][year] = 0;
            }
            matrix[month][year]++;
        });

        return matrix;
    };

    // Function to generate a Markdown table from the pivot table
    const generateMarkdownTable = (pivotTable) => {
        const allYears = new Set();
        Object.values(pivotTable).forEach(years => Object.keys(years).forEach(year => allYears.add(year)));
        const sortedYears = Array.from(allYears).sort();

        let markdownTable = '| Month | ' + sortedYears.join(' | ') + ' |\n';
        markdownTable += '|-------|' + sortedYears.map(() => '---').join('|') + '|\n';

        for (let month = 1; month <= 12; month++) {
            markdownTable += '| ' + monthNames[month - 1] + ' | ';
            const row = sortedYears.map(year => (pivotTable[month] && pivotTable[month][year]) ? pivotTable[month][year] : 0);
            markdownTable += row.join(' | ') + ' |\n';
        }

        return markdownTable;
    };

    // Create the pivot table and generate the Markdown table
    const pivotTable = pivot(notes, dateField);
    const markdownTable = generateMarkdownTable(pivotTable);

    // Output the final Markdown table
    // console.log(markdownTable);

    // Generate the filename based on the current date and time
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
    const hLine = `---`;
    const fDate = new Date();
    const resultText = `
${hLine}
> **Review: Analyze** - Run on <mark data-text-color="25" style="color: #F8D616;">**${fDate}**<!-- {"cycleColor":"25"} --></mark>, with Selected option: <mark data-text-color="25" style="color: #F8D616;">**${dateField} date**<!-- {"cycleColor":"25"} --></mark>.
- <mark style="color:#9AD62A;">**Step 1:**<!-- {"cycleColor":"26"} --></mark> **Identify Note Trends <mark style="color:#9AD62A;">\[Review: Analyze!\]<!-- {"cycleColor":"26"} --></mark>**
    1. To understand your note-taking patterns, analyze the provided Pivot Table. <!-- {"indent":2} -->
        1. This table summarizes your notes (excluding standard review tags) by year and month, showing the number of notes created or modified.
        1. **Focus on High-Activity Periods:** Start by identifying the year and month with the highest number of notes. This will help you pinpoint your most active note-taking periods for deeper analysis.
        1. If you prefer a broader overview, proceed to Step 2 without selecting a specific timeframe.

${markdownTable}
- <mark style="color:#9AD62A;">**Step 2:**<!-- {"cycleColor":"26"} --></mark> **Generate Note Report <mark style="color:#9AD62A;">\[Review: Report!\]<!-- {"cycleColor":"26"} --></mark>**
    1. To generate the report, hover your mouse pointer at the end of this line and select the desired option from the pop-up menu.
        1. To create a list of notes for review, use the following options:
            1. **Quick Start:** Click "I am feeling lucky!" for a random selection of 5 notes.
            1. **Custom Report:**
                1. Specify the desired number of notes (between 5 and 25).
                1. Check "Sort by Untagged Notes" to prioritize untagged items.
                1. Filter by month and year using the format from the Pivot Table.
                1. Check "Override to Created Date" to view notes based on creation date instead of last modified date.

${hLine}

{Notes Reviewer: Report!
 
`;
    // Jot Logic - If Today's Review is already made, Then the dailyJotOption will be disabled! - Not working!
	const newNoteName = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
	const newTagName = ['-reports/-notes-reviewer/0-reports'];
	// console.log(newNoteName);
	// console.log(newTagName);

    // Create a new note - to hold the Analysis report and also the To be Reviewed Notes!!!
    let noteUUID = await app.createNote(filename, newTagName);
    await app.insertContent({ uuid: noteUUID }, resultText);

  }
  },
    
  
  
  
  dailyJotOption: { 
    async "Analyze!" (app, noteHandle) {

    // Prompt the user for how they want to proceed with the analysis
    const result = await app.prompt("Step 1 - Review: Analyze. >> Get a glimpse of your whole bunch of notes", {
        inputs: [
            {
                label: "How do you want to proceed with building the Analysis By?",
                type: "radio",
                options: [
                    { label: "Note Created Date", value: "created" },
                    { label: "Note Last Modified Date (Suggested)", value: "updated" }
                ]
            }
        ]
    });
    // console.log("result:", result);

    // If the result is falsy, the user has canceled the operation
    if (!result) {
        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
        return;
    }
    app.alert("Working on it... This may take a few minutes for large notebooks. The app might seem unresponsive but we're working on it.");
    // Initialize variables
    let notes = [];
    const dateField = result;
	
	// First, filter by tag
	let notesByTag = await app.filterNotes({ tag: "^-reports/-notes-reviewer" });
	// console.log(notesByTag);

	// Then, filter by groups
	let notesByGroup = await app.filterNotes({ group: "^deleted,^plugin" });
	// console.log(notesByGroup);

	// Create a Set of note IDs from the group filtered results for quick lookup
	let notesByGroupSet = new Set(notesByGroup.map(note => note.uuid));

	// Find the intersection of the two sets
	let filteredNotes = notesByTag.filter(note => notesByGroupSet.has(note.uuid));
	// `filteredNotes` now contains the notes that match both the tag and the groups
	// console.log(filteredNotes);

	notes = filteredNotes;
    // console.log("noteHandles:", notes);

    // Month names array for better readability
    const monthNames = ["Jan_1", "Feb_2", "Mar_3", "Apr_4", "May_5", "Jun_6", "Jul_7", "Aug_8", "Sep_9", "Oct_10", "Nov_11", "Dec_12"];

    // Function to create a pivot table
    const pivot = (notes, dateField) => {
        const matrix = {};

        notes.forEach(note => {
            const date = new Date(note[dateField]);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // months are 0-based in JavaScript

            if (!matrix[month]) {
                matrix[month] = {};
            }
            if (!matrix[month][year]) {
                matrix[month][year] = 0;
            }
            matrix[month][year]++;
        });

        return matrix;
    };

    // Function to generate a Markdown table from the pivot table
    const generateMarkdownTable = (pivotTable) => {
        const allYears = new Set();
        Object.values(pivotTable).forEach(years => Object.keys(years).forEach(year => allYears.add(year)));
        const sortedYears = Array.from(allYears).sort();

        let markdownTable = '| Month | ' + sortedYears.join(' | ') + ' |\n';
        markdownTable += '|-------|' + sortedYears.map(() => '---').join('|') + '|\n';

        for (let month = 1; month <= 12; month++) {
            markdownTable += '| ' + monthNames[month - 1] + ' | ';
            const row = sortedYears.map(year => (pivotTable[month] && pivotTable[month][year]) ? pivotTable[month][year] : 0);
            markdownTable += row.join(' | ') + ' |\n';
        }

        return markdownTable;
    };

    // Create the pivot table and generate the Markdown table
    const pivotTable = pivot(notes, dateField);
    const markdownTable = generateMarkdownTable(pivotTable);

    // Output the final Markdown table
    // console.log(markdownTable);

    // Generate the filename based on the current date and time
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
    const hLine = `---`;
    const fDate = new Date();
    const resultText = `
${hLine}
> **Review: Analyze** - Run on <mark data-text-color="25" style="color: #F8D616;">**${fDate}**<!-- {"cycleColor":"25"} --></mark>, with Selected option: <mark data-text-color="25" style="color: #F8D616;">**${dateField} date**<!-- {"cycleColor":"25"} --></mark>.
- <mark style="color:#9AD62A;">**Step 1:**<!-- {"cycleColor":"26"} --></mark> **Identify Note Trends <mark style="color:#9AD62A;">\[Review: Analyze!\]<!-- {"cycleColor":"26"} --></mark>**
    1. To understand your note-taking patterns, analyze the provided Pivot Table. <!-- {"indent":2} -->
        1. This table summarizes your notes (excluding standard review tags) by year and month, showing the number of notes created or modified.
        1. **Focus on High-Activity Periods:** Start by identifying the year and month with the highest number of notes. This will help you pinpoint your most active note-taking periods for deeper analysis.
        1. If you prefer a broader overview, proceed to Step 2 without selecting a specific timeframe.

${markdownTable}
- <mark style="color:#9AD62A;">**Step 2:**<!-- {"cycleColor":"26"} --></mark> **Generate Note Report <mark style="color:#9AD62A;">\[Review: Report!\]<!-- {"cycleColor":"26"} --></mark>**
    1. To generate the report, hover your mouse pointer at the end of this line and select the desired option from the pop-up menu.
        1. To create a list of notes for review, use the following options:
            1. **Quick Start:** Click "I am feeling lucky!" for a random selection of 5 notes.
            1. **Custom Report:**
                1. Specify the desired number of notes (between 5 and 25).
                1. Check "Sort by Untagged Notes" to prioritize untagged items.
                1. Filter by month and year using the format from the Pivot Table.
                1. Check "Override to Created Date" to view notes based on creation date instead of last modified date.

${hLine}

{Notes Reviewer: Report!
 
`;
    // Jot Logic - If Today's Review is already made, Then the dailyJotOption will be disabled! - Not working!
	const newNoteName = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
	const newTagName = ['-reports/-notes-reviewer/0-reports'];
	// console.log(newNoteName);
	// console.log(newTagName);

    // Create a new note - to hold the Analysis report and also the To be Reviewed Notes!!!
    let noteUUID = await app.createNote(filename, newTagName);
    await app.insertContent({ uuid: noteUUID }, resultText);
      
  }
  },
    
  
  
  
  
	insertText: {
		"Report!": async function (app) {

		// Prompt the user for how they want to proceed with the report
		const result = await app.prompt("Step 2 - Review: Report. >> Select based on your Today's Availability!", {
			inputs: [
				{ 
					label: "I am feeling Lucky!", 
					type: "checkbox" 
				},
				{
					label: "How many Notes would you like to Review today? (Between: 5 - 25)",
					placeholder: "Default: 5",
					type: "string",
				},
				{ 
					label: "Sort by Untagged Notes.", 
					type: "checkbox" 
				},
				{
					label: "Type the Month-Year that you want the Report for! (Skip if the Get Lucky! is Selected!)",
					placeholder: "Eg: 1-2024",
					type: "string",
				},
				{ 
					label: "Override to Created Date. (Default: Last Modified / Updated)",
					type: "checkbox" 
				}
			]
		});

		// If the result is falsy, the user has canceled the operation
		if (!result) {
			app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
			return;
		}
		app.alert("Working on it... This may take a few minutes for large notebooks. The app might seem unresponsive but we're working on it.");

		// const [monthyearNumber, getLucky, numberOfNotes, sortUntagged, overrideModified] = result;
		const [getLucky, numberOfNotes, sortUntagged, monthyearNumber, overrideModified] = result;
		// console.log("result:", result);
		
		// Handling Manually (numberOfNotes can be left blank!)
		let numberOfNotesz = (numberOfNotes || "5");

		const monthYearPattern = /^(0?[1-9]|1[0-2])-(\d{4})$/;
		const notesCountPattern = /^(0?[5-9]|1[0-9]|2[2-5])$/;

		const monthYearInput = monthyearNumber;
		const notesCountInput = numberOfNotesz;

		// Validate the Month-Year input if "Get Lucky!" is not selected
		if (!monthYearPattern.test(monthYearInput) && !getLucky) {
			await app.alert("Invalid Month-Year format. Please enter in the format 'M-YYYY' or 'MM-YYYY'. OR Just select Get Lucky! Checkbox.");
			return;
		} 

		// Validate the number of notes input - Handled Manually (Below is Just for limiting!)
		if (!notesCountPattern.test(notesCountInput)) {
			await app.alert("Invalid number of notes. Please enter a number between 5 and 25.");
			return;
		}

		// Fetch notes based on filters
		// notes = await app.filterNotes({ tag: "^-reports/-notes-reviewer,^deleted,^archived,^plugin" });
		// console.log("All filtered notes:", notes);

		// First, filter by tag
		let notesByTag = await app.filterNotes({ tag: "^-reports/-notes-reviewer" });
		// console.log(notesByTag);

		// Then, filter by groups
		let notesByGroup = await app.filterNotes({ group: "^deleted,^plugin" });
		// console.log(notesByGroup);

		// Create a Set of note IDs from the group filtered results for quick lookup
		let notesByGroupSet = new Set(notesByGroup.map(note => note.uuid));

		// Find the intersection of the two sets
		let filteredNotes = notesByTag.filter(note => notesByGroupSet.has(note.uuid));

		// `filteredNotes` now contains the notes that match both the tag and the groups
		// console.log(filteredNotes);

		let notes = filteredNotes;
		// console.log("noteHandles:", notes);

		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]]; // Swap elements
			}
			return array;
		}
		
		if (getLucky === false && (monthyearNumber)) {
			// Extract the month and year from the input
			const [inputMonth, inputYear] = monthYearInput.split('-').map(Number);

			// Filter notes based on month-year combo
			notes = notes.filter(note => {
				const dateField = overrideModified ? new Date(note.created) : new Date(note.updated);
				const noteMonth = dateField.getMonth() + 1; // getMonth() is zero-based
				const noteYear = dateField.getFullYear();
				return noteMonth === inputMonth && noteYear === inputYear;
			});
			// console.log(`Notes filtered by month-year ${monthYearInput}:`, notes);
			// Default shuffle - Regardless the user selects getLucky
			notes = shuffleArray(notes);
			// console.log(`Shuffled Array:`, notes);
		}

		// Inside your conditional block
		if (getLucky === true) {
			// Randomly shuffle the notes
			notes = shuffleArray(notes);
			// console.log("Notes after 'Get Lucky!' shuffle:", notes);
		}

		if (sortUntagged === true) {
			// Sort notes by whether they are untagged
			notes = notes.sort((a, b) => (a.tags.length === 0 ? -1 : 1));
			// console.log("Notes after sorting by untagged:", notes);
		}

		if (notesCountInput) {
			// Limit the number of notes
			const notesCount = parseInt(notesCountInput, 10);
			notes = notes.slice(0, notesCount);
			// console.log(`Notes after limiting to ${notesCount} notes:`, notes);
		}

		// console.log("Final filtered Notes:", notes);
		
		// console.log("Type of notes:", typeof notes);
		// console.log("Is notes an array?:", Array.isArray(notes));
		// console.log("Content of notes:", notes);
		
		// Ensure notes is an array
		let notesz = Array.from(notes);
		
		// Adding Inbox Tag for all the final resulted notes
		for (const note of notesz) {
			if (note.uuid) {
				await app.addNoteTag({ uuid: note.uuid }, "-reports/-notes-reviewer/1-inbox");
			}
		}
		
		// Function to format date-time string
		function formatDateTime(dateTimeStr) {
		  const date = new Date(dateTimeStr);
		  return date.toLocaleString(); // Or use another format like date.toISOString() for ISO format
		}
		
		// Create the markdown table header
		const tableHeader = "| Notes | Created_On | Updated_On | Tags |\n|---|---|---|---|";

		// Create the note rows
		const noteRows = notes.map(note => 
		  `|[${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid})|${formatDateTime(note.created)}|${formatDateTime(note.updated)}|${note.tags}|`
		);

		// Join note rows with newlines
		const noteRowsString = noteRows.join("\n");

		// Combine header and rows into the final markdown table
		const markdownTable = `${tableHeader}\n${noteRowsString}`;

		// console.log(markdownTable);

    // Generate the filename based on the current date and time
    const hLine = `---`;
    const fDate = new Date();
    const inputSummary = `
> **Input Selections:**
> - Get Lucky!: ${getLucky || "None"}.
> - Number of Notes (Default:5): ${numberOfNotes || "None"}.
> - Sort by Tags (Untagged first): ${sortUntagged || "None"}.
> - Filter used on Month-Year: ${monthyearNumber || "None"}.
> - Sort by Created Date: ${overrideModified || "None"}.
`;
    const resultText = `
> **Review: Report** - Run on <mark data-text-color="25" style="color: #F8D616;">**${fDate}**<!-- {"cycleColor":"25"} --></mark>, with Selected options:

${inputSummary}

- <mark style="color:#9AD62A;">**Step 3:**<!-- {"cycleColor":"26"} --></mark> **Review and Categorize Notes <mark style="color:#9AD62A;">\[Review: Decide!\]<!-- {"cycleColor":"26"} --></mark>**
    1. **Review Each Note:** Click on each note link to access its content. Evaluate its importance and relevance.<!-- {"indent":2} -->
        1. **Make a Decision:** Once reviewed, use the "Notes Reviewer: Decide!" button to select one of the following options:
            1. **Keep:** Preserve the note for future reference.
            1. **Discard:** Delete the note permanently.
            1. **Review:** Flag the note for another review later.
            1. **Add Tags (Optional):** If necessary, manually add tags to the note for better organization.
            1. **Provide Context:** Briefly explain your decision to help you remember the reasoning behind it in the future.
        1. **Start with an Audit:** Begin by reviewing the audit log at the top of the page to track your progress.

${markdownTable}

${hLine} 
`;
		// console.log("inputSummary:", inputSummary);
		// console.log("resultText:", resultText);
		await app.context.replaceSelection(resultText);
		
		}
	},
    
  
  
  
  
  
  linkOption: {
      "Decide!": async function (app, link) {

      // ------- Prompting the user to enter filter criteria -------
      // Displays a prompt to the user to select review decision, tags, and enter a custom tag.
      const result = await app.prompt("Step 3 - Review: Decide. >> Proceed with making the right Move!", {
          inputs: [
              {
                  label: "Select The Review Decision!",
                  type: "select",
                  options: [
                      { label: "Keep - Review Completed!", value: "-reports/-notes-reviewer/2-keep" },
                      { label: "Discard - Review Completed!", value: "-reports/-notes-reviewer/2-discard" },
                      { label: "Review - Review Pending!", value: "-reports/-notes-reviewer/2-review" }
                  ]
              },
              {
                  label: "Select Tags outside the Standardized Review Tags!",
                  type: "tags",
                  limit: 10
              },
              {
                  label: "Free to Type a Tag to apply",
                  placeholder: "Your tag here",
                  type: "string",
              },
              {
                  label: "Add your comments for this Review!",
                  placeholder: "To remind yourself why you made this move!",
                  type: "text",
              }
          ]
      });
  
      // ------- Check if the user cancelled the operation -------
      // Alerts the user if the operation is cancelled.
      if (!result) {
          app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
          return;
      }
      
      // ------- Log user selections for debugging -------
      // Logs user input selections for debugging purposes.
      // console.log("Users Selection:", result);
  
      // ------- The String UUID of the note the plugin action was invoked from -------
      // Retrieves and logs the UUID of the current note.
      const reportNoteUUID = app.context.noteUUID;
      // console.log("app.context.noteUUID:", app.context.noteUUID);
      // console.log("reportNoteUUID:", reportNoteUUID);
      
      // ------- Predefined review tags -------
      // Defines and logs a set of predefined review tags.
      const reviewTagz = '-reports/-notes-reviewer,-reports/-notes-reviewer/0-reports,-reports/-notes-reviewer/1-inbox,-reports/-notes-reviewer/2-discard,-reports/-notes-reviewer/2-keep,-reports/-notes-reviewer/2-review,-reports/-notes-reviewer/3-moved';
      // console.log("reviewTagz:", reviewTagz);
  
      // ------- Destructuring user inputs -------
      // Destructures and logs user input selections.
      const [decisionTagName, multiTag, singleTag, noteComment] = result;
      // console.log("decisionTagName:", decisionTagName);
      // console.log("multiTag:", multiTag);
      // console.log("singleTag:", singleTag);
  
      // ------- Check if the user cancelled the operation -------
      // Checks if decision tag is selected along with multiple or single tags and alerts the user.
      if ((multiTag || singleTag) && decisionTagName) {
          app.alert("Review Decision should not be selected when Multiple Tags or Single Tag are Used or Selected!");
          return;
      }
      
      // ------- Get the link from the Link -------
      // Decide if this is a Amplenote URL
      let decideUrl = (link.href || "");
      // console.log("decideUrl:", decideUrl);

      if (decideUrl.startsWith("https://www.amplenote.com/notes/")) {
        // Code to execute if decideUrl contains the expected prefix
        // console.log("decideUrl contains an Amplenote note URL.");
        // decideUrl = (link.href || "");
      } else {
        // Code to execute if decideUrl doesn't contain the prefix
        // console.log("decideUrl is not an Amplenote note URL.");
        app.alert("Operation has been cancelled. As the Link is not a Amplenote note URL. Tata! Bye Bye! Cya!");
        return;
      }
        
      // ------- Create a regular expression to match UUID patterns -------
      // Regular expression to match UUID patterns.
	  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  
      // ------- Extract the UUID using match -------
      // Extracts and logs the UUID from the link.
      const extractedUUID = link.href && link.href.match(uuidRegex);
      // console.log("extractedUUID:", extractedUUID);
  
      // ------- Check if the extraction was successful and use the first match -------
      // Uses the extracted UUID if found, otherwise logs a message.
      let decideUUID = "";
      if (extractedUUID) {
          decideUUID = extractedUUID[0];
          // console.log("decideUUID:", decideUUID);
      } else {
          app.alert("No UUID found in the URL.");
          // console.log("No UUID found in the URL.");
          
      }
  
      let fTags = new Set();
      
      // ------- Remove predefined tags from the note -------
      // Removes predefined review tags from the note if a decision tag is selected.
      if (decisionTagName) {
          const tagsArray = reviewTagz.split(',').map(tag => tag.trim());
          for (const tag of tagsArray) {
              if (tag) {
                  await app.removeNoteTag({ uuid: decideUUID }, tag);
              }
          }
      const added = await app.addNoteTag({ uuid: decideUUID }, `${decisionTagName}`);
      fTags.add(decisionTagName);
      }
  
      // ------- Add the selected decision tag to the note -------
      // Adds the selected decision tag to the note.
      // const added = await app.addNoteTag({ uuid: decideUUID }, `${decisionTagName}`);
      // fTags.add(decisionTagName);
  
      // ------- Add multiple tags to the note if provided -------
      // Adds multiple tags to the note if provided.
      if (multiTag) {
          const tagsArray = multiTag.split(',').map(tag => tag.trim());
          for (const tag of tagsArray) {
              if (tag) {
                  await app.addNoteTag({ uuid: decideUUID }, tag);
                  fTags.add(tag);
              }
          }
          await app.addNoteTag({ uuid: decideUUID }, "-reports/-notes-reviewer/3-moved");
          fTags.add("-reports/-notes-reviewer/3-moved");
      }
  
      // ------- Add single tag to the note if provided -------
      // Adds a single tag to the note if provided.
      if (singleTag) {
          await app.addNoteTag({ uuid: decideUUID }, singleTag);
          fTags.add(singleTag);
          await app.addNoteTag({ uuid: decideUUID }, "-reports/-notes-reviewer/3-moved");
          fTags.add("-reports/-notes-reviewer/3-moved");
      }
  
      // ------- Audit Reporting -------
      // Prepares and logs the formatted text for audit reporting.
      const fDate = new Date();
      const formattedDate = fDate.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      // console.log("fDate:", fDate);
      // console.log("formattedDate:", formattedDate);
  
      const noteHandlez = await app.findNote({ uuid: decideUUID });
      const noteDescription = noteHandlez.name;
      // console.log("noteHandle:", noteHandlez);
      // console.log("noteDescription:", noteDescription);
      const noteName = `[${noteDescription}](https://www.amplenote.com/notes/${decideUUID})`;
      // console.log("noteName:", noteName);
      // console.log("fTags:", fTags);
      
      const fTagsArray = Array.from(fTags);
      // console.log("fTagsArray:", fTagsArray);
      
      const textFinal = `
> Review: Decide (Audit) - Notes: On <mark data-text-color="25" style="color: #F8D616;">**${formattedDate}**<!-- {"cycleColor":"25"} --></mark>, The Note Titled: **${noteName}** underwent a review decision process. The tag: <mark data-text-color="25" style="color: #F8D616;">[**${fTagsArray}**]<!-- {"cycleColor":"25"} --></mark> was/were added. With comments: <mark data-text-color="25" style="color: #F8D616;">[**${noteComment}**]<!-- {"cycleColor":"25"} --></mark>.
`;
      // console.log("textFinal:", textFinal);
      
      // ------- Insert the formatted text into the selected note -------
      // Inserts the formatted audit text into the report note.
      await app.insertNoteContent({
          uuid: reportNoteUUID
      }, textFinal);

  }
 }  
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- August 2nd, 2024 - Worked on Clearly understanding the requirements + how can I bring it in Amplenote's available options, with maximum feature and also closed loop, with all the features available. (In my prospective!). And also collected the code sample and API codes for various interfaces!

- August 5th, 2024 - Build the Decide part and also the Analyze part. Tested and basic features added.

- August 6th, 2024 - Build the Report part (the biggest and difficult part). Finalized all three parts, code per se. Also finalized the text scripts which will help the users to take guided and informed decisions! Completed the Docs. + Publish!

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

### **Analyze**

- ~~**Daily Jots Option + App Options + Note Options**\
Implement code for different options and complete initial setup. ✅~~

- ~~**User Selection: Created Date / Last Modified Date**\
Implement user choice for date-based filtering and complete setup. ✅~~

- ~~**Create Note with Standard Name + Time + Review Tags**\
Create and standardize notes with tags, and implement metadata handling. ✅~~

- ~~**Generate Report: Pivot Table (Year, Month, Number of Created/Modified Notes)**\
Build code for pivot table generation and analysis. 🏮 Focus!~~

- ~~**Lecture on Reading and Understanding Reports**\
Include educational content on interpreting reports. ✅~~

- ~~**Text for Next Report Call**\
Prepare and insert text for the next report call. ✅~~

- ~~**Number Count Excluding Review Tags**\
Implement counting mechanism to exclude notes with review tags. 🏮 Focus!~~

- **Additional Request: Daily Jots Disappear After Review**\
Implement code to hide daily jots after reviewing 10 notes. 🏮 Focus! (PENDING - 1)

### **Report**

- ~~**Insert Text into Note**\
Complete insertion of text into notes. ✅~~

- ~~**User Selection Options**\
Implement options for year, month, random year/month, number of notes, and sorting preferences. ✅~~

- ~~**Insert List of Notes with Tags and Comments**\
Include linked notes, tags, and comments in the analysis report. ✅~~

- **Create Additional Note with Tags**\
Create or update a note with tags for analysis. 🏮 Focus! (PENDING - 1)

- ~~**Create Placeholder Note with Tags and Instructions**\
Implement placeholder note creation and storage logic. ✅~~

- ~~**Generate Random List of Notes (Exclude Review Tags)**\
Create a list of notes excluding those with review tags. ✅~~

- ~~**Filter Notes by Year/Month Based on User Input**\
Apply year and month filters to note selection. ✅~~

- ~~**Random Notes without Year/Month Filter**\
Implement random note selection without filters. ✅~~

- ~~**Limit Number of Notes**\
Set limits on the number of notes in the list. ✅~~

- ~~**Sort by Untagged Notes**\
Implement sorting to prioritize untagged notes. ✅~~

- ~~**Lectures on Next Steps**\
Include guidance on next steps after report generation. ✅~~

- **Add Task for Completion Tracking**\
Implement task tracking with completion indicators. 🏮 Focus! (PENDING - 2)

### **Decide**

- ~~**Link Option Implementation**\
Implement options for selecting review tags and automatic tagging. ✅~~

- ~~**Tag Management**\
Handle tags for reports, inbox, keep, discard, review, and moved tags. ✅~~

- **Note Name Icon Tagger**\
Add prefix/suffix icons to notes upon review completion. 🏮 TBD!

- ~~**Audit Tracker**\
Implement audit tracking for note movements and record updates. ✅~~

- ~~**Handle Errors for Invalid UUID or Non-Amplenote Links**\
Manage errors for invalid UUIDs or non-Amplenote URLs. ✅~~

### **General**

- ~~Review Docs and Code~~

- ~~Publish~~

- ~~Email~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Pass the Tags and Groups into Settings <mark style="color:#F8914D;">**- Next**<!-- {"cycleColor":"24"} --></mark>

    - Easy to handle addition and removal of filters.

- **Add Task for Completion Tracking <mark style="color:#F8914D;">- TBD<!-- {"cycleColor":"24"} --></mark>**

    - Implement a task tracking feature to insert text indicating "Review Completed ✅ + Date + Time of Completion" at the beginning of the analysis and review note. 🏮 Focus! (PENDING - 2)

- **Daily Jots Suggestion Disappearance <mark style="color:#F8914D;">- TBD - Reach out!<!-- {"cycleColor":"24"} --></mark>**

    - Implement functionality to make jot suggestions disappear after reviewing 10 notes (daily jots). 🏮 Focus! (PENDING - 1)

- **Create Additional Note with All Tags <mark style="color:#F8914D;">- TBD<!-- {"cycleColor":"24"} --></mark>**

    - Develop code to create an additional note with all tags or add all tags to the analysis report note. 🏮 Focus! (PENDING - 1)

- **Create Placeholder Note with Tags and Instructions <mark style="color:#F8914D;">- TBD<!-- {"cycleColor":"24"} --></mark>**

    - Create a placeholder note with all tags and detailed instructions, only once per day. Implement note creation logic based on settings. ✅

- **Note Name Icon Tagger <mark style="color:#F8914D;">- Skip<!-- {"cycleColor":"24"} --></mark>**

    - Develop functionality to add a prefix or suffix icon (tick 🕵) to the note once the review is completed. ✨ Pending - TBD!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^3]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 2h 41m + 6h 12m + 11h 30m = 20h+. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

 

[^1]: NOTE REVIEW
    Q
    M

[^2]: . ..
    ENCVEMEITE
    C

[^3]: [High-Level Explanation of the Code]()

    ### Step 1: Prompt the User for Input

    ### Note Option & Daily Jot Option

    - The user is prompted to choose how to proceed with the analysis:

        - "Note Created Date" or "Note Last Modified Date".

    - The user can specify preferences for the report, including options like:

        - Feeling lucky, number of notes to review, sorting by untagged notes, specifying a month-year, and overriding the default date field.

    - For link option, the user is prompted to select a review decision, tags, a custom tag, and add comments.

    ### Step 2: Handle User Cancellation

    - If the user cancels the operation at any prompt, an alert is displayed, and the process stops.

    ### Step 3: Initialization

    - Variables are initialized, including an empty array for notes and the selected date field from the user input.

    ### Step 4: Filter Notes

    - Notes are first filtered by a specific tag.

    - Notes are then filtered by groups (excluding certain groups like deleted or plugin notes).

    - The intersection of these two filtered sets results in `filteredNotes`.

    ### Step 5: Apply User Preferences

    - If the "Get Lucky!" option is not selected and a month-year is provided, notes are filtered based on the specified month and year.

    - Notes are randomly shuffled regardless of the "Get Lucky!" selection.

    - If the "Sort by Untagged Notes" option is selected, notes are sorted to prioritize untagged notes.

    - The number of notes is limited based on the user's input.

    ### Step 6: Pivot Table Creation and Generate Markdown Table

    - A pivot table is created to summarize the number of notes by month and year based on the selected date field.

    - A Markdown table is generated from the pivot table, displaying the count of notes for each month and year.

    ### Step 7: Generate Result Text

    - The final result text, including the Markdown table, is prepared.

    - This text includes instructions for further steps and analysis.

    ### Step 8: Create and Save Note

    - A new note is created to hold the analysis report.

    - The generated content is inserted into this note.

    ### Step 9: Log User Selections for Debugging

    - User input selections are logged for debugging purposes.

    ### Step 10: Retrieve Current Note UUID

    - The UUID of the current note is retrieved and logged.

    ### Step 11: Predefined Review Tags

    - A set of predefined review tags is defined and logged.

    ### Step 12: Destructure User Inputs

    - User input selections are destructured and logged.

    ### Step 13: Validate Inputs

    - Checks if both decision tags and multiple/single tags are selected simultaneously and alerts the user if so.

    ### Step 14: Check Amplenote URL

    - Verifies if the provided link is an Amplenote URL.

    - Extracts the UUID if valid.

    ### Step 15: Remove Predefined Tags and Add New Tags

    - If a decision tag is selected, predefined review tags are removed from the note.

    - The selected decision tag is added to the note.

    - Any additional tags provided by the user are also added to the note.

    ### Step 16: Tag and Format Notes

    - The final set of notes is tagged with `-notes-reviewer/1-inbox`.

    - The notes are formatted into a Markdown table, including details such as note name, created date, updated date, and tags.

    ### Step 17: Audit Reporting

    - Prepares and logs formatted text for audit reporting, including the date, note title, added tags, and user comments.

    - Inserts the formatted audit text into the report note.

    ### Step 18: Insert Result into Context

    - The generated result text is inserted into the current context for the user to review and proceed with the next steps.

