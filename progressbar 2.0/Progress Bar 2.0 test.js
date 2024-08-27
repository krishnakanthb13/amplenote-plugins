



//***********************************************************************************

const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];

let results = new Set();

let tags = note.tags;
    

// Filter notes based on Groups + tags
let notesGroupNames = new Set();
let notesGroup = "taskLists";
// Filter notes based on empty notes + tags
let notesG = tagsArray.length > 0 ? (await Promise.all(tagsArray.map(tag => app.filterNotes({
	tag
})))).flat() : await app.filterNotes({
	group: notesGroup
});
//notesG.sort((a, b) => a.name.localeCompare(b.name));
if (nameFilter) {const lowerCaseFilter = nameFilter.toLowerCase(); notesG = notesG.filter(note => note.name && note.name.toLowerCase().includes(lowerCaseFilter) ); }
notesG.sort((a, b) => {
	const nameA = a.name || ""; // Use an empty string if a.name is null or undefined
	const nameB = b.name || ""; // Use an empty string if b.name is null or undefined

	return nameA.localeCompare(nameB);
});
for (const noteHandleG of notesG) {
	const Completed = taskAll.filter(task => task.completedAt);
	const Dismissed = taskAll.filter(task => task.dismissedAt);
	const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);
	const TaskStats = `Pending Tasks: (#${Pending.length}), Completed Tasks: (#${Completed.length}), Dismissed Tasks: (#${Dismissed.length})`;
	const totalTasks = Pending.length + Completed.length + Dismissed.length;
	const TaskProgressz = totalTasks > 0 ? Math.round((1 - (Pending.length / totalTasks)) * 100) : 0;
	// const TaskProgressz = Math.round((1 - ((Pending.length)/(Pending.length + Completed.length + Dismissed.length))) * 100);
	notesGroupNames.add(`| [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid}) | ${noteHandleG.tag} | ${TaskProgressz} | ${TaskStats} |`);
}

results = new Set(notesGroupNames);

results = Array.from(results);

resultText = "| Note Name | Tags | Progress | Task Stats |\n|---|---|---|---|\n" + results.join("\n");

const filename = "Testing Progess Bar 2.0 - All";

let noteUUID = await app.createNote(`${filename}`, ["task-progress"]);		
await app.insertContent({ uuid: noteUUID }, resultText);

console.log({ tagsArray, notesG, results });

//***********************************************************************************


