{
  async appOption(app) {
    // Filter notes based on Groups + tags
    let results = new Set();
	let notesGroupNames = new Set();
	let pluginInfo;
	const notesGroup = "plugin";
	const searchWords = [
		"appOption", "dailyJotOption", "eventOption", "imageOption",
		"insertText", "linkOption", "linkTarget", "noteOption",
		"onEmbedCall", "renderEmbed", "replaceText", "taskOption"
	];
	// Function to find words in code blocks
	function findWordsInCodeBlocks(markdown, words) {
		const codeBlockRegex = /```([\s\S]*?)```/g; // Regex to match code blocks
		const matches = [];
		let match;

		while ((match = codeBlockRegex.exec(markdown)) !== null) {
			const codeContent = match[1]; // Content inside the code block
			words.forEach(word => {
				if (codeContent.includes(word)) {
					// matches.push({ word, block: codeContent });
                    matches.push(word); // Store the word itself
				}
			});
		}
		return matches;
	}
    pluginInfo = `## Please find below the details of the Active Plugins and its Options.\n\n`;
	// Filter notes based on empty notes + tags
	let notesG = await app.filterNotes({ group: notesGroup });
	// Sort notes by their name in ascending order
	notesG.sort((a, b) => a.name.localeCompare(b.name));
	// console.log("Sorted notes by name:", notesG);
	for (const noteHandleG of notesG) {
		notesGroupNames.add(`- [${noteHandleG.name || "Untitled Note"}](https://www.amplenote.com/notes/${noteHandleG.uuid})`);
		const markdown = await app.getNoteContent({ uuid: noteHandleG.uuid });
		const foundWords = findWordsInCodeBlocks(markdown, searchWords);
		// Format foundWords as a string with " - " prefix
		const formattedFoundWords = foundWords.map(word => ` - ${word}`).join("\n");
		pluginInfo += `### ${noteHandleG.name}<!-- {"collapsed":true} -->\n`;
		pluginInfo += `${formattedFoundWords}\n\n`;
		// console.log("Plugin Name:", noteHandleG.name);
		// console.log("Found words:", foundWords);
		// console.log("Formatted search words:\n", formattedFoundWords);
	}
    pluginInfo += `\n---`;
	results = new Set(notesGroupNames);
	// console.log("Sorted notesG:", notesG);
	// console.log("Sorted notesGroupNames:", notesGroupNames);
	// console.log("pluginInfo\n", pluginInfo);
	results = Array.from(results);
	const resultText = results.join("\n");
	// Generate the filename based on the current date and time
	const now = new Date();
	const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
	const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

    // Active Plugin List Report
    const APLNoteName = `Active_Plugin_Info`;
    const APLTagName = ['-reports/-active-plugin-info'];
	const APLnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Active Plugins List Note. [Do not Edit!]"];
	  if (existingUUID)
		  return existingUUID;
	  const newUUID = await app.createNote(APLNoteName, APLTagName);
	  await app.setSetting("Active Plugins List Note. [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const APLReport = resultText;
	await app.replaceNoteContent({ uuid: APLnoteUUID }, APLReport);

	const filename = `Active_Plugin_Info_${YYMMDD}_${HHMMSS}`;
	let noteUUID = await app.createNote(`${filename}`, ["-reports/-active-plugin-info"]);
	await app.replaceNoteContent({
		uuid: noteUUID
	}, pluginInfo);
	// console.log("Inserted text into new note with UUID:", noteUUID);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
  }
}