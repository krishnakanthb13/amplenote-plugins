{
appOption: {
/* ----------------------------------- */
"Basic": async function (app) {

    const existingSetting = await app.settings["Previous_Roll"];
    let result;
	// ------------------ Initialization ------------------
    if (existingSetting) {
	// Split and map existing settings, using default values where applicable
    const [
      numDicez,
      facesz,
      minz,
      maxz,
      keepHighestz,
      keepCountz,
      dropHighestz,
      dropCountz,
      explodez,
      explodeTargetz,
      sortOptionz,
      uniquez,
	  lookUpz
    ] = (existingSetting || "") // Ensure existingSetting is not null or undefined
      .split(",")
      .map((value, index) => {
        const defaults = [1, 6, , , false, 0, false, 0, false, 0, 1, false, 0]; // Default values
        if (value === undefined || value === null || value.trim() === "") {
          return defaults[index]; // Use default if value is missing or empty
        }
        // Parse value based on expected type
        if ([0, 1, 2, 3, 5, 7, 9, 10, 12].includes(index)) return Number(value) || defaults[index]; // Numbers
        if ([4, 6, 8, 11].includes(index)) return value.toLowerCase() === "true"; // Booleans
        return value; // Strings or other types (not expected here)
      });
    // Prompt user with pre-filled inputs
    result = await app.prompt("Roll the Dice!", {
      inputs: [ 
        
        { label: "Number of Dice", type: "string", value: numDicez },
        { label: "Number of Faces", type: "string", value: facesz },
        { label: "Minimum Number", type: "string", value: minz },
        { label: "Maximum Number", type: "string", value: maxz },
        { label: "Keep Highest Roll", type: "checkbox", value: keepHighestz },
        { label: "Keep Highest Roll Count", type: "string", value: keepCountz },
        { label: "Drop Highest Roll", type: "checkbox", value: dropHighestz },
        { label: "Drop Highest Roll Count", type: "string", value: dropCountz },
        { label: "Explode", type: "checkbox", value: explodez },
        { label: "Explode Target", type: "string", value: explodeTargetz },
        { label: "Sort the output", type: "select", options: [ { label: "None", value: 1 }, { label: "Ascending", value: 2 }, { label: "Decending", value: 3 } ], value: sortOptionz || 1 },
        { label: "Unique", type: "checkbox", value: uniquez },
        { label: "Look Up in your Notes (Sorted By)", type: "select", options: [ { label: "None", value: 5 }, { label: "Name", value: 1 }, { label: "Created", value: 2 }, { label: "Modified", value: 3 }, { label: "UUID", value: 6 }, { label: "Tags", value: 7 }, { label: "Random", value: 4 } ], value: lookUpz || 5 },
      ] 
    
    });
      
    } else {
	// Prompt user with empty inputs for first-time setup
    result = await app.prompt("Roll the Dice!", {
      inputs: [ 
        
        { label: "Number of Dice", type: "string" },
        { label: "Number of Faces", type: "string" },
        { label: "Minimum Number", type: "string" },
        { label: "Maximum Number", type: "string" },
        { label: "Keep Highest Roll", type: "checkbox" },
        { label: "Keep Highest Roll Count", type: "string" },
        { label: "Drop Highest Roll", type: "checkbox" },
        { label: "Drop Highest Roll Count", type: "string" },
        { label: "Explode", type: "checkbox" },
        { label: "Explode Target", type: "string" },
        { label: "Sort the output", type: "select", options: [ { label: "None", value: 1 }, { label: "Ascending", value: 2 }, { label: "Decending", value: 3 } ], value: 1 },
        { label: "Unique", type: "checkbox" },
        { label: "Look Up in your Notes (Sorted By)", type: "select", options: [ { label: "None", value: 5 }, { label: "Name", value: 1 }, { label: "Created", value: 2 }, { label: "Modified", value: 3 }, { label: "UUID", value: 6 }, { label: "Tags", value: 7 }, { label: "Random", value: 4 } ], value: 5 },
      ] 
    
    });

    }
    // ------------------ Dice Rolling Logic ------------------
    function rollDice({
      numDice = null,
      faces = null,
      min = null,
      max = null,
      keep = null, // { highest: true/false, count: number }
      drop = null, // { highest: true/false, count: number }
      explode = null, // { target: number, reroll: boolean }
      sort = null, // "asc" or "desc"
      unique = false,
    } = {}) {
      // Helper function to roll a single die
      const rollSingleDie = () => Math.floor(Math.random() * faces) + 1;
    
      // Roll the dice
      let rolls = Array.from({ length: numDice }, rollSingleDie);
    
      // Apply min/max restrictions
      if (min !== null) rolls = rolls.map((roll) => Math.max(roll, min));
      if (max !== null) rolls = rolls.map((roll) => Math.min(roll, max));
    
      // Handle explosions
      if (explode) {
        const { target, reroll } = explode;
        const newRolls = [];
        rolls.forEach((roll) => {
          newRolls.push(roll);
          while (roll === target) {
            const extraRoll = rollSingleDie();
            newRolls.push(extraRoll);
            if (!reroll) break;
          }
        });
        rolls = newRolls;
      }
    
      // Ensure uniqueness
      if (unique) rolls = [...new Set(rolls)];
    
      // Sort rolls
      if (sort === "asc") rolls.sort((a, b) => a - b);
      if (sort === "desc") rolls.sort((a, b) => b - a);
    
      // Keep highest or lowest rolls
      if (keep) {
        const { highest, count } = keep;
        rolls = highest
          ? rolls.slice(-count)
          : rolls.slice(0, count);
      }
    
      // Drop highest or lowest rolls
      if (drop) {
        const { highest, count } = drop;
        rolls = highest
          ? rolls.slice(0, rolls.length - count)
          : rolls.slice(count);
      }
    
      return {
        rolls,
        total: rolls.reduce((sum, roll) => sum + roll, 0),
      };
    }

	async function sortNotesByLookUp(lookUp, pickNote) {
	  // Fetch notes grouped by some criteria
	  let notesByGroup = await app.filterNotes({});
	  
	  // Sorting logic based on lookUp value
	  switch (lookUp) {
		case 1: // Sort by Name
		  notesByGroup.sort((a, b) => a.name.localeCompare(b.name));
		  break;
		case 2: // Sort by Created
		  notesByGroup.sort((a, b) => new Date(a.created) - new Date(b.created));
		  break;
		case 3: // Sort by Modified
		  notesByGroup.sort((a, b) => new Date(a.updated) - new Date(b.updated));
		  break;
		case 4: // Random
		  notesByGroup = shuffleArray(notesByGroup);
		  break;
		case 6: // UUID
		  notesByGroup.sort((a, b) => a.uuid.localeCompare(b.uuid));
		  break;
		case 7: // Tags + Name
			notesByGroup.sort((a, b) => {
			  // Compare tags (default to empty string if no tags)
			  const aTag = a.tags?.[0]?.toLowerCase() || "";
			  const bTag = b.tags?.[0]?.toLowerCase() || "";
			  if (aTag !== bTag) {
				return aTag.localeCompare(bTag); // Sort by tags
			  }
			  return a.name.localeCompare(b.name); // Sort by name if tags are equal
			});
		  break;
		case 5: // Escape / Return
		  return;
		default: // Default to Name sort
		  notesByGroup.sort((a, b) => a.name.localeCompare(b.name));
	  }

	  // Adjust pickNote to be within the bounds of notesByGroup
	  const totalNotes = notesByGroup.length;
	  if (totalNotes === 0) {
		throw new Error("No notes available to pick.");
	  }
	  const adjustedPickNote = pickNote % totalNotes; // Calculate the valid index

	  // Select the note based on adjustedPickNote
	  const selectedNote = notesByGroup[adjustedPickNote];

	  // Return the UUID of the selected note
	  return selectedNote?.uuid;

	  // Helper function to shuffle an array
	  function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [array[i], array[j]] = [array[j], array[i]]; // Swap elements
		}
		return array;
	  }
	}

	// async function auditNavigate(valueOps) {
		// if (valueOps = 1) {
			// await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			// await app.navigate(`https://www.amplenote.com/notes/${uuid}`);				
		// } else if (valueOps = 1) {
			// await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			// await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);			
		// }
	// }
    
    if (result) {
      const [
        numDice,
        faces,
        min,
        max,
        keepHighest,
        keepCount,
        dropHighest,
        dropCount,
        explode,
        explodeTarget,
        sortOption,
        unique,
		lookUp
      ] = result;

      await app.setSetting("Previous_Roll", result);
	  console.log("lookUp", lookUp);
  
      const sortMap = { 1: null, 2: "asc", 3: "desc" };
  
      const diceResult = rollDice({
        numDice: Number(numDice) || 1,
        faces: Number(faces) || 6,
        min: min ? Number(min) : null,
        max: max ? Number(max) : null,
        keep: keepHighest
          ? { highest: true, count: Number(keepCount) || 1 }
          : null,
        drop: dropHighest
          ? { highest: true, count: Number(dropCount) || 1 }
          : null,
        explode: explode
          ? { target: Number(explodeTarget) || 6, reroll: true }
          : null,
        sort: sortMap[sortOption],
        unique: !!unique,
      });
  
      console.log("Rolls:", diceResult.rolls);
      console.log("Total:", diceResult.total);
	  
	  const pickNote = diceResult.total;

    // Generate the filename based on the current date and time
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

    // Audit Report
    const auditNoteName = `Dice Results Audit`;
    const auditTagName = ['-reports/-dice'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Dice_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Dice_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();

	if ([1, 2, 3, 4, 6, 7].includes(lookUp)) {
	  // Example Usage:
	  // const lookUp = 2; // Could be 1 (Name), 2 (Created), 3 (Modified), 4 (Random)
	  (async () => {
		try {
		  const uuid = await sortNotesByLookUp(lookUp, pickNote);
		  console.log(`Selected Note UUID: ${uuid}`);
		  const auditReport = `- <mark>Basic:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Options: ${result}**; <mark>**Dice rolled:** ${diceResult.rolls}; **Total:** ${diceResult.total};</mark> **UUID:** ${uuid};`;
		  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
		  await app.navigate(`https://www.amplenote.com/notes/${uuid}`);
		} catch (error) {
		  console.error(error.message);
		}
	  })();
	} else {
	  (async () => {
		try {
		  console.log("Lookup note option - None selected");
		  // No Lookup. Just Audit.
		  const auditReport = `- <mark>Basic:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Options: ${result}**; <mark>**Dice rolled:** ${diceResult.rolls}; **Total:** ${diceResult.total};</mark>`;
		  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
		  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
		} catch (error) {
		  console.error(error.message);
		}
	  })();
	}

	}
      
},
/* ----------------------------------- */
"Fudge/Fate": async function (app) {

    const existingSetting = await app.settings["Previous_Roll_FF"];

	// Fudge/Fate Dice Roller with Custom Prompt Integration
	async function rollFudgeDice(numDice = 4) {
	  // Map numeric rolls to Fudge outcomes
	  const outcomes = ["-", " ", "+"]; // 1, 2 = '-', 3, 4 = ' ', 5, 6 = '+'
	  let results = [];
	  let total = 0;

	  // Roll dice and calculate results
	  for (let i = 0; i < numDice; i++) {
		const roll = Math.floor(Math.random() * 6); // Random number 0-5
		const face = outcomes[Math.floor(roll / 2)]; // Map to "-", " ", "+"
		results.push(face);
		total += face === "+" ? 1 : face === "-" ? -1 : 0;
	  }

	  return { results, total };
	}

	// Main function with custom prompt
	async function main() {
	  // Pre-filled number of dice (default to 4)
	  const numDicez = existingSetting;

	  // Prompt user with pre-filled inputs
	  const result = await app.prompt("Fudge/Fate, Roll the Dice!", {
		inputs: [
		  { label: "Number of Dice", type: "string", value: numDicez || 4 },
		],
	  });

      console.log("result",result);

	  if (result) {
		const numDiceInput = result;
		const numDice = parseInt(numDiceInput, 10) || 4;
		await app.setSetting("Previous_Roll_FF", numDice);

		if (numDice <= 0) {
		  console.error("Number of dice must be a positive integer!");
		  return;
		}

		const { results, total } = await rollFudgeDice(numDice);

		// Generate the filename based on the current date and time
		const now = new Date();
		const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
		const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

		// Audit Report
		const auditNoteName = `Dice Results Audit`;
		const auditTagName = ['-reports/-dice'];
		const auditnoteUUID = await (async () => {
		  const existingUUID = await app.settings["Dice_Audit_UUID [Do not Edit!]"];
		  if (existingUUID) 
			  return existingUUID;
		  const newUUID = await app.createNote(auditNoteName, auditTagName);
		  await app.setSetting("Dice_Audit_UUID [Do not Edit!]", newUUID);
		  return newUUID;
		})();

	  (async () => {
		try {
		  console.log(`You rolled ${numDice} dice: [${results.join(", ")}]\nTotal result: ${total}`);
		  // No Lookup. Just Audit.
		  const auditReport = `- <mark>Fudge/Fate:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Options: ${numDice}**; <mark>**Dice rolled:** [${results.join(", ")}]; **Total:** ${total};</mark>`;
		  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
		  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
		} catch (error) {
		  console.error(error.message);
		}
	  })();

	  }
	}

	// Run the program
	main();

},
/* ----------------------------------- */
"Fantasy AGE Stunt - Single Roll": async function (app) {

	// Function to roll a single six-sided die
	function rollDie() {
		return Math.floor(Math.random() * 6) + 1;
	}

	// Function to roll Fantasy AGE Stunt Dice
	async function rollFantasyAGE() {
		// Roll three six-sided dice
		let dice = [rollDie(), rollDie(), rollDie()];
		let total = dice.reduce((sum, die) => sum + die, 0);
		let stuntDie = dice[0]; // Assume the first die is the stunt die by convention

		// Check if there's a stunt (any two dice showing the same number)
		let hasStunt = new Set(dice).size < 3; // Less than 3 unique numbers means doubles exist
		let stuntPoints = hasStunt ? stuntDie : 0;

		// Generate the filename based on the current date and time
		const now = new Date();
		const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
		const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

		// Audit Report
		const auditNoteName = `Dice Results Audit`;
		const auditTagName = ['-reports/-dice'];
		const auditnoteUUID = await (async () => {
		  const existingUUID = await app.settings["Dice_Audit_UUID [Do not Edit!]"];
		  if (existingUUID) 
			  return existingUUID;
		  const newUUID = await app.createNote(auditNoteName, auditTagName);
		  await app.setSetting("Dice_Audit_UUID [Do not Edit!]", newUUID);
		  return newUUID;
		})();

		// Display results
		console.log(`Dice rolled: ${dice.join(', ')}`);
		console.log(`Total: ${total}`);
		if (hasStunt) {

		  (async () => {
			try {
			  const auditReport = `- <mark>Fantasy AGE Stunt - Single:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Dice rolled:** [${dice.join(', ')}]; **Total:** ${total}; AYE! You rolled doubles! **Stunt Points:** ${stuntPoints};</mark>`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();

			const messageResult = `Fantasy AGE Stunt Dice Result:\nDice rolled: [${dice.join(', ')}].\nTotal: ${total}.\n> AYE! You rolled doubles! Stunt Points: ${stuntPoints}.`;
			app.alert(messageResult);
			console.log(messageResult);
		} else {

		  (async () => {
			try {
			  const auditReport = `- <mark>Fantasy AGE Stunt - Single:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Dice rolled:** [${dice.join(', ')}]; **Total:** ${total}; **Stunt Points:** No stunt this time. Better Luck Next Time!;</mark>`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();

			const messageResult = `Fantasy AGE Stunt Dice Result:\nDice rolled: ${dice.join(', ')}.\nTotal: ${total}.\n> No stunt this time. Better Luck Next Time!`;
			app.alert(messageResult);
			console.log(messageResult);
		}
	}

	// Run the function
	rollFantasyAGE();

},
/* ----------------------------------- */
"Fantasy AGE Stunt - Roll All At Once": async function (app) {

    const existingSetting = await app.settings["Previous_Roll_AGE"];
	let result;
    if (existingSetting) {
	// Split and map existing settings, using default values where applicable
    const [
      playerCountz,
      charactersPerPlayerz
    ] = (existingSetting || "") // Ensure existingSetting is not null or undefined
      .split(",")
      .map((value, index) => {
        const defaults = [3, 2]; // Default values
        if (value === undefined || value === null || value.trim() === "") {
          return defaults[index]; // Use default if value is missing or empty
        }
        // Parse value based on expected type
        if ([0, 1].includes(index)) return Number(value) || defaults[index]; // Numbers
        return value; // Strings or other types (not expected here)
      });


	  // Prompt user with pre-filled inputs
	  result = await app.prompt("Fantasy AGE Stunt - Roll All At Once!", {
		inputs: [
		  { label: "Number of Players", type: "string", value: playerCountz },
		  { label: "Number of Characters Per Player", type: "string", value: charactersPerPlayerz },
		],
	  });
	  
	} else {
	  // Prompt user with pre-filled inputs
	  result = await app.prompt("Fantasy AGE Stunt - Roll All At Once!", {
		inputs: [
		  { label: "Number of Players", type: "string", value: 3 },
		  { label: "Number of Characters Per Player", type: "string", value: 2 },
		],
	  });		
	}
	  
	  let finalResult = `**Fantasy AGE Stunt - Roll All At Once**`;

	// Function to roll a single six-sided die
	function rollDie() {
		return Math.floor(Math.random() * 6) + 1;
	}

	// Function to roll Fantasy AGE Stunt Dice for one character
	function rollFantasyAGE(playerName, characterName) {
		// Roll three six-sided dice
		let dice = [rollDie(), rollDie(), rollDie()];
		let total = dice.reduce((sum, die) => sum + die, 0);
		let stuntDie = dice[0]; // Assume the first die is the stunt die by convention

		// Check if there's a stunt (any two dice showing the same number)
		let hasStunt = new Set(dice).size < 3; // Less than 3 unique numbers means doubles exist
		let stuntPoints = hasStunt ? stuntDie : 0;

		// Display results
		console.log(`-- ${playerName}'s Character: ${characterName} --`);
		console.log(`Dice rolled: ${dice.join(', ')}`);
		console.log(`Total: ${total}`);
		finalResult += `<mark>\n-- ${playerName}'s Character: ${characterName} --</mark>`;
		finalResult += `\nDice rolled: ${dice.join(', ')}`;
		finalResult += `\nTotal: ${total}`;
		if (hasStunt) {
			console.log(`AYE! You rolled doubles! Stunt Points: ${stuntPoints}`);
			finalResult += `\nAYE! You rolled doubles! Stunt Points: ${stuntPoints}`;
		} else {
			console.log("No stunt this time. Better Luck Next Time!");
			finalResult += `\nNo stunt this time. Better Luck Next Time!`;
		}
	}

	// Main Function to handle multiple players and characters
	function playFantasyAGE(playerCount, charactersPerPlayer) {
		console.log(`Starting Fantasy AGE with ${playerCount} players and ${charactersPerPlayer} characters each.`);
		for (let i = 1; i <= playerCount; i++) {
			let playerName = `Player ${i}`;
			for (let j = 1; j <= charactersPerPlayer; j++) {
				let characterName = `Character ${j}`;
				rollFantasyAGE(playerName, characterName);
			}
		}
	}

    if (result) {
	// Variables and constants to define the game setup
      const [
        playerCount, // Total number of players
        charactersPerPlayer // Number of characters each player controls
      ] = result;
	  
	  await app.setSetting("Previous_Roll_AGE", result);

	// Start the game
	playFantasyAGE(playerCount, charactersPerPlayer);

	// Generate the filename based on the current date and time
	const now = new Date();
	const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
	const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

	// Audit Report
	const auditNoteName = `Dice Results Audit`;
	const auditTagName = ['-reports/-dice'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Dice_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Dice_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();

	const finalResultz = `[Report][^AGER]
[^AGER]: []()${finalResult}
`;

	  const auditReport = `- <mark>Fantasy AGE Stunt - All:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Player Count:** ${playerCount}; **Characters Per Player:** ${charactersPerPlayer}; **Stunt Points:**</mark> ${finalResultz}`;
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
	  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);

		app.alert(finalResult);
		console.log(finalResult);

	}
},
/* ----------------------------------- */
},

noteOption: {
/* ----------------------------------- */
	
	"Table - Randomizer": async function (app, noteUUID) {

	// *************************************************************** //

	//const note = await app.notes.find(noteUUID);
    const markdown = await app.getNoteContent({ uuid: noteUUID });

    // Function to remove HTML comments
    const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();
	
	// *************************************************************** //

    // Function to remove empty rows and columns
    const removeEmptyRowsAndColumns = (table) => {
      const rows = table.split('\n').filter(row => row.trim().startsWith('|'));
      // console.log("Rows before filtering:", rows);

      // Remove completely empty rows
      const filteredRows = rows.filter(row => {
        const cells = row.split('|').slice(1, -1); // Exclude the leading and trailing empty cells
        // console.log("Cells in current row:", cells);
        const hasContent = cells.some(cell => cell.trim() !== '');
        // console.log("Row has content:", hasContent);
        return hasContent;
      });

      // console.log("Filtered rows (no empty rows):", filteredRows);

      if (filteredRows.length === 0) {
        // console.log("All rows are empty, returning empty string.");
        return ''; // If all rows are empty, return empty string
      }

      // Determine the columns that are not empty across all rows
      const columnCount = filteredRows[0].split('|').length - 2;
      // console.log("Column count:", columnCount);
      const nonEmptyColumns = Array.from({ length: columnCount }, (_, colIndex) => 
        filteredRows.some(row => row.split('|')[colIndex + 1].trim() !== '')
      );

      // console.log("Non-empty columns flags:", nonEmptyColumns);

      // Remove empty columns
      const cleanedRows = filteredRows.map(row => {
        const cells = row.split('|').slice(1, -1); // Exclude the leading and trailing empty cells
        // console.log("Cells before filtering empty columns:", cells);
        const filteredCells = cells.filter((_, i) => nonEmptyColumns[i]);
        // console.log("Filtered cells (no empty columns):", filteredCells);
        return `| ${filteredCells.join(' | ')} |`;
      });

      // console.log("Cleaned rows after removing empty columns:", cleanedRows);

      return cleanedRows.join('\n');
    };

	// *************************************************************** //

    const lines = markdown.split('\n');
    // console.log("Lines:", lines);

    let tableCount = 0;
    let inTable = false;
    const tables = [];
    let currentTable = [];

    lines.forEach((line, index) => {
      // console.log(`Processing line ${index}:`, line);

      if (line.trim().startsWith('|')) {  // Identifying table rows
        if (!inTable) {
          tableCount++;
          // console.log("New table detected, tableCount incremented:", tableCount);

          if (tableCount > 1) {
            tables.push('---');  // Add separator between tables
            // console.log("Added table separator ('---').");
          }
          tables.push(`# Table ${tableCount}\n`);
          inTable = true;
          // console.log("In table set to true:", inTable);
        }

        if (currentTable.length === 0 && line.split('|').every(cell => cell.trim() === '')) {
          const columnCount = line.split('|').length - 2;
          const headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`).join(' | ');
          // currentTable.push(`| ${headers} |`); // Automatically Adding Columns is disabled for now!
          // console.log("Added headers to empty table row:", currentTable);
        }

        currentTable.push(line);
        // console.log("Current table content:", currentTable);
      } else if (inTable) {
        inTable = false;
        // console.log("End of table detected, inTable set to false.");

        const tableContent = currentTable.join('\n');
        // console.log("Current table content before cleaning:", tableContent);

        // tables.push(removeEmptyRowsAndColumns(tableContent));
        tables.push(tableContent);
        tables.push('');  // Add an additional blank line between tables
        // console.log("Added cleaned table and blank line to tables:", tables);

        currentTable = [];
        // console.log("Reset currentTable:", currentTable);
      }
    });

    // Ensure the last table is pushed if the markdown ends with a table
    if (currentTable.length > 0) {
      const tableContent = currentTable.join('\n');
      // console.log("Final table content before cleaning:", tableContent);

      tables.push(removeEmptyRowsAndColumns(tableContent));
      // console.log("Added final cleaned table to tables:", tables);
    }

    // Join all tables and remove HTML comments at the end
    const processedContent = tables.join('\n\n');
    // console.log("Processed content before removing HTML comments:", processedContent);

    const cleanedContent = removeHtmlComments(processedContent);
    console.log("Cleaned content after removing HTML comments:", cleanedContent);
	
	const markdownText = cleanedContent;

    // app.alert(cleanedContent);
    // console.log("Final cleaned content:", cleanedContent);

	// *************************************************************** //	
		
	function getTableDetails(markdownContent) {
		// Regex to find markdown headers like "# Table 1", "# Table 2", etc.
		const headerRegex = /#\s*Table\s*\d+/g;

		// Match all headers that follow the pattern "# Table X"
		const headers = markdownContent.match(headerRegex);

		// If no headers are found, return an empty array
		if (!headers) return [];

		// Map the headers to an array of objects in the desired format
		const tableDetails = headers.map(header => {
			// Remove the '#' from the header text
			const tableName = header.replace('# ', '');
			return { label: tableName, value: tableName };
		});

		// Add an "All" entry at the beginning of the list
		tableDetails.unshift({ label: "All Tables", value: "All" });

		return tableDetails;
	}

	// Count the number of tables
	const numberOfTables = getTableDetails(markdownText);
	console.log("Number of tables found:", numberOfTables);
	
	if (numberOfTables < 1) {
		app.alert("Warning: This Note does not contain any Tables. Select this option on Notes which contain Tables.")
		return;
	}

    const existingSetting = await app.settings["Previous_Roll_Ran"];

    // Prompt the user to select tags and choose options
    const result = await app.prompt(
        "Fill in or Update the Details, based on your requirments.",
        {
            inputs: [
            {
                label: "Select the Table - To Randomize!",
                type: "radio",
                options: numberOfTables,
				value: "All"
            },
			{ label: "Select number of Randomizations.", type: "string", value: existingSetting || 3 },
			{ label: "Does the Table has Headers", type: "checkbox", value: true }
            ]
        }
    );

    if (result) {
	// Variables and constants to define the game setup
      const [
        nthTable, // User-defined parameter to select the nth table
        numberCombo, // Number of combinations
		hasHeader // Specify whether the table has headers to skip the first row of data
      ] = result;
	  
	  await app.setSetting("Previous_Roll_Ran", numberCombo);

	class ColumnRandomPicker {
	  constructor(markdownText, keepHeaders = true) {
		this.keepHeaders = keepHeaders;
		this.tables = this.parseTables(markdownText);
	  }

	  parseTables(markdownText) {
		const tables = {};
		let currentTable = [];
		let currentTableName = '';
		
		// Split into lines
		const lines = markdownText.split('\n');
		
		for (const line of lines) {
		  if (line.startsWith('# ')) {
			if (currentTable.length > 0) {
			  tables[currentTableName] = this.processTable(currentTable);
			  currentTable = [];
			}
			currentTableName = line.substring(2).trim();
		  } else if (line.includes('|') && !line.trim().startsWith('---')) {
			currentTable.push(line);
		  }
		}
		
		// Process the last table
		if (currentTable.length > 0 && currentTableName) {
		  tables[currentTableName] = this.processTable(currentTable);
		}
		
		return tables;
	  }

	  processTable(tableLines) {
		// Skip the first two lines (table formatting)
		// If keepHeaders is false, skip the header row too
		const startIndex = this.keepHeaders ? 2 : 3;
		
		// Process each line into an array of cells
		const data = tableLines.slice(startIndex).map(line => {
		  return line.split('|')
			.slice(1, -1)  // Remove empty first/last elements
			.map(cell => cell.trim());
		});
		
		return data;
	  }

	  getRandomValueFromArray(arr) {
		// Filter out empty values before selecting
		const validValues = arr.filter(value => value !== '');
		if (validValues.length === 0) return '';
		return validValues[Math.floor(Math.random() * validValues.length)];
	  }

	  getColumnBasedRandomCombination(tableName) {
		const table = this.tables[tableName];
		if (!table) return null;
		
		// Get number of columns from first row
		const numColumns = table[0].length;
		
		// Create arrays for each column
		const columns = Array(numColumns).fill().map(() => []);
		
		// Populate column arrays
		table.forEach(row => {
		  row.forEach((value, colIndex) => {
			if (value !== '') {
			  columns[colIndex].push(value);
			}
		  });
		});
		
		// Pick one random value from each column
		return columns.map(column => this.getRandomValueFromArray(column));
	  }

	  generateMultipleCombinations(tableName, count) {
		const combinations = [];
		for (let i = 0; i < count; i++) {
		  const combo = this.getColumnBasedRandomCombination(tableName);
		  if (combo) combinations.push(combo);
		}
		return combinations;
	  }

	  // Generate combinations for all tables
	  generateCombinationsForAllTables(count = 1) {
		const result = {};
		for (const tableName of Object.keys(this.tables)) {
		  result[tableName] = this.generateMultipleCombinations(tableName, count);
		}
		return result;
	  }

	  // Generate combinations for a specific table (one table only)
	  generateCombinationsForOneTable(tableName, count = 1) {
		const result = {};
		if (this.tables[tableName]) {
			result[tableName] = this.generateMultipleCombinations(tableName, count);
		} else {
			console.error("Table not found: ", tableName);
		}
		return result;
	  }

	// Format combinations as markdown for one or more tables
	formatAsMarkdown(combinations) {
		let output = '';
		
		// Check if combinations is an array (indicating one table) or an object (multiple tables)
		if (Array.isArray(combinations)) {
			// Handle single table
			const tableData = Object.entries(combinations);
			output += `<mark>Table</mark>\n`;
			output += '|' + tableData[0].map((_, i) => ` Column ${i + 1} `).join('|') + '|\n';
			output += '|' + tableData[0].map(() => '---').join('|') + '|\n';
			tableData.forEach(row => {
				output += '|' + row.map(cell => ` ${cell} `).join('|') + '|\n';
			});
		} else {
			// Handle multiple tables (object with tableName as keys)
			for (const [tableName, tableData] of Object.entries(combinations)) {
				output += `<mark>${tableName}</mark>\n`;
				output += '|' + tableData[0].map((_, i) => ` Column ${i + 1} `).join('|') + '|\n';
				output += '|' + tableData[0].map(() => '---').join('|') + '|\n';
				tableData.forEach(row => {
					output += '|' + row.map(cell => ` ${cell} `).join('|') + '|\n';
				});
				output += '...............\n';
			}
		}
		
		return output;
	}

	}

	// Example usage:
	const picker = new ColumnRandomPicker(markdownText, hasHeader);
	let finalOutput;
	
	if (nthTable === "All") {
		// Generate multiple combinations for each table
		const multipleCombinations = picker.generateCombinationsForAllTables(numberCombo);
		console.log(picker.formatAsMarkdown(multipleCombinations));
		finalOutput = picker.formatAsMarkdown(multipleCombinations);
	} else {
		// Get one random combination for Table 1
		const tableCombo = picker.generateCombinationsForOneTable(nthTable, numberCombo);
		console.log(picker.formatAsMarkdown(tableCombo));
		finalOutput = picker.formatAsMarkdown(tableCombo);
	}

	// Generate the filename based on the current date and time
	const now = new Date();
	const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
	const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');

	// Audit Report
	const auditNoteName = `Dice Results Audit`;
	const auditTagName = ['-reports/-dice'];
	const auditnoteUUID = await (async () => {
	  const existingUUID = await app.settings["Dice_Audit_UUID [Do not Edit!]"];
	  if (existingUUID) 
		  return existingUUID;
	  const newUUID = await app.createNote(auditNoteName, auditTagName);
	  await app.setSetting("Dice_Audit_UUID [Do not Edit!]", newUUID);
	  return newUUID;
	})();

	const finalResultz = `[Report][^AGER]
[^AGER]: []()${finalOutput}
`;

	  const auditReport = `- <mark>Table - Randomizer:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Data:**</mark> ${finalResultz}`;
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
	  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);

		app.alert(finalOutput);
		console.log(finalOutput);

	}
	},
/* ----------------------------------- */
}
}