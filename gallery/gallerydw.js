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
                options: [ { label: "HTML Download", value: "html" }, { label: "RAW File", value: "raw" }, { label: "JSON", value: "json" }, { label: "Data for HTML", value: "datahtml" } ]
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
                    } else if (dwFormat === "datahtml" || dwFormat === "html") {
                    // Append to htmlDataTemplate
                    htmlDataTemplate += `'![${resultEntry.imagename}](${resultEntry.imageurl})',\n`;
                    }
                }
            }
        } catch (err) {
            console.error("Error while processing note:", note, err);
            continue; // Skip any notes with errors
        }
    }


      htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            border: 2px solid transparent; /* Invisible border */
            padding: 20px;
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        .gallery {
            display: flex;
			justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .gallery-item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 300px;
        }

        .gallery img {
            width: 100%;
            height: auto;
            cursor: pointer;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 5px solid #ffffff;
        }

        .gallery img:hover {
            transform: translateY(-10px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .details-container {
            display: none;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;
            padding: 10px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: auto;
            <!-- max-width: 100%; -->
        }

        .details-container img {
            width: auto;
            height: auto;
            border-radius: 10px;
            border: 5px solid #ffffff;
            margin-bottom: 10px;
        }

        .details-container .details {
            color: #333;
            text-align: center;
            font-size: 16px;
            word-wrap: break-word;
            padding: 5px;
        }

    </style>
</head>


<body>

<div class="container">
    <div class="gallery">
        <!-- Images will be dynamically added here -->
    </div>
</div>

<script>
    const markdownImages = [
${htmlDataTemplate}
    ];

    const gallery = document.querySelector('.gallery');

    markdownImages.forEach(link => {
        const match = link.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
            const altText = match[1];
            const imgUrl = match[2];

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const imgElement = document.createElement('img');
            imgElement.src = imgUrl;
            imgElement.alt = altText;

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');

            const expandedImg = document.createElement('img');
            expandedImg.src = imgUrl;

            const detailsCaption = document.createElement('div');
            detailsCaption.classList.add('details');
            detailsCaption.innerText = altText || 'No description available';

            detailsContainer.appendChild(expandedImg);
            detailsContainer.appendChild(detailsCaption);

            imgElement.onclick = function() {
                if (detailsContainer.style.display === 'flex') {
                    detailsContainer.style.display = 'none';
                } else {
                    // Hide all other expanded images
                    document.querySelectorAll('.details-container').forEach(container => {
                        container.style.display = 'none';
                    });
                    // Show the clicked image's expanded view
                    detailsContainer.style.display = 'flex';
                }
            };

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(detailsContainer);
            gallery.appendChild(galleryItem);
        }
    });
</script>

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
        downloadTextFile(htmlTemplate, "Gallery_HTML.html");
        console.log("htmlDataTemplate:", htmlTemplate);
    }
  }
    
 }
}