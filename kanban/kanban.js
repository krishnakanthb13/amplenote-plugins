{
  async noteOption(app) {
    const kanbanTag = (await app.filterNotes({ tag: "-reports/-kanban" })).length > 0;
    console.log("kanbanTag:", kanbanTag);
    
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
          allTasks.push({ ...task, notename: note.name, noteurl: `https://www.amplenote.com/notes/${note.uuid}`, tags: noteTags });
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

    const changez = true;
    if (changez) {
      await app.updateTask("4a784a37-2b1e-41f2-98cb-b290c41eaeca", {noteUUID: "0a0496aa-775c-11ef-bfb2-f222b153c6e3"});
      console.log("Success");
    }

    
  }
}