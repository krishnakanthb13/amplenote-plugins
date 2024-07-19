(() => {
    var USG = {
        insertText: {
            // Function to insert text based on user inputs
            "Name_Tag": async function(app) {
                try {
                    // Prompting the user to enter filter criteria
                    const result = await app.prompt("Enter your Search Filter criteria. >> Hit: Group Details: (FOLDERS):archived,deleted,vault,plugin, (NO-TAG):untagged, (SHARED):created,public,shared,shareReceived,notCreated,shareSent, (CREATION-DATE):thisWeek,today, (NOTES-CONTAIN-TASKS):taskLists, (LOW-LEVEL-QUERIES):saving,stale,indexing,", {
                        actions: [
                            { icon: "content_paste_go", label: "Save to New Note", value: "new_note" },
                            { icon: "open_in_new", label: "Directly Open Url", value: "open" },
                        ],
                        inputs: [
                            // Group selection input
                            {
                                label: "Enter Groups to Include",
                                type: "string",
                                placeholder: "CopyPaste the Groups from above"
                            },
                            // Group exclusion input
                            {
                                label: "Enter Groups to Exclude",
                                type: "string",
                                placeholder: "CopyPaste the Groups from above"
                            },
                            // Tag selection input
                            {
                                label: "Select Tags to Include (Max 3)",
                                type: "tags",
                                limit: 3,
                                placeholder: "Enter tag/'s' (Max 3)"
                            },
                            // Tag exclusion input
                            {
                                label: "Select Tags to Exclude (Max 3)",
                                type: "tags",
                                limit: 3,
                                placeholder: "Enter tag/'s' (Max 3)"
                            },
                            // Search keyword
                            {
                                label: "Enter keyword",
                                type: "string",
                                placeholder: "Partial / Full Keyword"
                            },
                            // Search in Tasks
                            {
                                label: "Search in Tasks",
                                type: "checkbox"
                            },
                        ]
                    });

                    // If the result is falsy, the user has canceled the operation
                    if (!result) {
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }

                    // Destructuring user inputs
                    const [groupIn, groupEx, tagIn, tagEx, searchTxt, taskOrnote, actionResult] = result;

                    // Ensure at least one of the required variables is selected
                    if (!groupIn && !groupEx && !tagIn && !tagEx && !searchTxt) {
                        app.alert("Note: At least one of Optional Items (Group Include, Group Exclude, Tag Include, Tag Exclude, or Search Text) must be selected");
                        return;
                    }

                    // Split tags and groups into arrays
                    const tagsArrayIn = tagIn ? tagIn.split(',').map(tag => tag.trim()) : [];
                    const tagsArrayEx = tagEx ? tagEx.split(',').map(tag => tag.trim()) : [];
                    const groupArrayIn = groupIn ? groupIn.split(',').map(gp => gp.trim()) : [];
                    const groupArrayEx = groupEx ? groupEx.split(',').map(gp => gp.trim()) : [];

                    // Base URL
                    let baseUrl = taskOrnote ? "https://www.amplenote.com/notes/tasks?" : "https://www.amplenote.com/notes?";

					// Collect parameters to append
					let params = [];

					// Handle group parameters
					let groupParams = [];
					if (groupArrayIn.length > 0) {
						groupParams.push(groupArrayIn.map(group => encodeURIComponent(group)).join('%2C'));
					}
					if (groupArrayEx.length > 0) {
						//groupParams.push("%5E" + groupArrayEx.map(group => encodeURIComponent(group)).join('%2C'));
						groupParams.push(groupArrayEx.map(group => "%5E" + encodeURIComponent(group)).join('%2C'));
					}
					if (groupParams.length > 0) {
						params.push("group=" + groupParams.join('%2C'));
					}

					// Handle tag parameters
					let tagParams = [];
					if (tagsArrayIn.length > 0) {
						tagParams.push(tagsArrayIn.map(tag => encodeURIComponent(tag)).join('%2C'));
					}
					if (tagsArrayEx.length > 0) {
						tagParams.push(tagsArrayEx.map(tag => "%5E" + encodeURIComponent(tag)).join('%2C'));
					}
					if (tagParams.length > 0) {
						params.push("tag=" + tagParams.join('%2C'));
					}

					// Handle search text
					if (searchTxt) {
						params.push("query=" + encodeURIComponent(searchTxt));
					}

					// Join parameters with '&' and append to the base URL
					baseUrl += params.join('&');

                    // Base Search
                    let baseSearch = "";
                  
					// Collect parameters to append
					let paramz = [];

					// Handle group parameters
					let groupParamz = [];
					if (groupArrayIn.length > 0) {
						groupParamz.push(groupArrayIn.map(group => (group)).join(','));
					}
					if (groupArrayEx.length > 0) {
						groupParamz.push(groupArrayEx.map(group => "^" + (group)).join(','));
					}
					if (groupParams.length > 0) {
						paramz.push("group:" + groupParamz.join(','));
					}

					// Handle tag parameters
					let tagParamz = [];
					if (tagsArrayIn.length > 0) {
						tagParamz.push(tagsArrayIn.map(tag => (tag)).join(','));
					}
					if (tagsArrayEx.length > 0) {
						tagParamz.push(tagsArrayEx.map(tag => "^" + (tag)).join(','));
					}
					if (tagParams.length > 0) {
						paramz.push("in:" + tagParamz.join(','));
					}

					// Handle search text
					if (searchTxt) {
						paramz.push((searchTxt));
					}

					// Join parameters with '&' and append to the base URL
					baseSearch += paramz.join(' ');
					
					const searchFin = `[${baseSearch}](${baseUrl})`;
					const urlFin = `[${baseUrl}](${baseUrl})`;

                    // Generate the summary of input selections
					// groupIn, groupEx, tagIn, tagEx, searchTxt, taskOrnote, actionResult
                    const inputSummary = `
- Results:
  - Search Option: ${searchFin}
  - URL Option: ${urlFin}
- Input Selections:
  - Groups Included: ${groupIn || "None"}
  - Groups Excluded: ${groupEx || "None"}
  - Tags Included: ${tagIn || "None"}
  - Tags Excluded: ${tagEx || "None"}
  - Search Text: ${searchTxt || "None"}
  - Search Tasks: ${taskOrnote ? "Yes" : "No"}
`;

                    // Base Search
                    let resultText = "";
                  
                    // Append the summary to the result text
                    resultText += `${inputSummary}`;

                    // Open the URL based on the selected action
                    if (actionResult === "new_note") {
                        // Assuming app.navigate is a function opens the URL
						//return resultText;
                        let noteUUID = await app.createNote("URL-Search Report", ["url-search-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
						//setTimeout(() => {app.navigate(baseUrl);}, 2000);
                        //app.navigate(baseUrl);
                    } else if (actionResult === "open") {
                        // Assuming app.navigate is a function opens the URL
                        app.navigate(baseUrl);
                    } else {
                        //return resultText;
						await app.context.replaceSelection(resultText);
                    }

                    app.alert("URL and Search Query Executed based on your selection!");

                } catch (error) {
                    app.alert(String(error));
                }
            }
        }
    };

    var plugin_default = USG;
    return USG;
})()