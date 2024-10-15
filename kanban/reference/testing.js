/**
 * Handles task editing and sorting based on the provided arguments.
 * 
 * When the "taskEdit" argument is passed, the function allows editing of a task's content, importance, urgency, 
 * note association, section (header), score, and status. 
 * When the "togglesort" argument is passed, the function allows the user to toggle task sorting settings.
 *
 * @param {Array} args - The arguments that specify the operation (e.g., "taskEdit", "togglesort").
 */
if (args[0] === "taskEdit") {
	// Get the task UUID from arguments
	const taskUuid = args[1];
	console.log(`Editing task with UUID: ${taskUuid}`);

	// Fetch the task details using its UUID
	const task = await app.getTask(taskUuid);
	console.log(task, JSON.stringify(task));

	// Create options for updating task importance and urgency
	const importantValue = task.important
		? [{ label: "True", value: "" }, { label: "False", value: "false" }]
		: [{ label: "True", value: "true" }, { label: "False", value: "" }];
	console.log("importantValue", importantValue);

	const urgentValue = task.urgent
		? [{ label: "True", value: "" }, { label: "False", value: "false" }]
		: [{ label: "True", value: "true" }, { label: "False", value: "" }];
	console.log("urgentValue", urgentValue);

	// Fetch sections (headers) from the note associated with the task
	const sections = await app.getNoteSections({ uuid: task.noteUUID });
	console.log("sections", sections);

	// Transform sections into a label-value format for easier selection in the prompt
	const transformedSections = sections.map((item, index) => {
		const headerValue = item.heading ? item.heading.text : "Main"; // Default to "Main" if no heading
		return { label: headerValue, value: index };
	});
	console.log("transformedSections:", transformedSections);

	// Display a prompt to update task details
	const result = await app.prompt("Update Task Details", {
		inputs: [
			{ label: "Update Task Content:", type: "text", value: `${task.content}` },
			{ label: "Update Important:", type: "select", options: importantValue },
			{ label: "Update Urgent:", type: "select", options: urgentValue },
			{ label: "Move to a Note or Header. Select Note:", type: "note", value: `${task.noteUUID}` },
			{ label: "Select Section or Header:", type: "select", options: transformedSections },
			{ label: "Update Score:", type: "string", value: `${task.score}` },
			{ label: "Mark Task Status:", type: "radio", options: [
				{ label: "Started", value: 3 },
				{ label: "Completed", value: 1 },
				{ label: "Dismissed", value: 2 }
			]}
		]
	});

	if (result) {
		// Destructure the result for easy access to task fields
		let [taskContent, taskImportant, taskUrgent, taskNoteuuid, notesections, taskScore, taskStatus] = result;
		notesections = parseFloat(notesections);
		taskScore = parseFloat(taskScore);
		console.log("result", result);
		console.log(taskContent, taskImportant, taskUrgent, taskNoteuuid, notesections, taskScore, taskStatus);

		const currentTimeUnix = Math.floor(Date.now() / 1000);

		// Prepare an object to hold updated task fields
		const updatedFields = {};

		/**
		 * Move the task to a specific header within the note.
		 * 
		 * @param {string} noteUUID - The UUID of the note containing the task.
		 * @param {string} uuidToMove - The UUID of the task to move.
		 * @param {number} headerNumber - The header number to move the task under.
		 * @returns {string} - The updated markdown content.
		 */
		async function moveTaskToHeader(noteUUID, uuidToMove, headerNumber) {
			const markdown = await app.getNoteContent({ uuid: noteUUID });
			console.log("markdown", markdown);
			const lines = markdown.split('\n');
			const updatedLines = [];
			let taskLine = null;
			const headers = [];

			// Iterate through the lines to find the task and headers
			for (let line of lines) {
				if (line.includes(`"uuid":"${uuidToMove}"`)) {
					taskLine = line; // Save task line for later insertion
				} else {
					updatedLines.push(line); // Keep non-task lines
				}

				// Detect headers in markdown
				const headerMatch = line.match(/^(#+)\s*(.*)/);
				if (headerMatch) {
					headers.push(headerMatch[0]);
				}
				console.log("headers", headers);
			}
			console.log("updatedLines", updatedLines);
			console.log("taskLine", taskLine);

			// Insert task under the correct header
			if (taskLine && headerNumber < headers.length) {
				const insertIndex = headerNumber === 0
					? 0
					: updatedLines.indexOf(headers[headerNumber - 1]) + 1;
				updatedLines.splice(insertIndex, 0, taskLine); // Insert task
			}

			return updatedLines.join('\n'); // Rejoin markdown content
		}

		let updatedMarkdown;

		// Check which fields have changed and update them
		if (taskContent !== task.content) updatedFields.content = taskContent;
		if (taskImportant) updatedFields.important = !task.important;
		if (taskUrgent) updatedFields.urgent = !task.urgent;

		if (taskNoteuuid.uuid !== task.noteUUID) {
			updatedFields.noteUUID = taskNoteuuid.uuid;
		}

		if (notesections >= 0 && taskNoteuuid.uuid == task.noteUUID) {
			updatedMarkdown = moveTaskToHeader(task.noteUUID, task.uuid, notesections);
			console.log("updatedMarkdown", updatedMarkdown);
		}

		if (taskScore !== task.score) updatedFields.score = taskScore;

		// Update task status based on user input
		if (taskStatus === 1) {
			updatedFields.completedAt = currentTimeUnix;
		} else if (taskStatus === 2) {
			updatedFields.dismissedAt = currentTimeUnix;
		} else if (taskStatus === 3) {
			updatedFields.startAt = currentTimeUnix;
		}

		// Update the task if any fields have changed
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
		} else if (taskStatus === 3) {
			console.log("Task marked as started.");
		}
	} else {
		// User canceled the prompt
		return;
	}

} else if (args[0] === "togglesort") {
	// Handle sorting settings
	const sortSetting = await app.settings["Toggle Sort"];
	console.log("sortSetting:", sortSetting);

	// Display prompt to toggle sort settings
	const result = await app.prompt(`Sort Tasks. Current Setting: ${sortSetting}`, {
		inputs: [
			{
				label: `Tasks Toggle Sort: ${sortSetting}`,
				type: "select",
				options: [
					{ label: "startDate", value: "startDate" },
					{ label: "taskScore", value: "taskScore" },
					{ label: "important", value: "important" },
					{ label: "urgent", value: "urgent" }
				]
			}
		]
	});

	if (result) {
		console.log("result", result);
		await app.setSetting("Toggle Sort", result);
	} else {
		return; // User canceled the prompt
	}

} else {
	console.log("Does not seem to be working!", args);
}