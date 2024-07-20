---
title: URL-Search-GUI
uuid: cfc0398e-467a-11ef-bc7e-26e37c279344
version: 433
created: '2024-07-20T15:01:17+05:30'
tags:
  - '-loc/amp/mine'
  - '-1-working'
---

# <mark style="color:#FFFFFF;">**Welcome Note:**<!-- {"cycleColor":"55"} --></mark>

Hey all this is my forth try at the Plugin world!. I am looking into things which can help me do something or contribute something in a meaning full way in my prospective. 

\

This Plugin is designed to help users filter and search for notes, tasks, or calendar entries within an application. It allows users to input various criteria, constructs a corresponding search query and URL, and performs actions based on these inputs. This documentation provides a comprehensive guide to understanding and using this method.

\

For more details refer to: [Search queries: tag, filter, and other queries](https://www.amplenote.com/help/search_filter_tags_groups) .

---

## <mark style="color:#FFFFFF;">Demo:<!-- {"cycleColor":"55"} --></mark>

### General - Calling the Plugin - URL-Search-GUI

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/b320ed3c-97df-4f05-8f84-87a9d3094193.gif)

---

### Group/s Selection to Include or Exclude

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/1ada5676-4b3d-4f1a-bfa5-a7e0661bbcf8.gif)

---

### Tag/s Selection to Include or Exclude

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/93a5803c-a076-4468-9448-8f63025a997b.gif)

---

### Note Selection to Include or Exclude

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/6a782d89-3359-4cbd-993f-f4fe6fda1153.gif)

---

### Typing in Search Keyword

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/bb8aca2e-38fe-41a2-8485-d2584452998d.gif)

---

### Search Option Picker - Notes; Tasks; Calendar;

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/2ab4282b-e5ba-4a8f-8759-967e9991bb95.gif)

---

### Options - Paste; Save to New Note; Directly Open URL

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/23d5a247-4642-41ac-bf1b-83e90ef569ea.png) [^1]

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/a7632831-938d-46f1-ba6b-7e5319703c3c.png) [^2]

