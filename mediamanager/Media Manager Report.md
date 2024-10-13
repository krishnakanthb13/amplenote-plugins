---
title: Media Manager Report
uuid: ae13d5d4-88b0-11ef-b6ed-62fb339586e5
version: 100
created: '2024-10-12T21:13:08+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
  - '-2-literature'
---

Here’s a comprehensive **How-To Guide** for users of this plugin, summarizing its functionality and detailing how to effectively use its features based on the provided code explanations and documentation.

---

## How-To Guide for the Plugin

### 1. **Generate a Report of Filtered Notes**

- **Purpose:** Create a markdown report listing notes based on user-defined tags and object types.

- **How to Use:**

    - **Select Tags (OR):**

        - Enter up to 10 tags that can be searched separately. For example, if you enter "work" and "personal," the report will include notes that have either tag.

    - **Select Tags (AND):**

        - Enter up to 10 tags that must all be present in the notes. For example, if you enter "meeting" and "urgent," only notes tagged with both will be included.

    - **Select the Object Type:**

        - Choose from the options (Attachments, Images, Videos, Links) to filter the type of content you want in the report.

    - **Run the Function:**

        - Execute the function to generate the report. The filtered notes will be sorted alphabetically and listed in markdown format.

        - The report will include clickable links for attachments, meta-information about each note (tags, creation date, update date), and categorized sections for different file types (e.g., PDFs, images).

    - **View the Report:**

        - The generated report will be displayed, showcasing the filtered notes based on your inputs.

        - The final report will be saved as a new note in Amplenote, named using the format **"MD Media Manager: List YYMMDD_HHMMSS."**

### 2. **Process and Categorize Attachments**

- **Purpose:** Generate a structured markdown report organizing different types of media attachments from notes.

### 3. **Understanding the Output**

- **Filtered Notes List:**

    - After applying your filters, the output will be a list of notes that match your specified criteria.

- **Markdown Report:**

    - The report will be organized with clear headings and clickable links, making it easy to navigate through the attachments or media types.

### 4. **Handling Edge Cases**

- **Cancellation Handling:**

    - If you cancel the input prompt, an alert will notify you, and the process will stop.

- **Empty Tag Input:**

    - If you do not provide any tags, the function defaults to searching the ^vault group.

- **No Object Type Selected:**

    - The function will alert you and stop if you fail to select an object type.

### 5. **View the Audit Log (If Applicable)**

- **Purpose:** Review the actions taken within the plugin.

- **How to Use:**

    - After generating reports, you can view entries related to your actions, including file downloads and metadata related to notes, to keep track of your media management activities.

### Additional Tips:

- **Maximize Tag Usage:** Utilize both the OR and AND tag options to fine-tune your searches for more relevant results.

- **Explore the Notes:** Familiarize yourself with the notes you have stored in Amplenote to make better use of the filtering features.

- **Review the Markdown Format:** If you're comfortable with Markdown, you can customize the appearance of the reports as needed when the formatting options are enabled in future versions.

---

## Detailed Code Documentation 

#### **Process Flow:** 

1. **Prompt for Input:**\
The user is prompted to select tags and an object type. Tags can be provided in two ways: separate tags (OR condition) or combined tags (AND condition). The object type is a mandatory field that specifies what kind of notes will be included in the report.

1. **Input Validation:**

    1. If no tags or object type are selected, the function will either alert the user to make a selection or cancel the operation if needed.

    1. Object type selection is enforced, and if missing, an alert is shown.

1. **Tag-Based Filtering Logic:**

    1. **OR Tags**: The tags provided in the OR section are split into individual tags. Each tag is searched separately to retrieve all the notes containing any of those tags.

    1. **AND Tags**: The tags provided in the AND section are combined. The function searches for notes that match all the tags together.

    1. **Default Group Filtering**: If no tags are provided, notes are filtered based on a default group ("^vault").

1. **Handling and Deduplicating Results:**

    1. After filtering, the resulting notes are deduplicated using a `Set` to ensure no duplicates remain in the final result.

1. **Sorting Notes:**

    1. The filtered notes are sorted alphabetically by note name (case-insensitive).

1. **Report Preparation:**

    1. The code sets up the framework for a markdown report that will eventually be generated from the filtered notes.

#### **Key Functions and Concepts:** 

- **`app.prompt()`**: Used to prompt the user for input, which is the driving force behind the filtering process.

- **`app.filterNotes()`**: Filters notes based on the tags or groups provided by the user.

- **Deduplication**: The `Set` structure ensures that duplicate notes are removed from the filtered results.

- **Sorting**: Notes are sorted alphabetically by their names, ensuring a structured report.

#### **Output:** 

Once the report generation is complete, the filtered and sorted notes are prepared in a markdown format.

---