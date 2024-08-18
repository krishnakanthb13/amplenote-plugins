---
title: "\U0001F4F8 Gallery"
uuid: 0e218580-5be7-11ef-b179-22074e34eefe
version: 321
created: '2024-08-16T21:15:38+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# **Welcome to the Image Gallery Viewer!**

Hello, and welcome to your personalized Image Gallery Viewer, crafted to bring your memories and visual content to life in a way that's both functional and aesthetically pleasing. Whether you're looking to organize your images or simply enjoy a visual stroll down memory lane, this tool has been designed with you in mind.

### What Can You Do Here?

1. **Image Viewer**: At the heart of this gallery is the Image Viewer, which allows you to seamlessly browse through your collection of images. Each image is presented with its caption and additional details, giving context to your visual memories. With easy navigation and an intuitive interface, you can effortlessly flip through your gallery.

1. **List and Filter**: The gallery doesn't just display images; it also gives you the power to organize them. Use the built-in filtering options to view images by specific tags, ensuring that you can always find exactly what you're looking for. Whether you're sorting by date, tags, or other metadata, the gallery adapts to your needs.

1. **Download Options**: We understand that your images are precious, and sometimes you need to have them at your fingertips outside of Amplenote. That's why this offers multiple download formats. Whether you need a raw list of your images, a formatted HTML file, or a structured JSON file, the download options are tailored to suit your preferences.

### A Little Something About This Viewer

This gallery viewer is more than just a tool—it's a companion to your visual journey. Every image holds a story, and with this viewer, those stories are easily accessible, organized, and ready to be shared or enjoyed. The thoughtful design ensures that you can focus on what matters most: the memories behind each image. So go ahead, dive into your gallery, and let this viewer help you rediscover the beauty of your visual collection.

> Welcome aboard, and happy viewing!

