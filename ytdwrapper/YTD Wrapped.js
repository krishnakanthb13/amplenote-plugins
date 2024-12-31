{
  async noteOption(app) {

    const noteHandles = await app.filterNotes({ tag: "daily-jots" });
	const noteUUIDs = noteHandles.map(item => item.uuid);
    // console.log (noteHandles);
    // console.log (noteHandles.length);
    // return `note count: ${ noteHandles.length }`;

	const createYTDWrapper = async (noteHandles, app, year = new Date().getFullYear()) => {
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
		for (const note of noteHandles) {
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
		const wrapper = await createYTDWrapper(noteHandles, app, year);
		const stats = wrapper.getFormattedStats();
		
		console.log(stats.summary);
		console.log('\nMonthly Breakdown:');
		stats.monthlyBreakdown.forEach(({ month, stats }) => {
			console.log(`\n${month}:`, stats);
		});
	}; */
	
	let finalResutls = ``;
	let finalResutls2 = ``;

	const yearEndStats = await createYTDWrapper(noteHandles, app, 2024);
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
	const TOP_WORDS_TO_SHOW = 25;  // Change this number to show more/less words

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
	};

	// Example usage:
	// const noteUUIDs = ['uuid1', 'uuid2', 'uuid3'];
	await analyzeNotes(noteUUIDs, app);
	console.log(finalResutls);

	// await analyzeNote('your-note-uuid');
	// await analyzeMultipleNotes(['uuid1', 'uuid2', 'uuid3']);

	// ---------------------------------------------------------------

  }
}
/* {
  async insertText(app) {
    const noteHandles = await app.filterNotes({ tag: "daily-jots" });
    console.log (noteHandles);
    return `note count: ${ noteHandles.length }`;
  }
} */