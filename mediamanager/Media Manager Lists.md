---
title: Media Manager Lists
uuid: b0f410b6-88b0-11ef-b6ed-62fb339586e5
version: 55
created: '2024-10-12T21:13:14+05:30'
tags:
  - '-9-permanent'
  - '-2-literature'
  - '-t/amplenote/mine'
---

Here’s a comprehensive list of “How To’s” for general users of this plugin based on the provided code explanations. These instructions will help users navigate through the functionalities of the Lists! and Markdown report generation features effectively:

---

### How To Use the Lists! Function

1. **Access the Lists! Function:**

    1. Open the plugin interface where the Lists! function is available.

1. **Input Tags for Filtering:**

    1. **Select Tags \[OR\]:**

        1. Enter up to 10 tags in the "OR" input field. This will include notes that contain any of the specified tags.

        1. Example: Entering `work` and `personal` retrieves notes tagged with either.

    1. **Select Tags \[AND\]:**

        1. Enter up to 10 tags in the "AND" input field. This will include notes that contain all specified tags.

        1. Example: Entering `meeting` and `urgent` retrieves notes tagged with both.

1. **Choose the Object Type:**

    1. Select the type of content you want to filter:

        1. **Attachments:** Retrieve notes containing attachments.

        1. **Images:** Retrieve notes containing images.

        1. **Videos:** Retrieve notes containing videos.

        1. **Links:** Retrieve notes containing links.

1. **List Formatting <mark style="color:#F2998C;">(Currently Inactive)<!-- {"cycleColor":"34"} --></mark>:**

    1. Note that the list formatting options are currently commented out and default to a document format. Future updates may allow for different formats.

1. **Run the Function:**

    1. After inputting your tags and selecting the object type, run the Lists! function. It will:

        1. Filter notes based on your criteria.

        1. Remove duplicates and sort the notes alphabetically.

        1. Generate a Markdown report.

1. **View the Report:**

    1. Once generated, the report will display the filtered notes in Markdown format with a horizontal line separating sections for clarity.

---

### How To Generate a Markdown Report for Media Attachments

1. **Select Object Type for Media Report:**

    1. Choose the desired object type from the following options:

        1. **All-Attachments:** To list all file types (e.g., .xlsx, .pdf).

        1. **All-Images:** To list all image files (e.g., .jpg, .png).

        1. **All-Videos:** To list all video files (e.g., .mp4, .mov).

        1. **All-Links:** To list all non-attachment web links.

1. **Prepare Your Notes:**

    1. Ensure that the notes have been pre-fetched with necessary metadata, including tags and timestamps.

1. **Run the Script:**

    1. Execute the script to generate the Markdown report based on your selected object type.

    1. The script will:

        1. Retrieve attachments, images, or links from the notes.

        1. Filter and categorize the media based on specified formats.

1. **Review the Markdown Report:**

    1. The report will include:

        1. A header for each media type.

        1. Clickable links for each note and its attachments.

        1. Tags, creation dates, and update dates displayed in the report.

1. **Saving the Report:**

    1. The generated Markdown report will be automatically saved as a new note in Amplenote.

    1. The note will have a timestamped title in the format `MD Media Manager: List YYMMDD_HHMMSS`, making it easy to locate.

    1. You can find the note under the tag `-reports/-media-manager`.

---

### Tips for Optimal Usage

- **Canceling Operations:**

    - If you decide to cancel any input prompt during the process, the function will display an alert and stop execution.

- **Handling No Input:**

    - If no tags are provided, the function defaults to searching the `^vault` group for notes.

- **No Object Type Selected:**

    - Ensure you select an object type; otherwise, the function will not proceed and will alert you.

---

This guide provides clear steps for users to utilize the Lists! function and the Markdown report generation effectively.

---

## Detailed Code Documentation: 

#### Step-by-Step Process: 

1. **Prompting the User:**\
The user is prompted to select tags for filtering and an object type for categorization. The user inputs tags using either the OR or AND fields and selects the type of objects to include in the report (attachments, images, videos, or links).

1. **Handling User Inputs:**

    1. The function extracts the user's input using de-structuring and validates the input.

    1. If the user cancels the process or fails to select an object type, an alert is triggered, and the function stops execution.

1. **Filtering Notes by Tags (OR and AND):**

    1. The function splits the OR tags into an array of individual tags and searches for notes matching each tag separately.

    1. If AND tags are provided, the function searches for notes that contain all the AND tags simultaneously.

    1. If no tags are provided, the function defaults to retrieving notes from the `^vault` group.

1. **Removing Duplicates:**\
After filtering, the function removes duplicate notes by converting the `filteredNotes` array to a `Set` and back to an array.

1. **Sorting Notes:**\
The filtered notes are sorted alphabetically in a case-insensitive manner, using the note's name.

1. **Generating the Markdown Report:**\
The final list of filtered and sorted notes is formatted into a markdown document. Each section of the report is separated by a horizontal line for better readability.

---

#### **Functionality Overview**: 

This script generates a Markdown report that organizes attachments from notes within the Amplenote app, categorized by specific file types, including:

1. Attachments: `.xlsx`, `.docx`, `.pdf`, etc.

1. Images: `.jpg`, `.png`, `.gif`, etc.

1. Videos: `.mp4`, `.mov`, `.webm`, etc.

1. External Links (non-attachments): General web links.

The final report is stored as a new note in the app with a timestamped title.

---