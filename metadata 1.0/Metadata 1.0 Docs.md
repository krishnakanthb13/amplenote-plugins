---
title: Metadata 1.0 Docs
uuid: c46c5e60-4066-11ef-832f-26e37c279344
version: 199
created: '2024-07-12T21:22:39+05:30'
tags:
  - '-location/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#F8D616;">Readme:<!-- {"cycleColor":"25"} --></mark>

- Using this Plugin, you can generate a dump of Note Names + their respective Tags.

- You have extensive methods to filter that data that you are looking for.

- You have multiple ways to place your requested data in.

---

## <mark style="color:#F8D616;">⚠ Warning:<!-- {"cycleColor":"25"} --></mark>

- <mark style="color:#F5614C;">If any of your Notes does not have a name, the this will throw an Error - `TypeError: Cannot read properties of null (reading 'localeCompare')`<!-- {"cycleColor":"23"} --></mark>

    - Identified on July 15th, 2024 (23:26:22). Needs further analysis how to handle this or ignore these records! For a future day indeed!

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark> 

### <mark>General - Calling the Plugin - Metadata 1.0</mark>

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/7ebfbf76-dd43-4996-bae3-9f64a40e011c.gif)

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/779b31a5-04fe-48dc-9ed3-3a7aca8c73bf.png) [^1]

---

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

![](https://images.amplenote.com/c46c5e60-4066-11ef-832f-26e37c279344/a6ddfbec-3ef5-4af5-9f65-ee67cc394d1f.png) [^2]

- <mark style="color:#F8914D;">Published only (Table format)<!-- {"cycleColor":"24"} --></mark> - <mark style="color:#F8D616;">Added the option of selecting the list of Published Notes. Having both the local UUID and the Public URL side by side. (Good for Reviewing purposes!).<!-- {"cycleColor":"25"} --></mark><!-- {"indent":1} -->

    - <mark style="color:#F8914D;">Raw data<!-- {"cycleColor":"24"} --></mark> - <mark style="color:#F8D616;">Gives you Note Name, UUID, Tags.<!-- {"cycleColor":"25"} --></mark>

---

## <mark style="color:#F8D616;">Detailed breakdown:<!-- {"cycleColor":"25"} --></mark>

### <mark>High-Level Functionality</mark>

1. **User Input Prompting**:

    1. Prompts the user for various filter criteria and options.

    1. Collects tags, name filter, sorting options, and format options from the user.

1. **Filtering and Sorting Notes**:

    1. Filters notes based on user-provided tags and name.

    1. Sorts the filtered notes based on user-selected options (note name, tags).

1. **Generating and Exporting Results**:

    1. Generates a formatted output based on the user’s input.

    1. Allows the user to either insert the output into a note, create a new note, or download the output in different formats (Markdown, CSV, TXT).

### <mark>Detailed Breakdown</mark>

### <mark>Prompting User for Input</mark>

- **app.prompt**:

    - Prompts the user to enter filter criteria.

    - Inputs include tags, name filter, sorting options, and export options.

    - Ensures the user selects required fields (`insertOption` and `insertFormat`).

### <mark>Filtering and Sorting Notes</mark>

- **Tag Filtering**:

    - Splits user-entered tags into an array.

    - Filters notes based on these tags using `app.filterNotes`.

    - Removes duplicate notes.

- **Name Filtering**:

    - Filters notes further if a name filter is provided.

- **Sorting Notes**:

    - Sorts notes by name (ascending or descending) based on user selection.

    - Fetches tags for each note and sorts tags alphabetically within a note if the user selected that option.

    - Sorts the final list of results based on the selected tag sorting option.

### <mark>Generating and Exporting Results</mark>

- **Formatting Results**:

    - Formats results based on user-selected format options (`both_table`, `names_only`, `tags_only`, `published_only`, `raw_data`).

    - Adds the formatted results to a set to ensure uniqueness.

- **Creating Markdown Links**:

    - Creates Markdown links from note handles.

- **Generating File Content**:

    - Creates the result text and CSV content based on the selected format.

    - Generates a filename based on the current date and time.

    - Appends a summary of input selections to the result text and CSV content.

- **Inserting or Downloading Results**:

    - Inserts the result text into the current or a new note based on user selection.

    - Allows the user to download the result in Markdown, CSV, or TXT format.

### <mark>Sorting Options</mark>

1. **Sort by Note Name**:

    1. `sortOption`: Sorts notes by their names.

        1. `asc`: Ascending order.

        1. `desc`: Descending order.

1. **Sort by Tags**:

    1. `sortTagOption`: Sorts the list of results by tags.

        1. `asc`: Ascending order.

        1. `desc`: Descending order.

1. **Sort Tags Alphabetically within a Note**:

    1. `sortTags`: Boolean option to sort tags within a note alphabetically.

### <mark>Example Workflow</mark>

1. **User Input**:

    1. Tags: `tag1, tag2`

    1. Name filter: `Note`

    1. Sort by note name: `asc`

    1. Sort tags alphabetically: `true`

    1. Insert option: `new_note`

    1. Format: `both_table`

1. **Filtering**:

    1. Filters notes containing `tag1` or `tag2`.

    1. Further filters notes with names containing `Note`.

1. **Sorting**:

    1. Sorts the filtered notes by name in ascending order.

    1. Sorts tags within each note alphabetically.

1. **Result Generation**:

    1. Creates a table with note names and their tags.

    1. Inserts the table into a new note.

### <mark>Conclusion</mark>

The code provides a comprehensive solution for filtering, sorting, and exporting notes based on user-defined criteria. Ensuring the correct application of sorting options is crucial for achieving the desired output. If sorting does not work as expected, it may be due to the interplay between different sorting options and the handling of duplicate notes.

---

1. [Readme:](#Readme:) 

    1. [⚠ Warning:](#__Warning:) 

    1. [Demo: ](#Demo:_) 

        1. [General - Calling the Plugin - Metadata 1.0](#General_-_Calling_the_Plugin_-_Metadata_1.0) 

        1. [Tag Selection](#Tag_Selection) 

        1. [Typing in Note Name](#Typing_in_Note_Name) 

        1. [Sort by Note Name;  Tags; Tags (Within a Note)](#Sort_by_Note_Name;__Tags;_Tags_(Within_a_Note)) 

        1. [Insert / Export Options; Select format \[Mandatory\]](#Insert_/_Export_Options;_Select_format__Mandatory_) 

    1. [Detailed breakdown:](#Detailed_breakdown:) 

        1. [High-Level Functionality](#High-Level_Functionality) 

        1. [Detailed Breakdown](#Detailed_Breakdown) 

        1. [Prompting User for Input](#Prompting_User_for_Input) 

        1. [Filtering and Sorting Notes](#Filtering_and_Sorting_Notes) 

        1. [Generating and Exporting Results](#Generating_and_Exporting_Results) 

        1. [Sorting Options](#Sorting_Options) 

        1. [Example Workflow](#Example_Workflow) 

        1. [Conclusion](#Conclusion) 

---

[^1]: " Meta_1
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

[^2]: Select format (Mandatory)
    Both (Table format)
    Names only
    Tags only
    te
    Published only (Table format)
    DE
    Raw data

