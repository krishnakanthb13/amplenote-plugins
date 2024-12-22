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
		  { label: "Number of Dice", type: "string", value: numDicez },
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
			  const auditReport = `- <mark>Fantasy AGE Stunt - Single:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Stunt Points:** ${stuntPoints}; **Dice rolled:** [${dice.join(', ')}]; **Total:** ${total};</mark>`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();

			const messageResult = `Fantasy AGE Stunt Dice Result:\n> AYE! You rolled doubles! Stunt Points: ${stuntPoints}.\nDice rolled: [${dice.join(', ')}].\nTotal: ${total}.`;
			app.alert(messageResult);
			console.log(messageResult);
		} else {

		  (async () => {
			try {
			  const auditReport = `- <mark>Fantasy AGE Stunt - Single:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Stunt Points:** No stunt this time.; **Dice rolled:** [${dice.join(', ')}]; **Total:** ${total};</mark>`;
			  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
			  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
			} catch (error) {
			  console.error(error.message);
			}
		  })();

			const messageResult = `Fantasy AGE Stunt Dice Result:\n> No stunt this time. Better Luck Next Time!\nDice rolled: ${dice.join(', ')}.\nTotal: ${total}.`;
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
	console.log("finalResult",finalResult);

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
	
	}

},
  }
}