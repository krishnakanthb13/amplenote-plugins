{

  async linkOption(app, link) {
    // ------- Prompting the user to enter filter criteria -------
    const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
        inputs: [
            {
                label: "Select The Review Decision!",
                type: "select",
                options: [
                    { label: "Keep - Review Completed!", value: "-notes-reviewer/2-keep" },
                    { label: "Discard - Review Completed!", value: "-notes-reviewer/2-discard" },
                    { label: "Review - Review Pending!", value: "-notes-reviewer/2-review" }
                ]
            },
            { 
                label: "Select the tags (Max 10) to add to the Note!",
                type: "tags",
                limit: 10
            },
            {
                label: "Type a Tag to apply (Not Existing* / Existing) - (* - Preferred)",
                placeholder: "Your tag here",
                type: "string",
            }
        ]
    });

    // ------- Check if the user cancelled the operation -------
    if (!result) {
        app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
        return;
    }
    
    // ------- Log user selections for debugging -------
    console.log("Users Selection:", result);

    // ------- The String UUID of the note the plugin action was invoked from. -------
    const reportNoteUUID = app.context.noteUUID;
    console.log("app.context.noteUUID:", app.context.noteUUID);
    console.log("reportNoteUUID:", reportNoteUUID);
    
    // ------- Predefined review tags -------
    const reviewTagz = '-notes-reviewer,-notes-reviewer/0-reports,-notes-reviewer/1-inbox,-notes-reviewer/2-discard,-notes-reviewer/2-keep,-notes-reviewer/2-review,-notes-reviewer/3-moved';
    console.log("reviewTagz:", reviewTagz);

    // ------- Destructuring user inputs -------
    const [decisionTagName, multiTag, singleTag] = result;
    console.log("decisionTagName:", decisionTagName);
    console.log("multiTag:", multiTag);
    console.log("singleTag:", singleTag);

    // ------- Check if the user cancelled the operation -------
    if ((multiTag || singleTag) && decisionTagName) {
      app.alert("Review Decision should not be selected when Multiple Tags or Single Tag are Used or Selected!");
      return;
    }
    
    // ------- Get the link from the Link -------
    let decideUUID = (link.href || "");
    // let noteDescription = (link.description || "");
    console.log("decideUUID:", decideUUID);
    // console.log("noteDescription:",noteDescription);

    // ------- Create a regular expression to match UUID patterns -------
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

    // ------- Extract the UUID using match -------
    const extractedUUID = link.href && link.href.match(uuidRegex);
    console.log("extractedUUID:", extractedUUID);

    // ------- Check if the extraction was successful and use the first match -------
    if (extractedUUID) {
        decideUUID = extractedUUID[0];
        console.log("decideUUID:", decideUUID); // Output: extracted UUID
    } else {
        // ------- Handle the case where no UUID is found in the URL -------
        console.log("No UUID found in the URL.");
    }

    let fTags = new Set();
    // let fTagsR = new Set();
    
    // ------- Remove predefined tags from the note -------
    if (decisionTagName) {
        const tagsArray = reviewTagz.split(',').map(tag => tag.trim());
        for (const tag of tagsArray) {
            if (tag) {
                await app.removeNoteTag({ uuid: decideUUID }, tag);
                // fTagsR.add(tag);
            }
        }
    }

    // ------- Add the selected decision tag to the note -------
    const added = await app.addNoteTag({ uuid: decideUUID }, `${decisionTagName}`);
    fTags.add(decisionTagName);

    // ------- Add multiple tags to the note if provided -------
    if (multiTag) {
        const tagsArray = multiTag.split(',').map(tag => tag.trim());
        for (const tag of tagsArray) {
            if (tag) {
                await app.addNoteTag({ uuid: decideUUID }, tag);
                fTags.add(tag);
            }
        }
        await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
        fTags.add("-notes-reviewer/3-moved");
    }

    // ------- Add single tag to the note if provided -------
    if (singleTag) {
        await app.addNoteTag({ uuid: decideUUID }, singleTag);
        fTags.add(singleTag);
        await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
        fTags.add("-notes-reviewer/3-moved");
        
    }

    // ------- Audit Reporting -------
    // Prepare the formatted text to be pasted in the new note
    const fDate = new Date();
    // Format the date using toLocaleString with options
    const formattedDate = fDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    console.log("fDate:",fDate);
    console.log("formattedDate:",formattedDate);

    const noteHandle = await app.findNote({ uuid: decideUUID });
    const noteDescription = noteHandle.name;
    const noteName = `[${noteDescription}](https://www.amplenote.com/notes/${decideUUID})`;
    console.log("noteName:",noteName);
    console.log("fTags:",fTags);
    
    const fTagsArray = Array.from(fTags);
    console.log("fTagsArray:",fTagsArray);
    // const fTag = `${decisiontagName},${singleTag},${multiTag}`
    
    const textFinal = `
> Audit - Review Notes: On <mark data-text-color="25" style="color: #F8D616;">**${formattedDate}**</mark>, The Note Titled: **${noteName}** underwent a review decision process. The tag: <mark data-text-color="25" style="color: #F8D616;">[**${fTagsArray}**]</mark> was/were added.
`;
    console.log("textFinal:",textFinal);
    
    // Insert the formatted text into the selected note
        await app.insertNoteContent({
            uuid: reportNoteUUID
        }, textFinal);
    
  }

}