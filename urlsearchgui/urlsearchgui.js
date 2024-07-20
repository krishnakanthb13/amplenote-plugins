(() => {
    var USG = {
        insertText: {
            "Hack": async function(app) {

                // Try block to catch any errors during the execution
                try {
                    // Fetches the notes that match certain criteria from the app
                    const noteHandles = await app.filterNotes();
                    const noteHandlesE = await app.filterNotes();

                    // Prompts the user to enter search filter criteria and provides action buttons and input fields
                    const result = await app.prompt("Enter your Search Filter criteria. >> Hit: Group Details: (FOLDERS):archived,deleted,vault,plugin, (NO-TAG):untagged, (SHARED):created,public,shared,shareReceived,notCreated,shareSent, (CREATION-DATE):thisWeek,today, (NOTES-CONTAIN-TASKS):taskLists, (LOW-LEVEL-QUERIES):saving,stale,indexing,", {
                        actions: [
                            { icon: "saved_search", label: "Save to New Note", value: "new_note" },
                            { icon: "open_in_new", label: "Open URL Directly", value: "open" },
                        ],
                        inputs: [
                            { label: "Enter Groups to Include (Only for Notes)", type: "string", placeholder: "CopyPaste the Groups from above" },
                            { label: "Enter Groups to Exclude (Only for Notes)", type: "string", placeholder: "CopyPaste the Groups from above" },
                            { label: "Select Tags to Include (Only for Notes, Tasks)", type: "tags", limit: 10, placeholder: "Enter tag/'s' (Max 3)" },
                            { label: "Select Tags to Exclude (Only for Notes, Tasks)", type: "tags", limit: 10, placeholder: "Enter tag/'s' (Max 3)" },
                            { label: "Select a Note to Include (Only for Calendar, Tasks)", type: "note", placeholder: "Select a Note", options: noteHandles },
                            { label: "Select a Note to Exclude (Only for Calendar, Tasks)", type: "note", placeholder: "Select a Note", options: noteHandlesE },
                            { label: "Enter keyword", type: "string", placeholder: "Partial / Full Keyword" },
                            { label: "Search in", type: "select", options: [{ label: "Notes (Works w/ Tags, Groups)", value: "" }, { label: "Tasks (Works w/ Notes, Tags)", value: "tasks" }, { label: "Calendar (Works w/ Notes)", value: "calendar" }] }
                        ]
                    });

                    // If the user cancels the prompt, show an alert and exit the function
                    if (!result) {
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }


                    // Destructuring the result to get individual inputs
                    const [groupIn, groupEx, tagIn, tagEx, noteIn, noteEx, searchTxt, taskOrnote, actionResult] = result;

                    // Checking if at least one optional item is selected, else show an alert
                    if (!groupIn && !groupEx && !tagIn && !tagEx && !searchTxt && !noteIn && !noteEx) {
                        app.alert("Note: At least one of Optional Items (Group Include, Group Exclude, Tag Include, Tag Exclude, Note Include, Note Exclude, or Search Text) must be selected");
                        return;
                    }

                    // Converting input strings to arrays for easier manipulation
                    const tagsArrayIn = tagIn ? tagIn.split(',').map(tag => tag.trim()) : [];
                    const tagsArrayEx = tagEx ? tagEx.split(',').map(tag => tag.trim()) : [];
                    const groupArrayIn = groupIn ? groupIn.split(',').map(gp => gp.trim()) : [];
                    const groupArrayEx = groupEx ? groupEx.split(',').map(gp => gp.trim()) : [];
                    const referrenceUuidIn = noteIn ? noteIn.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidEx = noteEx ? noteEx.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidInN = noteIn ? noteIn.name.split(',').map(note => note.trim()) : [];
                    const referrenceUuidExN = noteEx ? noteEx.name.split(',').map(note => note.trim()) : [];



                    // Setting the base URL based on the type of search (notes, tasks, or calendar)
                    let baseUrl = "";
                    if (taskOrnote === "tasks") {
                        baseUrl = "https://www.amplenote.com/notes/tasks?";
                    } else if (taskOrnote === "calendar") {
                        baseUrl = "https://www.amplenote.com/notes/calendar?";
                    } else {
                        baseUrl = "https://www.amplenote.com/notes?";
                    }

                    // Creating URL parameters based on user input
                    let params = [];
                    let groupParams = [];
                    if (Array.isArray(groupArrayIn) && groupArrayIn.length > 0) {
                        groupParams.push(groupArrayIn.map(group => encodeURIComponent(group)).join('%2C'));
                    }
                    if (Array.isArray(groupArrayEx) && groupArrayEx.length > 0) {
                        groupParams.push(groupArrayEx.map(group => "%5E" + encodeURIComponent(group)).join('%2C'));
                    }
                    if (groupParams.length > 0) {
                        params.push("group=" + groupParams.join('%2C'));
                    }

                    // Adding tags to URL parameters
                    let tagParams = [];
                    if (Array.isArray(tagsArrayIn) && tagsArrayIn.length > 0) {
                        tagParams.push(tagsArrayIn.map(tag => encodeURIComponent(tag)).join('%2C'));
                    }
                    if (Array.isArray(tagsArrayEx) && tagsArrayEx.length > 0) {
                        tagParams.push(tagsArrayEx.map(tag => "%5E" + encodeURIComponent(tag)).join('%2C'));
                    }
                    if (tagParams.length > 0) {
                        params.push("tag=" + tagParams.join('%2C'));
                    }

                    // Adding notes to URL parameters
                    let noteParams = [];
                    if (Array.isArray(referrenceUuidIn) && referrenceUuidIn.length > 0) {
                        noteParams.push(referrenceUuidIn.map(note => encodeURIComponent(note)).join('%2C'));
                    }
                    if (Array.isArray(referrenceUuidEx) && referrenceUuidEx.length > 0) {
                        noteParams.push(referrenceUuidEx.map(note => "%5E" + encodeURIComponent(note)).join('%2C'));
                    }
                    if (noteParams.length > 0) {
                        params.push("references=" + noteParams.join('%2C'));
                    }

                    // Adding search text to URL parameters
                    if (searchTxt && searchTxt.length > 0) {
                        params.push("query=" + encodeURIComponent(searchTxt));
                    }

                    // Combining the base URL with parameters
                    baseUrl += params.join('&');



                    // Creating a search query for the application based on user input
                    let baseSearch = "";
                    let paramz = [];
                    let groupParamz = [];
                    if (Array.isArray(groupArrayIn) && groupArrayIn.length > 0) {
                        groupParamz.push(groupArrayIn.map(group => (group)).join(','));
                    }
                    if (Array.isArray(groupArrayEx) && groupArrayEx.length > 0) {
                        groupParamz.push(groupArrayEx.map(group => "^" + (group)).join(','));
                    }
                    if (groupParamz.length > 0) {
                        paramz.push("group:" + groupParamz.join(','));
                    }

                    // Adding tags to the search query
                    let tagParamz = [];
                    if (Array.isArray(tagsArrayIn) && tagsArrayIn.length > 0) {
                        tagParamz.push(tagsArrayIn.map(tag => (tag)).join(','));
                    }
                    if (Array.isArray(tagsArrayEx) && tagsArrayEx.length > 0) {
                        tagParamz.push(tagsArrayEx.map(tag => "^" + (tag)).join(','));
                    }
                    if (tagParamz.length > 0) {
                        paramz.push("in:" + tagParamz.join(','));
                    }

                    // Adding notes to the search query
                    let noteParamz = [];
                    if (Array.isArray(referrenceUuidInN) && referrenceUuidInN.length > 0) {
                        noteParamz.push(referrenceUuidInN.map(tag => (tag)).join(' '));
                    }
                    if (Array.isArray(referrenceUuidExN) && referrenceUuidExN.length > 0) {
                        noteParamz.push(referrenceUuidExN.map(tag => "^" + (tag)).join(' '));
                    }
                    if (noteParamz.length > 0) {
                        paramz.push(" " + noteParamz.join(' '));
                    }

                    // Adding search text to the search query
                    if (searchTxt && searchTxt.length > 0) {
                        paramz.push((searchTxt));
                    }

                    // Combining all parts to form the final search query
                    baseSearch += paramz.join(' ');

                    // Forming the final search and URL links
                    const searchFin = `[${baseSearch}](${baseUrl})`;
                    const urlFin = `[${baseUrl}](${baseUrl})`;

                    // Getting the current date and time
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                    const day = String(now.getDate()).padStart(2, '0');
                    const currentDate = `${year}-${month}-${day}`;
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    const currentTime = `${hours}:${minutes}:${seconds}`;

                    // Summarizing the user's input selections and results
                    const inputSummary = `
- Results:
  - Search Option: <${baseSearch}> . (Works only for Notes Search).
  - URL Option: ${urlFin}
- Input Selections:
  - Groups Included: ${groupIn || "None"}
  - Groups Excluded: ${groupEx || "None"}
  - Tags Included: ${tagIn || "None"}
  - Tags Excluded: ${tagEx || "None"}
  - Search Text: ${searchTxt || "None"}
  - Search Tasks: ${taskOrnote || "Notes"}
  - Report Date & Time: ${currentDate || "None"} ${currentTime || "None"}
`;

                    let resultText = "";
                    resultText += `${inputSummary}`;

                    // Executing the selected action based on user input
                    if (actionResult === "new_note") {
                        let noteUUID = await app.createNote("URL-Search Report", ["url-search-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
                    } else if (actionResult === "open") {
                        app.navigate(baseUrl);
                    } else {
                        await app.context.replaceSelection(resultText);
                    }

                    // Showing a final alert to indicate completion
                    app.alert("URL and Search Query Executed based on your selection!");

                } catch (error) {
                    // Catching and alerting any errors that occur during execution
                    app.alert(String(error));
                }
            }
        }
    };

    var plugin_default = USG;
    return USG;
})()