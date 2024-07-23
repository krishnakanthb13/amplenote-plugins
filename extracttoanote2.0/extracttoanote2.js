{
    replaceText: async function (app, text) {
        // Get the selected content from the app's context
        const textWithFormatting = app.context.selectionContent;
        // console.log("Selected Content:", textWithFormatting);

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

        // Prepare the formatted text to be pasted in the new note
        const hLine = `---`;
        const fDate = new Date();
        const textFinal = `${hLine}\n${fDate}\n${textWithFormatting}\n${hLine}`;
        // console.log("To be Pasted Content:", textFinal);

        // Create a placeholder link to the destination note
        const destNoteloc = `[${noteName.name}](https://www.amplenote.com/notes/${noteName.uuid})`;
        // console.log("Placeholder Link to Destination Note:", destNoteloc);

        // Insert the formatted text into the selected note
        await app.insertNoteContent({
            uuid: noteName.uuid
        }, textFinal);

        // Replace the selected content with the link to the destination note
        await app.context.replaceSelection(destNoteloc);

        // Return null to indicate completion
        return null;
    }
}
