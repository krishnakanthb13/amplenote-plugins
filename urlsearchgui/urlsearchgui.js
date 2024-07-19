(() => {
    var USG = {
        insertText: {
            // Function to insert text based on user inputs
            "Name_Tag": async function(app) {
                try {
                    // Prompting the user to enter filter criteria
                    const result = await app.prompt("Enter your Search Filter criteria. >> Hit: Group Details: (folders.):archived,deleted,vault,plugin (no-tag):untagged (shared):created,public,shared,shareReceived,notCreated,shareSent (creation-date.):thisWeek,today (low-level-queries.):saving,stale,indexing (Notes-contain-tasks.):taskLists", {
                        actions: [
                            { icon: "content_paste_go", label: "Save and Open", value: "save" },
                            { icon: "open_in_new", label: "Open", value: "open" },
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

                    if (groupArrayIn.length > 0) {
                        params.push("group=" + groupArrayIn.map(group => encodeURIComponent(group)).join('%2C'));
                    }
                    if (groupArrayEx.length > 0) {
                        params.push("group=%5E" + groupArrayEx.map(group => encodeURIComponent(group)).join('%2C'));
                    }
                    if (tagsArrayIn.length > 0) {
                        params.push("tag=" + tagsArrayIn.map(tag => encodeURIComponent(tag)).join('%2C'));
                    }
                    if (tagsArrayEx.length > 0) {
                        params.push("tag=%5E" + tagsArrayEx.map(tag => encodeURIComponent(tag)).join('%2C'));
                    }
                    if (searchTxt) {
                        params.push("query=" + encodeURIComponent(searchTxt.replace(/ /g, '%20')));
                    }

                    // Join parameters with '&' and append to the base URL
                    baseUrl += params.join('&');

                    // Open the URL based on the selected action
                    if (actionResult === "save") {
                        // Assuming app.saveAndOpen is a function to save and open the URL
						return baseUrl;
                        app.navigate(baseUrl;);
                    } else if (actionResult === "open") {
                        // Assuming app.open is a function to open the URL directly
                        app.navigate(baseUrl);
                    } else {
                        return baseUrl;
                    }

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