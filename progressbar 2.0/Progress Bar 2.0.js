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
     const taskR = await app.getNoteTasks({ uuid: noteUUID });
	 console.log("taskR:",taskR);
     const taskRemain = taskR.length;
	 console.log(`taskRemain: ${taskRemain}`);
     const taskT = await app.getNoteTasks({ uuid: noteUUID }, {includeDone: true});
	 console.log("taskT:",taskT);
     const taskTotal = taskT.length;
     console.log(`Note has ${ taskRemain } tasks remaining and ${ taskTotal } in total`);

     const taskRatio = (taskRemain / taskTotal);
	 console.log(`taskRatio is ${taskRatio}`);

     const taskComplete = (1 - taskRatio);
     console.log(`task complete: ${taskComplete}`);

     const taskPercent = Math.round(taskComplete * 100);
     console.log(`Tasks are ${taskPercent}% complete.`);

     let taskProgress;

     if (taskPercent < 10){
       taskProgress = `[⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
     if (taskPercent >= 10 && taskPercent < 20) {
       taskProgress = `[🟩⬛⬛⬛⬛⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 20 && taskPercent < 30) {
       taskProgress = `[🟩🟩⬛⬛⬛⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 30 && taskPercent < 40) {
       taskProgress = `[🟩🟩🟩⬛⬛⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 40 && taskPercent < 50) {
       taskProgress = `[🟩🟩🟩🟩⬛⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 50 && taskPercent < 60) {
       taskProgress = `[🟩🟩🟩🟩🟩⬛⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 60 && taskPercent < 70) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩⬛⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 70 && taskPercent < 80) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩⬛⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 80 && taskPercent < 90) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩⬛⬛] ${taskPercent}%`;
     };
      if (taskPercent >= 90 && taskPercent < 100) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩⬛] ${taskPercent}%`;
     };
     if (taskPercent === 100) {
       taskProgress = `[🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩] ${taskPercent}% ‼`;
     };

     
    app.replaceNoteContent({ uuid: app.context.noteUUID }, taskProgress, { section });
   }
 }