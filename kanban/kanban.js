{
insertText: {
/* ----------------------------------- */
"Tagged!": async function (app) {

    await app.context.replaceSelection(`<object data="plugin://${app.context.pluginUUID}" data-aspect-ratio="2" />`);
    return null;

}
/* ----------------------------------- */
},
/* ----------------------------------- */
async onEmbedCall(app, ...args) {
      if (args[0] === "taskEdit") {

		const taskUuid = args[1];
		console.log(`Editing task with UUID: ${taskUuid}`);
		const task = await app.getTask(taskUuid);
		console.log(task, JSON.stringify(task));

		const importantValue = task.important
		  ? [{ label: "True", value: "" }, { label: "False", value: "false" }]
		  : [{ label: "True", value: "true" }, { label: "False", value: "" }];
		console.log("importantValue", importantValue);

		const urgentValue = task.urgent
		  ? [{ label: "True", value: "" }, { label: "False", value: "false" }]
		  : [{ label: "True", value: "true" }, { label: "False", value: "" }];
		console.log("urgentValue", urgentValue);
		const sections = await app.getNoteSections({ uuid: task.noteUUID });
		console.log("sections", sections);

		// Transform the sections array to the desired format
		const transformedSections = sections.map((item, index) => {
			const headerValue = item.heading ? item.heading.text : "Main"; // Use "Null" for null headings
			return { label: headerValue, value: index }; // Create new object with Headers and Value
		});
		console.log("transformedSections:", transformedSections);

		const result = await app.prompt("Update Task Details", {
		  inputs: [
			{
			  label: "Update Task Content:",
			  type: "text",
			  value: `${task.content}`,
			},
			{
			  label: "Update Important:",
			  type: "select",
			  options: importantValue,
			},
			{
			  label: "Update Urgent:",
			  type: "select",
			  options: urgentValue,
			},
			{
			  label: "Move it to a Paricular note OR To a Header in the Existing note. Select Note:",
			  type: "note",
			  value: `${task.noteUUID}`,
			},
			{
			  label: "Select Section or Header:",
			  type: "select",
			  options: transformedSections,
			},
			{
			  label: "Update Score:",
			  type: "string",
			  value: `${task.score}`,
			},
			{
			  label: "Mark this Task as Completed / Dismissed",
			  type: "radio",
			  options: [
				{ label: "Completed", value: 1 },
				{ label: "Dismissed", value: 2 },
			  ],
			},
		  ],
		});

		if (result) {
		  let [taskContent, taskImportant, taskUrgent, taskNoteuuid, notesections, taskScore, taskStatus] = result;
		  notesections = parseFloat(notesections);
		  taskScore = parseFloat(taskScore);
		  console.log("result", result);
		  console.log(taskContent, taskImportant, taskUrgent, taskNoteuuid, notesections, taskScore, taskStatus);

		  const currentTimeUnix = Math.floor(Date.now() / 1000);

		  // Prepare an object to store updated fields
		  const updatedFields = {};

		  // Move the task to Header Section of the existing note.
		  async function moveTaskToHeader(noteUUID, uuidToMove, headerNumber) {
		  	const markdown = await app.getNoteContent({ uuid: noteUUID });
			console.log("markdown",markdown);
		  	const lines = markdown.split('\n'); // Split the markdown into lines
		  	const updatedLines = [];
		  	let taskLine = null;
		     
		  	// Iterate through the lines to find the task with the specified UUID and collect headers
		  	const headers = [];
		  	
		  	for (let line of lines) {
		  		// Check for the task line containing the specific UUID
		  		if (line.includes(`"uuid":"${uuidToMove}"`)) {
		  			taskLine = line; // Save the line to move later
		  		} else {
		  			updatedLines.push(line); // Add non-matching lines to the updated lines
		  		}
		     
		  		// Check if the line is a header
		  		const headerMatch = line.match(/^(#+)\s*(.*)/); // Matches markdown headers
		  		if (headerMatch) {
		  			headers.push(headerMatch[0]); // Save the header line
		  		}
				console.log("headers",headers);
		  	}
			console.log("updatedLines",updatedLines);
			console.log("taskLine",taskLine);
			console.log("headers",headers);
			console.log("headerNumber",headerNumber);
		     
		  	// If the task line was found and the headerNumber is valid
		  	if (taskLine && headerNumber < headers.length) {
		  		// Insert the task line just below the specified header
				const insertIndex = headerNumber === 0
					? 0 // Insert at the start of the content
					: updatedLines.indexOf(headers[headerNumber-1]) + 1; // Find the header's position and insert after it
		  		updatedLines.splice(insertIndex, 0, taskLine); // Insert task line after the header
		  	}
		     
		  	// Join the updated lines back into a single markdown string
		  	return updatedLines.join('\n');
		  }
		  let updatedMarkdown;

		  // Check if each field has changed, and only update changed fields
		  if (taskContent !== task.content) updatedFields.content = taskContent;
		  if (taskImportant) { 
			updatedFields.important = !task.important; 
		  }		  
		  if (taskUrgent) { 
			updatedFields.urgent = !task.urgent; 
		  }
		  console.log("taskNoteuuid.uuid",taskNoteuuid.uuid);
		  console.log("task.noteUUID",task.noteUUID);
		  console.log("notesections",notesections);
		  if (taskNoteuuid.uuid !== task.noteUUID) { 
			updatedFields.noteUUID = taskNoteuuid.uuid; 
		  }
		  if (notesections >= 0 && (taskNoteuuid.uuid == task.noteUUID)) { 
			updatedMarkdown = moveTaskToHeader(task.noteUUID, task.uuid, notesections); 
			console.log("updatedMarkdown",updatedMarkdown);
		  }
		  if (taskScore !== task.score) updatedFields.score = taskScore;

		  if (taskStatus === 1) {
			updatedFields.completedAt = currentTimeUnix;
		  } else if (taskStatus === 2) {
			updatedFields.dismissedAt = currentTimeUnix;
		  }

		  // Update task only if there are changes
		  if (Object.keys(updatedFields).length > 0) {
			await app.updateTask(taskUuid, updatedFields);
			console.log("Task Updated with changes:", updatedFields);
		  } else {
			console.log("No changes detected, task not updated.");
		  }

		  if (taskStatus === 1) {
			console.log("Task marked as completed.");
		  } else if (taskStatus === 2) {
			console.log("Task marked as dismissed.");
		  }
		} else {
		  // User canceled
		  return;
		}

      } else if (args[0] === "togglesort") {
		const sortSetting = await app.settings["Toggle Sort"];
		console.log("sortSetting:",sortSetting);
		const result = await app.prompt(`Sort Tasks. Current Setting: ${sortSetting}`, {
			inputs: [
			  {
				label: `Tasks Toggle Sort: ${sortSetting}`,
				type: "select",
				options: [ { label: "startDate", value: "startDate" }, { label: "taskScore", value: "taskScore" } , { label: "important", value: "important" }, { label: "urgent", value: "urgent" } ]
			  }
			]	
		});
	 
		if (result) {
		  console.log("result",result);
		  await app.setSetting("Toggle Sort", result);
		} else {
		  // User canceled
		  return;
		}		  
	  } else {
		  console.log("Does not seem to be working!",args);
	  }
    },
/* ----------------------------------- */
async renderEmbed(app, ...args) {
	// let _args = JSON.stringify(args[0]);
	// console.log(_args);

    let htmlTemplate = "";
    let allTasksText;
	let taskSorting;

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
        
		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
			allTasks.push({
				...task,
				notename: note.name,
				noteurl: `https://www.amplenote.com/notes/${note.uuid}`,
				tags: noteTags,
				startAtz: `${formatTimestamp(task.startAt)}`,
				hideUntilz: `${formatTimestamp(task.hideUntil)}`,
				endAtz: `${formatTimestamp(task.endAt)}`,
				repeatz: `${formatTaskRepeat(task.repeat)}`,
				taskInfo: `<b>Important:</b> ${task.important}<br><b>Urgent:</b> ${task.urgent}<br><b>Score:</b> ${task.score.toFixed(2)}<br><hr><b>Start At:</b> ${formatTimestamp(task.startAt)}<br><b>Hide Until:</b> ${formatTimestamp(task.hideUntil)}<br><b>End At:</b> ${formatTimestamp(task.endAt)}<br><b>Repeat:</b> ${formatTaskRepeat(task.repeat)}<br><hr><b>Completed At:</b> ${formatTimestamp(task.completedAt)}<br><b>Dismissed At:</b> ${formatTimestamp(task.dismissedAt)}<br><hr><b>Note Link:</b> <a href="https://www.amplenote.com/notes/${note.uuid}" target="_blank">${note.name}</a><br><b>Tags:</b> ${noteTags}`
			});
		}

      }
      console.log("allTasks:", allTasks);
		taskSorting = app.settings["Toggle Sort"];
		taskSorting = taskSorting || 'taskScore';
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
      allTasksText = JSON.stringify(allTasks, null, 2);
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

    // const changez = true;
    // if (changez) {
      // await app.updateTask("4a784a37-2b1e-41f2-98cb-b290c41eaeca", {noteUUID: "0a0496aa-775c-11ef-bfb2-f222b153c6e3"});
      // console.log("Success"); 
    // } 


htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanban Board</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
        }
        #kanban-board {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 20px;
        }
        .column {
            flex: 0 0 auto;
            min-width: 300px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: transparent;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 10px;
        }
        .task-category {
            margin-bottom: 10px;
            cursor: pointer;
        }
        .task-category h3 {
            margin: 0;
            padding: 10px;
            background: transparent;
            border-radius: 10px;
        }
        .task {
            padding: 5px;
            border-radius: 5px;
            margin-bottom: 5px;
            color: black;
            font-size: 14px;
            position: relative;
            transition: background-color 0.3s;
			max-width: 300px;
        }
        .task-button {
            background-color: transparent;
			border-radius: 5px;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
			position: absolute;
			right: 5px;
        }
        .task-button:hover {
			background-color: black;
            color: #ddd;
        }
        .task-button2 {
            background-color: transparent;
			border-radius: 5px;
            border: none;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
			position: absolute;
			right: 20px;
        }
        .task-button2:hover {
			background-color: black;			
            color: #ddd;
        }
		.high-urgent.high-important {
			background: linear-gradient(to right, #ff6666, #ff9999); /* Light red to lighter red */
		}

		.high-urgent.low-important {
			background: linear-gradient(to right, #ffb84d, #ffd699); /* Light orange to lighter orange */
		}

		.low-urgent.high-important {
			background: linear-gradient(to right, #66b3ff, #c2e0ff); /* Light blue to lighter blue */
		}

		.low-urgent.low-important {
			background: linear-gradient(to right, #b3b3b3, #e6e6e6); /* Light gray to lighter gray */
		}
        .task-info {
            display: none;
            position: relative;
            top: 100%;
            left: 30;
            background-color: #fff;
            color: #000;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }
    </style>
</head>
<body>
    <button id="cycleButton">Toggle Sort: <div id="valueDisplay">${taskSorting}</div></button>
    <br><br>
    <div id="kanban-board"></div>

    <script>
        
  const tasks = ${allTasksText};
  console.log("tasks:", tasks);

try {
    // Function to determine the CSS class based on task urgency and importance
    function getColor(task) {
        if (task.urgent && task.important) return 'high-urgent high-important';
        if (task.urgent) return 'high-urgent low-important';
        if (task.important) return 'low-urgent high-important';
        return 'low-urgent low-important';
    }

    const values = ['Start Date', 'Score', 'Important', 'Urgent'];
    let currentIndex = 0;
    const valueDisplay = document.getElementById('valueDisplay');
    const cycleButton = document.getElementById('cycleButton');

    function updateValue() {
		valueDisplay.textContent = values[currentIndex];
        currentIndex = (currentIndex + 1) % values.length;
        renderKanbanBoard();
		window.callAmplenotePlugin("togglesort")
    }

    cycleButton.addEventListener('click', updateValue);

    function showTaskInfo(task, element) {
        let infoDiv = element.querySelector('.task-info');
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'task-info' + (document.body.classList.contains('dark-mode') ? ' dark-mode' : '');
            infoDiv.innerHTML = task.taskInfo;
            infoDiv.innerHTML = task.taskInfo;
            element.appendChild(infoDiv);
        }
        infoDiv.style.display = 'block';
    }

    function hideTaskInfo(element) {
        const infoDiv = element.querySelector('.task-info');
        if (infoDiv) {
            infoDiv.style.display = 'none';
        }
    }

    // Helper to create buttons for task items
    function createButton(text, className, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.onclick = clickHandler;
        return button;
    }

    // Function to create and append task items
    function createTaskItem(task, container, isPending = true) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task ' + getColor(task);
        taskItem.textContent = task.content;

        taskItem.appendChild(createButton('ℹ', 'task-button', () => showTaskInfo(task, taskItem)));
        if (isPending) {
            taskItem.appendChild(createButton('⚙', 'task-button2', () => window.callAmplenotePlugin("taskEdit", task.uuid)));
        }
        taskItem.onmouseleave = () => hideTaskInfo(taskItem);

        container.appendChild(taskItem);
    }

    // Helper to sort tasks based on the current value display
    function sortTasks(tasks, sortBy) {
        switch (sortBy) {
            case 'Start Date':
                return tasks.sort((a, b) => new Date(b.startAtz) - new Date(a.startAtz));
            case 'Score':
                return tasks.sort((a, b) => b.score - a.score);
            case 'Important':
                return tasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
            case 'Urgent':
                return tasks.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
            default:
                return tasks;
        }
    }

    // Function to render the Kanban board
    function renderKanbanBoard() {
        const board = document.getElementById('kanban-board');
        const columns = {};

        tasks.forEach(task => {
            const note = task.notename;
            if (!columns[note]) {
                columns[note] = { pending: [], completed: [], dismissed: [] };
            }
            if (task.completedAt) {
                columns[note].completed.push(task);
            } else if (task.dismissedAt) {
                columns[note].dismissed.push(task);
            } else {
                columns[note].pending.push(task);
            }
        });

        board.innerHTML = '';  // Clear board before rendering

        Object.keys(columns).forEach(note => {
            const column = document.createElement('div');
            column.className = 'column';

            const header = document.createElement('h3');
            header.textContent = note;
            header.className = 'task-category';
            column.appendChild(header);

            const pendingList = document.createElement('div');
            pendingList.appendChild(document.createTextNode('Pending:'));
            sortTasks(columns[note].pending, valueDisplay.textContent).forEach(task => createTaskItem(task, pendingList));

            const completedList = document.createElement('div');
            completedList.appendChild(document.createTextNode('Completed:'));
            columns[note].completed.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                .forEach(task => createTaskItem(task, completedList, false));

            const dismissedList = document.createElement('div');
            dismissedList.appendChild(document.createTextNode('Dismissed:'));
            columns[note].dismissed.sort((a, b) => new Date(b.dismissedAt) - new Date(a.dismissedAt))
                .forEach(task => createTaskItem(task, dismissedList, false));

            column.appendChild(pendingList);
            column.appendChild(completedList);
            column.appendChild(dismissedList);

            board.appendChild(column);
        });
    }

    renderKanbanBoard();

} catch (error) {
    console.error("Error processing scripts:", error);
}

    </script>
</body>
</html>
`;
 
      return(htmlTemplate);
	  console.log(htmlTemplate);
     
},
}