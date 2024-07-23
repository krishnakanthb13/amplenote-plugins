{
    replaceText:
      async function (app, text) {
        const textWithFormatting = app.context.selectionContent;
        console.log("Selected Content:", textWithFormatting);
        const result = await app.prompt("Extract your selection to a New Note! Formatted!", {
            inputs: [
                {
                    label: "Select the note to transfer the selected Text!"
                    , placeholder: "Start typing the Note Name!"
                    , type: "note"
                }
    ]
        });
        const noteName = result;
        console.log("Selected note name by the user:", noteName);

        const hLine = `---`;
        const fDate = new Date();
        const textFinal = `${hLine}\n${fDate}\n${textWithFormatting}\n${hLine}`;
        console.log("To be Pasted Content:", textFinal);
      
        const destNoteloc = `[${noteName.name}](https://www.amplenote.com/notes/${noteName.uuid})`;
        console.log("Placeholder Link to Destination Note:", destNoteloc);
      
        await app.insertNoteContent({
            uuid: noteName.uuid
        }, textFinal);
        await app.context.replaceSelection(destNoteloc);
        return null;
    }
}