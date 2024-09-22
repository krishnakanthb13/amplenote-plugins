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
	let _args = JSON.stringify(args[0]);
	console.log(_args);

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
        
        tasks.forEach(task => {
          allTasks.push({ ...task, notename: note.name, noteurl: `https://www.amplenote.com/notes/${note.uuid}`, tags: noteTags , startAtz: `${formatTimestamp(task.startAt)}` , hideUntilz: `${formatTimestamp(task.hideUntil)}` , endAtz: `${formatTimestamp(task.endAt)}` , repeatz: `${formatTaskRepeat(task.repeat)}` , taskInfo: `<b>Important:</b> ${task.important}<br><b>Urgent:</b> ${task.urgent}<br><b>Score:</b> ${task.score.toFixed(2)}<br><hr><b>Start At:</b> ${task.startAtz}<br><b>Hide Until:</b> ${task.hideUntilz}<br><b>End At:</b> ${task.endAtz}<br><b>Repeat:</b> ${task.repeatz}<br><hr><b>Note Link:</b> <a href="${task.noteurl}" target="_blank">${task.notename}</a><br><b>Tags:</b> ${task.tags}` });
        });
      }
      console.log("allTasks:", allTasks);
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
            background-color: #f4f4f4;
            transition: background-color 0.3s, color 0.3s;
        }
        body.dark-mode {
            background-color: #222;
            color: #f4f4f4;
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
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 10px;
        }
        .column.dark-mode {
            background-color: #444;
            border-color: #555;
        }
        .task-category {
            margin-bottom: 10px;
            cursor: pointer;
        }
        .task-category h3 {
            margin: 0;
            padding: 10px;
            background-color: #e0e0e0;
            border-radius: 10px;
        }
        .task-category h3.dark-mode {
            background-color: #555;
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
        .dark-mode .task {
            color: #fff;
        }
        .dark-mode .task-details {
            background-color: #555;
            color: #fff;
        }
        #dark-mode-toggle:hover {
            background-color: #444;
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
        .task-info.dark-mode {
            background-color: #333;
            color: #fff;
            border-color: #444;
        }
    </style>
</head>
<body>
    <button id="dark-mode-toggle">Toggle Dark Mode</button>
    <button id="cycleButton">Toggle Sort: <div id="valueDisplay">None</div></button>
    <br><br>
    <div id="kanban-board"></div>

    <script>
        let tasks = [];
        tasks = ${allTasksText};

console.log("tasks:", tasks);

try {
    // Your existing code goes inside this try block

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
        valueDisplay.textContent = values[currentIndex]; // Update display with current value
        currentIndex = (currentIndex + 1) % values.length; // Cycle through indices
        renderKanbanBoard();
    }

    cycleButton.addEventListener('click', updateValue);

    function showTaskInfo(task, element) {
        let infoDiv = element.querySelector('.task-info');
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'task-info';
            if (document.body.classList.contains('dark-mode')) {
                infoDiv.classList.add('dark-mode');
            }
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

        board.innerHTML = '';

        Object.keys(columns).forEach(note => {
            const column = document.createElement('div');
            column.className = 'column';

            const header = document.createElement('h3');
            header.textContent = note;
            header.className = 'task-category';
            column.appendChild(header);

            const pendingList = document.createElement('div');
            pendingList.innerHTML = '<strong>Pending:</strong>';

            // Sorting logic based on current valueDisplay text content
            const sortBy = valueDisplay.textContent;
            if (sortBy === 'Start Date') {
                columns[note].pending.sort((a, b) => new Date(b.startAtz) - new Date(a.startAtz));
            } else if (sortBy === 'Score') {
                columns[note].pending.sort((b, a) => a.score - b.score);
            } else if (sortBy === 'Important') {
                columns[note].pending.sort((b, a) => (a.important ? 1 : 0) - (b.important ? 1 : 0));
            } else if (sortBy === 'Urgent') {
                columns[note].pending.sort((b, a) => (a.urgent ? 1 : 0) - (b.urgent ? 1 : 0));
            }

            columns[note].pending.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task ' + getColor(task);
                taskItem.textContent = task.content;

                const infoButton = document.createElement('button');
                infoButton.textContent = 'ℹ';
                infoButton.className = 'task-button';
                infoButton.onclick = () => showTaskInfo(task, taskItem);
                taskItem.appendChild(infoButton);
                taskItem.onmouseleave = () => hideTaskInfo(taskItem);

                const infoButton2 = document.createElement('button');
                infoButton2.textContent = '⚙';
                infoButton2.className = 'task-button2';
                infoButton2.addEventListener('click', () => window.callAmplenotePlugin("taskEdit", task.uuid));
                taskItem.appendChild(infoButton2);

                pendingList.appendChild(taskItem);
            });
            column.appendChild(pendingList);

            const completedList = document.createElement('div');
            completedList.innerHTML = '<strong>Completed:</strong>';
            columns[note].completed.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
            columns[note].completed.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task ' + getColor(task);
                taskItem.textContent = task.content;

                const infoButton = document.createElement('button');
                infoButton.textContent = 'ℹ';
                infoButton.className = 'task-button';
                infoButton.onclick = () => showTaskInfo(task, taskItem);
                taskItem.appendChild(infoButton);
                taskItem.onmouseleave = () => hideTaskInfo(taskItem);

                completedList.appendChild(taskItem);
            });
            column.appendChild(completedList);

            const dismissedList = document.createElement('div');
            dismissedList.innerHTML = '<strong>Dismissed:</strong>';
            columns[note].dismissed.sort((a, b) => new Date(b.dismissedAt) - new Date(a.dismissedAt));
            columns[note].dismissed.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task ' + getColor(task);
                taskItem.textContent = task.content;

                const infoButton = document.createElement('button');
                infoButton.textContent = 'ℹ';
                infoButton.className = 'task-button';
                infoButton.onclick = () => showTaskInfo(task, taskItem);
                taskItem.appendChild(infoButton);
                taskItem.onmouseleave = () => hideTaskInfo(taskItem);

                dismissedList.appendChild(taskItem);
            });
            column.appendChild(dismissedList);

            board.appendChild(column);
        });
    }

    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.column').forEach(column => {
            column.classList.toggle('dark-mode');
        });
        document.querySelectorAll('.task-category h3').forEach(header => {
            header.classList.toggle('dark-mode');
        });
    });

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
}
}