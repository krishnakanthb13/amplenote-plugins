{
    replaceText: async function (app, text) {
        // Get the selected content from the app's context
        const textWithFormatting = app.context.selectionContent.toLocaleString();
        // console.log("Selected Content:", textWithFormatting);
		// const textNotehandle = app.context.noteUUID;
		// console.log("Selected Content Location:", textNotehandle);
		const textNoteHandle = await app.findNote({ uuid: app.context.noteUUID });
		// console.log("Selected Content Location:", textNoteHandle);

        // Prompt the user to select a note to transfer the selected text
        const result = await app.prompt("Extract your selection to a New Note! Formatted!", {
            inputs: [
                {
                    label: "Select the note to transfer the selected Text!",
                    placeholder: "Start typing the Note Name!",
                    type: "note"
                }
            ]
        });
        
        // Get the note name selected by the user
        const noteName = result;
        // console.log("Selected note name by the user:", noteName);
		
        const srcNoteloc = `[${textNoteHandle.name}](https://www.amplenote.com/notes/${textNoteHandle.uuid})`;
		// console.log("Placeholder Link to Source Note:", srcNoteloc);		

        // Prepare the formatted text to be pasted in the new note
        const hLine = `---`;
        const fDate = new Date();
        const textFinal = `
${hLine}
> Below Data was Extracted here From: ${srcNoteloc} on - *${fDate}*.

${textWithFormatting}

${hLine}

`;

       //- Below Data was Extracted here on - *${fDate}*
       //  Below Data was Extracted here on - *${fDate}*
       //> Below Data was Extracted here on - *${fDate}*

      // console.log("To be Pasted Content:", textFinal);

        // Create a placeholder link to the destination note
        const options = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZoneName: 'short'
        };
        const formattedDate = fDate.toLocaleString('en-US', options).replace(/,\s\w{3}$/,"");
        //console.log(formattedDate);
        const destNoteloc = `[${noteName.name}](https://www.amplenote.com/notes/${noteName.uuid})`;
        const destNotelocF = `TO: ${destNoteloc} and Data was Extracted on *${formattedDate}*.`;
        // console.log("Placeholder Link to Destination Note:", destNoteloc);

        // Insert the formatted text into the selected note
        await app.insertNoteContent({
            uuid: noteName.uuid
        }, textFinal);

        // Replace the selected content with the link to the destination note
        await app.context.replaceSelection(destNotelocF);

        // Return null to indicate completion
        return null;
    }
}