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
	let notesByTag = await app.filterNotes({ tag: "^-notes-reviewer" });
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

{Notes_Reviewer: Report!
 
`;
    // Jot Logic - If Today's Review is already made, Then the dailyJotOption will be disabled! - Not working!
	const newNoteName = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
	const newTagName = ['-notes-reviewer/0-reports'];
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
	let notesByTag = await app.filterNotes({ tag: "^-notes-reviewer" });
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

{Notes_Reviewer: Report!
 
`;
    // Jot Logic - If Today's Review is already made, Then the dailyJotOption will be disabled! - Not working!
	const newNoteName = `Notes_Reviewer_${YYMMDD}_${HHMMSS}`;
	const newTagName = ['-notes-reviewer/0-reports'];
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
		// notes = await app.filterNotes({ tag: "^-notes-reviewer,^deleted,^archived,^plugin" });
		// console.log("All filtered notes:", notes);

		// First, filter by tag
		let notesByTag = await app.filterNotes({ tag: "^-notes-reviewer" });
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
				const dateField = overrideModified ? new Date(note.updated) : new Date(note.created);
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
				await app.addNoteTag({ uuid: note.uuid }, "-notes-reviewer/1-inbox");
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
        1. **Make a Decision:** Once reviewed, use the "Notes_Reviewer: Decide!" button to select one of the following options:
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
                      { label: "Keep - Review Completed!", value: "-notes-reviewer/2-keep" },
                      { label: "Discard - Review Completed!", value: "-notes-reviewer/2-discard" },
                      { label: "Review - Review Pending!", value: "-notes-reviewer/2-review" }
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
      const reviewTagz = '-notes-reviewer,-notes-reviewer/0-reports,-notes-reviewer/1-inbox,-notes-reviewer/2-discard,-notes-reviewer/2-keep,-notes-reviewer/2-review,-notes-reviewer/3-moved';
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
          await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
          fTags.add("-notes-reviewer/3-moved");
      }
  
      // ------- Add single tag to the note if provided -------
      // Adds a single tag to the note if provided.
      if (singleTag) {
          await app.addNoteTag({ uuid: decideUUID }, singleTag);
          fTags.add(singleTag);
          await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
          fTags.add("-notes-reviewer/3-moved");
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