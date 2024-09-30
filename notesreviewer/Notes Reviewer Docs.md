---
title: Notes Reviewer Docs
uuid: 1c90442a-532d-11ef-8716-0663d8339c46
version: 98
created: '2024-08-05T18:47:47+05:30'
tags:
  - '-2-literature'
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# Note Analysis and Review Script Documentation

\

## Overview - <mark style="color:#F8D616;">`noteOption & dailyJotOption - Review: Analyze!`<!-- {"cycleColor":"25"} --></mark>

This document explains a script designed to help users analyze and review their notes. The script includes several key steps: prompting the user for input, filtering notes based on specific criteria, creating a pivot table to summarize the notes, and generating a Markdown table from this pivot table. Finally, the script saves the analysis as a new note with a dynamically generated filename.

### Step 1: Prompt the User for Analysis Options

**Input:**

- The user is prompted to choose how they want to analyze their notes, either by "Note Created Date" or "Note Last Modified Date."

**Explanation:**

- A prompt dialog appears asking the user to select the criteria for analysis.

- The user's choice is stored in the `result` variable.

- If the user cancels the operation, an alert is shown, and the script stops execution.

**Effect in Final View:**

- The user's choice will determine how the notes are grouped and counted in the pivot table.

### Step 2: Filter Notes by Tag and Group

**Input:**

- The script filters notes by a specific tag excluding (`"-notes-reviewer"`) and by groups (excluding deleted and plugin-related notes).

**Explanation:**

- The script retrieves notes that are not tagged with `"-notes-reviewer"`.

- It also retrieves notes that are not a part of specific groups (`"^deleted"` and `"^plugin"`).

- A set is created from the group-filtered notes for quick lookup.

- The intersection of the two filtered lists results in `filteredNotes`, which contains notes that match both criteria.

**Effect in Final View:**

- Only notes that are relevant to the analysis (i.e., tagged and not part of the excluded groups) are included.

### Step 3: Create a Pivot Table

**Input:**

- The `notes` array and the `dateField` (user-selected date criteria).

**Explanation:**

- The script iterates through each note, extracts the year and month from the selected date field, and increments the count for each year and month combination in a matrix.

- The `pivot` function returns this matrix, summarizing the notes by month and year.

**Effect in Final View:**

- The pivot table organizes the note counts by month and year, which will be used to create a readable Markdown table.

### Step 4: Generate a Markdown Table from the Pivot Table

**Input:**

- The pivot table created in the previous step.

**Explanation:**

- The script identifies all unique years present in the pivot table.

- It constructs a Markdown table header with the month names and year columns.

- For each month, it adds a row to the table, displaying the count of notes for each year.

**Effect in Final View:**

- The Markdown table provides a clear, visual summary of note counts by month and year, making it easy to identify patterns and trends.

### Step 5: Output the Final Markdown Table

**Input:**

- The generated Markdown table and current date/time.

**Explanation:**

- The script creates a filename based on the current date and time.

- It formats a result text that includes the analysis details and the Markdown table.

- A new note is created with the generated filename and the result text is inserted into it.

**Effect in Final View:**

- The user receives a new note containing the analysis, with a filename indicating when it was created.

- The note includes a detailed pivot table and Markdown table, summarizing the notes based on the selected criteria.

\

## Overview - <mark style="color:#F8D616;">`insertText - Review: Report!`<!-- {"cycleColor":"25"} --></mark>

This document explains a script designed to help users analyze and review their notes based on various user inputs. The script includes several key steps: prompting the user for input, validating the input, filtering notes based on the criteria, and generating a Markdown table from the filtered notes. The final output is inserted into the note as a text report.

### Step 1: Prompt the User for Analysis Options

**Input:**

- The user is prompted with several options to customize their note review session:

    - **"I am feeling Lucky!"** (checkbox)

    - **"How many Notes would you like to Review today? (Between: 5 - 25)"** (string input)

    - **"Sort by Untagged Notes."** (checkbox)

    - **"Type the Month-Year that you want the Report for! (Skip if the Get Lucky! is Selected!)"** (string input)

    - **"Override to Created Date. (Default: Last Modified / Updated)"** (checkbox)

**Explanation:**

- A prompt dialog appears with multiple input fields allowing the user to customize their note review.

- The user's input is stored in the `result` variable.

- If the user cancels the operation, an alert is shown, and the script stops execution.

**Effect in Final View:**

- The user's selections determine how the notes are filtered, sorted, and presented in the final report.

### Step 2: Validate User Input

**Input:**

- The `result` array containing user selections.

- Validation patterns for month-year and notes count.

**Explanation:**

- The script splits the `result` array into individual variables.

- It ensures the number of notes input is between 5 and 25 and the month-year input follows the format 'M-YYYY' or 'MM-YYYY'.

- If any validation fails, an alert is shown, and the script stops execution.

**Effect in Final View:**

- Ensures that user inputs are valid and prevent errors during note filtering.