![](https://images.amplenote.com/cfc0398e-467a-11ef-bc7e-26e37c279344/0358ed27-c23f-4ddb-b548-461da6264266.png) [^3]

---

## <mark style="color:#FFFFFF;">Documentation:<!-- {"cycleColor":"55"} --></mark>

### User Prompt

- The method displays a prompt to collect various search criteria from the user. Here are the inputs collected and their purposes:

### 1. **Enter Groups to Include**

- (Only for Notes)

- **Type:** String

- **Placeholder:** "Copy/Paste the Groups from above"

- **Purpose:** Specifies groups to include in the search. Groups are categories or labels assigned to notes based on their parameters.

- **Reflection:** Included groups are added to the search query, filtering notes that belong to these groups.

### 2. **Enter Groups to Exclude**

- (Only for Notes)

- **Type:** String

- **Placeholder:** "Copy/Paste the Groups from above"

- **Purpose:** Specifies groups to exclude from the search.

- **Reflection:** Excluded groups are added to the search query, filtering out notes that belong to these groups.

### 3. **Select Tags to Include**

- (Only for Notes, Tasks)

- **Type:** Tags (Comma-separated values)

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Purpose:** Specifies tags to include in the search. Tags are keywords or labels assigned to notes or tasks.

- **Reflection:** Included tags are added to the search query, filtering notes or tasks that have these tags.

### 4. **Select Tags to Exclude**

- (Only for Notes, Tasks)

- **Type:** Tags (Comma-separated values)

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Purpose:** Specifies tags to exclude from the search.

- **Reflection:** Excluded tags are added to the search query, filtering out notes or tasks that have these tags.

### 5. **Select a Note to Include**

- (Only for Calendar, Tasks)

- **Type:** Note (Selected from `noteHandles`)

- **Placeholder:** "Select a Note"

- **Purpose:** Specifies a note to include in the search for calendar entries or tasks.

- **Reflection:** The selected note's UUID is added to the search query, filtering calendar entries or tasks associated with this note.

### 6. **Select a Note to Exclude**

- (Only for Calendar, Tasks)

- **Type:** Note (Selected from `noteHandlesE`)

- **Placeholder:** "Select a Note"

- **Purpose:** Specifies a note to exclude from the search for calendar entries or tasks.

- **Reflection:** The selected note's UUID is added to the search query, excluding calendar entries or tasks associated with this note.

### 7. **Enter Keyword**

- **Type:** String

- **Placeholder:** "Partial / Full Keyword"

- **Purpose:** Specifies a keyword to search within the notes or tasks.

- **Reflection:** The keyword is added to the search query, filtering notes or tasks that contain this keyword.

### 8. **Search In**

- **Type:** Select

- **Options:**

    - Notes (Works with Tags, Groups)

    - Tasks (Works with Notes, Tags)

    - Calendar (Works with Notes)

- **Purpose:** Specifies the scope of the search (Notes, Tasks, or Calendar).

- **Reflection:** Determines the base URL for constructing the search query.

### Actions

- **Actions in the Prompt:**

    - **Save to New Note:** Saves the search results to a new note. / Creates a new note containing the search report.

    - **Directly Open URL:** Opens the constructed URL directly.

- **Submit > Replace Selection:** Replaces the current selection with the report text.

### Example Summary

- **Input Selections:**

    - Groups Included: Example

    - Groups Excluded: Another

    - Tags Included: Important, Work

    - Tags Excluded: Personal

    - Search Text: Meeting

    - Search Tasks: Notes

    - Report Date & Time: 2024-07-20 14:35:22

- **Constructed Search Query:** `<group:Example,^Another in:Important,Work,^Personal Meeting>`

- **Constructed URL:** `https://www.amplenote.com/notes?group=Example,%5EAnother&tag=Important,Work,%5EPersonal&query=Meeting`

### Final Output

- The method provides a summary of the user's input selections and the resulting search query and URL. Depending on the user's action choice, it either creates a new note, opens the URL, or replaces the current selection with the generated report.

This detailed documentation should serve as a comprehensive guide for anyone looking to understand and utilize this method effectively.

---

## <mark style="color:#FFFFFF;">Table - Plugin Parameters:<!-- {"cycleColor":"55"} --></mark>

| | |
|-|-|
|name|URL-Search-GUI<!-- {"cell":{"colwidth":696}} -->|
|icon<!-- {"cell":{"colwidth":116}} -->|manage_search<!-- {"cell":{"colwidth":696}} -->|
|description<!-- {"cell":{"colwidth":116}} -->|Get a Searchable Query + Clickable URL for your complex search needs. If you are a hard core user of Amplenote with hundreds or thousands of notes, tags falling in multiple standardized group, then this is Plugin you should definitely have which can come in handy. This give you a lot of options, directly open the link, save if for future (once saved, easier to edit modify based on your requirements!)<mark style="color:#FFFFFF;">.<!-- {"cycleColor":"55"} --></mark><!-- {"cell":{"colwidth":696}} -->|
|instructions|Please fine the Instructions here =  [URL-Search-GUI Docs](https://www.amplenote.com/notes/53c0afc4-4681-11ef-9854-26e37c279344) [URL-Search-GUI Code Docs](https://www.amplenote.com/notes/fc52b6d6-4678-11ef-8ac9-6ef34fa959ce) <!-- {"cell":{"colwidth":696}} -->|
---

## <mark style="color:#FFFFFF;">Code Base:<!-- {"cycleColor":"55"} --></mark>

```
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
  - Search Option: < ${baseSearch} > . (Works only for Notes Search).
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
```

---

## <mark style="color:#FFFFFF;">Additional Information:<!-- {"cycleColor":"55"} --></mark>

---

### <mark style="color:#FFFFFF;">**Change Log:**<!-- {"cycleColor":"55"} --></mark>

- July 18th, 2024 - Created a basic structure of the URL and Search options that are available from the [Amplenote - Help Document!](https://www.amplenote.com/help/search_filter_tags_groups) 

- July 19th, 2024 - With the help of earlier prepared document, I went ahead to create a plan to execute this. Once completed, I build the structure of the code with help of AI. Then I was testing all the options and features this could provide using the reference  [Amplenote - Help Document!](https://www.amplenote.com/help/search_filter_tags_groups)  and personally made filters. Added all the features that I was expecting from this search tool. Then went ahead with my personal work!

- July 20th, 2024 - Completed the full testing, and proceed with finalizing the order of the code. Completed the Documentation of the Code and Features of the Plugin. Published it!

---

### <mark style="color:#FFFFFF;">**Implemented & Upcoming:**<!-- {"cycleColor":"55"} --></mark>

- ~~understand how things work, break things down~~  [~~Amplenote - Help Document!~~](https://www.amplenote.com/help/search_filter_tags_groups) 

    - ~~build frame work +~~ 

    - ~~optional place holders +~~ 

    - ~~connecting structures~~

- ~~Build Filter include and exclude~~

    - ~~Groups~~

    - ~~Notes (1 handle limitations!)~~

    - ~~Tags~~

- ~~Text search key work search - flexible (in or like)~~

- ~~Selection options for note / task / cal~~

- ~~Need to save the results + options~~

    - ~~results should include baseurl + basesearch~~

        - ~~Add this as a frequent search option.~~

            - ~~How possible? Check feasibility.~~

- ~~Options for - url~~

    - ~~base - amplenote!~~

    - ~~note - ?~~

    - ~~note.uuid - reference?~~

        - ~~static / dynamic~~

            - ~~fetch - uuid!!!~~

    - ~~task - tasks?~~

    - ~~cal - calendar?~~

- ~~Name, tags, body, task, tables~~

- ~~Features~~

    - ~~bring in open directly~~

    - ~~save in new note~~

    - ~~paste in mouse pointer blinked~~

- ~~TEsting~~

    - ~~all options - Seems to be causing some issue! (ignore, not optimal selection!)~~

    - ~~necessary options~~

    - ~~only one options~~

- ~~to publish~~

    - ~~cleanup after work~~

    - ~~organize~~

    - ~~gifs~~

    - ~~documentations~~

        - ~~code~~

        - ~~feature - general~~

- ~~publish~~

- ~~dftd!~~

<mark style="color:#FFFFFF;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"55"} --></mark>

- Nothing as of now, everything that I could think of has been implemented as a Code!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

- [Code Explanation!.][^4] For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 2h 45m + 9h 29m +  = Totaling up to 12+h. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

---

\

 

[^1]: SUBMIT
    Cancel
    Save to New Note
    Open URL Directly

[^2]: Q URL-Search-GUI
    X
    Enter your Search Filter criteria. >> Hit: Group Details:
    (FOLDERS):archived,deleted,vault,plugin, (NO-TAG):untagged,
    (SHARED) created,public,shared,shareReceived,notCreated,shareSent,
    (CREATION-DATE):thisWeek,today, (NOTES-CONTAIN-TASKS):taskLists,
    (LOW-LEVEL-QUERIES):saving, stale,indexing,
    Enter Groups to Include (Only for Notes)
    plugin
    Enter Groups to Exclude (Only for Notes)
    created,public
    Select Tags to Include (Only for Notes, Tasks)
    # readme X
    -Select Tags to Exclude (Only for Notes, Tasks)
    # -1-inbox X
    Select a Note to Include (Only for Calendar, Tasks)
    Tasks - Inbox ia
    Select a Note to Exclude (Only for Calendar, Tasks)
    Ample Notes Routine
    Enter keyword
    Hello World! :)
    Search in
    Notes (Works w/ Tags, Groups)
    SUBMIT
    Cancel
    Save to New Note
    Open URL Directly

[^3]: Results:
    . Search Option: < group:plugin,\*created,"public in:readme,"-1-inbox Tasks-Inbox ^Ample Notes Routine Hello World! :) > . (Works only for Notes Search).
    . URL Option: https://www.amplenote.com/notes?group=plugin%20%5Ecreated%20%5Epublic&tag=readme%20%5E-1-inbox&references=98bb7f10-3f5f-11ef-a51C-.....
    \* 4-11ef-adf6-
    "e&query=Hello%20World!%20%3A) <>)
    . Input Selections:
    o Groups Included: plugin
    . Groups Excluded: created,public
    o Tags Included: readme
    o Tags Excluded: -1-inbox
    Search Text: Hello World! :)
    . Search Tasks: Notes
    Report Date & Time: 2024-07-20 16:47:50

[^4]: [Code Explanation!.]()

    - **Try Block**: Ensures that any errors during execution are caught and handled.

    - **Fetching Notes**: Retrieves notes that match certain criteria from the app.

    - **User Prompt**: Prompts the user to enter search filter criteria with options and input fields.

    - **Input Validation**: Checks if at least one optional item is selected.

    - **Input Conversion**: Converts input strings to arrays for easier manipulation.

    - **Base URL Selection**: Sets the base URL based on the type of search (notes, tasks, or calendar).

    - **URL Parameters Creation**: Creates URL parameters based on user input.

    - **Search Query Creation**: Creates a search query for the application based on user input.

    - **Final Search and URL Links**: Forms the final search and URL links.

    - **Current Date and Time**: Retrieves the current date and time.

    - **Input Summary**: Summarizes the user's input selections and results.

    - **Action Execution**: Executes the selected action based on user input.

    - **Error Handling**: Catches and alerts any errors that occur during execution.

