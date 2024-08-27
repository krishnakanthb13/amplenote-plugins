 {
   async noteOption(app, noteUUID) {

     const sections = await app.getNoteSections({ uuid: app.context.noteUUID });
     const section = sections.find((section) => section.heading?.text === "Progress");
      if (section === undefined) {
        app.alert(`Please create a 'Progress' section.
        """"""
        ### Progress
        ---
        """"""
        - Separate it with a triple line break '---'
        (Or else anything under the heading will be erased!)`);
        return;
      }
     
     // Processing the Tasks     
     const taskPending = await app.getNoteTasks({ uuid: noteUUID });
	 console.log("taskPending:",taskPending);
	 
     const taskPendingN = taskPending.length;
	 console.log(`taskPendingN: ${taskPendingN}`);
	 
     const taskAll = await app.getNoteTasks({ uuid: noteUUID }, {includeDone: true});
	 console.log("taskAll:",taskAll);

	 // const Completed = taskAll.filter(task => task.completedAt);
	 // const Dismissed = taskAll.filter(task => task.dismissedAt);
	 // const Pending = taskAll.filter(task => !task.completedAt && !task.dismissedAt);

	 // console.log("Completed Tasks:", Completed);
	 // console.log("Dismissed Tasks:", Dismissed);
	 // console.log("Pending Tasks:", Pending);

	 function formatUnixTimestamp(unixTimestamp) {
	     const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
	     return date.toISOString().slice(0, 19).replace('T', ' ');
	 }
	 
	 function sortByTimestamp(a, b, key) {
	     return (a[key] || 0) - (b[key] || 0);
	 }

	function formatPendingTask(task) {
		const importantText = task.important ? `Important` : '';
		const urgentText = task.urgent ? `Urgent` : '';
		const additionalInfo = [importantText, urgentText].filter(Boolean).join(', ');
		
		return `Content: ${task.content}, Start At: ${formatUnixTimestamp(task.startAt)}` + (additionalInfo ? `, ${additionalInfo}` : '');
	}

     const Completed = taskAll
     	.filter(task => task.completedAt)
		.sort((a, b) => sortByTimestamp(a, b, 'completedAt'))
     	.map(task => `Task: ${task.content}, Completed At: ${formatUnixTimestamp(task.completedAt)}`
		);
     
     const Dismissed = taskAll
     	.filter(task => task.dismissedAt)
		.sort((a, b) => sortByTimestamp(a, b, 'dismissedAt'))
     	.map(task => `Task: ${task.content}, Dismissed At: ${formatUnixTimestamp(task.dismissedAt)}`
		);
     
     const Pending = taskAll
     	.filter(task => !task.completedAt && !task.dismissedAt)
		.sort((a, b) => sortByTimestamp(a, b, 'startAt'))
     	.map(formatPendingTask);
     
     // Combine the text outputs into a single string or print them separately
     const allTaskCategorized = `*Pending Tasks:*\n${Pending.join('\n')}\n*Completed Tasks:*\n${Completed.join('\n')}\n*Dismissed Tasks:*\n${Dismissed.join('\n')}`;

	 console.log("allTaskCategorized:",allTaskCategorized);
	 
     const taskAllN = taskAll.length;
     console.log(`Note has ${ taskPendingN } tasks pending and ${ taskAllN } in total`);

     const taskPendingRatio = (taskPendingN / taskAllN);
	 console.log(`taskPendingRatio is ${taskPendingRatio}`);

     const taskCompletedRatio = (1 - taskPendingRatio);
     console.log(`taskCompletedRatio: ${taskCompletedRatio}`);

     const taskCompletedPercent = Math.round(taskCompletedRatio * 100);
     console.log(`Tasks are ${taskCompletedPercent}% complete.`);

     let taskProgress;

     if (taskCompletedPercent < 10) {
       taskProgress = `[⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
     if (taskCompletedPercent >= 10 && taskCompletedPercent < 20) {
       taskProgress = `[🟩⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 20 && taskCompletedPercent < 30) {
       taskProgress = `[🟩🟩⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 30 && taskCompletedPercent < 40) {
       taskProgress = `[🟩🟩🟩⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 40 && taskCompletedPercent < 50) {
       taskProgress = `[🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 50 && taskCompletedPercent < 60) {
       taskProgress = `[🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 60 && taskCompletedPercent < 70) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 70 && taskCompletedPercent < 80) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 80 && taskCompletedPercent < 90) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛] ${taskCompletedPercent}%`;
     };
      if (taskCompletedPercent >= 90 && taskCompletedPercent < 100) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛] ${taskCompletedPercent}%`;
     };
     if (taskCompletedPercent === 100) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩] ${taskCompletedPercent}% ‼`;
     };

     // if (app.settings["Task Categorized List (true/false)"] === "true") {
		// return app.replaceNoteContent({ uuid: app.context.noteUUID }, `${taskProgress}\n\n${allTaskCategorized}`, { section });
     // } else {
		// return app.replaceNoteContent({ uuid: app.context.noteUUID }, taskProgress, { section });
	 // };
	 
	 const allTaskCategorizedz = `
[Categorized Task List][^CTL]
[^CTL]: []()${allTaskCategorized}
`;

	 console.log("allTaskCategorizedz:",allTaskCategorizedz);

     return app.replaceNoteContent({ uuid: app.context.noteUUID }, `${taskProgress}\n${allTaskCategorizedz}`, { section });

   }
}