### Step 3: Filter Notes

**Input:**

- Filters for notes not tagged with `"-notes-reviewer"` and not part of the `"^deleted"` or `"^plugin"` groups.

**Explanation:**

- The script retrieves notes based on the specified tag and group filters.

- A set of note IDs from the group-filtered results is created for quick lookup.

- The intersection of the two filtered lists results in `filteredNotes`, which contains notes that match both criteria.

**Effect in Final View:**

- Only relevant notes that are tagged and not part of the excluded groups are included for further processing.

### Step 4: Apply User-Specified Filters and Sorting

**Input:**

- User selections for "Get Lucky!", number of notes, sorting by untagged notes, month-year filter, and date field override.

**Explanation:**

- If "Get Lucky!" is selected, notes are shuffled randomly.

- If a month-year is specified, notes are filtered based on the creation or modification date.

- If sorting by untagged notes is selected, notes are sorted to prioritize untagged ones.

- The number of notes is limited to the user-specified count, defaulting to 5 if unspecified.

**Effect in Final View:**

- The notes list is tailored based on user preferences, ensuring the report is personalized and manageable.

### Step 5: Add Tags and Generate Markdown Table

**Input:**

- The filtered and sorted list of notes.

**Explanation:**

- The script adds an "inbox" tag to each note in the final list.

- It formats the date-time strings for display.

- A Markdown table is created with headers and rows, each containing note details.

**Effect in Final View:**

- A neatly formatted Markdown table summarizing the notes is generated for easy review.

### Step 6: Output the Final Markdown Table

**Input:**

- The generated Markdown table and current date/time.

**Explanation:**

- A filename is created based on the current date and time.

- An input summary is prepared to include user selections.

- The final note content, including the input summary and Markdown table, is inserted into the application.

**Effect in Final View:**

- The user receives a new note containing a detailed summary and Markdown table of their filtered notes.

\

## Overview - <mark style="color:#F8D616;">`linkOption - Review: Decide!`<!-- {"cycleColor":"25"} --></mark>

This document explains a script designed to guide users through reviewing and deciding the status of their notes. The script prompts the user to select a review decision, apply tags, add comments, and document the review process. The final output is inserted into the application as an audit record.

### Step 1: Prompt the User for Review Decisions

**Input:**

- The user is prompted with several options to make review decisions:

    - **"Select The Review Decision!"** (dropdown select)

        - Options: "Keep - Review Completed!", "Discard - Review Completed!", "Review - Review Pending!"

    - **"Select Tags outside the Standardized Review Tags!"** (tags input with a limit of 10)

    - **"Free to Type a Tag to apply"** (string input)

    - **"Add your comments for this Review!"** (text input)

**Explanation:**

- A prompt dialog appears with multiple input fields allowing the user to make a review decision and add relevant tags and comments.

- The user's input is stored in the `result` variable.

- If the user cancels the operation, an alert is shown, and the script stops execution.

**Effect in Final View:**

- The user's selections determine the tags to be applied to the note, the review decision, and any comments added to the audit record.

### Step 2: Validate User Input and Log Selections

**Input:**

- The `result` array containing user selections.

**Explanation:**

- The script splits the `result` array into individual variables.

- It ensures that the review decision is not selected alongside multiple or single tags.

- The user's selections are logged for debugging purposes.

**Effect in Final View:**

- Ensures that the user input follows the expected logic, preventing conflicting selections.

### Step 3: Validate the Note URL

**Input:**

- The URL of the note being reviewed.

**Explanation:**

- The script checks if the URL starts with "https://www.amplenote.com/notes/".

- If the URL is not valid, an alert is shown, and the script stops execution.

**Effect in Final View:**

- Ensures that only valid Amplenote URLs are processed.

### Step 4: Extract the Note UUID

**Input:**

- The URL of the note.

**Explanation:**

- A regular expression is used to extract the UUID from the URL.

- The UUID is stored for further processing.

**Effect in Final View:**

- Extracts and logs the UUID for identifying the note in subsequent steps.

### Step 5: Remove Predefined Tags and Add New Tags

**Input:**

- The note UUID and user-selected tags.

**Explanation:**

- If a review decision tag is selected, predefined review tags are removed from the note.

- The selected decision tag is added to the note.

- Any additional tags provided by the user are also added to the note.

- Tags are stored in a set to ensure uniqueness.

**Effect in Final View:**

- The note is updated with the appropriate tags based on the user's selections.

### Step 6: Audit Reporting

**Input:**

- The note UUID, user-selected tags, and comments.

**Explanation:**

- The current date and time are formatted.

- The note details, including its name and URL, are retrieved.

- An audit record is created, summarizing the review decision, tags applied, and comments.

- The audit record is inserted into the report note.

**Effect in Final View:**

- A detailed audit record is generated and inserted, providing a clear history of the review process.

