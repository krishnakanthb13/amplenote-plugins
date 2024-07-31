---
title: Metadata 1.0 (Note_Tag)+New
uuid: c7b6cc6a-46fe-11ef-aabb-26e37c279344
version: 440
created: '2024-07-21T06:45:56+05:30'
tags:
  - '-1-working'
  - '-loc/amp/testing'
---

| | |
|-|-|
|name|Meta_1+New|
|icon|account_tree|
{Meta_1+New: Name_Tag}

- Amplenote Meta data Upgraded Version!  - <!-- {"indent":1} -->

    - \[17:12:24\]<!-- {"indent":2} -->

        - ~~Figured out how to use group function~~<!-- {"indent":3} -->

            - ~~Just made some tweaks and its working perfectly fine!~~<!-- {"indent":4} -->

            - ~~Move the outside code for undocumented notes and also group filters applied into the below if function, so that it will be executed only some specific times.~~

                - ~~It works, but one problem, the issue is I immediately went to the next thing in line of sorting things, and now the plugins are not working, may be some kind of connectivity issue on the amplenote side! - \[18:27:52\]~~

                - ~~Will wait~~

                - ~~You try out installing your plugin and see what happens. Give install multiple times.~~ Not working as expected!

            - ~~Add If for both the code blocks to avoid slowness and unnecessary processing, if else if else if, keep the tag out side of required. Try to bring in name and tag filters in too. <mark style="color:#F8914D;">This didn't work as expected. Need to see options.<!-- {"cycleColor":"24"} --></mark>~~

            - <mark style="color:#F8D616;">Tries<!-- {"cycleColor":"25"} --></mark>

                - ~~Just get the notes and send it to the variable, then use the function and then get the md version and get the details for the other two parts of the code also.~~ 

                - ~~Add sorting to the others two parts of the code also.~~

                - ~~Add all the groups options to it and test it,~~ 

                - ~~Add tags too all, if possible~~

                - ~~Add indentation~~  July 22nd, 2024 (20:07:47)

                - July 22nd, 2024: Added Group Functions, after some tweaks, was able to make it work fine. Move resource intensive to work only when that option is selected. Added sorting, name and tag filtering to the Group Based execution. Added some default formatting for better viewing experience and readability for text and csv separately.

            - Full Testing

> { label: "Both (Table format)", value: "both_table" }, // Tested - OK!
>
> { label: "Note Names", value: "names_only" }, // Tested - OK!
>
> { label: "Note Tags", value: "tags_only" }, // Tested - OK!
>
> { label: "Untitled Notes (Table format)", value: "empty_names_only" }, // Tested - OK!
>
> { label: "Untagged Notes (Table format)", value: "empty_tags_only" }, // Tested - OK! // Untagged - Slow and More Resource Intensive (Checks for each UUID for Public URL)
>
> { label: "Undocumented Notes (w/Hidden-task/s)", value: "empty_content_only" }, // Tested - OK! - Best works when tag or name or filtering options are given!
>
> { label: "Published Notes (Table format)", value: "published_only" }, // Tested - OK! // Published - Slow and More Resource Intensive (Checks for each UUID for Public URL)
>
> { label: "Archived - Grouped-folders", value: "archived" }, // Tested - OK!
>
> { label: "Vault Notes - Grouped-folders", value: "vault" }, // Tested - OK!
>
> { label: "Deleted Notes - Grouped-folders", value: "deleted" }, // Tested - OK!
>
> { label: "Active plugin notes - Grouped-folders", value: "plugin" }, // Tested - OK!
>
> { label: "Task Lists - Notes-having-tasks", value: "taskLists" }, // Tested - OK!
>
> { label: "Un-tagged - Notes-untagged", value: "untagged" }, // Tested - OK!  // Untagged - Fast and Less Resource Intensive (Checks for internal tagging / boolean)
>
> { label: "Created by me - Shared-notes", value: "created" }, // Tested - OK!
>
> { label: "Shared publicly - Shared-notes", value: "public" }, // Published - Fast and Less Resource Intensive (Checks for internal tagging / boolean)
>
> { label: "Shared notes - Shared-notes", value: "shared" }, // Tested - OK!
>
> { label: "Notes shared with me  - Shared-notes", value: "shareReceived" }, // Tested - OK!
>
> { label: "Notes not created by me - Shared-notes", value: "notCreated" }, // Tested - OK!
>
> { label: "Notes I shared with others - Shared-notes", value: "shareSent" }, // Tested - OK!
>
> { label: "This week - Created-date", value: "thisWeek" }, // Tested - OK! // Bring in few notes from earlier dates as well! modified date or Created date ??? - s. Task
>
> { label: "Today - Created-date", value: "today" }, // Tested - OK! // Bring in few notes from earlier dates as well! modified date or Created date ??? - s. Task
>
> { label: "Notes Saving - Low-level-queries", value: "saving" }, // Tested - OK!
>
> { label: "Notes Downloading - Low-level-queries", value: "stale" }, // Tested - OK!
>
> { label: "Notes Indexing - Low-level-queries", value: "indexing" }, // Tested - OK!
>
> { label: "Raw data", value: "raw_data" } // Tested - OK!

- ~~Added sort for tags only option~~<!-- {"indent":4} -->

    - ~~Added date time stamp to the newly created note~~<!-- {"indent":4} -->

        - ~~Group Options Not working~~<!-- {"indent":4} -->

            - ~~Deleted! // Tested - OK! - its working fine when tested on~~ July 31st, 2024 (12:22:26)<!-- {"indent":5} -->

                - ~~Find out the options that are not working and disable them for now!~~<!-- {"indent":6} -->

            - ~~Cleaning up the code!~~ July 31st, 2024 (13:04:01)

            - ~~Documentation~~  - \[13:20:46\]

                - [~~https://chatgpt.com/c/e7d360d8-3a11-4f5a-820d-6ee6be1d9a9f~~](https://chatgpt.com/c/e7d360d8-3a11-4f5a-820d-6ee6be1d9a9f) ~~tried to get a new version of the documentation, but just added few modifications to the existing docs~~ \[13:22:40\]  [Metadata 1.0 Docs](https://www.amplenote.com/notes/c46c5e60-4066-11ef-832f-26e37c279344) 

            - ~~New Gifs (Only for updated ones)  just updated the changed part, rest kept it the same. Pasted as images.~~ \[13:21:17\]

            - ~~Publish~~ \[13:21:26\]

            - ~~Merge latest updates from .js to check testing.js and log testing.js using Meld. I have all the thing is one file, that enough!~~ \[13:23:20\]

            - ~~Then Email! - handled in~~    \[13:23:58\] [July 31st, 2024](https://www.amplenote.com/notes/5ead472e-4e85-11ef-aa09-6ef34fa959ce) 

\

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
                    // expect(typeof resultText).toBe('string');
                    // console.log("Result text content:", resultText);
                    // expect(typeof resultCSV).toBe('string');
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
                    // expect(typeof inputSummary).toBe('string');
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
            // expect(noteHandle).toBeDefined();
            // expect(noteHandle).toHaveProperty('name');
            // expect(noteHandle).toHaveProperty('uuid');
            // console.log("Creating Markdown link for note:", noteHandle);
            return `[${noteHandle.name}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
        },
    };
    // Assert that Meta_1 is an object
    // expect(typeof Meta_1).toBe('object');
    // console.log("Meta_1 object definition:", Meta_1);
    var plugin_default = Meta_1;
    return Meta_1;
})()
```

---

\