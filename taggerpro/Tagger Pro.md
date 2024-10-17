---
title: Tagger Pro
uuid: 672c22b2-521d-11ef-8c2f-0663d8339c46
version: 805
created: '2024-08-04T10:22:52+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

This plugin customizes a note by modifying its name, adding tags, and applying predefined settings based on user input, handling asynchronous interactions with the application API for seamless updates. It enhances note organization by allowing users to add multiple tags and emojis, making it easier to sort and filter notes based on various criteria such as status, priority, or type. The predefined options offer standardized formatting for users who frequently use similar tags or formats, streamlining the customization process.

\

The intuitive prompt-based interface and asynchronous updates ensure a user-friendly experience and efficient note management. Additionally, the plugin's flexibility and scalability make it adaptable to evolving user needs, providing a practical tool for advanced note organization and customization.

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

### <mark>General - Calling the Plugin - Tagger Pro</mark>

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/c006fe15-93d2-4396-af40-65defc06a560.gif)

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/2c4e0503-b825-4233-9c41-a36c14021a26.png) [^1] 

---

### <mark>General - Calling the Plugin - Tagger Pro - `"ctrl/cmd + o"`</mark>

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/b7de21d5-951c-41a0-8173-11058a738424.png) [^2]

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/1cc7eae9-aee5-471c-8ec1-2afa2b6ee744.png) [^3]

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

This plugin allows users to customize their notes by modifying names, adding tags, and applying predefined settings. It interacts asynchronously with the application API to ensure smooth and responsive updates.

- <mark style="color:#F8D616;">Customize Your Note:<!-- {"cycleColor":"25"} --></mark>

    - The plugin will prompt you with options to customize the note:

    - **Tags Selection:** Choose up to 10 tags to add to the note.

    - **Single Tag**: Type a single tag to add to the note.

    - **Emoji Selection:** Pick an emoji to represent the note's status or type. Choose its position as either a prefix or suffix.

    - **Predefined Options:** Select a predefined sample for quick customization, which includes preset emojis and tags.

- <mark style="color:#F8D616;">Complete Customization:<!-- {"cycleColor":"25"} --></mark>

    - After providing your inputs, the plugin will:

        - Update the note’s name with the selected emoji.

        - Add the specified tags to the note.

        - Apply predefined settings if no other customization is selected.

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/2359ae8d-62d3-4c97-bced-ba5856280fd6.png) [^4]   >>>  ![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/1ee37943-b5dd-4bcf-8e10-58c648463d06.png) [^5]

