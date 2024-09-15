---
title: 'Task Manager Pro: Overall Eisenhower Matrix!'
uuid: bd5244fa-72c0-11ef-870a-eeba9115991d
version: 12
created: '2024-09-14T23:12:40+05:30'
tags:
  - '-2-literature'
  - '-t/amplenote/mine'
  - '-9-permanent'
---

### Detailed Code Documentation: Eisenhower Matrix Task Manager Function

#### Overview

This asynchronous JavaScript function, `E.M.!`, generates a task report using the Eisenhower Matrix framework. It processes tasks from selected notes, classifying them based on their importance and urgency, and then generates a markdown note that categorizes tasks accordingly. The resulting note helps users visualize and organize tasks using the four Eisenhower quadrants.

---

### Inputs and Their Purpose

1. **app**:

    - **Type**: Object

    - **Purpose**: The app's API object, allowing access to notes, tasks, and various app-related actions.

    - **Usage**: Used to filter notes, retrieve tasks, and create a new note to display the Eisenhower Matrix report.

1. **noteUUID**:

    - **Type**: String

    - **Purpose**: The unique identifier of the current note. It is provided but not actively used in this function, though it could be included for note-specific operations if necessary.

---

### Key Steps and Operations

#### 1. **Initialize Sets for Data Storage**

- **`results`**: A Set used to store the final, unique results that will be displayed in the markdown report.

- **`notesGroupNames`**: Another Set to store note-specific details (like tags and task categories).

#### 2. **Filtering and Sorting Notes**

- **Filtering Notes**: The function retrieves all notes using `app.filterNotes()` without applying any specific group filter.

- **Sorting Notes Alphabetically**: The retrieved notes are sorted alphabetically by their name, using an empty string as a fallback in case a note's name is undefined or null.

- **Sorting Notes by Tags**: After sorting by name, the notes are further sorted based on their tags, combining and comparing them as comma-separated strings.


  ```javascript
  notesG.sort((a, b) => {
      const nameA = a.name || ""; 
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
  });
  
  notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
  ```

#### 3. **Processing Each Note**

- For each note, the function retrieves all pending tasks (tasks that are not completed or dismissed) using `app.getNoteTasks()`.

- It calculates the **total score** of all tasks within the note by summing the task scores.

- **Classifying Tasks**: The tasks are classified into one of the four Eisenhower Matrix quadrants based on their `important` and `urgent` flags:

    1. **Quadrant 1 (Important and Urgent)**: Tasks to "Do First".

    1. **Quadrant 2 (Important but Not Urgent)**: Tasks to "Schedule It".

    1. **Quadrant 3 (Not Important but Urgent)**: Tasks to "Delegate".

    1. **Quadrant 4 (Not Important and Not Urgent)**: Tasks to "Eliminate".


      ```javascript
      for (const task of taskAll) {
          if (task.important && task.urgent) {
              importantAndUrgent.push(task);
          } else if (task.important && !task.urgent) {
              importantNotUrgent.push(task);
          } else if (!task.important && task.urgent) {
              notImportantButUrgent.push(task);
          } else if (!task.important && !task.urgent) {
              notImportantNotUrgent.push(task);
          }
      }
      ```

- For each note that contains tasks falling into any of the four quadrants, an entry is added to `notesGroupNames`, summarizing the note's tags, name, Eisenhower Matrix counts, and total score.


  ```javascript
  notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${(importantAndUrgent.length === 0 ? ' - ' : importantAndUrgent.length)} | ${(importantNotUrgent.length === 0 ? ' - ' : importantNotUrgent.length)} | ${(notImportantButUrgent.length === 0 ? ' - ' : notImportantButUrgent.length)} | ${(notImportantNotUrgent.length === 0 ? ' - ' : notImportantNotUrgent.length)} | ${totalScore} | |`);
  ```

#### 4. **Preparing the Final Output**

- The results from `notesGroupNames` are collected and formatted into a markdown table. The table summarizes the tags, note links, task counts for each Eisenhower quadrant, and the total task score for each note.

- The function includes `readmeNotes`, which explains the purpose of the table and provides a reference for interpreting the Eisenhower Matrix.


  ```javascript
  resultText = `${readmeNotes}\n`;
  resultText += "| Tags 🏷️ | Note Link 🔗 | 🔥 | ⚡ | ⚾ | 🗑️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|\n";
  resultText += results.join("\n") + "\n";
  ```

- The columns in the table represent:

    - **Tags**: Associated tags with the note.

    - **Note Link**: A clickable link to open the note.

    - **🔥 (Important and Urgent)**: Number of tasks classified as important and urgent.

    - **⚡ (Important but Not Urgent)**: Number of tasks classified as important but not urgent.

    - **⚾ (Not Important but Urgent)**: Number of tasks classified as not important but urgent.

    - **🗑️ (Not Important and Not Urgent)**: Number of tasks classified as not important and not urgent.

    - **🔢 (Total Task Score)**: The total task score for that note.

    - **✒️**: Space for user comments.

#### 5. **Creating a New Note**

- The function generates a unique filename using the current date and time to name the note.

- A new note is created with the specified filename and tags, and the formatted markdown content is inserted into the note.

- Finally, the app navigates to the newly created note.


  ```javascript
  const filename = `TM_Overall_E_M_${YYMMDD}_${HHMMSS}`;
  let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
  await app.insertContent({ uuid: noteUUIDNew }, resultText);
  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
  ```

---

### Output Explanation

The output is a markdown table showing Eisenhower Matrix task distribution across notes:

| | | | | | | | |
|-|-|-|-|-|-|-|-|
|**Tags**|**Note Link**|**🔥**|**⚡**|**⚾**|**🗑️**|**🔢**|**✒️**|
|Tags associated with the note|Link to the note|Important and urgent task count|Important but not urgent task count|Not important but urgent task count|Not important and not urgent task count|Total task score|User comments|
This report helps users visualize their tasks using the Eisenhower Matrix methodology and prioritize accordingly.

---

### Additional Notes

- **Task Categorization**: Tasks are classified into the Eisenhower Matrix based on their `important` and `urgent` flags.

- **Report Frequency**: Users can generate this report weekly or monthly to better organize and prioritize their tasks using the matrix approach.

- **Customization**: The report can be extended to include more detail or focus on specific groups by modifying the filter conditions or task flags.