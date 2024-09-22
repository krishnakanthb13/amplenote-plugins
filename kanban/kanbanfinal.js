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
      if (args.length === 1) {
		  const taskUuid = args[0];
		  console.log(`Editing task with UUID: ${taskUuid}`);
        // return await this["End Cycle Early"]();
		
/* 		// Editing Task!
		const changez = true;
		if (changez) {
		  await app.updateTask("4a784a37-2b1e-41f2-98cb-b290c41eaeca", {noteUUID: "0a0496aa-775c-11ef-bfb2-f222b153c6e3"});
		  // console.log("Success");
		} */ 

      } else {
		  console.log("Does not seem to be working!");
	  }
    },
/* ----------------------------------- */
async renderEmbed(app, ...args) {
	// let _args = JSON.stringify(args[0]);
	// console.log(_args);

    let htmlTemplate = "";
    let allTasksText = "";

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
				taskInfo: `<b>Important:</b> ${task.important}<br><b>Urgent:</b> ${task.urgent}<br><b>Score:</b> ${task.score.toFixed(2)}<br><hr><b>Start At:</b> ${formatTimestamp(task.startAt)}<br><b>Hide Until:</b> ${formatTimestamp(task.hideUntil)}<br><b>End At:</b> ${formatTimestamp(task.endAt)}<br><b>Repeat:</b> ${formatTaskRepeat(task.repeat)}<br><hr><b>Note Link:</b> <a href="https://www.amplenote.com/notes/${note.uuid}" target="_blank">${note.name}</a><br><b>Tags:</b> ${noteTags}`
			});
		}

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
            background: transparent;
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
    <div id="kanban-board"></div>

    <script>
        let tasks = [];
        tasks = 
${allTasksText}
;

console.log("tasks:", tasks);

try {

    // Function to determine the CSS class based on task urgency and importance
	function getColor(task) {
		return task.urgent ? (task.important ? 'high-urgent high-important' : 'high-urgent low-important') : (task.important ? 'low-urgent high-important' : 'low-urgent low-important');
	}

	function showTaskInfo(task, element) {
		let infoDiv = element.querySelector('.task-info');
		if (!infoDiv) {
			infoDiv = document.createElement('div');
			infoDiv.className = 'task-info';
			infoDiv.innerHTML = task.taskInfo;
			element.appendChild(infoDiv);
		}
		infoDiv.style.display = 'block';
	}

	function hideTaskInfo(element) {
		const infoDiv = element.querySelector('.task-info');
		if (infoDiv) infoDiv.style.display = 'none';
	}

	function createTaskItem(task, actionHandlers = {}) {
		const taskItem = document.createElement('div');
		taskItem.className = 'task ' + getColor(task);
		taskItem.textContent = task.content;

		const infoButton = document.createElement('button');
		infoButton.textContent = 'ℹ';
		infoButton.className = 'task-button';
		infoButton.onclick = () => showTaskInfo(task, taskItem);
		taskItem.appendChild(infoButton);
		taskItem.onmouseleave = () => hideTaskInfo(taskItem);

		if (actionHandlers.infoButton2) {
			const infoButton2 = document.createElement('button');
			infoButton2.textContent = '⚙';
			infoButton2.className = 'task-button2';
			infoButton2.onclick = actionHandlers.infoButton2;
			taskItem.appendChild(infoButton2);
		}

		return taskItem;
	}

	function renderKanbanBoard() {
		const board = document.getElementById('kanban-board');
		const columns = {};

		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i];
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
		}

		board.innerHTML = '';

		for (const note in columns) {
			if (columns.hasOwnProperty(note)) {
				const column = document.createElement('div');
				column.className = 'column';

				const header = document.createElement('h3');
				header.textContent = note;
				header.className = 'task-category';
				column.appendChild(header);

				const taskLists = {
					pending: 'Pending',
					completed: 'Completed',
					dismissed: 'Dismissed'
				};

				for (const key in taskLists) {
					if (taskLists.hasOwnProperty(key)) {
						const listDiv = document.createElement('div');
						listDiv.innerHTML = '<strong>' + taskLists[key] + ':</strong>';

						for (let j = 0; j < columns[note][key].length; j++) {
							const task = columns[note][key][j];
							const taskItem = createTaskItem(task, {
								// infoButton2: () => window.callAmplenotePlugin("taskEdit", task.uuid)
							});
							listDiv.appendChild(taskItem);
						}

						column.appendChild(listDiv);
					}
				}

				board.appendChild(column);
			}
		}
	}

    renderKanbanBoard();

} catch (error) {
    console.error("Error processing scripts:", error);
}
    </script>
</body>
</html>
`;
 
      return (htmlTemplate);
	  console.log(htmlTemplate);
},
}