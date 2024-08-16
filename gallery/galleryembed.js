{
  appOption: {
    "List!": async function (app) {
      // Prompt the user to select tags and choose options
      const result = await app.prompt("Select Details on which you want to list of Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)", {
        inputs: [
          {
            label: "Select Tags [OR] (Each tag is searched separately)", 
            type: "tags", 
            limit: 10, 
            placeholder: "Enter tag/'s' (Max 10)"
          },
          {
            label: "Select Tags [AND] (Combined tag is searched)",
            type: "tags", 
            limit: 10, 
            placeholder: "Enter tag/'s' (Max 10)"
          },
          {
            label: "Include Non-Amplenote Images (Default: Only Amplenote Images)", 
            type: "checkbox"
          },
          {
            label: "Get the details in a Table Format! (Default: Document Format!)", 
            type: "checkbox"
          }
        ]
      });

      // Extract user inputs
      const [tagNamesOr, tagNamesAnd, allImages, mdTable] = result;
      // console.log("tagNames:", tagNames);

      // Filter notes by the selected tags
      let notes = [];
      const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
      let filteredNotes = [];
      if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
            if ((Array.isArray(tagsArray) && tagsArray.length > 0)) {
                for (const tag of tagsArray) {
                    const notesByTag = await app.filterNotes({ tag: tag });
                    filteredNotes = [...filteredNotes, ...notesByTag];
                }
            }
            if (tagNamesAnd) {
                const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
                filteredNotes = [...filteredNotes, ...notesByGroup];
            }
      } else {
          const notesByGroup = await app.filterNotes({ group: "^vault" });
          filteredNotes = [...filteredNotes, ...notesByGroup];
      }
      filteredNotes = [...new Set(filteredNotes)]; // remove duplicates
      notes = filteredNotes;

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
          // console.log("noteContent:",noteContent)
          // Extract image URLs and captions from the note content
          while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
            // console.log("matches:", matches);
            const url = matches[1]; // Extract the image URL
            const caption = matches[2] ? matches[2].trim() : ''; // Extract the caption if present, or use an empty string
            images.push({ url, caption }); // Store both the URL and caption in the images array
          }

          // console.log("images.url:", images.map(img => img.url));
          // console.log("images.caption:", images.map(img => img.caption));

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
                  ? `![${imageIdentifier}\\|${imageResolution}](${image.url})\n> ${image.caption}\n\n`
                  : `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
              }).join(" ");

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

      // console.log("markdownTable:", markdownTable);
      // console.log("markdownDocs:", markdownDocs);
      // console.log("finalResults:", finalResults);

      // Generate a new note with the results
      function getCurrentDateTime() {
          const now = new Date();
      
          // Ensure the date is always accurate by using UTC or your local timezone as needed
          const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
          const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
      
          return { YYMMDD, HHMMSS };
      }
      const { YYMMDD, HHMMSS } = getCurrentDateTime();
      const newNoteName = `Image_Gallery_List_${YYMMDD}_${HHMMSS}`;
      const newTagName = ['-image-gallery'];
      let noteUUID = await app.createNote(newNoteName, newTagName);
      await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
    },




    
    
"Download!": async function (app) {
    // Prompt the user to select tags and choose options
    const result = await app.prompt("Select Details on which you want to Download Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)", {
        inputs: [
            {
              label: "Select Tags [OR] (Each tag is searched separately)", 
              type: "tags", 
              limit: 10, 
              placeholder: "Enter tag/'s' (Max 10)"
            },
            {
              label: "Select Tags [AND] (Combined tag is searched)",
              type: "tags", 
              limit: 10, 
              placeholder: "Enter tag/'s' (Max 10)"
            },
            {
                label: "Include Non-Amplenote Images (Default: Document Format!)", 
                type: "checkbox"
            },
            {
                label: "Select the format that you want to download in!", 
                type: "radio",
                options: [ 
                  { label: "HTML Gallery Download (Recommended)", value: "html" },
                  { label: "Markdown Image Links", value: "datahtml" },
                  { label: "Image Properties RAW File", value: "raw" },
                  { label: "Image Properties JSON", value: "json" }
                ]
            }
        ]
    });

      // Extract user inputs
      const [tagNamesOr, tagNamesAnd, allImages, dwFormat] = result;
      // console.log("tagNames:", tagNames);

      // Filter notes by the selected tags
      let notes = [];
      const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
      let filteredNotes = [];
      if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
            if ((Array.isArray(tagsArray) && tagsArray.length > 0)) {
                for (const tag of tagsArray) {
                    const notesByTag = await app.filterNotes({ tag: tag });
                    filteredNotes = [...filteredNotes, ...notesByTag];
                }
            }
            if (tagNamesAnd) {
                const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
                filteredNotes = [...filteredNotes, ...notesByGroup];
            }
      } else {
          const notesByGroup = await app.filterNotes({ group: "^vault" });
          filteredNotes = [...filteredNotes, ...notesByGroup];
      }
      filteredNotes = [...new Set(filteredNotes)]; // remove duplicates
      notes = filteredNotes;

    // Prepare results
    let resultsArray = [];
    let resultsArray2 = [];
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
                // console.log("matches:", matches);
                const url = matches[1]; // Extract the image URL
                const caption = matches[2] ? matches[2].trim() : 'No Caption Available or Unable to Fetch.'; // Extract the caption if present, or use an empty string
                images.push({ url, caption }); // Store both the URL and caption in the images array
            }

            // console.log("images.url:", images.map(img => img.url));
            // console.log("images.caption:", images.map(img => img.caption));
            // console.log("images.length:", images.length);

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
                    // Create an object with named properties
                    let resultEntry2 = {
                        href: image.url,
                        src: image.url,
                        caption: `${image.caption}<br>Notename: ${note.name}, Tags: (${note.tags.join(',')}), UUID: ${note.uuid}`,
                        alt: note.name,
                        tags: `${note.tags.join(',')}`
                    };

                    // Push the object into the results array
                    resultsArray2.push(resultEntry2);
                   }
                }
            }
        } catch (err) {
            console.error("Error while processing note:", note, err);
            continue; // Skip any notes with errors
        }
    }

 
    // console.log("resultsArray:", resultsArray);

      // Generate a new note with the results
      function getCurrentDateTime() {
          const now = new Date();
      
          // Ensure the date is always accurate by using UTC or your local timezone as needed
          const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
          const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
      
          return { YYMMDD, HHMMSS };
      }
      const { YYMMDD, HHMMSS } = getCurrentDateTime();
  
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

    function removeDuplicates(array) {
        const seen = new Set();
        return array.filter(item => {
            const serialized = JSON.stringify(item);
            if (seen.has(serialized)) {
                return false;
            } else {
                seen.add(serialized);
                return true;
            }
        });
    }

    // Determine the format and trigger download
    if (dwFormat === "json") {
        let deduplicatedArray = removeDuplicates(resultsArray);
        let jsonTemplate = JSON.stringify(deduplicatedArray, null, 2);
        downloadTextFile(jsonTemplate, "Gallery_JSON.json");
        // console.log("jsonTemplate:", jsonTemplate);
    } else if (dwFormat === "raw") {
        downloadTextFile(rawTemplate, "Gallery_Raw_Template.txt");
        // console.log("rawTemplate:", rawTemplate);
    } else if (dwFormat === "datahtml") {
        downloadTextFile(htmlDataTemplate, "Gallery_HTML_Data.txt");
        // console.log("htmlDataTemplate:", htmlDataTemplate);
    } else if (dwFormat === "html") {
        let deduplicatedArray2 = removeDuplicates(resultsArray2);
        let jsonTemplate2 = JSON.stringify(deduplicatedArray2, null, 2);

      htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/css/uikit.min.css" />
    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/js/uikit-icons.min.js"></script>
    <style>
        /* Cool background gradient */
        body {
            background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
            padding: 20px;
        }

        /* Container for the images */
        .gallery-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
        }

        /* Image container */
        .gallery-container .uk-inline {
            overflow: hidden;
            border-radius: 10px;
            transition: transform 0.15s ease; /* Speed up transition */
            display: flex; /* Enable flexbox */
            align-items: center; /* Center content vertically */
            justify-content: center; /* Center content horizontally */
            height: auto; /* Set a fixed height if needed */
        }

        /* Hover effect for images */
        .gallery-container .uk-inline:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Image styles */
        .gallery-container img {
            border-radius: 10px;
            max-width: 100%;
            height: auto;
            display: block;
        }

        /* Tag buttons container */
        .tag-buttons {
            text-align: center;
            margin-bottom: 20px;
        }

        /* Button styles */
        .tag-buttons button {
            margin: 5px; /* Adjust this value to control the space between buttons */
        }

        /* Button hover effect */
        .uk-button:hover {
            background-color: #0056b3;
            color: white;
            transform: scale(1.05);
        }

        .uk-button.active {
            background-color: #0056b3;
            color: white;
        }
		/* Footer styles */
		footer {
			position: fixed; /* Fixes the footer at the bottom */
			left: 0; /* Aligns the footer to the far left */
			bottom: 0; /* Aligns the footer to the bottom */
			width: 100%; /* Makes the footer span the full width of the page */
			padding: 10px; /* Adds some padding */
			text-align: left; /* Aligns text to the left */
			margin: 0; /* Removes default margins */
			background: none; /* Removes any background color */
			color: #000; /* Sets text color (adjust as needed) */
			font-size: 14px; /* Adjusts font size */
		}

		footer a {
			color: #ffeb3b; /* Adjust color if needed */
			text-decoration: none;
		}

		footer a:hover {
			text-decoration: underline;
		}
    </style>
</head>
<body>

<div class="uk-h3 uk-text-center"></div>
<div class="tag-buttons" id="tag-buttons">
    <!-- Tag buttons will be injected here -->
</div>
<div id="gallery" class="gallery-container" uk-lightbox="animation: scale; autoplay: true; autoplay-interval: 7000; pause-on-hover: true; velocity: 3">
    <!-- Images will be injected here -->
</div>

<footer>
    <p>&copy; BKK 2024 | <a href="https://bio.site/krishnakanthb13" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
</footer>

<script>
// JSON data
const jsonData = 
${jsonTemplate2}
;

// Function to populate the gallery
function populateGallery(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear existing content
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('uk-inline');
        div.innerHTML = \`
            <a href="\${item.href}" data-caption="\${item.caption}">
               <img src="\${item.src}" alt="\${item.alt}" style="width: 100%; max-width: 300px; height: auto; object-fit: cover;">
            </a>
        \`;
        gallery.appendChild(div);
    });
}

// Function to create and update tag buttons
function updateTagButtons(data) {
    const tagsSet = new Set();
    data.forEach(item => {
        item.tags.split(',').map(tag => tag.trim()).forEach(tag => tagsSet.add(tag));
    });

    const tagButtons = document.getElementById('tag-buttons');
    tagButtons.innerHTML = ''; // Clear existing buttons

    // Create tag buttons ensuring uniqueness
    tagsSet.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'uk-button uk-button-default uk-button-small';
        button.innerHTML = \`
            <span class="uk-margin-small-right" uk-icon="icon: hashtag;"></span>
            \${tag}
        \`;
        button.dataset.tag = tag; // Store tag in data attribute
        button.addEventListener('click', () => toggleTagFilter(button, tag));
        tagButtons.appendChild(button);
    });
}

// Function to toggle filter and button active state
function toggleTagFilter(button, tag) {
    const isActive = button.classList.contains('uk-button-primary');
    
    if (isActive) {
        button.classList.remove('uk-button-primary');
        button.classList.add('uk-button-default');
        button.classList.remove('uk-button-small');
        button.classList.add('uk-button-small');

        // If no other buttons are active, show all images
        if (document.querySelectorAll('#tag-buttons .uk-button-primary').length === 0) {
            populateGallery(jsonData);
        } else {
            filterGallery(); // Apply the current active filters
        }
    } else {
        document.querySelectorAll('#tag-buttons button').forEach(btn => {
            btn.classList.remove('uk-button-primary');
            btn.classList.add('uk-button-default');
            btn.classList.remove('uk-button-small');
            btn.classList.add('uk-button-small');
        });
        button.classList.add('uk-button-primary');
        button.classList.remove('uk-button-default');
        button.classList.add('uk-button-small');
        button.classList.remove('uk-button-small');
        filterByTag(tag);
    }
}

// Function to filter images by tag
function filterByTag(tag) {
    const filteredData = jsonData.filter(item => {
        const tags = item.tags.split(',').map(t => t.trim());
        return tags.includes(tag);
    });
    populateGallery(filteredData);
}

// Function to filter the gallery based on selected tags
function filterGallery() {
    const activeTags = Array.from(document.querySelectorAll('#tag-buttons .uk-button-primary'))
                            .map(button => button.dataset.tag);

    // If no tags are selected, show all images
    if (activeTags.length === 0) {
        populateGallery(jsonData);
        return;
    }

    const filteredData = jsonData.filter(item => {
        const tags = item.tags.split(',').map(t => t.trim());
        return activeTags.some(tag => tags.includes(tag));
    });
    
    populateGallery(filteredData);
}

// Initial setup
updateTagButtons(jsonData);
populateGallery(jsonData);

</script>

</body>
</html>
`;
        downloadTextFile(htmlTemplate, "Gallery_HTML.html");
        // console.log("htmlTemplate:", htmlTemplate);
    }
  },
    
    
    
    
    
    
    "Viewer!": async function (app) {
      const newNoteName = `Gallery: Image_Viewer`;
      const newTagName = ['-image-gallery'];
      let noteUUID = app.settings["Gallery_Image_Viewer_UUID"] || await app.createNote(newNoteName, newTagName);
      await app.setSetting("Gallery_Image_Viewer_UUID", noteUUID);
      await app.replaceNoteContent({ uuid: noteUUID },`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="1" />`);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
    }



    
 },
  async renderEmbed(app, ...args) {

    let notes = [];
    const notesByGroup = await app.filterNotes({ group: "^vault" });
    notes = notesByGroup;
    let resultsArray2 = [];
    let htmlTemplate = "";
    const regex2 = /\/([^\/]+)$/;
    
    for (let note of notes) {
        try {
            const noteContent = await app.getNoteContent({ uuid: note.uuid });
            const markdownImagePattern = /!\[.*?\]\((.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g;
            let matches;
            let images = [];
            while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
                const url = matches[1]; // Extract the image URL
                const caption = matches[2] ? matches[2].trim() : 'No Caption Available or Unable to Fetch.'; // Extract the caption if present, or use an empty string
                images.push({ url, caption }); // Store both the URL and caption in the images array
            }
            if (images.length > 0) {
                for (let image of images) {
                    const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                    let resultEntry2 = {
                        href: image.url,
                        src: image.url,
                        caption: `${image.caption}<br>Notename: ${note.name}, Tags: (${note.tags.join(',')}), UUID: ${note.uuid}`,
                        alt: note.name,
                        tags: `${note.tags.join(',')}`
                    };
                    resultsArray2.push(resultEntry2);
                }
            }
        } catch (err) {
            console.error("Error while processing note:", note, err);
            continue; // Skip any notes with errors
        }
      }

      const now = new Date();
      const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
      const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    
      function removeDuplicates(array) {
          const seen = new Set();
          return array.filter(item => {
              const serialized = JSON.stringify(item);
              if (seen.has(serialized)) {
                  return false;
              } else {
                  seen.add(serialized);
                  return true;
              }
          });
      }
    
        let deduplicatedArray2 = removeDuplicates(resultsArray2);
        let jsonTemplate2 = JSON.stringify(deduplicatedArray2, null, 2);

      htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/css/uikit.min.css" />
    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.21.9/dist/js/uikit-icons.min.js"></script>
    <style>
        /* Cool background gradient */
        body {
            background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
            padding: 20px;
        }

        /* Container for the images */
        .gallery-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
        }

        /* Image container */
        .gallery-container .uk-inline {
            overflow: hidden;
            border-radius: 10px;
            transition: transform 0.15s ease; /* Speed up transition */
            display: flex; /* Enable flexbox */
            align-items: center; /* Center content vertically */
            justify-content: center; /* Center content horizontally */
            height: auto; /* Set a fixed height if needed */
        }

        /* Hover effect for images */
        .gallery-container .uk-inline:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        /* Image styles */
        .gallery-container img {
            border-radius: 10px;
            max-width: 100%;
            height: auto;
            display: block;
        }

        /* Tag buttons container */
        .tag-buttons {
            text-align: center;
            margin-bottom: 20px;
        }

        /* Button styles */
        .tag-buttons button {
            margin: 5px; /* Adjust this value to control the space between buttons */
        }

        /* Button hover effect */
        .uk-button:hover {
            background-color: #0056b3;
            color: white;
            transform: scale(1.05);
        }

        .uk-button.active {
            background-color: #0056b3;
            color: white;
        }
		/* Footer styles */
		footer {
			position: fixed; /* Fixes the footer at the bottom */
			left: 0; /* Aligns the footer to the far left */
			bottom: 0; /* Aligns the footer to the bottom */
			width: 100%; /* Makes the footer span the full width of the page */
			padding: 10px; /* Adds some padding */
			text-align: left; /* Aligns text to the left */
			margin: 0; /* Removes default margins */
			background: none; /* Removes any background color */
			color: #000; /* Sets text color (adjust as needed) */
			font-size: 14px; /* Adjusts font size */
		}

		footer a {
			color: #ffeb3b; /* Adjust color if needed */
			text-decoration: none;
		}

		footer a:hover {
			text-decoration: underline;
		}
    </style>
</head>
<body>

<div class="uk-h3 uk-text-center"></div>
<div class="tag-buttons" id="tag-buttons">
    <!-- Tag buttons will be injected here -->
</div>
<div id="gallery" class="gallery-container" uk-lightbox="animation: scale; autoplay: true; autoplay-interval: 7000; pause-on-hover: true; velocity: 3">
    <!-- Images will be injected here -->
</div>

<footer>
    <p>&copy; BKK 2024 | <a href="https://bio.site/krishnakanthb13" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
</footer>

<script>
// JSON data
const jsonData = 
${jsonTemplate2}
;

// Function to populate the gallery
function populateGallery(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear existing content
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('uk-inline');
        div.innerHTML = \`
            <a href="\${item.href}" data-caption="\${item.caption}">
               <img src="\${item.src}" alt="\${item.alt}" style="width: 100%; max-width: 300px; height: auto; object-fit: cover;">
            </a>
        \`;
        gallery.appendChild(div);
    });
}

// Function to create and update tag buttons
function updateTagButtons(data) {
    const tagsSet = new Set();
    data.forEach(item => {
        item.tags.split(',').map(tag => tag.trim()).forEach(tag => tagsSet.add(tag));
    });

    const tagButtons = document.getElementById('tag-buttons');
    tagButtons.innerHTML = ''; // Clear existing buttons

    // Create tag buttons ensuring uniqueness
    tagsSet.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'uk-button uk-button-default uk-button-small';
        button.innerHTML = \`
            <span class="uk-margin-small-right" uk-icon="icon: hashtag;"></span>
            \${tag}
        \`;
        button.dataset.tag = tag; // Store tag in data attribute
        button.addEventListener('click', () => toggleTagFilter(button, tag));
        tagButtons.appendChild(button);
    });
}

// Function to toggle filter and button active state
function toggleTagFilter(button, tag) {
    const isActive = button.classList.contains('uk-button-primary');
    
    if (isActive) {
        button.classList.remove('uk-button-primary');
        button.classList.add('uk-button-default');
        button.classList.remove('uk-button-small');
        button.classList.add('uk-button-small');

        // If no other buttons are active, show all images
        if (document.querySelectorAll('#tag-buttons .uk-button-primary').length === 0) {
            populateGallery(jsonData);
        } else {
            filterGallery(); // Apply the current active filters
        }
    } else {
        document.querySelectorAll('#tag-buttons button').forEach(btn => {
            btn.classList.remove('uk-button-primary');
            btn.classList.add('uk-button-default');
            btn.classList.remove('uk-button-small');
            btn.classList.add('uk-button-small');
        });
        button.classList.add('uk-button-primary');
        button.classList.remove('uk-button-default');
        button.classList.add('uk-button-small');
        button.classList.remove('uk-button-small');
        filterByTag(tag);
    }
}

// Function to filter images by tag
function filterByTag(tag) {
    const filteredData = jsonData.filter(item => {
        const tags = item.tags.split(',').map(t => t.trim());
        return tags.includes(tag);
    });
    populateGallery(filteredData);
}

// Function to filter the gallery based on selected tags
function filterGallery() {
    const activeTags = Array.from(document.querySelectorAll('#tag-buttons .uk-button-primary'))
                            .map(button => button.dataset.tag);

    // If no tags are selected, show all images
    if (activeTags.length === 0) {
        populateGallery(jsonData);
        return;
    }

    const filteredData = jsonData.filter(item => {
        const tags = item.tags.split(',').map(t => t.trim());
        return activeTags.some(tag => tags.includes(tag));
    });
    
    populateGallery(filteredData);
}

// Initial setup
updateTagButtons(jsonData);
populateGallery(jsonData);

</script>

</body>
</html>
`;
        return(htmlTemplate);

}
}