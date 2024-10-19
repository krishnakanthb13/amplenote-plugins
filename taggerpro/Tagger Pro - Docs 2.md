---
title: Tagger Pro - Docs 2
uuid: 2a01db68-8c86-11ef-8f66-ceeb1c0a5b1e
version: 107
created: '2024-10-17T18:18:52+05:30'
tags:
  - '-9-permanent'
  - '-2-literature'
  - '-t/amplenote/mine'
---

# Correlation Matrix for Tags

### High-Level Explanation

The part of the code implements an asynchronous function for generating a correlation matrix of tags from notes. The user is prompted to select specific tags and a preferred file format for downloading the correlation matrix. The function retrieves notes associated with the selected tags, analyzes their relationships, and constructs a matrix that reflects how frequently different tags co-occur across the notes. The matrix is then formatted based on the user’s selection (CSV, JSON, or text) and downloaded to the user's device.

## Detailed Documentation

Function Name: `Correlation Matrix for Tags`

### **Purpose**:\
To create a correlation matrix that captures the relationships between different tags found in notes and provide an option to download the matrix in various formats.

### Inputs

1. **Tag Selection**:

    1. **Label**: "Select the Tags to Filter (leave blank to consider all)"

    1. **Type**: `tags`

    1. **Limit**: `10`

    1. **Purpose**: Allows the user to specify up to 10 tags to filter the notes. If left blank, all notes will be considered.

1. **Download Format**:

    1. **Label**: "Format to Download"

    1. **Type**: `radio`

    1. **Options**:

        1. CSV (Suggested)

        1. JSON

        1. Array (txt)

    1. **Purpose**: Lets the user choose the format for downloading the correlation matrix.

### Functionality

1. **Prompt User Input**: The function starts by prompting the user to select tags and the download format. If the user cancels the operation, an alert is displayed, and the function exits.

1. **Retrieve Notes**: Based on the selected tags:

    1. If specific tags are chosen, it retrieves notes containing those tags.

    1. If no tags are selected, it retrieves all notes.

1. **Create Tag Array**: The function flattens the tags from the retrieved notes, removes duplicates, and sorts them to generate a unique list of tags.

1. **Initialize Correlation Matrix**:

    1. A square matrix is created to count the co-occurrences of tags. The matrix is initialized with zeros.

1. **Count Co-occurrences**:

    1. For each note, the function checks the tags and increments the count in the matrix for each unique tag pair that appears together.

1. **Download Options**:

    1. Based on the user's selected format, the correlation matrix is generated as follows:

        1. **Document**: For ever Tag, its matching pair occurrence count.

        1. **Trend**: Sorts highest tag match and sorts accordantly. Ignores self tag / single tagged notes.

        1. **CSV**: Rows contain the tags and their counts.

        1. **JSON**: An object is created containing the variables (tags) and the matrix.

        1. **Text (Array)**: A simple representation of the matrix is generated.

    1. The generated content is then downloaded to the user's device.

### Outputs

- The function produces a correlation matrix that represents the frequency of tag co-occurrences across notes. This matrix is saved in the selected format (CSV, JSON, or text) and downloaded automatically.

### Additional Functions

- **`downloadFile(data, fileName, type)`**:

    - **Purpose**: Facilitates the download of generated content as a file. It creates a Blob from the data, generates a temporary link, and triggers a download.

- **`getCurrentDateTime()`**:

    - **Purpose**: Retrieves the current date and time formatted as YYMMDD_HHMMSS for naming the downloaded file uniquely.

### Usage Example

To use this function, simply call `CorrelationMatrixForTags(app)` within an application context where the `app` object has the required methods for prompting the user and filtering notes.

---

# Clickable Links for Groups

### High-Level Explanation

The code defines an asynchronous function that creates a markdown note containing clickable links for various groups of notes within the Amplenote application. It categorizes notes based on different criteria, such as their status (archived, active, shared, etc.) and creation date (today, this week). If the note does not already exist, it generates a new note, sets its content to the specified markdown format, and navigates the user to view the note. The resulting markdown is structured for clarity, with categories as headers and descriptive links for easy navigation.

## Detailed Documentation

Function Name: `Clickable Links for Groups`

### **Purpose**:

To generate a markdown note containing organized clickable links that direct users to different groups of notes in the Amplenote application.

### Functionality Overview

1. **Markdown Content Creation**: The function constructs a markdown string that contains categorized links to different groups of notes. Each category is clearly labeled, and each link provides a description of what notes are included.

1. **Note Management**: The function checks if a note for clickable links already exists. If not, it creates a new note and assigns it a unique identifier (UUID).

1. **Navigation**: After creating or updating the note, the function directs the user to the newly created or updated note within the Amplenote application.

### Inputs

- **App Context (`app`)**:

    - **Type**: Object

    - **Purpose**: Represents the Amplenote application context, allowing the function to interact with its features such as creating notes, replacing content, and navigating URLs.

### Key Variables

1. **`groupMarkdown`**:

    1. **Type**: String

    1. **Purpose**: Contains the markdown formatted content for the note. It includes:

        1. **Grouped Folders**: Links to archived, vault, deleted, active plugin notes, etc.

        1. **Notes Containing Tasks**: Link to task lists.

        1. **Untagged Notes**: Link to notes without tags.

        1. **Shared Notes**: Links to notes created by the user, shared publicly, shared with the user, and more.

        1. **Creation Date**: Links to notes created today or this week.

        1. **Low-Level Queries**: Links to notes with pending changes or being indexed.

    1. **Format**: Organized in categories for clarity.

1. **`groupNoteName`**:

    1. **Type**: String

    1. **Purpose**: The name of the note that will hold the markdown content (`"Group Clickable Links"`).

