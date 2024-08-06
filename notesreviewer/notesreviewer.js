{

    
  
  noteOption: { 
    "Analyze!": async function (app, noteHandle) {
    // Prompt the user for how they want to proceed with the analysis
    const result = await app.prompt("Step 1 - Review: Analysis. >> Get a glimpse of your whole bunch of notes", {
        inputs: [
            {
                label: "How do you want to proceed with building the Analysis By?",
                type: "radio",
                options: [
                    { label: "Note Created Date", value: "created" },
                    { label: "Note Last Modified Date", value: "updated" }
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
    notes = await app.filterNotes({ tag: "^-notes-reviewer" });
    // console.log("noteHandles:", notes);

    // Month names array for better readability
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
> **Review Analysis** - Run on <mark data-text-color="25" style="color: #F8D616;">**${fDate}**</mark>, with Selected option: <mark data-text-color="25" style="color: #F8D616;">**${dateField} date**</mark>.

1. To keep things short, this is the First step of the Review Process, Analysis!
2. Below you can find the Pivoted data for all your note (Excluding the Notes tagged under standard review tags, to avoid overlapping).
3. Columns with the Years and Rows with the Months, and Intersection is the Count of Notes that has been Created or Modified (Based on your Selection).

${markdownTable}
- **Step 2:** To Call the Report, just keep the mouse pointer at the end of the below line and you should be able to see a \`Intellisense pop-dropdown\`, and then hit enter! 

${hLine}

{Notes_Reviewer: Report
 
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
    const result = await app.prompt("Step 1 - Review: Analysis. >> Get a glimpse of your whole bunch of notes", {
        inputs: [
            {
                label: "How do you want to proceed with building the Analysis By?",
                type: "radio",
                options: [
                    { label: "Note Created Date", value: "created" },
                    { label: "Note Last Modified Date", value: "updated" }
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
    notes = await app.filterNotes({ tag: "^-notes-reviewer" });
    // console.log("noteHandles:", notes);

    // Month names array for better readability
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
> **Review Analysis** - Run on <mark data-text-color="25" style="color: #F8D616;">**${fDate}**</mark>, with Selected option: <mark data-text-color="25" style="color: #F8D616;">**${dateField} date**</mark>.

1. To keep things short, this is the First step of the Review Process, Analysis!
2. Below you can find the Pivoted data for all your note (Excluding the Notes tagged under standard review tags, to avoid overlapping).
3. Columns with the Years and Rows with the Months, and Intersection is the Count of Notes that has been Created or Modified (Based on your Selection).

${markdownTable}
- **Step 2:** To Call the Report, just keep the mouse pointer at the end of the below line and you should be able to see a \`Intellisense pop-dropdown\`, and then hit enter! 

${hLine}

{Notes_Reviewer: Report
 
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
      }
  
      // ------- Add the selected decision tag to the note -------
      // Adds the selected decision tag to the note.
      const added = await app.addNoteTag({ uuid: decideUUID }, `${decisionTagName}`);
      fTags.add(decisionTagName);
  
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
> Audit - Review Notes: On <mark data-text-color="25" style="color: #F8D616;">**${formattedDate}**</mark>, The Note Titled: **${noteName}** underwent a review decision process. The tag: <mark data-text-color="25" style="color: #F8D616;">[**${fTagsArray}**]</mark> was/were added. With comments: <mark data-text-color="25" style="color: #F8D616;">[**${noteComment}**]</mark>.
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