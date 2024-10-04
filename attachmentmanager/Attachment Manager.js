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
            }
          ]
        }
      );

      // Destructure the user input from the result
      const [tagNamesOr, tagNamesAnd, objectType] = result;
	  console.log("result:", result);

      if (!result) {
          app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
          return;
      }

      // Ensure at least one tag and an object type is selected
      // if (!tagNamesOr && !tagNamesAnd) {
        // app.alert("Note: At least one of Optional Items (Tag OR, Tag AND) must be selected");
        // return;
      // }
      if (!objectType) {
        app.alert("Note: Select any one of the Object type");
        return;
      }

      // Initialize empty arrays for storing notes and filtered notes
      let notes = [];
      const tagsArray = tagNamesOr ? tagNamesOr.split(',').map(tag => tag.trim()) : [];
      let filteredNotes = [];

      // Filtering logic for tags [OR] and [AND]
      if ((Array.isArray(tagsArray) && tagsArray.length > 0) || tagNamesAnd) {
        // Filter notes for OR tags
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
          for (const tag of tagsArray) {
            const notesByTag = await app.filterNotes({ tag: tag });
            filteredNotes = [...filteredNotes, ...notesByTag];
          }
        }
        // Filter notes for AND tags
        if (tagNamesAnd) {
          const notesByGroup = await app.filterNotes({ tag: tagNamesAnd });
          filteredNotes = [...filteredNotes, ...notesByGroup];
        }
      } else {
        // Default filter if no tags are provided
        const notesByGroup = await app.filterNotes({ group: "^vault" });
        filteredNotes = [...filteredNotes, ...notesByGroup];
      }

      // Remove duplicate notes
      filteredNotes = [...new Set(filteredNotes)];
      notes = filteredNotes;
	  console.log("notes:", notes);

      // Initialize variables for processing results
      let results = [];
      let finalResults = "";

		// Loop through each note and extract content
		for (const note of notes) {
		  const noteUUID = note.uuid;
		  const markdown = await app.getNoteContent({ uuid: noteUUID });
		  // console.log(`Markdown content for note ${noteUUID}:`, markdown);

			// Extract attachments using regex
			const attachmentRegex = /\[([^\]]+)\]\((attachment:\/\/.*?)\)/g;
			const attachments = [...markdown.matchAll(attachmentRegex)].map(match => ({
				// note: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`,
				// tags: note.tags,
				name: match[1], // The document name extracted from the brackets
				url: match[2],  // The attachment URL
				format: match[1].split('.').pop().replace(/[^a-zA-Z0-9]/g, '') // Remove symbols from the file format
			}));

			console.log(`Attachments for note ${noteUUID}:`, attachments);

			// Extract AmpleNote image links
			const ampleNoteImageRegex = /!\[\]\((https:\/\/images\.amplenote\.com\/.*?)\)/g;
			const ampleNoteImages = [...markdown.matchAll(ampleNoteImageRegex)].map(match => ({
				// note: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`,
				// tags: note.tags,
				url: match[1], // The image URL
				format: match[1].split('.').pop() // The file format after the last dot
			}));
			console.log(`AmpleNote images for note ${noteUUID}:`, ampleNoteImages);

			// Extract non-AmpleNote image links
			const nonAmpleNoteImageRegex = /!\[.*?\]\((?!https:\/\/images\.amplenote\.com\/)(.*?)\)/g;
			const nonAmpleNoteImages = [...markdown.matchAll(nonAmpleNoteImageRegex)].map(match => ({
				// note: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`,
				// tags: note.tags,
				url: match[1], // The image URL
				format: match[1].split('.').pop() // The file format after the last dot
			}));
			console.log(`Non-AmpleNote images for note ${noteUUID}:`, nonAmpleNoteImages);

			// Extract AmpleNote video links
			const ampleNoteVideosRegex = /!\[([^\]]+)\]\((https:\/\/images\.amplenote\.com\/.*?)\)/g;
			const ampleNoteVideos = [...markdown.matchAll(ampleNoteVideosRegex)].map(match => ({
				// note: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`,
				// tags: note.tags,
				name: match[1], // The name inside the brackets
				url: match[2],  // The video URL
				format: match[2].split('.').pop() // The file format after the last dot
			}));

			console.log(`AmpleNote Videos for note ${noteUUID}:`, ampleNoteVideos);

			// Extract links excluding AmpleNote links, attachments, and images
			const linkRegex = /\[([^\]]+)\]\((?!attachment:\/\/)(?!https:\/\/images\.amplenote\.com\/)(?!https:\/\/www\.amplenote\.com\/notes\/)(.*?)\)/g;
			const links = [...markdown.matchAll(linkRegex)].map(match => ({
				// note: `[${note.name}](https://www.amplenote.com/notes/${note.uuid})`,
				// tags: note.tags,
				name: match[1], // The text inside the brackets
				url: match[2]   // The URL inside the parentheses
			}));

			console.log(`Links (excluding attachments and images) for note ${noteUUID}:`, links);

			// Extract Attachments details
			const attachmentsAPI = await app.getNoteAttachments({ uuid: noteUUID });
			console.log("attachmentsAPI:", attachmentsAPI);

			// Extract AmpleNote image links
			const imagesAPI = await app.getNoteImages({ uuid: noteUUID });
			console.log("imagesAPI:", imagesAPI);

		}


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
                { label: "Attachments", value: "attachments" },
                { label: "Links", value: "links" },
                { label: "Images", value: "images" }
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
                { label: "Attachments", value: "attachments" },
                { label: "Links", value: "links" },
                { label: "Images", value: "images" }
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