{
  appOption: {
    // ********************************************************************************************************************* //
    /**
     * "Reports" function: Prompts the user to select tags and object type, then filters notes based on those selections.
     * Inputs: tags (OR and AND), object type (Attachments, Links, Images)
     * Output: Filtered notes + objects based on the selected criteria.
     */
    "Report!": async function (app) {
	// Prompt the user for tags and object type input
	const result = await app.prompt(
	  "Select Details on which you want to Report on.",
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
            label: "Select the Object Type (Mandatory)",
            type: "select",
            options: [
              { label: "Basic - All MD []() Formats", value: "basic" },
              { label: "Advanced - Attachments", value: "attachments" },
              { label: "Advanced - Images", value: "amplenote-images" },
              { label: "Advanced - Videos", value: "amplenote-videos" }
            ]
          }
		]
	  }
	);

	// Log the user input (result)
	// console.log("User input result:", result);

	// Destructure the user input from the result array
	const [tagNamesOr, tagNamesAnd, objectType] = result;
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
	  return;
	}

    // Ensure tags and formatting are selected
    if (!objectType) {
      app.alert("Note: Select any one of the Object type and Formatting");
      return;
    }

	// Initialize empty arrays for storing notes and filtered notes
	let notes = [];
	// console.log("Initial notes array:", notes);

	const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray (from tagNamesOr):", tagsArray);

	let filteredNotes = [];
	// console.log("Initial filteredNotes array:", filteredNotes);

	// Filtering logic based on tags [OR] and [AND]
	if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
	  // Filter notes by OR tags (separate search for each tag)
	  if (Array.isArray(tagsArray) && tagsArray.length > 0) {
		for (const tag of tagsArray) {
		  const notesByTag = await app.filterNotes({ tag: tag });
		  // console.log(`Notes filtered by tag "${tag}":`, notesByTag);
		  filteredNotes = [...filteredNotes, ...notesByTag];
		  // console.log("filteredNotes after OR filter:", filteredNotes);
		}
	  }

	  // Filter notes by AND tags (combined search for all tags)
	  if (tagNamesAnd) {
		const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
		// console.log("Notes filtered by AND tags:", notesByGroup);
		filteredNotes = [...filteredNotes, ...notesByGroup];
		// console.log("filteredNotes after AND filter:", filteredNotes);
	  }
	} else {
	  // Default filter if no tags are provided
	  const notesByGroup = await app.filterNotes({ group: "^vault" });
	  // console.log("Notes filtered by default group (^vault):", notesByGroup);
	  filteredNotes = [...filteredNotes, ...notesByGroup];
	  // console.log("filteredNotes after default group filter:", filteredNotes);
	}

	// Remove duplicate notes
	filteredNotes = [...new Set(filteredNotes)];
	// console.log("filteredNotes after removing duplicates:", filteredNotes);

	// Sort the filtered notes by note name in ascending order
	filteredNotes.sort((a, b) => {
	  const nameA = (a.name || "").toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
	  const nameB = (b.name || "").toUpperCase();
	  if (nameA < nameB) {
		return -1;
	  }
	  if (nameA > nameB) {
		return 1;
	  }
	  return 0; // Names are equal
	});

	// console.log("filteredNotes after sorting by name:", filteredNotes);

	notes = filteredNotes;
	// console.log("Final notes array:", notes);

	// Define horizontal line and introductory text for the markdown document
	let markdownReport;
	const horizontalLine = `

---

`;

	// ---------------------------------------------------------- //

	if (objectType === "basic") {

	const introLines = `
# Welcome to your Attachment Manager: Report (Basic). <!-- {"collapsed":true} -->
Here you can find the count of All Basic Attachments in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- (1) \`Attachments [Through API]\`, 
- (2) \`All Images [Through API]\`, (3) \`Amplenote Images [Images hosted by Amplenote]\`, (4) \`Non-Amplenote Hosted Images [Images hosted in the Web]\`, 
- (5) \`Amplenote Videos [Videos hosted by Amplenote]\`, 
- (6) \`Links [Normal Non-Amplenote links].\`
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| Note 🔗 | Tags 🏷️ | Attachments 📃 | Images 🖼️ | Amplenote Images ☁️ | Non-Amplenote Images 🌐 | Amplenote Videos 🎞️ | Links 🔗 |\n";
	markdownReport += "|---------|---------|---------------|-----------|---------------------|------------------------|---------------------|----------|\n";
	markdownReport += "|| **Total Sum** |=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|\n";

	// console.log("Initial markdownReport:", markdownReport);

	// Loop through each note and extract content
	for (const note of notes) {
	  try {
		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);

		// Get note content in markdown format
		const markdown = await app.getNoteContent({ uuid: noteUUID });
		// console.log(`Markdown content for note ${noteUUID}:`, markdown);

		// Extract attachments via API
		const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
		// console.log("attachmentsAPI:", attachmentsAPI);

		// Extract AmpleNote image links via API and regex
		const imagesAPI = await app.getNoteImages({ uuid: noteUUID });
		// console.log("imagesAPI:", imagesAPI);

		// Filter images that are hosted on AmpleNote
		const ampleNoteImages = imagesAPI.filter(image => image.src.startsWith("https://images.amplenote.com/"));
		// console.log("Images hosted on AmpleNote:", ampleNoteImages);

		// Filter images that are not hosted on AmpleNote
		const nonAmpleNoteImages = imagesAPI.filter(image => !image.src.startsWith("https://images.amplenote.com/"));
		// console.log("Images not hosted on AmpleNote:", nonAmpleNoteImages);

		// Extract AmpleNote video links
		// const ampleNoteVideosRegex = /!\[([^\]]+)\]\((https:\/\/images\.amplenote\.com\/.*?)\)/g;
		const ampleNoteVideosRegex = /!\[([^\]]+)\]\((https:\/\/images\.amplenote\.com\/.*?\.(mp4|mov|mpg|webm))\)/g;
		const ampleNoteVideos = [...markdown.matchAll(ampleNoteVideosRegex)].map(match => ({
		  name: match[1],  // Video name
		  url: match[2],   // Video URL
		  format: match[2].split('.').pop()  // File format
		}));
		// console.log(`AmpleNote Videos for note ${noteUUID}:`, ampleNoteVideos);

		// Extract non-AmpleNote links excluding images and attachments
		const linkRegex = /\[([^\]]+)\]\((?!attachment:\/\/)(?!https:\/\/images\.amplenote\.com\/)(?!https:\/\/www\.amplenote\.com\/notes\/)(.*?)\)/g;
		const links = [...markdown.matchAll(linkRegex)].map(match => ({
		  name: match[1],  // Link text
		  url: match[2]    // URL
		}));
		// console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, links);

		// Add extracted data to the markdown report
		if (attachmentsAPI.length > 0 || imagesAPI.length > 0 || ampleNoteImages.length > 0 || nonAmpleNoteImages.length > 0 || ampleNoteVideos.length > 0 || links.length > 0) {
		  markdownReport += `| [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${(attachmentsAPI.length === 0 ? ' - ' : attachmentsAPI.length)} | ${(imagesAPI.length === 0 ? ' - ' : imagesAPI.length)} | ${(ampleNoteImages.length === 0 ? ' - ' : ampleNoteImages.length)} | ${(nonAmpleNoteImages.length === 0 ? ' - ' : nonAmpleNoteImages.length)} | ${(ampleNoteVideos.length === 0 ? ' - ' : ampleNoteVideos.length)} | ${(links.length === 0 ? ' - ' : links.length)} |\n`;
		  // console.log("Updated markdownReport:", markdownReport);
		}
	  } catch (err) {
		if (err instanceof TypeError) {
		  console.warn(`Error processing note ${note.uuid}. Skipping this note.`);
		  continue;  // Skip notes with errors
		}
	  }
	}

	// Add final total sums to the markdown report
	markdownReport += "|| **Total Sum** |=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|\n";
	// console.log("Final markdownReport with total sums:", markdownReport);
	
	} // End for if - basic

	// ---------------------------------------------------------- //

	if (objectType === "attachments") {

	const introLines = `
# Welcome to your Attachment Manager: Report (Advanced - Attachments). <!-- {"collapsed":true} -->
Here you can find the count of All Attachments in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.xlsx\`** 🟩 | **\`.xls\`** 🟩 — Excel Spreadsheet files, commonly used for storing data in tabular form, calculations, charts, and pivot tables.
- **\`.docx\`** 🟦 | **\`.doc\`** 🟦 — Microsoft Word documents, frequently used for creating text documents with formatting, images, and other media.
- **\`.pptx\`** 🟧 | **\`.ppt\`** 🟧 — PowerPoint presentations, used for creating slide shows with text, images, and multimedia elements.
- **\`.pdf\`** 🟠 — Portable Document Format, a widely-used format for presenting documents that appear the same across different devices.
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| Note 🔗 | Tags 🏷️ | .xlsx 🟩 | .xls 🟩 | .docx 🟦 | .doc 🟦 | .pptx 🟧 | .ppt 🟧 | .pdf 🟠 |\n";
	markdownReport += "|---------|---------|----------|---------|----------|--------|----------|---------|---------|\n";
	markdownReport += "|| **Total Sum** |=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|\n";

	// console.log("Initial markdownReport:", markdownReport);

	// Loop through each note and extract content
	for (const note of notes) {
	  try {
		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);

		// Extract attachments via API
		const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
		// console.log("attachmentsAPI:", attachmentsAPI);
		
		// Filter attachments based on their file extensions
		const attachmentsAPIxlsx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".xlsx"));
		const attachmentsAPIxls = attachmentsAPI.filter(attachment => attachment.name.endsWith(".xls"));
		const attachmentsAPIdocx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".docx"));
		const attachmentsAPIdoc = attachmentsAPI.filter(attachment => attachment.name.endsWith(".doc"));
		const attachmentsAPIpptx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".pptx"));
		const attachmentsAPIppt = attachmentsAPI.filter(attachment => attachment.name.endsWith(".ppt"));
		const attachmentsAPIpdf = attachmentsAPI.filter(attachment => attachment.name.endsWith(".pdf"));

		// Add extracted data to the markdown report
		if (attachmentsAPIxlsx.length > 0 || attachmentsAPIxls.length > 0 || attachmentsAPIdocx.length > 0 || attachmentsAPIdoc.length > 0 || attachmentsAPIpptx.length > 0 || attachmentsAPIppt.length > 0 || attachmentsAPIpdf.length > 0) {
		  markdownReport += `| [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${(attachmentsAPIxlsx.length === 0 ? ' - ' : attachmentsAPIxlsx.length)} | ${(attachmentsAPIxls.length === 0 ? ' - ' : attachmentsAPIxls.length)} | ${(attachmentsAPIdocx.length === 0 ? ' - ' : attachmentsAPIdocx.length)} | ${(attachmentsAPIdoc.length === 0 ? ' - ' : attachmentsAPIdoc.length)} | ${(attachmentsAPIpptx.length === 0 ? ' - ' : attachmentsAPIpptx.length)} | ${(attachmentsAPIppt.length === 0 ? ' - ' : attachmentsAPIppt.length)} | ${(attachmentsAPIpdf.length === 0 ? ' - ' : attachmentsAPIpdf.length)} |\n`;
		  // console.log("Updated markdownReport:", markdownReport);
		}
	  } catch (err) {
		if (err instanceof TypeError) {
		  console.warn(`Error processing note ${note.uuid}. Skipping this note.`);
		  continue;  // Skip notes with errors
		}
	  }
	}

	// Add final total sums to the markdown report
	markdownReport += "|| **Total Sum** |=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|\n";
	// console.log("Final markdownReport with total sums:", markdownReport);
	
	} // End for if - attachments

	// ---------------------------------------------------------- //

	if (objectType === "amplenote-images") {

	const introLines = `
# Welcome to your Attachment Manager: Report (Advanced - Images). <!-- {"collapsed":true} -->
Here you can find the count of most common image extensions in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.jpg\`** 🖼️ | **\`.jpeg\`** 🖼️ — JPEG image files, commonly used for photographs and web images, providing good compression with decent quality.
- **\`.png\`** 🖼️ — PNG image files, often used for web graphics and images requiring transparency, with lossless compression.
- **\`.gif\`** 🎞️ — GIF image files, popular for simple animations and web graphics, limited to 256 colors.
- **\`.bmp\`** 🖼️ — BMP files, uncompressed and typically large, used for storing high-quality images in older systems.
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| Note 🔗 | Tags 🏷️ | .jpg/.jpeg 🖼️ | .png 🖼️ | .gif 🎞️ | .bmp 🖼️ | Others 🖼️ |\n";
	markdownReport += "|---------|---------|------------|------|------|------|--------|\n";
	markdownReport += "|| **Total Sum** |=sum(below)|=sum(below)|=sum(below)|=sum(below)|=sum(below)|\n";

	// console.log("Initial markdownReport:", markdownReport);

	// Loop through each note and extract content
	for (const note of notes) {
	  try {
		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);

		// Extract AmpleNote image links via API and regex
		const imagesAPI = await app.getNoteImages({ uuid: noteUUID });
		// console.log("imagesAPI:", imagesAPI);
		
		// Filter for common image extensions
		const imagesAPIjpg = imagesAPI.filter(image => image.src.endsWith(".jpg") || image.src.endsWith(".jpeg"));
		const imagesAPIpng = imagesAPI.filter(image => image.src.endsWith(".png"));
		const imagesAPIgif = imagesAPI.filter(image => image.src.endsWith(".gif"));
		const imagesAPIbmp = imagesAPI.filter(image => image.src.endsWith(".bmp"));
		// const imagesAPItiff = imagesAPI.filter(image => image.src.endsWith(".tiff") || image.src.endsWith(".tif"));
		// const imagesAPIwebp = imagesAPI.filter(image => image.src.endsWith(".webp"));
		// const imagesAPIsvg = imagesAPI.filter(image => image.src.endsWith(".svg"));
		// const imagesAPIico = imagesAPI.filter(image => image.src.endsWith(".ico"));

		// Filter for unmatched records (images with extensions that don't match any of the above)
		const imagesAPINonMatched = imagesAPI.filter(image => {
			return !image.src.endsWith(".jpg") &&
				   !image.src.endsWith(".jpeg") &&
				   !image.src.endsWith(".png") &&
				   !image.src.endsWith(".gif") &&
				   !image.src.endsWith(".bmp") 
				   // &&
				   // !image.src.endsWith(".tiff") &&
				   // !image.src.endsWith(".tif") &&
				   // !image.src.endsWith(".webp") &&
				   // !image.src.endsWith(".svg") &&
				   // !image.src.endsWith(".ico")
				   ;
		});

		// Add extracted data to the markdown report
		if (imagesAPIjpg.length > 0 || imagesAPIpng.length > 0 || imagesAPIgif.length > 0 || imagesAPIbmp.length > 0 || imagesAPINonMatched.length > 0) {
		  markdownReport += `| [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${(imagesAPIjpg.length === 0 ? ' - ' : imagesAPIjpg.length)} | ${(imagesAPIpng.length === 0 ? ' - ' : imagesAPIpng.length)} | ${(imagesAPIgif.length === 0 ? ' - ' : imagesAPIgif.length)} | ${(imagesAPIbmp.length === 0 ? ' - ' : imagesAPIbmp.length)} | ${(imagesAPINonMatched.length === 0 ? ' - ' : imagesAPINonMatched.length)} |\n`;
		  // console.log("Updated markdownReport:", markdownReport);
		}
	  } catch (err) {
		if (err instanceof TypeError) {
		  console.warn(`Error processing note ${note.uuid}. Skipping this note.`);
		  continue;  // Skip notes with errors
		}
	  }
	}

	// Add final total sums to the markdown report
	markdownReport += "|| **Total Sum** |=sum(above)|=sum(above)|=sum(above)|=sum(above)|=sum(above)|\n";
	// console.log("Final markdownReport with total sums:", markdownReport);
	
	} // End for if - amplenote-images

	// ---------------------------------------------------------- //

	if (objectType === "amplenote-videos") {

	const introLines = `
# Welcome to your Attachment Manager: Report (Advanced - Videos). <!-- {"collapsed":true} -->
Here you can find the count of most common video extensions in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **.mp4 🎥** — Video file formats commonly used for storing digital video. MP4 is widely supported across platforms.
- **.mov 🎥** — MOV is primarily used by Apple's QuickTime.
- **.mpg 🎞️** — A standard format for video compression and distribution, particularly for DVDs and digital broadcasting.
- **.webm 🎬** — An open-source, royalty-free format designed for delivering high-quality video through web browsers.
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| Note 🔗 | Tags 🏷️ | .mp4 🎥 | .mov 🎥 | .mpg 🎞️ | .webm 🎬 |\n";
	markdownReport += "|---------|---------|---------|--------|---------|----------|\n";
	markdownReport += "|| **Total Sum** |=sum(below)|=sum(below)|=sum(below)|=sum(below)|\n";

	// console.log("Initial markdownReport:", markdownReport);

	// Loop through each note and extract content
	for (const note of notes) {
	  try {
		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);

		// Get note content in markdown format
		const markdown = await app.getNoteContent({ uuid: noteUUID });
		// console.log(`Markdown content for note ${noteUUID}:`, markdown);

		// Regex to match AmpleNote videos with specific formats (mp4, mov, mpg, webm)
		const ampleNoteVideosRegex = /!\[([^\]]+)\]\((https:\/\/images\.amplenote\.com\/.*?\.(mp4|mov|mpg|webm))\)/g;

		// Extracting ampleNoteVideos that match the regex
		const ampleNoteVideos = [...markdown.matchAll(ampleNoteVideosRegex)].map(match => ({
		  name: match[1],  // Video name from the first capture group
		  url: match[2],   // Video URL from the second capture group
		  format: match[2].split('.').pop()  // Extract the file format from the URL
		}));
		// console.log(`AmpleNote Videos for note ${noteUUID}:`, ampleNoteVideos);

		// Further filtering for specific video formats (though already filtered by regex)
		const ampleNoteVideosMP4 = ampleNoteVideos.filter(video => video.format === "mp4");
		const ampleNoteVideosMOV = ampleNoteVideos.filter(video => video.format === "mov");
		const ampleNoteVideosMPG = ampleNoteVideos.filter(video => video.format === "mpg");
		const ampleNoteVideosWEBM = ampleNoteVideos.filter(video => video.format === "webm");
		
		// Add extracted data to the markdown report
		if (ampleNoteVideosMP4.length > 0 || ampleNoteVideosMOV.length > 0 || ampleNoteVideosMPG.length > 0 || ampleNoteVideosWEBM.length > 0) {
		  markdownReport += `| [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) | ${note.tags} | ${(ampleNoteVideosMP4.length === 0 ? ' - ' : ampleNoteVideosMP4.length)} | ${(ampleNoteVideosMOV.length === 0 ? ' - ' : ampleNoteVideosMOV.length)} | ${(ampleNoteVideosMPG.length === 0 ? ' - ' : ampleNoteVideosMPG.length)} | ${(ampleNoteVideosWEBM.length === 0 ? ' - ' : ampleNoteVideosWEBM.length)} |\n`;
		  // console.log("Updated markdownReport:", markdownReport);
		}
	  } catch (err) {
		if (err instanceof TypeError) {
		  console.warn(`Error processing note ${note.uuid}. Skipping this note.`);
		  continue;  // Skip notes with errors
		}
	  }
	}

	// Add final total sums to the markdown report
	markdownReport += "|| **Total Sum** |=sum(above)|=sum(above)|=sum(above)|=sum(above)|\n";
	// console.log("Final markdownReport with total sums:", markdownReport);
	
	} // End for if - amplenote-videos

	// ---------------------------------------------------------- //

	// Initialize variables for processing results
	let finalResults = markdownReport;
	// console.log("Final results for the report:", finalResults);

	// Function to get current date and time formatted as YYMMDD_HHMMSS
	function getCurrentDateTime() {
	  const now = new Date();

	  // Format the date and time
	  const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
	  const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');

	  return { YYMMDD, HHMMSS };
	}

	// Generate a new note with the report results
	const { YYMMDD, HHMMSS } = getCurrentDateTime();
	// console.log("Generated date and time:", YYMMDD, HHMMSS);

	const newNoteName = `Attachment Manager: Report ${YYMMDD}_${HHMMSS}`;
	// console.log("New note name:", newNoteName);

	const newTagName = ['-reports/-attachment-manager'];
	// console.log("New note tags:", newTagName);

	let noteUUID = await app.createNote(newNoteName, newTagName);
	// console.log("Created note UUID:", noteUUID);

	await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
	// console.log("Replaced note content with final results");

	await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
	// console.log("Navigated to the new note:", noteUUID);


    },

    // ********************************************************************************************************************* //
    /**
     * "List" function: Similar to "Reports", but adds formatting options for displaying the filtered notes in document or table format.
     * Inputs: tags (OR and AND), object type, list formatting (document or table)
     * Output: Filtered and formatted notes + objects.
     */
    "Lists!": async function (app) {
	// Prompt the user for tags and object type input
    const result = await app.prompt(
        "Select Details on which you want to Report on.",
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
              label: "Select the Object Type",
              type: "select",
              options: [
                { label: "Basic - All Attachments", value: "all-attachments" },
                { label: "Basic - All Images", value: "all-images" },
                { label: "Advanced - All Attachments", value: "attachments" },
                { label: "Advanced - Amplenote Hosted Images", value: "amplenote-images" },
                { label: "Advanced - Non-Amplenote Hosted Images", value: "nonamplenote-images" },
                { label: "Advanced - Amplenote Hosted Videos", value: "amplenote-videos" },
                { label: "Advanced - Links", value: "links" }
              ]
            } /*, // May be some other day!!
            {
              label: "Select the List Formatting",
              type: "select",
              options: [
                { label: "Document", value: "document" },
                { label: "Table", value: "table" }
              ]
            } */
          ]
        }
      );

	// Log the user input (result)
	// console.log("User input result:", result);

    // Destructure the input for OR/AND tags, object type, and list format
	// const [tagNamesOr, tagNamesAnd, objectType, listFormat] = result;
    const [tagNamesOr, tagNamesAnd, objectType] = result;
	const listFormat = "document";
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
	  return;
	}

    // Ensure tags and formatting are selected
    // if (!tagNamesOr && !tagNamesAnd) {
      // app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
      // return;
    // }
    if (!objectType || !listFormat) {
      app.alert("Note: Select any one of the Object type and Formatting");
      return;
    }

	// Initialize empty arrays for storing notes and filtered notes
	let notes = [];
	// console.log("Initial notes array:", notes);

	const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray (from tagNamesOr):", tagsArray);

	let filteredNotes = [];
	// console.log("Initial filteredNotes array:", filteredNotes);

	// Filtering logic based on tags [OR] and [AND]
	if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
	  // Filter notes by OR tags (separate search for each tag)
	  if (Array.isArray(tagsArray) && tagsArray.length > 0) {
		for (const tag of tagsArray) {
		  const notesByTag = await app.filterNotes({ tag: tag });
		  // console.log(`Notes filtered by tag "${tag}":`, notesByTag);
		  filteredNotes = [...filteredNotes, ...notesByTag];
		  // console.log("filteredNotes after OR filter:", filteredNotes);
		}
	  }

	  // Filter notes by AND tags (combined search for all tags)
	  if (tagNamesAnd) {
		const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
		// console.log("Notes filtered by AND tags:", notesByGroup);
		filteredNotes = [...filteredNotes, ...notesByGroup];
		// console.log("filteredNotes after AND filter:", filteredNotes);
	  }
	} else {
	  // Default filter if no tags are provided
	  const notesByGroup = await app.filterNotes({ group: "^vault" });
	  // console.log("Notes filtered by default group (^vault):", notesByGroup);
	  filteredNotes = [...filteredNotes, ...notesByGroup];
	  // console.log("filteredNotes after default group filter:", filteredNotes);
	}

	// Remove duplicate notes
	filteredNotes = [...new Set(filteredNotes)];
	// console.log("filteredNotes after removing duplicates:", filteredNotes);

	// Sort the filtered notes by note name in ascending order
	filteredNotes.sort((a, b) => {
	  const nameA = (a.name || "").toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
	  const nameB = (b.name || "").toUpperCase();
	  if (nameA < nameB) {
		return -1;
	  }
	  if (nameA > nameB) {
		return 1;
	  }
	  return 0; // Names are equal
	});

	// console.log("filteredNotes after sorting by name:", filteredNotes);

	notes = filteredNotes;
	// console.log("Final notes array:", notes);

    // Helper function to format date-time strings
    function formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    }

	// Define horizontal line and introductory text for the markdown document
	let markdownReport;
	const horizontalLine = `

---

`;
	// ---------------------------------------------------------- //

	if (objectType === "all-attachments") {

	const introLines = `
# Welcome to your Attachment Manager. <!-- {"collapsed":true} -->
Here you can find the List of Attachments in \`${listFormat}\` format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.xlsx\`** 🟩 | **\`.xls\`** 🟩 — Excel Spreadsheet files, commonly used for storing data in tabular form, calculations, charts, and pivot tables.
- **\`.docx\`** 🟦 | **\`.doc\`** 🟦 — Microsoft Word documents, frequently used for creating text documents with formatting, images, and other media.
- **\`.pptx\`** 🟧 | **\`.ppt\`** 🟧 — PowerPoint presentations, used for creating slide shows with text, images, and multimedia elements.
- **\`.pdf\`** 🟠 — Portable Document Format, a widely-used format for presenting documents that appear the same across different devices.
> Object Type Selection: Basic - All Attachments.
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	// console.log("Initial markdownReport:", markdownReport);

	// Loop through each note and extract content
	for (const note of notes) {
	  try {
		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);
		
		// Extract attachments via API
		const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
		// console.log("attachmentsAPI:", attachmentsAPI);
		
		// Filter attachments based on their file extensions
		const attachmentsAPIxlsx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".xlsx"));
		const attachmentsAPIxls = attachmentsAPI.filter(attachment => attachment.name.endsWith(".xls"));
		const attachmentsAPIdocx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".docx"));
		const attachmentsAPIdoc = attachmentsAPI.filter(attachment => attachment.name.endsWith(".doc"));
		const attachmentsAPIpptx = attachmentsAPI.filter(attachment => attachment.name.endsWith(".pptx"));
		const attachmentsAPIppt = attachmentsAPI.filter(attachment => attachment.name.endsWith(".ppt"));
		const attachmentsAPIpdf = attachmentsAPI.filter(attachment => attachment.name.endsWith(".pdf"));

		// Add extracted data to the markdown report
		if (attachmentsAPI.length > 0 || imagesAPI.length > 0 || ampleNoteImages.length > 0 || nonAmpleNoteImages.length > 0 || ampleNoteVideos.length > 0 || links.length > 0) {

		markdownReport += `## Note: [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) <!-- {"collapsed":true} -->`;
		markdownReport += `\nTags: ${note.tags}`;
		markdownReport += `\nCreated: ${formatDateTime(note.created)}`;
		markdownReport += `\nUpdated: ${formatDateTime(note.updated)}`;
		markdownReport += `\n${horizontalLine}`;

			if (attachmentsAPIxlsx.length > 0) {
				markdownReport += `### File Type: XLSX`;
				const clickableLinks = attachmentsAPIxlsx.map(link => {
					return `[${link.name}](${link.uuid})`;
				}).join("\n");
				markdownReport += `\n${clickableLinks}`;
			}

		}

		markdownReport += `\n${horizontalLine}`;

	  } catch (err) {
		if (err instanceof TypeError) {
		  console.warn(`Error processing note ${note.uuid}. Skipping this note.`);
		  continue;  // Skip notes with errors
		}
	  }
	}
	
	} // End for if - all-attachments

	// ---------------------------------------------------------- //

	// Initialize variables for processing results
	let finalResults = markdownReport;
	// console.log("Final results for the report:", finalResults);

	// Function to get current date and time formatted as YYMMDD_HHMMSS
	function getCurrentDateTime() {
	  const now = new Date();

	  // Format the date and time
	  const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
	  const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');

	  return { YYMMDD, HHMMSS };
	}

	// Generate a new note with the report results
	const { YYMMDD, HHMMSS } = getCurrentDateTime();
	// console.log("Generated date and time:", YYMMDD, HHMMSS);

	const newNoteName = `Attachment Manager: List ${YYMMDD}_${HHMMSS}`;
	// console.log("New note name:", newNoteName);

	const newTagName = ['-reports/-attachment-manager'];
	// console.log("New note tags:", newTagName);

	let noteUUID = await app.createNote(newNoteName, newTagName);
	// console.log("Created note UUID:", noteUUID);

	await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
	// console.log("Replaced note content with final results");

	await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
	// console.log("Navigated to the new note:", noteUUID);

    },

    // ********************************************************************************************************************* //
    /**
     * "Download" function: Provides an option to download filtered notes in different formats like markdown, CSV, TXT, or JSON.
     * Inputs: tags (OR and AND), object type, download format
     * Output: Downloadable file in the selected format containing filtered notes + objects.
     */
    "Download!": async function (app) {
	// Prompt the user for tags and object type input
    const result = await app.prompt(
        "Select Details on which you want to Report on.",
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
              label: "Select the Object Type",
              type: "select",
              options: [
                { label: "Basic - All Attachments", value: "all-attachments" },
                { label: "Basic - All Images", value: "all-images" },
                { label: "Advanced - All Attachments", value: "attachments" },
                { label: "Advanced - Amplenote Hosted Images", value: "amplenote-images" },
                { label: "Advanced - Non-Amplenote Hosted Images", value: "nonamplenote-images" },
                { label: "Advanced - Amplenote Hosted Videos", value: "amplenote-videos" },
                { label: "Advanced - Links", value: "links" },
				{ label: "Raw Data - All the above Details", value: "everything" }
              ]
            },
            {
              label: "Select the Download Format",
              type: "select",
              options: [
                { label: "Download as markdown", value: "download_md" },
                { label: "Download as CSV", value: "download_csv" },
                { label: "Download as TXT", value: "download_txt" },
                { label: "Download as JSON", value: "download_json" }
              ]
            }
          ]
        }
      );

	// Log the user input (result)
	// console.log("User input result:", result);

    // Destructure the inputs for OR/AND tags, object type, and download format
    const [tagNamesOr, tagNamesAnd, objectType, dwFormat] = result;
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
	  return;
	}

    // Ensure tags and formatting are selected
    // if (!tagNamesOr && !tagNamesAnd) {
      // app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
      // return;
    // }
    if (!objectType || !listFormat) {
      app.alert("Note: Select any one of the Object type and Formatting");
      return;
    }

	// Initialize empty arrays for storing notes and filtered notes
	let notes = [];
	// console.log("Initial notes array:", notes);

	const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
	// console.log("tagsArray (from tagNamesOr):", tagsArray);

	let filteredNotes = [];
	// console.log("Initial filteredNotes array:", filteredNotes);

	// Filtering logic based on tags [OR] and [AND]
	if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
	  // Filter notes by OR tags (separate search for each tag)
	  if (Array.isArray(tagsArray) && tagsArray.length > 0) {
		for (const tag of tagsArray) {
		  const notesByTag = await app.filterNotes({ tag: tag });
		  // console.log(`Notes filtered by tag "${tag}":`, notesByTag);
		  filteredNotes = [...filteredNotes, ...notesByTag];
		  // console.log("filteredNotes after OR filter:", filteredNotes);
		}
	  }

	  // Filter notes by AND tags (combined search for all tags)
	  if (tagNamesAnd) {
		const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
		// console.log("Notes filtered by AND tags:", notesByGroup);
		filteredNotes = [...filteredNotes, ...notesByGroup];
		// console.log("filteredNotes after AND filter:", filteredNotes);
	  }
	} else {
	  // Default filter if no tags are provided
	  const notesByGroup = await app.filterNotes({ group: "^vault" });
	  // console.log("Notes filtered by default group (^vault):", notesByGroup);
	  filteredNotes = [...filteredNotes, ...notesByGroup];
	  // console.log("filteredNotes after default group filter:", filteredNotes);
	}

	// Remove duplicate notes
	filteredNotes = [...new Set(filteredNotes)];
	// console.log("filteredNotes after removing duplicates:", filteredNotes);

	// Sort the filtered notes by note name in ascending order
	filteredNotes.sort((a, b) => {
	  const nameA = (a.name || "").toUpperCase(); // Convert to uppercase to ensure case-insensitive sorting
	  const nameB = (b.name || "").toUpperCase();
	  if (nameA < nameB) {
		return -1;
	  }
	  if (nameA > nameB) {
		return 1;
	  }
	  return 0; // Names are equal
	});

	// console.log("filteredNotes after sorting by name:", filteredNotes);

	notes = filteredNotes;
	// console.log("Final notes array:", notes);

	// Define horizontal line and introductory text for the markdown document
	let markdownReport;
	const horizontalLine = `

---

`;
	// ---------------------------------------------------------- //
	// ---------------------------------------------------------- //

	// Initialize variables for processing results
	let finalResults = markdownReport;
	// console.log("Final results for the report:", finalResults);

	// Function to get current date and time formatted as YYMMDD_HHMMSS
	function getCurrentDateTime() {
	  const now = new Date();

	  // Format the date and time
	  const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
	  const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');

	  return { YYMMDD, HHMMSS };
	}

	// Generate a new note with the report results
	const { YYMMDD, HHMMSS } = getCurrentDateTime();
	// console.log("Generated date and time:", YYMMDD, HHMMSS);

	const newNoteName = `Attachment Manager: List ${YYMMDD}_${HHMMSS}`;
	// console.log("New note name:", newNoteName);

	const newTagName = ['-reports/-attachment-manager'];
	// console.log("New note tags:", newTagName);

	let noteUUID = await app.createNote(newNoteName, newTagName);
	// console.log("Created note UUID:", noteUUID);

	await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
	// console.log("Replaced note content with final results");

	await app.navigate(`https://www.amplenote.com/notes/${noteUUID}`);
	// console.log("Navigated to the new note:", noteUUID);

    },

    // ********************************************************************************************************************* //
  },
  linkOption: {
	"Open": async function (app, link) {
		// Define the regex to match UUID format
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		console.log("link", link);
		
		// Opens the link if the link contains a valid attachment UUID
		if (uuidRegex.test(link.href)) {
			const attachmentURL = await app.getAttachmentURL(link.href);
			
			// Create an anchor element and set the download attribute
			const a = document.createElement('a');
			a.href = attachmentURL;
			a.download = '';  // The 'download' attribute triggers the download
			document.body.appendChild(a);
			a.click();  // Programmatically trigger a click event to start the download
			document.body.removeChild(a);  // Clean up after the click

			console.log("attachmentURL", attachmentURL);
			await app.alert("Your file has been downloaded.");
		} else {
			await app.alert("Note doesn't have any valid UUID attachments Link");
		}
	}
  },
}