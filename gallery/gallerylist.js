{
  insertText: {
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
      let markdownTable = "| Note | Tags | Created Updated | Images |\n";
      markdownTable += "|------|-----|-----------------|--------|\n";

      function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString(); // Formats date as a locale-specific string
      }

      let markdownDocs = "";

      for (let note of notes) {
        try {
          const noteContent = await app.getNoteContent({ uuid: note.uuid });

          // Define the regex pattern to match image URLs
          const markdownImagePattern = allImages
            ? /!\[.*?\]\((.*?)\)/g // Pattern for all markdown images
            : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)(?:\)|$)/g; // Pattern for Amplenote images

          let matches;
          let images = [];
          const hLine = `---`;

          // Extract image URLs from the note content
          while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
            images.push(matches[1]); // Add image URL to the list
          }

          if (images.length > 0) {
            if (mdTable) {
              // Generate table format if mdTable is true
              const imageLinks = images.map(url => `![image](${url})`).join("<br>"); // Create markdown image links with line breaks
              markdownTable += `| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${formatDateTime(note.created)} ${formatDateTime(note.updated)} | ${imageLinks} |\n`;
            } else {
              // Generate document format if mdTable is false
              const imageLinks = images.map(url => `![image](${url})`).join("<br>"); // Create markdown image links with line breaks
              markdownDocs += `
${hLine}
>- Note: [${note.name}](https://www.amplenote.com/notes/${note.uuid})
> - Tags: ${note.tags}
> - Created: ${formatDateTime(note.created)}
> - Updated: ${formatDateTime(note.updated)}

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
      await app.context.replaceSelection(fresults);
    }
  }
}