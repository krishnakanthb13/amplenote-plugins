{
  // Define an asynchronous function 'noteOption' that takes 'app' and 'noteUUID' as parameters
  async insertText(app, noteUUID) {
    const note = app.findNote({uuid: app.context.noteUUID})
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
    // ------- Check if the user has cancelled the operation -------
    if (!result) {
      app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
    // ------- Destructure user inputs -------
    const [multiTag, singleTag, emoji, position] = result;
    // ------- Handle Note Name Modifications -------
    if (emoji && position) {
      const noteHandle = await app.findNote({uuid: noteUUID}); // Find the note using UUID
      let updatedName = noteHandle.name;
      if (position === "prefix") {
        updatedName = `${emoji} ${noteHandle.name}`; // Add emoji as prefix
      } else if (position === "suffix") {
        updatedName = `${noteHandle.name} ${emoji}`; // Add emoji as suffix
      }
      await app.setNoteName(noteHandle, updatedName); // Update the note name
    }
    // ------- Add tags to the note if provided -------
    if (multiTag) {
      await app.addNoteTag({uuid: app.context.noteUUID}, multiTag);
      return "";
    }
    if (singleTag) {
      await app.addNoteTag({uuid: app.context.noteUUID}, singleTag);
      return "";
    }
  }
}