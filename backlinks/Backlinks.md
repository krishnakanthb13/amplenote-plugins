---
title: Backlinks
uuid: 20c32cea-b59e-11f0-8c06-cd24a2982805
version: 30
created: '2025-10-30T20:08:43+05:30'
updated: '2025-12-18T13:04:24+05:30'
tags:
  - '-amplenote/mine'
  - '-9-permanent'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Backlinks|
|Icon<!-- {"cell":{"colwidth":105}} -->|menu_open|
|Description|Fetch all the Backlinks to a specific note.|
|Instructions|Output is in an alert form. User can either `Insert into a New Note` or `Download as a Markdown file`.|
\

```
{
  async noteOption(app, noteUUID) {
    const targetNoteHandle = { uuid: noteUUID };
    const noteHandle = await app.findNote({ uuid: noteUUID });
    // console.log("targetNoteHandle",targetNoteHandle);
    const sourceNoteHandles = await app.getNoteBacklinks(targetNoteHandle);
    // console.log("sourceNoteHandles",sourceNoteHandles);
    if (sourceNoteHandles.length > 0) {
      let allContents = [];
      for (const sourceNoteHandle of sourceNoteHandles) {
        const backlinkContents = await app.getNoteBacklinkContents(targetNoteHandle, sourceNoteHandle);
        // console.log("backlinkContents",backlinkContents);
        allContents.push(
          "Note Name: " + sourceNoteHandle.name + "\n" + 
          "Note Tag's: " + sourceNoteHandle.tags + "\n\n" + 
          backlinkContents.join("\n\n")
        );
      }
      allContents.push(
        "> Source Note Name: " + noteHandle.name + "\n" + 
        "> Source Note Tag's: " + noteHandle.tags + "\n" + 
        "> Source Note UUID: " + noteHandle.uuid +
        "\n\n---"
      );
      const actionIndex = await app.alert(allContents.join("\n\n---\n\n"), {
          actions: [
            { icon: "post_add", label: "Insert into New Note", value: "insert" },
            { icon: "download", label: "Download Markdown", value: "download" }
          ],
          preface: "Backlinks Plugin"
      });
      // Perform action - Insert or Download - based on user input.
        if (actionIndex === "insert") {
            // "Insert in new note"
            const uuid = await app.createNote(noteHandle.name + " - Backlinks", [ "-reports/-back-links" ]);
            await app.insertNoteContent({ uuid: uuid }, allContents.join("\n\n---\n\n"));
            // console.log("Inserted into a New Note");
        } else if (actionIndex === "download") {
            // "Download Markdown"
            let blob = new Blob([allContents.join("\n\n---\n\n")], {
                type: "text/markdown;charset=utf-8"
            });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${noteHandle.name}.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // console.log("Markdown Downloaded");
        }
      // console.log("allContents",allContents);
    } else {
      await app.alert("Note has no backlinks");
    }
  }
}
```