---
title: 'Task Manager Pro: Download Extract Report!'
uuid: 439355fe-a818-11ef-907d-4bc7d87d3384
version: 17
created: '2024-11-21T20:22:43+05:30'
tags:
  - '-t/amplenote/mine'
  - '-2-literature'
  - '-9-permanent'
---

#### Overview

This function allows users to generate a report based on task data from their notes. The report can be filtered based on tags, formatted in different file formats (Markdown Table, CSV, TXT, JSON), and downloaded. It involves multiple steps, including collecting user inputs, filtering and sanitizing the data, and then generating the file in the selected format.


---

### **Inputs**

1. **Tags (OR) \[tagNamesOr\]**

    1. **Purpose**: Allows users to filter tasks by tags using an OR logic, where each tag is searched separately.

    1. **Type**: List of tags (comma-separated string).

    1. **Limit**: Max 10 tags.

    1. **Effect on Output**: Filters tasks where the tag matches any one of the tags in this list.

1. **Tags (AND) \[tagNamesAnd\]**

    1. **Purpose**: Allows users to filter tasks by tags using an AND logic, where all provided tags must be present on the task.

    1. **Type**: Single tag or list of tags.

    1. **Limit**: Max 10 tags (typically a single tag group).

    1. **Effect on Output**: Filters tasks that contain **all** the specified tags simultaneously.

1. **Download Format \[dwFormat\]**

    1. **Purpose**: Allows users to select the file format for the report.

    1. **Type**: One of the following radio options:

        1. Markdown Table (`download_md`)

        1. CSV (`download_csv`)

        1. TXT (`download_txt`)

        1. JSON (`download_json`)

    1. **Effect on Output**: Determines how the filtered data will be formatted before download.


---

### **Core Functionality**

1. **Prompting User Input**\
The user is prompted to select the tags for filtering tasks and to choose the desired format for the downloadable report:

    1. `tagNamesOr`: Used for tags to be filtered by OR logic.

    1. `tagNamesAnd`: Used for tags to be filtered by AND logic.

    1. `dwFormat`: Specifies the format (Markdown, CSV, TXT, JSON) for the downloadable report.

1. **Tag-based Filtering**\
The function handles the filtering of notes based on the user-specified tags:

    1. **OR logic**: For each tag in the `tagNamesOr` input, the function queries tasks that match any of the tags.

    1. **AND logic**: A single query is executed for tasks containing all the tags in `tagNamesAnd`.

1. **Sanitization**

    1. Task content and note names are sanitized to remove unwanted characters, markdown, and HTML tags before inclusion in the report.

    1. **Task content** is cleaned up to ensure only text is included.

    1. **Note name** is sanitized to remove any special characters, keeping only letters, numbers, and spaces.

1. **Sorting**\
The filtered list of tasks is sorted by the task's name (in ascending alphabetical order) to ensure consistency and readability in the final output.

1. **Formatting Task Details**\
The following task details are extracted and formatted:

    1. Task start, end, completed, and dismissed times (formatted as date and time).

    1. Task repeat information, if available, formatted to show the frequency and start date/time.

    1. Task attributes like importance, urgency, and score are included as raw data.


---

### **Output Generation**

1. **Results Collection**\
After filtering and sanitizing tasks, the details for each task are stored in an array `allTasks`, which contains an object for each task with its formatted information.

1. **File Format Handling**\
Based on the user-selected format (`dwFormat`), the data is converted into the chosen format:

    1. **Markdown**: Tasks are presented in a table format with task details displayed as rows. Headers and a divider are automatically generated for the table.

    1. **CSV**: The task details are converted to CSV format, with fields enclosed in quotes to ensure proper escaping of special characters.

    1. **TXT**: The task details are output in a readable format where each task is represented as a JSON object with its details, formatted for easy reading.

    1. **JSON**: The tasks are output in JSON format, containing all the structured data as key-value pairs.

1. **Downloading the Report**\
Once the data is formatted, the file is created as a `Blob` (binary large object) and downloaded using an HTML link element. The content type and file extension depend on the chosen format.


---

### **Function: Helper Methods**

1. **`formatTaskRepeat(repeatInfo)`**

    1. **Purpose**: This method formats the repeat information of a task, extracting the frequency and start date/time from the provided string and returning a readable format.

    1. **Input**: A string containing repeat information, typically formatted with `DTSTART` and `RRULE` properties.

    1. **Output**: A formatted string displaying the repeat frequency and the start time.

1. **`formatTimestamp(timestamp)`**

    1. **Purpose**: This method formats Unix timestamps into a readable date and time string.

    1. **Input**: A Unix timestamp (in seconds).

    1. **Output**: A formatted string of the form `MM/DD/YYYY at HH:MM:SS`.

1. **`toCSV(data)`**

    1. **Purpose**: Converts an array of objects (`results`) into CSV format.

    1. **Input**: An array of task objects.

    1. **Output**: A CSV string representing the data, with proper escaping of double quotes.

1. **`downloadFile(filename, content, contentType)`**

    1. **Purpose**: Downloads a file by creating an HTML link element and triggering a download action.

    1. **Input**: The file's name, content, and MIME type (e.g., CSV, Markdown).

    1. **Output**: A file download is triggered automatically in the browser.


---

### **Edge Cases & Error Handling**

- **No Tags or Download Format**: If the user does not provide tags or a download format, the function will show an alert prompting them to make a selection.

- **Empty or Invalid Data**: If no notes or tasks match the selected criteria, the generated report will be empty.

- **Unsupported Format**: If an unknown download format is selected, an error message is logged.


---

### **Summary of How It Works**

1. **User Selection**: The user selects tags and a download format.

1. **Filtering**: Notes and tasks are filtered based on the selected tags.

1. **Sanitization & Sorting**: Task content and note names are sanitized, and tasks are sorted.

1. **File Creation**: Based on the selected format, the tasks are formatted and converted into the appropriate file type.

1. **Download**: The file is automatically downloaded to the user's device.


---

### **Conclusion**

This plugin provides a flexible and dynamic way for users to download filtered task reports in various formats. It ensures that the user can tailor their report based on tags, choose the desired format, and get the data in a clean, readable, and easily downloadable file.