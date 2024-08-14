{
  appOption: {
    "List!": async function (app) {
      // Prompt the user to select tags and choose options
      const result = await app.prompt("Select Tags from which you want to list of Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)", {
        inputs: [
          {
            label: "Select Tags to filter (Max 10)", 
            type: "tags", 
            limit: 10, 
            placeholder: "Enter tag/'s' (Max 10)"
          },
          {
            label: "Include Non Amplenote Images (Default: Only Amplenote Images)", 
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

      let notes = [];
      let notesByTag = await app.filterNotes({ tag: tagNames });
      notes = notesByTag;
      console.log("notes:", notes);

      let results = [];
      let fresults = "";

      const hLine = `

---

`;
      const introLines = `
# Welcome to your Gallery!
## Here you can find all your Photos in your Amplenote Notes. 
### Either you have selected it in Documentation Format or in a Table Format, you will get the complete list displayed here.
${hLine}
`;
      let markdownTable = "";
      markdownTable += `${introLines}`;
      markdownTable += "| Note | Tags | Created Updated | Images |\n";
      markdownTable += "|------|-----|-----------------|--------|\n";

      function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString(); // Formats date as a locale-specific string
      }

      const regex = /https:\/\/images\.amplenote\.com\/(.+)/;
      const regex2 = /\/([^\/]+)$/;
      const imgRes = "300";
      
      let markdownDocs = "";
      markdownDocs += `${introLines}`;

      for (let note of notes) {
        try {
          const noteContent = await app.getNoteContent({ uuid: note.uuid });

          // Define the regex pattern to match image URLs
          const markdownImagePattern = allImages
            ? /!\[.*?\]\((.*?)\)(?:\n>\s*(.*))?/g // Pattern for all markdown images
            : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)(?:\)|$)\)(\n>\s*(.*))?/g; // Pattern for Amplenote images

          let matches;
          let images = [];
          // console.log("noteContent:",noteContent)
          // Extract image URLs from the note content
            while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
              console.log("matches:",matches)
              const url = matches[1] || matches[2]; // Extract the image URL
              const caption = matches[3] ? matches[3].trim() : ''; // Extract the caption if present, or use an empty string
              // caption needs more work - In multiple locations it is displayed [^X]/n, in others just /n [Needs more workd!]
              images.push({ url, caption }); // Store both the URL and caption in the images array
            }
          
          console.log("images.url:",images.url)
          console.log("images.caption:",images.caption)
          if (images.length > 0) {
              if (mdTable) {
                const imageLinks = images.map(image => {
                  const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                  return image.caption
                    ? `![${imageIdentifier}\\|${imgRes}](${image.url})\n> ${image.caption}`
                    : `![${imageIdentifier}\\|${imgRes}](${image.url})`;
                }).join("<br>");
            
                markdownTable += `| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${formatDateTime(note.created)} ${formatDateTime(note.updated)} | ${imageLinks} |\n`;
              } else {
              // Generate document format if mdTable is false
              //const imageLinks = images.map(url => `![image|${imgRes}](${url})`).join("<br>"); // Create markdown image links with line breaks
                const imageLinks = images.map(image => {
                  const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                  return image.caption
                    ? `![${imageIdentifier}\\|${imgRes}](${image.url})\n> ${image.caption}`
                    : `![${imageIdentifier}\\|${imgRes}](${image.url})`;
                }).join("<br>");
              markdownDocs += `
### Note: [${note.name}](https://www.amplenote.com/notes/${note.uuid})
> Tags: ${note.tags}
> Created: ${formatDateTime(note.created)}
> Updated: ${formatDateTime(note.updated)}

${imageLinks}

${hLine}
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
${hLine}`;
        fresults = markdownTable;
      } else {
        results.push(markdownDocs);
        fresults = markdownDocs;
      }

      console.log("markdownTable:", markdownTable);
      console.log("markdownDocs:", markdownDocs);
      console.log("fresults:", fresults);

      // Display the final results
      console.log("results:", results);
      const now = new Date();
      const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
      const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
      const newNoteName = `Image_Gallery_${YYMMDD}_${HHMMSS}`;
      const newTagName = ['-image-gallery'];
      let noteUUID = await app.createNote(newNoteName, newTagName);
      await app.replaceNoteContent({ uuid: noteUUID }, fresults);
      // return fresults;
      //return null
    }
  }
}