![78fc5971-c995-4404-b965-1447f488d08c.png|450](https://images.amplenote.com/0e218580-5be7-11ef-b179-22074e34eefe/78fc5971-c995-4404-b965-1447f488d08c.png) [^1]  ![](https://images.amplenote.com/0e218580-5be7-11ef-b179-22074e34eefe/6cad8312-5418-4366-87de-271f44821d21.gif)

---

## <mark style="color:#FFFFFF;">Demo:<!-- {"cycleColor":"55"} --></mark>

### General - Calling the Plugin - Gallery!

![](https://images.amplenote.com/7af791e0-5a39-11ef-82af-22074e34eefe/f84da71d-58ee-4d5d-aefe-dcaf9d02b013.png) [^2]

---

## How to Use the Image Gallery Viewer: A Step-by-Step Guide

Welcome to the Image Gallery Viewer! This guide will walk you through how to interact with and make the most out of this tool. Whether you're here to view, filter, or download your images, we've got you covered.

### Step 1: Access the Image Viewer

1. **Open the Viewer**: Navigate to the Image Gallery Viewer within Amplenote. You can usually find this under the Application Options by hitting **`Ctrl + O`.**

1. **Create or Open Gallery Note**: This is automatically set up in Amplenote, and it will take you directly to the Note where the Embed is inserted. If you have a ton of images or notes, its best to give it some time to go through all your notes!

1. **Browse Images**: Once you're in the gallery view, you'll see your images displayed with their captions and other details. Use the navigation controls to move through the images.

1. **View Image Details**: Click on an image to see more details, such as the caption, note name, tags, and UUID. This gives you context about each image.

1. **Note:** This page refreshes every time you open it and fetches the updated list every time! Your patience is much appreciated.

### Step 2: List Your Images

1. **Select Filters**: Use the filter options to narrow down your images based on tags or groups. You can filter by individual tags or combine multiple tags.

1. **Apply Filters**: Once you’ve selected your filters, apply them to view only the images that match your criteria. This helps you focus on specific subsets of your collection.

1. **Select Format:** How you want to list out your Images into a new note to review or explore, which ever you are interested in. You have Table View, and Document View, choose which ever pleases you. Why not explore both of them, and see which suits your needs.

### Step 3: Download Your Images

1. **Choose Download Options**: Click on the download option to select how you’d like to download your images. You have several formats to choose from:

    1. **HTML Gallery**: A web-friendly format for viewing images in a gallery layout.

    1. **Markdown Image Links**: A text file containing markdown links to your images.

    1. **Image Properties JSON**: A JSON file with detailed information about each image.

    1. **Image Properties RAW File**: A raw text file with image details in a structured format.

1. **Download the File**: After choosing your format, the tool will generate and download the file to your device. You can then open this file with your regular browser.

### Tips for a Smooth Experience

- **Regularly Update**: Keep your gallery note updated with the latest images and details to ensure you always have access to current content.

- **Organize Tags**: Use descriptive tags and captions to make filtering and referencing respectively easier and more effective.

- **Check for Errors**: If you encounter issues, retry to comment on the plugin page with your issue, which later can be looked into.

By following these steps, you'll be able to efficiently explore, manage, and download your images using the Image Gallery Viewer. Enjoy your visual journey!

---

## <mark style="color:#FFFFFF;">Table - Plugin Parameters:<!-- {"cycleColor":"55"} --></mark>

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":127}} -->|Gallery|
|icon<!-- {"cell":{"colwidth":127}} -->|collections|
|Description<!-- {"cell":{"colwidth":127}} -->|<mark style="color:#F8914D;">**`List, View, Download`**<!-- {"cycleColor":"24"} --></mark> <br />All your Amplenote Images at one location!<br />And that's here!<br />[📸 Gallery - List! Docs](https://www.amplenote.com/notes/356bc1ea-5be8-11ef-8800-22074e34eefe) <br />[📸 Gallery - Download! Docs](https://www.amplenote.com/notes/dea6ac70-5be8-11ef-9902-22074e34eefe) <br />[📸 Gallery - Viewer! Docs](https://www.amplenote.com/notes/dea6ac70-5be8-11ef-9902-22074e34eefe) |
|setting|Gallery_Image_Viewer_UUID \[Do not Edit!\]|
|setting|Gallery_Image_Viewer_AllImgs \[Not Functional!\]|
|setting|Gallery_Image_Audit_UUID \[Do not Edit!\]|
---

## <mark style="color:#FFFFFF;">Code Base:<!-- {"cycleColor":"55"} --></mark>

```
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
                }
            ]
        }
    );

      // Extract user inputs
      const [tagNamesOr, tagNamesAnd, allImages, mdTable] = result;
      // console.log("tagNames:", tagNames);

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
    const newTagName = ['-image-gallery'];
    let noteUUID = await app.createNote(newNoteName, newTagName);
    await app.replaceNoteContent({ uuid: noteUUID }, finalResults);

    // Audit Report
    const auditNoteName = `Image Gallery Audit`;
    const auditTagName = ['-image-gallery'];
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
        // await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`); - Navigate to Audit Page!
        // console.log("htmlTemplate:", htmlTemplate);
    }

    // Audit Report
    const auditNoteName = `Image Gallery Audit`;
    const auditTagName = ['-image-gallery'];
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
  const newTagName = ['-image-gallery'];
  
  // Audit Report
  const auditNoteName = `Image Gallery Audit`;
  const auditTagName = ['-image-gallery'];

  // noteUUID = await app.settings["Gallery_Image_Viewer_UUID [Do not Edit!]"] || await app.createNote(newNoteName, newTagName);
  // await app.setSetting("Gallery_Image_Viewer_UUID [Do not Edit!]", noteUUID);

	const noteUUID = await (async () => {
	  const existingUUID = await app.settings["Gallery_Image_Viewer_UUID [Do not Edit!]"];
	  if (existingUUID)
		  return existingUUID;
	  const newUUID = await app.createNote(newNoteName, newTagName);
	  await app.setSetting("Gallery_Image_Viewer_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();

  // auditnoteUUID= await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"] || await app.createNote(auditNoteName, auditTagName);
  // await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", auditnoteUUID);

	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Gallery_Image_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Gallery_Image_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();

  const auditReport = `
- **Gallery Option:** Viewer!, **Inputs:** All Images: *true*, **Note:** [${newNoteName}](https://www.amplenote.com/notes/${noteUUID}), **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

  await app.replaceNoteContent({ uuid: noteUUID },`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="1" />`);
  await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
  
}
},
/* ----------------------------------- */
async renderEmbed(app, ...args) {
  // Initialize variables
  let notes = [];
  let resultsArray2 = [];
  let htmlTemplate = "";
  const regex2 = /\/([^\/]+)$/; // Regex pattern to extract image identifier from URL
  
  // Fetch notes from the specified group
  const notesByGroup = await app.filterNotes({ group: "^vault" });
  notes = notesByGroup;
  
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
```

---

## <mark style="color:#FFFFFF;">Additional Information:<!-- {"cycleColor":"55"} --></mark>

---

### <mark style="color:#FFFFFF;">**Change Log:**<!-- {"cycleColor":"55"} --></mark>

- August 14th, 2024: Fully build, audited, completed and tested List! options and its features.

- August 15th, 2024: Completed the Download! Option, using which I able to replicate the Viewer! Option. Build, with some errors and bugs related to image gallery and pop up, as I was using a different created logic, later move to a framework, which worked perfectly fine with limited features. Getting the caption and using various regex formats and structures was a challenge, due to the irregularities which exists. (not sure what all new scenarios may come up that I may need to incorporate!)

- August 16th, 2024: Completed fixing the bugs and added few more features, and also tried to optimize the code and reduce redundant code, was not successful in reducing the code size, but all the features work in the current version on (August 16th, 2024 (22:50:04)). In the future, after testing and increasing my expertise in js, I will try to move the redundant codes into functions and called or replicated in other plugins as well, and a new feature update will be much easier comparatively. Some other day then!

---

### <mark style="color:#FFFFFF;">**Implemented & Upcoming:**<!-- {"cycleColor":"55"} --></mark>

- ~~**Prompt for Download Options**: You can select what details you want to download about your images, including tags, formats, and whether to include non-Amplenote images.~~

- ~~**Tag Filtering**: You can filter images based on individual tags (OR logic) or combined tags (AND logic).~~

- ~~**Image Extraction**: Grabs image URLs and captions from your notes. It distinguishes between Amplenote images and non-Amplenote images based on your settings.~~

- ~~**Format Handling**: Depending on your download choice, it can output data in:~~

    - ~~**HTML Gallery**: A neat gallery layout for viewing in a browser.~~

    - ~~**Markdown Links**: A text file with markdown image links.~~

    - ~~**Image Properties JSON**: A JSON file with detailed image properties.~~

    - ~~**RAW File**: A structured text file with all image details.~~

- ~~**Image Viewer Creation**: Sets up a new note or updates an existing one to display images using an embedded object, making it easy to view them all in one place.~~

- ~~**Deduplication**: Removes duplicate image entries to keep your data clean and organized.~~

- ~~**Error Handling**: Catch errors during note processing and continues working with the next note, ensuring the process doesn’t halt due to issues with individual notes.~~

- ~~**Date and Time Formatting**: Formats timestamps in a readable way for when you’re creating or downloading files.~~

- ~~**Download Functionality**: Generates and triggers downloads for different file formats with timestamps to keep your files organized.~~

<mark style="color:#FFFFFF;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"55"} --></mark>

- Add image properties, zooming, sharing and other related image viewer options.

- Add links to directly open the note separately, possible only to open in a browser, navigate may not work as it is a external environment.

- Nothing as of now, everything that I could think of has been implemented as a Code!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

### Overview of the Code

- [Code Explanation!][^3] For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 8h 3m + 11h 5m + 10h 57m = \~30h+. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

---

\

 

\

[^1]: RAW
    . . .
    E
    CSS
    HTML
    1110
    1110
    11 10
    O
    . . .
    . . .

[^2]: Gall
    Y
    X
    Plugin: Gallery: List!
    Plugin: Gallery: Download!
    lar
    Plugin: Gallery: Viewer!

[^3]: [Code Explanation!]()

    \

    - **Download Functionality**:

        - **User Interaction**: The tool starts by prompting the user to select their preferences for downloading images. Users can choose tags, decide whether to include non-Amplenote images, and select the download format (HTML, Markdown, JSON, or RAW).

        - **Note Filtering**: Based on the user’s tag selection, it filters notes from Amplenote. If tags are provided, it fetches notes containing those tags; otherwise, it retrieves all notes from a specific group.

        - **Image Extraction**: The code then processes each note to extract images and their captions. It handles different types of image URLs, depending on whether the user wants all images or just Amplenote ones.

        - **Result Formatting**: It formats the extracted information into different templates based on the selected download format. For example, HTML for a gallery view, Markdown for links, JSON for detailed properties, and RAW for a simple text file.

        - **File Download**: Finally, it generates and triggers a download of the formatted results, ensuring files are saved with a timestamp to keep them organized.

    - **Viewer Setup**:

        - **Note Creation**: This function creates or updates a note to embed an image viewer plugin. It ensures the viewer is linked to the right note and sets the correct settings.

        - **Navigation**: Redirects the user to the newly created or updated note in Amplenote.

    - **Embed Rendering**:

        - **Note Retrieval**: Fetches notes and their content, similar to the download functionality.

        - **Image Extraction**: Extracts image details from the notes using regex patterns, handling both Amplenote-specific and general images.

        - **Result Preparation**: Formats the extracted images into a JSON structure and removes duplicates.

        - **Template Creation**: Prepares the results for embedding, though the actual HTML template isn’t generated in this snippet.

    ---

    In essence, the code provides tools for downloading and viewing images from Amplenote, handling user preferences, filtering notes, extracting image data, and formatting results for various purposes. It also sets up a viewer within Amplenote to interact with the images directly.

