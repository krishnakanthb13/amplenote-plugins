{
  async noteOption(app) {

    const kanbanTag = (await app.filterNotes({ tag: "-reports/-kanban" })).length > 0;
    console.log("kanbanTag:", kanbanTag);

	function formatTaskRepeat(repeatInfo) {
		// Check if repeatInfo is provided and is a string
		if (!repeatInfo || typeof repeatInfo !== 'string') {
			return "Not Available";
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

		// Parse RRULE
		const rrule = rruleLine.substring(10); // Remove 'RRULE:FREQ='
		const repeatFrequency = rrule.toUpperCase(); // Extract frequency part

		// Format output
		return `${repeatFrequency.charAt(0).toUpperCase() + repeatFrequency.slice(1).toLowerCase()} <b>Starts At:</b> ${formattedDate} at ${formattedTime}`;
	}

	function formatTimestamp(timestamp) {
		if (!timestamp) {
			return 'Not Set!'; // Return 'Not Set' if timestamp is null or undefined
		}

		// Create a new Date object with the Unix timestamp (in milliseconds)
		const date = new Date(timestamp * 1000);

		// Extract date and time components
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		// Format date and time
		const formattedDate = `${month}/${day}/${year}`;
		const formattedTime = `${hours}:${minutes}:${seconds}`;

		return `${formattedDate} at ${formattedTime}`;
	}
    
    if (kanbanTag) {
      let allTasks = [];
      const noteHandles = await app.filterNotes({ tag: "-reports/-kanban" });
      console.log("noteHandles:", noteHandles);
      
      for (let note of noteHandles) {
        const noteUUID = note.uuid;
        const noteTags = note.tags.join(", ");
        console.log("noteUUID:", noteUUID);
        console.log("noteTags:", noteTags);
        
        const tasks = await app.getNoteTasks({ uuid: noteUUID }, { includeDone: true });
        console.log("tasks:", tasks);
        
		tasks.forEach(task => allTasks.push({ ...task, notename: note.name, noteurl: `https://www.amplenote.com/notes/${note.uuid}`, tags: noteTags, startAtz: `${formatTimestamp(task.startAt)}`, hideUntilz: `${formatTimestamp(task.hideUntil)}`, endAtz: `${formatTimestamp(task.endAt)}`, repeatz: `${formatTaskRepeat(task.repeat)}`, taskInfo: `<b>Important:</b> ${task.important}<br><b>Urgent:</b> ${task.urgent}<br><b>Score:</b> ${task.score.toFixed(2)}<br><hr><b>Start At:</b> ${formatTimestamp(task.startAt)}<br><b>Hide Until:</b> ${formatTimestamp(task.hideUntil)}<br><b>End At:</b> ${formatTimestamp(task.endAt)}<br><b>Repeat:</b> ${formatTaskRepeat(task.repeat)}<br><hr><b>Note Link:</b> <a href="https://www.amplenote.com/notes/${note.uuid}" target="_blank">${note.name}</a><br><b>Tags:</b> ${noteTags}` }));

      }
      console.log("allTasks:", allTasks);
		let taskSorting = '';
		taskSorting = taskSorting || 'startDate';
		if (taskSorting === 'startDate') {
			allTasks.sort((a, b) => new Date(b.startAtz) - new Date(a.startAtz));
		}
		if (taskSorting === 'taskScore') {
			allTasks.sort((a, b) => b.score - a.score);
		}
		if (taskSorting === 'important') {
			allTasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
		}
		if (taskSorting === 'urgent') {
			allTasks.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
		}
      const allTasksText = JSON.stringify(allTasks, null, 2);
      console.log("allTasksText:", allTasksText);
     
    } else {
      const headersBig = ["To Do", "In Progress", "Review", "Blocked", "Completed", "Backlog", "On Hold", "Ready for Testing", "Deployed", "Archived"];
      const headersSmall = ["To Do", "In Progress", "Review", "Completed", "Backlog", "On Hold"];
      console.log("headersBig:", headersBig);
      console.log("headersSmall:", headersSmall);
      
      for (const header of headersSmall) {
        const uuid = await app.createNote(header, ["-reports/-kanban"]);
        console.log("uuid:", uuid);
        app.alert("Success! Looks like it’s your first time running the program, so we created a few notes with a specific tag to get you rolling. Now you can run the Kanban Plugin again and see at your brand-new board!");
      }
    }

    /* const changez = true;
    if (changez) {
      await app.updateTask("4a784a37-2b1e-41f2-98cb-b290c41eaeca", {noteUUID: "0a0496aa-775c-11ef-bfb2-f222b153c6e3"});
      console.log("Success"); 
    } */

    
  }
}