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
      return `Task: ${task.content.replace(/\n/g, '').replace(/\[\^?\d*\]:?\s?\[.*?\]\(\)/g, '').replace(/\s+/g, ' ')}, Start At: ` + (additionalInfo ? `${additionalInfo}` : ''); 
	  // Remove newlines // Remove markdown links // Replace multiple spaces with a single space (As Amplenote does not handle Rich foot note inside a Rich foot note)
    }

    // ----------- Section: Categorizing and Formatting Tasks -----------
    // Filter and sort tasks that are completed, then format them
    const Completed = taskAll
      .filter(task => task.completedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'completedAt'))
      .map(task => `Task: ${task.content.replace(/\n/g, '').replace(/\[\^?\d*\]:?\s?\[.*?\]\(\)/g, '').replace(/\s+/g, ' ')}, Completed At: ${formatUnixTimestamp(task.completedAt)}`); 
	  // Remove newlines // Remove markdown links // Replace multiple spaces with a single space (As Amplenote does not handle Rich foot note inside a Rich foot note)

    // Filter and sort tasks that are dismissed, then format them
    const Dismissed = taskAll
      .filter(task => task.dismissedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'dismissedAt'))
      .map(task => `Task: ${task.content.replace(/\n/g, '').replace(/\[\^?\d*\]:?\s?\[.*?\]\(\)/g, '').replace(/\s+/g, ' ')}, Dismissed At: ${formatUnixTimestamp(task.dismissedAt)}`); 
	  // Remove newlines // Remove markdown links // Replace multiple spaces with a single space (As Amplenote does not handle Rich foot note inside a Rich foot note)

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

	}
},
// ************************************************************** //
  appOption: {
// ************************************************************** //
	"Report Active Tasks!": async function(app) {

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();

	// Initialize a Set to hold the names of notes that belong to a specific group.
	let notesGroupNames = new Set();
	// let notesGroup = "taskLists";

	// ----------- Section: Filtering Notes by Group -----------
	// Filter notes based on the specified group.
	// let notesG = await app.filterNotes({ group: notesGroup });
	let notesG = await app.filterNotes({ });
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
		// const totalScore = taskAll.reduce((sum, task) => sum + (task.score || 0), 0);
		const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score || 0), 0).toFixed(2));
		// console.log("Completed, Dismissed, Pending:", Completed, Dismissed, Pending);
		// console.log("totalScore:", totalScore);
		
	  if (Pending.length != 0) {

		// Generate a string representing the task statistics.
		// const TaskStats = `Pending Tasks: (#${Pending.length}), Completed Tasks: (#${Completed.length}), Dismissed Tasks: (#${Dismissed.length})`;
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
		// notesGroupNames.add(`| ${noteHandleG.tags} | ${noteHandleG.name || "Untitled Note"} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | |`); // Format 3
		// notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | ${totalScore} | |`); // Format 4
		notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${(Pending.length === 0 ? ' - ' : Pending.length)} | ${(Completed.length === 0 ? ' - ' : Completed.length)} | ${(Dismissed.length === 0 ? ' - ' : Dismissed.length)} | ${totalScore} | |`); // Format 4+

	  }
	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(notesGroupNames);
	// console.log("results:", results);

	const horizontalLine = `

---

`;

	// Readme Notes
	const readmeNotes = `
# Readme! - <mark>Task Manager - Active Tasks!</mark> <!-- {"collapsed":true} -->
- Below are list of Notes with respective Details, having at least one Pending or Un-completed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: R-Active!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
${horizontalLine}
`;

/* 	const readmeNotesX = `
### Readme!
- Above are list of Notes with respective Details, having atleast one Pending or Un-completed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager: All Notes\` once in a week/month and organise your Task respectively.
	- <mark>Note:</mark> Once you are generating the new Report, then you can delete all the Note Links (So that they do not show up in your Backlinks!), 
		- If you need the backlinks, you can delete the Note Names.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), ✒️ (Add your Comments).\`
`;  // Format 3 
*/
	
	// Create the final result text as a markdown table, including headers and the joined note information.
	let resultText;
	resultText = `${readmeNotes}\n`;
	// resultText = "| Note Name | Tags | Task completion % | Task Stats |\n|---|---|---|---|\n" + results.join("\n"); // Format 1
	// resultText = "| Tags | Note Name | Progress Bar | Pending | Completed | Dismissed | Comments |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2a
	// resultText = "| Tags 🏷️ | Note Name 📝 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2b
	// resultText = "| Tags 🏷️ | Note Name 📝 | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 3
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 4
	resultText += "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|---|\n||| Total |=sum(below)|=sum(below)|=sum(below)|=sum(below)||\n" + results.join("\n") + "\n||| Total |=sum(above)|=sum(above)|=sum(above)|=sum(above)||\n| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n"; // Format 4b
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n||| Total |=sum(below)|=sum(below)|=sum(below)||\n" + results.join("\n"); // Format 4b
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n") + "\n||| Total |=sum(above)|=sum(above)|=sum(above)||\n"; // Format 4a
	// resultText += `\n\n${readmeNotes}`;
	// console.log("resultText:", resultText);

	// ----------- Section: Creating a New Note -----------
	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `TM_Overall_Act_${YYMMDD}_${HHMMSS}`;

	// Create a new note with the specified filename and tag, then insert the result text into it.
	let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
	await app.insertContent({ uuid: noteUUIDNew }, resultText);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
},
// ************************************************************** //
	"Report Finished Tasks!": async function(app) {

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();

	// Initialize a Set to hold the names of notes that belong to a specific group.
	let notesGroupNames = new Set();
	// let notesGroup = "^taskLists";

	// ----------- Section: Filtering Notes by Group -----------
	// Filter notes based on the specified group.
	// let notesG = await app.filterNotes({ group: notesGroup });
	let notesG = await app.filterNotes({ });
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
		// const totalScore = taskAll.reduce((sum, task) => sum + (task.score || 0), 0);
		const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score || 0), 0).toFixed(2));
		// console.log("Completed, Dismissed, Pending:", Completed, Dismissed, Pending);
		// console.log("totalScore:", totalScore);
		
	  if (Pending.length === 0 && (Completed.length !=0 || Dismissed.length !=0)) {

		// Generate a string representing the task statistics.
		// const TaskStats = `Pending Tasks: (#${Pending.length}), Completed Tasks: (#${Completed.length}), Dismissed Tasks: (#${Dismissed.length})`;
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
		// notesGroupNames.add(`| ${noteHandleG.tags} | ${noteHandleG.name || "Untitled Note"} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | |`); // Format 3
		// notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${Pending.length} | ${Completed.length} | ${Dismissed.length} | ${totalScore} | |`); // Format 4
		notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${taskProgress} | ${(Pending.length === 0 ? ' - ' : Pending.length)} | ${(Completed.length === 0 ? ' - ' : Completed.length)} | ${(Dismissed.length === 0 ? ' - ' : Dismissed.length)} | ${totalScore} | |`); // Format 4+

	  }
	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(notesGroupNames);
	// console.log("results:", results);

	const horizontalLine = `

---

`;

	// Readme Notes
	const readmeNotes = `
# Readme! - <mark>Task Manager - Finished Tasks!</mark> <!-- {"collapsed":true} -->
- Below are list of Notes with respective Details, having no Pending or Un-completed Task, but has at least one Completed or Dismissed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: R-Finished!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
${horizontalLine}
`;
	
	// Create the final result text as a markdown table, including headers and the joined note information.
	let resultText;
	resultText = `${readmeNotes}\n`;
	// resultText = "| Note Name | Tags | Task completion % | Task Stats |\n|---|---|---|---|\n" + results.join("\n"); // Format 1
	// resultText = "| Tags | Note Name | Progress Bar | Pending | Completed | Dismissed | Comments |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2a
	// resultText = "| Tags 🏷️ | Note Name 📝 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 2b
	// resultText = "| Tags 🏷️ | Note Name 📝 | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 3
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n"); // Format 4
	resultText += "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|---|\n||| Total |0|=sum(below)|=sum(below)|=sum(below)||\n" + results.join("\n") + "\n||| Total |0|=sum(above)|=sum(above)|=sum(above)||\n| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | 🔢 | ✒️ |\n"; // Format 4b
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n||| Total |=sum(below)|=sum(below)|=sum(below)||\n" + results.join("\n"); // Format 4b
	// resultText = "| Tags 🏷️ | Note Link 🔗 | Progress Bar 📊 | ❗ | ✔️ | ✖️ | ✒️ |\n|---|---|---|---|---|---|---|---|\n" + results.join("\n") + "\n||| Total |=sum(above)|=sum(above)|=sum(above)||\n"; // Format 4a
	// resultText += `\n\n${readmeNotes}`;
	// console.log("resultText:", resultText);

	// ----------- Section: Creating a New Note -----------
	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `TM_Overall_Fin_${YYMMDD}_${HHMMSS}`;

	// Create a new note with the specified filename and tag, then insert the result text into it.
	let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
	await app.insertContent({ uuid: noteUUIDNew }, resultText);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
},
// ************************************************************** //
	"Trend Over Dates!": async function(app) {

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();

	// Initialize a Set to hold the names of notes that belong to a specific group.
	let notesGroupNamesA = [];
	let notesGroupNames = new Set();
	// let notesGroup = "^taskLists";

	// ----------- Section: Filtering Notes by Group -----------
	// Filter notes based on the specified group.
	// let notesG = await app.filterNotes({ group: notesGroup });
	let notesG = await app.filterNotes({ });
	// console.log("notesG:", notesG);

	// ----------- Section: Processing Each Note -----------
	// Loop through each note in the filtered and sorted list of notes.
	for (const noteHandleG of notesG) {
		
		// Retrieve all tasks, including completed and dismissed ones
		const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
		console.log("taskAll:", taskAll);
		
		// Filter tasks into three categories: Completed, Dismissed, and Pending.
		const Completed = taskAll.filter(task => task.completedAt);
		const Dismissed = taskAll.filter(task => task.dismissedAt);
		const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
		// const totalScore = taskAll.reduce((sum, task) => sum + (task.score || 0), 0);
		// const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score || 0), 0).toFixed(2));
		// console.log("Completed, Dismissed, Pending:", Completed, Dismissed, Pending);
		// console.log("totalScore:", totalScore);
		
	  // if (Pending.length === 0 && (Completed.length !=0 || Dismissed.length !=0)) {
	  if (Completed.length !=0 || Dismissed.length !=0) {

		  // Classify each task into the appropriate quadrant
		  for (const task of taskAll) {
			
			if (task.completedAt) {
			  // Completed Tasks
			  const formattedDate = new Date(task.completedAt * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, '');
			  notesGroupNamesA.push(`${formattedDate},${task.score},Completed`);
			} 
			if (task.dismissedAt) {
			  // Dismissed Tasks
			  const formattedDate = new Date(task.dismissedAt * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, '');
			  notesGroupNamesA.push(`${formattedDate},${task.score},Dismissed`);
			}
			
		  }
	  }
	}

		// Add the note information to the Set, including the note's name, tags, task progress, and statistics.
		// Step 1: Sort notesGroupNamesA by date (no need for notesGroupMap)
		const sortedEntries = [...notesGroupNamesA].sort((entryA, entryB) => {
		  const [dateA] = entryA.split(',');
		  const [dateB] = entryB.split(',');
		  return new Date(dateA) - new Date(dateB);
		});

		// Step 2: Create a map to group tasks by date and status
		const notesGroupMap = new Map();

		for (const entry of sortedEntries) {
		  const [date, score, status] = entry.split(',');
		  const scoreValue = parseFloat(score);

		  // Create a unique key by combining date and status
		  const key = `${date}-${status}`;

		  // If the combination of date and status already exists in the map, update its count and score
		  if (notesGroupMap.has(key)) {
			const existingEntry = notesGroupMap.get(key);
			existingEntry.count += 1;
			existingEntry.totalScore += scoreValue;
		  } else {
			// If the combination of date and status doesn't exist, create a new entry
			notesGroupMap.set(key, { count: 1, totalScore: scoreValue, status });
		  }
		}

		// Step 3: Prepare the result for notesGroupNames
		for (const [key, data] of notesGroupMap) {
		  const [date, status] = key.split('-'); // Split the key back into date and status
		  notesGroupNames.add(`|${date}|${data.count}|${data.totalScore.toFixed(2)}|${status}| |`);
		}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(notesGroupNames);
	// console.log("notesGroupNamesA:", notesGroupNamesA);
	// console.log("notesGroupNames:", notesGroupNames);
	// console.log("results:", results);

	const horizontalLine = `

---

`;

	// Readme Notes
	const readmeNotes = `
# Readme! - <mark>Task Manager - Tasks Trend!</mark> <!-- {"collapsed":true} -->
- Below are list of Task Metrics based on Date, having at least one Completed or Dismissed Task in the Note. Sorted and Pivoted by Date + Status.
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: Trend!\` once in a week/month and organize your Task respectively.
- <mark>Visualization:</mark> Using my [Graph Utility Plugin](https://www.amplenote.com/plugins/sDBcbBrdEhAuerZ5HzLyaTn5) - **Viewer!** Option, You can Visualize the Trend over the period of time, for task count and task score gained on a particular day.
${horizontalLine}
`;
	
	// Create the final result text as a markdown table, including headers and the joined note information.
	let resultText;
	resultText = `${readmeNotes}\n`;
	resultText += "| Date 📅 | Task Count 🔢 | Total Score 🔢 | Status ✔️✖️ | ✒️ |\n|---|---|---|---|---|\n| Total |=sum(below)|=sum(below)|||\n" + results.join("\n") + "\n| Total |=sum(above)|=sum(above)|||\n| Date 📅 | Task Count 🔢 | Total Score 🔢 | Status ✔️✖️ | ✒️ |\n";
	// console.log("resultText:", resultText);

	// ----------- Section: Creating a New Note -----------
	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `TM_Overall_Trend_${YYMMDD}_${HHMMSS}`;

	// Create a new note with the specified filename and tag, then insert the result text into it.
	let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
	await app.insertContent({ uuid: noteUUIDNew }, resultText);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
},
// ************************************************************** //
	"Eisenhower Matrix!": async function(app) {

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();

	// Initialize a Set to hold the names of notes that belong to a specific group.
	let notesGroupNames = new Set();
	// let notesGroup = "^taskLists";

	// ----------- Section: Filtering Notes by Group -----------
	// Filter notes based on the specified group.
	// let notesG = await app.filterNotes({ group: notesGroup });
	let notesG = await app.filterNotes({ });
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

	// ----------- Section: Processing Each Note -----------
	// Loop through each note in the filtered and sorted list of notes.
	for (const noteHandleG of notesG) {
		
	  // Retrieve all tasks, including completed and dismissed ones
	  const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: false });
	  // console.log("taskAll:", taskAll);
	  const tagz = `${noteHandleG.tags}`;
	  // console.log("tagz:", tagz);
	  const noteLinkz = `[${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid})`;
	  // console.log("noteLinkz:", noteLinkz);
	  const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score || 0), 0).toFixed(2));
	  // console.log("totalScore:", totalScore);
	  
	  // Initialize arrays for Eisenhower matrix quadrants
	  let importantAndUrgent = [];
	  let importantNotUrgent = [];
	  let notImportantButUrgent = [];
	  let notImportantNotUrgent = [];
		
	  // Classify each task into the appropriate quadrant
	  for (const task of taskAll) {
		
		if (task.important && task.urgent) {
		  // Quadrant 1: Important and Urgent (Do first)
		  importantAndUrgent.push(task);
		
		} else if (task.important && !task.urgent) {
		  // Quadrant 2: Important but Not Urgent (Schedule it)
		  importantNotUrgent.push(task);
		
		} else if (!task.important && task.urgent) {
		  // Quadrant 3: Not Important but Urgent (Delegate)
		  notImportantButUrgent.push(task);
		
		} else if (!task.important && !task.urgent) {
		  // Quadrant 4: Not Important and Not Urgent (Eliminate)
		  notImportantNotUrgent.push(task);
		}
	  }

	  // Log the tasks categorized by the Eisenhower matrix
	  // console.log("Important and Urgent (Do first):", importantAndUrgent);
	  // console.log("Important but Not Urgent (Schedule it):", importantNotUrgent);
	  // console.log("Not Important but Urgent (Delegate):", notImportantButUrgent);
	  // console.log("Not Important and Not Urgent (Eliminate):", notImportantNotUrgent);
	  
	  if (importantAndUrgent.length || importantNotUrgent.length || notImportantButUrgent.length || notImportantNotUrgent.length) {

		// notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${importantAndUrgent.length} | ${importantNotUrgent.length} | ${notImportantButUrgent.length} | ${notImportantNotUrgent.length} | ${totalScore} | |`);
		notesGroupNames.add(`| ${noteHandleG.tags} | [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${(importantAndUrgent.length === 0 ? ' - ' : importantAndUrgent.length)} | ${(importantNotUrgent.length === 0 ? ' - ' : importantNotUrgent.length)} | ${(notImportantButUrgent.length === 0 ? ' - ' : notImportantButUrgent.length)} | ${(notImportantNotUrgent.length === 0 ? ' - ' : notImportantNotUrgent.length)} | ${totalScore} | |`);

	  }
	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(notesGroupNames);
	// console.log("results:", results);

	const horizontalLine = `

---

`;

	// Readme Notes
	const readmeNotes = `
# Readme! - <mark>Task Manager - Eisenhower Matrix!</mark> <!-- {"collapsed":true} -->
- Below are list of Notes with respective Details, having at least one Pending or Un-completed Task in the Note, w/ tasks Important OR Urgent Options are selected.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: E.M.!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`🔥 (Important and urgent), ⚡ (Important but not urgent), ⚾ (Not important but urgent), 🗑️ (Not important and not urgent), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
	- Learn more on [Eisenhower Method](https://public.amplenote.com/Eu8Azcoih6NaU2r4pebHHaP3).
${horizontalLine}
`;
	
	// Create the final result text as a markdown table, including headers and the joined note information.
	let resultText;
	resultText = `${readmeNotes}\n`;
	resultText += "| Tags 🏷️ | Note Link 🔗 | 🔥 | ⚡ | ⚾ | 🗑️ | 🔢 | ✒️ |\n|---|---|---|---|---|---|---|---|---|\n|| Total |=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)||\n" + results.join("\n") + "\n|| Total |=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)||\n| Tags 🏷️ | Note Link 🔗 | 🔥 | ⚡ | ⚾ | 🗑️ | 🔢 | ✒️ |\n";
	// console.log("resultText:", resultText);

	// ----------- Section: Creating a New Note -----------
	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `TM_Overall_E_M_${YYMMDD}_${HHMMSS}`;

	// Create a new note with the specified filename and tag, then insert the result text into it.
	let noteUUIDNew = await app.createNote(`${filename}`, ["-reports/-task-manager"]);
	await app.insertContent({ uuid: noteUUIDNew }, resultText);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
},
// ************************************************************** //
	"Download Extract Report!": async function(app) {

	// Prompt the user for tags and object type input
	const result = await app.prompt(
		"Select Details on which you want to Download Extract Report on.",
		{
		  inputs: [
			{
			  label: "Select Tags [OR] (Each tag is searched separately)",
			  type: "tags",
			  limit: 10,
			  placeholder: "Enter tag/'s' (Max 10)"
			},
			{
			  label: "Select Tags [AND] (Combined tag is searched)",
			  type: "tags",
			  limit: 10,
			  placeholder: "Enter tag/'s' (Max 10)"
			},
			{
			  label: "Select the Download Format",
			  type: "radio",
			  options: [
				{ label: "Download as markdown Table", value: "download_md" },
				{ label: "Download as CSV (Recommended)", value: "download_csv" },
				{ label: "Download as TXT", value: "download_txt" },
				{ label: "Download as JSON", value: "download_json" }
			  ]
			}
		  ]
		}
	  );

	// Log the user input (result)
	// console.log("User input result:", result);

	// Destructure the inputs for OR/AND tags, object type, and download format
	const [tagNamesOr, tagNamesAnd, dwFormat] = result;
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
	  return;
	}

	// Ensure tags and formatting are selected
	// if (!tagNamesOr && !tagNamesAnd) {
	  // app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
	  // return;
	// }
	if (!dwFormat) {
	  app.alert("Note: Select any one of the Download Format.");
	  return;
	}

	// Initialize empty arrays for storing notes and filtered notes
	let notesG = [];
	// console.log("Initial notes array:", notes);

	const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray (from tagNamesOr):", tagsArray);

	let filteredNotes = [];
	// console.log("Initial filteredNotes array:", filteredNotes);

	// Filtering logic based on tags [OR] and [AND]
	if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
	  // Filter notes by OR tags (separate search for each tag)
	  if (Array.isArray(tagsArray) && tagsArray.length > 0) {
		for (const tag of tagsArray) {
		  const notesByTag = await app.filterNotes({ tag: tag });
		  // console.log(`Notes filtered by tag "${tag}":`, notesByTag);
		  filteredNotes = [...filteredNotes, ...notesByTag];
		  // console.log("filteredNotes after OR filter:", filteredNotes);
		}
	  }

	  // Filter notes by AND tags (combined search for all tags)
	  if (tagNamesAnd) {
		const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
		// console.log("Notes filtered by AND tags:", notesByGroup);
		filteredNotes = [...filteredNotes, ...notesByGroup];
		// console.log("filteredNotes after AND filter:", filteredNotes);
	  }
	} else {
	  // Default filter if no tags are provided
	  const notesByGroup = await app.filterNotes({ group: "^vault" });
	  // console.log("Notes filtered by default group (^vault):", notesByGroup);
	  filteredNotes = [...filteredNotes, ...notesByGroup];
	  // console.log("filteredNotes after default group filter:", filteredNotes);
	}

	// Remove duplicate notes
	filteredNotes = [...new Set(filteredNotes)];
	// console.log("filteredNotes after removing duplicates:", filteredNotes);

	// Sort the filtered notes by note name in ascending order
	filteredNotes.sort((a, b) => {
	  const nameA = (a.name || "").toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
	  const nameB = (b.name || "").toUpperCase();
	  if (nameA < nameB) {
		return -1;
	  }
	  if (nameA > nameB) {
		return 1;
	  }
	  return 0; // Names are equal
	});

	// console.log("filteredNotes after sorting by name:", filteredNotes);

	notesG = filteredNotes;
	// console.log("Final notes array:", notesG);

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();
	let allTasks = []; // Array to store all tasks

	/**
	 * Formats the task's repeat information.
	 * @param {string} repeatInfo - The task's repeat information in a specific string format.
	 * @returns {string} - A formatted string displaying the repeat frequency, start date, and time.
	 */
	function formatTaskRepeat(repeatInfo) {
	  if (!repeatInfo || typeof repeatInfo !== 'string') {
		return "Not Available"; // Return default message if repeatInfo is missing or not a string
	  }

	  // Split the repeatInfo into lines
	  const lines = repeatInfo.split('\n').map(line => line.trim());

	  // Extract date and time from DTSTART
	  const dtstartLine = lines[0];
	  const rruleLine = lines[1];
	  
	  const dtstart = dtstartLine.substring(8); // Remove 'DTSTART:'
	  const year = dtstart.substring(0, 4);
	  const month = dtstart.substring(4, 6);
	  const day = dtstart.substring(6, 8);
	  const hours = dtstart.substring(8, 10);
	  const minutes = dtstart.substring(10, 12);
	  const seconds = dtstart.substring(12, 14);

	  // Format date and time
	  const formattedDate = `${month}/${day}/${year}`;
	  const formattedTime = `${hours}:${minutes}:${seconds}`;

	  // Parse RRULE to get the repeat frequency
	  const rrule = rruleLine.substring(10); // Remove 'RRULE:FREQ='
	  const repeatFrequency = rrule.toUpperCase(); // Convert frequency to uppercase

	  // Format and return the output
	  return `${repeatFrequency.charAt(0).toUpperCase() + repeatFrequency.slice(1).toLowerCase()} <b>Starts At:</b> ${formattedDate} at ${formattedTime}`;
	}

	/**
	 * Formats a Unix timestamp into a readable date and time string.
	 * @param {number} timestamp - The Unix timestamp (in seconds).
	 * @returns {string} - A formatted string with the date and time or "Not Set!" if no timestamp.
	 */
	function formatTimestamp(timestamp) {
	  if (!timestamp) {
		return 'Not Set!'; // Return if timestamp is null or undefined
	  }

	  // Create a new Date object from the Unix timestamp (in milliseconds)
	  const date = new Date(timestamp * 1000);

	  // Extract date and time components
	  const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
	  const day = String(date.getDate()).padStart(2, '0');
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  const seconds = String(date.getSeconds()).padStart(2, '0');

	  // Format and return date and time
	  const formattedDate = `${month}/${day}/${year}`;
	  const formattedTime = `${hours}:${minutes}:${seconds}`;

	  return `${formattedDate} at ${formattedTime}`;
	}

	// ----------- Section: Processing Each Note -----------
	// Loop through each note in the filtered and sorted list of notes.
	for (const noteHandleG of notesG) {
		
	  // Retrieve all tasks, including completed and dismissed ones
	  const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
	  console.log("taskAll:", taskAll);

		// Process each task and add relevant info
		for (let i = 0; i < taskAll.length; i++) {
		  const task = taskAll[i];
			// Remove unwanted characters and patterns from task.content
			const sanitizedContent = task.content
			  .replace(/\n/g, " ") // Replace newline characters with space
			  .replace(/\*\*|~~/g, "") // Remove markdown formatting like ** and ~~
			  .replace(/<!--.*?-->/g, "") // Remove HTML comments
			  .replace(/<[^>]+>/g, ""); // Remove HTML tags, including <mark> and attributes
			// Sanitize noteHandleG.name to retain only letters and numbers
			const sanitizedNoteName = noteHandleG.name.replace(/[^a-zA-Z0-9 ]/g, "");
		allTasks.push({
		  content: sanitizedContent, // Use the sanitized content

		  notename: sanitizedNoteName, // Use the sanitized note name
		  noteurl: `https://www.amplenote.com/notes/${noteHandleG.uuid}`,
		  tags: `${noteHandleG.tags}`,

		  startAtz: `${formatTimestamp(task.startAt)}`,
		  hideUntilz: `${formatTimestamp(task.hideUntil)}`,
		  endAtz: `${formatTimestamp(task.endAt)}`,

		  repeatz: `${formatTaskRepeat(task.repeat)}`,

		  startAt: task.startAt ?? null,
		  hideUntil: task.hideUntil ?? null,

		  completedAt: task.completedAt ?? null, // Use null if undefined
		  dismissedAt: task.dismissedAt ?? null,
		  endAt: task.endAt ?? null,
		  repeat: task.repeat ?? null,

		  important: task.important ?? null,
		  urgent: task.urgent ?? null,
		  score: task.score ?? null,

		  uuid: task.uuid ?? null,
		  noteUUID: task.noteUUID ?? null,
		});
		}
	  
	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	results = Array.from(allTasks);
	console.log("results:", results);

	function downloadResults(results, dwFormat) {
		// Helper function to convert data to CSV
		function toCSV(data) {
			if (data.length === 0) return ""; // Handle empty data case

			// Create the header row
			const headers = Object.keys(data[0]).map(field => `"${field}"`).join(",");

			// Map each object to a CSV row, wrapping each value in double quotes
			const rows = data.map(obj => 
				Object.values(obj)
					.map(value => `"${String(value).replace(/"/g, '""')}"`) // Escape double quotes by doubling them
					.join(",")
			);

			return [headers, ...rows].join("\n"); // Combine headers and rows with newline
		}

		// Helper function to download a file
		function downloadFile(filename, content, contentType) {
			const blob = new Blob([content], { type: contentType });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
			URL.revokeObjectURL(link.href);
		}

		let content = "";
		let filename = "Task Manager Pro - Export";
		let contentType = "text/plain";

		switch (dwFormat) {
			case "download_md":
				content = results
					.map(task => `| ${Object.values(task).join(" | ")} |`)
					.join("\n");
				const headers = `| ${Object.keys(results[0]).join(" | ")} |`;
				const divider = `| ${Object.keys(results[0]).map(() => "---").join(" | ")} |`;
				content = `${headers}\n${divider}\n${content}`;
				filename += ".md";
				contentType = "text/markdown";
				break;

			case "download_csv":
				content = toCSV(results); // Convert results to CSV with proper escaping
				filename += ".csv";
				contentType = "text/csv";
				break;

			case "download_txt":
				content = results
					.map(task => JSON.stringify(task, null, 2))
					.join("\n\n");
				filename += ".txt";
				break;

			case "download_json":
				content = JSON.stringify(results, null, 2); // Pretty JSON
				filename += ".json";
				contentType = "application/json";
				break;

			default:
				console.error("Unknown format selected:", dwFormat);
				return;
		}

		// Trigger the download
		downloadFile(filename, content, contentType);
	}
	
	// Set the format based on user selection
	downloadResults(results, dwFormat);

},
// ************************************************************** //
	"Filtered Report - Summary!": async function(app) {

	// Prompt the user for tags and object type input
	const result = await app.prompt(
		"Select Details on which you want a Filtered Report - Summary Extract Report on.",
		{
		  inputs: [
			{
			  label: "Select the Time Duration",
			  type: "select",
			  options: [
				{ label: "Today", value: "today" },
				{ label: "Yesterday", value: "yesterday" },
				{ label: "This Week", value: "thisweek" },
				{ label: "Last Week", value: "lastweek" },
				{ label: "This Month", value: "thismonth" },
				{ label: "Last Month", value: "lastmonth" },
				{ label: "ALL", value: "all" },
				{ label: "Custom Dates", value: "custom" }
			  ],
			  value: "today"
			},
			{
			  label: "Select the Task Status",
			  type: "select",
			  options: [
				{ label: "Completed", value: "completed" },
				{ label: "Dismissed", value: "dismissed" },
				{ label: "Hidden", value: "hidden" },
				{ label: "Starts", value: "starts" },
				{ label: "Ends", value: "ends" }
			  ],
			  value: "completed"
			},
			{
			  label: "Select the Priority",
			  type: "select",
			  options: [
				{ label: "All", value: "all" },
				{ label: "None", value: "none" },
				{ label: "Important", value: "imp" },
				{ label: "Urgent", value: "urg" },
				{ label: "Important & Urgent", value: "imp_urg" }
			  ],
			  value: "all"
			},
			{
			  label: "Select Tags [OR] (Each tag is searched separately)",
			  type: "tags",
			  limit: 10,
			  placeholder: "Enter tag/'s' (Max 10)"
			},
			{
			  label: "Select Tags [AND] (Combined tag is searched)",
			  type: "tags",
			  limit: 10,
			  placeholder: "Enter tag/'s' (Max 10)"
			}
		  ]
		}
	  );

	// Log the user input (result)
	// console.log("User input result:", result);

	// Destructure the inputs for OR/AND tags, object type, and download format
	const [timeSpan, taskStatus, taskPriority, tagNamesOr, tagNamesAnd] = result;
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
	  return;
	}

	// Ensure tags and formatting are selected
	if (!tagNamesOr && !tagNamesAnd) {
	  app.alert("Note: Select any one of the Tag condition.");
	  return;
	}

	function formatDate(date) {
		const day = String(date.getDate()).padStart(2, '0');
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	}

	// Usage
	const today = new Date();
	// console.log(formatDate(today)); // Example output: "21-Nov-2024"
	let fromDate, tillDate;

	if (timeSpan === "custom") {
	// Prompt the user for tags and object type input
	const resultDate = await app.prompt(
		"Select Time Span on which you want a Filtered Report - Summary Extract Report on.",
		{
		  inputs: [
			{ label: "From Date (Edit the Month/Date/Year)", value: formatDate(today), type: "string" },
			{ label: "Till Date (Edit the Month/Date/Year)", value: formatDate(today), type: "string" }
		  ]
		}
	  );
	[fromDate, tillDate] = resultDate;

	// Ensure tags and formatting are selected
	if (!fromDate || !tillDate) {
	  app.alert("Note: Select both the Date conditions.");
	  return;
	}

	}

	// Initialize empty arrays for storing notes and filtered notes
	let notesG = [];
	// console.log("Initial notes array:", notes);

	const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray (from tagNamesOr):", tagsArray);

	let filteredNotes = [];
	// console.log("Initial filteredNotes array:", filteredNotes);

	// Filtering logic based on tags [OR] and [AND]
	if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
	  // Filter notes by OR tags (separate search for each tag)
	  if (Array.isArray(tagsArray) && tagsArray.length > 0) {
		for (const tag of tagsArray) {
		  const notesByTag = await app.filterNotes({ tag: tag });
		  // console.log(`Notes filtered by tag "${tag}":`, notesByTag);
		  filteredNotes = [...filteredNotes, ...notesByTag];
		  // console.log("filteredNotes after OR filter:", filteredNotes);
		}
	  }

	  // Filter notes by AND tags (combined search for all tags)
	  if (tagNamesAnd) {
		const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
		// console.log("Notes filtered by AND tags:", notesByGroup);
		filteredNotes = [...filteredNotes, ...notesByGroup];
		// console.log("filteredNotes after AND filter:", filteredNotes);
	  }
	} else {
	  // Default filter if no tags are provided
	  const notesByGroup = await app.filterNotes({ group: "^vault" });
	  // console.log("Notes filtered by default group (^vault):", notesByGroup);
	  filteredNotes = [...filteredNotes, ...notesByGroup];
	  // console.log("filteredNotes after default group filter:", filteredNotes);
	}

	// Remove duplicate notes
	filteredNotes = [...new Set(filteredNotes)];
	// console.log("filteredNotes after removing duplicates:", filteredNotes);

	// Sort the filtered notes by note name in ascending order
	filteredNotes.sort((a, b) => {
	  const nameA = (a.name || "").toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
	  const nameB = (b.name || "").toUpperCase();
	  if (nameA < nameB) {
		return -1;
	  }
	  if (nameA > nameB) {
		return 1;
	  }
	  return 0; // Names are equal
	});

	// console.log("filteredNotes after sorting by name:", filteredNotes);

	notesG = filteredNotes;
	// console.log("Final notes array:", notesG);

	// Initialize a Set to hold the final results to ensure unique entries.
	let results = new Set();
	let allTasks = []; // Array to store all tasks

	/**
	 * Formats the task's repeat information.
	 * @param {string} repeatInfo - The task's repeat information in a specific string format.
	 * @returns {string} - A formatted string displaying the repeat frequency, start date, and time.
	 */
	function formatTaskRepeat(repeatInfo) {
	  if (!repeatInfo || typeof repeatInfo !== 'string') {
		return "Not Available"; // Return default message if repeatInfo is missing or not a string
	  }

	  // Split the repeatInfo into lines
	  const lines = repeatInfo.split('\n').map(line => line.trim());

	  // Extract date and time from DTSTART
	  const dtstartLine = lines[0];
	  const rruleLine = lines[1];
	  
	  const dtstart = dtstartLine.substring(8); // Remove 'DTSTART:'
	  const year = dtstart.substring(0, 4);
	  const month = dtstart.substring(4, 6);
	  const day = dtstart.substring(6, 8);
	  const hours = dtstart.substring(8, 10);
	  const minutes = dtstart.substring(10, 12);
	  const seconds = dtstart.substring(12, 14);

	  // Format date and time
	  const formattedDate = `${month}/${day}/${year}`;
	  const formattedTime = `${hours}:${minutes}:${seconds}`;

	  // Parse RRULE to get the repeat frequency
	  const rrule = rruleLine.substring(10); // Remove 'RRULE:FREQ='
	  const repeatFrequency = rrule.toUpperCase(); // Convert frequency to uppercase

	  // Format and return the output
	  return `${repeatFrequency.charAt(0).toUpperCase() + repeatFrequency.slice(1).toLowerCase()} <b>Starts At:</b> ${formattedDate} at ${formattedTime}`;
	}

	/**
	 * Formats a Unix timestamp into a readable date and time string.
	 * @param {number} timestamp - The Unix timestamp (in seconds).
	 * @returns {string} - A formatted string with the date and time or "Not Set!" if no timestamp.
	 */
	function formatTimestamp(timestamp) {
	  if (!timestamp) {
		return 'Not Set!'; // Return if timestamp is null or undefined
	  }

	  // Create a new Date object from the Unix timestamp (in milliseconds)
	  const date = new Date(timestamp * 1000);

	  // Extract date and time components
	  const year = date.getFullYear();
	  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
	  const day = String(date.getDate()).padStart(2, '0');
	  const hours = String(date.getHours()).padStart(2, '0');
	  const minutes = String(date.getMinutes()).padStart(2, '0');
	  const seconds = String(date.getSeconds()).padStart(2, '0');

	  // Format and return date and time
	  const formattedDate = `${month}/${day}/${year}`;
	  const formattedTime = `${hours}:${minutes}:${seconds}`;

	  return `${formattedDate} at ${formattedTime}`;
	}

	// Helper function to parse date in "dd-MMM-yyyy" format to a Date object
	function parseCustomDate(dateStr) {
	  const [day, monthStr, year] = dateStr.split('-');
	  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	  const month = monthNames.indexOf(monthStr);
	  return new Date(year, month, day);
	}

	// Helper functions to handle time-based filtering
	function isWithinTimeSpan(taskDate) {
	  if (!taskDate) return false;
	  const taskTime = new Date(taskDate * 1000); // Convert UNIX timestamp to Date
	  const now = new Date();
	  
	  // Parse custom date ranges only if needed
	  const fromParsedDate = timeSpan === "custom" ? parseCustomDate(fromDate) : null;
	  const tillParsedDate = timeSpan === "custom" ? parseCustomDate(tillDate) : null;

	  switch (timeSpan) {
		case "today":
		  return taskTime.toDateString() === now.toDateString();
		case "yesterday":
		  const yesterday = new Date(now);
		  yesterday.setDate(now.getDate() - 1);
		  return taskTime.toDateString() === yesterday.toDateString();
		case "thisweek":
		  const startOfWeek = new Date(now);
		  startOfWeek.setDate(now.getDate() - now.getDay());
		  return taskTime >= startOfWeek && taskTime <= now;
		case "lastweek":
		  const lastWeekStart = new Date(now);
		  lastWeekStart.setDate(now.getDate() - now.getDay() - 7);
		  const lastWeekEnd = new Date(lastWeekStart);
		  lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
		  return taskTime >= lastWeekStart && taskTime <= lastWeekEnd;
		case "thismonth":
		  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		  return taskTime >= startOfMonth && taskTime <= now;
		case "lastmonth":
		  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
		  return taskTime >= lastMonthStart && taskTime <= lastMonthEnd;
		case "custom":
			return taskTime >= fromParsedDate && taskTime <= tillParsedDate;
		case "all":
		  return true;
		default:
		  return false;
	  }
	}

	// ----------- Section: Processing Each Note -----------
	// Loop through each note in the filtered and sorted list of notes.
	for (const noteHandleG of notesG) {
		
	  // Retrieve all tasks, including completed and dismissed ones
	  const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: true });
	  console.log("taskAll:", taskAll);

		// Process each task and add relevant info based on filters
		for (let i = 0; i < taskAll.length; i++) {
		  const task = taskAll[i];
  
		  // Filter by task status
		  if (
			(taskStatus === "completed" && !task.completedAt) ||
			(taskStatus === "dismissed" && !task.dismissedAt) ||
			(taskStatus === "hidden" && !task.hideUntil) ||
			(taskStatus === "starts" && !task.startAt) ||
			(taskStatus === "ends" && !task.endAt)
		  ) {
			continue; // Skip tasks that don't match the selected status
		  }
		  
		  // Filter by priority
		  if (
			(taskPriority === "imp" && !task.important) ||
			(taskPriority === "urg" && !task.urgent) ||
			(taskPriority === "imp_urg" && (!task.important || !task.urgent)) ||
			(taskPriority === "none" && (task.important || task.urgent))
		  ) {
			continue; // Skip tasks that don't match the priority
		  }
		  
		  // Filter by time span
		  const taskDate = 
			taskStatus === "completed" ? task.completedAt :
			taskStatus === "dismissed" ? task.dismissedAt :
			taskStatus === "hidden" ? task.hideUntil :
			taskStatus === "starts" ? task.startAt :
			taskStatus === "ends" ? task.endAt : null;

		  if (!isWithinTimeSpan(taskDate)) {
			continue; // Skip tasks outside the time span
		  }

			allTasks.push({
			  noteurl: `https://www.amplenote.com/notes/${noteHandleG.uuid}`,
			  tags: `${noteHandleG.tags}`,

			  startAtz: `${formatTimestamp(task.startAt)}`,
			  hideUntilz: `${formatTimestamp(task.hideUntil)}`,
			  endAtz: `${formatTimestamp(task.endAt)}`,

			  repeatz: `${formatTaskRepeat(task.repeat)}`,

			  startAt: task.startAt ?? null,
			  hideUntil: task.hideUntil ?? null,

			  completedAt: task.completedAt ?? null, // Use null if undefined
			  dismissedAt: task.dismissedAt ?? null,
			  endAt: task.endAt ?? null,
			  repeat: task.repeat ?? null,

			  important: task.important ?? null,
			  urgent: task.urgent ?? null,
			  score: task.score ?? null,

			  uuid: task.uuid ?? null,
			  noteUUID: task.noteUUID ?? null,
			});
		}
	  
	}

	// ----------- Section: Preparing the Final Output -----------
	// Convert the Set of note names to an array and join them into a single string.
	console.log("allTasks:", allTasks);
	results = Array.from(allTasks);
	console.log("results:", results);
	const dwFormat = "download_json";

	function downloadResults(results, dwFormat) {
		// Helper function to convert data to CSV
		function toCSV(data) {
			if (data.length === 0) return ""; // Handle empty data case

			// Create the header row
			const headers = Object.keys(data[0]).map(field => `"${field}"`).join(",");

			// Map each object to a CSV row, wrapping each value in double quotes
			const rows = data.map(obj => 
				Object.values(obj)
					.map(value => `"${String(value).replace(/"/g, '""')}"`) // Escape double quotes by doubling them
					.join(",")
			);

			return [headers, ...rows].join("\n"); // Combine headers and rows with newline
		}

		// Helper function to download a file
		function downloadFile(filename, content, contentType) {
			const blob = new Blob([content], { type: contentType });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
			URL.revokeObjectURL(link.href);
		}

		let content = "";
		let filename = "Task Manager Pro - Export";
		let contentType = "text/plain";

		switch (dwFormat) {
			case "download_md":
				content = results
					.map(task => `| ${Object.values(task).join(" | ")} |`)
					.join("\n");
				const headers = `| ${Object.keys(results[0]).join(" | ")} |`;
				const divider = `| ${Object.keys(results[0]).map(() => "---").join(" | ")} |`;
				content = `${headers}\n${divider}\n${content}`;
				filename += ".md";
				contentType = "text/markdown";
				break;

			case "download_csv":
				content = toCSV(results); // Convert results to CSV with proper escaping
				filename += ".csv";
				contentType = "text/csv";
				break;

			case "download_txt":
				content = results
					.map(task => JSON.stringify(task, null, 2))
					.join("\n\n");
				filename += ".txt";
				break;

			case "download_json":
				content = JSON.stringify(results, null, 2); // Pretty JSON
				filename += ".json";
				contentType = "application/json";
				break;

			default:
				console.error("Unknown format selected:", dwFormat);
				return;
		}

		// Trigger the download
		downloadFile(filename, content, contentType);
	}
	
	// Set the format based on user selection
	downloadResults(results, dwFormat);

},
// ************************************************************** //
  }
}