---
title: 'Task Manager Pro: Overall Trend!'
uuid: bab0b638-733c-11ef-bce1-eeba9115991d
version: 7
created: '2024-09-15T14:00:14+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
  - '-2-literature'
---

### Detailed Code Documentation: Task Trend Function

#### Overview

This code is a JavaScript-based asynchronous function `Trend!` designed to generate a task trend report in the form of a markdown note. It collects and processes tasks from a set of notes within the app, organizes them based on task completion or dismissal, and provides a report grouped by date, task count, and total score.

The result is a summarized, visualized trend of completed and dismissed tasks over time.

---

### Inputs and Their Purpose

1. **app**:

    - **Type**: Object

    - **Purpose**: This represents the app's API, allowing the function to interact with various features like filtering notes, retrieving tasks, and creating new notes.

    - **Usage**: Used to filter notes, retrieve task details, and manage note creation.

1. **noteUUID**:

    - **Type**: String

    - **Purpose**: The unique identifier for a specific note, used to interact with that note if needed.

    - **Usage**: While not directly used in this function, it can be incorporated if needed for note-specific operations.

---

### Key Steps and Operations

#### 1. **Initialize Sets for Data Storage**

- `results`: A Set used to store the final report results. The use of a Set ensures unique entries.

- `notesGroupNamesA`: An array used to temporarily store task information (date, score, and status).

- `notesGroupNames`: A Set used to store grouped task details by date and status.

#### 2. **Filtering Notes by Group**

- The function calls `app.filterNotes()` to retrieve a filtered list of notes based on a group, though in this case, no specific group is provided (the group filter is commented out).

- This operation returns all notes.


  ```javascript
  let notesG = await app.filterNotes({ });
  ```

#### 3. **Processing Each Note**

- The function iterates over each note in `notesG`, retrieving the tasks within the note using `app.getNoteTasks()`.

- Tasks are categorized into:

    - **Completed**: Tasks that have been marked as done.

    - **Dismissed**: Tasks that were ignored or closed without completion.

    - **Pending**: Tasks that are neither completed nor dismissed.

- The function skips notes with no completed or dismissed tasks.


  ```javascript
  const Completed = taskAll.filter(task => task.completedAt);
  const Dismissed = taskAll.filter(task => task.dismissedAt);
  const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
  ```

#### 4. **Classifying Tasks by Date and Status**

- Each task is classified based on whether it's completed or dismissed. The classification is done by:

    - Converting the task's completion or dismissal timestamp into a human-readable date format.

    - Storing the task’s date, score, and status (Completed or Dismissed) in `notesGroupNamesA`.


      ```javascript
      const formattedDate = new Date(task.completedAt * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      notesGroupNamesA.push(`${formattedDate},${task.score},Completed`);
      ```

#### 5. **Sorting and Grouping by Date and Status**

- The tasks stored in `notesGroupNamesA` are sorted by date to organize the trend by chronological order.

- Then, they are grouped by a combination of date and status in `notesGroupMap`, which stores:

    - The count of tasks for each group.

    - The total score for tasks in each group.


      ```javascript
      const sortedEntries = [...notesGroupNamesA].sort((entryA, entryB) => new Date(entryA.split(',')[0]) - new Date(entryB.split(',')[0]));
      ```

#### 6. **Preparing the Final Output**

- The sorted and grouped task information is formatted into a markdown table with columns:

    - Date

    - Task Count

    - Total Score

    - Status (Completed/Dismissed)

- The result is stored in `results` and later used to create the final markdown output.

- The `readmeNotes` section provides an explanation of how to interpret the report.


  ```javascript
  resultText = `${readmeNotes}\n`;
  resultText += "| Date 📅 | Task Count 🔢 | Total Score 🔢 | Status ✔️✖️ | ✒️ |\n|---|---|---|---|---|\n";
  resultText += results.join("\n") + "\n";
  ```

#### 7. **Creating a New Note**

- A new note is created with the generated trend report. The filename is based on the current timestamp to ensure uniqueness.

- The final markdown text (`resultText`) is inserted into the newly created note, and the app navigates to the note once it's generated.


  ```javascript
  const filename = `TM_Overall_Trend_${YYMMDD}_${HHMMSS}`;
  let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
  await app.insertContent({ uuid: noteUUIDNew }, resultText);
  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
  ```

---

### Output Explanation

The output is a markdown table with the following fields:

| | | | | |
|-|-|-|-|-|
|**Date**|**Task Count**|**Total Score**|**Status**|**Comments**|
|**Date of Task Completion/Dismissal**|**Number of Tasks Completed/Dismissed**|**Sum of Task Scores**|**Completed or Dismissed**|User comments if any|
This allows users to visually track the trend of tasks completed or dismissed over time, with the added functionality of task scoring.

---

### Additional Tips

- The function includes commented-out sections for group-specific filtering, which can be re-enabled to generate trends for specific note groups.

- The generated markdown note is designed to be easily viewed and organized in the app, and users can add comments or visualize trends using external plugins.