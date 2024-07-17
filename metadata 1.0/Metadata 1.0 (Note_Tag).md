---
title: Metadata 1.0 (Note_Tag)
uuid: af332c24-4064-11ef-b9a5-6ef34fa959ce
version: 634
created: '2024-07-12T21:07:43+05:30'
tags:
  - '-location/amplenote/mine'
  - '-9-permanent'
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

![](https://images.amplenote.com/af332c24-4064-11ef-b9a5-6ef34fa959ce/0643aa05-b3dd-4682-b883-a1b205b11c77.png) [^3]

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

        - Both (Table format)

        - Names only

        - Tags only

        - Published only (Table format)

        - Raw data

### <mark>Internal Processing</mark>

1. <mark style="color:#F8D616;">**Capturing User Input**:<!-- {"cycleColor":"25"} --></mark> The user's input is captured and stored in variables. If the user cancels the operation, an alert is shown and the process stops.

1. <mark style="color:#F8D616;">**Fetching Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are fetched based on the provided tags. If no tags are provided, all notes are fetched.

1. <mark style="color:#F8D616;">**Filtering Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are filtered by name if a name filter is specified. Duplicate notes are removed.

1. <mark style="color:#F8D616;">**Sorting Notes**:<!-- {"cycleColor":"25"} --></mark> Notes are sorted by name and tags based on the selected options.

1. <mark style="color:#F8D616;">**Generating Results**:<!-- {"cycleColor":"25"} --></mark> Results are generated in the selected format (table, names only, tags only) and sorted accordingly.

1. <mark style="color:#F8D616;">**Creating Output**<!-- {"cycleColor":"25"} --></mark>: The final results, along with a summary of the input selections, are prepared in text and CSV formats. A filename is generated based on the current date and time.

1. <mark style="color:#F8D616;">**Outputting Results**:<!-- {"cycleColor":"25"} --></mark> Results are either inserted into the current note, a new note, or downloaded as a markdown, CSV, or TXT file based on the user's choice.

<mark style="color:#9AD62A;">The `Meta_1` plugin is a powerful tool for filtering, sorting, and exporting notes based on user-defined criteria. By following the provided prompts and selecting the desired options, users can easily manage and output their notes in various formats.<!-- {"cycleColor":"26"} --></mark>

---

## <mark style="color:#F8D616;">⚠ Warning:<!-- {"cycleColor":"25"} --></mark>

- <mark style="color:#F5614C;">If any of your Notes does not have a name, the this will throw an Error - `TypeError: Cannot read properties of null (reading 'localeCompare')`<!-- {"cycleColor":"23"} --></mark>

    - Identified on July 15th, 2024 (23:26:22). Needs further analysis how to handle this or ignore these records! For a future day indeed!

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
                                label: "Select Tags to filter (Max 3)",
                                type: "tags",
                                limit: 3,
                                placeholder: "Enter tag/'s' (Max 3)"
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
                                    { label: "Names only", value: "names_only" },
                                    { label: "Tags only", value: "tags_only" },
                                    { label: "Published only (Table format)", value: "published_only" },
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

                    // Split tags into an array
                    const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
                    let notes = [];

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
                        } else if (insertFormat === "names_only") {
                            results.add(noteLink);
                        } else if (insertFormat === "tags_only") {
                            tags.forEach(tag => results.add(tag));
                        } else if (insertFormat === "published_only") {
                            const publicURL = await app.getNotePublicURL({ uuid: note.uuid });
                            if (publicURL) {
                                publicResults.push(`| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | [${publicURL}](${publicURL}) |`);
                            }
                        } else if (insertFormat === "raw_data") {
                            results.add(`${note.name} | ${note.uuid} | ${tagString}`);
                            // This is an another optional way to get the raw data!
                            //} else if (insertFormat === "raw_data") {
                            //results.add(`Note Name: ${note.name}`);
                            //results.add(`UUID: ${note.uuid}`);
                            //results.add(`Tags: ${tagString}`);
                        }
                    }

                    results = Array.from(results);

                    // Generate the final text, CSV, and TXT content
                    let resultText;
                    let resultCSV;
                    if (insertFormat === "both_table") {
                        resultText = "| Note Name | Tags |\n|---|---|\n" + results.join("\n");
                        resultCSV = "Note Name,Tags\n" + results.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let tags = parts[2];
                            return `"${name.replace(/"/g, '""')}", "${tags.replace(/"/g, '""')}"`;
                        }).join("\n");
                    } else if (insertFormat === "published_only") {
                        resultText = "| Notes | Public URL |\n|---|---|\n" + publicResults.join("\n");
                        resultCSV = "Notes,Public URL\n" + publicResults.map(row => {
                            let parts = row.split('|').map(s => s.trim());
                            let name = parts[1];
                            let url = parts[2];
                            return `"${name.replace(/"/g, '""')}", "${url.replace(/"/g, '""')}"`;
                        }).join("\n");
                    } else if (insertFormat === "raw_data") {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    } else {
                        resultText = results.join("\n");
                        resultCSV = results.map(item => `"${item.replace(/"/g, '""')}"`).join("\n");
                    }

                    // Generate the filename based on the current date and time
                    const now = new Date();
                    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
                    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
                    const filename = `Metadata1_${YYMMDD}_${HHMMSS}`;

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

                    // Perform actions based on the insert option
                    if (insertOption === "current_note") {
                        await app.context.replaceSelection(resultText);
                    } else if (insertOption === "new_note") {
                        let noteUUID = await app.createNote("Metadata 1.0 Report", ["metadata-reports"]);
                        await app.insertContent({ uuid: noteUUID }, resultText);
                    } else if (insertOption === "download_md") {
                        let blob = new Blob([resultText], { type: "text/markdown;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.md`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else if (insertOption === "download_csv") {
                        let blob = new Blob([resultCSV], { type: "text/csv;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.csv`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else if (insertOption === "download_txt") {
                        let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
                        let link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${filename}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }

                    app.alert("Results Generated and Pasted/Downloaded Successfully!");

                } catch (error) {
                    app.alert(String(error));
                }
            }
        },
        // Function to create Markdown link from note handle
        _createMDLinkFromNoteHandle(noteHandle) {
            return `[${noteHandle.name}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
        }
    };

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

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Metadata 2.0, Metadata 3.0, Metadata Ultimatum

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[Code Explanation!][^4] For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 10h 45m + 5h 48m = Totaling up to 16+h. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

---

1. [Welcome Note:](#Welcome_Note:) 

    1. [Demo:](#Demo:) 

        1. [General - Calling the Plugin - Metadata 1.0](#General_-_Calling_the_Plugin_-_Metadata_1.0) 

        1. [Metadata 1.0: ](#Metadata_1.0:_) 

        1. [Tag Selection](#Tag_Selection) 

        1. [Typing in Note Name](#Typing_in_Note_Name) 

        1. [Sort by Note Name;  Tags; Tags (Within a Note)](#Sort_by_Note_Name;__Tags;_Tags_(Within_a_Note)) 

        1. [Insert / Export Options; Select format \[Mandatory\]](#Insert_/_Export_Options;_Select_format__Mandatory_) 

    1. [Documentation:](#Documentation:) 

        1. [Overview](#Overview) 

        1. [User Input Prompts: ](#User_Input_Prompts:_) 

        1. [1. Select Tags to Filter (Max 3)](#1._Select_Tags_to_Filter_(Max_3)) 

        1. [2. Type Partial or Full Name of the Note](#2._Type_Partial_or_Full_Name_of_the_Note) 

        1. [3. Sort by Note Name](#3._Sort_by_Note_Name) 

        1. [4. Sort by Tags](#4._Sort_by_Tags) 

        1. [5. Sort Tags Alphabetically (within a Note!)](#5._Sort_Tags_Alphabetically_(within_a_Note!)) 

        1. [6. Insert / Export Options (Mandatory)](#6._Insert_/_Export_Options_(Mandatory)) 

        1. [7. Select Format (Mandatory)](#7._Select_Format_(Mandatory)) 

        1. [Internal Processing](#Internal_Processing) 

    1. [⚠ Warning:](#__Warning:) 

    1. [Table - Plugin Parameters:](#Table_-_Plugin_Parameters:) 

    1. [Code Base:](#Code_Base:) 

    1. [Additional Information:](#Additional_Information:) 

        1. [Change Log:](#Change_Log:) 

        1. [Implemented & Upcoming:](#Implemented_&_Upcoming:)  

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

[^3]: Select format (Mandatory)
    Both (Table format)
    Names only
    Tags only
    te
    Published only (Table format)
    DE
    Raw data

[^4]: [Code Explanation!]()

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