This documentation serves as a comprehensive guide for understanding and utilizing the note review and decision script, providing clear directions and explanations for each step and input.

\

---

\

## Here's a high-level explanation of the provided code: <mark style="color:#F8D616;">`noteOption & dailyJotOption`<!-- {"cycleColor":"25"} --></mark>

1. **Prompt the User for Input**:

    1. The user is prompted to choose how they want to proceed with the analysis, either by "Note Created Date" or "Note Last Modified Date".

1. **Handle User Cancellation**:

    1. If the user cancels the operation, an alert is displayed, and the process stops.

1. **Initialization**:

    1. Variables are initialized, including an empty array for notes and the selected date field from the user input.

1. **Filter Notes**:

    1. Notes are first filtered by a specific tag.

    1. Then, notes are filtered by groups (excluding certain groups like deleted or plugin notes).

    1. The intersection of these two filtered sets is found, resulting in `filteredNotes`.

1. **Pivot Table Creation**:

    1. A pivot table is created to summarize the number of notes by month and year based on the selected date field.

1. **Generate Markdown Table**:

    1. A Markdown table is generated from the pivot table, displaying the count of notes for each month and year.

1. **Generate Result Text**:

    1. The final result text, including the Markdown table, is prepared. This text includes instructions for further steps and analysis.

1. **Create and Save Note**:

    1. A new note is created to hold the analysis report, and the generated content is inserted into this note.

Throughout the process, there are comments and console logs (commented out) that help in understanding the flow and debugging the code if needed.

\

\

## Here's a high-level explanation of the provided code:  <mark style="color:#F8D616;">`insertText`<!-- {"cycleColor":"25"} --></mark>

1. **Prompt the User for Input**:

    1. The user is prompted to specify their preferences for the report, including options like feeling lucky, the number of notes to review, sorting by untagged notes, specifying a month-year, and overriding the default date field.

1. **Handle User Cancellation**:

    1. If the user cancels the operation, an alert is displayed, and the process stops.

1. **Initialization and Validation**:

    1. The user inputs are captured and validated. The month-year input and the number of notes are validated against specified patterns.

1. **Filter Notes**:

    1. Notes are first filtered by a specific tag.

    1. Then, notes are filtered by groups (excluding certain groups like deleted or plugin notes).

    1. The intersection of these two filtered sets is found, resulting in `filteredNotes`.

1. **Apply User Preferences**:

    1. If the "Get Lucky!" option is not selected and a month-year is provided, notes are filtered based on the specified month and year.

    1. Notes are randomly shuffled regardless of the "Get Lucky!" selection.

    1. If the "Sort by Untagged Notes" option is selected, notes are sorted to prioritize untagged notes.

    1. The number of notes is limited based on the user's input.

1. **Tag and Format Notes**:

    1. The final set of notes is tagged with "-notes-reviewer/1-inbox".

    1. The notes are formatted into a Markdown table, including details such as note name, created date, updated date, and tags.

1. **Generate Result Text**:

    1. The result text is prepared, including the user's input summary and the formatted Markdown table.

    1. This text includes instructions for reviewing and categorizing notes, such as keeping, discarding, or flagging notes for further review.

1. **Insert Result into Context**:

    1. The generated result text is inserted into the current context for the user to review and proceed with the next steps.

Throughout the process, there are comments and console logs (commented out) that help in understanding the flow and debugging the code if needed.

\

## Here's a high-level explanation of the provided code: <mark style="color:#F8D616;">`linkOption`<!-- {"cycleColor":"25"} --></mark>

1. **Prompt the User for Input**:

    1. A prompt is displayed to the user to select a review decision, tags, a custom tag, and add comments.

1. **Handle User Cancellation**:

    1. If the user cancels the operation, an alert is displayed, and the process stops.

1. **Log User Selections for Debugging**:

    1. User input selections are logged for debugging purposes.

1. **Retrieve Current Note UUID**:

    1. The UUID of the current note is retrieved and logged.

1. **Predefined Review Tags**:

    1. A set of predefined review tags is defined and logged.

1. **Destructure User Inputs**:

    1. User input selections are destructured and logged.

1. **Validate Inputs**:

    1. Checks if both decision tags and multiple/single tags are selected simultaneously and alerts the user if so.

1. **Check Amplenote URL**:

    1. Verifies if the provided link is an Amplenote URL and extracts the UUID if valid.

1. **Remove Predefined Tags**:

    1. If a decision tag is selected, predefined review tags are removed from the note, and the decision tag is added.

1. **Add Multiple Tags**:

    1. If multiple tags are provided, they are added to the note along with a "moved" tag.

1. **Add Single Tag**:

    1. If a single tag is provided, it is added to the note along with a "moved" tag.

1. **Audit Reporting**:

    1. Prepares and logs formatted text for audit reporting, including the date, note title, added tags, and user comments.

1. **Insert Audit Text into Note**:

    1. Inserts the formatted audit text into the report note.

\

---

\