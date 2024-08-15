{
  appOption: {
    "List!": async function (app) {
      // Prompt the user to select tags and choose options
      const result = await app.prompt("Select Details on which you want to list of Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)", {
        inputs: [
          {
            label: "Select Tags to filter (Max 10)", 
            type: "tags", 
            limit: 10, 
            placeholder: "Enter tag/'s' (Max 10)"
          },
          {
            label: "Include Non-Amplenote Images (Default: Only Amplenote Images)", 
            type: "checkbox"
          },
          {
            label: "Get the details in a Table Format! (Default: Notes and their Images)", 
            type: "checkbox"
          }
        ]
      });

      // Extract user inputs
      const [tagNames, allImages, mdTable] = result;
      console.log("tagNames:", tagNames);

      // Filter notes by the selected tags
      let notes = [];
      let notesByTag = await app.filterNotes({ tag: tagNames });
      notes = notesByTag;
      console.log("notes:", notes);

      // Prepare results
      let results = [];
      let finalResults = "";

      // Define horizontal line and introductory lines for the markdown document
      const horizontalLine = `

---

`;
      const introLines = `
# Welcome to your Gallery!
## Here you can find all your Photos in your Amplenote Notes.
### Either you have selected it in Documentation Format or in a Table Format, you will get the complete list displayed here.
${horizontalLine}
`;

      // Initialize markdown table format
      let markdownTable = "";
      markdownTable += `${introLines}`;
      markdownTable += "| Note | Tags | Created | Updated | Images |\n";
      markdownTable += "|------|------|---------|---------|--------|\n";

      // Helper function to format date-time as a locale-specific string
      function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
      }

      // Define regex patterns to extract image URLs
      const regex = /https:\/\/images\.amplenote\.com\/(.+)/;
      const regex2 = /\/([^\/]+)$/;
      const imageResolution = "300";

      // Initialize markdown document format
      let markdownDocs = "";
      markdownDocs += `${introLines}`;

      // Process each note to extract images
      for (let note of notes) {
        try {
          const noteContent = await app.getNoteContent({ uuid: note.uuid });

          // Define regex pattern to match image URLs based on user selection
          const markdownImagePattern = allImages
            ? /!\[.*?\]\((.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g
            : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)(?:\s*\[\^.*?\])?(?:\)|$)\)(?:\n>\s*(.*))?/g;

          let matches;
          let images = [];
          console.log("noteContent:",noteContent)
          // Extract image URLs and captions from the note content
          while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
            console.log("matches:", matches);
            const url = matches[1]; // Extract the image URL
            const caption = matches[2] ? matches[2].trim() : ''; // Extract the caption if present, or use an empty string
            images.push({ url, caption }); // Store both the URL and caption in the images array
          }

          console.log("images.url:", images.map(img => img.url));
          console.log("images.caption:", images.map(img => img.caption));

          if (images.length > 0) {
            if (mdTable) {
              // If table format is selected, format images as table entries
              const imageLinks = images.map(image => {
                const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                return image.caption
                  ? `![${imageIdentifier}\\|${imageResolution}](${image.url})<br>> ${image.caption}`
                  : `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
              }).join("<br>");

              markdownTable += `| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${formatDateTime(note.created)} | ${formatDateTime(note.updated)} | ${imageLinks} |\n`;
            } else {
              // Generate document format if table format is not selected
              const imageLinks = images.map(image => {
                const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                return image.caption
                  ? `![${imageIdentifier}\\|${imageResolution}](${image.url})\n> ${image.caption}`
                  : `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
              }).join("<br>");

              markdownDocs += `
### Note: [${note.name}](https://www.amplenote.com/notes/${note.uuid})
> Tags: ${note.tags}
> Created: ${formatDateTime(note.created)}
> Updated: ${formatDateTime(note.updated)}

${imageLinks}

${horizontalLine}
              `;
            }
          }
        } catch (err) {
          if (err instanceof TypeError) {
            continue; // Skip any notes with errors
          }
        }
      }

      // Store results based on the selected format
      if (mdTable) {
        results.push(markdownTable);
        markdownTable += `
${horizontalLine}`;
        finalResults = markdownTable;
      } else {
        results.push(markdownDocs);
        finalResults = markdownDocs;
      }

      console.log("markdownTable:", markdownTable);
      console.log("markdownDocs:", markdownDocs);
      console.log("finalResults:", finalResults);

      // Generate a new note with the results
      const now = new Date();
      const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
      const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
      const newNoteName = `Image_Gallery_${YYMMDD}_${HHMMSS}`;
      const newTagName = ['-image-gallery'];
      let noteUUID = await app.createNote(newNoteName, newTagName);
      await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
    },
        "Download!": async function (app) {
        // Prompt the user to select tags and choose options
        const result = await app.prompt("Select Details on which you want to Download Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)", {
          inputs: [
            {
              label: "Select Tags to filter (Max 10)", 
              type: "tags", 
              limit: 10, 
              placeholder: "Enter tag/'s' (Max 10)"
            },
            {
              label: "Include Non-Amplenote Images (Default: Only Amplenote Images)", 
              type: "checkbox"
            },
            {
              label: "Select the format that you want to download in!", 
              type: "radio",
              options: [ { label: "HTML", value: 1 }, { label: "RAW File", value: 2 }, { label: "JSON", value: 3 }, { label: "Data for HTML", value: 4 } ]
            }
          ]
        });
      
      }
  }
}