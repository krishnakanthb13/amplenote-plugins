{
/* ----------------------------------- */
  // Define an asynchronous function 'noteOption' that takes 'app' and 'noteUUID' as parameters
  async insertText(app, noteUUID) {
    // Log the start of the function
    // console.log("Starting insertText function");
  
    // Find the note using the UUID
    const note = await app.findNote({uuid: app.context.noteUUID});
    // console.log("Note found:", note);
  
    // ------- Display a prompt to customize the note -------
    const result = await app.prompt("Customize your note", {
      inputs: [ 
        { 
          label: "Select the tags (Max 10) to add to the Note!", 
          type: "tags",
          limit: 10
        },
        {
          label: "Type a Tag to apply (Not Existing* / Existing) - (* - Preferred)",
          placeholder: "Your tag here",
          type: "string",
        },
        { 
          label: "Select emoji", 
          type: "select", 
          options: [
            // Task Status
            { label: "Task Status: ✅ Completed", value: "✅" },
            { label: "Task Status: ⚠️ Important", value: "⚠️" },
            { label: "Task Status: 🔴 Urgent", value: "🔴" },
            { label: "Task Status: 🟡 Pending", value: "🟡" },
            { label: "Task Status: 🟢 Done", value: "🟢" },
            { label: "Task Status: ⏳ In Progress", value: "⏳" },
  
            // Note Type
            { label: "Note Type: 📝 Note", value: "📝" },
            { label: "Note Type: 💡 Idea", value: "💡" },
            { label: "Note Type: 🔍 Review", value: "🔍" },
            { label: "Note Type: 📚 Research", value: "📚" },
  
            // Priority
            { label: "Priority: 📌 Pinned", value: "📌" },
            { label: "Priority: 🔒 Confidential", value: "🔒" },
  
            // Time Management
            { label: "Time Management: 📅 Scheduled", value: "📅" },
            { label: "Time Management: 🕒 Later", value: "🕒" },
  
            // Work and Personal
            { label: "Work: 💼 Work", value: "💼" },
            { label: "Work: 🎓 Study", value: "🎓" },
            { label: "Personal: 🏠 Home", value: "🏠" },
            { label: "Personal: 🛒 Shopping", value: "🛒" },
            { label: "Personal: ✈️ Travel", value: "✈️" },
            { label: "Personal: 🎉 Event", value: "🎉" },
  
            // Miscellaneous
            { label: "Miscellaneous: ⚙️ Settings", value: "⚙️" },
            { label: "Miscellaneous: 🌟 Highlight", value: "🌟" },
            { label: "Miscellaneous: 🎯 Goal", value: "🎯" },
            { label: "Miscellaneous: 🛠️ Maintenance", value: "🛠️" },
            { label: "Miscellaneous: 💬 Discussion", value: "💬" },
            { label: "Miscellaneous: 🚀 Launch", value: "🚀" }
          ]
        },
        { 
          label: "Select position", 
          type: "select", 
          options: [
            { label: "Prefix", value: "" }, // Set an empty value for Prefix
            { label: "Suffix", value: "suffix" }
          ] 
        },
        { 
          label: "Predefined Options (Advanced - Check+Modify Code Based on your Specific Requirments)", 
          type: "select", 
          options: [
            { label: "Predefined Sample 1: Completed", value: "1" }, 
            { label: "Predefined Sample 2: Ideas", value: "2" }, 
            { label: "Predefined Sample 3: Travel Goals", value: "3" } // More Options can be added as per your Requirements!
          ] 
        }
      ] 
    });
  
    // Log the result of the prompt
    // console.log("Prompt result:", result);
  
    // ------- Check if the user has cancelled the operation -------
    if (!result) {
      // console.log("User cancelled the operation");
      app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
  
    // ------- Destructure user inputs -------
    const [multiTag, singleTag, emoji, position, predefined] = result;
    // console.log("User inputs - multiTag:", multiTag, ", singleTag:", singleTag, ", emoji:", emoji, ", position:", position, ", predefined:", predefined);

    // ------- Handle Note Name Modifications -------
    if (emoji) {
      //const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);
  
      let updatedName = note.name;
  
      if (position === "suffix") {
        updatedName = `${note.name} ${emoji}`; // Add emoji as suffix
        // console.log("Updated name with prefix:", updatedName);
      } else { // old version - //} else if (position === "suffix") {
        updatedName = `${emoji} ${note.name}`; // Add emoji as prefix
        // console.log("Updated name with suffix:", updatedName);
      }
  
      await app.setNoteName(note, updatedName); // Update the note name
      // console.log("Note name updated to:", updatedName);
    }
  
    // ------- Add tags to the note if provided -------
    if (multiTag) {
      // Split the multiTag string by commas into an array of tags
      const tagsArray = multiTag.split(',').map(tag => tag.trim()); // Trim spaces around each tag
      
      // Log the separated tags
      // console.log("Multiple tags to be added:", tagsArray);
      
      // Add each tag to the note separately
      for (const tag of tagsArray) {
        if (tag) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tag);
          // console.log("Added tag:", tag);
        }
      }
      
      //return null; // Return an empty string after adding tags
    }

    // ------- Add single tag preferably new to the note if provided -------
    if (singleTag) {
      await app.addNoteTag({ uuid: app.context.noteUUID }, singleTag);
      // console.log("Single tag added:", singleTag);
      //return null;
    }

    // ------- Handle Predefined Modifications -------
    if (!singleTag && !multiTag && !emoji && !position) {
      // const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);

      // Define variables outside of the conditional blocks
      let prefixz;
      let suffixz;
      let multiTagsz;
      let updatedNamez = note.name;
      // console.log("updatedNamez:", updatedNamez);
  
      if (predefined === "1") {
        prefixz = "✅";
        suffixz = "📝";
        multiTagsz = "completed, reviewed";
      }
      else if (predefined === "2") {
        prefixz = "💡";
        multiTagsz = "ideabox, ideas, thinking";
      }
      else if (predefined === "3") {
        prefixz = "🎯";
        suffixz = "✈️";
        multiTagsz = "travel, goals";
      } 
      // More Options can be added as per your Requirements!
      // Example usage of the variables
      // console.log("Prefix:", prefixz);
      // console.log("Suffix:", suffixz);
      // console.log("Multi Tags:", multiTagsz);

      updatedNamez = `${prefixz}${note.name}${suffixz}`; // Add emoji as prefix or suffix
      await app.setNoteName(note, updatedNamez); // Update the note name
      // console.log("Note name updated to:", updatedNamez);
      
      // Split the multiTag string by commas into an array of tags
      const tagsArrayz = multiTagsz.split(',').map(tagz => tagz.trim()); // Trim spaces around each tag
      // console.log("Multiple tags to be added:", tagsArrayz);
      
      // Add each tag to the note separately
      for (const tagz of tagsArrayz) {
        if (tagz) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tagz);
          // console.log("Added tag:", tagz);
        }
      }
      
    }

    return null; // Return an empty string after adding tags
  }, 