1. **`groupTagName`**:

    1. **Type**: Array of Strings

    1. **Purpose**: Tags associated with the note for organizational purposes (e.g., `\['-reports/-tagger-pro'\]`).

1. **`groupnoteUUID`**:

    1. **Type**: String

    1. **Purpose**: A unique identifier for the note. The function checks if it already exists; if not, it creates a new note and retrieves the new UUID.

### Function Steps

1. **Check for Existing Note**:

    1. The function retrieves the existing UUID for the note. If it exists, it uses that UUID; if not, it creates a new note and stores the new UUID.

1. **Replace Note Content**:

    1. The function updates the content of the note with the generated markdown string.

1. **Navigate to Note**:

    1. The function redirects the user to the view of the newly created or updated note using its UUID.

### Outputs

- The output of this function is a note in the Amplenote application containing structured markdown links that allow users to easily access different groups of notes.

### Example Usage

To use this function, invoke `ClickableLinksForGroups(app)` within a suitable context where the `app` object represents the Amplenote application, ensuring it has the necessary methods for managing notes.

---

# Clickable Links for Tags

### High-Level Explanation

The code defines an asynchronous function that generates a markdown note with clickable links for all unique tags associated with notes in the Amplenote application. It retrieves notes, extracts their tags, and formats them into a structured markdown format that includes links to filter notes by each tag. The resulting markdown is organized, including parent-child tag relationships, and is saved as a note in the Amplenote application. The function ensures that if any tags have parent tags that don't directly correspond to existing notes, those parent tags are included as well.

## Detailed Documentation

Function Name: `Clickable Links for Tags`

### **Purpose**:

To create a markdown note containing organized clickable links that direct users to various tags within the Amplenote application.

### Functionality Overview

1. **Note Retrieval**: The function fetches all notes from the Amplenote application.

1. **Tag Extraction**: It identifies and sorts all unique tags associated with the retrieved notes.

1. **Markdown Link Creation**: It generates markdown links for each tag, maintaining proper indentation for parent-child relationships.

1. **Parent Tag Handling**: The function includes parent tags for those tags that lack associated notes to ensure a comprehensive link set.

1. **Note Management**: It checks for the existence of a specific note for storing these links, creating it if necessary, and updating its content.

1. **Navigation**: Finally, it directs the user to the note containing the tag links.

### Inputs

- **App Context (`app`)**:

    - **Type**: Object

    - **Purpose**: Represents the Amplenote application context, allowing the function to interact with features like retrieving notes, creating new notes, replacing content, and navigating to URLs.

### Key Variables

1. **`notes`**:

    1. **Type**: Array

    1. **Purpose**: Holds all notes retrieved from the Amplenote application.

1. **`noteTags`**:

    1. **Type**: Array

    1. **Purpose**: Contains unique and sorted tags extracted from the notes.

1. **`formatTagToMarkdownLink`**:

    1. **Type**: Function

    1. **Purpose**: Formats a given tag into a markdown link, considering its hierarchy for indentation.

1. **`parentTags`**:

    1. **Type**: Set

    1. **Purpose**: Keeps track of parent tags that are not directly associated with any notes but are necessary for understanding tag relationships.

1. **`uniqueMarkdownLinks`**:

    1. **Type**: Set

    1. **Purpose**: Stores unique markdown links to avoid duplicates while building the output.

1. **`finalMarkdownLinks`**:

    1. **Type**: String

    1. **Purpose**: Contains the final concatenated markdown links for all tags, ready for output.

1. **`tagMarkdown`**:

    1. **Type**: String

    1. **Purpose**: Holds the markdown content for the note, including the unique tag links and additional details.

1. **`tagNoteName`**:

    1. **Type**: String

    1. **Purpose**: The name of the note that will store the tag links (`"Tag Clickable Links"`).

1. **`tagTagName`**:

    1. **Type**: Array of Strings

    1. **Purpose**: Tags associated with the note for organizational purposes (e.g., `\['-reports/-tagger-pro'\]`).

1. **`tagnoteUUID`**:

    1. **Type**: String

    1. **Purpose**: A unique identifier for the note. The function checks if it already exists; if not, it creates a new note and retrieves the new UUID.

### Function Steps

1. **Fetch Notes**:

    1. The function retrieves all notes from the application using `app.filterNotes({ })`.

1. **Extract and Sort Tags**:

    1. It gathers unique tags from the notes, sorts them, and stores them in `noteTags`.

1. **Markdown Link Creation**:

    1. For each tag, it generates a markdown link and checks for parent-child relationships.

1. **Parent Tag Management**:

    1. If any parent tags are missing from `noteTags`, they are added to `parentTags`.

1. **Combine Links**:

    1. The function adds all unique markdown links (including parent tags) to `uniqueMarkdownLinks`.

1. **Prepare Markdown Content**:

    1. The final markdown content, `tagMarkdown`, is created, including all unique tag links and additional details.

1. **Check for Existing Note**:

    1. The function checks if a note for clickable tags already exists. If it does, it uses that UUID; if not, it creates a new note and stores the new UUID.

1. **Replace Note Content**:

    1. The function updates the content of the note with the generated markdown string.

1. **Navigate to Note**:

    1. Finally, it redirects the user to the view of the newly created or updated note using its UUID.

### Outputs

- The output of this function is a note in the Amplenote application containing structured markdown links that allow users to easily access various tags.

### Example Usage

To use this function, invoke `ClickableLinksForTags(app)` within a suitable context where the `app` object represents the Amplenote application, ensuring it has the necessary methods for managing notes.

---

\