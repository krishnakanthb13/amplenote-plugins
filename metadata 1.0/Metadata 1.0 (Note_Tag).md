---
title: Metadata 1.0 (Note_Tag)
uuid: af332c24-4064-11ef-b9a5-6ef34fa959ce
version: 702
created: '2024-07-12T21:07:43+05:30'
tags:
  - '-9-permanent'
  - '-loc/amp/mine'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

Hey all this is my second try at the Plugin world!. I am looking into things which can help me do something or contribute something in a meaning full way in my prospective. Well this is first part of 4 Plugins that I have planned to build for myself, as a result shared it with you all will also help me understand how many are on the same boat that I am traveling on.

\

Well having a Graph view is excellent, still having a good old view of the list of items in your inventory, can never beat the good old explorer. As a step toward that, I wanted to start with the basics and roots of this platform, the Name of the Notes and the Tags associated with it, will how can we forget the base on which these both rest on the [Universally Unique Identifier (UUID)][^1]  

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

### <mark>General - Calling the Plugin - Metadata 1.0</mark>

![](https://images.amplenote.com/af332c24-4064-11ef-b9a5-6ef34fa959ce/6917f1aa-85bb-4047-9b68-6821b97aa161.gif)

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/779b31a5-04fe-48dc-9ed3-3a7aca8c73bf.png) [^2]

---

### <mark>Metadata 1.0:</mark> 

### <mark>Tag Selection</mark>

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/40a5cd4a-2c0e-4246-860e-6557ccdaa7e1.gif)

---

### <mark>Typing in Note Name</mark>

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/31c69256-5f10-475f-8eba-14eea1de0aa9.gif)

---

### <mark>Sort by Note Name;  Tags; Tags (Within a Note)</mark>

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/f1df288c-ea77-495f-a9f4-90e0cc94595e.gif)

---

### <mark>Insert / Export Options; Select format \[Mandatory\]</mark>

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/9fd990db-8b08-4fba-9ef7-7fcd452c2a77.gif)