/* ----------------------------------- */
	appOption: {
/* ----------------------------------- */
	"Correlation Matrix for Tags": async function (app) {
/* ----------------------------------- */
    const result = await app.prompt("This is the message", {
      inputs: [ 
        { label: "Select the Tags to Filter (leave blank to consider all)", type: "tags", limit: 10 },
        { label: "Format to Download", type: "radio", options: [ { label: "CSV", value: "csv" }, { label: "JSON", value: "json" }, { label: "Array", value: "txt" } ] },
      ] 
    });

	if (!result) {
		app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
		return;
	}
	
	const [ tagNames, downloadType ] = result;
	// console.log("result:",result);
	const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray:",tagsArray);
 
	let notes = [];
	if (tagsArray.length > 0) {
		for (let tag of tagsArray) {
			let taggedNotes = await app.filterNotes({
				tag
			});
			notes = notes.concat(taggedNotes);
		}
	}
	else {
		notes = await app.filterNotes({ });
	}
	// console.log("notes:",notes);
	// Flatten the tags, remove duplicates, and sort the result
	const noteTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();
	// console.log("noteTags:",noteTags);

	// Step 1: Extract the tags from each note and flatten them
	const allTags = notes.map(note => note.tags);

	// Step 2: Get the unique variables (tags)
	const variables = Array.from(new Set(allTags.flat())).sort();

	// Step 3: Initialize a matrix of zeros (for counting pairs)
	const matrix = Array(variables.length).fill(0).map(() => Array(variables.length).fill(0));

	// Step 4: Helper function to increment the count for a pair in the matrix
	const incrementMatrix = (var1, var2) => {
	  const i = variables.indexOf(var1);
	  const j = variables.indexOf(var2);
	  if (i === j) {
		matrix[i][i] += 1; // Only increment once if it's a self pair (same tag)
	  } else {
		matrix[i][j] += 1;
		matrix[j][i] += 1; // Increment both sides for different pairs (symmetrical)
	  }
	};

	// Step 5: Process each combination of tags
	allTags.forEach(combo => {
	  if (combo.length === 1) {
		// If the tag is alone, increment the count for the same tag (self pair)
		incrementMatrix(combo[0], combo[0]);
	  } else {
		// If there are multiple tags, increment counts for each pair
		for (let i = 0; i < combo.length; i++) {
		  for (let j = i + 1; j < combo.length; j++) {
			incrementMatrix(combo[i], combo[j]);
		  }
		}
	  }
	});

	// Output the variables (unique tags) and the matrix
	// console.log('Variables (Tags):', variables);
	// console.log('Matrix:', matrix);	

	// Function to download content in specified format
	const downloadFile = (data, fileName, type) => {
	  const blob = new Blob([data], { type });
	  const link = document.createElement('a');
	  link.href = URL.createObjectURL(blob);
	  link.download = fileName;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	};
	// console.log('download started.');	

    // Function to get current date and time formatted as YYMMDD_HHMMSS
    function getCurrentDateTime() {
        const now = new Date();

        // Format the date and time as per requirement
        const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
        const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');

        return { YYMMDD, HHMMSS };
    }

    // Generate a new note with the results
    const { YYMMDD, HHMMSS } = getCurrentDateTime();

	// Generate file based on downloadType
	const generateDownload = (downloadType) => {
	  let content = '';
	  const fileName = `notes.${downloadType}`;
	  
	  if (downloadType === 'csv') {
		// Generate CSV
		const csvRows = ['Tags,\'' + variables.join(',\'')];
		matrix.forEach((row, i) => {
		  csvRows.push('\'' + variables[i] + ',' + row.join(','));
		});
		content = csvRows.join('\n');
		downloadFile(content, `Correlation matrix (Tags) ${YYMMDD}-${HHMMSS}.csv`, 'text/csv');
		
	  } else if (downloadType === 'json') {
		// Generate JSON
		const jsonObject = {
		  variables: variables,
		  matrix: matrix
		};
		content = JSON.stringify(jsonObject, null, 2);
		downloadFile(content, `Correlation matrix (Tags) ${YYMMDD}-${HHMMSS}.json`, 'application/json');
		
	  } else if (downloadType === 'txt') {
		// Generate Matrix text format (for Array)
		const matrixRows = ['Matrix Representation:'];
		matrix.forEach((row, i) => {
		  matrixRows.push(variables[i] + ' -> ' + row.join(' '));
		});
		content = matrixRows.join('\n');
		downloadFile(content, `Correlation matrix (Tags) ${YYMMDD}-${HHMMSS}.txt`, 'text/plain');
	  } else {
		// console.log('Invalid download type');
	  }
	};
	generateDownload(downloadType);
	// console.log('Finished');
	},
/* ----------------------------------- */
	"Groups Clikcable Links": async function (app) {
/* ----------------------------------- */
	// console.log('Groups (Clikcable Links) Started');
	const groupMarkdown = `
---
### Grouped-folders
- **[Archived](https://www.amplenote.com/notes?group=archived)**: Notes that have been archived or auto-archived.
- **[Vault Notes](https://www.amplenote.com/notes?group=vault)**: Encrypted notes.
- **[Deleted Notes](https://www.amplenote.com/notes?group=deleted)**: Notes that have been deleted in the past 30 days.
- **[Active plugin notes](https://www.amplenote.com/notes?group=plugin)**: Notes that represent currently active plugins.
### Notes-contain-tasks
- **[Task Lists](https://www.amplenote.com/notes?group=taskLists)**: Notes that contain tasks inside them.
### Notes-untagged
- **[Un-tagged](https://www.amplenote.com/notes?group=untagged)**: Notes that are not assigned any tag.
### Shared-notes
- **[Created by me](https://www.amplenote.com/notes?group=created)**: Notes that have been created by the current user.
- **[Shared publicly](https://www.amplenote.com/notes?group=public)**: Notes that have been published to the web via a public URL.
- **[Shared notes](https://www.amplenote.com/notes?group=shared)**: Notes created by anyone that are shared with at least another user.
- **[Notes shared with me](https://www.amplenote.com/notes?group=shareReceived)**: Notes that have been created by others but shared with the current user.
- **[Notes not created by me](https://www.amplenote.com/notes?group=notCreated)**: Notes that have been created by others but shared with the current user.
- **[Notes I shared with others](https://www.amplenote.com/notes?group=shareSent)**: Notes created by the current user and shared with others.
### Creation-date
- **[This week](https://www.amplenote.com/notes?group=thisWeek)**: Notes that have been created some time over the previous 7 days.
- **[Today](https://www.amplenote.com/notes?group=today)**: Notes that have been edited in the current day.
### Low-level-queries
- **[Notes Saving](https://www.amplenote.com/notes?group=saving)**: Notes that have pending changes to push to the server.
- **[Notes Downloading](https://www.amplenote.com/notes?group=stale)**: Notes that have pending changes to pull from the server.
- **[Notes Indexing](https://www.amplenote.com/notes?group=indexing)**: Notes that are currently being indexed for search locally.
---
### Details<!-- {"collapsed":true} -->
This Markdown format presents the data clearly, with **Categories** as headers and each option having a link and description.
**Options** first with **Markdown links**, followed by the **description**, and use **categories** as headers.
**For more details:** [Search queries: tag, filter, and other queries](https://www.amplenote.com/help/search_filter_tags_groups)
`;

	// console.log("groupMarkdown:",groupMarkdown);

    // Group Report
    const groupNoteName = `Group Clickable Links`;
    const groupTagName = ['-reports/-tagger-pro'];
	const groupnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Group_Clickable_Links_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  // console.log("existingUUID:",existingUUID);
	  const newUUID = await app.createNote(groupNoteName, groupTagName);
	  await app.setSetting("Group_Clickable_Links_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	  // console.log("newUUID:",newUUID);
	})();
	// console.log("groupnoteUUID:",groupnoteUUID);
	await app.replaceNoteContent({ uuid: groupnoteUUID }, groupMarkdown);
    await app.navigate(`https://www.amplenote.com/notes/${groupnoteUUID}`);

	},
/* ----------------------------------- */
  }
}