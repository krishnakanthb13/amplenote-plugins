---
title: Task Manager Note! Docs
uuid: c5843cea-6457-11ef-b225-22074e34eefe
version: 13
created: '2024-08-27T15:06:02+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
  - '-2-literature'
---

# Documentation: Task Progress Management and Task Categorization Plugin Script (Progress Bar 2.0)

## Overview

This script manages and updates the "Progress" section of a note in an application. It processes tasks within the note, calculates task progress, and updates the note with a progress bar and categorized task list. This guide explains the functionality of each section of the script and how it reflects in the final output.

## Inputs and Functionality

### 1. Function Declaration

```javascript
async noteOption(app, noteUUID) {
```

- **Input**:

    - `app`: The application object containing methods to interact with notes and tasks.

    - `noteUUID`: The unique identifier for the note to be processed.

- **Purpose**:

    - This function is designed to handle note content, particularly focusing on tasks and their progress.

### 2. Getting the 'Progress' Section

```javascript
const sections = await app.getNoteSections({ uuid: app.context.noteUUID });
const section = sections.find((section) => section.heading?.text === "Progress");
```

- **Input**:

    - Uses the application's `getNoteSections` method to retrieve all sections of the note specified by `app.context.noteUUID`.

- **Purpose**:

    - Finds the section with the heading "Progress". If this section is missing, the user is prompted to create it.

- **Output**:

    - If the "Progress" section is not found, an alert is displayed with instructions to create one.

### 3. Processing the Tasks

```javascript
const taskPending = await app.getNoteTasks({ uuid: noteUUID });
const taskAll = await app.getNoteTasks({ uuid: noteUUID }, { includeDone: true });
```

- **Input**:

    - `app.getNoteTasks`: Retrieves tasks for the specified note. The first call fetches only pending tasks, while the second includes completed and dismissed tasks.

- **Purpose**:

    - To process and categorize tasks into pending, completed, and dismissed.

- **Output**:

    - `taskPending`: List of tasks that are still pending.

    - `taskAll`: List of all tasks, including those that are completed or dismissed.

### 4. Helper Functions

#### Convert UNIX Timestamp

```javascript
function formatUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}
```

- **Input**:

    - `unixTimestamp`: A UNIX timestamp representing a date and time.

- **Purpose**:

    - Converts the UNIX timestamp to a human-readable date format (`YYYY-MM-DD HH:MM:SS`).

- **Output**:

    - A formatted date string.

#### Sort Tasks by Timestamp

```javascript
function sortByTimestamp(a, b, key) {
  return (a[key] || 0) - (b[key] || 0);
}
```

- **Input**:

    - `a`, `b`: Task objects to be compared.

    - `key`: The key in the task object that holds the timestamp.

- **Purpose**:

    - Sorts tasks based on a specific timestamp field.

- **Output**:

    - Numeric comparison result for sorting.

#### Format Pending Task

```javascript
function formatPendingTask(task) {
  const importantText = task.important ? `Important` : '';
  const urgentText = task.urgent ? `Urgent` : '';
  const additionalInfo = [importantText, urgentText].filter(Boolean).join(', ');
  return `Content: ${task.content}, Start At: ${formatUnixTimestamp(task.startAt)}` + (additionalInfo ? `, ${additionalInfo}` : '');
}
```

- **Input**:

    - `task`: A task object with properties like `content`, `important`, `urgent`, and `startAt`.

- **Purpose**:

    - Formats a pending task into a string with content, start date, and labels (if applicable).

- **Output**:

    - A string representing the formatted pending task.

### 5. Categorizing and Formatting Tasks

#### Completed Tasks

```javascript
const Completed = taskAll
  .filter(task => task.completedAt)
  .sort((a, b) => sortByTimestamp(a, b, 'completedAt'))
  .map(task => `Task: ${task.content}, Completed At: ${formatUnixTimestamp(task.completedAt)}`);
```

- **Input**:

    - `taskAll`: List of all tasks.

- **Purpose**:

    - Filters tasks that are completed, sorts them by completion date, and formats them into strings.

