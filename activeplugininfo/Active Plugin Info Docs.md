---
title: Active Plugin Info Docs
uuid: bd7ffaae-a73a-11ef-93fb-6182161d3fd0
version: 6
created: '2024-11-20T17:57:02+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
  - '-2-literature'
---

## **Functionality Overview**

This code generates a detailed summary report of active plugins and their associated options. It processes notes from a specific group ("plugin"), searches for predefined keywords within code blocks, and organizes the results into a formatted report.


---

## **Inputs**

### 1. **`app`**

- **Type**: Object

- **Purpose**: Provides methods to interact with the application environment, including fetching notes, managing content, and navigating within the app.

- **Effect**: Used extensively to query notes, retrieve content, and create or update reports.


---

### 2. **Constants**

#### **`notesGroup`**

- **Value**: `"plugin"`

- **Purpose**: Specifies the group of notes to be scanned for the report.

- **Effect**: Limits the search scope to notes categorized under this group.

#### **`searchWords`**

- **Type**: Array of Strings

- **Value**:

- **Purpose**: Defines the keywords to search for within the code blocks of notes.

- **Effect**: Determines which plugin options or features are detected and reported.

#### **`APLNoteName`**

- **Value**: `"Active_Plugin_Info"`

- **Purpose**: Defines the name of the note where a concise summary of plugin details will be saved.

#### **`APLTagName`**

- **Value**: `\['-reports/-active-plugin-info'\]`

- **Purpose**: Tags the note for easier categorization and retrieval.


---

### 3. **Dynamic Values**

#### **`notesG`**

- **Type**: Array of Note Objects

- **Purpose**: Stores notes retrieved based on the group defined in `notesGroup`.

- **Effect**: Acts as the primary dataset for processing.

#### **`foundWords`**

- **Type**: Array of Strings

- **Purpose**: Contains keywords identified within the code blocks of a note.

- **Effect**: Determines which options are associated with a specific plugin.

#### **`pluginInfo`**

- **Type**: String

- **Purpose**: Aggregates and formats plugin details into a structured report.

- **Effect**: Serves as the primary content for the generated report.

#### **`now`, `YYMMDD`, `HHMMSS`**

- **Purpose**: Capture the current date and time for generating timestamped filenames.

- **Effect**: Ensures unique filenames for every report created.


---

## **Process Flow**

### **Step 1: Retrieve Notes**

- **Action**: The `app.filterNotes()` method fetches notes belonging to the group specified in `notesGroup`.

- **Output**: An array of notes sorted alphabetically by name.

### **Step 2: Extract Plugin Information**

- **Action**: Each note is processed to:

    1. Retrieve its content.

    1. Search for keywords within its code blocks using the `findWordsInCodeBlocks` function.

    1. Format the results into a readable string with links to the notes.

- **Output**: A structured summary for each plugin note.

### **Step 3: Generate Reports**

- **Action**:

    1. Aggregate individual plugin summaries into a larger report (`pluginInfo`).

    1. Save the concise list of plugin names as a separate note (`APLReport`).

- **Output**: Two notes:

    - **`APLNoteName`**: Contains the concise plugin summary.

    - **Timestamped Note**: Contains detailed plugin information.

### **Step 4: Save and Navigate**

- **Action**: Save the report notes using `app.replaceNoteContent` and navigate to the detailed report.

- **Output**: The user is directed to the newly created note for immediate review.


---

## **Key Functions**

### 1. **`findWordsInCodeBlocks`**

- **Inputs**:

    - `markdown`: The text content of a note.

    - `words`: An array of keywords to search for.

- **Purpose**: Searches for specified keywords within code blocks enclosed in triple backticks (\`\`\`).

- **Output**: An array of keywords found in the code blocks.

### 2. **`app.createNote`**

- **Inputs**:

    - Note name: The title of the note to be created.

    - Tags: An array of tags to assign to the note.

- **Purpose**: Creates a new note within the app.

- **Output**: The unique identifier (UUID) of the created note.

### 3. **`app.replaceNoteContent`**

- **Inputs**:

    - `uuid`: The unique identifier of the note to update.

    - `content`: The new content to replace the existing note content.

- **Purpose**: Updates the content of an existing note.

- **Output**: None (performs an action).

### 4. **`app.navigate`**

- **Inputs**: A URL to navigate to.

- **Purpose**: Redirects the user to the specified note or location.

- **Output**: None (performs an action).


---

## **Outputs**

### 1. **Concise Plugin Summary Note**

- **Content**: A list of plugin names with clickable links to their respective notes.

- **Purpose**: Provides a quick overview of available plugins.

### 2. **Detailed Plugin Report Note**

- **Content**:

    - Plugin names as headings.

    - Found keywords formatted under each plugin.

- **Purpose**: Offers an in-depth look at plugin options and configurations.


---

## **Customization Options**

1. **Change Target Group**:

    1. Modify the value of `notesGroup` to analyze notes from a different category.

1. **Expand Search Scope**:

    1. Add more keywords to the `searchWords` array for broader analysis.

1. **Adjust Output Formatting**:

    1. Customize the `pluginInfo` string formatting to match specific requirements or styling preferences.


---

This documentation should guide both developers and end-users in understanding, using, and customizing the code effectively.