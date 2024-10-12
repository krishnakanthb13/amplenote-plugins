{
	// ----------------------------------------------------------------------
	async noteOption(app) {
		// Create, Save, and Retrieve the Note for Viewing the Monthly Note Calendar Option

		// Define the name of the new note and the tags associated with it
		const newNoteName = `Time/Goals: Progress Bar`;
		const newTagName = ['-reports/-time-goal-progress'];

		// Handle the insert or retrieve note UUID.
		const existingUUID = await app.settings["Time Goal Progress Bar UUID [Do not Edit!]"];
		// console.log ("existingUUID found",existingUUID);

		const noteUUIDz = existingUUID || await (async () => {
			// Create a new note and save the UUID in the settings if no existing UUID is found
			const newUUIDx = await app.createNote(newNoteName, newTagName);
			await app.setSetting("Time Goal Progress Bar UUID [Do not Edit!]", newUUIDx);
			return newUUIDx; // Return the newly created UUID
			// console.log ("new newUUIDx",newUUIDx);
		})();

		// `app.context.pluginUUID` is always supplied - it is the UUID of the plugin note.
		// Insert the plugin note content with a unique UUID into the note
		await app.replaceNoteContent(
			{ uuid: noteUUIDz }, 
			`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="1" />`
		);
		// console.log ("content replaced in the destination note");

		// Retrieve the Peek View setting from settings, defaulting to "Yes" if not set
		const peekviewEnable = await app.settings["Peek Viewer [Yes / No]"] || "Yes";
		// console.log ("peekviewEnable",peekviewEnable);

		// Open the note in the sidebar if Peek View is enabled, otherwise navigate to the note's URL
		await (peekviewEnable.toLowerCase() === "yes"
			? app.openSidebarEmbed(1, 'sidebar', noteUUIDz) // Peek View is enabled
			// console.log ("Note opened in Side Bar");
			: app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`)); // Peek View is disabled
			// console.log ("Navigated to the note");

		// Return null at the end of the function as the result
		return null;
	},
	// ----------------------------------------------------------------------
	renderEmbed(app, ...args) {

		// Define the HTML structure and styles for the Time Progress and Goals Progress bars
		const htmlTimeProgress = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Time Progress & Goals</title>
			<style>
				/* General body styling */
				body {
					font-family: Arial, sans-serif;
					display: flex;
					justify-content: flex-start; /* Start content from the top */
					align-items: center;
					min-height: 100vh; /* Allow scrolling by using min-height */
					background-color: #BEBEBE;
					margin: 0;
					flex-direction: column;
					overflow-y: auto; /* Enable vertical scrolling */
					padding: 30px; /* Add padding to prevent sticking to edges */
				}

				/* Container for each progress section */
				.container {
					text-align: center;
					margin-bottom: 5px;
					width: 100%;
					max-width: 600px; /* Prevent content from stretching too wide */
				}

				h1 {
					color: #333;
					margin-bottom: 5px;
					font-size: 22px;
				}

				h2 {
					color: #333;
					margin-bottom: 5px;
					font-size: 18px;
				}

				/* Progress bar container styling */
				.progress-container {
					width: 100%;
					max-width: 600px;
					background-color: #e0e0e0;
					border-radius: 20px;
					box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
					overflow: hidden;
					position: relative;
					margin-bottom: 5px;
				}

				/* Actual progress bar style */
				.progress-bar {
					height: 30px;
					background: linear-gradient(to bottom, #a3c0f9, #6a85d6);
					width: 0%;
					transition: width 0.5s ease; /* Smooth progress animation */
					position: relative; /* Ensure the progress bar is positioned relative to its container */
				}

				/* Style for the text inside the progress bar */
				.progress-text {
					position: absolute;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
					font-weight: bold;
					font-size: 14px;
					z-index: 1; /* Ensure the text is above the bar */
				}

				.goal {
					margin-bottom: 5px;
					font-size: 14px;
				}
			</style>
		</head>
		<body>

		<div class="container">
			<h1>Today's Time Progress</h1>
			<div class="progress-container">
				<div class="progress-bar" id="progress-bar">
					<div class="progress-text" id="progress-text">0%</div>
				</div>
			</div>
		</div>

		<div class="container">
			<h1>Goal Days Progress</h1>
			<div id="goal-list">0%</div> <!-- Container to hold multiple goals -->
		</div>

		<script>
			// Time progress (for today)
			const customDayTime = {
				start: "06:00",  // Define the start time (e.g., 06:00 for 6 AM)
				end: "21:00"     // Define the end time (e.g., 21:00 for 9 PM)
			};

			// Function to update today's time progress bar
			function updateProgressBar() {
				const now = new Date();

			const [startHour, startMinute] = customDayTime.start ? customDayTime.start.split(":").map(Number) : [0, 0];
			const [endHour, endMinute] = customDayTime.end ? customDayTime.end.split(":").map(Number) : [23, 59];

				const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, 0);
				const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, 59);

				const totalDayTime = endOfDay - startOfDay;
				const currentTime = now - startOfDay;
				const progressPercent = (currentTime / totalDayTime) * 100;

				const progressBar = document.getElementById('progress-bar');
				const progressText = document.getElementById('progress-text');

				// Update progress bar and text based on current time progress
				if (progressPercent >= 0 && progressPercent <= 100) {
					progressBar.style.width = progressPercent + '%';
					progressText.textContent = progressPercent.toFixed(2) + '%';
				} else if (progressPercent > 100) {
					progressBar.style.width = '100%';
					progressText.textContent = '100%';
				} else {
					progressBar.style.width = '0%';
					progressText.textContent = '0%';
				}
			}

			// List of goals with start and end dates
			const goals = [
				{ name: "October 2024", startDate: "2024-10-01", endDate: "2024-10-31" },  // Goal for October
				{ name: "Quarter IV 2024", startDate: "2024-10-01", endDate: "2024-12-31" },  // Goal for Q4
				{ name: "Year 2024", startDate: "2024-01-01", endDate: "2024-12-30" },  // Goal for the entire year
			];

			// Function to update progress bars for multiple goals
			function updateGoalProgressBar() {
				const now = new Date();
				const goalList = document.getElementById('goal-list');

				// Clear previous goal list
				goalList.innerHTML = '';

				goals.forEach((goal, index) => {
					const startDate = new Date(goal.startDate);
					const endDate = new Date(goal.endDate);

					const totalGoalTime = endDate - startDate;
					const currentGoalTime = now - startDate;
					const goalProgressPercent = (currentGoalTime / totalGoalTime) * 100;

					// Create container for each goal
					const goalContainer = document.createElement('div');
					goalContainer.classList.add('goal');

					// Create progress bar for each goal
					const progressContainer = document.createElement('div');
					progressContainer.classList.add('progress-container');

					const progressBar = document.createElement('div');
					progressBar.classList.add('progress-bar');
					progressBar.id = \`goal-progress-bar-\${index}\`;

					const progressText = document.createElement('div');
					progressText.classList.add('progress-text');
					progressText.id = \`goal-progress-text-\${index}\`;

					// Set progress based on goal completion percentage
					if (goalProgressPercent >= 0 && goalProgressPercent <= 100) {
						progressBar.style.width = goalProgressPercent + '%';
						progressText.textContent = goalProgressPercent.toFixed(2) + '%';
					} else if (goalProgressPercent > 100) {
						progressBar.style.width = '100%';
						progressText.textContent = '100%';
					} else {
						progressBar.style.width = '0%';
						progressText.textContent = '0%';
					}

					// Append progress bar and goal name to the container
					progressContainer.appendChild(progressBar);
					progressContainer.appendChild(progressText);
					goalContainer.innerHTML = \`<h2>\${goal.name}</h2>\`;
					goalContainer.appendChild(progressContainer);
					goalList.appendChild(goalContainer);
				});
			}

			// Initial updates for both today's progress and goals
			updateProgressBar();
			updateGoalProgressBar();

			// Update the progress bars every minute
			setInterval(updateProgressBar, 60000);
			setInterval(updateGoalProgressBar, 60000);
		</script>

		</body>
		</html>
		`;
		
		return htmlTimeProgress;
	},
}