![](https://images.amplenote.com/af332c24-4064-11ef-b9a5-6ef34fa959ce/6546600e-6524-4f12-a868-5857ad06c10a.png) [^3]![](https://images.amplenote.com/af332c24-4064-11ef-b9a5-6ef34fa959ce/9d01945c-930e-43d0-bf1f-5826a5b0b69d.png) [^4]

- <mark style="color:#F8914D;">Published only (Table format)<!-- {"cycleColor":"24"} --></mark> - <mark style="color:#F8D616;">Added the option of selecting the list of Published Notes. Having both the local UUID and the Public URL side by side. (Good for Reviewing purposes!).<!-- {"cycleColor":"25"} --></mark><!-- {"indent":1} -->

    - <mark style="color:#F8914D;">Raw data<!-- {"cycleColor":"24"} --></mark> - <mark style="color:#F8D616;">Gives you Note Name, UUID, Tags.<!-- {"cycleColor":"25"} --></mark>

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### <mark>Overview</mark>

<mark style="color:#9AD62A;">The Meta_1 plugin provides functionality to filter, sort, and export notes based on user-defined criteria. It prompts the user for specific input parameters and generates results accordingly. The results can be inserted into the current note, a new note, or downloaded in various formats.<!-- {"cycleColor":"26"} --></mark>

### <mark>User Input Prompts:</mark> 

### <mark>1. Select Tags to Filter (Max 3)</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Prompts the user to input up to at least three tags for filtering notes. The notes that contain any of these tags will be included in the results.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The filtered notes will only include those that match the specified tags. If no tags are entered, all notes will be considered.

### <mark>2. Type Partial or Full Name of the Note</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Allows the user to filter notes based on a partial or full name match.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The notes will be further filtered to include only those whose names contain the specified string.

### <mark>3. Sort by Note Name</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Provides options to sort the filtered notes by name in ascending or descending order.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The order of the notes in the final result will reflect the selected sorting option.

    - <mark style="color:#F8914D;">**Options**:<!-- {"cycleColor":"24"} --></mark>

        - None (Default)

        - Ascending (ASC)

        - Descending (DESC)

### <mark>4. Sort by Tags</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Offers sorting options for the tags associated with the notes.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The tags within the note will be sorted according to the selected option, affecting the display order in the results.

    - <mark style="color:#F8914D;">**Options**:<!-- {"cycleColor":"24"} --></mark>

        - None (Default)

        - Ascending (ASC)

        - Descending (DESC)

### <mark>5. Sort Tags Alphabetically (within a Note!)</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> A checkbox that, when selected, sorts the tags within each note alphabetically.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> Tags will be listed in alphabetical order for each note in the final output.

### <mark>6. Insert / Export Options (Mandatory)</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Determines how the final results will be outputted: inserted into the current note, a new note, or downloaded in various file formats.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The user will receive the results in the specified format, either in the application or as a downloadable file.

    - <mark style="color:#F8914D;">**Options**:<!-- {"cycleColor":"24"} --></mark>

        - Insert into current note

        - Insert into new note

        - Download as markdown

        - Download as CSV

        - Download as TXT

### <mark>7. Select Format (Mandatory)</mark>

- <mark style="color:#F8914D;">**Description**:<!-- {"cycleColor":"24"} --></mark> Defines the format of the final results. Options include a table format (both names and tags), names only, or tags only.

- <mark style="color:#F8914D;">**Reflection in Final View**:<!-- {"cycleColor":"24"} --></mark> The structure of the final results will follow the selected format, impacting how the data is displayed or downloaded.

    - <mark style="color:#F8914D;">**Options**:<!-- {"cycleColor":"24"} --></mark>

        1. <mark style="color:#65D2AA;">Both (Table format)<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Note Names<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Note Tags<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Untitled Notes (Table format)<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Untagged Notes (Table format)<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Undocumented Notes (w/Hidden-task/s)<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#65D2AA;">Published Notes (Table format)<!-- {"cycleColor":"38"} --></mark>

        1. <mark style="color:#F3DE6C;">Archived - Grouped-folders<!-- {"cycleColor":"36"} --></mark>

        1. <mark style="color:#F3DE6C;">Vault Notes - Grouped-folders<!-- {"cycleColor":"36"} --></mark>

        1. <mark style="color:#F3DE6C;">Deleted Notes - Grouped-folders<!-- {"cycleColor":"36"} --></mark>

        1. <mark style="color:#F3DE6C;">Active plugin notes - Grouped-folders<!-- {"cycleColor":"36"} --></mark>

        1. <mark style="color:#BBE077;">Task Lists - Notes-having-tasks<!-- {"cycleColor":"37"} --></mark>

        1. <mark style="color:#BBE077;">Un-tagged - Notes-untagged<!-- {"cycleColor":"37"} --></mark>

        1. <mark style="color:#87D7E4;">Created by me - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#87D7E4;">Shared publicly - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#87D7E4;">Shared notes - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#87D7E4;">Notes shared with me - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#87D7E4;">Notes not created by me - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#87D7E4;">Notes I shared with others - Shared-notes<!-- {"cycleColor":"39"} --></mark>

        1. <mark style="color:#DA99E0;">This week - Created-date<!-- {"cycleColor":"42"} --></mark>

        1. <mark style="color:#DA99E0;">Today - Created-date<!-- {"cycleColor":"42"} --></mark>

        1. <mark style="color:#E893BD;">Notes Saving - Low-level-queries<!-- {"cycleColor":"43"} --></mark>

        1. <mark style="color:#E893BD;">Notes Downloading - Low-level-queries<!-- {"cycleColor":"43"} --></mark>

        1. <mark style="color:#E893BD;">Notes Indexing - Low-level-queries<!-- {"cycleColor":"43"} --></mark>

        1. <mark style="color:#65D2AA;">Raw data<!-- {"cycleColor":"38"} --></mark>

### <mark>Internal Processing</mark>

1. <mark style="color:#F8D616;">**Capturing User Input**:<!-- {"cycleColor":"25"} --></mark> The user's input is captured and stored in variables. If the user cancels the operation, an alert is shown and the process stops.

1. <mark style="color:#F8D616;">**Fetching Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are fetched based on the provided tags. If no tags are provided, all notes are fetched.

1. <mark style="color:#F8D616;">**Filtering Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are filtered by name if a name filter is specified. Duplicate notes are removed.

1. <mark style="color:#F8D616;">**Sorting Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are sorted by name and tags based on the selected options.

1. <mark style="color:#F8D616;">**Generating Results**:<!-- {"cycleColor":"25"} --></mark> Results are generated in the selected format (table, names only, tags only) and sorted accordingly.

1. <mark style="color:#F8D616;">**Creating Output**<!-- {"cycleColor":"25"} --></mark>: The final results, along with a summary of the input selections, are prepared in text and CSV formats. A filename is generated based on the current date and time.

1. <mark style="color:#F8D616;">**Outputting Results**:<!-- {"cycleColor":"25"} --></mark> Results are either inserted into the current note, a new note, or downloaded as a markdown, CSV, or TXT file based on the user's choice.

[Additional Details!][^5]  - <mark style="color:#9AD62A;">The `Meta_1` plugin is a powerful tool for filtering, sorting, and exporting notes based on user-defined criteria. By following the provided prompts and selecting the desired options, users can easily manage and output their notes in various formats.<!-- {"cycleColor":"26"} --></mark>

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name<!-- {"cell":{"colwidth":116}} -->|Meta_1<!-- {"cell":{"colwidth":572}} -->|
|icon<!-- {"cell":{"colwidth":116}} -->|account_tree<!-- {"cell":{"colwidth":572}} -->|
|description<!-- {"cell":{"colwidth":116}} -->|Get a dump of your <mark style="color:#F8D616;">Note Names<!-- {"cycleColor":"25"} --></mark>, and their <mark style="color:#F8D616;">Tags.<!-- {"cycleColor":"25"} --></mark> <mark style="color:#FFFFFF;">In various Formats and Methods, to cater best of your requirements. With extensive ways to choose and filter the data that you are looking for.<!-- {"cycleColor":"55"} --></mark><!-- {"cell":{"colwidth":572}} -->|
|instructions|Please fine the Instructions here =  [Metadata 1.0 Docs](https://www.amplenote.com/notes/c46c5e60-4066-11ef-832f-26e37c279344) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
(() => {
    var Meta_1 = {
        insertText: {
            // Function to insert text based on user inputs
            "Name_Tag": async function(app) {
                try {
                    // Prompting the user to enter filter criteria
                    const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
                        inputs: [
                            // Tag selection input
                            {
                                label: "Select Tags to filter (Max 10)", type: "tags", limit: 10, placeholder: "Enter tag/'s' (Max 10)"
                            },
                            // Name filter input
                            {
                                label: "Type Partial or Full name of the Note", type: "string", placeholder: "Enter Partial or Full name"
                            },
                            // Sort by note name option
                            {
                                label: "Sort by Note Name", type: "select", options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            // Sort by tags option
                            {
                                label: "Sort by Tags", type: "select", options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            // Alphabetically sort tags within a note
                            {
                                label: "Sort tags alphabetically (within a Note!)", type: "checkbox"
                            },
                            // Insert / Export options
                            {
                                label: "Insert / Export options (Mandatory)", type: "select", options: [
                                    { label: "Insert into current note", value: "current_note" },
                                    { label: "Insert into new note", value: "new_note" },
                                    { label: "Download as markdown", value: "download_md" },
                                    { label: "Download as CSV", value: "download_csv" },
                                    { label: "Download as TXT", value: "download_txt" }
                                ]
                            },
                            // Format selection option
                            {
                                label: "Select format (Mandatory)", type: "select", options: [
                                    { label: "Both (Table format)", value: "both_table" },
                                    { label: "Note Names", value: "names_only" },
                                    { label: "Note Tags", value: "tags_only" },
                                    { label: "Untitled Notes (Table format)", value: "empty_names_only" },
                                    { label: "Untagged Notes (Table format)", value: "empty_tags_only" },
                                    { label: "Undocumented Notes (w/Hidden-task/s)", value: "empty_content_only" },
                                    { label: "Published Notes (Table format)", value: "published_only" },
                                    { label: "Archived - Grouped-folders", value: "archived" },
                                    { label: "Vault Notes - Grouped-folders", value: "vault" },
                                    { label: "Deleted Notes - Grouped-folders", value: "deleted" },
                                    { label: "Active plugin notes - Grouped-folders", value: "plugin" },
                                    { label: "Task Lists - Notes-having-tasks", value: "taskLists" },
                                    { label: "Un-tagged - Notes-untagged", value: "untagged" },
                                    { label: "Created by me - Shared-notes", value: "created" },
                                    { label: "Shared publicly - Shared-notes", value: "public" },
                                    { label: "Shared notes - Shared-notes", value: "shared" },
                                    { label: "Notes shared with me  - Shared-notes", value: "shareReceived" },
                                    { label: "Notes not created by me - Shared-notes", value: "notCreated" },
                                    { label: "Notes I shared with others - Shared-notes", value: "shareSent" },
                                    { label: "This week - Created-date", value: "thisWeek" },
                                    { label: "Today - Created-date", value: "today" },
                                    { label: "Notes Saving - Low-level-queries", value: "saving" },
                                    { label: "Notes Downloading - Low-level-queries", value: "stale" },
                                    { label: "Notes Indexing - Low-level-queries", value: "indexing" },
                                    { label: "Raw data", value: "raw_data" }
                                ]
                            }
                        ]
                    });

                    // Assert the result is an array
                    // expect(result).toBeInstanceOf(Array);
                    // console.log("Prompt result:", result);
                    // If the result is falsy, the user has canceled the operation
                    if (!result) {
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }
                    // Destructuring user inputs
                    const [tagNames, nameFilter, sortOption, sortTagOption, sortTags, insertOption, insertFormat] = result;
                    // Ensure at least one of the required variables is selected
                    if (!tagNames && !nameFilter && !sortOption && !sortTagOption && !sortTags) {
                        app.alert("Note: At least one of Optional Items (tagNames, nameFilter, sortOption, sortTagOption, or sortTags) must be selected");
                        return;
                    }
                    // console.log("Destructured inputs:", {tagNames, nameFilter, sortOption, sortTagOption, sortTags, insertOption, insertFormat });
                    // Ensure both insertOption and insertFormat are selected
                    if (!insertOption || !insertFormat) {
                        app.alert("Note: Both insertOption and insertFormat (Mandatory Fields) must be selected");
                        return;
                    }
                    app.alert("Working on it... This may take a few minutes for large notebooks. The app might seem unresponsive but we're working on it.");
                    // Split tags into an array
                    const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
                    let notes = [];
                    // Filter notes based on tags
                    if (tagsArray.length > 0) {
                        for (let tag of tagsArray) {
                            let taggedNotes = await app.filterNotes({
                                tag
                            });
                            notes = notes.concat(taggedNotes);
                        }
                    }
                    else {
                        notes = await app.filterNotes({});
                    }
                    // console.log("Filtered notes:", notes);
                    // Remove duplicate notes
                    notes = notes.filter((note, index, self) => index === self.findIndex((n) => n.uuid === note.uuid));
                    // Assign default name to notes with null or empty name
                    notes = notes.map(note => {
                        if (!note.name) {
                            note.name = "Untitled Note"; // Assign a default name for empty notes
                        }
                        return note;
                    });
                    // console.log("Notes after removing duplicates:", notes);
					
                     // Sort the final list of results based on the selected tag sorting option
                    if (sortTagOption === "asc") {
                        notes.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
                    }
                    else if (sortTagOption === "desc") {
                        notes.sort((a, b) => b.tags.join(", ").localeCompare(a.tags.join(", ")));
                    }
                    // Further filter notes by name if a name filter is provided
                    // if (nameFilter) {
                        // notes = notes.filter(note => note.name.includes(nameFilter));
                    // }
					if (nameFilter) {
						// Convert the filter term to lowercase
						const lowerCaseFilter = nameFilter.toLowerCase();

						// Filter notes with case-insensitive comparison
						notes = notes.filter(note => 
							note.name && note.name.toLowerCase().includes(lowerCaseFilter)
						);
					}
                    // Sort notes by name based on the user's selection
                    if (sortOption === "asc") {
                        notes.sort((a, b) => a.name.localeCompare(b.name));
                    }
                    else if (sortOption === "desc") {
                        notes.sort((a, b) => b.name.localeCompare(a.name));
                    }
                    // console.log("Sorted notes:", notes);
                    
                    // Fetch tags for each note and generate results
                    const self = this;
                    let results = new Set();
                    let publicResults = [];
                    for (let note of notes) {
                        let tags = note.tags;
                        // Sort tags within the note if the checkbox is checked
                        if (sortTags) {
                            tags.sort((a, b) => a.localeCompare(b));
                        }
                        let noteLink = self._createMDLinkFromNoteHandle(note);
                        let tagString = tags.join(", ");
                        if (insertFormat === "both_table") {
                            results.add(`| ${noteLink} | ${tagString} |`);
                        }
                        else if (insertFormat === "names_only") {
                            results.add(noteLink);
                        }
                        else if (insertFormat === "tags_only") {
                            tags.forEach(tag => results.add(tag));
							results = new Set([...results].filter(tag => tag != null).sort((a, b) => a.localeCompare(b)));
							// tags.filter(tag => tag != null).sort((a, b) => a.localeCompare(b)).forEach(tag => results.add(tag));
                        }
                        else if (insertFormat === "published_only") {
                            const publicURL = await app.getNotePublicURL({
                                uuid: note.uuid
                            });
                            if (publicURL) {
                                publicResults.push(`| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | [${publicURL}](${publicURL}) |`);
                            }
                        }
                        else if (insertFormat === "raw_data") {
                            results.add(`${note.name} | ${note.uuid} | ${tagString}`);
                            // This is an another optional way to get the raw data!
                            //} else if (insertFormat === "raw_data") {
                            //results.add(`Note Name: ${note.name}`);
                            //results.add(`UUID: ${note.uuid}`);
                            //results.add(`Tags: ${tagString}`);
                        }
                        else if (insertFormat === "empty_names_only") {
                            // Filter and include notes with the name "Default Note Name (Empty)"
                            if (note.name === "Untitled Note") {
                                results.add(`| ${noteLink} | ${tagString} |`);
                            }
                        }
                        else if (insertFormat === "empty_tags_only") {
                            // If the tags are empty or null, add the note to results
                            if (!tagString) {
                                results.add(`| ${noteLink} | ${tagString} |`);
                            }
                        }
                        else if (insertFormat === "empty_content_only") {
							
							// Filter notes based on empty notes + tags	
							let notesEmptyNames = new Set();
							let notesE = tagsArray.length > 0 ? (await Promise.all(tagsArray.map(tag => app.filterNotes({
								tag
							})))).flat() : await app.filterNotes({
								group: "^vault"
							});
							//notesE.sort((a, b) => a.name.localeCompare(b.name));
							if (nameFilter) {const lowerCaseFilter = nameFilter.toLowerCase(); notesE = notesE.filter(note => note.name && note.name.toLowerCase().includes(lowerCaseFilter) ); }
							notesE.sort((a, b) => {
								const nameA = a.name || ""; // Use an empty string if a.name is null or undefined
								const nameB = b.name || ""; // Use an empty string if b.name is null or undefined

								return nameA.localeCompare(nameB);
							});
							for (const noteHandle of notesE) {
								let noteContent;
								try {
									noteContent = await app.getNoteContent(noteHandle);
									if (noteContent.includes("# Hidden tasks")) continue;
									noteContent = noteContent.slice(0, noteContent.indexOf('# Completed tasks<!-- {"omit":true} -->'));
									if (noteContent.trim() === "" || !noteContent.match(/[^\s\\]/mg)) {
										notesEmptyNames.add(`- [${noteHandle.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandle.uuid})`);
									}
								}
								catch (err) {
									if (err instanceof TypeError) {
										continue;
									}
								}
							}
							
                            results = new Set(notesEmptyNames);
                        }
                        else {
							
							// Filter notes based on Groups + tags
							let notesGroupNames = new Set();
							let notesGroup = insertFormat;
							// Filter notes based on empty notes + tags
							let notesG = tagsArray.length > 0 ? (await Promise.all(tagsArray.map(tag => app.filterNotes({
								tag
							})))).flat() : await app.filterNotes({
								group: notesGroup
							});
							//notesG.sort((a, b) => a.name.localeCompare(b.name));
							if (nameFilter) {const lowerCaseFilter = nameFilter.toLowerCase(); notesG = notesG.filter(note => note.name && note.name.toLowerCase().includes(lowerCaseFilter) ); }
							notesG.sort((a, b) => {
								const nameA = a.name || ""; // Use an empty string if a.name is null or undefined
								const nameB = b.name || ""; // Use an empty string if b.name is null or undefined

								return nameA.localeCompare(nameB);
							});
							for (const noteHandleG of notesG) {
								notesGroupNames.add(`- [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid})`);
							}
							
                            results = new Set(notesGroupNames);
                        }
                    }
					// console.log("Sorted notes:", notes);
                    // console.log("Sorted notesE:", notesE);
                    // console.log("Sorted notesG:", notesG);
                    // console.log("Sorted notesGroupNames:", notesGroupNames);
                    // console.log("Empty Notes Names", notesEmptyNames);
					
                    // Assert results is an array
                    // expect(results).toBeInstanceOf(Array);
                    // console.log("Generated results:", results);
                    results = Array.from(results);
                    // console.log("Generated results Array:", results);
                    // Generate the final text, CSV, and TXT content
                    let resultText;
                    let resultCSV;
                    if (insertFormat === "both_table" || insertFormat === "empty_names_only" || insertFormat === "empty_tags_only") {
                        resultText = "| Note Name | Tags |\n|---|---|\n" + results.join("\n");
                        resultCSV = "Note Name,Tags\n" + results.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let tags = parts[2];
                            return `"${name.replace(/"/g, '""')}","${tags.replace(/"/g, '""')}`;
                        }).join("\n");
                    }
                    else if (insertFormat === "published_only") {
                        resultText = "| Notes | Public URL |\n|---|---|\n" + publicResults.join("\n");
                        resultCSV = "Notes,Public URL\n" + publicResults.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let url = parts[2];
                            return `"${name.replace(/"/g, '""')}", "${url.replace(/"/g, '""')}"`;
                        }).join("\n");
                    }
                    else if (insertFormat === "raw_data") {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    }
                    else {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    }
                    // Assert resultText and resultCSV are strings
                    //expect(typeof resultText).toBe('string');
                    // console.log("Result text content:", resultText);
                    //expect(typeof resultCSV).toBe('string');
                    // console.log("Result CSV content:", resultCSV);
                    // Generate the filename based on the current date and time
                    const now = new Date();
                    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
                    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
                    const filename = `Metadata_1.0_Report_${YYMMDD}_${HHMMSS}`;
                    // Generate the summary of input selections
                    const inputSummary = `
### Input Selections:
- Tags to filter: ${tagNames || "None"}
- Note name filter: ${nameFilter || "None"}
- Sort by name: ${sortOption || "None"}
- Sort tags by name: ${sortTagOption || "None"}
- Sort tags alphabetically within a Note: ${sortTags ? "Yes" : "No"}
- Insert option: ${insertOption}
- Format to insert: ${insertFormat}
- Filename: ${filename}
`;
                    // Append the summary to the result text
                    resultText += `\n\n${inputSummary}`;
                    resultCSV += `\n\n${inputSummary.replace(/[\n]/g, "")}`;
                    // Assert inputSummary is a string
                    //expect(typeof inputSummary).toBe('string');
                    // console.log("Input summary:", inputSummary);
                    // Perform actions based on the insert option
                    if (insertOption === "current_note") {
                        await app.context.replaceSelection(resultText);
                        // console.log("Inserted text into current note.");
                    }
                    else if (insertOption === "new_note") {
                        let noteUUID = await app.createNote(`${filename}`, ["metadata-reports"]);
                        await app.insertContent({
                            uuid: noteUUID
                        }, resultText);
                        // console.log("Inserted text into new note with UUID:", noteUUID);
                    }
                    else if (insertOption === "download_md") {
                        let blob = new Blob([resultText], {
                            type: "text/markdown;charset=utf-8"
                        });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.md`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        // console.log("Downloaded Markdown file:", `${filename}.md`);
                    }
                    else if (insertOption === "download_csv") {
                        let blob = new Blob([resultCSV], {
                            type: "text/csv;charset=utf-8"
                        });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.csv`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        // console.log("Downloaded CSV file:", `${filename}.csv`);
                        // console.log("Downloaded CSV file:", `${resultCSV}`);
                    }
                    else if (insertOption === "download_txt") {
                        let blob = new Blob([resultText], {
                            type: "text/plain;charset=utf-8"
                        });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        // console.log("Downloaded TXT file:", `${filename}.txt`);
                        // console.log("Downloaded CSV file:", `${resultText}`);
                    }
                    app.alert("Results Generated and Pasted/Downloaded Successfully!");
                }
                catch (error) {
                    app.alert(String(error));
                }
            }
        },
        // Function to create Markdown link from note handle
        _createMDLinkFromNoteHandle(noteHandle) {
            //expect(noteHandle).toBeDefined();
            //expect(noteHandle).toHaveProperty('name');
            //expect(noteHandle).toHaveProperty('uuid');
            // console.log("Creating Markdown link for note:", noteHandle);
            return `[${noteHandle.name}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
        },
    };
    // Assert that Meta_1 is an object
    //expect(typeof Meta_1).toBe('object');
    // console.log("Meta_1 object definition:", Meta_1);
    var plugin_default = Meta_1;
    return Meta_1;
})()
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- July 11th, 2024 - Built the skeleton, the search features and the prompt manager and respective backend calling and place holders, sorting by notes, list and tables formats, handling data.

- July 12th, 2024 - Built the sort for tags, within the group of tags, different exporter functions and notes, tags separately list feature.

- July 13th, 2024 - Added the option of selecting the list of Published Notes. Having both the local UUID and the Public URL side by side. (Good for Reviewing purposes!). Also Added Raw Data dump (Contains note name, uuid, tags).

- July 15th, 2024 - Added the Proper Alert pop up window to notify what is exactly been missed out by the user during the input selection!

- July 16th, 2024 - Formatted and added comment to the code base for better readability and aesthetics.

- July 22nd, 2024 - Added Group Functions, after some tweaks, was able to make it work fine. Move resource intensive to work only when that option is selected. Added sorting, name and tag filtering to the Group Based execution. Added some default formatting for better viewing experience and readability for text and csv separately.

- July 31st, 2024 - Tested all the Features, Options and also validated few of the Items. Works properly as expected.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Bring in all the possible inputs selection~~

    - ~~Understand its input criteria + result format~~

- ~~Main~~

    - ~~Bring Tags of Notes \[Many to One\]~~

    - ~~Bring Notes of Tags \[Many to One\]~~

        - ~~Build based on Notes Names - as we can get the UUID \[One to One > One to Many\]~~

- ~~Have a alert when cancelled~~

- ~~Handle empty tags and names~~

- ~~Handle duplication in notes and tags \[Notes names, will not have due to the presence of UUID\]~~

- ~~Apply filtering partly and fully to the names (like condition)~~

- ~~Sort confusion - Fixed~~

    - ~~Sort note names - A, D, N - For final report~~

    - ~~Sort tag names - A, D, N - For final report~~

    - ~~Sort tag - for each notes - Y, N~~

- ~~Build Text and CSV - templates~~

    - ~~Build the structure~~

    - ~~Handle commas in tags \[multiple ones separately - double quotes\]~~

- ~~File name structuring - nomenclature~~

- ~~Final touch - summary of the selected input fields.~~

    - ~~Append it~~

-  ~~Handling more than 3 tag selections. \[Popping out of the window, unable to select the next tag, Reach out!\]~~

- ~~Add Published Notes Listing~~

- ~~Add Raw data dump~~

- ~~Add alert if any necessary fields are left empty!~~

- ~~Final Formating!~~

- ~~Group functionality~~

    - ~~with sorting, name and tag filtering~~

    - ~~Formatting~~

- ~~Testing July 31st, 2024 (13:03:09)~~ 

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Metadata 2.0, Metadata 3.0, Metadata Ultimatum

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[Code Explanation!][^6] For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 10h 45m + 5h 48m + 6h 10m +  = Totaling up to 22+h. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

---

\

 

[^1]: [Universally Unique Identifier (UUID)]()

    A Universally Unique Identifier (UUID) is a 128-bit label used for information in computer systems. The term Globally Unique Identifier (GUID) is also used, mostly in Microsoft systems. Universally unique identifier.

[^2]: " Meta_1
    X
    Enter your filter criteria (Anyone or Both \[Name_Tag\]!)
    Select lags to filter (Max 3)
    Search for a tag
    Type Partial or Full name of the Note
    Enter Partial or Full name
    Sort by Note Name
    None (Default)
    Sort by Tags
    None (Default)
    Sort tags alphabetically (within a Note!)
    Insert / Export options (Mandatory)
    Select format (Mandatory)
    SUBMIT
    Cancel

[^3]: Both (Table format)
    Note Names
    Note Tags
    Untitled Notes (Table format)
    Untagged Notes (Table format)
    Undocumented Notes (w/Hidden-task/s)
    Published Notes (Table format)
    Archived - Grouped-folders
    Vault Notes - Grouped-folders
    Deleted Notes - Grouped-folders
    Active plugin notes - Grouped-folders
    Task Lists - Notes-having-tasks

[^4]: Un-tagged - Notes-untagged
    Created by me - Shared-notes
    Shared publicly - Shared-notes
    Shared notes - Shared-notes
    Notes shared with me - Shared-notes
    Notes not created by me - Shared-notes
    Notes I shared with others - Shared-notes
    This week - Created-date
    Today - Created-date
    Notes Saving - Low-level-queries
    Notes Downloading - Low-level-queries
    Notes Indexing - Low-level-queries

[^5]: [Additional Details!]()

    This code is a self-invoking function that defines and returns an object `Meta_1` with functionalities for inserting text based on user inputs, mainly designed for an app that handles notes. Here's a high-level explanation:

    - **Prompt User for Input**:

        - The function `Name_Tag` is defined within `Meta_1` to prompt the user to input various criteria such as tags to filter, note name, sorting options, and insertion/export options.

        - The user inputs are collected through a prompt with multiple input fields, including tags, note name, sorting preferences, and format options.

    - **Input Validation**:

        - After collecting the inputs, the function checks if the required inputs are provided.

        - If any mandatory fields are missing, the function alerts the user and stops further execution.

    - **Filtering and Sorting Notes**:

        - The function filters notes based on the provided tags and name filter.

        - It removes duplicate notes and assigns a default name ("Untitled Note") to notes with empty names.

        - Notes are sorted based on the provided sorting options for note names and tags.

    - **Generating Results**:

        - Based on the selected format, the function generates the results in different formats (e.g., table format, names only, tags only, etc.).

        - It creates markdown links for the notes and formats the results accordingly.

    - **Output Handling**:

        - Depending on the user's choice, the results are either inserted into the current note, a new note, or downloaded in various file formats (Markdown, CSV, TXT).

        - The function constructs a filename based on the current date and time for downloaded files.

        - It appends a summary of the user inputs to the generated result text.

    - **Error Handling**:

        - The function includes try-catch blocks to handle any errors that occur during execution and alerts the user if any error is encountered.

    - **Utility Function**:

        - The `_createMDLinkFromNoteHandle` function creates a Markdown link from a note handle, which is used to generate links to the notes in the results.

    Overall, the code is designed to interact with an app that manages notes, allowing users to filter, sort, and export note information based on their inputs and preferences.

[^6]: [Code Explanation!]()

    Sure! Here's a high-level explanation of the provided code:

    1\.  <mark>Initialization</mark> : The code defines a self-executing function (IIFE) that creates an object Meta_1 with various properties and methods.

    2\.  <mark>User Prompt</mark> : The insertText.Name_Tag method within Meta_1 prompts the user to input criteria for filtering and sorting notes. This includes selecting tags, entering a partial or full note name, choosing sorting options, and specifying how to insert or export the results.

    3\.  <mark>Processing User Input</mark> : The method captures the user's input and processes it. If the user cancels the operation, an alert is shown, and the process stops.

    4\.  <mark>Fetching and Filtering Notes</mark> : Based on the user's input, the code fetches notes that match the selected tags and name filter. It then removes duplicate notes and sorts them according to the specified criteria.

    5\.  <mark>Generating Results</mark> : The method generates a set of results, either in table format, names only, or tags only, depending on the user's choice. It sorts the final list of results by tags if requested.

    6\.  <mark>Creating Output</mark> : The code creates text, CSV, and filename based on the current date and time. It also summarizes the user's input selections.

    7\.  <mark>Inserting or Exporting Results</mark> : Depending on the user's choice, the results are either inserted into the current note, a new note, or downloaded as a markdown file, CSV, or TXT file. 

    8\.  <mark>Completion</mark> : Once the results are generated and either inserted or downloaded, an alert is shown to inform the user of the successful operation.

    9\.  <mark>Utility Function</mark> : A utility function _createMDLinkFromNoteHandle generates a markdown link from a note handle.

    10\.  <mark>Return Statement</mark> : The Meta_1 object is returned and used as the default export of the plugin.

    This code effectively integrates user input to filter, sort, and output notes in various formats, providing flexibility in how the user wants to handle the filtered data.

