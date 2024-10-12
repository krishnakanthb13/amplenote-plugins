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
	  "Select Details on which you want to your Report on.",
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
			type: "radio",
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
# Welcome to your Markdown Media Manager: Report (Basic). <!-- {"collapsed":true} -->
Here you can find the count of All Basic Media in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- (1) \`Attachments [Through API]\`, 
- (2) \`All Images [Through API]\`, (3) \`Amplenote Images [Images hosted by Amplenote]\`, (4) \`Non-Amplenote Hosted Images [Images hosted on the Web]\`, 
- (5) \`Amplenote Videos [Videos hosted by Amplenote]\`, 
- (6) \`Links [Normal Non-Amplenote links].\`
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| `Note` 🔗 | `Tags` 🏷️ | `Attachments` 📃 | `Images` 🖼️ | `Amplenote Images` ☁️ | `Non-Amplenote Images` 🌐 | `Amplenote Videos` 🎞️ | `Links` 🔗 |\n";
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
# Welcome to your Markdown Media Manager: Report (Advanced - Attachments). <!-- {"collapsed":true} -->
Here you can find the count of All Attachments in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.xlsx\`** 🟩 | **\`.xls\`** 🟩 — Excel Spreadsheet files, commonly used for storing data in tabular form, calculations, charts, and pivot tables.
- **\`.docx\`** 🟦 | **\`.doc\`** 🟦 — Microsoft Word documents, frequently used for creating text documents with formatting, images, and other media.
- **\`.pptx\`** 🟧 | **\`.ppt\`** 🟧 — PowerPoint presentations, used for creating slide shows with text, images, and multimedia elements.
- **\`.pdf\`** 🟠 — Portable Document Format, a widely-used format for presenting documents that appear the same across different devices.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| `Note` 🔗 | `Tags` 🏷️ | `.xlsx` 🟩 | `.xls` 🟩 | `.docx` 🟦 | `.doc` 🟦 | `.pptx` 🟧 | `.ppt` 🟧 | `.pdf` 🟠 |\n";
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
# Welcome to your Markdown Media Manager: Report (Advanced - Images). <!-- {"collapsed":true} -->
Here you can find the count of most common Image extensions in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.jpg\`** 🖼️ | **\`.jpeg\`** 🖼️ — JPEG image files, commonly used for photographs and web images, providing good compression with decent quality.
- **\`.png\`** 🖼️ — PNG image files, often used for web graphics and images requiring transparency, with lossless compression.
- **\`.gif\`** 🎞️ — GIF image files, popular for simple animations and web graphics, limited to 256 colors.
- **\`.bmp\`** 🖼️ — BMP files, uncompressed and typically large, used for storing high-quality images in older systems.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| `Note` 🔗 | `Tags` 🏷️ | `.jpg/.jpeg` 🖼️ | `.png` 🖼️ | `.gif` 🎞️ | `.bmp` 🖼️ | `Others` 🖼️ |\n";
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
# Welcome to your Markdown Media Manager: Report (Advanced - Videos). <!-- {"collapsed":true} -->
Here you can find the count of most common Video extensions in Table format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.mp4\` 🎥** — Video file formats commonly used for storing digital video. MP4 is widely supported across platforms.
- **\`.mov\` 🎥** — MOV is primarily used by Apple's QuickTime.
- **\`.mpg\` 🎞️** — A standard format for video compression and distribution, particularly for DVDs and digital broadcasting.
- **\`.webm\` 🎬** — An open-source, royalty-free format designed for delivering high-quality video through web browsers.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	// Initialize the markdown table format
	markdownReport = `${introLines}`;
	markdownReport += "| `Note` 🔗 | `Tags` 🏷️ | `.mp4` 🎥 | `.mov` 🎥 | `.mpg` 🎞️ | `.webm` 🎬 |\n";
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

	const newNoteName = `MD Media Manager: Report ${YYMMDD}_${HHMMSS}`;
	// console.log("New note name:", newNoteName);

	const newTagName = ['-reports/-media-manager'];
	// console.log("New note tags:", newTagName);

	let noteUUID = await app.createNote(newNoteName, newTagName);
	// console.log("Created note UUID:", noteUUID);

	await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
	// console.log("Replaced note content with final results");

    // Audit Report
    const auditNoteName = `MD Media Manager: Audit`;
    const auditTagName = ['-reports/-media-manager'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Media_Manager_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Media_Manager_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Media Manager Option:** Report!, **Inputs:** [Tags(OR): ${tagNamesOr}; Tags(AND): ${tagNamesAnd}; Object Type: ${objectType}; **Note:** [${newNoteName}](https://www.amplenote.com/notes/${noteUUID}), **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

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
			  type: "radio",
			  options: [
				{ label: "Attachments", value: "all-attachments" },
				{ label: "Images", value: "all-images" },
				{ label: "Videos", value: "all-videos" },
				{ label: "Links", value: "all-links" }
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

	// If the objectType is "all-attachments", this block of code will be executed
	if (objectType === "all-attachments") {

	  // Introductory text for the Markdown report
	  const introLines = `
