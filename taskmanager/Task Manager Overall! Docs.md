---
title: Task Manager Overall! Docs
uuid: bed28484-649c-11ef-ab69-22074e34eefe
version: 20
created: '2024-08-27T23:19:44+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

## Task Manager Overview

This script is designed to manage and display tasks from notes in AmpleNote. It filters notes based on a specified group, sorts them, and then processes each note to generate a progress report in markdown format. The final output is saved as a new note in AmpleNote, complete with a dynamic progress bar and task statistics.

---

### 1. Initializing the Sets

#### Code Section:

```javascript
// Initialize a Set to hold the final results to ensure unique entries.
let results = new Set();

// Initialize a Set to hold the names of notes that belong to a specific group.
let notesGroupNames = new Set();
let notesGroup = "taskLists";
```

#### Explanation:

- **`results`**: A `Set` object is created to store the final results. Using a `Set` ensures that each entry is unique, preventing duplicate entries in the final output.

- **`notesGroupNames`**: Another `Set` is initialized to store note information belonging to a specific group. This will help in organizing the notes by categories later in the process.

- **`notesGroup`**: A variable holding the name of the group, `"taskLists"`, is defined. This group name will be used to filter the notes.

### 2. Filtering Notes by Group

#### Code Section:

```javascript
// Filter notes based on the specified group.
let notesG = await app.filterNotes({ group: notesGroup });
```

#### Explanation:

- **`filterNotes({ group: notesGroup })`**: This function filters notes based on the specified group, `"taskLists"`. The result is stored in `notesG`, which will only include notes that belong to this group.

### 3. Sorting Notes

#### Code Section:

```javascript
// Sort the filtered notes alphabetically by name.
notesG.sort((a, b) => {
	const nameA = a.name || ""; 
	const nameB = b.name || "";
	return nameA.localeCompare(nameB);
});

// Sort the list of results based on the tag
notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
```

#### Explanation:

- **Sorting by Name**: The notes in `notesG` are first sorted alphabetically by their name. If a note has no name (`null` or `undefined`), an empty string is used as a fallback.

- **Sorting by Tags**: After sorting by name, the notes are further sorted by their tags. This double sorting ensures that the notes are organized in a meaningful way when presented in the final output.

### 4. Displaying the Progress Bar

#### Code Section:

```javascript
function getTaskProgressBar(taskCompletedPercent) {
	// Set of desired emoji sets
	const emojiSets = {
		...
	};

	// Select the desired emoji set
	const selectedSet = app.settings["Emoji"] || "default";
	const [emptySymbol, filledSymbol] = emojiSets[selectedSet];

	// Calculate the number of filled and empty symbols
	const filledCount = Math.floor(taskCompletedPercent / 10);
	const emptyCount = 10 - filledCount;

	// Construct the progress bar string
	let taskProgress = `[${filledSymbol.repeat(filledCount)}${emptySymbol.repeat(emptyCount)}] ${taskCompletedPercent}%`;

	// Add a special mark for 100% completion
	if (taskCompletedPercent === 100) {
		taskProgress += ` ‼`;
	}

	return taskProgress;
}
```

#### Explanation:

- **`getTaskProgressBar(taskCompletedPercent)`**: This function generates a visual progress bar based on the percentage of tasks completed.

    - **`emojiSets`**: A collection of different emoji sets is defined. Each set has a pair of symbols representing empty and filled states in the progress bar.

    - **`selectedSet`**: The emoji set used is based on the user's settings, defaulting to the "default" set if no specific set is selected.

    - **Progress Bar Construction**: The function calculates how many symbols should represent the completed and pending portions of the bar, creating a string that visually represents progress.

    - **Special Mark for 100%**: If all tasks are completed, a special symbol (`‼`) is added to highlight this achievement.

### 5. Processing Each Note

#### Code Section:

```javascript
for (const noteHandleG of notesG) {
	...
	notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | |`);
}
```

#### Explanation:

- **Loop Through Notes**: The code iterates over each note in the filtered and sorted list (`notesG`).

- **Task Retrieval**: For each note, all tasks are retrieved, including completed, dismissed, and pending ones.

- **Task Filtering**: Tasks are categorized into three groups: Completed, Dismissed, and Pending.

- **Task Progress Calculation**: The percentage of completed tasks is calculated, which is used to generate the progress bar.

- **Note Information**: The note's tags, name, progress bar, and task statistics are added to `notesGroupNames`. Each note's information is formatted as a markdown table row, which will be part of the final output.

### 6. Preparing the Final Output

#### Code Section:

```javascript
results = Array.from(notesGroupNames);
const readmeNotes = `
### Readme!
- Above are list of Notes with respective Details...
`;
let resultText = "| Tags 🏷️ | Note Name 📝 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|\n" + results.join("\n");
resultText += `\n\n${readmeNotes}`;
```

#### Explanation:

- **Converting the Set to an Array**: The `notesGroupNames` Set is converted to an array and stored in `results`.

- **Readme Notes**: A Readme section is added to provide additional instructions and tips for using the generated report.

- **Markdown Table Construction**: The final output (`resultText`) is created as a markdown table, which includes headers, note information, and the Readme section.

### 7. Creating a New Note

#### Code Section:

```javascript
const now = new Date();
const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
const filename = `Task_Manager_${YYMMDD}_${HHMMSS}`;
let noteUUIDNew = await app.createNote(`${filename}`, ["-task-manager"]);
await app.insertContent({ uuid: noteUUIDNew }, resultText);
await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
```

#### Explanation:

- **Timestamped Filename**: A filename is generated based on the current date and time, ensuring that each report is unique.

- **Creating the Note**: A new note is created in AmpleNote with the generated filename and tagged with `"-task-manager"`.

- **Inserting Content**: The markdown table (`resultText`) is inserted into the newly created note.

- **Navigating to the Note**: Finally, the script navigates to the new note's URL, allowing the user to view the report immediately.

---

### Final Output Reflection

When the script is executed, a new note will be created in AmpleNote containing a markdown table. This table will list all the notes in the `"taskLists"` group, sorted by their tags and names. Each note entry will include a progress bar (with dynamic emojis), task statistics, and links to the individual notes. A Readme section at the end of the note provides additional instructions for managing tasks.

\

This documentation can be used as a reference for understanding each part of the code and how it contributes to the final report generated by the script.