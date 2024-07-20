---
title: URL-Search-GUI Docs
uuid: 53c0afc4-4681-11ef-9854-26e37c279344
version: 53
created: '2024-07-20T15:47:55+05:30'
tags:
  - '-1-working'
  - '-loc/amp/mine'
---

## Detailed Documentation for the URL-Search-GUI

### Overview

This Plugin is designed to help users filter and search for notes, tasks, or calendar entries within an application. It allows users to input various criteria, constructs a corresponding search query and URL, and performs actions based on these inputs. This documentation provides a comprehensive guide to understanding and using or even modifying this Plugin.

### Error Handling

- **Try-Catch Block:** The entire method is enclosed in a `try-catch` block to ensure any errors during execution are caught and handled, displaying an alert with the error message.

### Fetching Notes

- **noteHandles and noteHandlesE:** These variables store lists of notes fetched using the `app.filterNotes()` method. These lists are used as options for user selection in the prompt.

### User Prompt

- The method displays a prompt to collect various search criteria from the user. Here are the inputs collected and their purposes:

### 1. **Enter Groups to Include**

- **Limit:** (Only for Notes)

- **Type:** String

- **Placeholder:** "Copy/Paste the Groups from above"

- **Purpose:** Specifies groups to include in the search. Groups are categories or labels assigned to notes based on their parameters.

- **Reflection:** Included groups are added to the search query, filtering notes that belong to these groups.

### 2. **Enter Groups to Exclude**

- **Limit:** (Only for Notes)

- **Type:** String

- **Placeholder:** "Copy/Paste the Groups from above"

- **Purpose:** Specifies groups to exclude from the search.

- **Reflection:** Excluded groups are added to the search query, filtering out notes that belong to these groups.

### 3. **Select Tags to Include**

- **Limit:** (Only for Notes, Tasks)

- **Type:** Tags (Comma-separated values)

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Purpose:** Specifies tags to include in the search. Tags are keywords or labels assigned to notes or tasks.

- **Reflection:** Included tags are added to the search query, filtering notes or tasks that have these tags.

### 4. **Select Tags to Exclude**

- **Limit:** (Only for Notes, Tasks)

- **Type:** Tags (Comma-separated values)

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Purpose:** Specifies tags to exclude from the search.

- **Reflection:** Excluded tags are added to the search query, filtering out notes or tasks that have these tags.

### 5. **Select a Note to Include**

- **Limit:** (Only for Calendar, Tasks)

- **Type:** Note (Selected from `noteHandles`)

- **Placeholder:** "Select a Note"

- **Purpose:** Specifies a note to include in the search for calendar entries or tasks.

- **Reflection:** The selected note's UUID is added to the search query, filtering calendar entries or tasks associated with this note.

### 6. **Select a Note to Exclude**

- **Limit:** (Only for Calendar, Tasks)

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

    - **Save to New Note:** Saves the search results to a new note.

    - **Directly Open URL:** Opens the constructed URL directly.

### Input Validation

- The method checks if at least one optional item is selected (groups, tags, keyword, notes). If none are selected, it shows an alert and exits.

### Processing Inputs

- **Conversion to Arrays:** The inputs for groups, tags, and notes are converted into arrays for easier manipulation.

- **String Trimming:** Strings are split by commas and trimmed to remove extra spaces.

### Constructing URLs and Search Queries

- **Base URL:** Determined based on the scope of the search (notes, tasks, or calendar).

- **URL Parameters:** Constructed by encoding the user inputs and concatenating them into the base URL.

- **Search Query String:** Built using the same input parameters for use within the application.

### Finalizing Outputs

- **Formatted Links:** The final search query and URL are formatted as clickable links.

- **Date and Time:** The current date and time are fetched and included in the final report for reference.

### Executing Actions

- **Based on User Selection:**

    - **New Note:** Creates a new note containing the search report.

    - **Open URL:** Opens the constructed URL directly.

    - **Replace Selection:** Replaces the current selection with the report text.

### Example Summary

- **Input Selections:**

    - Groups Included: Example

    - Groups Excluded: Another

    - Tags Included: Important, Work

    - Tags Excluded: Personal

    - Search Text: Meeting

    - Search Tasks: Notes

    - Report Date & Time: 2024-07-20 14:35:22

- ~~**Constructed Search Query: **`\[group:ExampleGroup,^AnotherGroup in:Important,Work,^Personal Meeting\](https://www.amplenote.com/notes?group=ExampleGroup,%5EAnotherGroup&tag=Important,Work,%5EPersonal&query=Meeting)`~~

- **Constructed Search Query:** `<group:Example,^Another in:Important,Work,^Personal Meeting>`

- **Constructed URL:** `https://www.amplenote.com/notes?group=Example,%5EAnother&tag=Important,Work,%5EPersonal&query=Meeting`

### Final Output

- The method provides a summary of the user's input selections and the resulting search query and URL. Depending on the user's action choice, it either creates a new note, opens the URL, or replaces the current selection with the generated report.

This detailed documentation should serve as a comprehensive guide for anyone looking to understand and utilize this method effectively.

---