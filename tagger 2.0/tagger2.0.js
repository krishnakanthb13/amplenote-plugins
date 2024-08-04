{
  // Define an asynchronous function 'noteOption' that takes 'app' and 'noteUUID' as parameters
  async insertText(app, noteUUID) {
    // Log the start of the function
    // console.log("Starting insertText function");
  
    // Find the note using the UUID
    const note = await app.findNote({uuid: app.context.noteUUID});
    // console.log("Note found:", note);
  
    // ------- Display a prompt to customize the note -------
    const result = await app.prompt("Customize your note", {
      inputs: [ 
        { 
          label: "Select the tags (Max 10) to add to the Note!", 
          type: "tags",
          limit: 10
        },
        {
          label: "Type a Tag to apply (Not Existing* / Existing) - (* - Preferred)",
          placeholder: "Your tag here",
          type: "string",
        },
        { 
          label: "Select emoji", 
          type: "select", 
          options: [
            // Task Status
            { label: "Task Status: ✅ Completed", value: "✅" },
            { label: "Task Status: ⚠️ Important", value: "⚠️" },
            { label: "Task Status: 🔴 Urgent", value: "🔴" },
            { label: "Task Status: 🟡 Pending", value: "🟡" },
            { label: "Task Status: 🟢 Done", value: "🟢" },
            { label: "Task Status: ⏳ In Progress", value: "⏳" },
  
            // Note Type
            { label: "Note Type: 📝 Note", value: "📝" },
            { label: "Note Type: 💡 Idea", value: "💡" },
            { label: "Note Type: 🔍 Review", value: "🔍" },
            { label: "Note Type: 📚 Research", value: "📚" },
  
            // Priority
            { label: "Priority: 📌 Pinned", value: "📌" },
            { label: "Priority: 🔒 Confidential", value: "🔒" },
  
            // Time Management
            { label: "Time Management: 📅 Scheduled", value: "📅" },
            { label: "Time Management: 🕒 Later", value: "🕒" },
  
            // Work and Personal
            { label: "Work: 💼 Work", value: "💼" },
            { label: "Work: 🎓 Study", value: "🎓" },
            { label: "Personal: 🏠 Home", value: "🏠" },
            { label: "Personal: 🛒 Shopping", value: "🛒" },
            { label: "Personal: ✈️ Travel", value: "✈️" },
            { label: "Personal: 🎉 Event", value: "🎉" },
  
            // Miscellaneous
            { label: "Miscellaneous: ⚙️ Settings", value: "⚙️" },
            { label: "Miscellaneous: 🌟 Highlight", value: "🌟" },
            { label: "Miscellaneous: 🎯 Goal", value: "🎯" },
            { label: "Miscellaneous: 🛠️ Maintenance", value: "🛠️" },
            { label: "Miscellaneous: 💬 Discussion", value: "💬" },
            { label: "Miscellaneous: 🚀 Launch", value: "🚀" }
          ]
        },
        { 
          label: "Select position", 
          type: "select", 
          options: [
            { label: "Prefix", value: "" }, // Set an empty value for Prefix
            { label: "Suffix", value: "suffix" }
          ] 
        },
        { 
          label: "Predefined Options (Advanced - Check+Modify Code Based on your Specific Requirments)", 
          type: "select", 
          options: [
            { label: "Predefined Sample 1: Completed", value: "1" }, 
            { label: "Predefined Sample 2: Ideas", value: "2" }, 
            { label: "Predefined Sample 3: Travel Goals", value: "3" } // More Options can be added as per your Requirements!
          ] 
        }
      ] 
    });
  
    // Log the result of the prompt
    // console.log("Prompt result:", result);
  
    // ------- Check if the user has cancelled the operation -------
    if (!result) {
      // console.log("User cancelled the operation");
      app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
  
    // ------- Destructure user inputs -------
    const [multiTag, singleTag, emoji, position, predefined] = result;
    // console.log("User inputs - multiTag:", multiTag, ", singleTag:", singleTag, ", emoji:", emoji, ", position:", position, ", predefined:", predefined);

    // ------- Handle Note Name Modifications -------
    if (emoji) {
      //const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);
  
      let updatedName = note.name;
  
      if (position === "suffix") {
        updatedName = `${note.name} ${emoji}`; // Add emoji as suffix
        // console.log("Updated name with prefix:", updatedName);
      } else { // old version - //} else if (position === "suffix") {
        updatedName = `${emoji} ${note.name}`; // Add emoji as prefix
        // console.log("Updated name with suffix:", updatedName);
      }
  
      await app.setNoteName(note, updatedName); // Update the note name
      // console.log("Note name updated to:", updatedName);
    }
  
    // ------- Add tags to the note if provided -------
    if (multiTag) {
      // Split the multiTag string by commas into an array of tags
      const tagsArray = multiTag.split(',').map(tag => tag.trim()); // Trim spaces around each tag
      
      // Log the separated tags
      // console.log("Multiple tags to be added:", tagsArray);
      
      // Add each tag to the note separately
      for (const tag of tagsArray) {
        if (tag) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tag);
          // console.log("Added tag:", tag);
        }
      }
      
      //return null; // Return an empty string after adding tags
    }

    // ------- Add single tag preferably new to the note if provided -------
    if (singleTag) {
      await app.addNoteTag({ uuid: app.context.noteUUID }, singleTag);
      // console.log("Single tag added:", singleTag);
      //return null;
    }

    // ------- Handle Predefined Modifications -------
    if (!singleTag && !multiTag && !emoji && !position) {
      // const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);

      // Define variables outside of the conditional blocks
      let prefixz;
      let suffixz;
      let multiTagsz;
      let updatedNamez = note.name;
      // console.log("updatedNamez:", updatedNamez);
  
      if (predefined === "1") {
        prefixz = "✅";
        suffixz = "📝";
        multiTagsz = "completed, reviewed";
      }
      else if (predefined === "2") {
        prefixz = "💡";
        multiTagsz = "ideabox, ideas, thinking";
      }
      else if (predefined === "3") {
        prefixz = "🎯";
        suffixz = "✈️";
        multiTagsz = "travel, goals";
      } 
      // More Options can be added as per your Requirements!
      // Example usage of the variables
      // console.log("Prefix:", prefixz);
      // console.log("Suffix:", suffixz);
      // console.log("Multi Tags:", multiTagsz);

      updatedNamez = `${prefixz}${note.name}${suffixz}`; // Add emoji as prefix or suffix
      await app.setNoteName(note, updatedNamez); // Update the note name
      // console.log("Note name updated to:", updatedNamez);
      
      // Split the multiTag string by commas into an array of tags
      const tagsArrayz = multiTagsz.split(',').map(tagz => tagz.trim()); // Trim spaces around each tag
      // console.log("Multiple tags to be added:", tagsArrayz);
      
      // Add each tag to the note separately
      for (const tagz of tagsArrayz) {
        if (tagz) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tagz);
          // console.log("Added tag:", tagz);
        }
      }
      
    }

    return null; // Return an empty string after adding tags
  }
}