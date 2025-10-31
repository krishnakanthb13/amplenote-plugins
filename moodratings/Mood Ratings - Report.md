---
title: Mood Ratings - Report
uuid: 0ed87950-b5b6-11f0-b232-256886a0b077
version: 19
created: '2025-10-30T23:00:00+05:30'
updated: '2025-10-31T17:33:19+05:30'
tags:
  - '-amplenote/mine'
  - '-9-permanent'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Mood Ratings - Report|
|Icon<!-- {"cell":{"colwidth":105}} -->|mood|
|Description|Get the Mood Ratings as a Report, to have it saved for your future reference.|
|Instructions|App-Options by typing<mark style="color:#F3DE6C;">`ctrl+o/cmd+o`<!-- {"cycleColor":"36"} --></mark>, search for <mark style="color:#F3DE6C;">`Mood Ratings - Report`<!-- {"cycleColor":"36"} --></mark>`.`<br />Fill in the details like <mark style="color:#F3DE6C;">`day count`<!-- {"cycleColor":"36"} --></mark> and click on <mark style="color:#F3DE6C;">`Submit`<!-- {"cycleColor":"36"} --></mark>.<br />*You should be able to get the Report on the Mood Ratings mentioned in a new Note!<br />Keep it as reference for the future.*|
\

```
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
```