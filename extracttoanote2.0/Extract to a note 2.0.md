---
title: Extract to a note 2.0
uuid: ee62e45c-4811-11ef-bd43-6ef34fa959ce
version: 174
created: '2024-07-22T15:35:34+05:30'
tags:
  - '-9-permanent'
  - '-loc/amp/mine'
---

| | |
|-|-|
|name|Extract to a note 2.0<!-- {"cell":{"colwidth":648}} -->|
|icon|notes<!-- {"cell":{"colwidth":648}} -->|
|description|Were you thinking if you have more options and flexibility when you are extracting a part of the context present in a note to a already existing note. Well this plugin got you covered. By default it will cover the selected text by horizontal lines and also add a Time stamp at the end. This can be completed modified based on your personal need by editing the code below!<!-- {"cell":{"colwidth":648}} -->|
|instructions|Please fine the Instructions here = [Extract to a note 2.0 Docs](https://www.amplenote.com/notes/1701987e-48c4-11ef-949a-6ef34fa959ce) <!-- {"cell":{"colwidth":648}} -->|
\

```
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
```