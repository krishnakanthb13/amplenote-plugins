---
title: Time - Progress Bar
uuid: 9e46b70a-6b9d-11ef-a330-22d98565c2c0
version: 72
created: '2024-09-05T21:13:37+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

**Welcome to the Time and Goals Progress Tracker!**

\

I'm excited to help you take control of your day and keep track of your long-term goals. Whether you're focusing on daily routines or working toward bigger objectives, this tool provides a clear and dynamic way to visualize your Time that you have and the Time that you have used up.

\

With this **Time Progress Bar**, you’ll see how much of your day has passed at a glance, allowing you to manage your time more effectively. Simply set your custom start and end times, and watch as the progress bar fills up in real-time, ensuring you stay on track throughout the day.

\

Additionally, our **Goal Progress Bars** help you monitor the progress of key milestones, whether they span a month, quarter, or the entire year. By seeing how far you’ve come and how much time is left you can maintain focus and motivation on what matters most. You can add and modify your Goals name + timeline as you wish.

\

Feel free to customize the tracker to suit your needs and check back frequently to see your updated progress. We're here to support your journey toward better time management and goal achievement!

\

Let’s get started and make the most of every moment!

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/9e46b70a-6b9d-11ef-a330-22d98565c2c0/7be9893d-fdf1-4660-ae28-985fa20856be.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

The code is designed to track and display time-based progress in a dynamic, visual way. It consists of two main components: a daily time progress bar and multiple goal progress bars.

1. **Daily Time Progress Bar**: This tracks how much of the current day has passed based on custom start and end times, displaying the percentage of the day that has been completed. The progress bar updates every minute to reflect the real-time passage of the day.

1. **Goal Progress Bars**: These track progress towards longer-term goals, such as monthly, quarterly, or yearly goals. Each goal has a start and end date, and the progress is calculated based on how much time has passed between those dates. The progress bars are updated regularly, showing users how close they are to completing each goal.

Overall, the code's purpose is to provide a visual representation of time management and goal completion, helping users track their daily and long-term progress in real-time.

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":108}} -->|Time - Progress Bar<!-- {"cell":{"colwidth":500}} -->|
|Icon<!-- {"cell":{"colwidth":108}} -->|timelapse<!-- {"cell":{"colwidth":500}} -->|
|Setting<!-- {"cell":{"colwidth":108}} -->|Time Goal Progress Bar UUID \[Do not Edit!\]<!-- {"cell":{"colwidth":500}} -->|
|Setting<!-- {"cell":{"colwidth":108}} -->|Peek Viewer (Yes / No)<!-- {"cell":{"colwidth":500}} -->|
|Description<!-- {"cell":{"colwidth":108}} -->|[^1]<!-- {"cell":{"colwidth":500}} -->|
|Instructions<!-- {"cell":{"colwidth":108}} -->| [Time - Progress Bar Docs](https://www.amplenote.com/notes/ffc8dd2e-6b9c-11ef-a330-22d98565c2c0) <!-- {"cell":{"colwidth":500}} -->|
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
	// ----------------------------------------------------------------------
	async noteOption(app) {
		// Create, Save, and Retrieve the Note for Viewing the Monthly Note Calendar Option

		// Define the name of the new note and the tags associated with it
		const newNoteName = `Time/Goals: Progress Bar`;
		const newTagName = ['-reports/-time-goal-progress'];

		// Handle the insert or retrieve note UUID.
		const noteUUIDz = await (async () => {
			// Retrieve the existing UUID from settings if it exists
			const existingUUID = await app.settings["Time Goal Progress Bar UUID [Do not Edit!]"];
			if (existingUUID) {
				// Return the existing UUID if found
				return existingUUID;
			}

			// If no existing UUID is found, create a new note and save the UUID in the settings
			const newUUIDx = await app.createNote(newNoteName, newTagName);
			await app.setSetting("Time Goal Progress Bar UUID [Do not Edit!]", newUUIDx);

			// Return the newly created UUID
			return newUUIDx;
		})();

		// `app.context.pluginUUID` is always supplied - it is the UUID of the plugin note.
		// Insert the plugin note content with a unique UUID into the note
		await app.replaceNoteContent(
			{ uuid: noteUUIDz }, 
			`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="1" />`
		);

		// Retrieve the Peek View setting from settings, defaulting to "Yes" if not set
		const peekviewEnable = await app.settings["Peek Viewer (Yes / No)"] || "Yes";

		if (peekviewEnable.toLowerCase() === "yes") {
			// If Peek View is enabled, open the note in the sidebar
			await app.openSidebarEmbed(1, 'sidebar', noteUUIDz);
		} else {
			// If Peek View is disabled or set to "no", navigate to the note's URL
			await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
		}

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
				{ name: "September 2024", startDate: "2024-09-01", endDate: "2024-09-30" },  // Goal for September
				{ name: "Quarter III 2024", startDate: "2024-07-01", endDate: "2024-09-30" },  // Goal for Q3
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
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- September 5th, 2024: Planned and developed a responsive daily time progress bar with real-time updates, customizable daily tracking, and dynamic goal progress bars for multiple long-term goals, featuring smooth animations and flexible display options for both sidebar and full-page views.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- September 5th, 2024

    - ~~Daily Time Progress Bar~~

    - ~~Real-Time Updates (every minute)~~

    - ~~Goal Progress Bars for multiple long-term goals~~

    - ~~Customizable start and end times for daily tracking~~

    - ~~Customizable goal timeframes (start and end dates)~~

    - ~~Dynamic generation of goal progress bars~~

    - ~~Smooth animation for progress bar updates~~

    - ~~Responsive design with customizable CSS styling~~

    - ~~Supports both sidebar and full-page views based on user preferences~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Nothing functional as of now!

    - Maybe based on users request I can viability of the request and proceed to implementation.

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^2]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 5h 41m = \~5h 41m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

\

[^1]: 
    - Today's Time Progress Bar

    - Set Goals Duration Progress Bar *(Open in your Peek Viewer! \[Suggested\])*

[^2]: [High-Level Explanation of the Code]()

    ### Explanation of Key Sections:

    - **Note Creation/Retrieval**: This section checks if a note with the UUID already exists. If it doesn't, it creates a new note and saves the UUID in the app's settings.

    - **Plugin UUID Handling**: The code replaces the content of the note with an embedded object using the plugin's UUID.

    - **Peek View Logic**: Depending on the user's settings for Peek View, it either opens the note in the sidebar or navigates to the note in the browser.

    - **HTML Structure**: Clear separation of `<head>` and `<body>` with proper tags for defining the document structure, ensuring that the document is well-formed and standards-compliant.

    - **CSS Styling**: Flexbox is used for layout control, ensuring the content is well-aligned and scrollable. Progress bar styles ensure smooth transitions, and text within bars is readable.

    - **JavaScript Logic**:

        - **Time Progress Bar**: It calculates how much of the day has passed based on custom start and end times.

        - **Goal Progress Bars**: It dynamically generates multiple progress bars for different goals, calculating the progress based on the goal’s start and end dates.

    - **Dynamic Progress Bars**: The progress is updated every minute using `setInterval()`. This ensures the bars update in real-time without the need for manual refresh.

    This setup provides a clean, dynamic, and responsive way to visualize time and goal progress.

