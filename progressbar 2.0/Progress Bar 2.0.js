{
  async noteOption(app, noteUUID) {

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
    console.log("taskPending:", taskPending);

    // Count the number of pending tasks
    const taskPendingN = taskPending.length;
    console.log(`taskPendingN: ${taskPendingN}`);

    // Retrieve all tasks, including completed and dismissed ones
    const taskAll = await app.getNoteTasks({ uuid: noteUUID }, { includeDone: true });
    console.log("taskAll:", taskAll);

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
      const additionalInfo = [importantText, urgentText].filter(Boolean).join(', ');  // Combine labels
      return `Content: ${task.content}, Start At: ${formatUnixTimestamp(task.startAt)}` + (additionalInfo ? `, ${additionalInfo}` : '');
    }

    // ----------- Section: Categorizing and Formatting Tasks -----------
    // Filter and sort tasks that are completed, then format them
    const Completed = taskAll
      .filter(task => task.completedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'completedAt'))
      .map(task => `Task: ${task.content}, Completed At: ${formatUnixTimestamp(task.completedAt)}`);

    // Filter and sort tasks that are dismissed, then format them
    const Dismissed = taskAll
      .filter(task => task.dismissedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'dismissedAt'))
      .map(task => `Task: ${task.content}, Dismissed At: ${formatUnixTimestamp(task.dismissedAt)}`);

    // Filter and sort tasks that are pending (neither completed nor dismissed), then format them
    const Pending = taskAll
      .filter(task => !task.completedAt && !task.dismissedAt)
      .sort((a, b) => sortByTimestamp(a, b, 'startAt'))
      .map(formatPendingTask);

    // Combine all categorized tasks into a single string output
    const allTaskCategorized = `*Pending Tasks:*\n${Pending.join('\n')}\n*Completed Tasks:*\n${Completed.join('\n')}\n*Dismissed Tasks:*\n${Dismissed.join('\n')}`;

    console.log("allTaskCategorized:", allTaskCategorized);

    // ----------- Section: Task Progress Calculation -----------
    // Count the total number of tasks
    const taskAllN = taskAll.length;
    console.log(`Note has ${taskPendingN} tasks pending and ${taskAllN} in total`);

    // Calculate the ratio of pending tasks to all tasks
    const taskPendingRatio = (taskPendingN / taskAllN);
    console.log(`taskPendingRatio is ${taskPendingRatio}`);

    // Calculate the completion ratio as the inverse of the pending ratio
    const taskCompletedRatio = (1 - taskPendingRatio);
    console.log(`taskCompletedRatio: ${taskCompletedRatio}`);

    // Convert the completed ratio to a percentage for progress tracking
    const taskCompletedPercent = Math.round(taskCompletedRatio * 100);
    console.log(`Tasks are ${taskCompletedPercent}% complete.`);

    // ----------- Section: Displaying Progress Bar -----------
    // Initialize a variable to hold the progress bar string
    let taskProgress;

    // Depending on the completion percentage, display a corresponding progress bar
    if (taskCompletedPercent < 10) {
      taskProgress = `[⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 10 && taskCompletedPercent < 20) {
      taskProgress = `[🟩⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 20 && taskCompletedPercent < 30) {
      taskProgress = `[🟩🟩⬛⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 30 && taskCompletedPercent < 40) {
      taskProgress = `[🟩🟩🟩⬛⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 40 && taskCompletedPercent < 50) {
      taskProgress = `[🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 50 && taskCompletedPercent < 60) {
      taskProgress = `[🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 60 && taskCompletedPercent < 70) {
      taskProgress = `[🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 70 && taskCompletedPercent < 80) {
      taskProgress = `[🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 80 && taskCompletedPercent < 90) {
      taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent >= 90 && taskCompletedPercent < 100) {
      taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛] ${taskCompletedPercent}%`;
    }
    if (taskCompletedPercent === 100) {
      taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩] ${taskCompletedPercent}% ‼`;
    }

    // ----------- Section: Adding Categorized Task List to Output -----------
    const allTaskCategorizedz = `
[Categorized Task List][^CTL]
[^CTL]: []()${allTaskCategorized}
`;

    console.log("allTaskCategorizedz:", allTaskCategorizedz);

    // Replace the note content in the 'Progress' section with the progress bar and categorized task list
    return app.replaceNoteContent({ uuid: app.context.noteUUID }, `${taskProgress}\n${allTaskCategorizedz}`, { section });

  }
}