- <mark style="color:#BBA215;">Correlation Matrix for Tags:<!-- {"cycleColor":"25"} --></mark> 

    - This is based on a feature request - [Link - **Tag Analysis**](https://amplenote.featureupvote.com/suggestions/93051/tag-analysis).

    - It gives you a report of comparative analysis using Correlation Matrix, It give you a count of occurrence two tags have occurred together.

        - You can get his in CSV (Suggested), JSON, Matrix Downloadable formats.

- <mark style="color:#BBA215;">Clickable Links for Groups:<!-- {"cycleColor":"25"} --></mark> 

    - This generates a new notes under the tag`-reports/-tagger-pro`, this gives you easy access to all the Group Filters that are available in Amplenote. Using the reference from [Search queries: tag, filter, and other queries](https://www.amplenote.com/help/search_filter_tags_groups) 

- <mark style="color:#BBA215;">Clickable Links for Tags:<!-- {"cycleColor":"25"} --></mark>

    - This generates a new notes under the tag`-reports/-tagger-pro`, this gives you easy access to all the Tags that are available in your Amplenote. You can reorganize, copy and re-use them where-ever needed. It can help you out in your workflow.

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name<!-- {"cell":{"colwidth":116}} -->|Tagger Pro<!-- {"cell":{"colwidth":647}} -->|
|icon<!-- {"cell":{"colwidth":116}} -->|label<!-- {"cell":{"colwidth":647}} -->|
|description<!-- {"cell":{"colwidth":116}} -->|Type `{Tagger Pro}` in any note to specify and apply a tag (Existing - up to 10, and Non Existing - up to 1), especially useful in Jots Mode where the tag button is hidden, and includes features like user prompts for tags, emoji selection, position selection, and note name modifications.<br /><mark>New in Pro:</mark> It had give you a Correlation Matrix for Tags, Clickable Links for Groups and Tags.<!-- {"cell":{"colwidth":647}} -->|
|instructions|Please fine the Instructions here =  [Tagger Pro - Docs](https://www.amplenote.com/notes/8ee73a24-5229-11ef-8c2f-0663d8339c46) [Tagger Pro - Docs 2](https://www.amplenote.com/notes/2a01db68-8c86-11ef-8f66-ceeb1c0a5b1e) <br />Old Version: [Tagger 2.0](https://www.amplenote.com/notes/47e5a396-8c66-11ef-be52-ceeb1c0a5b1e) <!-- {"cell":{"colwidth":647}} -->|
|setting|Group_Clickable_Links_UUID \[Do not Edit!\]<!-- {"cell":{"colwidth":647}} -->|
|setting|Tag_Clickable_Links_UUID \[Do not Edit!\]<!-- {"cell":{"colwidth":647}} -->|
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
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
    const result = await app.prompt("Select details for Correlation Matrix for Tags", {
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
	"Clickable Links for Groups": async function (app) {
/* ----------------------------------- */
	// console.log('Groups (Clickable Links) Started');
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
	"Clickable Links for Tags": async function (app) {
/* ----------------------------------- */

	// console.log('Tag (Clickable Links) Started');
	let notes = [];
	notes = await app.filterNotes({ });
	// console.log("notes:",notes);
	
	// Step 1: Get unique tags and sort them
	const noteTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

	// Step 2: Create a function to format the tag into a Markdown link
	const formatTagToMarkdownLink = (tag) => {
	  const formattedUrl = `https://www.amplenote.com/notes?tag=${encodeURIComponent(tag.trim())}`; // Keep the leading dash in URL
	  const indentLevel = tag.split('/').length - 1; // Count slashes for indent level
	  const indent = '  '.repeat(indentLevel); // Create indentation
	  return `${indent}- [${tag}](${formattedUrl})`; // Keep the leading dash in the link text
	};

	// Step 3: Create a set to keep track of existing parent tags
	const parentTags = new Set();

	// Step 4: Build the output
	const uniqueMarkdownLinks = new Set(); // Use a Set to avoid duplicates

	noteTags.forEach(tag => {
	  // Split the tag to determine the parent hierarchy
	  const parts = tag.split('/');
	  let parentPath = '';

	  // Create Markdown link for the tag
	  const markdownLink = formatTagToMarkdownLink(tag);
	  
	  // Add the tag link to the unique set
	  uniqueMarkdownLinks.add(markdownLink);
	  
	  // Build the parent path and check for missing parents
	  parts.forEach(part => {
		parentPath += `${part}/`; // Construct parent path
		const trimmedPath = parentPath.slice(0, -1); // Remove trailing slash
		// If parent path doesn't exist, add it to the set
		if (!noteTags.includes(trimmedPath)) {
		  parentTags.add(trimmedPath);
		}
	  });
	});

	// Add parent tags to uniqueMarkdownLinks if they were not initially in noteTags
	parentTags.forEach(parentTag => {
	  uniqueMarkdownLinks.add(formatTagToMarkdownLink(parentTag));
	});

	// Convert the Set to an array and join for output
	const finalMarkdownLinks = Array.from(uniqueMarkdownLinks).join('\n');

	// Print the result
	// console.log(finalMarkdownLinks);

	const tagMarkdown = `
---
${finalMarkdownLinks}
---
### Details<!-- {"collapsed":true} -->
**Caveat:**
- This brings only Tags which are linked to at least one amplenote. (Fetches all the Tags).
- If a Parent Tag does not contain any notes, then I have added a fix, still it does not do its best. 
	- Hence having at least one note attached to all the Tags and in all levels, make sense in this case. Rest assured, should be working well.
**For more details:** [Search queries: tag, filter, and other queries](https://www.amplenote.com/help/search_filter_tags_groups)
`;
// console.log("tagMarkdown:",tagMarkdown);

    // Tag Report
    const tagNoteName = `Tag Clickable Links`;
    const tagTagName = ['-reports/-tagger-pro'];
	const tagnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Tag_Clickable_Links_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  // console.log("existingUUID:",existingUUID);
	  const newUUID = await app.createNote(tagNoteName, tagTagName);
	  await app.setSetting("Tag_Clickable_Links_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	  // console.log("newUUID:",newUUID);
	})();
	// console.log("tagnoteUUID:",tagnoteUUID);
	await app.replaceNoteContent({ uuid: tagnoteUUID }, tagMarkdown);
    await app.navigate(`https://www.amplenote.com/notes/${tagnoteUUID}`);

	// console.log('Finished');
	},
/* ----------------------------------- */
  }
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- July 11th, 2024 - Build the framework and all the basic requirements for this Plugin. 

    - Collected all the necessary codes, templates, and references. 

    - Build the Plugin to handle single tag and multiple tags correctly. Also how to handle new tag and already existing tag. 

    - Fixed all the error handling methods. 

    - Added the feature to prefix and suffix the desired Emoji or Any Text can be added by default.

    - Added the Predefined Template / Format to handle multiple addition in a single click, after be configured in the Code based on users preferences.

- October 17th, 2024

    - Implemented, tested Correlation Matrix for Tags (Was little tricky, as the Correlation Matrix is very known for using multi valuable and giving a statically valid output to understand the change between two variable, here I had to take up the counts for the same two variable and was able to finalize it. Then finding the right pattern to get the count for notes with single tag, was an additional hurdle, handled it).

    - Implemented, tested Clickable Links for Groups (Was simple and straight forward to complete, used reference note markdown).

    - Implemented, tested Clickable Links for Tags (Getting and de-duplicating the tags was fine, but handling different scenarios was the hard part, and getting the indent was also a good learning here. Then the only caveat is all the tags should have a note for this to pick it up and utilize here, especially parent tags, if not note is present, the code creates a dummy link - still not perfect as it drops it at the last).

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Understanding the Requirements~~

- ~~Build the framework~~

    - ~~Lots of emojis + Groupings~~

    - ~~Add prefix and suffixing options~~

    - ~~Error handling~~

    - ~~handle multi tagging array~~

    - ~~handle single tagging along with multi tagging array~~

    - ~~handling errors and cleanup nulls or empty spaces~~

    - ~~adding console logs and testing the requirements~~

    - ~~fix multi tags as single tag issue - for loop~~

    - ~~handling default options for select position~~

    - ~~cleaned up logs for query optimization~~

    - ~~minor tweaks~~

- ~~Testing~~

    - ~~changes to error logs~~

    - ~~handling spaces~~

    - ~~Documentation~~

- Final

    - ~~change log update~~

    - ~~time invested update~~

    - ~~Gifts - how tos~~

    - ~~documentation fixing~~

    - ~~publishing~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Add Tagger to Multiple Notes / A Particular Tag (Exclusion Criteria's - Involved!) - a little risky as multiple notes are involved. - <mark>ON HOLD.</mark>

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[Code Explanation!][^6]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 4h 32m + 5h 29m = 10h 1m \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: Tagger 2.0
    X
    Customize your note
    Select the tags (Max 10) to add to the Note!
    Search for a tag
    Type a Tag to apply (Not Existing\* / Existing) - (\* - Preferred)
    Your tag here
    Select emoji
    Select position
    Prefix
    Predefined Options (Advanced - Check+Modify Code Based on your Spe.
    SUBMIT
    Cancel

[^2]: La
    Tagger Pro:
    Y
    X
    Plugin: Tagger Pro: Correlation Matrix for Tags
    Plugin: Tagger Pro: Clickable Links for Groups
    Plugin: Tagger Pro: Clickable Links for Tags
    Create a new note named Tagger Pro:
    1! to navigate \| e to open \| Tab to toggle task lookup \| ctrito to toggle dialog

[^3]: Tagger Pro
    X
    Select details for Correlation Matrix for Tags
    -Select the Tags to Filter (leave blank to consider all)
    Search for a tag
    Format to Download
    O
    CSV
    O
    JSON
    Array
    SUBMIT
    Cancel

[^4]: label: "Predefined Options (Advanced - Check+Modify Code Based on your Specific Requirments)",
    type: "select",
    options: \[
    { label: "Predefined Sample 1: Completed", value: "1" },
    { label: "Predefined Sample 2: Ideas", value: "2" },
    { label: "Predefined Sample 3: Travel Goals", value: "3" } // More Options can be added as per your Requirements!

[^5]: if (predefined === "1") {
    prefixz = "V ";
    suffixz = "
    multiTagsz = "completed, reviewed";
    F
    else if (predefined === "2") {
    prefixz = "9
    multiTagsz = "ideabox, ideas, thinking";
    }
    else if (predefined === "3") {
    prefixz = "3";
    suffixz = " ";
    multiTagsz = "travel, goals";
    // More Options can be added as per your Requirements!

[^6]: [Code Explanation!]()

    ### Here's a high-level explanation of the code:

    - **Function Definition**: An asynchronous function `insertText` is defined, which takes two parameters: `app` and `noteUUID`.

    - **Find Note**: The function starts by finding a note using the provided `noteUUID`. This is done through the `app.findNote` method.

    - **Prompt for Customization**: The function displays a prompt to the user to customize the note. The prompt includes:

        - An input for selecting multiple tags (up to 10).

        - An input for typing a single tag (either new or existing).

        - A dropdown for selecting an emoji to add to the note.

        - A dropdown to choose whether the emoji should be a prefix or suffix.

    - **Handle Cancellation**: If the user cancels the prompt, an alert is shown, and the function exits early.

    - **Process User Inputs**:

        - The user inputs are de-structured into variables: `multiTag`, `singleTag`, `emoji`, and `position`.

        - If an emoji is selected, the function updates the note's name by adding the emoji as either a prefix or suffix, depending on the user's choice.

    - **Add Tags**:

        - **Multiple Tags**: If multiple tags are provided, they are split into an array, trimmed of extra spaces, and each tag is added to the note individually.

        - **Single Tag**: If a single tag is provided, it is added to the note.

    - **Predefined Options:** Applies predefined modifications based on the coded samples + options. `tag+prefix+suffixs` 

    - **Completion**: The function completes without returning any value.

    In summary, the function allows users to customize a note by updating its name with an emoji, and adding tags to it based on user input from a prompt.

