(() => {
    var USG = {
        insertText: {
            // Function to insert text based on user inputs
            "Name_Tag": async function(app) {
                try {
                    // Prompting the user to enter filter criteria
                    const result = await app.prompt("Enter your Search Filter criteria. >> Hit: Group Details: (folders.):archived,deleted,vault,plugin (no-tag):untagged (shared):created,public,shared,shareReceived,notCreated,shareSent (creation-date.):thisWeek,today (low-level-queries.):saving,stale,indexing (Notes-contain-tasks.):taskLists", {
						      actions: [
								{ icon: "content_paste_go", label: "Save and Open" , value: "save" },
								{ icon: "open_in_new", label: "Open" , value: "open" },
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
                    const [groupIn, groupEx, tagIn, tagEx, searchTxt, actionResult] = result;

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
                    let baseUrl = "https://www.amplenote.com/notes?";
                    let baseUrltask = "https://www.amplenote.com/notes/tasks?";


                    app.alert("URL and Search Query Pasted and Opened / Opened directly!");

                } catch (error) {
                    app.alert(String(error));
                }
            }
        }
    };

    var plugin_default = USG;
    return USG;
})()