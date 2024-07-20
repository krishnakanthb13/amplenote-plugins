(() => {
    var USG = {
        insertText: {
            "Hack": async function(app) {
                // Try block to catch any errors during the execution
                try {
                    console.log("Fetching note handles...");
                    const noteHandles = await app.filterNotes();
                    const noteHandlesE = await app.filterNotes();
                    console.log("Note handles fetched:", noteHandles);

                    // Prompts the user to enter search filter criteria
                    console.log("Prompting user for input...");
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

                    if (!result) {
                        console.log("User canceled the prompt.");
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }

                    // Destructuring the result to get individual inputs
                    const [groupIn, groupEx, tagIn, tagEx, noteIn, noteEx, searchTxt, taskOrnote, actionResult] = result;

                    // Checking if at least one optional item is selected
                    if (!groupIn && !groupEx && !tagIn && !tagEx && !searchTxt && !noteIn && !noteEx) {
                        console.log("No optional items selected.");
                        app.alert("Note: At least one of Optional Items (Group Include, Group Exclude, Tag Include, Tag Exclude, Note Include, Note Exclude, or Search Text) must be selected");
                        return;
                    }

                    // Converting input strings to arrays
                    const tagsArrayIn = tagIn ? tagIn.split(',').map(tag => tag.trim()) : [];
                    const tagsArrayEx = tagEx ? tagEx.split(',').map(tag => tag.trim()) : [];
                    const groupArrayIn = groupIn ? groupIn.split(',').map(gp => gp.trim()) : [];
                    const groupArrayEx = groupEx ? groupEx.split(',').map(gp => gp.trim()) : [];
                    const referrenceUuidIn = noteIn ? noteIn.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidEx = noteEx ? noteEx.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidInN = noteIn ? noteIn.name.split(',').map(note => note.trim()) : [];
                    const referrenceUuidExN = noteEx ? noteEx.name.split(',').map(note => note.trim()) : [];

                    console.log("Processed input arrays:", {
                        tagsArrayIn,
                        tagsArrayEx,
                        groupArrayIn,
                        groupArrayEx,
                        referrenceUuidIn,
                        referrenceUuidEx,
                        referrenceUuidInN,
                        referrenceUuidExN
                    });

                    // Setting the base URL based on the type of search
                    let baseUrl = "";
                    if (taskOrnote === "tasks") {
                        baseUrl = "https://www.amplenote.com/notes/tasks?";
                    } else if (taskOrnote === "calendar") {
                        baseUrl = "https://www.amplenote.com/notes/calendar?";
                    } else {
                        baseUrl = "https://www.amplenote.com/notes?";
                    }

                    // Creating URL parameters
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

                    if (searchTxt && searchTxt.length > 0) {
                        params.push("query=" + encodeURIComponent(searchTxt));
                    }

                    baseUrl += params.join('&');
                    console.log("Generated URL:", baseUrl);

                    // Creating a search query
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

                    if (searchTxt && searchTxt.length > 0) {
                        paramz.push((searchTxt));
                    }

                    baseSearch += paramz.join(' ');
                    console.log("Generated search query:", baseSearch);

                    // Forming the final search and URL links
                    const searchFin = `[${baseSearch}](${baseUrl})`;
                    const urlFin = `[${baseUrl}](${baseUrl})`;

                    // Getting the current date and time
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0');
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

                    // Executing the selected action
                    console.log("Executing action:", actionResult);
                    if (actionResult === "new_note") {
                        let noteUUID = await app.createNote("URL-Search Report", ["url-search-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
                        console.log("Created new note with UUID:", noteUUID);
                    } else if (actionResult === "open") {
                        app.navigate(baseUrl);
                        console.log("Navigating to URL:", baseUrl);
                    } else {
                        await app.context.replaceSelection(resultText);
                        console.log("Inserted result text into selection.");
                    }

                    // Showing a final alert
                    app.alert("URL and Search Query Executed based on your selection!");

                } catch (error) {
                    // Catching and alerting any errors
                    console.error("Error occurred:", error);
                    app.alert(String(error));
                }
            }
        }
    };

    var plugin_default = USG;
    return USG;
})();
