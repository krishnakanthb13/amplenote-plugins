{
  // Define an asynchronous function 'noteOption' that takes 'app' and 'noteUUID' as parameters
  async insertText(app, noteUUID) {
    // Log the start of the function
    console.log("Starting insertText function");
  
    // Find the note using the UUID
    const note = await app.findNote({uuid: app.context.noteUUID});
    console.log("Note found:", note);
  
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
            { label: "Prefix", value: "prefix", default: true },
            { label: "Suffix", value: "suffix" }
          ] 
        }
      ] 
    });
  
    // Log the result of the prompt
    console.log("Prompt result:", result);
  
    // ------- Check if the user has cancelled the operation -------
    if (!result) {
      console.log("User cancelled the operation");
      app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
  
    // ------- Destructure user inputs -------
    const [multiTag, singleTag, emoji, position] = result;
    console.log("User inputs - multiTag:", multiTag, ", singleTag:", singleTag, ", emoji:", emoji, ", position:", position);
  
    // ------- Handle Note Name Modifications -------
    if (emoji && position) {
      const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      console.log("Note handle found:", noteHandle);
  
      let updatedName = noteHandle.name;
  
      if (position === "prefix") {
        updatedName = `${emoji} ${noteHandle.name}`; // Add emoji as prefix
        console.log("Updated name with prefix:", updatedName);
      } else if (position === "suffix") {
        updatedName = `${noteHandle.name} ${emoji}`; // Add emoji as suffix
        console.log("Updated name with suffix:", updatedName);
      }
  
      await app.setNoteName(noteHandle, updatedName); // Update the note name
      console.log("Note name updated to:", updatedName);
    }
  
    // ------- Add tags to the note if provided -------
    if (multiTag) {
      // Split the multiTag string by commas into an array of tags
      const tagsArray = multiTag.split(',').map(tag => tag.trim()); // Trim spaces around each tag
      
      // Log the separated tags
      console.log("Multiple tags to be added:", tagsArray);
      
      // Add each tag to the note separately
      for (const tag of tagsArray) {
        if (tag) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tag);
          console.log("Added tag:", tag);
        }
      }
      
      return ""; // Return an empty string after adding tags
    }

    // ------- Add single tag preferably new to the note if provided -------
    if (singleTag) {
      await app.addNoteTag({ uuid: app.context.noteUUID }, singleTag);
      console.log("Single tag added:", singleTag);
      return "";
    }
  }
}