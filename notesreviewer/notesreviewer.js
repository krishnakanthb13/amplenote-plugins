{

  async linkOption(app, link) {
      // ------- Prompting the user to enter filter criteria -------
      // Displays a prompt to the user to select review decision, tags, and enter a custom tag.
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
                  label: "Select tags outside the Review Process!",
                  type: "tags",
                  limit: 10
              },
              {
                  label: "Free Type a Tag to apply",
                  placeholder: "Your tag here",
                  type: "string",
              },
              {
                  label: "Add your comments for this Review!",
                  placeholder: "To remind yourself why you made this move!",
                  type: "text",
              }
          ]
      });
  
      // ------- Check if the user cancelled the operation -------
      // Alerts the user if the operation is cancelled.
      if (!result) {
          app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
          return;
      }
      
      // ------- Log user selections for debugging -------
      // Logs user input selections for debugging purposes.
      // console.log("Users Selection:", result);
  
      // ------- The String UUID of the note the plugin action was invoked from -------
      // Retrieves and logs the UUID of the current note.
      const reportNoteUUID = app.context.noteUUID;
      // console.log("app.context.noteUUID:", app.context.noteUUID);
      // console.log("reportNoteUUID:", reportNoteUUID);
      
      // ------- Predefined review tags -------
      // Defines and logs a set of predefined review tags.
      const reviewTagz = '-notes-reviewer,-notes-reviewer/0-reports,-notes-reviewer/1-inbox,-notes-reviewer/2-discard,-notes-reviewer/2-keep,-notes-reviewer/2-review,-notes-reviewer/3-moved';
      // console.log("reviewTagz:", reviewTagz);
  
      // ------- Destructuring user inputs -------
      // Destructures and logs user input selections.
      const [decisionTagName, multiTag, singleTag, noteComment] = result;
      // console.log("decisionTagName:", decisionTagName);
      // console.log("multiTag:", multiTag);
      // console.log("singleTag:", singleTag);
  
      // ------- Check if the user cancelled the operation -------
      // Checks if decision tag is selected along with multiple or single tags and alerts the user.
      if ((multiTag || singleTag) && decisionTagName) {
          app.alert("Review Decision should not be selected when Multiple Tags or Single Tag are Used or Selected!");
          return;
      }
      
      // ------- Get the link from the Link -------
      // Retrieves and logs the UUID from the link.
      let decideUUID = (link.href || "");
      // console.log("decideUUID:", decideUUID);
  
      // ------- Create a regular expression to match UUID patterns -------
      // Regular expression to match UUID patterns.
      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  
      // ------- Extract the UUID using match -------
      // Extracts and logs the UUID from the link.
      const extractedUUID = link.href && link.href.match(uuidRegex);
      // console.log("extractedUUID:", extractedUUID);
  
      // ------- Check if the extraction was successful and use the first match -------
      // Uses the extracted UUID if found, otherwise logs a message.
      if (extractedUUID) {
          decideUUID = extractedUUID[0];
          // console.log("decideUUID:", decideUUID);
      } else {
          // console.log("No UUID found in the URL.");
      }
  
      let fTags = new Set();
      
      // ------- Remove predefined tags from the note -------
      // Removes predefined review tags from the note if a decision tag is selected.
      if (decisionTagName) {
          const tagsArray = reviewTagz.split(',').map(tag => tag.trim());
          for (const tag of tagsArray) {
              if (tag) {
                  await app.removeNoteTag({ uuid: decideUUID }, tag);
              }
          }
      }
  
      // ------- Add the selected decision tag to the note -------
      // Adds the selected decision tag to the note.
      const added = await app.addNoteTag({ uuid: decideUUID }, `${decisionTagName}`);
      fTags.add(decisionTagName);
  
      // ------- Add multiple tags to the note if provided -------
      // Adds multiple tags to the note if provided.
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
      // Adds a single tag to the note if provided.
      if (singleTag) {
          await app.addNoteTag({ uuid: decideUUID }, singleTag);
          fTags.add(singleTag);
          await app.addNoteTag({ uuid: decideUUID }, "-notes-reviewer/3-moved");
          fTags.add("-notes-reviewer/3-moved");
      }
  
      // ------- Audit Reporting -------
      // Prepares and logs the formatted text for audit reporting.
      const fDate = new Date();
      const formattedDate = fDate.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      // console.log("fDate:", fDate);
      // console.log("formattedDate:", formattedDate);
  
      const noteHandle = await app.findNote({ uuid: decideUUID });
      const noteDescription = noteHandle.name;
      const noteName = `[${noteDescription}](https://www.amplenote.com/notes/${decideUUID})`;
      // console.log("noteName:", noteName);
      // console.log("fTags:", fTags);
      
      const fTagsArray = Array.from(fTags);
      // console.log("fTagsArray:", fTagsArray);
      
      const textFinal = `
> Audit - Review Notes: On <mark data-text-color="25" style="color: #F8D616;">**${formattedDate}**</mark>, The Note Titled: **${noteName}** underwent a review decision process. The tag: <mark data-text-color="25" style="color: #F8D616;">[**${fTagsArray}**]</mark> was/were added. With comments: <mark data-text-color="25" style="color: #F8D616;">[**${noteComment}**]</mark>.
`;
      // console.log("textFinal:", textFinal);
      
      // ------- Insert the formatted text into the selected note -------
      // Inserts the formatted audit text into the report note.
      await app.insertNoteContent({
          uuid: reportNoteUUID
      }, textFinal);
  }

}