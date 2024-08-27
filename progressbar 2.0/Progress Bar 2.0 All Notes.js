{
  async noteOption(app, noteUUID) {

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
      const additionalInfo = [importantText, urgentText].filter(Boolean).join(', ');  // Combine labels
      return `Content: ${task.content}, Start At: ${formatUnixTimestamp(task.startAt)}` + (additionalInfo ? `, ${additionalInfo}` : '');
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

    // Combine all categorized tasks into a single string output
    const allTaskCategorized = `*Pending Tasks: (#${Pending.length})*\n${Pending.join('\n')}\n*Completed Tasks: (#${Completed.length})*\n${Completed.join('\n')}\n*Dismissed Tasks: (#${Dismissed.length})*\n${Dismissed.join('\n')}`;

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
  

  async appOption (app, noteUUID) {

// Initialize a Set to hold the final results to ensure unique entries.
let results = new Set();

// Initialize a Set to hold the names of notes that belong to a specific group.
let notesGroupNames = new Set();
let notesGroup = "taskLists";

// Filter notes based on the specified group.
let notesG = await app.filterNotes({ group: notesGroup });
console.log("notesG:", notesG);

// Sort the filtered notes alphabetically by name. If a note's name is null or undefined,
// an empty string is used as a fallback to avoid errors.
notesG.sort((a, b) => {
    const nameA = a.name || ""; 
    const nameB = b.name || "";
    return nameA.localeCompare(nameB);
});
console.log("notesG Sorted:", notesG);

// Loop through each note in the filtered and sorted list of notes.
for (const noteHandleG of notesG) {
	
	// Retrieve all tasks, including completed and dismissed ones
	const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
	console.log("taskAll:", taskAll);
	
    // Filter tasks into three categories: Completed, Dismissed, and Pending.
    const Completed = taskAll.filter(task => task.completedAt);
    const Dismissed = taskAll.filter(task => task.dismissedAt);
    const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
	console.log("Completed, Dismissed, Pending:", Completed, Dismissed, Pending);

    // Generate a string representing the task statistics.
    const TaskStats = `Pending Tasks: (#${Pending.length}), Completed Tasks: (#${Completed.length}), Dismissed Tasks: (#${Dismissed.length})`;
	console.log("TaskStats:", TaskStats);

    // Calculate the task progress as a percentage, ensuring that division by zero is avoided.
    const totalTasks = Pending.length + Completed.length + Dismissed.length;
    const TaskProgressz = totalTasks > 0 ? Math.round((1 - (Pending.length / totalTasks)) * 100) : 0;
	console.log("totalTasks:", totalTasks);
	console.log("TaskProgressz:", TaskProgressz);

    // Add the note information to the Set, including the note's name, tags, task progress, and statistics.
    notesGroupNames.add(`| [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${noteHandleG.tags} | ${TaskProgressz}% | ${TaskStats} |`);

}

// Convert the Set of note names to an array and join them into a single string.
results = Array.from(notesGroupNames);
console.log("results:", results);

// Create the final result text as a markdown table, including headers and the joined note information.
let resultText = "| Note Name | Tags | Progress | Task Stats |\n|---|---|---|---|\n" + results.join("\n");
console.log("resultText:", resultText);

// Define the filename for the new note.
const filename = "Testing Progress Bar 2.0 - All";

// Create a new note with the specified filename and tag, then insert the result text into it.
let noteUUIDNew = await app.createNote(`${filename}`, ["-task-progress"]);
await app.insertContent({ uuid: noteUUIDNew }, resultText);

  }
}