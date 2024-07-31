(() => {
    const Meta_1 = {
        insertText: {
            // Function to insert text based on user inputs
            "Name_Tag": async function(app) {
                try {
                    // Prompting the user to enter filter criteria
                    const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
                        inputs: [
                            // Tag selection input
                            {
                                label: "Select Tags to filter (Max 10)",
                                type: "tags",
                                limit: 10,
                                placeholder: "Enter tag/'s' (Max 10)"
                            },
                            // Name filter input
                            {
                                label: "Type Partial or Full name of the Note",
                                type: "string",
                                placeholder: "Enter Partial or Full name"
                            },
                            // Sort by note name option
                            {
                                label: "Sort by Note Name",
                                type: "select",
                                options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            // Sort by tags option
                            {
                                label: "Sort by Tags",
                                type: "select",
                                options: [
                                    { label: "None (Default)", value: "" },
                                    { label: "Ascending (ASC)", value: "asc" },
                                    { label: "Descending (DESC)", value: "desc" }
                                ]
                            },
                            // Alphabetically sort tags within a note
                            {
                                label: "Sort tags alphabetically (within a Note!)",
                                type: "checkbox"
                            },
                            // Insert / Export options
                            {
                                label: "Insert / Export options (Mandatory)",
                                type: "select",
                                options: [
                                    { label: "Insert into current note", value: "current_note" },
                                    { label: "Insert into new note", value: "new_note" },
                                    { label: "Download as markdown", value: "download_md" },
                                    { label: "Download as CSV", value: "download_csv" },
                                    { label: "Download as TXT", value: "download_txt" }
                                ]
                            },
                            // Format selection option
                            {
                                label: "Select format (Mandatory)",
                                type: "select",
                                options: [
                                    { label: "Both (Table format)", value: "both_table" },
                                    { label: "Note Names", value: "names_only" },
                                    { label: "Note Tags", value: "tags_only" },
                                    { label: "Untitled Notes (Table format)", value: "empty_names_only" },
                                    { label: "Untagged Notes (Table format)", value: "empty_tags_only" },
                                    { label: "Undocumented Notes (w/Hidden-task/s)", value: "empty_content_only" },
                                    { label: "Published (Table format)", value: "published_only" },
                                    { label: "Archived - Grouped-folders", value: "archived" },
                                    { label: "Vault Notes - Grouped-folders", value: "vault" },
                                    { label: "Deleted Notes - Grouped-folders", value: "deleted" },
                                    { label: "Active plugin notes - Grouped-folders", value: "plugin" },
                                    { label: "Task Lists - Notes-contain-tasks", value: "taskLists" },
                                    { label: "Un-tagged - Notes-untagged", value: "untagged" },
                                    { label: "Created by me - Shared-notes", value: "created" },
                                    { label: "Shared publicly - Shared-notes", value: "public" },
                                    { label: "Shared notes - Shared-notes", value: "shared" },
                                    { label: "Notes shared with me  - Shared-notes", value: "shareReceived" },
                                    { label: "Notes not created by me - Shared-notes", value: "notCreated" },
                                    { label: "Notes I shared with others - Shared-notes", value: "shareSent" },
                                    { label: "This week - Creation-date", value: "thisWeek" },
                                    { label: "Today - Creation-date", value: "today" },
                                    { label: "Notes Saving - Low-level-queries", value: "saving" },
                                    { label: "Notes Downloading - Low-level-queries", value: "stale" },
                                    { label: "Notes Indexing - Low-level-queries", value: "indexing" },
                                    { label: "Raw data", value: "raw_data" }
                                ]
                            }
                        ]
                    });

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

                    // Ensure both insertOption and insertFormat are selected
                    if (!insertOption || !insertFormat) {
                        app.alert("Note: Both insertOption and insertFormat (Mandatory Fields) must be selected");
                        return;
                    }
					
					app.alert("Working on it... This may take a few minutes for large notebooks. The app might seem unresponsive but we're working on it.");

                    // Split tags into an array
                    const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
                    let notes = [];
					
					// Main Fetch happening based on insertFormat
                    if (insertFormat === "both_table" || insertFormat === "names_only" || insertFormat === "tags_only" || insertFormat === "empty_names_only" || insertFormat === "empty_tags_only" || insertFormat === "published_only" || insertFormat === "raw_data") {

						// Filter notes based on tags
						if (tagsArray.length > 0) {
							for (let tag of tagsArray) {
								let taggedNotes = await app.filterNotes({ tag });
								notes = notes.concat(taggedNotes);
							}
						} else {
							notes = await app.filterNotes({});
						}

						// Remove duplicate notes
						notes = notes.filter((note, index, self) => index === self.findIndex((n) => n.uuid === note.uuid));

						// Assign default name to notes with null or empty name
						notes = notes.map(note => {
							if (!note.name) {
								note.name = "Untitled Note"; // Assign a default name for empty notes
							}
							return note;
						});

						// Sort the final list of results based on the selected tag sorting option
						if (sortTagOption === "asc") {
							notes.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
						} else if (sortTagOption === "desc") {
							notes.sort((a, b) => b.tags.join(", ").localeCompare(a.tags.join(", ")));
						}

						// Further filter notes by name if a name filter is provided
						if (nameFilter) {
							notes = notes.filter(note => note.name.includes(nameFilter));
						}

						// Sort notes by name based on the user's selection
						if (sortOption === "asc") {
							notes.sort((a, b) => a.name.localeCompare(b.name));
						} else if (sortOption === "desc") {
							notes.sort((a, b) => b.name.localeCompare(a.name));
						}

                    } else if (insertFormat === "empty_content_only") {

						const notesEmptyNames = new Set();
						
						// Filter notes based on empty notes + tags					
						let notesE = tagsArray.length > 0 
							? (await Promise.all(tagsArray.map(tag => app.filterNotes({ tag }))))
								.flat()
							: await app.filterNotes({ group: "^vault" });
						
						for (let note of notesE) {
							if (!note.name) {
								note.name = "Untitled Note"; // Assign a default name for empty notes
							}
							
							if (note.includes("# Hidden tasks")) continue;
								note = note.slice(0, note.indexOf('# Completed tasks<!-- {"omit":true} -->'));
								if (note.trim() === "" || !note.match(/[^\s\\]/mg)) {
									notesEmptyNames.add(note.name);
							}
						}
						notesEmptyNames.sort();

						// Sorting of Empty notes 
						if (sortOption === "asc") {
							notesEmptyNames.sort((a, b) => a.name.localeCompare(b.name));
						} else if (sortOption === "desc") {
							notesEmptyNames.sort((a, b) => b.name.localeCompare(a.name));
						}
						
                    } else if (insertFormat === "archived") {

                        // Fetching all notes for archive folders
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("archive"));

                    } else if (insertFormat === "vault") {

                        // Fetching all notes for vault folders
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("vault"));

                    } else if (insertFormat === "deleted") {

                        // Fetching all notes for deleted folders
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("deleted"));

                    } else if (insertFormat === "plugin") {

                        // Fetching all notes for active plugin notes folders
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("plugin"));

                    } else if (insertFormat === "taskLists") {

                        // Fetching all notes for task lists
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("task"));

                    } else if (insertFormat === "untagged") {

                        // Fetching all notes for untagged folders
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("untagged"));

                    } else if (insertFormat === "created") {

                        // Fetching all notes created by user
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("created"));

                    } else if (insertFormat === "public") {

                        // Fetching all notes shared publicly
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("public"));

                    } else if (insertFormat === "shared") {

                        // Fetching all shared notes
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("shared"));

                    } else if (insertFormat === "shareReceived") {

                        // Fetching all notes shared with user
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("sharedWithMe"));

                    } else if (insertFormat === "notCreated") {

                        // Fetching all notes not created by user
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => !note.tags.includes("created"));

                    } else if (insertFormat === "shareSent") {

                        // Fetching all notes shared by user
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("sharedByMe"));

                    } else if (insertFormat === "thisWeek") {

                        // Fetching all notes created this week
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("createdThisWeek"));

                    } else if (insertFormat === "today") {

                        // Fetching all notes created today
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("createdToday"));

                    } else if (insertFormat === "saving") {

                        // Fetching all notes in the saving process
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("saving"));

                    } else if (insertFormat === "stale") {

                        // Fetching all notes in the downloading process
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("stale"));

                    } else if (insertFormat === "indexing") {

                        // Fetching all notes in the indexing process
                        let notesGroups = await app.filterNotes({});
                        notes = notesGroups.filter(note => note.tags.includes("indexing"));
                    }
					
					// Inserting content based on selection
                    let finalContent = "";
                    if (insertFormat === "both_table" || insertFormat === "empty_names_only" || insertFormat === "empty_tags_only") {
                        finalContent = notes.map(note => {
                            return `| ${note.name} | ${note.tags.join(', ')} |`;
                        }).join('\n');
                    } else if (insertFormat === "names_only") {
                        finalContent = notes.map(note => note.name).join('\n');
                    } else if (insertFormat === "tags_only") {
                        finalContent = notes.map(note => note.tags.join(', ')).join('\n');
                    }

                    // Inserting the final content based on the user's option
                    if (insertOption === "current_note") {
                        await app.context.replaceSelection(finalContent);
                    } else if (insertOption === "new_note") {
                        const newNote = await app.createNote({
                            name: "Filtered Notes",
                            content: finalContent
                        });
                        app.alert(`New note created: ${newNote.name}`);
                    } else if (insertOption === "download_md") {
                        const blob = new Blob([finalContent], { type: "text/markdown" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "filtered_notes.md";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else if (insertOption === "download_csv") {
                        const blob = new Blob([finalContent], { type: "text/csv" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "filtered_notes.csv";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else if (insertOption === "download_txt") {
                        const blob = new Blob([finalContent], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "filtered_notes.txt";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }

                } catch (error) {
                    app.alert(`An error occurred: ${error.message}`);
                }
            }
        }
    };

    // Export Meta_1 to the global scope if needed
    if (typeof window !== "undefined") {
        window.Meta_1 = Meta_1;
    }

    // Export Meta_1 for CommonJS environments
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Meta_1;
    }
})();
