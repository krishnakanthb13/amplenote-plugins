---
title: Task Manager
uuid: 6c5991b0-6457-11ef-b225-22074e34eefe
version: 309
created: '2024-08-27T15:03:32+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

Welcome to the Task Progress Manager Plugin, a powerful tool designed to enhance your productivity and keep your projects organized.

\

This plugin seamlessly integrates with your notes, providing you with an intuitive way to track and manage your tasks. Whether you're managing a single project or multiple tasks across different notes, this plugin helps you stay on top of your progress with clear visual indicators and detailed task categorization.

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/6c5991b0-6457-11ef-b225-22074e34eefe/42d002aa-5bc8-41bb-a506-f366a831f6cf.gif)   ![](https://images.amplenote.com/6c5991b0-6457-11ef-b225-22074e34eefe/ccd1aba5-207e-40e9-b179-a1628ec8dcd1.gif)  ![](https://images.amplenote.com/6c5991b0-6457-11ef-b225-22074e34eefe/874c561f-1384-48fc-8283-4cb4b40d1965.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### Getting Started

### <mark style="color:#BBA215;">**`Task Manager: Note!`**<!-- {"cycleColor":"25"} --></mark>

1. **Install the Plugin**: Add the `Task Manager!` Plugin to your Amplenote application.

1. <mark style="color:#BBA215;">**`Configure Your Preferences`**`:`<!-- {"cycleColor":"25"} --></mark>` `Select your desired emoji set and configure any additional settings through the plugin's options menu. `(By using the below list or the list in the Code Base!)`

1. **Prepare your Note:** Add a Header called Progress (Can be H1 / H2 / H3), and just below that add a horizontal separator by using "---" (three Hyphens).

1. **Run the Plugin**: Execute the plugin to analyze your note's tasks, calculate progress, and update the "Progress" section with the latest information.

1. **Review Your Progress**: Check the updated "Progress" section to view your task progress and categorized task list. Monitor your achievements and stay motivated with clear visual feedback.

### <mark style="color:#BBA215;">**`Task Manager: Overall!`**<!-- {"cycleColor":"25"} --></mark>

- **Access the Summary Note:** After running the script, a new note titled `Task_Manager_YYMMDD_HHMMSS` (with the current date and time) will be created.

    - This note will contain a table summarizing your notes related to Tasks.

    - Each note in the summary has a clickable link to the original note, so you can quickly navigate to it.

- **Understanding the Table:**

    - **Tags:** The tags associated with the note.

    - **Note Name:** The title of the note with a hyperlink to the note itself.

    - **Progress Bar:** A visual representation of task completion.

    - **❗ (Pending):** Number of pending tasks.

    - **✔️ (Completed):** Number of completed tasks.

    - **✖️ (Dismissed):** Number of dismissed tasks.

    - **✒️ (Comments):** Space for you to add your comments.

### Key Features

- **Dynamic Task Tracking**: Automatically fetch and categorize tasks into `pending, completed, and dismissed sections` and sorts based on the dates in the respective fields. Stay updated on what needs your attention and what has been accomplished.

    - **Categorized Task List**: Get a comprehensive overview of all tasks within your note, categorized and formatted for easy review. This includes:

        - `Pending Tasks WITH Their Start Dates, Completed Tasks WITH Their Completion Dates, AND Dismissed Tasks WITH Their Dismissal Dates.`

- **Progress Visualization**: Enjoy a visual representation of your task progress with customizable progress bars. Choose from a variety of emoji sets to reflect your progress in a way that suits your style.

    - **Configurable Emojis**: Personalize your progress bar with different emoji sets, from stars and hearts to books and moons. Tailor the appearance of your progress bar to match your preferences.

        - `By editing the code, you can add your own Emoji collections as per your taste and personality.`

### Example Outputs

- **Moons:** `\[🌕🌑🌑🌑🌑🌑🌑🌑🌑🌑\] 10%`

- **Books:** `\[📚📖📖📖📖📖📖📖📖📖\] 90%`

- **Faces:** `\[😁😐😐😐😐😐😐😐😐😐\] 10%`

- **Trees:** `\[🌳🌳🌳🌱🌱🌱🌱🌱🌱🌱\] 30%`

- **Fruits:** `\[🍎🍏🍏🍏🍏🍏🍏🍏🍏🍏\] 10%`

- **Paws:** `\[🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾🐾\] 100%`

- **Fish:** `\[🐠🐟🐟🐟🐟🐟🐟🐟🐟🐟\] 10%`

- **Sports:** `\[🏆⚽⚽⚽⚽⚽⚽⚽⚽⚽\] 10%`

- **Flowers:** `\[🌹🌸🌸🌸🌸🌸🌸🌸🌸🌸\] 10%`

- **Diamonds:** `\[🔷💎💎💎💎💎💎💎💎💎\] 10%`

- **Planes:** `\[🛬🛫🛫🛫🛫🛫🛫🛫🛫🛫\] 10%`

- **Clouds:** `\[⛅🌥️🌥️🌥️🌥️🌥️🌥️🌥️🌥️🌥️\] 10%`

- **Arrows:** `\[⬅️➡️➡️➡️➡️➡️➡️➡️➡️➡️\] 10%`

- **Clocks:** `\[⏰🕰️🕰️🕰️🕰️🕰️🕰️🕰️🕰️🕰️\] 10%`

- **Notes:** `\[🎶🎵🎵🎵🎵🎵🎵🎵🎵🎵\] 10%`

- **Pencils:** `\[🖊️✏️✏️✏️✏️✏️✏️✏️✏️✏️\] 10%`

### Flexibility

These emoji sets give users a wide variety of creative options to visualize their task progress in a way that resonates with their preferences or the context of their project. All they need to do is change the `Plugin Setting: Emoji` variable to any of these predefined emoji sets.

## Support and Feedback

We are committed to providing a seamless experience with the Task Progress Manager Plugin. If you encounter any issues or have suggestions for improvement, please reach out in the comment section of the Plugin Installation Page. Your feedback is invaluable in helping us enhance the plugin and better meet your needs.

\

Thank you for choosing the Task Progress Manager Plugin. We hope it brings clarity and efficiency to your task management and helps you achieve your goals with ease!

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name|Task Manager|
|icon|waterfall_chart|
|description|Have a Clear Idea of `ALL `your Tasks Progress in Amplenote.<br />Inspired from: [Progress Bar (Plugin)](https://public.amplenote.com/hJyajoiWxUJUVCxQQcgjk2i3) |
|instructions|[Task Manager Note! Docs](https://www.amplenote.com/notes/c5843cea-6457-11ef-b225-22074e34eefe) <br />[Task Manager Overall! Docs](https://www.amplenote.com/notes/bed28484-649c-11ef-ab69-22074e34eefe) |
|setting|Emoji|
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
  noteOption: {
// ************************************************************** //
	"Note!": async function(app, noteUUID) {

    // ----------- Section: Getting the 'Progress' Section -----------
    const sections = await app.getNoteSections({ uuid: app.context.noteUUID });
    
    // Locate the 'Progress' section within the note
    const section = sections.find((section) => section.heading?.text === "Progress");

    // If the 'Progress' section does not exist, alert the user to create one
    if (section === undefined) {
      app.alert(`Please create a 'Progress' section.
      """"""
      ### Progress
      ---
      """"""
      - Separate it with a triple line break '---'
      (Or else anything under the heading will be erased!)`);
      return;  // Exit the function if the section does not exist
    }

    // ----------- Section: Processing the Tasks -----------
    // Retrieve only pending tasks (tasks that are not completed or dismissed)
    const taskPending = await app.getNoteTasks({ uuid: noteUUID });
    // console.log("taskPending:", taskPending);

    // Count the number of pending tasks
    const taskPendingN = taskPending.length;
    // console.log(`taskPendingN: ${taskPendingN}`);

    // Retrieve all tasks, including completed and dismissed ones
    const taskAll = await app.getNoteTasks({ uuid: noteUUID }, { includeDone: true });
    // console.log("taskAll:", taskAll);

    // ----------- Section: Helper Functions -----------
    // Convert a UNIX timestamp to a human-readable date format: 'YYYY-MM-DD HH:MM:SS'
    function formatUnixTimestamp(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    // Sort two tasks by a given timestamp key (e.g., completedAt, dismissedAt, startAt)
    function sortByTimestamp(a, b, key) {
      return (a[key] || 0) - (b[key] || 0);
    }

    // Format a pending task, including 'Important' and 'Urgent' labels only if true
    function formatPendingTask(task) {
      const importantText = task.important ? `Important` : '';  // Include 'Important' if true
      const urgentText = task.urgent ? `Urgent` : '';  // Include 'Urgent' if true
	  const startAtText = task.startAt ? formatUnixTimestamp(task.startAt) : `Not Asigned`;
      const additionalInfo = [startAtText, importantText, urgentText].filter(Boolean).join(', ');  // Combine labels
      return `Task: ${task.content}, Start At: ` + (additionalInfo ? `${additionalInfo}` : '');
    }

    // ----------- Section: Categorizing and Formatting Tasks -----------
    // Filter and sort tasks that are completed, then format them
    const Completed = taskAll
      .filter(task => task.completedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'completedAt'))
      .map(task => `Task: ${task.content}, Completed At: ${formatUnixTimestamp(task.completedAt)}`);

    // Filter and sort tasks that are dismissed, then format them
    const Dismissed = taskAll
      .filter(task => task.dismissedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'dismissedAt'))
      .map(task => `Task: ${task.content}, Dismissed At: ${formatUnixTimestamp(task.dismissedAt)}`);

    // Filter and sort tasks that are pending (neither completed nor dismissed), then format them
    const Pending = taskAll
      .filter(task => !task.completedAt && !task.dismissedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'startAt'))
      .map(formatPendingTask);
	  
	// Display them! Handling Empty
	const CompletedTasksDisplay = Completed.length > 0 ? Completed.join('\n') : 'No tasks have been completed yet.';
	const DismissedTasksDisplay = Dismissed.length > 0 ? Dismissed.join('\n') : 'No tasks have been dismissed yet.';
	const PendingTasksDisplay = Pending.length > 0 ? Pending.join('\n') : 'No tasks is pending.';

    // Combine all categorized tasks into a single string output
    const allTaskCategorized = `<mark>Task Summary:</mark>\n*<mark>Pending Tasks: #${Pending.length}</mark>*\n${PendingTasksDisplay}\n*<mark>Completed Tasks: #${Completed.length}</mark>*\n${CompletedTasksDisplay}\n*<mark>Dismissed Tasks: #${Dismissed.length}</mark>*\n${DismissedTasksDisplay}`.trim();

    // console.log("allTaskCategorized:", allTaskCategorized);

    // ----------- Section: Task Progress Calculation -----------
    // Count the total number of tasks
    const taskAllN = taskAll.length;
    // console.log(`Note has ${taskPendingN} tasks pending and ${taskAllN} in total`);

    // Calculate the ratio of pending tasks to all tasks
    const taskPendingRatio = (taskPendingN / taskAllN);
    // console.log(`taskPendingRatio is ${taskPendingRatio}`);

    // Calculate the completion ratio as the inverse of the pending ratio
    const taskCompletedRatio = (1 - taskPendingRatio);
    // console.log(`taskCompletedRatio: ${taskCompletedRatio}`);

    // Convert the completed ratio to a percentage for progress tracking
    const taskCompletedPercent = Math.round(taskCompletedRatio * 100);
    // console.log(`Tasks are ${taskCompletedPercent}% complete.`);

    // ----------- Section: Displaying Progress Bar -----------
    // Initialize a variable to hold the progress bar string
    let taskProgress;

	// Set of desired emoji set
	const emojiSets = {
		default: ['⬛', '🟩'], // Default: Empty and Filled squares
		stars: ['☆', '★'], // Stars: Empty and Filled stars
		circles: ['⚪', '🔵'], // Circles: Empty and Filled circles
		hearts: ['🖤', '❤️'], // Hearts: Empty and Filled hearts
		fire: ['🔥', '💥'], // Fire: Fire and Explosion
		custom: ['🍫', '🍬'], // Custom: Chocolate and Candy

		// New Sets
		moons: ['🌑', '🌕'], // Moons: New moon and Full moon
		books: ['📖', '📚'], // Books: Open book and Stack of books
		faces: ['😐', '😁'], // Faces: Neutral face and Grinning face
		trees: ['🌱', '🌳'], // Trees: Seedling and Mature tree
		fruits: ['🍏', '🍎'], // Fruits: Green apple and Red apple
		paws: ['🐾', '🐾🐾'], // Paws: Single paw and Double paw prints
		fish: ['🐟', '🐠'], // Fish: Blue fish and Tropical fish
		sports: ['⚽', '🏆'], // Sports: Soccer ball and Trophy
		flowers: ['🌸', '🌹'], // Flowers: Cherry blossom and Rose
		diamonds: ['💎', '🔷'], // Diamonds: Gem and Blue diamond
		planes: ['🛫', '🛬'], // Planes: Take-off and Landing
		clouds: ['🌥️', '⛅'], // Clouds: Cloudy and Partly sunny
		arrows: ['➡️', '⬅️'], // Arrows: Right arrow and Left arrow
		clocks: ['🕰️', '⏰'], // Clocks: Old clock and Alarm clock
		notes: ['🎵', '🎶'], // Notes: Single music note and Multiple notes
		pencils: ['✏️', '🖊️'], // Pencils: Pencil and Pen
	};

	// Set this to the desired emoji set
	const selectedSet = app.settings["Emoji"] || "default";
    // console.log("selectedSet:", selectedSet);
	
	// Separate Empty and Filled Symbols
	const emptySymbol = emojiSets[selectedSet][0];
	const filledSymbol = emojiSets[selectedSet][1];
    // console.log("filledSymbol, emptySymbol:", filledSymbol, emptySymbol);

    // Depending on the completion percentage, display a corresponding progress bar
    if (taskCompletedPercent < 10) {
      taskProgress = `[${emptySymbol.repeat(10)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 10 && taskCompletedPercent < 20) {
      taskProgress = `[${filledSymbol}${emptySymbol.repeat(9)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 20 && taskCompletedPercent < 30) {
      taskProgress = `[${filledSymbol.repeat(2)}${emptySymbol.repeat(8)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 30 && taskCompletedPercent < 40) {
      taskProgress = `[${filledSymbol.repeat(3)}${emptySymbol.repeat(7)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 40 && taskCompletedPercent < 50) {
      taskProgress = `[${filledSymbol.repeat(4)}${emptySymbol.repeat(6)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 50 && taskCompletedPercent < 60) {
      taskProgress = `[${filledSymbol.repeat(5)}${emptySymbol.repeat(5)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 60 && taskCompletedPercent < 70) {
      taskProgress = `[${filledSymbol.repeat(6)}${emptySymbol.repeat(4)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 70 && taskCompletedPercent < 80) {
      taskProgress = `[${filledSymbol.repeat(7)}${emptySymbol.repeat(3)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 80 && taskCompletedPercent < 90) {
      taskProgress = `[${filledSymbol.repeat(8)}${emptySymbol.repeat(2)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 90 && taskCompletedPercent < 100) {
      taskProgress = `[${filledSymbol.repeat(9)}${emptySymbol.repeat(1)}] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent === 100) {
      taskProgress = `[${filledSymbol.repeat(10)}] ${taskCompletedPercent}% ‼`;
    }

    // ----------- Section: Adding Categorized Task List to Output -----------
    const allTaskCategorizedz = `
[Categorized Task: List View!][^CTLV]
[^CTLV]: []()${allTaskCategorized}
`;

    // console.log("allTaskCategorizedz:", allTaskCategorizedz);

    // Replace the note content in the 'Progress' section with the progress bar and categorized task list
    return app.replaceNoteContent({ uuid: app.context.noteUUID }, `${taskProgress}\n${allTaskCategorizedz}`, { section });

},
// ************************************************************** //
	"Overall!": async function(app, noteUUID) {

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();

	// Initialize a Set to hold the names of notes that belong to a specific group.
	let notesGroupNames = new Set();
	let notesGroup = "taskLists";

	// ----------- Section: Filtering Notes by Group -----------
	// Filter notes based on the specified group.
	let notesG = await app.filterNotes({ group: notesGroup });
	// console.log("notesG:", notesG);

	// ----------- Section: Sorting Notes -----------
	// Sort the filtered notes alphabetically by name. If a note's name is null or undefined,
	// an empty string is used as a fallback to avoid errors.
	notesG.sort((a, b) => {
		const nameA = a.name || ""; 
		const nameB = b.name || "";
		return nameA.localeCompare(nameB);
	});
	// console.log("notesG Sorted name:", notesG);

	// Sort the list of results based on the tag
	notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));
	// console.log("notesG Sorted tags:", notesG);

	// ----------- Section: Displaying Progress Bar -----------
	// Function to generate a progress bar with dynamic emoji sets
	function getTaskProgressBar(taskCompletedPercent) {
		// Set of desired emoji sets
		const emojiSets = {
			default: ['⬛', '🟩'],  // Default: Empty and Filled squares
			stars: ['☆', '★'],  // Stars: Empty and Filled stars
			circles: ['⚪', '🔵'],  // Circles: Empty and Filled circles
			hearts: ['🖤', '❤️'],  // Hearts: Empty and Filled hearts
			fire: ['🔥', '💥'],  // Fire: Fire and Explosion
			custom: ['🍫', '🍬'],  // Custom: Chocolate and Candy
			moons: ['🌑', '🌕'],  // Moons: New moon and Full moon
			books: ['📖', '📚'],  // Books: Open book and Stack of books
			faces: ['😐', '😁'],  // Faces: Neutral face and Grinning face
			trees: ['🌱', '🌳'],  // Trees: Seedling and Mature tree
			fruits: ['🍏', '🍎'],  // Fruits: Green apple and Red apple
			paws: ['🐾', '🐾🐾'],  // Paws: Single paw and Double paw prints
			fish: ['🐟', '🐠'],  // Fish: Blue fish and Tropical fish
			sports: ['⚽', '🏆'],  // Sports: Soccer ball and Trophy
			flowers: ['🌸', '🌹'],  // Flowers: Cherry blossom and Rose
			diamonds: ['💎', '🔷'],  // Diamonds: Gem and Blue diamond
			planes: ['🛫', '🛬'],  // Planes: Take-off and Landing
			clouds: ['🌥️', '⛅'],  // Clouds: Cloudy and Partly sunny
			arrows: ['➡️', '⬅️'],  // Arrows: Right arrow and Left arrow
			clocks: ['🕰️', '⏰'],  // Clocks: Old clock and Alarm clock
			notes: ['🎵', '🎶'],  // Notes: Single music note and Multiple notes
			pencils: ['✏️', '🖊️'],  // Pencils: Pencil and Pen
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

	// ----------- Section: Processing Each Note -----------
	// Loop through each note in the filtered and sorted list of notes.
	for (const noteHandleG of notesG) {
		
		// Retrieve all tasks, including completed and dismissed ones
		const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
		// console.log("taskAll:", taskAll);
		
		// Filter tasks into three categories: Completed, Dismissed, and Pending.
		const Completed = taskAll.filter(task => task.completedAt);
		const Dismissed = taskAll.filter(task => task.dismissedAt);
		const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
		// console.log("Completed, Dismissed, Pending:", Completed, Dismissed, Pending);

		// Generate a string representing the task statistics.
		const TaskStats = `Pending Tasks: (#${Pending.length}), Completed Tasks: (#${Completed.length}), Dismissed Tasks: (#${Dismissed.length})`;
		// console.log("TaskStats:", TaskStats);

		// Calculate the task progress as a percentage, ensuring that division by zero is avoided.
		const totalTasks = Pending.length + Completed.length + Dismissed.length;
		const taskCompletedPercent = totalTasks > 0 ? Math.round((1 - (Pending.length / totalTasks)) * 100) : 0;
		// console.log("totalTasks:", totalTasks);
		// console.log("taskCompletedPercent:", taskCompletedPercent);
		
		// Building the Progress Bar
		const taskProgress = getTaskProgressBar(taskCompletedPercent);
		// console.log("taskCompletedPercent:", taskCompletedPercent);

		// Add the note information to the Set, including the note's name, tags, task progress, and statistics.
		// notesGroupNames.add(`| [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${noteHandleG.tags} | ${taskCompletedPercent}% | ${TaskStats} |`); // Format 1
		// notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | |`); // Format 2
		notesGroupNames.add(`| ${noteHandleG.tags} | ${noteHandleG.name || "Untitled Note"} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | |`); // Format 3

	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(notesGroupNames);
	// console.log("results:", results);

	// Readme Notes
	const readmeNotes = `
### Readme!
- Above are list of Notes with respective Details, having atleast one Pending or Un-completed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager: All Notes\` once in a week/month and organise your Task respectively.
	- <mark>Note:</mark> Once you are generating the new Report, then you can delete all the Note Links (So that they do not show up in your Backlinks!), 
		- If you need the backlinks, you can delete the Note Names.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), ✒️ (Add your Comments).\`
`;
	
	// Create the final result text as a markdown table, including headers and the joined note information.
	let resultText;
	// resultText = "| Note Name | Tags | Task completion % | Task Stats |\n|---|---|---|---|\n" + results.join("\n"); // Format 1
	// resultText = "| Tags | Note Name | Progress Bar | Pending | Completed | Dismissed | Comments |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2a
	// resultText = "| Tags 🏷️ | Note Name 📝 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2b
	resultText = "| Tags 🏷️ | Note Name 📝 | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 3
	resultText += `\n\n${readmeNotes}`;
	// console.log("resultText:", resultText);

	// ----------- Section: Creating a New Note -----------
	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Task_Manager_${YYMMDD}_${HHMMSS}`;

	// Create a new note with the specified filename and tag, then insert the result text into it.
	let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
	await app.insertContent({ uuid: noteUUIDNew }, resultText);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
}
// ************************************************************** //
  }
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- August 27th, 2024: Planned and added different themes, based on the users selection, display categorized views of tasks in different states, pending, completed, dismissed. 

    - Also Added an Overall Task Manager. Renamed Progress Bar 2.0 to Task Manager. Tested, Added a lot of creative ideas, that were popping in my head. Tested them too. Fixed few bugs and handled all the exceptions that I could notice.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Progress Bar~~

    - ~~Have different sets of icons based on themes.~~

    - ~~Randomizer for the icons.~~

    - ~~Display completed n pending n dismissed tasks below them.~~

- ~~Randomly select emoji's or Manually select emoji's through prompt (Enabled and Disabled by Setting!).~~

    - ~~Let me think about this based on feedback and input from users.~~

- ~~Enable the Progress Bar for a Particular Tag.~~

    - ~~May be like Metadata, mostly this can come out as a result in Metadata Series (2.0 or 3.0)~~

        - ~~Listing all the notes in a particular Tag or Group of Tag selection, then Showing up Tasks distributions across, like a Manager.~~

        - ~~Now bring all the notes with active tasks and details from them.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Need to think!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^1]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 8h 38m = \~8h 34m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: [High-Level Explanation of the Code]()

    ### Code Explanation (Note!):

    - **Getting the 'Progress' Section**:

        - The script retrieves all sections from the note and searches for a section titled "Progress". If not found, it alerts the user to create it.

    - **Processing the Tasks**:

        - Retrieves tasks that are pending and counts them. Then, it retrieves all tasks, including those that are completed or dismissed.

    - **Helper Functions**:

        - `formatUnixTimestamp`: Converts UNIX timestamps into a human-readable format.

        - `sortByTimestamp`: A sorting function for tasks based on specific timestamps.

        - `formatPendingTask`: Prepares a pending task's output, including labels for `Important` and `Urgent` if they are true.

    - **Categorizing and Formatting Tasks**:

        - Tasks are filtered into `Completed`, `Dismissed`, and `Pending` categories. Each category is sorted and formatted for display.

    - **Task Progress Calculation**:

        - Calculates the percentage of tasks completed and constructs a corresponding progress bar to visually represent it.

    - **Displaying Progress Bar**:

        - Depending on the percentage of completed tasks, the progress bar changes to reflect the current state.

    - **Adding Categorized Task List to Output**:

        - The formatted task list is combined with the progress bar and then inserted back into the note under the 'Progress' section.

    This documentation and code structure should help you seamlessly integrate this code into your final project.

    ---

    ### Explanation of Each Section (Overall!):

    - **Filtering Notes by Group**:

        - Filters the notes based on a specified group (e.g., "taskLists") and stores the result.

    - **Sorting Notes**:

        - First, the notes are sorted alphabetically by name, handling cases where a name might be missing. Then, they are sorted by tags.

    - **Displaying Progress Bar**:

        - Defines a function to generate a progress bar using dynamic emoji sets based on the percentage of tasks completed.

    - **Processing Each Note**:

        - For each note, tasks are retrieved and categorized (Pending, Completed, Dismissed). The progress percentage is calculated, and a progress bar is generated. The note's information, including its name, tags, and task statistics, is added to the final output.

    - **Preparing the Final Output**:

        - Converts the Set of note information into an array and then into a markdown table format. Adds a Readme section with some additional instructions or tips.

    - **Creating a New Note**:

        - Generates a new note in AmpleNote with the compiled information, including a timestamp in the filename for uniqueness.

    Let me know if you need any further adjustments or explanations!

