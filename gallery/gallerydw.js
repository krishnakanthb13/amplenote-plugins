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
                options: [ 
                  { label: "HTML Gallery Download", value: "html" },
                  { label: "Markdown Image Links", value: "datahtml" },
                  { label: "Image Properties RAW File", value: "raw" },
                  { label: "Image Properties JSON", value: "json" }
                ]
            }
        ]
    });

    // Extract user inputs
    const [tagNames, allImages, dwFormat] = result;
    console.log("tagNames:", tagNames);

    // Filter notes by the selected tags
    let notes = [];
    let notesByTag = await app.filterNotes({ tag: tagNames });
    notes = notesByTag;
    console.log("notes:", notes);

    // Prepare results
    let resultsArray = [];
    let htmlTemplate = "";
    let rawTemplate = "";
    let htmlDataTemplate = "";

    // Helper function to format date-time as a locale-specific string
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    }

  // Define regex patterns to extract image URLs
  const regex = /https:\/\/images\.amplenote\.com\/(.+)/;
  const regex2 = /\/([^\/]+)$/;

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
            
            // Extract image URLs and captions from the note content
            while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
                console.log("matches:", matches);
                const url = matches[1]; // Extract the image URL
                const caption = matches[2] ? matches[2].trim() : 'No Caption Available or Unable to Fetch.'; // Extract the caption if present, or use an empty string
                images.push({ url, caption }); // Store both the URL and caption in the images array
            }

            console.log("images.url:", images.map(img => img.url));
            console.log("images.caption:", images.map(img => img.caption));
            console.log("images.length:", images.length);

            if (images.length > 0) {
                for (let image of images) {
                    const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                    
                    // Create an object with named properties
                    let resultEntry = {
                        notetags: note.tags.join(','), // Note tags (assuming tags is an array)
                        notelink: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`, // Note link
                        noteurl: `https://www.amplenote.com/notes/${note.uuid}`, // Note URL
                        notename: note.name, // Note name
                        noteuuid: note.uuid, // Note UUID
                        notecreated: formatDateTime(note.created), // Note created datetime
                        noteupdated: formatDateTime(note.updated), // Note updated datetime
                        imageurl: image.url, // Image URL
                        imagename: imageIdentifier, // Image identifier (from the URL)
                        caption: image.caption // Image caption
                    };

                    // Push the object into the results array
                    resultsArray.push(resultEntry);

                    if (dwFormat === "raw") {
                    // Append to rawTemplate
                    rawTemplate += `${resultEntry.notetags},${resultEntry.notelink},${resultEntry.noteurl},${resultEntry.notename},${resultEntry.noteuuid},${resultEntry.notecreated},${resultEntry.noteupdated},${resultEntry.imageurl},${resultEntry.imagename},${resultEntry.caption}\n`;
                    } else if (dwFormat === "datahtml") {
                    // Append to htmlDataTemplate
                    htmlDataTemplate += `'![${resultEntry.imagename}](${resultEntry.imageurl})',\n`;
                    } else if (dwFormat === "html") {
                    // Append to htmlDataTemplate
                    // Create an object with named properties
                    htmlTemplate += `
<a href="${image.url}" data-lightbox="gallery" data-title="${image.caption}<br>Notename: ${note.name}, Tags: (${note.tags.join(',')}), UUID: ${note.uuid}">
    <img src="${image.url}" alt="${image.caption}">
</a><br>
`                   }
                }
            }
        } catch (err) {
            console.error("Error while processing note:", note, err);
            continue; // Skip any notes with errors
        }
    }


      const htmlTemplatez = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <!-- Lightbox CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css" rel="stylesheet">
    <style>
        /* Gallery styles */
        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .gallery-item {
            flex: 1 1 calc(33.333% - 20px); /* Responsive 3-column layout */
            margin-bottom: 10px;
        }
        .gallery-item img {
            width: 100%;
            height: auto;
            display: block;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
${htmlTemplate}
</body>
</html>
`;
  
    console.log("resultsArray:", resultsArray);

      // Generate a new note with the results
      const now = new Date();
      const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
      const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
  
    // Function to download the data as a text file
    function downloadTextFile(resultText, filename) {
        let blob = new Blob([resultText], {
            type: "text/plain;charset=utf-8"
        });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${YYMMDD}_${HHMMSS}_${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Determine the format and trigger download
    if (dwFormat === "json") {
        let jsonTemplate = JSON.stringify(resultsArray, null, 2);
        downloadTextFile(jsonTemplate, "Gallery_JSON.json");
        console.log("jsonTemplate:", jsonTemplate);
    } else if (dwFormat === "raw") {
        downloadTextFile(rawTemplate, "Gallery_Raw_Template.txt");
        console.log("rawTemplate:", rawTemplate);
    } else if (dwFormat === "datahtml") {
        downloadTextFile(htmlDataTemplate, "Gallery_HTML_Data.txt");
        console.log("htmlDataTemplate:", htmlDataTemplate);
    } else if (dwFormat === "html") {
        downloadTextFile(htmlTemplatez, "Gallery_HTML.html");
        console.log("htmlTemplatez:", htmlTemplatez);
    }
  }
    
 }
}