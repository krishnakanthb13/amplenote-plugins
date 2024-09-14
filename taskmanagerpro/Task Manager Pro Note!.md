---
title: 'Task Manager Pro: Note!'
uuid: 139b8070-72c0-11ef-870a-eeba9115991d
version: 22
created: '2024-09-14T23:07:55+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
  - '-2-literature'
---

# Code Documentation: Task Progress & Categorization

This documentation explains how to use the provided code, focusing on the input, functionality, and how it generates the output, similar to a 'How-To' or reference guide.

---

## Overview

This script is designed to work within Amplenote that manages tasks, where each task can be in one of three states: pending, completed, or dismissed. The code fetches tasks, organizes them based on their status, and generates a progress bar that reflects the proportion of completed tasks. Additionally, it displays categorized tasks with different emoji sets to visualize progress in a fun and customizable way.

---

### Inputs and Purpose

1. **app**:

    - **Type**: Application Object

    - **Purpose**: Provides access to the application's features, such as fetching tasks and updating notes.

    - **Role**: Central object used for managing notes and tasks.

1. **noteUUID**:

    - **Type**: String (UUID)

    - **Purpose**: Unique identifier for the note where task progress and task list will be displayed.

    - **Role**: Used to locate specific notes in the app and apply changes.

---

## Step-by-Step Workflow

### 1. **Getting the 'Progress' Section**

- **Purpose**: Locate a section titled "Progress" within the note to display the task summary.

- **Logic**:

    - Fetch all sections using `app.getNoteSections`.

    - Locate the "Progress" section by searching for the section heading with the text "Progress".

    - **Edge Case**: If the "Progress" section is missing, an alert is displayed asking the user to create the section with specific formatting. The function exits here.

### 2. **Processing Tasks**

- **Purpose**: Retrieve tasks associated with the note and categorize them.

- **Logic**:

    - Fetch only pending tasks via `app.getNoteTasks({ uuid: noteUUID })`.

    - Fetch all tasks, including completed and dismissed ones, using the same method but with the `includeDone` flag.

### 3. **Helper Functions**

These functions assist in formatting and organizing the tasks:

- **formatUnixTimestamp(unixTimestamp)**: Converts a UNIX timestamp to a human-readable format (`YYYY-MM-DD HH:MM:SS`).

- **sortByTimestamp(a, b, key)**: Sorts tasks based on a specified timestamp key (e.g., `completedAt`, `dismissedAt`).

- **formatPendingTask(task)**: Formats pending tasks by including their content, start time, and urgency/importance indicators.

### 4. **Categorizing and Formatting Tasks**

- **Completed Tasks**:

    - Filters tasks with a `completedAt` timestamp.

    - Sorts them by completion time and formats them for display.

- **Dismissed Tasks**:

    - Filters tasks with a `dismissedAt` timestamp.

    - Sorts and formats them for display.

- **Pending Tasks**:

    - Filters tasks without a `completedAt` or `dismissedAt` timestamp.

    - Sorts them by their start time and formats them with labels such as "Important" or "Urgent".

### 5. **Task Progress Calculation**

- **Purpose**: Calculate the percentage of completed tasks and prepare the progress bar.

- **Logic**:

    - `taskPendingN`: Number of pending tasks.

    - `taskAllN`: Total number of tasks (completed, pending, and dismissed).

    - `taskCompletedRatio`: The ratio of completed tasks (`1 - (pending / total)`).

    - **Output**: `taskCompletedPercent` (percentage of tasks completed).

### 6. **Displaying Progress Bar**

- **Purpose**: Generate a visual representation of task completion using customizable emoji sets.

- **Logic**:

    - A variety of emoji sets (such as hearts, stars, circles, etc.) is provided.

    - Users can choose the desired set via the app settings (`app.settings\["Emoji"\]`).

    - Depending on the completion percentage, a progress bar is displayed using the selected emoji set.

### 7. **Adding Categorized Task List to Output**

- **Purpose**: Combine the progress bar and categorized tasks into a formatted string and update the note.

- **Logic**:

    - The string `allTaskCategorized` holds the pending, completed, and dismissed tasks.

    - The progress bar and task summary are inserted into the "Progress" section of the note using `app.replaceNoteContent`.

---

## Outputs

1. **Progress Bar**:

    - Displays the current task completion percentage in a visual format, using symbols from the selected emoji set.

    - Example (50% completion with stars):


      ```
      [★★★★★☆☆☆☆☆] 50%
      ```

1. **Task Summary**:

    - Categorized task list displaying pending, completed, and dismissed tasks.

    - Example:


      ```
      Task Summary:
      Pending Tasks: #2
      Task: Complete report, Start At: 2024-09-10 14:00:00, Important, Urgent
      Task: Schedule meeting, Start At: Not Asigned
      Completed Tasks: #3
      Task: Review document, Completed At: 2024-09-09 10:00:00
      Dismissed Tasks: #1
      Task: Call client, Dismissed At: 2024-09-08 12:30:00
      ```

---

## Conclusion

This code helps users manage their tasks more effectively by visually displaying task progress, categorizing tasks, and allowing customization of the display via emoji sets. It improves task tracking by ensuring that users can easily view pending, completed, and dismissed tasks while understanding their overall progress.