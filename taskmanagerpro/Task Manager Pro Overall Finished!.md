---
title: 'Task Manager Pro: Overall Finished!'
uuid: a58a7c70-72c0-11ef-870a-eeba9115991d
version: 4
created: '2024-09-14T23:12:00+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# **Code Documentation for "Overall Finished!"**

This JavaScript code is designed for integration with a note-taking or task management app (AmpleNote), aimed at filtering, sorting, and presenting tasks from different notes. The code creates a new report listing completed or dismissed tasks, calculating progress and summarizing task statistics. Below is a detailed explanation of each part of the code.

## **Function Overview**

### `Overall Finished!`:

This asynchronous function processes a collection of notes to filter and display notes that have no pending tasks but contain at least one completed or dismissed task. It outputs a report of these notes, including statistics and a dynamic progress bar represented by emojis.

## **Detailed Breakdown of Each Section**

### **1. Set Initialization**

```javascript
let results = new Set();
let notesGroupNames = new Set();
```

- `results`: Holds the final processed note data. Using a `Set` ensures there are no duplicate entries.

- `notesGroupNames`: Tracks the names of notes that belong to a specific group (can be adjusted to target certain notes).

### **2. Filtering Notes by Group**

```javascript
let notesG = await app.filterNotes({ });
```

- **Purpose**: This line filters notes using the `filterNotes` function. The parameter can be adjusted to filter by specific tags or groups (e.g., `notesGroup`).

- **Effect**: Retrieves all available notes if no filter is applied.

### **3. Sorting Notes**

```javascript
notesG.sort((a, b) => { /*...*/ });
```

- **Sorting by Name**: The first sorting logic sorts notes alphabetically by their name, using empty strings as a fallback if a note lacks a name.


  ```javascript
  notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
  ```

- **Sorting by Tags**: The second sorting logic sorts the notes based on their associated tags.

### **4. Displaying Progress Bar**

The progress bar is generated based on the percentage of tasks completed, with different emoji sets to visually represent the progress.

```javascript
function getTaskProgressBar(taskCompletedPercent) { /*...*/ }
```

- **Purpose**: Dynamically generate a visual progress bar.

- **Input**: `taskCompletedPercent`—The percentage of tasks completed, used to determine the number of "filled" versus "empty" symbols.

- **Emoji Sets**: A variety of emoji sets are predefined to provide flexibility for displaying progress visually. The selected emoji set can be customized through app settings.

- **Output**: A string representing the progress bar with filled and empty symbols. A special mark (`‼`) is added when the progress is 100%.

### **5. Processing Each Note**

```javascript
for (const noteHandleG of notesG) { /*...*/ }
```

- **Purpose**: Loop through each filtered and sorted note (`notesG`) to check tasks and generate stats. The progress and statistics are only included if a note has no pending tasks but has at least one completed or dismissed task.

**Tasks Categorization**:

- **Completed**: Tasks that have been completed.

- **Dismissed**: Tasks that were dismissed.

- **Pending**: Tasks that are still active (not completed or dismissed).

**Score Calculation**:

```javascript
const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score || 0), 0).toFixed(2));
```

- **Purpose**: Calculate the total score for the tasks in a note.

**Adding Note Information**:

```javascript
notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | ${totalScore} | |`);
```

- **Purpose**: Format and store note data including tags, note name, progress, task counts, and total score.

### **6. Preparing the Final Output**

```javascript
results = Array.from(notesGroupNames);
```

- **Purpose**: Convert the `Set` into an array for easy handling of results.

**README Section**:

```javascript
const readmeNotes = `/*...*/`;
```

- **Purpose**: A predefined README string explaining the contents and instructions for the report.

**Result Construction**:

```javascript
let resultText;
resultText = `${readmeNotes}\n`;
resultText += "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|---|\n" + results.join("\n");
```

- **Purpose**: The final output is generated as a markdown table, including column headers such as tags, note link, progress bar, task counts, total score, and comments.

### **7. Creating a New Note**

```javascript
const filename = `TM_Overall_Fin_${YYMMDD}_${HHMMSS}`;
let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
await app.insertContent({ uuid: noteUUIDNew }, resultText);
await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
```

- **Purpose**: Create a new note in the app with the formatted report.

- **Filename**: The filename is dynamically generated based on the current date and time.

- **Navigation**: After creating the note, the app navigates to the new note URL.

## **Customization Options**

1. **Emoji Sets**: You can change the emoji set used for the progress bar through app settings. Available options include stars, circles, hearts, books, etc.

1. **Task Filters**: Modify the `app.filterNotes()` function to target specific groups of notes by providing filters (e.g., tags).

1. **Progress Calculation**: The formula for task completion percentage and how the progress bar is built can be adjusted.

1. **Output Format**: The output is in markdown format, with options to change headers, table structure, and what information is displayed (e.g., task stats, scores).

## **Conclusion**

The `Overall Finished!` function offers a highly customizable and visually appealing way to generate task reports from notes, focusing on notes with completed or dismissed tasks. It generates a detailed table with task stats and dynamically created progress bars using various emoji sets, culminating in a new note for review or further actions.