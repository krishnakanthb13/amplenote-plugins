{
  async appOption(app) {
    // Function to find specific words within code blocks in a markdown string
    const findWordsInCodeBlocks = (markdown, words) => {
      const codeBlockRegex = /```([\s\S]*?)```/g; // Matches code blocks enclosed by ```
      const matches = [];
      let match;

      // Iterate through all code blocks
      while ((match = codeBlockRegex.exec(markdown)) !== null) {
        const codeContent = match[1]; // Extract content inside the code block
        words.forEach(word => {
          if (codeContent.includes(word)) {
            matches.push(word); // Add the word if found in the code block
          }
        });
      }
      return matches;
    };

    // Plugin-related constants and search words
    const notesGroup = "plugin";
    const searchWords = [
      "appOption", "dailyJotOption", "eventOption", "imageOption",
      "insertText", "linkOption", "linkTarget", "noteOption",
      "onEmbedCall", "renderEmbed", "replaceText", "taskOption"
    ];

    // Generate a summary report for active plugins and their options
    let pluginInfo = `## Active Plugins and Their Options\n\n`;
    let notesGroupNames = new Set();

    // Fetch notes in the specified group and sort them by name
    const notesG = await app.filterNotes({ group: notesGroup });
    notesG.sort((a, b) => a.name.localeCompare(b.name));

    // Iterate through notes to extract and format plugin information
    for (const noteHandleG of notesG) {
      const noteName = noteHandleG.name || "Untitled Note";
      const noteUUID = noteHandleG.uuid;

      // Add note name to the group names
      notesGroupNames.add(`- [${noteName}](https://www.amplenote.com/notes/${noteUUID})`);

      // Extract content and find relevant words in code blocks
      const markdown = await app.getNoteContent({ uuid: noteUUID });
      const foundWords = findWordsInCodeBlocks(markdown, searchWords);
      const formattedFoundWords = foundWords.map(word => ` - ${word}`).join("\n");

      // Append plugin details to the report
      pluginInfo += `### ${noteName}<!-- {"collapsed":true} -->\n`;
      pluginInfo += `${formattedFoundWords}\n\n`;
    }

    // Finalize plugin info and group names
    pluginInfo += `\n---`;
    const results = Array.from(notesGroupNames);
    const resultText = results.join("\n");

    // Generate a timestamped filename
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Active_Plugin_Info_${YYMMDD}_${HHMMSS}`;

    // Create or update the Active Plugins List report note
    const APLNoteName = `Active_Plugin_Info`;
    const APLTagName = ['-reports/-active-plugin-info'];
    const APLnoteUUID = await (async () => {
      const existingUUID = await app.settings["Active Plugins List Note. [Do not Edit!]"];
      if (existingUUID) return existingUUID;

      const newUUID = await app.createNote(APLNoteName, APLTagName);
      await app.setSetting("Active Plugins List Note. [Do not Edit!]", newUUID);
      return newUUID;
    })();

    // Update or create the report notes
    await app.replaceNoteContent({ uuid: APLnoteUUID }, resultText);
    const noteUUID = await app.createNote(`${filename}`, ["-reports/-active-plugin-info"]);
    await app.replaceNoteContent({ uuid: noteUUID }, pluginInfo);

    // Navigate to the new note
    await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
  }
}
