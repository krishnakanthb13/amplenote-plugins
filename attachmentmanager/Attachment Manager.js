{
  appOption: {
    // ********************************************************************************************************************* //
    /**
     * "Reports" function: Prompts the user to select tags and object type, then filters notes based on those selections.
     * Inputs: tags (OR and AND), object type (Attachments, Links, Images)
     * Output: Filtered notes + objects based on the selected criteria.
     */
    "Report": async function (app) {
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
		  }
		]
	  }
	);

	// Log the user input (result)
	// console.log("User input result:", result);

	// Destructure the user input from the result array
	const [tagNamesOr, tagNamesAnd] = result;
	// console.log("tagNamesOr:", tagNamesOr);
	// console.log("tagNamesAnd:", tagNamesAnd);

	// Handle cancellation scenario
	if (!result) {
	  app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
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
	const horizontalLine = `

---

`;

	const introLines = `
# Welcome to your Attachment Manager: Report.
Here you can find the count of \`(1) Attachments [Through API], (2) All Images [Through API], (3) Amplenote Images [Images hosted by Amplenote], (4) Non-Amplenote Hosted Images [Images hosted in the Web], (5) Amplenote Videos [Videos hosted by Amplenote], (6) Links [Normal Non-Amplenote links].\`
${horizontalLine}
`;

	// Initialize the markdown table format
	let markdownReport = `${introLines}`;
	markdownReport += "| Note 🔗 | Tags 🏷️ | Attachments 📃 | Images 🖼️ | Amplenote Images ☁️ | Non-Amplenote Images 🌐 | Amplenote Videos 🎞️ | Links 🔗 |\n";
	markdownReport += "|------|------|-----------------|-------------|------------|------------------|----------------------|------------------|-------|\n";
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
    "List": async function (app) {
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
            },
            {
              label: "Select the List Formatting",
              type: "select",
              options: [
                { label: "Document", value: "document" },
                { label: "Table", value: "table" }
              ]
            }
          ]
        }
      );

      // Destructure the input for OR/AND tags, object type, and list format
      const [tagNamesOr, tagNamesAnd, objectType, listFormat] = result;

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

      // Initialize notes and filteredNotes arrays
      let notes = [];
      const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
      let filteredNotes = [];

      // Filter logic for OR and AND tags
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

      // Remove duplicate notes and assign to final array
      filteredNotes = [...new Set(filteredNotes)];
      notes = filteredNotes;

      // Placeholder for further processing
      let results = [];
      let finalResults = "";
    },

    // ********************************************************************************************************************* //
    /**
     * "Download" function: Provides an option to download filtered notes in different formats like markdown, CSV, TXT, or JSON.
     * Inputs: tags (OR and AND), object type, download format
     * Output: Downloadable file in the selected format containing filtered notes + objects.
     */
    "Download": async function (app) {
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

      // Destructure the inputs for OR/AND tags, object type, and download format
      const [tagNamesOr, tagNamesAnd, objectType, dwFormat] = result;

      if (!result) {
          app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
          return;
      }

      // Validate input
      // if (!tagNamesOr && !tagNamesAnd) {
        // app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
        // return;
      // }
      if (!objectType || !dwFormat) {
        app.alert("Note: Select any one of the Object type and Download Format");
        return;
      }

      // Initialize arrays for notes
      let notes = [];
      const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
      let filteredNotes = [];

      // Filter logic for OR and AND tags
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

      // Remove duplicate notes and assign to final array
      filteredNotes = [...new Set(filteredNotes)];
      notes = filteredNotes;

      // Placeholder for further processing
      let results = [];
      let finalResults = "";
    },

    // ********************************************************************************************************************* //
  }
}