# Welcome to your Markdown Media Manager. <!-- {"collapsed":true} -->
Here you can find the List of Attachments in \`${listFormat}\` format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.xlsx\`** 🟩 | **\`.xls\`** 🟩 — Excel Spreadsheet files, commonly used for storing data in tabular form, calculations, charts, and pivot tables.
- **\`.docx\`** 🟦 | **\`.doc\`** 🟦 — Microsoft Word documents, frequently used for creating text documents with formatting, images, and other media.
- **\`.pptx\`** 🟧 | **\`.ppt\`** 🟧 — PowerPoint presentations, used for creating slide shows with text, images, and multimedia elements.
- **\`.pdf\`** 🟠 — Portable Document Format, a widely-used format for presenting documents that appear the same across different devices.
> **Object Type Selection:** Attachments.
> **Note:** Using the Link Option, you can \`download\` the Attachment.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	  // Initialize the Markdown report with the introductory text
	  markdownReport = `${introLines}`;
	  // console.log("Initial markdownReport:", markdownReport); // Log the initial report

	  // Iterate over each note and extract the content
	  for (const note of notes) {
		try {
		  const noteUUID = note.uuid;
		  // console.log(`Processing note with UUID: ${noteUUID}`); // Log the UUID of the note being processed
		  
		  // Extract attachments via the API
		  const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
		  // console.log("attachmentsAPI:", attachmentsAPI); // Log the fetched attachments

		  // If the note contains attachments, generate the report section for this note
		  if (attachmentsAPI.length > 0) {
			markdownReport += `## Note: [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) <!-- {"collapsed":true} -->\n`;
			markdownReport += `\n<mark>Tags:</mark> ${note.tags}\n`;
			markdownReport += `\n<mark>Created:</mark> ${formatDateTime(note.created)}\n`;
			markdownReport += `\n<mark>Updated:</mark> ${formatDateTime(note.updated)}\n`;
			markdownReport += `\n${horizontalLine}\n`;

			// Define an array of file types and their corresponding file extensions
			const fileTypes = [
			  { type: "XLSX", ext: ".xlsx" },
			  { type: "XLS", ext: ".xls" },
			  { type: "DOCX", ext: ".docx" },
			  { type: "DOC", ext: ".doc" },
			  { type: "PPTX", ext: ".pptx" },
			  { type: "PPT", ext: ".ppt" },
			  { type: "PDF", ext: ".pdf" }
			];

			// Loop through each file type and filter attachments based on their extension
			fileTypes.forEach(({ type, ext }) => {
			  const filteredAttachments = attachmentsAPI.filter(attachment => attachment.name.endsWith(ext));
			  // console.log(`Filtered attachments for ${type}:`, filteredAttachments); // Log filtered attachments
			  
			  // If there are attachments for the current file type, add them to the report
			  if (filteredAttachments.length > 0) {
				markdownReport += `### File Type: ${type}\n`;

				// Create clickable links for each filtered attachment and add them to the report
				const clickableLinks = filteredAttachments.map(link => `[${link.name}](${link.uuid})`).join("\n");
				markdownReport += `\n${clickableLinks}\n`;
				// console.log(`Markdown report for ${type}:`, markdownReport); // Log the report after adding each file type
			  }
			});

			// Add a horizontal line separator after each note's attachment list
			markdownReport += `\n${horizontalLine}\n`;
			// console.log("Updated markdownReport after processing note:", markdownReport); // Log the updated report after processing each note
		  }

		} catch (err) {
		  // Handle any errors that occur during note processing
		  if (err instanceof TypeError) {
			console.warn(`Error processing note ${note.uuid}. Skipping this note.`); // Warn about the error
			continue;  // Skip notes with errors
		  }
		}
	  }

	} // End of if condition for "all-attachments"

	// ---------------------------------------------------------- //

	// If the objectType is "all-images", this block of code will be executed
	if (objectType === "all-images") {

	  // Introductory text for the Markdown report
	  const introLines = `
# Welcome to your Markdown Media Manager. <!-- {"collapsed":true} -->
Here you can find the List of Images in \`${listFormat}\` format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.jpg\`** 🖼️ | **\`.jpeg\`** 🖼️ — JPEG image files, commonly used for photographs and web images, providing good compression with decent quality.
- **\`.png\`** 🖼️ — PNG image files, often used for web graphics and images requiring transparency, with lossless compression.
- **\`.gif\`** 🎞️ — GIF image files, popular for simple animations and web graphics, limited to 256 colors.
- **\`.bmp\`** 🖼️ — BMP files, uncompressed and typically large, used for storing high-quality images in older systems.
> **Object Type Selection:** Images.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	  // Initialize the Markdown report with the introductory text
	  markdownReport = `${introLines}`;
	  // console.log("Initial markdownReport:", markdownReport); // Log the initial report

	  // Iterate over each note and extract the content
	  for (const note of notes) {
		try {
		  const noteUUID = note.uuid;
		  // console.log(`Processing note with UUID: ${noteUUID}`); // Log the UUID of the note being processed
		  
		  // Extract attachments via the API
		  const imagesAPI = await app.getNoteImages({ uuid: noteUUID });
		  // console.log("attachmentsAPI:", attachmentsAPI); // Log the fetched attachments

		// If the note contains images, generate the report section for this note
		if (imagesAPI.length > 0) {
			markdownReport += `## Note: [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) <!-- {"collapsed":true} -->\n`;
			markdownReport += `\n<mark>Tags:</mark> ${note.tags}\n`;
			markdownReport += `\n<mark>Created:</mark> ${formatDateTime(note.created)}\n`;
			markdownReport += `\n<mark>Updated:</mark> ${formatDateTime(note.updated)}\n`;
			markdownReport += `\n${horizontalLine}\n`;

		  // Define an array of file types and their corresponding file extensions
		  const fileTypes = [
			{ type: "JPG", ext: ".jpg" },
			{ type: "JPEG", ext: ".jpeg" },
			{ type: "PNG", ext: ".png" },
			{ type: "GIF", ext: ".gif" },
			{ type: "BMP", ext: ".bmp" }
		  ];

		  // Initialize an array to hold other attachments
		  const otherAttachments = [];

		  // Loop through each file type and filter attachments based on their extension
		  fileTypes.forEach(({ type, ext }) => {
			const filteredAttachments = imagesAPI.filter(attachment => attachment.src.endsWith(ext));
			// console.log(`Filtered attachments for ${type}:`, filteredAttachments); // Log filtered attachments
			
			// If there are attachments for the current file type, add them to the report
			if (filteredAttachments.length > 0) {
			  markdownReport += `### File Type: ${type}\n`;

			  // Create clickable links for each filtered attachment and add them to the report
			  const clickableLinks = filteredAttachments.map(link => `[${link.src.split('/').pop()}](${link.src})`).join("\n");
			  markdownReport += `\n${clickableLinks}\n`;
			  // console.log(`Markdown report for ${type}:`, markdownReport); // Log the report after adding each file type
			}
		  });

		  // Identify and collect attachments that do not match any of the specified file types
		  otherAttachments.push(...imagesAPI.filter(attachment => 
			!fileTypes.some(({ ext }) => attachment.src.endsWith(ext))
		  ));

		  // If there are other attachments, add them to the report
		  if (otherAttachments.length > 0) {
			markdownReport += `### File Type: Other\n`;
			
			// Create clickable links for each other attachment and add them to the report
			const clickableLinks = otherAttachments.map(link => `[${link.src.split('/').pop()}](${link.src})`).join("\n");
			markdownReport += `\n${clickableLinks}\n`;
		  }

		  // Add a horizontal line separator after each note's attachment list
		  markdownReport += `\n${horizontalLine}\n`;
		  // console.log("Updated markdownReport after processing note:", markdownReport); // Log the updated report after processing each note
		}

		} catch (err) {
		  // Handle any errors that occur during note processing
		  if (err instanceof TypeError) {
			console.warn(`Error processing note ${note.uuid}. Skipping this note.`); // Warn about the error
			continue;  // Skip notes with errors
		  }
		}
	  }

	} // End of if condition for "all-images"

	// ---------------------------------------------------------- //

	// If the objectType is "all-images", this block of code will be executed
	if (objectType === "all-videos") {

	  // Introductory text for the Markdown report
	  const introLines = `
# Welcome to your Markdown Media Manager. <!-- {"collapsed":true} -->
Here you can find the List of Videos in \`${listFormat}\` format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`) of:
- **\`.mp4\` 🎥** — Video file formats commonly used for storing digital video. MP4 is widely supported across platforms.
- **\`.mov\` 🎥** — MOV is primarily used by Apple's QuickTime.
- **\`.mpg\` 🎞️** — A standard format for video compression and distribution, particularly for DVDs and digital broadcasting.
- **\`.webm\` 🎬** — An open-source, royalty-free format designed for delivering high-quality video through web browsers.
> **Object Type Selection:** Videos.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	  // Initialize the Markdown report with the introductory text
	  markdownReport = `${introLines}`;
	  // console.log("Initial markdownReport:", markdownReport); // Log the initial report

	  // Iterate over each note and extract the content
	  for (const note of notes) {
		try {
		  const noteUUID = note.uuid;
		  // console.log(`Processing note with UUID: ${noteUUID}`); // Log the UUID of the note being processed
		  
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

		// If the note contains attachments, generate the report section for this note
		if (ampleNoteVideos.length > 0) {
			markdownReport += `## Note: [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) <!-- {"collapsed":true} -->\n`;
			markdownReport += `\n<mark>Tags:</mark> ${note.tags}\n`;
			markdownReport += `\n<mark>Created:</mark> ${formatDateTime(note.created)}\n`;
			markdownReport += `\n<mark>Updated:</mark> ${formatDateTime(note.updated)}\n`;
			markdownReport += `\n${horizontalLine}\n`;

		  // Define an array of file types and their corresponding file extensions
		  const fileTypes = [
			{ type: "MP4", ext: ".mp4" },
			{ type: "MOV", ext: ".mov" },
			{ type: "MPG", ext: ".mpg" },
			{ type: "WEBM", ext: ".webm" }
		  ];

		  // Initialize an array to hold other attachments
		  const otherAttachments = [];

		  // Loop through each file type and filter attachments based on their extension
		  fileTypes.forEach(({ type, ext }) => {
			const filteredAttachments = ampleNoteVideos.filter(attachment => attachment.url.endsWith(ext));
			// console.log(`Filtered attachments for ${type}:`, filteredAttachments); // Log filtered attachments
			
			// If there are attachments for the current file type, add them to the report
			if (filteredAttachments.length > 0) {
			  markdownReport += `### File Type: ${type}\n`;

			  // Create clickable links for each filtered attachment and add them to the report
			  const clickableLinks = filteredAttachments.map(link => `[${link.name}](${link.url})`).join("\n");
			  markdownReport += `\n${clickableLinks}\n`;
			  // console.log(`Markdown report for ${type}:`, markdownReport); // Log the report after adding each file type
			}
		  });

		  // Add a horizontal line separator after each note's attachment list
		  markdownReport += `\n${horizontalLine}\n`;
		  // console.log("Updated markdownReport after processing note:", markdownReport); // Log the updated report after processing each note
		}

		} catch (err) {
		  // Handle any errors that occur during note processing
		  if (err instanceof TypeError) {
			console.warn(`Error processing note ${note.uuid}. Skipping this note.`); // Warn about the error
			continue;  // Skip notes with errors
		  }
		}
	  }

	} // End of if condition for "all-videos"

	// ---------------------------------------------------------- //

	// If the objectType is "all-images", this block of code will be executed
	if (objectType === "all-links") {

	  // Introductory text for the Markdown report
	  const introLines = `
# Welcome to your Markdown Media Manager. <!-- {"collapsed":true} -->
Here you can find the List of Links in \`${listFormat}\` format. For the selected tags: (AND:\`${tagNamesAnd}\`; OR: \`${tagNamesOr}\`).
> **Object Type Selection:** Links.
> **Note:** More details on built-in Attachment Manager (For a Particular Note): [Link](https://www.amplenote.com/help/attachments#How_can_I_open_the_Manage_Files_view%2C_to_manage_my_attachments%3F) 
${horizontalLine}
`;

	  // Initialize the Markdown report with the introductory text
	  markdownReport = `${introLines}`;
	  // console.log("Initial markdownReport:", markdownReport); // Log the initial report

	  // Iterate over each note and extract the content
	  for (const note of notes) {
		try {
		  const noteUUID = note.uuid;
		  // console.log(`Processing note with UUID: ${noteUUID}`); // Log the UUID of the note being processed
		  
		// Get note content in markdown format
		const markdown = await app.getNoteContent({ uuid: noteUUID });
		// console.log(`Markdown content for note ${noteUUID}:`, markdown);

		// Extract non-AmpleNote links excluding images and attachments
		const linkRegex = /\[([^\]]+)\]\((?!attachment:\/\/)(?!https:\/\/images\.amplenote\.com\/)(?!https:\/\/www\.amplenote\.com\/notes\/)(.*?)\)/g;
		const links = [...markdown.matchAll(linkRegex)].map(match => ({
		  name: match[1],  // Link text
		  url: match[2]    // URL
		}));
		// console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, links);

		// If the note contains attachments, generate the report section for this note
		if (links.length > 0) {
			markdownReport += `## Note: [${note.name || "Untitled Note"}](https://www.amplenote.com/notes/${note.uuid}) <!-- {"collapsed":true} -->\n`;
			markdownReport += `\n<mark>Tags:</mark> ${note.tags}\n`;
			markdownReport += `\n<mark>Created:</mark> ${formatDateTime(note.created)}\n`;
			markdownReport += `\n<mark>Updated:</mark> ${formatDateTime(note.updated)}\n`;
			markdownReport += `\n${horizontalLine}\n`;

			markdownReport += `### File Type: Links\n`;
			// Create clickable links for each filtered attachment and add them to the report
			const clickableLinks = links.map(link => `[${link.name}](${link.url})`).join("\n");
			markdownReport += `\n${clickableLinks}\n`;
			// console.log(`Markdown report for ${type}:`, markdownReport); // Log the report after adding each file type

		  // Add a horizontal line separator after each note's attachment list
		  markdownReport += `\n${horizontalLine}\n`;
		  // console.log("Updated markdownReport after processing note:", markdownReport); // Log the updated report after processing each note
		}

		} catch (err) {
		  // Handle any errors that occur during note processing
		  if (err instanceof TypeError) {
			console.warn(`Error processing note ${note.uuid}. Skipping this note.`); // Warn about the error
			continue;  // Skip notes with errors
		  }
		}
	  }

	} // End of if condition for "all-videos"

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

	const newNoteName = `MD Media Manager: List ${YYMMDD}_${HHMMSS}`;
	// console.log("New note name:", newNoteName);

	const newTagName = ['-reports/-media-manager'];
	// console.log("New note tags:", newTagName);

	let noteUUID = await app.createNote(newNoteName, newTagName);
	// console.log("Created note UUID:", noteUUID);

	await app.replaceNoteContent({ uuid: noteUUID }, finalResults);
	// console.log("Replaced note content with final results");

    // Audit Report
    const auditNoteName = `MD Media Manager: Audit`;
    const auditTagName = ['-reports/-media-manager'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Media_Manager_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Media_Manager_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Media Manager Option:** Lists!, **Inputs:** [Tags(OR): ${tagNamesOr}; Tags(AND): ${tagNamesAnd}; Object Type: ${objectType}; **Note:** [${newNoteName}](https://www.amplenote.com/notes/${noteUUID}), **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

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
			  type: "radio",
			  options: [
				{ label: "Attachments", value: "all-attachments" },
				{ label: "Images", value: "all-images" },
				{ label: "Videos", value: "all-videos" },
				{ label: "Links", value: "all-links" },
				{ label: "All the above", value: "everything" }
			  ]
			},
			{
			  label: "Select the Download Format",
			  type: "radio",
			  options: [
				{ label: "Download as markdown Table", value: "download_md" },
				{ label: "Download as CSV", value: "download_csv" },
				{ label: "Download as TXT", value: "download_txt" },
				{ label: "Download as JSON", value: "download_json" },
				{ label: "Download as HTML", value: "download_html" }
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
	if (!objectType || !dwFormat) {
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
	let markdownReportz = ``;

	if (objectType) {
		// Handle different download formats
		if (dwFormat === "download_md") {
		  // Create markdown table headers
		  markdownReportz += `|Note Name|Note UUID|Note Tags|Media Name|Media URL|Media Format|Media Type|Media Type Selection|\n`;
		  markdownReportz += `|---|---|---|---|---|---|---|---|\n`;
		} else if (dwFormat === "download_csv") {
		  // Create CSV headers
		  markdownReportz += `Note Name,Note UUID,Note Tags,Media Name,Media URL,Media Format,Media Type,Media Type Selection\n`;
		}		
	}
	
	function convertBrackets(inputString) {
		// Replace the exact sequence ']\n[' with a comma
		return inputString.replace(/]\n\[/g, ',');
	}

	// ---------------------------------------------------------- //

	// Iterate over each note and extract the content
	for (const note of notes) {
	try {

		const noteUUID = note.uuid;
		// console.log(`Processing note with UUID: ${noteUUID}`);

		// Get note content in markdown format
		const markdown = await app.getNoteContent({ uuid: noteUUID });
		// console.log(`Markdown content for note ${noteUUID}:`, markdown);
		
		// Initialize markdownReport as an empty array to accumulate results
		let markdownReport = [];

		// If the objectType is "all-attachments" or "everything", extract attachments
		if (objectType === "all-attachments" || objectType === "everything") {
			// Extract attachments via API
			const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
			// console.log("attachmentsAPI:", attachmentsAPI);
			// Map the attachments to an array of objects
			const attachmentLinks = attachmentsAPI.map(link => ({
				name: link.name,  // Link text
				url: `attachment://${link.uuid}`,  // URL
				format: link.name.split('.').pop(),  // File format
				type: `Attachment`
			}));
			// console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, attachmentLinks);
			// Append attachment links to markdownReport
			markdownReport = markdownReport.concat(attachmentLinks);
			// console.log("markdownReport (after attachments):", markdownReport);
		}

		// If the objectType is "all-images" or "everything", extract image links
		if (objectType === "all-images" || objectType === "everything") {
			// Extract AmpleNote image links via API
			const imagesAPI = await app.getNoteImages({ uuid: noteUUID });
			// console.log("imagesAPI:", imagesAPI);
			// Map the images to an array of objects
			const imageLinks = imagesAPI.map(link => ({
				name: link.src.split('/').pop(),  // Link text
				url: link.src,  // URL
				format: link.src.split('.').pop(),  // File format
				type: `Image`
			}));
			// console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, imageLinks);
			// Append image links to markdownReport
			markdownReport = markdownReport.concat(imageLinks);
			// console.log("markdownReport (after images):", markdownReport);
		}

		// If the objectType is "all-videos" or "everything", extract video links
		if (objectType === "all-videos" || objectType === "everything") {
			// Extract AmpleNote video links via regex
			const ampleNoteVideosRegex = /!\[([^\]]+)\]\((https:\/\/images\.amplenote\.com\/.*?\.(mp4|mov|mpg|webm))\)/g;
			const ampleNoteVideos = [...markdown.matchAll(ampleNoteVideosRegex)].map(match => ({
				name: match[1],  // Video name
				url: match[2],  // Video URL
				format: match[2].split('.').pop(),  // File format
				type: `Video`
			}));
			// console.log(`AmpleNote Videos for note ${noteUUID}:`, ampleNoteVideos);
			// Append video links to markdownReport
			markdownReport = markdownReport.concat(ampleNoteVideos);
			// console.log("markdownReport (after videos):", markdownReport);
		}

		// If the objectType is "all-links" or "everything", extract non-AmpleNote links
		if (objectType === "all-links" || objectType === "everything") {
			// Extract non-AmpleNote links via regex
			const linkRegex = /\[([^\]]+)\]\((?!attachment:\/\/)(?!https:\/\/images\.amplenote\.com\/)(?!https:\/\/www\.amplenote\.com\/notes\/)(.*?)\)/g;
			const links = [...markdown.matchAll(linkRegex)].map(match => ({
				name: match[1],  // Link text
				url: match[2],  // URL
				format: match[2].split('/').pop() || null,  // File format
				type: `Link`
			}));
			// console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, links);
			// Append links to markdownReport
			markdownReport = markdownReport.concat(links);
			// console.log("markdownReport (after links):", markdownReport);
		}

		// ---------------------------------------------------------- //

		// Handle different download formats based on `dwFormat` and the presence of `markdownReport`
		if (dwFormat === "download_md" && markdownReport.length > 0) {
		  // Markdown Format
		  // console.log("Generating markdown format report...");

		  // Map `markdownReport` to create markdown table rows
		  const clickableLinks = markdownReport.map(link => {
			const result = `|${note.name}|${note.uuid}|${note.tags}|${link.name}|${link.url}|${link.format}|${link.type}|${objectType}|`;
			// console.log("Markdown clickableLink entry:", result);
			return result;
		  }).join("\n");

		  // Append clickable links to the markdown report
		  markdownReportz += `${clickableLinks}\n`;
		  // console.log("Final markdownReportz (MD format):", markdownReportz);

		} else if (dwFormat === "download_csv" && markdownReport.length > 0) {
		  // CSV Format
		  // console.log("Generating CSV format report...");

		  // Map `markdownReport` to create CSV rows
		  const clickableLinks = markdownReport.map(link => {
			const result = `"${note.name}","${note.uuid}","${note.tags}","${link.name}","${link.url}","${link.format}","${link.type}","${objectType}"`;
			// console.log("CSV clickableLink entry:", result);
			return result;
		  }).join("\n");

		  // Append clickable links to the CSV report
		  markdownReportz += `${clickableLinks}\n`;
		  // console.log("Final markdownReportz (CSV format):", markdownReportz);

		} else if (dwFormat === "download_txt" && markdownReport.length > 0) {
		  // TXT Format
		  // console.log("Generating text format report...");

		  // Map `markdownReport` to create text entries
		  const clickableLinks = markdownReport.map(link => {
			const result = `
Note Name: ${note.name},
Note UUID: ${note.uuid},
Note Tags: ${note.tags},
Link Name: ${link.name},
Link URL: ${link.url},
Link Format: ${link.format},
Link Type: ${link.type},
Object Type: ${objectType}
`;
			// console.log("Text clickableLink entry:", result);
			return result;
		  }).join("\n");

		  // Append clickable links to the text report
		  markdownReportz += `${clickableLinks}\n`;
		  // console.log("Final markdownReportz (TXT format):", markdownReportz);

		} else if (dwFormat === "download_json" && markdownReport.length > 0) {
		  // JSON Format
		  // console.log("Generating JSON format report...");

		  // Map `markdownReport` to create JSON objects
		  const jsonLinks = markdownReport.map(link => {
			const result = {
			  noteName: note.name,
			  noteUUID: note.uuid,
			  noteTags: note.tags,
			  linkName: link.name,
			  linkURL: link.url,
			  linkFormat: link.format,
			  linkType: link.type,
			  objectType: objectType
			};
			// console.log("JSON clickableLink entry:", result);
			return result;
		  });

		  // Convert the array of objects to a JSON string with proper formatting
		  markdownReportz += `${JSON.stringify(jsonLinks, null, 2)}\n`;
		  // console.log("Final markdownReportz (JSON format):", markdownReportz);
		} else if (dwFormat === "download_html" && markdownReport.length > 0) {
		  // JSON Format
		  // console.log("Generating JSON format report...");

		  // Map `markdownReport` to create JSON objects
		  const jsonLinks = markdownReport.map(link => {
			const result = {
			  noteName: note.name,
			  noteUUID: note.uuid,
			  noteTags: note.tags,
			  linkName: link.name,
			  linkURL: link.url,
			  linkFormat: link.format,
			  linkType: link.type,
			  objectType: objectType
			};
			// console.log("JSON clickableLink entry:", result);
			return result;
		  });

		  // Convert the array of objects to a JSON string with proper formatting
		  markdownReportz += `${JSON.stringify(jsonLinks, null, 2)}\n`;
		  // console.log("Final markdownReportz (JSON format):", markdownReportz);
		}

	  } catch (err) {
	    // Handle any errors that occur during note processing
	    if (err instanceof TypeError) {
	  	console.warn(`Error processing note ${note.uuid}. Skipping this note.`); // Warn about the error
	  	continue;  // Skip notes with errors
	    }
	  }
	}

	// ---------------------------------------------------------- //

	// Initialize variables for processing results
	let finalResults = markdownReportz;
	// console.log("markdownReportz:", markdownReportz);
	// console.log("Final results for the report:", finalResults);

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

	const htmlFormat = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Note Links</title>
	<style>
		body { 
			font-family: Arial, sans-serif; 
			margin: 0; 
			padding: 20px; 
			background-color: #f0f0f0; /* Light mode background */
			color: #333; /* Light mode text color */
			transition: background-color 0.3s, color 0.3s; /* Smooth transition for colors */
		}
		
		.note { 
			margin-bottom: 20px; 
			padding: 15px; 
			border-radius: 5px; 
			border: 1px solid #ccc; /* Light mode border */
			background-color: white; /* Light mode note background */
			transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for notes */
		}
		
		.note-name { 
			font-weight: bold; 
			font-size: 1.2em; 
		}
		
		.note-uuid, .note-tags { 
			font-style: italic; 
			margin-left: 10px; 
		}
		
		.link { 
			margin-left: 20px; 
			cursor: pointer; 
			color: blue; 
			text-decoration: underline; 
		}
		
		/* Dark Mode Styles */
		body.dark-mode { 
			background-color: #181818; /* Dark mode background */
			color: #f0f0f0; /* Dark mode text color */
		}
		
		.note.dark-mode { 
			border: 1px solid #444; /* Dark mode border color */
			background-color: #2a2a2a; /* Dark mode note background */
		}

		/* Dark mode link styles */
		.link.dark-mode { 
			color: #4da3ff; /* Change to a lighter blue or any other color for visibility */
			text-decoration: underline; 
		}
	</style>

</head>
<body>

  <h1>Notes and Links</h1>
  <button id="toggleDarkMode">Toggle Dark Mode</button>

  <!-- Filters -->
  <label for="linkTypeFilter">Filter by Link Type:</label>
  <select id="linkTypeFilter">
    <option value="">All</option>
  </select>

  <label for="linkFormatFilter">Filter by Link Format:</label>
  <select id="linkFormatFilter">
    <option value="">All</option>
  </select>

  <!-- Notes container -->
  <div id="notesContainer"></div>

  <script>
    // JSON data
	const data = ${convertBrackets(finalResults)};

	// Populate filter dropdowns
	function populateFilters() {
	  const linkTypes = [...new Set(data.map(item => item.linkType))];
	  const linkFormats = [...new Set(data.map(item => item.linkFormat))];

      // Sort link formats alphabetically
      linkFormats.sort();

	  const linkTypeFilter = document.getElementById('linkTypeFilter');
	  const linkFormatFilter = document.getElementById('linkFormatFilter');

	  // Clear existing options before populating
	  linkTypeFilter.innerHTML = '';
	  linkFormatFilter.innerHTML = '';

	  // Add a default option for link types
	  linkTypeFilter.appendChild(new Option('All Link Types', ''));

	  // Add link types to the filter
	  linkTypes.forEach(type => {
		const option = document.createElement('option');
		option.value = type;
		option.textContent = type;
		linkTypeFilter.appendChild(option);
	  });

	  // Add "All" option for link formats
	  linkFormatFilter.appendChild(new Option('All Link Formats', ''));

	  // Add link formats to the filter, but only those with 5 or fewer characters
	  linkFormats.forEach(format => {
		if (format.length <= 5) { // Check the character length
		  const option = document.createElement('option');
		  option.value = format;
		  option.textContent = format;
		  linkFormatFilter.appendChild(option);
		}
	  });
	}

	// Display notes based on filters
	function displayNotes() {
	  const container = document.getElementById('notesContainer');
	  container.innerHTML = ''; // Clear previous notes

	  const selectedLinkType = document.getElementById('linkTypeFilter').value;
	  const selectedLinkFormat = document.getElementById('linkFormatFilter').value;

	  // Filter data based on selected linkType and linkFormat
	  const filteredData = data.filter(item => {
		return (!selectedLinkType || item.linkType === selectedLinkType) &&
			   (!selectedLinkFormat || item.linkFormat === selectedLinkFormat);
	  });

	  // Group notes by noteUUID
	  const notesMap = {};
	  filteredData.forEach(item => {
		if (!notesMap[item.noteUUID]) {
		  notesMap[item.noteUUID] = {
			noteName: item.noteName,
			noteUUID: item.noteUUID,
			noteTags: item.noteTags,
			links: []
		  };
		}
		notesMap[item.noteUUID].links.push({
		  linkName: item.linkName,
		  linkURL: item.linkURL,
		  linkFormat: item.linkFormat
		});
	  });

	  // Display notes
	  Object.values(notesMap).forEach(note => {
		const noteDiv = document.createElement('div');
		noteDiv.className = 'note';

		const noteHeader = document.createElement('div');
		noteHeader.className = 'note-header';

		const noteName = document.createElement('span');
		noteName.className = 'note-name';
		noteName.textContent = note.noteName;

		const noteUUID = document.createElement('span');
		noteUUID.className = 'note-uuid';
		noteUUID.textContent = \`(UUID: \${note.noteUUID})\`;

		const noteTags = document.createElement('span');
		noteTags.className = 'note-tags';
		noteTags.textContent = \`Tags: \${note.noteTags.join(', ')}\`;

		noteHeader.appendChild(noteName);
		noteHeader.appendChild(noteUUID);
		noteHeader.appendChild(noteTags);

		noteDiv.appendChild(noteHeader);

		// Display links under the note
		note.links.forEach(link => {
		  const linkDiv = document.createElement('div');
		  linkDiv.className = 'link';
		  linkDiv.textContent = \`\${link.linkName} (\${link.linkFormat})\`;

		  // Make the link clickable
		  linkDiv.addEventListener('click', () => {
			window.open(link.linkURL, '_blank');
		  });

		  noteDiv.appendChild(linkDiv);
		});

		container.appendChild(noteDiv);
	  });
	}

	// Function to toggle dark mode
	function toggleDarkMode() {
		const body = document.body;
		const notes = document.querySelectorAll('.note');
		const links = document.querySelectorAll('.link');

		body.classList.toggle('dark-mode');

		notes.forEach(note => {
			note.classList.toggle('dark-mode');
		});

		links.forEach(link => {
			link.classList.toggle('dark-mode');
		});
	}

	// Event listener for the toggle button
	document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);

	// Initialize the page
	populateFilters();
	displayNotes();

	// Add event listeners to filters
	document.getElementById('linkTypeFilter').addEventListener('change', displayNotes);
	document.getElementById('linkFormatFilter').addEventListener('change', displayNotes);

  </script>

</body>
</html>
`;


	
	// Handle different download formats
	if (dwFormat === "download_md" && finalResults.length > 0) {
		downloadTextFile(finalResults, "Media_Manager_MD.md");
		// console.log("finalResults:", finalResults);
	} else if (dwFormat === "download_csv" && finalResults.length > 0) {
		downloadTextFile(finalResults, "Media_Manager_CSV.csv");
		// console.log("finalResults:", finalResults);
	} else if (dwFormat === "download_txt" && finalResults.length > 0) {
		downloadTextFile(finalResults, "Media_Manager_TXT.txt");
		// console.log("finalResults:", finalResults);
	} else if (dwFormat === "download_json" && finalResults.length > 0) {
		downloadTextFile(finalResults, "Media_Manager_JSON.json");
		// console.log("finalResults:", finalResults);
	} else if (dwFormat === "download_html" && finalResults.length > 0) {
		// finalResults = convertBrackets(finalResults);
		finalResults = htmlFormat;
		downloadTextFile(finalResults, "Media_Manager_HTML.html");
		// console.log("finalResults:", finalResults);
	}

    // Audit Report
    const auditNoteName = `MD Media Manager: Audit`;
    const auditTagName = ['-reports/-media-manager'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Media_Manager_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Media_Manager_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Media Manager Option:** Download!, **Inputs:** [Tags(OR): ${tagNamesOr}; Tags(AND): ${tagNamesAnd}; Object Type: ${objectType}; Download Format: ${dwFormat}; **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

	},

	// ********************************************************************************************************************* //
  },
	// ********************************************************************************************************************* //
  linkOption: {
	"Download": async function (app, link) {
		// Define the regex to match UUID format
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		// console.log("link", link);
		
		// Opens the link if the link contains a valid attachment UUID
		if (uuidRegex.test(link.href)) {
			const attachmentURL = await app.getAttachmentURL(link.href);
			// console.log("attachmentURL:",attachmentURL);
			// As browsers have options to open a PDF documents in itself, the download option is not working properly. (viewable in-browser).

		// Create an anchor element
		const a = document.createElement('a');
		a.href = attachmentURL;

		// Set the 'download' attribute to the filename to force download
		// a.target = '_blank';
		a.download = '';  // The 'download' attribute triggers the download
		document.body.appendChild(a);
		a.click();  // Programmatically trigger a click event to start the download
		document.body.removeChild(a);  // Clean up after the click


			// console.log("attachmentURL", attachmentURL);
			await app.alert("Your file has been downloaded.");
		} else {
			await app.alert("Link doesn't have any valid UUID attachments pattern");
		}

    // Function to get the current date and time in YYMMDD and HHMMSS format
    function getCurrentDateTime() {
        const now = new Date();
        const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
        const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
        return { YYMMDD, HHMMSS };
    }
    const { YYMMDD, HHMMSS } = getCurrentDateTime();

    // Audit Report
    const auditNoteName = `MD Media Manager: Audit`;
    const auditTagName = ['-reports/-media-manager'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Media_Manager_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Media_Manager_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();
    const auditReport = `
- **Media Manager Option:** File Download!. Link Details: \`attachment://${link.href}\`, **At:** ${YYMMDD}_${HHMMSS}.

`;  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);

	}
  },
	// ********************************************************************************************************************* //
}