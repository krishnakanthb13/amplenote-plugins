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

},
// ************************************************************** //
	"R-Active!": async function(app, noteUUID) {

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

	// Readme Notes
	const readmeNotes = `
### Readme! - <mark>Task Manager - Active Tasks!</mark>
- Below are list of Notes with respective Details, having at least one Pending or Un-completed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: R-Active!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
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
	"R-Finished!": async function(app, noteUUID) {

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

	// Readme Notes
	const readmeNotes = `
### Readme! - <mark>Task Manager - Finished Tasks!</mark>
- Below are list of Notes with respective Details, having no Pending or Un-completed Task, but has at least one Completed or Dismissed Task in the Note.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: R-Finished!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`❗ (Pending Tasks), ✔️ (Completed Tasks), ✖️ (Dismissed Tasks), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
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
	"Trend!": async function(app, noteUUID) {

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
	console.log("notesGroupNamesA:", notesGroupNamesA);
	console.log("notesGroupNames:", notesGroupNames);
	console.log("results:", results);

	// Readme Notes
	const readmeNotes = `
### Readme! - <mark>Task Manager - Tasks Trend!</mark>
- Below are list of Task Metrics based on Date, having at least one Completed or Dismissed Task in the Note. Sorted and Pivoted by Date + Status.
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: Trend!\` once in a week/month and organize your Task respectively.
- <mark>Visualization:</mark> Using my [Graph Utility Plugin](https://www.amplenote.com/plugins/sDBcbBrdEhAuerZ5HzLyaTn5) - **Viewer!** Option, You can Visualize the Trend over the period of time, for task count and task score gained on a particular day.
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
	"E.M.!": async function(app, noteUUID) {

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

	// Readme Notes
	const readmeNotes = `
### Readme! - <mark>Task Manager - Eisenhower Matrix!</mark>
- Below are list of Notes with respective Details, having at least one Pending or Un-completed Task in the Note, w/ tasks Important OR Urgent Options are selected.
- By clicking on the Note Link, the Pop-down window opens up displaying the Note content.
	- (You can add the \`Task Manager: Note\` into those pages too to get a detailed \`Categorized Task: List View!\`)
- You can add your Comments to this page for your reference!
- <mark>Tip:</mark> You can generate, \`Task Manager Pro: E.M.!\` once in a week/month and organize your Task respectively.
- <mark>Legends:</mark> \`🔥 (Important and urgent), ⚡ (Important but not urgent), ⚾ (Not important but urgent), 🗑️ (Not important and not urgent), 🔢 (Total Task Score), ✒️ (Add your Comments).\`
	- Learn more on [Eisenhower Method](https://public.amplenote.com/Eu8Azcoih6NaU2r4pebHHaP3).
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
  }
}