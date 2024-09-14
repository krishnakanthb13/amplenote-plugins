---
title: 'Task Manager Pro: Overall Active!'
uuid: 8e0f7a0a-72c0-11ef-870a-eeba9115991d
version: 6
created: '2024-09-14T23:11:20+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
  - '-2-literature'
---

## Detailed Code Documentation: Task Manager - Active Tasks

This code snippet is designed to filter, process, and generate a report for notes in a task management system (Amplenote), focusing on tasks within notes that are pending or incomplete. The output is a dynamic progress report in markdown format, including task completion percentages, progress bars, and detailed statistics.

### How the Code Works

---

### 1. **Overall Purpose**

The goal of this function is to create a report of notes with active tasks, sorted and filtered by specific criteria, and then generate a markdown table summarizing the task status for each note. The table includes information like pending, completed, and dismissed tasks, with a progress bar indicating the overall completion rate for each note.

---

### 2. **Main Function: `Overall Active!`**

This is the core function that drives the task-report generation process.

```javascript
"Overall Active!": async function(app, noteUUID) { ... }
```

#### **Inputs**

- `app`: The main application object to interact with the note system.

- `noteUUID`: The unique identifier (UUID) of the note.

#### **Purpose**

The function retrieves all the notes from the system, filters them, sorts them, calculates the status of tasks (pending, completed, dismissed), and finally generates a new note containing a report in markdown format.

---

### 3. **Set Initialization**

At the start, the code initializes two sets to store data:

```javascript
let results = new Set();
let notesGroupNames = new Set();
```

- **`results`**: Holds the final results that will be displayed.

- **`notesGroupNames`**: Tracks the names of notes that are part of a particular group, to avoid duplicates.

---

### 4. **Filtering Notes by Group**

```javascript
let notesG = await app.filterNotes({ });
```

- **Purpose**: Retrieves all notes in the system. You could specify a group to filter notes by a specific category (e.g., task lists), but the current code retrieves all notes.

---

### 5. **Sorting Notes**

The code performs two sorting operations on the filtered notes:

```javascript
notesG.sort((a, b) => {
  const nameA = a.name || "";
  const nameB = b.name || "";
  return nameA.localeCompare(nameB);
});

notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
```

- **Sort by Name**: Sorts the notes alphabetically by their name. If a note has no name, it defaults to an empty string.

- **Sort by Tags**: Sorts the notes based on the tags attached to them, ensuring that notes with similar tags appear together.

---

### 6. **Task Progress Bar Generator**

```javascript
function getTaskProgressBar(taskCompletedPercent) { ... }
```

This helper function generates a progress bar using a dynamic set of emoji symbols.

#### **Input**

- `taskCompletedPercent`: The percentage of completed tasks in a note.

#### **Emoji Sets**

There are multiple predefined emoji sets, such as stars, circles, hearts, etc., which can be selected dynamically using the `app.settings\["Emoji"\]` property.

- The progress bar represents task completion in blocks, where each block corresponds to 10% progress.

#### **Output**

- The function returns a string representing the progress bar using the selected emoji set. If the completion rate is 100%, it adds a special marker (`‼`).

---

### 7. **Processing Each Note**

```javascript
for (const noteHandleG of notesG) { ... }
```

- This loop processes each note retrieved from the filter, calculating the task status (pending, completed, and dismissed) for each note.

#### **Retrieving Tasks**

```javascript
const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
```

- **Input**: The note's UUID.

- **Output**: A list of all tasks within the note, including completed and dismissed tasks.

#### **Task Filtering**

```javascript
const Completed = taskAll.filter(task => task.completedAt);
const Dismissed = taskAll.filter(task => task.dismissedAt);
const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
```

- **Completed**: Tasks that have been marked as done.

- **Dismissed**: Tasks that have been dismissed.

- **Pending**: Tasks that are still active and incomplete.

#### **Calculating Task Progress**

```javascript
const totalTasks = Pending.length + Completed.length + Dismissed.length;
const taskCompletedPercent = totalTasks > 0 ? Math.round((1 - (Pending.length / totalTasks)) * 100) : 0;
```

- **Total Tasks**: Sum of all task types (pending, completed, and dismissed).

- **Task Completion Percent**: Calculated as the ratio of completed/dismissed tasks to total tasks, expressed as a percentage.

#### **Generating Note Entry**

The information for each note is added to the `notesGroupNames` set as follows:

```javascript
notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | ${totalScore} | |`);
```

- **Note Link**: A link to the note is generated.

- **Task Progress**: Displays the completion rate as a progress bar.

- **Task Stats**: Lists the number of pending, completed, and dismissed tasks for each note.

- **Total Score**: Sum of the task scores for the note (if available).

---

### 8. **Creating the Final Output**

After processing all notes, the results are formatted into a markdown table.

```javascript
resultText += "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|---|\n" + results.join("\n");
```

- **Table Columns**: Tags, Note Link, Progress Bar, Pending (❗), Completed (✔️), Dismissed (✖️), Total Score (🔢), Comments (✒️).

- **Markdown Syntax**: The markdown table format is used to organize the results.

---

### 9. **Generating the Report Note**

A new note is created with the current timestamp as the filename:

```javascript
const filename = `TM_Overall_Act_${YYMMDD}_${HHMMSS}`;
```

The results are then inserted into this new note, which is created under the `-reports/-task-manager` tag:

```javascript
let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
await app.insertContent({ uuid: noteUUIDNew }, resultText);
await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
```

---

### **Summary of Outputs**

- **Result**: A new note is generated, containing a report in markdown format that lists the status of all notes with pending tasks.

- **Key Information**: For each note, the report displays the note name, task progress, and a breakdown of task statuses.

This is a comprehensive task management report designed to give a snapshot of current progress in a project or system using markdown tables.