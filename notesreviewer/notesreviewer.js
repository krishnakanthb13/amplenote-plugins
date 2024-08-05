{

  async linkOption(app, link) {
    // ------- Prompting the user to enter filter criteria -------
    const result = await app.prompt("Enter your filter criteria (Anyone or Both [Name_Tag]!)", {
        inputs: [
            {
                label: "Select The Review Decision!",
                type: "select",
                options: [
                    { label: "Keep - Review Completed!", value: "2-keep" },
                    { label: "Discard - Review Completed!", value: "2-discard" },
                    { label: "Review - Review Pending!", value: "2-review" }
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

    // ------- Predefined review tags -------
    const reviewTagz = '-notes-reviewer,-notes-reviewer/0-reports,-notes-reviewer/1-inbox,-notes-reviewer/2-discard,-notes-reviewer/2-keep,-notes-reviewer/2-review,-notes-reviewer/3-moved';
    console.log("reviewTagz:", reviewTagz);

    // ------- Destructuring user inputs -------
    const [decisiontagName, multiTag, singleTag] = result;
    console.log("decisiontagName:", decisiontagName);
    console.log("multiTag:", multiTag);
    console.log("singleTag:", singleTag);

    // ------- Get the link from the Link -------
    let decideUUID = (link.href || "");
    console.log("decideUUID:", decideUUID);

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

    // ------- Remove predefined tags from the note -------
    if (decisiontagName) {
        const tagsArray = reviewTagz.split(',').map(tag => tag.trim());
        for (const tag of tagsArray) {
            if (tag) {
                await app.removeNoteTag({ uuid: decideUUID }, tag);
            }
        }
    }

    // ------- Add the selected decision tag to the note -------
    const added = await app.addNoteTag({ uuid: decideUUID }, `${decisiontagName}`);
    await app.alert(added ? "Tag added" : "Failed to add tag");

    // ------- Add multiple tags to the note if provided -------
    if (multiTag) {
        const tagsArray = multiTag.split(',').map(tag => tag.trim());
        for (const tag of tagsArray) {
            if (tag) {
                await app.addNoteTag({ uuid: decideUUID }, tag);
            }
        }
        await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
    }

    // ------- Add single tag to the note if provided -------
    if (singleTag) {
        await app.addNoteTag({ uuid: decideUUID }, singleTag);
        await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
    }
  }

}