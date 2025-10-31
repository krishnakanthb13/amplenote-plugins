{
  async appOption(app) {

    // Prompt the user for input on desired actions with the selected text.
    const result = await app.prompt("Mood Ratings - Report to start with.", {
      inputs: [
        { label: "Number of Days Prior too?", type: "string", value: 10 },
      ]
    });
  
    // Exit if the user cancels the operation
    if (!result) {
      // app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
    
    // Extract user-selected inputs
    const numberOfDays = result;
      
    const from = Math.floor(Date.now() / 1000) - (60 * 60 * 24 * numberOfDays);
    const moodRatings = await app.getMoodRatings(from);
    // Sort moodRatings by timestamp (ascending)
    // moodRatings.sort((a, b) => a.timestamp - b.timestamp);
    // Sort moodRatings by timestamp (decending)
    moodRatings.sort((a, b) => b.timestamp - a.timestamp);
    // console.log(JSON.stringify(moodRatings));
    // console.log("- Mood ratings:\n\n```\n" + JSON.stringify(moodRatings, null, 1) + "\n```");
    const finalResponse = 
      "- Mood Ratings for the Last **" + numberOfDays + " Days**:\n\n```\n" + 
      JSON.stringify(moodRatings, null, 1) + 
      "\n```";
    
    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `MRReport_${YYMMDD}_${HHMMSS}`;
  
    const noteUUIDNew = await app.createNote(filename, [ "-reports/-mood-ratings" ]);
    // console.log("New note Created.");
    await app.insertContent({ uuid: noteUUIDNew }, finalResponse);
    await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    
  }
}