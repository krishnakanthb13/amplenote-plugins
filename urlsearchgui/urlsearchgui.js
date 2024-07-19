(() => {
    var USG = {
        insertText: {
            "Hack": async function(app) {
                try {
                    const noteHandles = await app.filterNotes();
                    const noteHandlesE = await app.filterNotes();
                    const result = await app.prompt("Enter your Search Filter criteria. >> Hit: Group Details: (FOLDERS):archived,deleted,vault,plugin, (NO-TAG):untagged, (SHARED):created,public,shared,shareReceived,notCreated,shareSent, (CREATION-DATE):thisWeek,today, (NOTES-CONTAIN-TASKS):taskLists, (LOW-LEVEL-QUERIES):saving,stale,indexing,", {
                        actions: [
                            { icon: "content_paste_go", label: "Save to New Note", value: "new_note" },
                            { icon: "open_in_new", label: "Directly Open Url", value: "open" },
                        ],
                        inputs: [
                            { label: "Enter Groups to Include (Only for Notes)", type: "string", placeholder: "CopyPaste the Groups from above" },
                            { label: "Enter Groups to Exclude (Only for Notes)", type: "string", placeholder: "CopyPaste the Groups from above" },
                            { label: "Select Tags to Include (Only for Notes, Tasks)", type: "tags", limit: 3, placeholder: "Enter tag/'s' (Max 3)" },
                            { label: "Select Tags to Exclude (Only for Notes, Tasks)", type: "tags", limit: 3, placeholder: "Enter tag/'s' (Max 3)" },
                            { label: "Enter keyword", type: "string", placeholder: "Partial / Full Keyword" },
                            { label: "Search in", type: "select", options: [{ label: "Notes (Only Tags, Groups)", value: "" }, { label: "Tasks (Only Notes, Tags)", value: "task" }, { label: "Calendar (Only Notes)", value: "cal" }] },
                            { label: "Select a Note to Include (Only for Calendar, Tasks)", type: "note", placeholder: "Select a Note", options: noteHandles },
                            { label: "Select a Note to Exclude (Only for Calendar, Tasks)", type: "note", placeholder: "Select a Note", options: noteHandlesE }
                        ]
                    });

                    if (!result) {
                        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
                        return;
                    }

                    const [groupIn, groupEx, tagIn, tagEx, searchTxt, taskOrnote, noteIn, noteEx, actionResult] = result;

                    if (!groupIn && !groupEx && !tagIn && !tagEx && !searchTxt && !noteIn && !noteEx) {
                        app.alert("Note: At least one of Optional Items (Group Include, Group Exclude, Tag Include, Tag Exclude, Note Include, Note Exclude, or Search Text) must be selected");
                        return;
                    }

                    const tagsArrayIn = tagIn ? tagIn.split(',').map(tag => tag.trim()) : [];
                    const tagsArrayEx = tagEx ? tagEx.split(',').map(tag => tag.trim()) : [];
                    const groupArrayIn = groupIn ? groupIn.split(',').map(gp => gp.trim()) : [];
                    const groupArrayEx = groupEx ? groupEx.split(',').map(gp => gp.trim()) : [];

                    const referrenceUuidIn = noteIn ? noteIn.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidEx = noteEx ? noteEx.uuid.split(',').map(note => note.trim()) : [];
                    const referrenceUuidInN = noteIn ? noteIn.name.split(',').map(note => note.trim()) : [];
                    const referrenceUuidExN = noteEx ? noteEx.name.split(',').map(note => note.trim()) : [];

                    let baseUrl = "";

                    if (taskOrnote === "task") {
                        baseUrl = "https://www.amplenote.com/notes/tasks?";
                    } else if (taskOrnote === "cal") {
                        baseUrl = "https://www.amplenote.com/notes/calendar?";
                    } else {
                        baseUrl = "https://www.amplenote.com/notes?";
                    }

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

                    const searchFin = `[${baseSearch}](${baseUrl})`;
                    const urlFin = `[${baseUrl}](${baseUrl})`;

                    const now = new Date();

                    // Get date in YYYY-MM-DD format
                    const year = now.getFullYear();
                    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                    const day = String(now.getDate()).padStart(2, '0');
                    const currentDate = `${year}-${month}-${day}`;
                    
                    // Get time in HH:MM:SS format
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    const currentTime = `${hours}:${minutes}:${seconds}`;

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
  - Search Tasks: ${taskOrnote ? "Yes" : "No"}
  - Report Date & Time: ${currentDate || "None"} ${currentTime || "None"}
`;

                    let resultText = "";

                    resultText += `${inputSummary}`;

                    if (actionResult === "new_note") {
                        let noteUUID = await app.createNote("URL-Search Report", ["url-search-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
                    } else if (actionResult === "open") {
                        app.navigate(baseUrl);
                    } else {
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