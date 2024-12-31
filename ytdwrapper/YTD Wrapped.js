{
  async appOption(app) {

    const existingSetting1 = await app.settings["YTD_Year"];
    const existingSetting2 = await app.settings["Top_Number_of_Words"];
    const existingSetting3 = await app.settings["TagS"];

	const currentYear = new Date().getFullYear();
	// console.log(currentYear); // Outputs the current year, e.g., 2024

  // Prompt user with pre-filled inputs - 4
  const result = await app.prompt("Update the parameters!", {
	inputs: [
        { label: "Update Year for YTD Wrapper / Annual Reviewer", type: "string", value: existingSetting1 || currentYear },
        { label: "Limit Number - List of Top Words Trend", type: "string", value: existingSetting2 || 25 },
        { label: "Select any Particular Tag/s. (Leave it blank for All Tags).", type: "tags", limit: 10, value: existingSetting3 || "" }
	],
  });

      let [
        zYear,
        topWords,
        tagNames
      ] = result;
	  
	  zYear = parseInt(zYear, 10);
	  topWords = parseInt(topWords, 10);
	  
	  console.log (result);
	  console.log (zYear);
	  console.log (topWords);
	  console.log (tagNames);

	await app.setSetting("YTD_Year", zYear);
	await app.setSetting("Top_Number_of_Words", topWords);
	await app.setSetting("TagS", tagNames || "");

	app.alert("YTD Wrapper is working in the background to get you various insigts and information for the Year Wrapper / Annual Reviewer; this may take a few minutes depending on the number of notes and their data.");

	const tagsArray = tagNames ? tagNames.split(',').map(tag => tag.trim()) : [];
	let noteHandlesz = [];
	// Filter notes based on tags
	if (tagsArray.length > 0) {
		for (let tag of tagsArray) {
			let taggedNotes = await app.filterNotes({ tag, group: "^vault" });
			noteHandlesz = noteHandlesz.concat(taggedNotes);
		}
	}
	else {
		noteHandlesz = await app.filterNotes({ group: "^vault" });
	}
	
/* 	// Get notes based on tags or all notes
	const noteHandlesz = tagS
	  ? await app.filterNotes({ tagS })
	  : await app.filterNotes({}); 

	// Ensure notes is an array
	if (!Array.isArray(noteHandlesz)) {
		console.error("Notes is not an array");
	} else {
		console.log("Notes array:", noteHandlesz);
	} */

	// Ensure zYear is a valid year
	// console.log("zYear:", zYear);

 	// Filter the notes by creation year
	noteHandlesz = noteHandlesz.filter(item => {
		const createdYear = new Date(item.created).getFullYear();
		// console.log(`Note: ${item.name}, Created Year: ${createdYear}, zYear: ${zYear}`);
		return createdYear === zYear;
	});
	console.log("Filtered Notes:", noteHandlesz);

	// Map to UUIDs
	const noteUUIDs = noteHandlesz
		// .filter(item => new Date(item.created).getFullYear() === zYear) // Filter by year
		.map(item => item.uuid); // Map to get the UUIDs
	console.log("Note UUIDs:", noteUUIDs);

    // console.log (noteHandlesz);
    // console.log (noteHandles);
    // console.log (noteUUIDs);
    // console.log (noteHandles.length);
    // return `note count: ${ noteHandles.length }`;

	const createYTDWrapper = async (noteHandlesz, app, year = new Date().getFullYear()) => {
		// Helper function to get month from date string
		const getMonth = (dateStr) => new Date(dateStr).getMonth() + 1;
		
		// Initialize monthly trackers
		const monthlyStats = Array(12).fill().map(() => ({
			notesCreated: 0,
			notesUpdated: 0,
			taskCount: 0,
			wordCount: 0
		}));
		
		let totalStats = {
			notesCreated: 0,
			notesUpdated: 0,
			totalTasks: 0,
			totalWords: 0
		};

		// Process each note
		for (const note of noteHandlesz) {
			const createdDate = new Date(note.created);
			const updatedDate = new Date(note.updated);
			const createdYear = createdDate.getFullYear();
			const updatedYear = updatedDate.getFullYear();

			// Track notes created in specified year
			if (createdYear === year) {
				const createdMonth = getMonth(note.created) - 1;
				monthlyStats[createdMonth].notesCreated++;
				totalStats.notesCreated++;
			}

			// Track notes updated in specified year
			if (updatedYear === year) {
				const updatedMonth = getMonth(note.updated) - 1;
				monthlyStats[updatedMonth].notesUpdated++;
				totalStats.notesUpdated++;
			}

			// Get and count tasks
			try {
				const tasks = await app.getNoteTasks({ uuid: note.uuid }, { includeDone: true });
				const taskCount = tasks.length;
				
				// Add to monthly stats of creation month if in specified year
				if (createdYear === year) {
					const month = getMonth(note.created) - 1;
					monthlyStats[month].taskCount += taskCount;
				}
				totalStats.totalTasks += taskCount;
			} catch (error) {
				console.error(`Error getting tasks for note ${note.uuid}:`, error);
			}

			// Get and count words in markdown content
			try {
				const markdown = await app.getNoteContent({ uuid: note.uuid });
				const wordCount = markdown.trim().split(/\s+/).length;
				
				// Add to monthly stats of creation month if in specified year
				if (createdYear === year) {
					const month = getMonth(note.created) - 1;
					monthlyStats[month].wordCount += wordCount;
				}
				totalStats.totalWords += wordCount;
			} catch (error) {
				console.error(`Error getting content for note ${note.uuid}:`, error);
			}
		}

		return {
			year,
			monthlyStats,
			totalStats,
			// Helper function to get formatted stats
			getFormattedStats() {
				const months = [
					'January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'
				];
				
				return {
					summary: `# <mark style="color:undefined;">**Year ${year} Summary:**<!-- {"cycleColor":"56"} --></mark>\n| | |\n|-|-|\n|**Total Notes Created**|${totalStats.notesCreated}|\n|**Total Notes Updated**|${totalStats.notesUpdated}|\n|**Total Tasks**|${totalStats.totalTasks}|\n|**Total Words**|${totalStats.totalWords}|\n\n`,
					monthlyBreakdown: monthlyStats.map((stats, index) => ({
						month: months[index],
						stats
					}))
				};
			}
		};
	};

/* 	// Example usage:
	const runYTDAnalysis = async () => {
		const year = 2024; // Can be changed to any year
		const wrapper = await createYTDWrapper(notes, app, year);
		const stats = wrapper.getFormattedStats();
		
		console.log(stats.summary);
		console.log('\nMonthly Breakdown:');
		stats.monthlyBreakdown.forEach(({ month, stats }) => {
			console.log(`\n${month}:`, stats);
		});
	}; */
	
	let finalResutls = ``;
	let finalResutls2 = ``;

	const yearEndStats = await createYTDWrapper(noteHandlesz, app, zYear);
	const formattedStats = yearEndStats.getFormattedStats();
	// console.log(formattedStats);
	
	finalResutls += `${formattedStats.summary}`;
	finalResutls += `---`;
	finalResutls += `\n# <mark style="color:undefined;">**Monthly Breakdown:**<!-- {"cycleColor":"60"} --></mark>`;
	finalResutls2 += `**Monthly Breakdown:**`;
	finalResutls += `\n| | | | | |`;
	finalResutls += `\n|-|-|-|-|-|`;
	finalResutls += `\n|**Month**|**Notes Created**|**Notes Last Updated**|**Task Count**|**Word Count**|`;

    // console.log(formattedStats.summary);
    // console.log('\nMonthly Breakdown:');
    formattedStats.monthlyBreakdown.forEach(({ month, stats }) => {
		finalResutls2 += `\n${month}: notesCreated: ${stats.notesCreated}, notesUpdated: ${stats.notesUpdated}, taskCount: ${stats.taskCount}, wordCount: ${stats.wordCount}`;
		finalResutls += `\n|**${month}**|${stats.notesCreated}|${stats.notesUpdated}|${stats.taskCount}|${stats.wordCount}|`;
        // console.log(`\n${month}:`, stats);
    });
	
	finalResutls += `\n|**Total:**|=sum(above)|=sum(above)|=sum(above)|=sum(above)|`;

		console.log(finalResutls);
		console.log(finalResutls2);

	finalResutls += `\n`;
	const finalResultz = `[Monthly Trend Text][^YTDW]
[^YTDW]: []()${finalResutls2}
`;

	finalResutls += `\n\n${finalResultz}`;
	console.log(finalResutls);

	// ---------------------------------------------------------------

	// Configuration
	const TOP_WORDS_TO_SHOW = topWords || 25;  // Change this number to show more/less words

	// Common filler words to exclude
	const FILLER_WORDS = new Set([
		'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
		'is', 'are', 'was', 'were', 'be', 'been', 'being',
		'i', 'you', 'he', 'she', 'it', 'we', 'they',
		'my', 'your', 'his', 'her', 'its', 'our', 'their',
		'this', 'that', 'these', 'those', 'how',
		'of', 'with', 'by', 'from', 'up', 'down',
		'as', 'so', 'too', 'very', 'just', 'only', 'then', 'now',
		'there', 'here', 'where', 'when', 'why', 'what', 'who', 'whom', 'whose',
		'which', 'while', 'about', 'over', 'under', 'before', 'after',
		'into', 'out', 'onto', 'through', 'between', 'against', 
		'me', 'him', 'her', 'them', 'us', 
		'am', 'do', 'does', 'did', 'has', 'have', 'had',
		'will', 'shall', 'can', 'could', 'would', 'should', 'might', 'may',
		'if', 'though', 'although', 'because', 'since', 
		'than', 'whether', 'like', 'unlike', 'such',
		'some', 'any', 'all', 'no', 'none', 'every', 'each', 
		'few', 'many', 'most', 'more', 'less', 'lot', 'lots', 
		'anyway', 'anywhere', 'everywhere', 'nowhere',
		'either', 'neither', 'both'
	]);

	const analyzeNotes = async (noteUUIDs, app) => {
		// console.log('Starting analysis...');
		
		// Initialize word counter
		let wordCounter = {};
		
		// Process each note
		for (const uuid of noteUUIDs) {
			try {
				// console.log(`Processing note: ${uuid}`);
				
				// Get note content
				const content = await app.getNoteContent({ uuid });
				
				// Process words
				const words = content.toLowerCase()
					.replace(/[^a-zA-Z0-9\s]/g, ' ')
					.split(/\s+/)
					.filter(word => 
						word && 
						!FILLER_WORDS.has(word) && 
						word.length > 1
					);
				
				// Count words
				words.forEach(word => {
					wordCounter[word] = (wordCounter[word] || 0) + 1;
				});
				
			} catch (error) {
				console.log(`Error processing note ${uuid}:`, error);
			}
		}
		
		// Sort words by frequency
		const sortedWords = Object.entries(wordCounter)
			.sort((a, b) => b[1] - a[1])
			.slice(0, TOP_WORDS_TO_SHOW);
		
		// Print results
		finalResutls += `---`;
		finalResutls += `\n# <mark style="color:undefined;">**Word Frequency Analysis**<!-- {"cycleColor":"57"} --></mark>\n`;
		finalResutls += `Showing top ${TOP_WORDS_TO_SHOW} words.\n`;
		console.log('# <mark style="color:undefined;">**Word Frequency Analysis**<!-- {"cycleColor":"56"} --></mark>');
		console.log(`Showing top ${TOP_WORDS_TO_SHOW} words.\n`);
		
/* 		// Create table data
		const tableData = sortedWords.reduce((acc, [word, count]) => {
			acc[word] = count;
			return acc;
		}, {});
		
		// Display table
		console.table(tableData); */
		
		// Create table data in Markdown format
		const tableData = sortedWords.reduce((acc, [word, count]) => {
			acc.push(`| ${word} | ${count} |`);
			return acc;
		}, ["| | |", "|-|-|","| **Word** | **Count** |"]);

		// Display Markdown table
		finalResutls += `${tableData.join("\n")}`;
		console.log(tableData.join("\n"));
		
		// Display total unique words
		const uniqueWords = Object.keys(wordCounter).length;
		finalResutls += `\n\nTotal unique words found: ${uniqueWords}.\n\n`;
		console.log(`Total unique words found: ${uniqueWords}.`);
		finalResutls += `---`;
		const pluginSettingUrl = `https://www.amplenote.com/account/plugins/${app.context.pluginUUID}`;
		finalResutls += `\n> You can navigate to the [AN Plugin Settings](${pluginSettingUrl}) and update the parameters in the settings based on your requirements.\n> This report is generated at: ${new Date()}.\n> *User Input Details:* **Year:** ${zYear}; **Limit:** ${topWords}; **Tags:** [${tagNames || "All"}]`;
	};

	// Example usage:
	// const noteUUIDs = ['uuid1', 'uuid2', 'uuid3'];
	await analyzeNotes(noteUUIDs, app);
	console.log(finalResutls);

	// await analyzeNote('your-note-uuid');
	// await analyzeMultipleNotes(['uuid1', 'uuid2', 'uuid3']);

	// ---------------------------------------------------------------

	// Generate the filename based on the current date and time
	const now = new Date();
	const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
	const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

	// Audit Report
	const ytdwNoteName = `${YYMMDD}_${HHMMSS} YTD Wrapper`;
	const ytdwTagName = ['-reports/-ytd-wrapper'];
	const ytdwnoteUUID = await app.createNote(ytdwNoteName, ytdwTagName);

	  (async () => {
		try {
		  await app.replaceNoteContent({ uuid: ytdwnoteUUID }, finalResutls);
		  await app.navigate(`https://www.amplenote.com/notes/${ytdwnoteUUID}`);
		} catch (error) {
		  console.error(error.message);
		}
	  })();

	app.alert("YTD Wrapper has completed, View the Note for the details.");

  }
}
/* {
  async insertText(app) {
    const noteHandles = await app.filterNotes({ tag: "daily-jots" });
    console.log (noteHandles);
    return `note count: ${ noteHandles.length }`;
  }
} */