- **Output**:

    - An array of formatted strings for completed tasks.

#### Dismissed Tasks

```javascript
const Dismissed = taskAll
  .filter(task => task.dismissedAt)
  .sort((a, b) => sortByTimestamp(a, b, 'dismissedAt'))
  .map(task => `Task: ${task.content}, Dismissed At: ${formatUnixTimestamp(task.dismissedAt)}`);
```

- **Input**:

    - `taskAll`: List of all tasks.

- **Purpose**:

    - Filters tasks that are dismissed, sorts them by dismissal date, and formats them into strings.

- **Output**:

    - An array of formatted strings for dismissed tasks.

#### Pending Tasks

```javascript
const Pending = taskAll
  .filter(task => !task.completedAt && !task.dismissedAt)
  .sort((a, b) => sortByTimestamp(a, b, 'startAt'))
  .map(formatPendingTask);
```

- **Input**:

    - `taskAll`: List of all tasks.

- **Purpose**:

    - Filters tasks that are neither completed nor dismissed, sorts them by start date, and formats them.

- **Output**:

    - An array of formatted strings for pending tasks.

### 6. Task Progress Calculation

```javascript
const taskAllN = taskAll.length;
const taskPendingRatio = (taskPendingN / taskAllN);
const taskCompletedRatio = (1 - taskPendingRatio);
const taskCompletedPercent = Math.round(taskCompletedRatio * 100);
```

- **Input**:

    - `taskAllN`: Total number of tasks.

    - `taskPendingN`: Number of pending tasks.

- **Purpose**:

    - Calculates the progress of tasks as a percentage based on the ratio of completed to total tasks.

- **Output**:

    - `taskCompletedPercent`: Percentage of tasks completed.

### 7. Displaying Progress Bar

```javascript
let taskProgress;

const emojiSets = {
  default: ['⬛', '🟩'],
  // Other emoji sets...
};

const selectedSet = app.settings["Emoji"] || "default";
const emptySymbol = emojiSets[selectedSet][0];
const filledSymbol = emojiSets[selectedSet][1];

if (taskCompletedPercent < 10) {
  taskProgress = `[${emptySymbol.repeat(10)}] ${taskCompletedPercent}%`;
} else if (taskCompletedPercent < 20) {
  taskProgress = `[${filledSymbol}${emptySymbol.repeat(9)}] ${taskCompletedPercent}%`;
} // Additional conditions for other percentages...
```

- **Input**:

    - `taskCompletedPercent`: Percentage of tasks completed.

    - `app.settings\["Emoji"\]`: User-selected emoji set for the progress bar.

- **Purpose**:

    - Generates a progress bar string based on the completion percentage and selected emoji set.

- **Output**:

    - A string representing the progress bar, which includes the completion percentage and selected emojis.

### 8. Adding Categorized Task List to Output

```javascript
const allTaskCategorizedz = `
[Categorized Task: List View!][^CTL]
[^CTL]: []()${allTaskCategorized}
`;
```

- **Input**:

    - `allTaskCategorized`: A string containing categorized tasks.

- **Purpose**:

    - Prepares the categorized task list for insertion into the note.

- **Output**:

    - A formatted string that includes a placeholder for the categorized task list.

### 9. Replacing Note Content

```javascript
return app.replaceNoteContent({ uuid: app.context.noteUUID }, `${taskProgress}\n${allTaskCategorizedz}`, { section });
```

- **Input**:

    - `app.replaceNoteContent`: Method to update note content.

    - `taskProgress`: The progress bar string.

    - `allTaskCategorizedz`: The categorized task list string.

    - `section`: The section of the note to be updated.

- **Purpose**:

    - Replaces the content of the "Progress" section with the progress bar and categorized task list.

- **Output**:

    - Updates the note in the application with the new progress and task details.

## Summary

This script performs a series of steps to manage and update the "Progress" section of a note, including fetching tasks, categorizing them, calculating progress, and generating a visual representation of progress with a customizable emoji-based progress bar. It ensures that users are alerted if the required "Progress" section is missing and provides detailed information about the tasks and their statuses.