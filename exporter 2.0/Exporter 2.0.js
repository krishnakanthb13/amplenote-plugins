{
  appOption: {
    "Tag - Obsidian": async function(app) {
      try {
        await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js");
        const result = await app.prompt(
          "What tag' do you want to export? (Obsidian Compatible)", 
          {
            inputs: [
              {
                label: "Select Tag",
                type: "tags",
                limit: 1,
              },
            ]
          }
        );
        if (!result) {
          await app.alert("Please select a Tag, upto 5 Tags at a Time.");
          return;
        }
		const searchResults = await app.filterNotes({tag: result});
		console.log(searchResults);

        if (!searchResults) {
          await app.alert("No notes found with this tag.");
          return;
        }
		
		app.alert("Exporter 2.0 is working in the background to get you an Export that you can utilize; this may take a few minutes depending on the number of notes and their data. Note: For best experience, use Desktop Application. (It would be slow in the Web App or the Web Version of the Application.)");
		
		// Generate the filename based on the current date and time
		const now = new Date();
		const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
		const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

		// Audit Report
		const auditNoteName = `Exporter 2.0 Audit`;
		const auditTagName = ['-reports/-exporter-2'];

		const auditnoteUUID = await (async () => {
		  const existingUUID = await app.settings["Exporter_2.0_Audit_UUID [Do not Edit!]"];
		  if (existingUUID) 
			  return existingUUID;
		  const newUUID = await app.createNote(auditNoteName, auditTagName);
		  await app.setSetting("Exporter_2.0_Audit_UUID [Do not Edit!]", newUUID);
		  return newUUID;
		})();

        let fileContents = [];
        const progressNotename = `${YYMMDD}_${HHMMSS} Log Report`
		const progressNoteUUID = await app.createNote(progressNotename, auditTagName);
        const progressNote = await app.findNote({uuid: progressNoteUUID});
        await app.navigate(
          `https://www.amplenote.com/notes/${progressNote.uuid}`
        );

		  (async () => {
			try {
			  const auditReport = `- <mark>Exporter 2.0 (Obsidian):</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Selected Tags:** [${result}]</mark>; **Report Status:** [${progressNotename}](https://www.amplenote.com/notes/${progressNote.uuid})`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${uuid}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();

		await app.insertNoteContent(
		 progressNote,
		 `Export 2.0 has started... ${new Date().toLocaleTimeString()}`
		);

		await this._noteprocessingcode(app, searchResults, progressNote, fileContents);

		await app.insertNoteContent(
          progressNote,
          `Note: For Larger number of notes, it might take a longer time to complete (Depends on the device configuration as well).\nStarted - Creating zip file... ${new Date().toLocaleTimeString()}.`
        );
        const zipBlob = await this._createZipBlob(fileContents);
        await app.saveFile(zipBlob, `${ result.trim() }.zip`);
        await app.insertNoteContent(
          progressNote,
          `Successfully Completed! ${new Date().toLocaleTimeString()}`
        );

		app.alert("Exporter 2.0 has Successfully Completed.");

      } catch (err) {
        await app.alert(err);
      }
    },
  },
  noteOption: {
    "Obsidian": async function(app, noteUUID) {
      try {
        await this._loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js");
		
		const searchResults = [await app.findNote({ uuid: noteUUID })];
		console.log(searchResults);
		
		// Generate the filename based on the current date and time
		const now = new Date();
		const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
		const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

		// Audit Report
		const auditNoteName = `Exporter 2.0 Audit`;
		const auditTagName = ['-reports/-exporter-2'];

		const auditnoteUUID = await (async () => {
		  const existingUUID = await app.settings["Exporter_2.0_Audit_UUID [Do not Edit!]"];
		  if (existingUUID) 
			  return existingUUID;
		  const newUUID = await app.createNote(auditNoteName, auditTagName);
		  await app.setSetting("Exporter_2.0_Audit_UUID [Do not Edit!]", newUUID);
		  return newUUID;
		})();

        let fileContents = [];

		  (async () => {
			try {
			  const auditReport = `- <mark>Exporter 2.0 (Obsidian):</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Export UUID:** [${noteUUID}]`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${uuid}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();
		  
		const progressNote = "";

		await this._noteprocessingcode(app, searchResults, progressNote, fileContents);
		
		const sanitizedTitle = `${fileContents[0].title.replace(/\//g, '-')}`;
		const sanitizedContent = `${fileContents[0].content}`;
		
		await this._downloadMarkdown(sanitizedContent, sanitizedTitle);

		app.alert("Exporter 2.0 has Successfully Completed.");

      } catch (err) {
        await app.alert(err);
      }		

	},
  },

	async _noteprocessingcode(app, searchResults, progressNote, fileContents) {
		 
        let index = 0;
        for (const noteHandle of searchResults) {

          if (progressNote) {
			  await app.insertNoteContent(
				progressNote,
				`Processing note ${ index + 1}/${ searchResults.length }...`
			  );
		  }
          const note = await app.findNote(noteHandle);
          const content = await app.getNoteContent(note);
		  const yamlFormatted = noteHandle.tags.map(item => `  - '${item}'`).join('\n');
		  const allContent = `---\ntitle: ${noteHandle.name}\nuuid: ${noteHandle.uuid}\ncreated: ${noteHandle.created}\ntag:\n${yamlFormatted}\n---\n${content}`;

			// Remove empty lines
			const allContentWithoutEmptyLines = allContent
			  .split('\n')
			  .filter(line => line.trim() !== '' && !line.trim().startsWith('\\'))
			  .join('\n');
			// console.log(allContentWithoutEmptyLines);

			// Replace `**xyz**` with `*xyz*` (expandable for other patterns)
			const replacePatterns = [
				// { pattern: /^---$/gm, replacement: '\n---\n' }, // --- into a line break with \n---\n
				{ pattern: /\*\*(.*?)\*\*/g, replacement: '<b>$1</b>' }, // To replace markdown-style **Bold Text** with HTML <b>Bold Text</b>
				{ pattern: /\*(.*?)\*/g, replacement: '<i>$1</i>' }, // To replace markdown-style *Italic Text* with HTML <i>Italic Text</i>
				{ pattern: /~~(.*?)~~/g, replacement: '<del>$1</del>' }, // To replace markdown-style ~~Strikethrough Text~~ with HTML <del>Strikethrough Text</del>
				{ pattern: /`(.*?)`/g, replacement: '<code>$1</code>' }, // To replace markdown-style `Inline code` with HTML <code>Inline code</code>
				{ pattern: /<mark>(.*?)<\/mark>/g, replacement: '==$1==' }, // <mark>xyz</mark> to ==xyz== (Hightlight)
				{ pattern: /<!--\s*\{"fullWidth":true\}\s*-->/g, replacement: '' }, // removing - Toggle full width of table
				{ pattern: /<!--\s*\{"collapsed":true\}\s*-->/g, replacement: '' }, // removing - Collapsed Header
				// { pattern: /\\*$/g, replacement: '' }, // removes "\" at the end of the sentence
				// { pattern: /\\\s*$/g, replacement: '' },
				{ pattern: /\\\s*$/gm, replacement: ''}, // Removes trailing backslash followed by optional whitespace at end of line
				{ pattern: /\\\\\s*$/gm, replacement: ''}, // Removes escaped backslash followed by optional whitespace at end of line
				{ pattern: /<!--\s*\{"omit":true\}\s*-->/g, replacement: '' } // removes omit at the end of the page
			];
			let processedContent = allContentWithoutEmptyLines;
			replacePatterns.forEach(({ pattern, replacement }) => {
				processedContent = processedContent.replace(pattern, replacement);
			});
			// console.log(processedContent);

			function processMarkdownToHtml(text) {
			  // Replace markdown marks and comments with HTML
			  const patterns = [
				{
				  pattern: /<mark style="color:(#[A-F0-9a-f]{3,6});">(.*?)<!--\s*\{"cycleColor":"\d+"\}\s*--><\/mark>/g,
				  replacement: (_, colorCode, content) => `<span style="color: ${colorCode};">${content}</span>`
				},
				{
				  pattern: /<mark style="background-color:(#[A-F0-9a-f]{3,6});">(.*?)<!--\s*\{"backgroundCycleColor":"\d+"\}\s*--><\/mark>/g,
				  replacement: (_, backgroundColorCode, content) => `<span style="background-color: ${backgroundColorCode};">${content}</span>`
				}
			  ];

			  return patterns.reduce((str, { pattern, replacement }) => 
				str.replace(pattern, replacement), text);
			}
			processedContent = processMarkdownToHtml(processedContent);

			async function updateMarkdownContent(markdown) {
			  // Split the markdown content into lines
			  const lines = markdown.split('\n');

			  // Process each line to find UUID comments
			  for (let i = 0; i < lines.length; i++) {
				const match = lines[i].match(/<!--\s*\{"uuid":"([a-f0-9\-]+)"\}\s*-->/);

				if (match) {
				  const taskUUID = match[1]; // Extract the UUID from the match
				  try {
					// Fetch the task details
					const task = await app.getTask(taskUUID);
					const taskDetails = JSON.stringify(task)
					  .replace(/{|}/g, '') // Remove curly braces
					  .replace(/"/g, "'") // Replace double quotes with single quotes
					  .replace(/,/g, ',\n - '); // Add a newline after each comma

					// Replace the UUID comment with the task details
					lines[i] = lines[i].replace(match[0], `\n- ${taskDetails}`);
				  } catch (error) {
					console.error(`Error fetching task for UUID ${taskUUID}:`, error);
				  }
				}
			  }

			  // Join the lines back into a single markdown string
			  return lines.join('\n');
			}

			processedContent = await updateMarkdownContent(processedContent);

          fileContents.push({
            title: note.name || "Untitled Note",
            content: processedContent || "Empty Content"
          });
          index = index + 1;

        }

	},

	async _createZipBlob(notes) {
	   const zip = new JSZip();
	   const CHUNK_SIZE = 50; // Larger chunks for speed
	   
	   for (let i = 0; i < notes.length; i += CHUNK_SIZE) {
		   const chunk = notes.slice(i, i + CHUNK_SIZE);
		   await Promise.all(chunk.map(note => {
			   const sanitizedTitle = note.title.replace(/\//g, '-');
			   return zip.file(`${sanitizedTitle}.md`, note.content, {
				   compression: 'STORE', // No compression
				   streamFiles: true,
				   compressionOptions: { level: 0 }
			   });
		   }));
	   }

	   return zip.generateAsync({
		   type: "uint8array",
		   streamFiles: true,
		   compression: 'STORE',
		   compressionOptions: { level: 0 }
	   }).then(data => new Blob([data], {type: "application/zip"}));
	},

	async _loadScript(url) {
	  return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = url;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	  });
	},

	_downloadMarkdown(content, filename) {
		const blob = new Blob([content], {
			type: "text/markdown;charset=utf-8"
		});
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = `${filename}.md`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},

}