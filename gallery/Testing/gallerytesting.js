{
appOption: {
/* ----------------------------------- */
"List!": async function (app) {
    // Prompt the user to select tags and choose options
    const result = await app.prompt(
        "Select Details on which you want to list of Images (Note: This will not be creating any new Images in Amplenote Domain!, Just uses the URL)",
        {
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
                },
                {
                    label: "Get finer filtering, by Header Segregation! (Default: Note Segregation!)",
                    type: "checkbox"
                }
            ]
        }
    );

      // Extract user inputs
      const [tagNamesOr, tagNamesAnd, allImages, mdTable, headerSeg] = result;
      // console.log("tagNames:", tagNames);
	  // if (!result) { return null; }
      if (!tagNamesOr && !tagNamesAnd) {
          app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
          return;
      }

    // Initialize arrays for notes and filtered notes
    let notes = [];
    const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
    let filteredNotes = [];

    // Filter notes based on the selected tags
    if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
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
        // Default to filtering by a specific group if no tags are selected
        const notesByGroup = await app.filterNotes({ group: "^vault" });
        filteredNotes = [...filteredNotes, ...notesByGroup];
    }

    // Remove duplicate notes
    filteredNotes = [...new Set(filteredNotes)];
    notes = filteredNotes;

    // Prepare arrays and variables for storing results
    let results = [];
    let finalResults = "";

    // Define horizontal line and introductory text for the markdown document
    const horizontalLine = `

---

`;
    const introLines = `
# Welcome to your Gallery!
## Here you can find all your Photos in your Amplenote Notes.
### Whether you selected Documentation Format or Table Format, your complete list is displayed here.
${horizontalLine}
`;

    // Initialize the markdown table format
    let markdownTable = `${introLines}`;
    markdownTable += "| Note | Tags | Created | Updated | Images |\n";
    markdownTable += "|------|------|---------|---------|--------|\n";

    // Helper function to format date-time strings
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    }

    // Define regex patterns for extracting image URLs and identifiers
    const regex = /https:\/\/images\.amplenote\.com\/(.+)/;
    const regex2 = /\/([^\/]+)$/;
    const imageResolution = "300";

    // Initialize markdown document format
    let markdownDocs = `${introLines}`;

    // Header or Note Seg
	if (headerSeg) {

	// Process each note to extract images and group them by headers
	for (let note of notes) {
		try {
			// console.log(`Processing note: ${note.name} (${note.uuid})`);
			// Retrieve the content of the current note by its UUID
			const noteContent = await app.getNoteContent({ uuid: note.uuid });
			// console.log(`Note content retrieved for: ${note.name}`);

			// Define regex patterns to match image URLs and headers (H1, H2, H3)
			const markdownImagePattern = allImages
				? /!\[.*?\]\((.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g
				: /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g;

			// const headerPattern = /^(#{1,3})\s+(.*)$/gm;
			// const headerPattern = /^(#{1,3})\s+([^\[\]\(\)\!\*]*(?:\[\s*([^\]]*)\]\([^\)]+\))?[^\[\]\(\)\!\*]*)$/gm;
			const headerPattern = /^(#{1,3})\s+([^\[\n]+)(?:\[[^\]]*\]\([^\)]*\))?(?:\s*(.*))?$/gm; // To Handle Links in Headers, It does not work as expected!!!
			
			// Function to clean up additional Markdown formatting if necessary
			function cleanMarkdown(text) {
				return text.replace(/[\*\_\~\`\!\[\]\(\)\+\-\.\#\@\!\`\_\*\+\=\{\}\[\]\(\)\^\~]/g, '').trim();
			}

			let matches;
			let headers = [];
			let headerImages = { defaultHeader: [] };  // Initialize default section for images
			let lastProcessedImageIndex = -1;  // Track the index of the last processed image

			// Extract headers from note content and handle duplicates
			let match;
			let headerCounts = {};
			// console.log(`Extracting headers from note: ${note.name}`);
			headers.push({ text: "defaultHeader", position: 0 }); // Add defaultHeader initially
			while ((match = headerPattern.exec(noteContent)) !== null) {
				let headerText = match[2].trim();
				headerText = cleanMarkdown(headerText);
				headerText = headerText.trim();

				// Handle duplicate headers by appending a count to make them unique
				if (headerCounts[headerText]) {
					headerCounts[headerText] += 1;
					const uniqueHeaderText = `${headerText}_${headerCounts[headerText]}`;
					headers.push({ text: uniqueHeaderText, position: match.index });
					headerImages[uniqueHeaderText] = [];  // Initialize array for images under this header
					// console.log(`Found duplicate header: ${headerText}, renamed to ${uniqueHeaderText}`);
				} else {
					headerCounts[headerText] = 1;
					headers.push({ text: headerText, position: match.index });
					headerImages[headerText] = [];  // Initialize array for images under this header
					// console.log(`Found header: ${headerText}`);
				}
			}

			// Extract images and categorize them based on their position relative to headers
			let currentIndex = 0;
			let currentHeaderName = "defaultHeader";  // Start with defaultHeader
			let firstHeaderPosition = headers.length > 0 ? headers[0].position : Infinity;  // Position of the first header

			// console.log(`Extracting images from note: ${note.name}`);
			while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
				const url = matches[1];  // Extract the image URL
				const caption = matches[2] ? matches[2].trim() : '';  // Extract the caption if present
				const imagePosition = matches.index;

				// Check if image is before any header
				if (imagePosition < firstHeaderPosition) {
					if (lastProcessedImageIndex < imagePosition) {
						// console.log(`Associating early image to defaultHeader: ${url}`);
						headerImages["defaultHeader"].push({ url, caption });
						lastProcessedImageIndex = imagePosition; // Update the last processed image index
					}
				} 
				if (imagePosition > firstHeaderPosition) {
					// Identify which header the image belongs to by comparing positions
					while (currentIndex < headers.length && imagePosition > headers[currentIndex].position) {
						currentHeaderName = headers[currentIndex].text;  // Move to the next header
						currentIndex++;
					}
					if (lastProcessedImageIndex < imagePosition) {
						// console.log(`Associating image to header: ${currentHeaderName}`);
						headerImages[currentHeaderName] = headerImages[currentHeaderName] || [];
						headerImages[currentHeaderName].push({ url, caption });
						lastProcessedImageIndex = imagePosition; // Update the last processed image index
					}
				}
			}

			// If no headers were found, ensure all images are in defaultHeader
			if (headers.length === 0) {
				// console.log(`No headers found, assigning all images to defaultHeader`);
				while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
					const url = matches[1];
					const caption = matches[2] ? matches[2].trim() : '';
					if (lastProcessedImageIndex < matches.index) {
						headerImages["defaultHeader"].push({ url, caption });
						lastProcessedImageIndex = matches.index;
						// console.log(`Associating early image to defaultHeader: ${url}`);
					}
				}
			}

			// console.log(`Formatting images for note: ${note.name}`);
			// console.log("headerImages:",headerImages)
			// Determine headers to process (include defaultHeader if no headers are found)
			const headersToProcess = headers.length ? headers : [{ text: "defaultHeader" }];
			// console.log("headersToProcess:",headersToProcess)
			// console.log("headers:",headers)

			// Process each header (or defaultHeader) and its associated images
			for (const header of headersToProcess) {
				let headerText = header.text === "defaultHeader" ? note.name : header.text;
				let imagesUnderHeader = headerImages[header.text] || headerImages["defaultHeader"];

				// console.log(`Processing header: ${headerText}, images count: ${imagesUnderHeader.length}`);

				if (imagesUnderHeader.length > 0) {
					const headerLink = header.text === "defaultHeader"
						? `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`
						: `[${note.name}#${headerText}](https://www.amplenote.com/notes/${note.uuid}#${encodeURIComponent(headerText)})`;

					// console.log(`Formatting header: ${headerText}`);

					// Format images for markdownTable or markdownDocs
					if (mdTable) {
						const imageLinks = imagesUnderHeader.map(image => {
							const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : '';  // Extract identifier from URL
							return image.caption
								? `![${imageIdentifier}\\|${imageResolution}](${image.url})<br>> ${image.caption}`
								: `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
						}).join("<br>");

						// console.log(`Adding images to markdownTable under header: ${headerText}`);
						markdownTable += `| ${headerLink} | ${note.tags} | ${formatDateTime(note.created)} | ${formatDateTime(note.updated)} | ${imageLinks} |\n`;
					} else {
						const imageLinks = imagesUnderHeader.map(image => {
							const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : '';  // Extract identifier from URL
							return image.caption
								? `![${imageIdentifier}\\|${imageResolution}](${image.url})\n> ${image.caption}\n\n`
								: `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
						}).join(" ");

						// console.log(`Adding images to markdownDocs under header: ${headerText}`);
						// Add images to markdownDocs under header
						markdownDocs += `
### Header: ${headerLink}
> Tags: ${note.tags}
> Created: ${formatDateTime(note.created)}
> Updated: ${formatDateTime(note.updated)}

${imageLinks}

${horizontalLine}
						`;
					}
				} else {
					// Log if no images are found under the current header
					// console.log(`No images found under header: ${headerText}`);
				}
			}

			// console.log(`Finished processing note: ${note.name}`);
		} catch (err) {
			// Handle errors during note processing
			console.error(`Error processing note: ${note.name}`, err);
			if (err instanceof TypeError) {
				continue;  // Skip notes with errors
			}
		}
	}
	
	} else {

    // Process each note to extract images
    for (let note of notes) {
        try {
            const noteContent = await app.getNoteContent({ uuid: note.uuid });

            // Define regex pattern to match image URLs based on user selection
            const markdownImagePattern = allImages
                ? /!\[.*?\]\((.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g
                : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g;

            let matches;
            let images = [];
            // console.log("noteContent:",noteContent)
            // Extract image URLs and captions from the note content
            while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
            // console.log("matches:", matches);
                const url = matches[1]; // Extract the image URL
                const caption = matches[2] ? matches[2].trim() : ''; // Extract the caption if present
                images.push({ url, caption }); // Store both URL and caption in the images array
            }

          // console.log("images.url:", images.map(img => img.url));
          // console.log("images.caption:", images.map(img => img.caption));

            // If images are found in the note, format them accordingly
            if (images.length > 0) {
                if (mdTable) {
                    // Format images as table entries if table format is selected
                    const imageLinks = images.map(image => {
                        const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract identifier from URL
                        return image.caption
                            ? `![${imageIdentifier}\\|${imageResolution}](${image.url})<br>> ${image.caption}`
                            : `![${imageIdentifier}\\|${imageResolution}](${image.url})`;
                    }).join("<br>");

                    markdownTable += `| [${note.name}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${formatDateTime(note.created)} | ${formatDateTime(note.updated)} | ${imageLinks} |\n`;
                } else {
                    // Format images as document entries if table format is not selected
                    const imageLinks = images.map(image => {
                        const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract identifier from URL
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
                continue; // Skip notes with errors
            }
        }
    }

	} // Ending If Else for headerSeg

    // Store the results based on the selected format
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

    // Function to get current date and time formatted as YYMMDD_HHMMSS
    function getCurrentDateTime() {
        const now = new Date();

        // Format the date and time as per requirement
        const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
        const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');

        return { YYMMDD, HHMMSS };
    }

    // Generate a new note with the results
    const { YYMMDD, HHMMSS } = getCurrentDateTime();
    const newNoteName = `Image Gallery List ${YYMMDD}_${HHMMSS}`;
    const newTagName = ['-reports/-image-gallery'];
    let noteUUID = await app.createNote(newNoteName, newTagName);
    await app.replaceNoteContent({ uuid: noteUUID }, finalResults);

    // Audit Report
    const auditNoteName = `Image Gallery Audit`;
    const auditTagName = ['-reports/-image-gallery'];
    // let auditnoteUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"] || await app.createNote(auditNoteName, auditTagName);
	// if (!await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"]) { await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", auditnoteUUID); }
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Gallery Option:** List!, **Inputs:** [Tags(OR): ${tagNamesOr}; Tags(AND): ${tagNamesAnd}; All-Images: ${allImages}; Table: ${mdTable};], **Note:** [${newNoteName}](https://www.amplenote.com/notes/${noteUUID}), **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
    
    await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);

},
/* ----------------------------------- */
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
                label: "Include Non-Amplenote Images (Default: Only Amplenote Images)",
                type: "checkbox"
            },
            {
                label: "Select the format that you want to download in!",
                type: "radio",
                options: [
                    { label: "HTML Gallery Download (Recommended)", value: "html" },
                    { label: "Markdown Image Links", value: "markdown" },
                    { label: "Image Properties JSON", value: "json" },
                    { label: "Image Properties RAW File", value: "raw" }
                ]
            }
        ]
    });

    // Extract user inputs from the prompt
    const [tagNamesOr, tagNamesAnd, allImages, dwFormat] = result;
    // console.log("tagNames:", tagNames);
	if ((!tagNamesOr && !tagNamesAnd) || !dwFormat) {
		app.alert("Note: At least one of Optional Items ('Tag OR', 'Tag AND') must be selected and 'Format' must be provided.");
		return;
	}

    // Initialize variables
    let notes = [];
    const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
    let filteredNotes = [];

    // Filter notes based on user-selected tags
    if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
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

    // Remove duplicate notes
    filteredNotes = [...new Set(filteredNotes)];
    notes = filteredNotes;

    // Prepare variables for storing results
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
                : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g;

            let matches;
            let images = [];

            // Extract image URLs and captions from the note content
            while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
                // console.log("matches:", matches);
                const url = matches[1]; // Extract the image URL
                const caption = matches[2] ? matches[2].trim() : 'No Caption Available or Unable to Fetch.'; // Extract the caption if present, or use a default message
                images.push({ url, caption }); // Store both the URL and caption in the images array
            }

            // console.log("images.url:", images.map(img => img.url));
            // console.log("images.caption:", images.map(img => img.caption));
            // console.log("images.length:", images.length);

            if (images.length > 0) {
                for (let image of images) {
                    const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from the URL

                    // Create an object with named properties
                    let resultEntry = {
                        notetags: note.tags.join(','), // Note tags
                        notelink: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`, // Note link
                        noteurl: `https://www.amplenote.com/notes/${note.uuid}`, // Note URL
                        notename: note.name, // Note name
                        noteuuid: note.uuid, // Note UUID
                        notecreated: formatDateTime(note.created), // Note creation datetime
                        noteupdated: formatDateTime(note.updated), // Note updated datetime
                        imageurl: image.url, // Image URL
                        imagename: imageIdentifier, // Image identifier (from the URL)
                        caption: image.caption // Image caption
                    };

                    // Push the object into the results array
                    resultsArray.push(resultEntry);

                    // Handle different download formats
                    if (dwFormat === "raw") {
                    // Append to rawTemplate
                    rawTemplate += `${resultEntry.notetags},${resultEntry.notelink},${resultEntry.noteurl},${resultEntry.notename},${resultEntry.noteuuid},${resultEntry.notecreated},${resultEntry.noteupdated},${resultEntry.imageurl},${resultEntry.imagename},${resultEntry.caption}\n`;
                    } else if (dwFormat === "markdown") {
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
    // Function to get the current date and time in YYMMDD and HHMMSS format
    function getCurrentDateTime() {
        const now = new Date();
        const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
        const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
        return { YYMMDD, HHMMSS };
    }
    const { YYMMDD, HHMMSS } = getCurrentDateTime();

    // Function to download the data as a text file
    function downloadTextFile(resultText, filename) {
        let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${YYMMDD}_${HHMMSS}_${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Function to remove duplicate entries from an array
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

    // Determine the format and trigger the appropriate download
    if (dwFormat === "json") {
        let deduplicatedArray = removeDuplicates(resultsArray);
        let jsonTemplate = JSON.stringify(deduplicatedArray, null, 2);
        downloadTextFile(jsonTemplate, "Gallery_JSON.json");
        // console.log("jsonTemplate:", jsonTemplate);
    } else if (dwFormat === "raw") {
        downloadTextFile(rawTemplate, "Gallery_Raw_Template.txt");
        // console.log("rawTemplate:", rawTemplate);
    } else if (dwFormat === "markdown") {
        downloadTextFile(htmlDataTemplate, "Gallery_Markdown_Data.txt");
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
    <p>&copy; BKK 2024 | <a href="https://public.amplenote.com/LpRxpX/gallery" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
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
               <img src="\${item.src}" alt="\${item.alt}" style="width: 100%; max-width: 300px; height: auto; object-fit: cover;"
               onerror="this.onerror=null; this.src='https://img.icons8.com/dusk/64/no-image.png';">
            </a>
        \`;
        gallery.appendChild(div);
    });
}

// Function to create and update tag buttons
function updateTagButtons(data) {
    const tagsSet = new Set();
	const tagsSetD = new Set();
    
    // Collect all unique tag strings
    data.forEach(item => {
        tagsSetD.add(item.tags.trim());
    });

    // If there's only one unique tag string, skip creating the buttons
    if (tagsSetD.size <= 1) {
        return;
    }

    // Collect all unique tags
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
        // await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`); - Navigate to Audit Page!
        // console.log("htmlTemplate:", htmlTemplate);
    }

    // Audit Report
    const auditNoteName = `Image Gallery Audit`;
    const auditTagName = ['-reports/-image-gallery'];
    // let auditnoteUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"] || await app.createNote(auditNoteName, auditTagName);
	// if (!await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"]) { await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", auditnoteUUID); }
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Gallery Option:** Download!, **Inputs:** [Tags(OR): ${tagNamesOr}; Tags(AND): ${tagNamesAnd}; All-Images: ${allImages}; Format: ${dwFormat};], **Filename:** Starts with At => **At:** ${YYMMDD}_${HHMMSS}.

`;  
    // const uuidRegex = /(?<=local-)\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    // auditnoteUUID = auditnoteUUID.match(uuidRegex);
    await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
    await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);

},
/* ----------------------------------- */
"Viewer!": async function (app) {
    // Prompt the user to select tags and choose options
    const result = await app.prompt(
        "Select one option, (If you are selecting Single Note, select the specific note with images.)",
        {
            inputs: [
                { label: "Select any one of the Collection Option", type: "radio", options: [ { label: "All the Notes", value: 1 }, { label: "Single Note", value: 2 } ] },
                { label: "Select the Note", type: "note" }
            ]
        }
    );

      // Extract user inputs
      const [noteOrAll, noteDetails] = result;
      // console.log("result:", result);
	  // if (!result) { return null; }
	if (!noteOrAll === 1 || (noteOrAll === 2 && !noteDetails)) {
		app.alert("Note: 'Collection Option' is mandatory, and if 'Collection Option' is 'Single Note', 'Note' must also be provided.");
		return;
	}

  // Function to get current date and time formatted as YYMMDD_HHMMSS
  function getCurrentDateTime() {
    const now = new Date();
    // Format the date and time as per requirement
    const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
    const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
    return { YYMMDD, HHMMSS };
    }
  const { YYMMDD, HHMMSS } = getCurrentDateTime();
  
  // Create Save Retrive Save Note to View the Embeded Gallery
  const newNoteName = `Gallery: Image Viewer`;
  const newTagName = ['-reports/-image-gallery'];
  
  // Audit Report
  const auditNoteName = `Image Gallery Audit`;
  const auditTagName = ['-reports/-image-gallery'];

  // noteUUID = await app.settings["Gallery_Image_Viewer_UUID [Do not Edit!]"] || await app.createNote(newNoteName, newTagName);
  // await app.setSetting("Gallery_Image_Viewer_UUID [Do not Edit!]", noteUUID);

	// Main logic for setting up and navigating to the gallery viewer note
	// Retrieve or create the "Gallery Image Viewer" note
	const noteUUID = await (async () => {
	  // Try to get the UUID from the app's settings
	  const existingUUID = await app.settings["Gallery_Image_Viewer_UUID [Do not Edit!]"];
	  
	  // If the UUID exists, return it
	  if (existingUUID) 
		return existingUUID;
	  
	  // If it doesn't exist, create a new note with the specified name and tag
	  const newUUID = await app.createNote(newNoteName, newTagName);
	  
	  // Store the newly created note's UUID in app settings for future use
	  await app.setSetting("Gallery_Image_Viewer_UUID [Do not Edit!]", newUUID);
	  
	  // Return the new UUID
	  return newUUID;
	})();

  // auditnoteUUID= await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"] || await app.createNote(auditNoteName, auditTagName);
  // await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", auditnoteUUID);

	// Retrieve or create the "Gallery Image Audit" note
	const auditnoteUUID = await (async () => {
	  // Try to get the UUID from the app's settings
	  const existingUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"];
	  
	  // If the UUID exists, return it
	  if (existingUUID) 
		return existingUUID;
	  
	  // If it doesn't exist, create a new note with the specified audit note name and tag
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  
	  // Store the newly created note's UUID in app settings for future use
	  await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", newUUID);
	  
	  // Return the new UUID
	  return newUUID;
	})();

	// Scenario 1: If the user wants to view all notes
	if (noteOrAll === 1) {
	  // Set a placeholder UUID for the case where all notes are displayed
	  const ranUUID = '00000000-0000-0000-0000-000000000000';
	  
	  // Save the option (viewing all notes) and the placeholder UUID in the app's settings
	  await app.setSetting("Gallery_Image_Viewer_AllImgs [Do not Edit!]", `${noteOrAll},${ranUUID}`);

	  // Audit report logging the gallery option for "All Notes"
	  const auditReport = `
- **Gallery Option:** Viewer!, **Inputs:** All Notes Images:, **Note:** [${newNoteName}](https://www.amplenote.com/notes/${noteUUID}), **At:** ${YYMMDD}_${HHMMSS}.
	`;

	  // Insert the audit report into the "Gallery Image Audit" note
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

	  // Replace the content of the gallery note with the plugin's embed code for the viewer
	  await app.replaceNoteContent({ uuid: noteUUID }, `<object data="plugin://${app.context.pluginUUID}" data-aspect-ratio="1" />`);

	  // Navigate to the newly created or retrieved note in the app
	  await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
	}

	// Scenario 2: If the user wants to view a single specific note
	if (noteOrAll === 2) {
	  // Save the option (viewing a single note) and the specific note's UUID in the app's settings
	  await app.setSetting("Gallery_Image_Viewer_AllImgs [Do not Edit!]", `${noteOrAll},${noteDetails.uuid}`);

	  // Audit report logging the gallery option for a single note
	  const auditReport = `
- **Gallery Option:** Viewer!, **Inputs:** Single Note Images:, **Note:** [${noteDetails.name}](https://www.amplenote.com/notes/${noteDetails.uuid}), **At:** ${YYMMDD}_${HHMMSS}.
	`;  
	
	  // Insert the audit report into the "Gallery Image Audit" note
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

	  // Insert the plugin's embed code into the specific note
	  await app.insertNoteContent({ uuid: noteDetails.uuid }, `<object data="plugin://${app.context.pluginUUID}" data-aspect-ratio="1" />`);

	  // Navigate to the specific note in the app
	  await app.navigate(`https://www.amplenote.com/notes/${noteDetails.uuid}`);
	}
	
  }
},
/* ----------------------------------- */
async renderEmbed(app, ...args) {
  // Initialize variables
  let notes = [];
  let resultsArray2 = [];
  let htmlTemplate = [];
  const regex2 = /\/([^\/]+)$/; // Regex pattern to extract image identifier from URL
  const storedValue = app.settings["Gallery_Image_Viewer_AllImgs [Do not Edit!]"];
  const [noteOrAll, singleNoteuuid] = storedValue.split(',');
  // const noteOrAllz = noteOrAll === 1 ? true : false;
  // const notesByGroup = "";
  // console.log("storedValue:", storedValue);
  // console.log("noteOrAll:", noteOrAll);
  // console.log("singleNoteuuid:", singleNoteuuid);
   // let notesByGroup1 = [];
   // let notesByGroup2 = "";
  
	// const notesByGroup = noteOrAll === 1 ? await app.filterNotes({ group: "^vault" }) : await app.findNote({ uuid: singleNoteuuid });
	// const notesByGroup = await app.filterNotes({ group: "^vault" });
	// const notesByGroup1 = await app.filterNotes({ group: "^vault" });
	const notesByGroup2 = await app.findNote({ uuid: singleNoteuuid });

	// Ensure that notes is always an array, even if it's a single note
	notes = notesByGroup2 ? [notesByGroup2] : await app.filterNotes({ group: "^vault" });
	// notes = notesByGroup;
	// console.log("notesByGroup1:", notesByGroup1);
	// console.log("notesByGroup2:", notesByGroup2);
	// console.log("notes:", notes);
  
  // Process each note to extract image details
  for (let note of notes) {
      try {
		  // Get note content
          const noteContent = await app.getNoteContent({ uuid: note.uuid });
          let allImages = true; // Handling through Settings is creating a loop! Keeps on trying in the background!
          // let allImages = (await app.settings["Gallery_Image_Viewer_AllImgs"] === 1);
          // if (await app.settings["Gallery_Image_Viewer_AllImgs"] != 1) { await app.setSetting("Gallery_Image_Viewer_AllImgs", 0); }
          // Define regex pattern to match image URLs and captions
          const markdownImagePattern = allImages
              ? /!\[.*?\]\((.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g
              : /!\[.*?\]\((https:\/\/images\.amplenote\.com\/.*?)\)(?:\s*\[\^.*?\])?(?:\n>\s*(.*))?/g;
          let matches;
          let images = [];
          // Extract image URLs and captions
		  while ((matches = markdownImagePattern.exec(noteContent)) !== null) {
              const url = matches[1]; // Extract the image URL
              const caption = matches[2] ? matches[2].trim() : 'No Caption Available or Unable to Fetch.'; // Extract the caption if present, or use an empty string
              images.push({ url, caption }); // Store both the URL and caption in the images array
          }
		  // Process extracted images
          if (images.length > 0) {
              for (let image of images) {
                  const imageIdentifier = image.url.match(regex2) ? image.url.match(regex2)[1] : ''; // Extract the identifier from URL
                  // Create a result entry for each image
				  let resultEntry2 = {
                      href: image.url,
                      src: image.url,
                      caption: `${image.caption}<br>Notename: ${note.name}, Tags: (${note.tags.join(',')}), UUID: ${note.uuid}`,
                      alt: note.name,
                      tags: `${note.tags.join(',')}`
                  };
                  // Add the result entry to the results array
				  resultsArray2.push(resultEntry2);
              }
          }
      } catch (err) {
		  // Log error if processing a note fails and continue with the next note
          console.error("Error while processing note:", note, err);
          continue; // Skip any notes with errors
      }
    }

    // Helper function to remove duplicate entries from the results array
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
  
      // Remove duplicates and format results as JSON
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
    <p>&copy; BKK 2024 | <a href="https://public.amplenote.com/LpRxpX/gallery" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
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
               <img src="\${item.src}" alt="\${item.alt}" style="width: 100%; max-width: 300px; height: auto; object-fit: cover;"
               onerror="this.onerror=null; this.src='https://img.icons8.com/dusk/64/no-image.png';">
            </a>
        \`;
        gallery.appendChild(div);
    });
}

// Function to create and update tag buttons
function updateTagButtons(data) {
    const tagsSet = new Set();
	const tagsSetD = new Set();
    
    // Collect all unique tag strings
    data.forEach(item => {
        tagsSetD.add(item.tags.trim());
    });

    // If there's only one unique tag string, skip creating the buttons
    if (tagsSetD.size <= 1) {
        return;
    }

    // Collect all unique tags
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