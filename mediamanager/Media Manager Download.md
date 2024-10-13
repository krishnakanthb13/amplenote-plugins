---
title: Media Manager Download
uuid: b366c91a-88b0-11ef-826e-62fb339586e5
version: 43
created: '2024-10-12T21:13:18+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
  - '-2-literature'
---

Here’s a comprehensive "How To" guide for users of this media management plugin based on the provided code documentation and functionalities. This guide will cover how to use both the download functionality for media reports and the dynamic note-link viewer.

---

## How To Use the Media Management Plugin

### Part 1: Downloading Media Reports

#### 1. **Start the Download Process:**

- Run the download function within the note-taking application.

#### 2. **User Inputs Prompt:**

- You will be prompted to provide the following information:

    - **Select Tags \[OR\]:**

        - Enter up to **10 tags**. Notes containing any of these tags will be included in the report.

    - **Select Tags \[AND\]:**

        - Enter up to **10 tags**. Only notes containing all of these tags will be included.

    - **Select the Object Type:**

        - Choose from the following:

            - Attachments

            - Images

            - Videos

            - Links

            - Everything (a combination of all types)

    - **Select the Download Format:**

        - Choose how the report will be formatted:

            - Markdown

            - CSV

            - TXT

            - JSON

            - HTML

#### 3. **Validation:**

- If you cancel the operation, a message will notify you, and the function will exit.

- Ensure you select at least one object type and one download format; if not, you will be prompted again.

#### 4. **Filtering Notes:**

- The function will filter notes based on the provided tags:

    - **OR Tags:** Finds notes containing **any** of the selected tags.

    - **AND Tags:** Finds notes containing **all** of the selected tags.

- If no tags are provided, the function defaults to a general group of notes (`^vault`).

#### 5. **Extracting Media:**

- Based on your selection, the function will extract:

    - **Attachments:** Retrieved through the application API.

    - **Images:** Links to images within the notes.

    - **Videos:** Extracted using regex patterns to identify video links.

    - **Links:** Non-Amplenote links extracted from the content.

#### 6. **Downloading the Report:**

- The filtered media will be compiled into the selected format:

    - **Markdown:** Organized in a table format.

    - **CSV:** Created for easy import into spreadsheets.

    - **TXT:** Compiled in plain text.

    - **JSON:** Formatted for programmatic use.

    - **HTML:** Outputted as an HTML document.

- The report is automatically downloaded as a text file, named with the current date and time.

#### 7. **Audit Reporting:**

- The operation details (tags, object types, and download format) are logged in a note named **"MD Media Manager: Audit."**

---

### Tips for Effective Usage

- **Tag Usage:**

    - Make sure to enter tags correctly for effective filtering.

- **Format Consideration:**

    - Choose the download format that best suits your needs based on how you plan to use the media report.

- **Filter Selection:**

    - Take advantage of the filtering options to streamline your note management and access relevant links quickly.

- **Monitor Audit Logs:**

    - Regularly check the audit note for a history of your media report downloads.

---

## **Detailed Code Documentation:** 

### **Code Breakdown**:

```js
"Download!": async function (app) { ... }
```

- **Inputs**:

    - `app.prompt()` prompts the user for:

        - **tagNamesOr**: Tags separated by "OR" condition.

        - **tagNamesAnd**: Tags combined by "AND" condition.

        - **objectType**: Type of object to include in the report.

        - **dwFormat**: Desired download format.

- **Destructuring**: The user’s input is stored in these variables.

- **Initial Arrays**: `notes` holds all notes; `filteredNotes` will contain notes filtered by tags.

- **Tag Processing**: Splits the OR tags into an array, trimming extra spaces.

- **Filtering Notes**: If OR/AND tags are present, notes are filtered based on the tag criteria.

- **Removing Duplicates**: Ensures no duplicate notes are present.

- **Markdown Table Headers**: If Markdown format is selected, headers for the report are created.

- **Video Extraction**: A regular expression is used to extract video links from the note content.

- **File Download**: Depending on the selected format, the final report is downloaded with an appropriate filename.

- **Audit Reporting**: Logs the operation in a specific note with the details of the user inputs.

---

### Structure: 

- **HTML Elements:**

    - **Filters and Display Section:**

        - The `<select>` dropdowns (`#linkTypeFilter`, `#linkFormatFilter`) allow users to filter notes by "link type" and "link format."

        - The container `<div id="notesContainer">` holds the dynamically generated notes and their links.

    - **Button:**

        - `<button id="toggleDarkMode">`: Toggles the page between light and dark modes.

### Data Handling: 

- **Data Source:**\
The JavaScript `const data = ${convertBrackets(finalResults)};` holds all the note and link data in JSON format. Each note has attributes like `noteUUID`, `noteName`, `noteTags`, and links (`linkName`, `linkURL`, `linkFormat`, etc.).

- **Filter Initialization:**

    - `populateFilters()`:\
This function extracts unique values for "link types" and "link formats" from the dataset. It populates the respective dropdowns for users to select how they want to filter notes.

        - It ensures that "link formats" with more than 5 characters are excluded from the list.

        - **Example:** If a note has a link with `linkFormat: "pdf"`, this format appears in the dropdown, but if the format is longer than 5 characters (e.g., "articleLink"), it won’t be shown.

- **Filtering and Displaying Notes:**

    - `displayNotes()`:\
This function is called every time a filter changes. It reads the selected filter options and matches them with the dataset. If no filter is selected, all notes and links are displayed. Otherwise, only those notes matching the selected link type and format are shown.\
**Grouping Notes:**\
The function first groups all notes by their unique `noteUUID` before rendering them to avoid duplicates. It then displays each note’s `noteName`, `noteUUID`, `noteTags`, followed by clickable links (`linkName`, `linkFormat`).\
**Example:**\
A note might be displayed as:

        - **Note Name**: Project Report

        - **UUID**: (UUID: 1234-5678)

        - **Tags**: Work, Reports

        - **Links**:

            - Final Report (pdf)

            - Executive Summary (html)

### Interactivity: 

- **Dark Mode Toggle:**

    - `toggleDarkMode()`:\
This function toggles between light and dark modes when the "Toggle Dark Mode" button is clicked. It applies different background, text, and link colors by adding or removing the `dark-mode` class to relevant HTML elements like `body`, `.note`, and `.link`.

### Event Listeners: 

- The button `#toggleDarkMode` listens for clicks to toggle between dark and light modes.

- Both dropdown filters (`#linkTypeFilter` and `#linkFormatFilter`) listen for changes to re-filter and update the note display in real-time.

### Initialization: 

- When the page is loaded:

    - `populateFilters()` fills the filter dropdowns with available link types and formats.

    - `displayNotes()` displays the notes and their links.

    - Filters are re-applied dynamically whenever the user makes a selection.

---

This document serves as a guide to understanding the functionality and structure of the page, enabling easier adaptation or modification.