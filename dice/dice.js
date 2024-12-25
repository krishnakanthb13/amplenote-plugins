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
    result = await app.prompt("Roll the Dice! (Previous Roll is remembered)", {
      inputs: [ 
        
        { label: "Number of Dice", type: "string", value: numDicez },
        { label: "Number of Faces", type: "string", value: facesz },
        { label: "Minimum Number (Limit)", type: "string", value: minz },
        { label: "Maximum Number (Limit)", type: "string", value: maxz },
        { label: "Keep Highest Roll (Drop the remaining)", type: "checkbox", value: keepHighestz },
        { label: "Keep Highest Roll Count", type: "string", value: keepCountz },
        { label: "Drop Highest Roll (keep the remaining)", type: "checkbox", value: dropHighestz },
        { label: "Drop Highest Roll Count", type: "string", value: dropCountz },
        { label: "Explode (An additional Die)", type: "checkbox", value: explodez },
        { label: "Explode Target", type: "string", value: explodeTargetz },
        { label: "Sort the output", type: "select", options: [ { label: "None", value: 1 }, { label: "Ascending", value: 2 }, { label: "Decending", value: 3 } ], value: sortOptionz || 1 },
        { label: "Unique (Every Die is Unique)", type: "checkbox", value: uniquez },
        { label: "Look Up in your Notes (Sorted By) - Navigate to", type: "select", options: [ { label: "None", value: 5 }, { label: "Name", value: 1 }, { label: "Created", value: 2 }, { label: "Modified", value: 3 }, { label: "UUID", value: 6 }, { label: "Tags", value: 7 }, { label: "Random", value: 4 } ], value: lookUpz || 5 },
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

      const resultx = 
`**NumDice**: ${numDice},
**Faces**: ${faces},
**Min**: ${min},
**Max**: ${max},
**Keep Highest**: ${keepHighest},
**Keep Count**: ${keepCount},
**Drop Highest**: ${dropHighest},
**Drop Count**: ${dropCount},
**Explode**: ${explode},
**Explode Target**: ${explodeTarget},
**Sort Option**: ${sortOption},
**Unique**: ${unique},
**LookUp**: ${lookUp},`;

	const finalResultx = `[Report][^ADV]
[^ADV]: []()${resultx}
`;

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
		  const auditReport = `- <mark>Basic:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Dice rolled:** ${diceResult.rolls}; **Total:** ${diceResult.total};</mark> **UUID:** ${uuid}; **Options:** ${finalResultx}`;
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
		  const auditReport = `- <mark>Basic:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Dice rolled:** ${diceResult.rolls}; **Total:** ${diceResult.total};</mark> **Options:** ${finalResultx}`;
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
"Advanced": async function (app) {

    // const existingSetting1 = await app.settings["Previous_Roll_ADV1"];
    // const existingSetting2 = await app.settings["Previous_Roll_ADV2"];

	class DiceParser {
		constructor() {
			this.pos = 0;
			this.input = '';
		}

		// Roll a die with given number of sides
		rollDie(sides) {
			return Math.floor(Math.random() * sides) + 1;
		}

		// Roll multiple dice and sum the results
		rollDice(count, sides) {
			let sum = 0;
			for (let i = 0; i < count; i++) {
				sum += this.rollDie(sides);
			}
			return sum;
		}

		// Skip whitespace
		skipWhitespace() {
			while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
				this.pos++;
			}
		}

		// Parse a number or dice expression
		parseNumber() {
			this.skipWhitespace();
			
			// Check for dice notation
			if (/\d/.test(this.input[this.pos])) {
				let start = this.pos;
				while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
					this.pos++;
				}
				
				if (this.pos < this.input.length && this.input[this.pos] === 'd') {
					const count = parseInt(this.input.slice(start, this.pos));
					this.pos++; // skip 'd'
					
					start = this.pos;
					while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
						this.pos++;
					}
					const sides = parseInt(this.input.slice(start, this.pos));
					
					return this.rollDice(count, sides);
				} else {
					return parseInt(this.input.slice(start, this.pos));
				}
			}
			
			throw new Error('Invalid number or dice expression');
		}

		// Parse expressions with parentheses
		parseParentheses() {
			this.skipWhitespace();
			
			if (this.input[this.pos] === '(') {
				this.pos++;
				const result = this.parseExpression();
				this.skipWhitespace();
				
				if (this.input[this.pos] !== ')') {
					throw new Error('Missing closing parenthesis');
				}
				this.pos++;
				
				return result;
			}
			
			return this.parseNumber();
		}

		// Parse exponents
		parseExponent() {
			let left = this.parseParentheses();
			this.skipWhitespace();
			
			while (this.pos < this.input.length && this.input[this.pos] === '^') {
				this.pos++;
				const right = this.parseParentheses();
				left = Math.pow(left, right);
				this.skipWhitespace();
			}
			
			return left;
		}

		// Parse multiplication and division
		parseMultiplyDivide() {
			let left = this.parseExponent();
			this.skipWhitespace();
			
			while (this.pos < this.input.length && (this.input[this.pos] === '*' || this.input[this.pos] === '/')) {
				const operator = this.input[this.pos];
				this.pos++;
				const right = this.parseExponent();
				
				if (operator === '*') {
					left *= right;
				} else {
					left /= right;
				}
				
				this.skipWhitespace();
			}
			
			return left;
		}

		// Parse addition and subtraction
		parseExpression() {
			let left = this.parseMultiplyDivide();
			this.skipWhitespace();
			
			while (this.pos < this.input.length && (this.input[this.pos] === '+' || this.input[this.pos] === '-')) {
				const operator = this.input[this.pos];
				this.pos++;
				const right = this.parseMultiplyDivide();
				
				if (operator === '+') {
					left += right;
				} else {
					left -= right;
				}
				
				this.skipWhitespace();
			}
			
			return left;
		}

		// Main parse function
		parse(input) {
			this.input = input.replace(/\s+/g, '').toLowerCase();
			this.pos = 0;
			
			const result = this.parseExpression();
			
			if (this.pos < this.input.length) {
				throw new Error('Invalid expression');
			}
			
			return result;
		}
	}

	// Example usage function
	function evaluateDiceExpression(expression) {
		const parser = new DiceParser();
		try {
			return parser.parse(expression);
		} catch (error) {
			return `Error: ${error.message}`;
		}
	}

	// Main function with custom prompt
	async function main() {

	// Test examples
	const examplez = `1d2,\n3d4 + 3,\n1d12 + 1d10 + 5,\n3d4+3d4-(3d4 * 1d4) - 2^1d7`;

	  // Prompt user with pre-filled inputs
	  const result = await app.prompt("Add / Modify the Formulas that you want to run the Dice for.", {
		inputs: [
		  { label: "Single Dice Formula", type: "string", value: `1d2` },
		  { label: "Multiple Dice Formulas", type: "text", value: `${examplez}` },
		],
	  });

      console.log("result",result);

	  if (result) {
		const [singleDice, multipleDice] = result;
		// const multipleDicez = [Array.from(multipleDice)];

	  let finalResult = ``;
	  // await app.setSetting("Previous_Roll_ADV1", singleDice);
	  // await app.setSetting("Previous_Roll_ADV2", multipleDice);

		if (singleDice) {
				finalResult += `<mark>-- **Expression:** ${singleDice} --</mark>\n`;
				finalResult += `**Result:** ${evaluateDiceExpression(singleDice)}\n`;
				console.log(`Expression: ${singleDice}`);
				console.log(`Result: ${evaluateDiceExpression(singleDice)}`);
				console.log('---');			
		}
		
		if (multipleDice) {
			// Split by newlines and commas, then clean up each expression
			const multipleDicez = multipleDice
				.split(/[\n,]/)                // Split on newlines or commas
				.map(dice => dice.trim())      // Remove whitespace
				.filter(dice => dice !== '');  // Remove empty entries

			for (let i = 0; i < multipleDicez.length; i++) {
				const dice = multipleDicez[i];
				finalResult += `<mark>-- **Expression:** ${dice} --</mark>\n`;
				finalResult += `**Result:** ${evaluateDiceExpression(dice)}\n`;
				console.log(`Expression: ${dice}`);
				console.log(`Result: ${evaluateDiceExpression(dice)}`);
				console.log('---');
			}		
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

	const finalResultz = `[Report][^ADV]
[^ADV]: []()${finalResult}
`;

	  (async () => {
		try {
		  const auditReport = `- <mark>Advanced:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; <mark>**Dice rolled Report:**</mark> ${finalResultz}`;
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
"8 Ball": async function (app) {

  // Prompt user with pre-filled inputs
  const result = await app.prompt("Shake the 8 Ball!", {
	inputs: [
	  { label: "Ask a Question", placeholder: ">>> Keep questions simple and direct, focus on a single issue, and use yes/no or should I/should I not formats. Eg: Will I find love this year? / Will I win the lottery? / Will it rain tomorrow?", type: "text" }
	],
  });
  
  let answer;

  if (result) {

	function magic8Ball() {
	  const answers = [
		"It is certain.",
		"It is decidedly so.",
		"Without a doubt.",
		"Yes - definitely.",
		"You may rely on it.",
		"As I see it, yes.",
		"Most likely.",
		"Outlook good.",
		"Yes.",
		"Signs point to yes.",
		"Reply hazy, try again.",
		"Ask again later.",
		"Better not tell you now.",
		"Cannot predict now.",
		"Concentrate and ask again.",
		"Don't count on it.",
		"My reply is no.",
		"My sources say no.",
		"Outlook not so good.",
		"Very doubtful."
	  ];

	  // More complex random index calculation
	  const seed = Date.now(); // Use current timestamp as seed
	  const random = Math.sin(seed) * 10000; // Generate a pseudo-random number
	  const normalized = random - Math.floor(random); // Normalize to [0, 1)
	  const randomIndex = Math.floor(normalized * answers.length); 

	  answer = answers[randomIndex];
	  console.log(answer);
	}

	magic8Ball();

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
	  const auditReport = `- <mark>8 Ball:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Question: ${result}**; <mark>**Answer:** ${answer}</mark>`;
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
	  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
	} catch (error) {
	  console.error(error.message);
	}
  })();

  }

},
/* ----------------------------------- */
"Ask Sai Baba": async function (app) {

  // Prompt user with pre-filled inputs
  const result = await app.prompt("Ask Sai Baba. Think deeply about the problem you wish to solve and sincerely seek Sai Baba's guidance. Ask him to suggest a single number between 1 and 720 as an answer. A number will intuitively come to your mind. Type this number into the provided answer box. This number you have intuitively chosen represents Shirdi Sai Baba's answer to your query. Ensure the number you enter falls within the range of 1 to 720. The corresponding answer from Sai Baba will be offering clear and concise guidance.", {
	inputs: [
	  { label: "Ask Sai Baba a question.", placeholder: ">>> Keep questions simple, if you want to keep it in your mind, you can type something which you only can connect back too.", type: "text" },
	  { label: "Enter a Number.", placeholder: "Number between 1-720", type: "string" },
	  { label: "Random.", type: "checkbox", value: false }
	],
  });
  
  let answer;

  if (result) {

	function showAnswer(inputNumber) {
	const answers = 
[ "Auspicious function will take place. Sorrows will vanish. Desired work will be completed","You will pass the examination. You will succeed by getting help from the southern direction","You will be happy in life by blessings of parents","Vices will be covered. Virtues will be valued. You may worship of lord Shiva, lord Dattatreya","Remember sri Sainath, you will be free from obstacles. Chant the words ?Sai Samarth? which will benefit within 21 days. You may see Lord Shiva in your Dream.","You will meet someone. You will get back the thing lost. You will have chance to travel.","Remember your favorite God. Due to it calamity will disappear. Start new work without thinking any benefit.","Resort to legal action and get victory over enemy. If you have faith in Sri SaiBaba you will get immediate experience. You will be profited by distribution of wheat flour.","People will discuss about you. You will have to take little effort and your sorrow will end with the blessings of Sri Sai.","Slowly your sorrows will end. You will be freed from difficulties and diseases.","After surrendering to Sri Sainath immediately, you will acquire pleasure. You will have pleasure of work fulfillment. You will pass the exam. You will get a job.","Your subconscious mind cannot be understood, be determined. Try yourself and you will get success.","You will achieve great things. An old thing will be more useful.","Be careful in day-to-day affairs. You will secure success. Friend?s advice will be profitable.","You will have collection of things. You will get a new thing. You will gain by donations. You will receive important letters from close people.","Do not try on your own. With co-operation of others work will be completed. You will get fame.","Take care of your documents. You will gain thereby. You will get assistance from friends. By giving importance to others. You will have big achievements and chance of traveling.","Dispute will take place. Devotion to Lord Dattatreya done earlier will be helpful.","You may fall sick. Meditate. There is chance of a naming ceremony taking place in the house.","You may visit religious places with friends. You will get mental peace.","Your work will done with the help of people of other religion. Act according to prior intimation. Work will be completed.","You will visit holy places. Auspicious things will take place. You will gain.","Avoid controversy. Surrender to Preceptor (Guru)","Disputes will be settled. You will get back your former glory, rights","New plans will be drawn. You will gain fame. Mistake will be realized. You will learn new things. You will succeed.","Remain calm. That is beneficial. Sorrow will end.","You will succeed beyond imagination. Remember sri Sai. You will get fame, you will be free from worries.","You will get help from friends. Will recover from disease. Share the work and you will succeed.","You will opt for writing. Success in work. Will receive help from many persons.","You will secure success and be free from worries through the blessings of sri Sai. You will recover from diseases.","You will take interest in the material life. You will realize God in saintly persons. Remember sri Sainath it will bring happiness. You will achieve success.","A child will be born. Worries in life will disappear. Additional work will bring wealth. You will get blessings of Sri Sai.","Be away from bad company. You interest in material life will end. Avoid controversy. You will achieve success.","If you surrender to sri SaiBaba all worries will vanish and you will achieve success in no time.","Be humble otherwise nobody will be with you. Control yourself. Avoid physical fighting.","Be quiet. Remember Sri Sainath. Enemies will be discourages.","Do no differentiate. You will not gain through bad intentions. Remember sri Sai and start working. Success is yours.","You will get a job for survival. Finally you will be happy.","You will succeed in job. You will experience the greatness of sri Sainath?s blessings","You will succeed if you remember Sri Sai. Your worries will end. You will hear good news.","Tensions will start one after another. Though it is a bad period, you will meet a saintly person very soon and you will succeed.","Reading and writing of religious books will be done. Religious activity will take place and auspicious things will happen.","You will visit religious places Shirdi and meet a holy person. You will succeed very soon.","Sri SaiBaba knows everything. Hence surrender to him then he will relive you from worries and bring success. The desired things will happen in the morning and afternoon.","Very soon you will get a chance to visit Shirdi and have darshan of Sri SaiBaba. You will get success.","You will gain within seven days. Meditate. You will have darshan of Lord Pandurang of Pandharapur; believe that sri SaiBaba is there. Experience it.","You will have darshan of your desired God. You will get idol or photo of God. Worship it. You will get mental peace, wealth and happiness.","The religious activity carried on by ancestors is stopped. Start it again. Very soon auspicious function will take place. You will get success. Remember sri SaiBaba.","Do not differentiate. You will get something. You will succeed.","You will gain through a youngster. New introduction will take place. You will see that you will gain on Sunday coming after the day of the question.","You will have sudden gain of a thing which was missing for many days. You will experience the same on Sunday. Visit Khandoba temple. You will gain from trees and land.","Remember Sri Sai on Thursday and Friday. You will gain thereby. New land deals will take place. People will be happy.","Very soon there is Gurupushyamrut Yoga. (The day when Jupiter is entering the Pushya Nakshatra). On that day important work will be done. You will be happy and free from worries by November, December. New projects will be undertaken.","Expenditure will increase but on the birthday of Lord Rama (ninth day of Chaitra - Month) work will be completed. You will succeed, get money and fame.","The work which is pending for the last two months will be completed. You will get back the ?Lost Thing?. Auspicious function will take place. You will meet a saint. Remember Sri SaiBaba.","Do not increase complication by raising new queries. You will gain through a friend. Very soon auspicious function will take place. Do not be impatient. Marriage will be arranged among relatives.","Benefits will start from Sunday. People will come from outstation and will convey good news. Felicitate them. People will recognize your good deeds and you will get fame.","You will gain from Land/ Water. You have the blessings of Sri Akkalkot Swami also. You will succeed. Remember Sri Sai.","The work held-up for 3 years will soon be completed. After completion of auspicious function new work will start. You are planning to travel. You will gain. There will be great profit in the month of Shravana. (August)","Avoid physical fighting. You will get success at a distance of a mile from your residence. Remember Sri Sai. You will gain if you take little physical effort.","You will be benefited through your brother. Work pending for a long time will be completed. Auspicious function will take place. There is chance of birth of a baby boy.","Old things will be repaired. New projects will be undertaken. You will take interest in dance and music. On the day of Diwali there will be a big gain.","Running projects will be stopped. Do not get disturbed due to it. Remember Sri SaiBaba. Very soon you will get success and get rid of sorrows","There will be allegations. Conquer minds of others with soft speech. Remember Sri SaiBaba sorrows will disappear and you will succeed. You may stay near you village/ city.","Illusions will disappear. You will realize the truth and will be happy. Do not get angry. Act with self-control. New things will be obtained.","Talent will not be sufficient to complete the task. Worship of lord Hanuman will be helpful. You will be successful through constant work. Studies will progress well.","Do your work without expectations. Remember Sri SaiBaba then see what happens. You will be happy. You will develop interest in exercise ? Yoga.","Remember your preceptor (Guru) and be quiet. You will soon get success beyond imagination.","Work connected with documents will be delayed. Find out solution yourself ascertaining difficulties. Success is yours. Remember Sri SaiBaba","You will get enough food-clothing-Money. Sri SaiBaba cares for your sustenance. Always remember God.","You will get company of good people. On the birthday of Lord Rama, your work will be completed. Land deal will be completed. Auspicious function","Two new things will bring you happiness. Around the occasion of birth day of Lord Rama (March-April) you will get rid of many difficulties and get success. Religious function will take place.","You will get the solution on the next day of asking question. There will be no cause for fear. The day of honour is close. You will get success, fame and honour.","Dispute will arise due to a small error. Urge for blessings of Sri SaiBaba. On the next day of the birth day of Lord Rama, work will be completed.","On Ekadashi (11th day from New Moon Day) of Ashadh (July - August) and on the birthday of Lord Rama work will done. You will get ample money on completion of Government Work. You will stay at places like Pune, Mumbai. You will have a chance of visiting Shirdi.","You will meet people, receive important letters. You will gain on the birthday of Lord Rama and will get ample money fame.","You will get delicious meal. Work pending for long will be completed. You have to complete your work in a day. Period is short. You will occupy a new house.","There will be obstruction in work. Do not worry. You will get monetary help. Remember Sri SaiBaba.","You will get honour on completion of work. Work will be completed unexpectedly. You will succeed. Remember Sri SaiBaba","You will celebrate happy occasion. Disputes will be settled.","Disputes will be settled. Collection of thing will take place.","All will gain equally.","You will recover from disease. If you are worshipping Shani (Saturn), Ganapati, Maruti, continue it. You will get success. You will get money unexpectedly.","You will recover from disease. Continue habit of physical exercise/ Yoga. You will have long life. You will get success.","Social works will be done. You will become healthy. You will get fame. There is fear of injury to hand.","you will be saved from accident. Get letter, be happy.","Efforts will be rewarded. Government work will be done. If you give medicine to a patient you will have ample gain","You will be free from fear. You will recover from disease. Be humble and see what happens.","You will travel. You may visit temple of Lord Pandurang at Pandharapur. You will succeed. Few persons will come together.","You will receive letter. You will celebrate. You will be invited for meals. Apply vibhuti (ashes from holy fire at Shirdi) of Sri SaiBaba to your forehead and see the miracle that takes place.","Religious function will take place. You will remember the past. You will travel towards south. A child will be born.","Meditate. You will recover from disease. There will be progress in the work in few days.","Leave possessiveness. Surrender to Sri SaiBaba then things will take place as desired.","Do tomorrow?s work today. Remember Sri SaiBaba, you will get success.","You will be surprised on happening of an unexpected thing. Remember Sri SaiBaba. Soon you will get wealth.","Plan proper solutions and you will succeed. Chant the name of Lord Rama. You will meet a saint. Auspicious function will take place. Good time is ahead.","Do not discriminate. Donate food. You will gain immediately.","You will get satisfaction. Donate food. If you feed dogs, cats, you will have ample gain. You will experience this shortly","Children will benefit. You will succeed. Remember your mother. If you donate food in her name you will have immediate gain. You will get a chance to serve a saint.","Serving elders will be helpful. People will meet you. You will be famous. You will travel towards South. You will meet a friend. Old memories will revive.","Take advantage of proper opportunity so that your work will be completed. You may travel. Do not start journey in the morning, start after afternoon meals.","You will return from travel. Remember Sri SaiBaba. Every thing will be alright. You will get success.","Remember Sri SaiBaba. Act as per instructions of the elders. There is a chance to travel. You will get success.","You will face difficulties. Remember Sri SaiBaba, due to it trouble will be over. Take a friend with you, do not travel alone.","Bad occasion will be avoided. Remember Sri SaiBaba. Your work will be done through the letter of identification. Act as per advice of elders. Do not be hasty.","Remember Sri SaiBaba. You will be saved from a difficult situation. There is danger of falling sick.","Remember Sri SaiBaba. You will get success on donating food. Difficulties will disappear.","Your work will be completed through the help of five women. Donate food. You will experience that you will get quick success by remembering Sri SaiBaba.","Your mind will be purified by remembering Sri SaiBaba. Baba?s blessings are already with you. Good deeds of your father will help you. You will get success.","You will get the returns of your services. You will gain success. You will travel.","You will be in the company of saintly persons. You will realize your mistakes. You will get happiness from mother. Due to the blessings of Sri SaiBaba there will be happiness everywhere. Donate food.","Sri SaiBaba blessings are already with you. Remember Sri SaiBaba. Letter will come. Give food to the hungry. You will succeed immediately","Love all, forget differences. Keep in mind that every thing is known to SaiBaba. Remember Sri SaiBaba. Success will come automatically to you","Your eyes will be full of tears with love. Keep the feeling in the mind that Sri SaiBaba knows every thing and surrender to him. Then see what happens in 24 hours.","Offer sweets to Sri SaiBaba and apologize for forgetting. Desired objects will be achieved immediately.","Sri SaiBaba expects your devotion, remember him. As soon as you donate food you will get mental peace and your desired work will be completed.","Remember your preceptor (Guru), all things will happen as desired by you. Work will be done sooner by allocation.","You will do such a work that people will be surprised. You will get fame and success.","Keep your mind cool. The circumstances will improve automatically. You will travel. New things will be invented","You will come to know an unknown thing. You will become popular. Follow good path and the success will be yours.","Do not get lost in day dreaming. Follow the path of truth. Don?t lose your self-respect. Surrender to preceptor (Guru). Success will come to you","Meditate Sri SaiBaba thereby on the next day morning you will get the results. Sri SaiBaba knows everything. Hence do not worry.","Be a listener rather than a speaker. There is a chance of visiting Shirdi. There is a chance of getting sweet meals. Time is good.","Do not test saints. Surrender to them. Do not differentiate between male and female. Act as per the dream. Time is good.","Do not be after mantra and tantra. Worship from the bottom of your heart. Sri SaiBaba blessings are with you, do not discriminate. New things will take place. A child will be born.","Serve Guru. Thereby you will be happy in life. Difficulties will vanish and you will succeed.","You will enjoy beautiful things. Be in company of good people. Thereby you will gain.","You will lose interest in material life. Remember Sri SaiBaba. Go near sea shore or river. You will gain thereby.","Your tensions will disappear by remembering you Guru. You will come to know good things early in the morning.","You have good nature hence you will have knowledge of all things. Distribute work properly. Keep one person near you and send the other away","Person asking question should soon offer water. Thereby he will gain. You will celebrate","You will be promoted in your job. If there is a problem of house, you will go to live in new place. Good period","Do not discriminate. If anybody applies Gandha (sandalwood paste) or kumkum (red powder used by Hindus for applying to forehead) to you forehead today or tomorrow, allow him to do so. Immediately your fortunate period will start. You will travel","Keep your mind cool. Situation will calm down on its own. Remember Sri SaiBaba, friends will come from outstation","Wait for few days. Your work will be done with the help of someone else.","Donate. Otherwise you will not find a way. You have not done the religious things planned in the past, perform them at once. Thereby all things will be completed smoothly.","If you consider yourself superior, then you will not succeed. Be humble, you will buy fruits, more than half the work will be over today. Remember Sri SaiBaba. There will be a change in the weather in the evening.","Difficulties will come. Remember Sri SaiBaba. Calamities will go away. Success will be gained.","Baba?s power is all-over. Calamity will vanish. Remember Sri SaiBaba. You will be saved from fire.","Calamities will vanish. Surrender to Sri SaiBaba, you will meet saintly persons. Father and son will come to your home. Desired wish will be fulfilled.","Remember Sri SaiBaba. You will surpass all difficulties. Success is yours","Your work will be done only if you have faith. Do not plan big things otherwise you will be in trouble","Works will lag. Remember Sri SaiBaba then on Gokulashtami (birthday of lord Krishna) your work will be completed. You will meet saints, you will travel","Act as per order. You are needed at your working place start immediately. You will receive a letter. Pray for blessings of SaiBaba otherwise stomachache will not stop.","You will be relieved guilt free in court matters. Do not worry about sickness. You will perform religious function. Remember Sri SaiBaba","Your work will be done after amavasya (new moon day). You will travel. Four days will be required for completion of work. Do not worry.","Miracle will take place in your life through the blessings of Sri SaiBaba. You will get due rewards. If it comes true then consider yourself very lucky and surrender to Sri SaiBaba. Success is there.","You will succeed as a result of sharing. Blessings of Sri SaiBaba are already there.","Do not have any doubt in your mind. Donate in the name of Sri SaiBaba. Thereby the work pending for a long time will be completed.","You will see your favorite God in dream. It will strengthen your belief. Do not differentiate. Your work will be done immediately","Surprising events will take place. You will get mental peace. You will recover from sickness. Land matters will be settled. You will succeed.","Even though you do not believe in God, without miracles; keep faith in Lord Rama, be humble before him. You will meet a saint. You will succeed","Have faith, after many days you will meet the desired person again. After four days from the day of asking question your work will be done. Celebration will go on for 15 days. Do not discriminate","Your old worries will be over. You will recover from disease. Make your mind steady. You will have darshan of Lord Rama.","Chant ?Sai? ?Sai?, sins will vanish an you will celebrate.","You will be very busy with work. You will not get free time. Still remember Sri SaiBaba. And you will get success. Sick person will recover.","You will be happy but sickness is there. Do not forget remembering Sri SaiBaba","If you are tired due to sickness and worries, remembers Sri SaiBaba, you will recover.","You will be free from calamity and disease. Go to Shirdi, you will succeed immediately","Do not worry. You will be free from worries in two days. Donate food.","Feed a black dog then your work will be done immediately. Sign of confirmation is that, you will meet a tailor. You will be free from diseases.","You will be free from disease. You will meet people from Pune (big city). Desired work will be completed.","Days are full of trouble; work will be completed in eight days","You will not be in good health. Work in your house will be completed. Surrounding will not be normal. Remember Sri SaiBaba","The work pending for years will be completed. All will be surprised. Gain of success. Donate food","Apply vibhuti (ashes from holy place in Shirdi) of Baba to your forehead. All calamities will be over. Wish in the mind will be fulfilled. Bad period is still there","You will get a dream. In dream you will see elders, act accordingly.","You will be free from disease. In one month you will be freed from all worries. Surrender to Sri SaiBaba","You will meet relatives. Adopt new habits. A baby will be born in the house. You will be satisfied.","You will prosper. Donate food.","Remember Sri SaiBaba. You will have happy family life as your desire will be fulfilled.","Donate food. Your wish will be fulfilled and you will get happiness. Get rid of idleness and do not be gloomy","Do not consider yourself as different from others. Follow path of truth. You will be happy","You will feel bad due to false charges, still remember Sri SaiBaba. Mind will be disturbed. You will worry about your children","You are worried. If you are worried all the time, surrender to Sri SaiBaba. Donate food. Due to it worry will be removed and you will get a chance of going to Shirdi. Friends will help you.","Donate. Thereby your work will be done immediately","Do not bring doubt in your mind. Donate and your wish will be fulfilled","Tobacco (beedi-cigerette, etc) and oil should be offered as gift for 3 Thursdays then work will be completed","Donate as per your ability and you will see that everything will be alright","Control yourself. Sacrifice for others. You will gain thereby","While asking question check your pocket. Keep 3 rupees and 14 annas, with you and donate the balance money. The desired will happen. Wait for 44 days. Auspicious period.","Wish in the mind will be fulfilled","Things will take place as desired. You will be happy. You will realize that the one whose blessings are with you and Sri SaiBaba are same. You will soon get a confirmation for this.","A boy will be born. Greeting letter or telegram will come. The work is in Mumbai, or a big city nearby, it will be completed","You will experience the miracle of Sri SaiBaba?s blessings. Your desire will be fulfilled","You will have blessings of Guru","You will get all things if you wait with faith","Live a simple life. Worship of Lord Shiva will be useful. Desires will be fulfilled","Give up attraction for costly clothes. Remember Sri SaiBaba. All work at outstation will be completed","You will succeed in Government work. You will be selected from thousands of people. You will succeed. Donate sugar candy","Your work will be done definitely. Daily offer a little quantity of sugar to SaiBaba and donate it after 21 days.","Your desire to follow religious routine will be fulfilled. Gain success. You will get experience of blessings of Sai.","Work will be done with the help from western direction. You will be happy by meeting two persons. You will succeed. Sister will meet","You will experience result of the question shortly. By meeting of two persons work will be completed. Chant name of Lord Krishna. A Gujarathi man will do the work.","Answer to the question is with you. Donate 5 rupees then you will get satisfaction","Sri Sainath will fulfill the desire in your mind and you will be convinced of the same","Surrender. Wishes will be fulfilled","You have everything. Do not ask question unnecessarily. Don?t go after things beyond your capacity, instead surrender to Sri SaiBaba","Don?t hesitate to donate Rupees 5 when you have Rupees 250. Otherwise you will be cheated. Donate and you will get success","There will be big calamity on account of Rupees Five. Remember Sri SaiBaba then you will get success. Do not go at unnecessary things.","Time is tough. Donate. Apologize to Sri SaiBaba then desired thing will be done.","Work will be completed in stages","Give up the feeling that I do everything and you will get success","Act as per orders of preceptor (Guru) then everything will be alright","Surrender completely to your preceptor (Guru) then all things will happen automatically","Love all by keeping mind pure. All things will happen automatically","Act as per advice of proper person","Everything cannot be achieved through bookish knowledge hence obtain the heavenly blessings of the preceptor (Guru)","Fear will vanish. Your work will be done through the help of other person.","Do not think unnecessarily. Surrender to preceptor (Guru) then things will happen","Don?t wander. Present thinking is impracticable. To know reality surrender to preceptor (Guru)","Make your mind steady. Surrender to preceptor (Guru), all things will happen as you wish.","Do not think more. Have faith in preceptor (Guru). Everything will be alright","Do not resort to wrong path for getting money. Pray to God with pure mind then success will be achieved.","Speak what is liked by others. Eat what is digestible. Do not believe in two things. Only one thing will happen","Give up wrong path. Work will be done with the help of five persons. A boy will be born. Learn to differentiate between real and artificial.","Understand that nobody is fully happy in life. Be humble to Sri SaiBaba. Everything will be achieved.","Do not worry. Pray to Sri SaiBaba. All things will happen automatically","Differences are only personal. Remove them. Give up ego. Surrender to Sri SaiBaba, everything will be alright","Give up ego. You will pass the examination. Be humble to preceptor (Guru)","You will gain as per your capacity. Learn to behave in accordance with your age","Work will be done with the help of other person. You will be freed from sorrow. Pray to Sri SaiBaba","Impossible thing will be possible with blessings of preceptor (Guru)","Work will be done through blessings of preceptor (Guru). Dream will guide you. You will recover from sickness","Loss will be recovered. You will travel. Meet saints. You will gain.","Remember your preceptor (Guru). You will get success in seven days.","?Mind thinks what even an enemy will not think?. The work pending for years will be done after seven days. Be humble to Sri SaiBaba","Your problem will be solved. Donate Rupees Fifteen and you will experience result immediately","Continue reading religious books. You will gain within 110 days. Be humble to Sri SaiBaba","Go where the reading of religious books is done. You will get satisfactory answer","Spend Rupees fifteen in the name of SaiBaba. A person already started with the message that your work is done.","Work will be done with the help of somebody else. Your education is of no use here. Be humble to Sri SaiBaba","Don?t stick to your desire. Remember Sri SaiBaba. Your work will be done","Give up desire bubbling in your mind for the last three days for getting the work done and be humble to Sri SaiBaba. Things will be alright then","Surrender to God. Then things will happen as desired","The work will be completed by two persons coming together","Give up pride then you will get success","Do not stick to your wishes. You will get success","Donate money. Work pending for many days will be completed","Have faith and wait. You will get sufficient money, food and clothing","Donate food in the name of Sri SaiBaba. Have faith everything will be alright","Work will be done through the help of another person. Auspicious function will soon take place. Desire will be fulfilled","Auspicious function will take place. Work will be completed at an unusual event","Donate sugar candy in the name of Sri SaiBaba. Then immediately the desired thing will happen","Be calm. Remember Sri SaiBaba. Things will be alright","Do not say that everything belongs to me. Be humble to Sri Sai. You will get help from person who are not connected or related to you.","Do not discriminate. Remember Sri SaiBaba. Wish in your mind will be fulfilled","Continue chanting. Work will be done on Thursday. You will meet saints","Sri SaiBaba knows things in your mind. You will get this confirmation. Do not worry. Chant the name of Rama","Ignore bad things and look for good qualities. Chant the name of Rama. Remember Sri SaiBaba, and then things will happen as desired","Don?t speak badly about others then disease of stomach will stop. Works will be done after few days.","Do not waste time in finding fault with others. Surrender to Sri SaiBaba the work will be done. Keep in mind that sugar is always sweet","Do religious things according to your wish. It will reach SaiBaba. You will get guidance in your dream. Sri SaiBaba?s blessings are with you","Have faith and wait, and then work will done. You will recover from sickness. Don?t resort to wrong ways.","Don?t get any work done free of cost from anybody. You owe two rupees. Donate them and then your doubt will be cleared.","Remember Sri SaiBaba, and then every thing will be alright","Apply vibhuti (ashes of holy fire in Shirdi) to your forehead. Everything will be alright","Important pending work will be completed through an ordinary man. Do not worry. You will travel","You will travel. You will meet a saint. Very soon your problem will be solved","Work pending for many days will be easily done through ordinary persons. You will travel","Do not consider anybody inferior. Work will be done completely through an ordinary person","An ordinary person will answer your question and you will be surprised. Doubt will be cleared","Donate an orange coloured saree to a poor woman, and then your desire will be fulfilled","Desire will be fulfilled through God?s blessings. Doubt will be cleared. Donate cloth","Work will be completed unexpectedly. Don?t have discriminatory thoughts","Sri SaiBaba is present everywhere and you will realize the same. Do not worry. Have faith, and then you will succeed","Day will dawn, ending the night. Have faith in Sri SaiBaba. Donate. Very soon work will be completed. You will get satisfaction","Though the present time is bad, very soon you will meet a saint and all worries will vanish. Have faith","A lot of money will be spent. Honour and fame will be gained. You will be exhausted due to responsibility. Have faith in Sri SaiBaba","You will meet a guide. Go from south to north. Good days will come. You will meet a saint","Do not reject anything because it is small. Accept it; you will be guided by somebody. Desired thing in the mind will be fulfilled. Worry will end","You will travel. Don?t worry though you have to take physical efforts. Work as desired will be done. You will see that things happened are repeating again","Fortune is good. Work will be done by meeting persons.","Problem in the mind will be solved by a person close to you, and then you will get mental peace","Donate, and then desired work will be done.","Don?t speak badly about others, and then you will get success","Have faith in Sri SaiBaba... calamity will be resolved","Remember Sri SaiBaba, the darkness will vanish. You will get success.","Keep faith. Work will be done during the period from the day after new moon day to full-moon day. Things never happened in the past will happen","Meet Sri SaiBaba. Then your work will be completed. Give up pride","Go to Shirdi. Visit Dwarkamai. All worries will end there and success will be achieved.","You will get help from a friend and work will be completed. Blessings of Sri SaiBaba are also there.","Do not bring any doubt in your mind. Otherwise you will suffer a loss. Keep faith in Sri SaiBaba. Take a friend along with you then everything will be done","Due to a friend you will be freed from calamity. Keep faith in Sri SaiBaba","You will be free from calamity. You ill get co-operation from many. You will be convinced of the unfathomable miracle of Sri SaiBaba","Calamity will be cleared automatically. You will get success in work","Remember Sri SaiBaba then you will recover from disease, get success. You will feel that these calamities have come due to forgetting Sri SaiBaba","Work as desired will be done after nine months. Remember Sri SaiBaba","Calamity has come on you without your fault. It is known to Sri SaiBaba, surrender to him then it will end.","Calamity which has come without your fault will end. Remember Sri SaiBaba","You will be free from calamity. SaiBaba knows everything","Vicious/ wicked people are around you. Talk nicely with them but keep yourself away from them","Thing which not happened for a long time will take place. Read Ramayana","Do not doubt. Read Ramayana. With other person?s help your calamity will be removed and success in work will be gained","Arguments will increase controversy. Keep faith, calamity which has come will go away","Give up arguments. Keep faith and wait. Very soon good day will come. God has control of good and bad","Believe in Sri SaiBaba. You will be free from calamity. Untimely death will be avoided","Give up egoism. Surrender to God then everything will be alright.","Do what you are capable of. Do not test others otherwise you will be deceived. Surrender to Sri SaiBaba without doubting then all work will be done right","Do not be trapped in the false ideas of happiness. Find the way out. Remember Sri SaiBaba, and then you will get true happiness","Do not be afraid of calamity and sickness. Go to Lord Shiva?s temple and pray. Then you will feel alright","There is a danger of untimely death. Let one night pass. Do not sleep at night. Remain awake, then you will be free from calamity and get success","Calamities will come from all directions. Do not worry. Remember Sri SaiBaba","Do not worry. Though you have trespassed the law a little, still Baba is with you. You will get success in work.","Do only whatever is possible. Be satisfied. Have faith that God is with you","Surrender to Sri SaiBaba knowing that you are in a difficult situation. Your status in society will land you in trouble","Do not get angry while taking meals. Work will be done through the guidance of a person coming to your house. Donate food of Rs.50/- then you will succeed in all matters","Act as per orders of the preceptor (Guru). This is a testing time. You will be saved from a very difficult situation","Obey order of the preceptor (Guru). Time is difficult. Keep faith in Sri SaiBaba. You will be free from calamity","Time is bad. Remember Sri SaiBaba. Then you will come out successfully from difficult situations.","Death will be avoided. Remember Sri SaiBaba","Observe the order of preceptor (Guru). Remember Sri SaiBaba, you will get success","The miracles of Sri SaiBaba are unfathomable. You will be convinced about it","Do your work presuming that Sri SaiBaba knows everything","An incident will happen on Sunday afternoon. Even if you hide anything it will be disclosed. You will get success by remembering Sri SaiBaba","Take your share after proportionate distribution otherwise people will laugh at you","Surrender in full to God. Then everything will be alright","Give up discrimination. If you devote with pure mind, things will happen as you desire","You alone can?t complete the work. Take the help of two persons. Treat all equally then you will get success.","Give up bluffing and misbehavior. Devote to Lord Krishna. Donate food. Then all things will happen automatically. Gain will be through a woman","Presume that you are in company of hot tempered persons. Behave truthfully. Remember Sri SaiBaba, and then you will get success","Your service is great. But people take it in a wrong way","Act with love instead of anger. Sri SaiBaba is with you. Soon you will get success","Trouble will be unbearable. You will be free from calamity to the extent you love Sri SaiBaba","Worries will end","There are blessings of God. Remember Sri SaiBaba. You will get success","Your work will be completed on the birthday of Lord Rama (the month of April). The thing which you have waited for years will now happen","You will get a letter from a friend. Remember Sri SaiBaba. Keep away from gambling business. Take a decision tomorrow after 6 p.m","There is a difference between what we see and what we hear. Act watchfully. Keep away from gambling business. Do not trust any letter. Accept the situation as it is","As mother knows what is good and bad so does Sri SaiBaba. Be satisfied with whatever you have. Otherwise you will suffer loss","Baba does not want anything from you except devotion. Do not be deceived by false news. You will gain through liquid things","You will be saved from loss. Remember Sri SaiBaba. Gift will come from southern direction. You will hear good news. Donate food.","Everybody will get what he possesses. If anybody else tries to grab it, he will die. You will be happy. Very soon a child will be born","You have to do your duty. Friends and relatives will not help you. Blessings of Sri SaiBaba are with you. Do not worry","Give up fickle mindedness and go for darshan of Sri SaiBaba. Everything will be alright. Two persons will come to meet you. You will recover from sickness","Ignorance will vanish. Act thoughtfully. You will come to know about your profit and loss. Remember Sri SaiBaba","Presume that everything happens only through the blessings of God","Work with firm determination. Then you will succeed. Remember Sri SaiBaba","You will travel. Act as per advice of a friend. Don?t go ahead with a prejudiced mind, otherwise you will suffer. See what happens at 11?O clock tomorrow. Remember Sri SaiBaba","You will be saved from calamity. Don?t leave your place. Your welfare is in the hands of Sri SaiBaba","Have patience. You will get success after overcoming calamity","Do not bring doubts into your mind. You will gain three things through the blessings of Sri SaiBaba","Keep in mind your mother?s advice. You will get benefit from two things of your father.","You will gain in future by recollecting old things. Remember Sri SaiBaba","Do not get tired of problems. Keep faith in Sri SaiBaba. You will find a way. Read the Pothi of Akkalkot (A biography of Akkalkot Swami) or any other biography of saints","Presume that your present suffering is due to your past deeds. Do not get tired of problems. Remember Sri SaiBaba and you will succeed","Your ancestors used to worship Akkalkot Swami. Follow that path and you will get happiness and success. Sri SaiBaba?s blessings are there. Worship whom your ancestors worshiped","Sri SaiBaba?s blessings are there. Work will be done as desired. Surrender to you preceptor (Guru)","People will come from outstation. Due to that your work will be done. Unforeseen events will happen suddenly","You will get returns as per your right, position, service, love and devotion. Make proper choice of things","Owner will get his thing. Knowledge will be useful","Work will be done by a group of persons coming together. Remember Sri SaiBaba regularly and you will get every thing","Work will be over shortly. Recite Vishnu Sahasra Nama (1000 names of Lord Vishnu)","Chant the name of Shree Sai. On chanting 1200 times you will get good experience. Desired things will happen","Good deeds of forefathers will be useful","Pray to Sri SaiBaba to avoid an event which leads to quarrel. Then everything will be alright","Quarrel will be solved. If you keep your mind cool you will be benefited ten times","Work will be done with the help of two educated persons. You will get profits beyond expectations","Male/ female will be benefited by company of saint for four months and seven months respectively. Your humbleness is appreciable","You have support of past good deeds. Only donate food. Then everything will happen as desired","Your fate is great. Remember Sri SaiBaba. People will be surprised","If you say that things are happening through the blessings of Sri SaiBaba, you will succeed in your work. If you say I do it, then you fail","Surrender to Sri SaiBaba. You will observe that day-by-day new miracles happen. Expectations will be fulfilled","Give up thoughts of past and future. (Think of present only)","You will see Shree Sainath in your dream. Donate food. Give up drinking liquor and all your work will be done.","Your good fortune is near. Go to Shirdi. Work will be done before Christmas","What you have seen in dream will come true. Have patience for 2/ 3 months. God likes your devotion only. Watch carefully what happens at 9 pm","You will travel. Work will be done with the help of friend. Success will be achieved. Do not ask doubt. You have forgotten the things you were to offer to God","Sri SaiBaba will help you even when you do not expect it. Be humble to Sri SaiBaba. Thing will happen as desired.","Think of yourself and see with our eyes how unfathomable the blessings of Sri SaiBaba are! Your wish will be fulfilled. But is it not true that you are suspicious?","Do not have doubts. Offer little sheera (made of rava and sugar) to Sri SaiBaba. And your work will be done.","Your work will done through friends. Go to Shirdi and have darshan of SaiBaba","Don?t be hasty. Things will happen as desired. Donate Khichadi (made of boiled rice and dhal) to poor people in the name Sri SaiBaba","Donate Khichadi (made of boiled rice and dhal) and your work will be done immediately. After meeting a Gujarathi person. Problems will be solved","Do not discriminate. You will be in trouble. Remember Sri SaiBaba","Offer belpatra (leaves of sacred tree like by Lord Shiva) to Lord Shiva instead of Sri SaiBaba and work will be done as desired. Troubles will disappear","Worship Lord Khandoba and everything will be alright. Offer water to Sri SaiBaba. Work will be done on the day of Makara Sankranthi (14th January)","Offer water to Sri SaiBaba on the day of Makara Sankranthi (14th January) and work will done as desired","Worship the photo of Sri SaiBaba. Work as desired will happen","Work will be done by people coming from outstation. Worship Lord Shiva. It will reach Sri SaiBaba","Soon you will receive a letter and your work will be done. Worship Lord Ganapati and Lord Shiva. Remember Sri SaiBaba","Dreams will come true","You will be famous. People from outstation will come to see you. Donate and your work will be done","Work will be completed through a young girl. When the girl?s desire is fulfilled. Your desire will also be fulfilled. Everybody wants money","Pray to Lord Ram. Give up lust for Money. You will be benefited to the extent of your Love","See Sri SaiBaba in the form of Shree Ram. You will be happy. Do not pay attention to what people discuss","Remember Sri SaiBaba then you will be free from all troubles. Whatever is happening is only because of your past deeds.","Do not have prejudiced mind. Remember Sri SaiBaba. Give up all discrimination then every thing will be alright. Discrimination is the main cause of your problem","Distribute barfi (a sweet) worth rupees two in the name of Sri SaiBaba. Then you will be benefited a lot. All worries will be over. You will recover from diseases","Wishes will be fulfilled.","Do not worry thinking that future is not good. Sri SaiBaba?s blessings are with you. Success will be gained","Friend will come with good news. You will be free from worries.","You will be free from monetary problems. You have support from superiors.","Do not forget Sri SaiBaba, you will get 110 where 100 were expected","Donate food then desired things will happen. You will get a dream. Friend will come to your help","Remember blessings of Baba. Do your work yourself and not through a friend. Baba is observing you","Do not donate with expectations in mind. Donate some money in the name of Baba and see what happens","Don?t do anything with doubt. Expenditure will increase. Remember Sri SaiBaba","Surrender yourself to Sri SaiBaba then all things will happen as desired","Do not indulge in over-analysis and inquisitiveness. Remember Sri SaiBaba humbly then all things will be alright","Keep your mind steady. Worship of Goddess will be useful. Do not take wrong decisions. Ten days will be wasted. Remember Sri SaiBaba. You will get success","Meet Sri SaiBaba at Shirdi. Everything will be alright","Two vows are to be fulfilled by you. By fulfilling it. Goddess at Shree Sainath will be pleased","Visit temple of a Goddess. Person coming from a long distance will complete your work","Work pending for long time will be completed. Remember Sri SaiBaba. There will be happiness everywhere.","Sri SaiBaba is remembering you. Go to Shirdi. There will be happiness everywhere","Go to Shirdi and see Sri SaiBaba. Your wish will be fulfilled","Work will be completed as desired. Remember Sri SaiBaba","Baba cares for everyone. You only chant his name.","Do not ask something when you are thinking something else. Sri SaiBaba wants your total devotion","Baba knows very well what is in your mind and what you are pretending. Be humble to Sri SaiBaba and everything will be alright","Remember Sri SaiBaba for three weeks, and then all things will happen as desired","Follow the law. Whatever happens is for good","You will get a chance to travel. Though you are fed up of material life Baba has something else in his mind.","Baba?s blessings are with you. You will get a chance to travel","Work will be done after meeting an unknown person. You will be surprised","Works will be done unexpectedly. You will travel","Work will be done by a third person. Wait for seven days","Remember Sri SaiBaba. Life will be meaningful. This will happen due to your good deeds in previous life","Presume that whatever is happening is due to blessings of Sri SaiBaba and wait","Presume that whatever is happening is because of debt incurred by you in the past life and do not regret","Doubts will be cleared. Remember Sri SaiBaba for three days","Remember Sri SaiBaba everything will be alright","People will express different opinions. You remember Sri SaiBaba and act","See guidance of proper persons. . Do not run around unnecessarily. Faith will be more useful than bookish knowledge","Poor will be more helpful than rich. Wish will fulfilled. Remember Sri SaiBaba","Do not worry for petty troubles. Shree Sainath?s blessings are with you. You will get something unique","Do not follow bad people. Remember Sri SaiBaba. You will find path. Wish will be fulfilled","Surrender to Sri SaiBaba forgetting your pride. Four persons will help you","Many people will come to meet you. Desire in mind will be fulfilled","Donate food. Give up obstinacy. Sri SaiBaba knows everything. Things will be alright at the proper time","Donate food. Your work will be done on the occasion of ?Ram Navami? (in the month of April). Know that God is everywhere","You will double returns compared to others. You will have cloth and money. Keep in mind that whatever is given by god is inexhaustible","Keep it in mind that one is rewarded as per his deeds in life","You will have company of saint. Work will be completed","Help the needy and poor then your work will be done. Pay for the work done for you","Keep faith in Baba. If you get vibhuti (ashes of holy fire in Shirdi) of Baba apply it. You will never short of anything in life.","Apply vibhuti (ashes of holy fire in Shirdi) of Baba to your forehead and all work will happen as desired.","Have faith in Baba. You will get great experience from small things. Blessings of Sri SaiBaba are there","Apply vibhuti (ashes of holy fire in Shirdi) of Baba to your forehead then desired things will happen","Sri Sainath knows your difficulty. Work will be completed by a Person coming from outstation. Be humble to Sri SaiBaba","Work will be completed by a person coming from outstation. Do not worry","Everything will be alright. You will travel. Anxiety, worry will be over","Donate 100 Rupees. Do not worry. Within 18 hours your work will be done. You will get help from somebody. Give up Discrimination","Recite prayer (arti) of Sri SaiBaba. You will be free from worry after a person from outstation arrives. There will be happiness everywhere","Work will start tomorrow. It will be completed in 8 days","Wisdom will come through experience. You will experience the effect of the blessings of Shree SaiBaba.","Work which you have in mind since last four year will be completed. Things will happen as desired. Blessings of Sri SaiBaba will be there.","See what happens in your house after two days. Worship photo of Sri SaiBaba","Donate food. In the memory of Sri SaiBaba. Offer one rupee to a Fakir (Muslim Saint) then thing will happen as desired. What are you searching for? Sri SaiBaba is with you","Remembering Sri SaiBaba, donate Rupees Ten. Things will happen as desired. Your friend will help you.","Your work will done on Guru Purnima day (full moon day dedicated to guru in the month of July) give up the thought of curtailing your expenditure. Anticipated expenditure will be incurred anyway. Donate remembering Sri SaiBaba","Blessings of Sri SaiBaba are with you. Donate. You will be free from debt.","You want the thing to happen but are unwilling to donate. Donate remembering Sri SaiBaba then you will benefit ten times.","Apply vibhuti (ashes of holy fire in Shirdi) to forehead. Keep faith in Sri SaiBaba then all will happen as desired","Do not discriminate. Guests will come. All problems will be solved","Many attempts have been made yet there is not success. Therefore, go to Shirdi and see Sri SaiBaba then every thing will be alright","Apply vibhuti (ashes of holy fire in Shirdi) remembering Sri SaiBaba. Work will be done in eight days. Sri SaiBaba knows your situation","Remember Sri SaiBaba. Your work will be done. Relatives and friends will enquire about you.","You do not have faith in Sri SaiBaba. See what will happen keeping faith. All your work will be done. You will be promoted","Are you tired of life? You have suffered a lot. Now remember Sri SaiBaba and everything will be alright","Remember Sri SaiBaba. After ten days you will be free from worry and gain success","Somebody will do something accidentally and you will be free from worry. Remember Sri SaiBaba","You will not know the effects of Sri SaiBaba?s blessings. Your work will be done through ordinary person.","Work will be done after ten days. You will meet seven persons. You will be free from disease","Tell your worries to Sri SaiBaba from the bottom of your heart. Do not worry. Apply vibhuti to your forehead. You will be free from worries tomorrow morning.","Everything will be alright due to blessings of Shree Sai.","Remember Shree Sai, giving up your pride. You will succeed and be freed from worry.","Remember Shree Sai and change will take place. You will be free from worry","Go to Shirdi or at least remember Sri SaiBaba. Apply vibhuti (ashes of holy fire in Shirdi) to your forehead. You will be free from calamity.","Due to over analytical thinking you have no faith in religious things. But believe in Sri SaiBaba and see what happens.","There is no vice like pride. Remember Sri SaiBaba give up pride and see what happens.","Enemies will surrender. Unusual things will happen easily. Only have firm faith in Sri SaiBaba","You will not get results by imposing conditions and being inquisitive. You will have to give them up. Work will be completed with the help of a friend on Sunday and you will be happy.","Clouds of calamities will disappear. Donate Rupees 17 in the name of Sri SaiBaba and see the miracle that takes place. A friend will assist you.","You will be saved from death. Accept this as the blessings of Sri SaiBaba. Donate food. See the miracles that are taking place at home.","Baba wants your love and not your wealth. Your work will be done through two friends.","Offer grapes to Sri SaiBaba. Then your desires will be fulfilled. Friends are very much inquisitive but they will calm down.","Wish will be fulfilled. You will be convinced by holiness of Sri SaiBaba","Control your mind which is wandering. Remember Sri SaiBaba. Then everything will be alright","Donate Rupees 1500 in the name of Sri SaiBaba. Shree Sai does not take anything free; you will be profited ten times.","Cleverness will not be of any use. Surrender to Sri SaiBaba. Things will happen as desired. Baba is there to give you ten fold.","All is happening only due to the blessings of Sri SaiBaba. Remember Shree Sai then desired thing will happen","Offer garland of flowers to Baba on Thursday, your worry of lost time will be removed. Keep vibhuti (ashes of holy fire in Shirdi) beneath the pillow while sleeping and use","Donate onion and home made flat bread (Roti) in the name of Baba. Visit temple of Lord Gopal Krishna then all things will happen as desired.","Keep faith in Shree SaiBaba, your reputation will be guarded. Do not worry.","Donate milk in the name of Sri SaiBaba. You will come out safely from worries. Success will be gained.","Worries will be over. You are feeling uncomfortable for no reason. Remember Sri SaiBaba. Shree Sai is with you.","Do not indulge in useless guesswork and analysis. Have faith in Shree SaiBaba and your work will be done.","Work will be completed by happening of a miraculous event. You require only the blessings of Sri SaiBaba and you will get it.","Do not have doubts in your mind. Donate Rupees 1500 in the name of Sri SaiBaba. Success will be gained. You will suffer loss if you donate with doubt in the mind","Sri SaiBaba has given you ample. But you have forgotten him. Donate Rupees 1500 immediately and then see.","You will find the way after 15 days. Till then be away from your favourite thing (article)","Donate Rupees 1500 then everything will be alright.","Things cannot be done through money alone. Love is required. Remember Sri SaiBaba","Your work will be done through meeting somebody. You will be free from worry.","Sri SaiBaba has formally done your work but you have forgotten, hence you are facing difficulties. Still you will get success through friend?s help. Remember Sri SaiBaba","Shree SaiBaba is every where. Only you have to recognize him. Work will be done by the help of somebody","Work pending for many years will be completed. Go to Shirdi have Darshan of Sri SaiBaba","Shree SaiBaba belongs to all. Then how do you ask for success to yourself alone? Offer coconut and scented stick (agarbatti) to him. Sri SaiBaba will fulfill your wish","Offer a coconut to Baba from the bottom of your heart. Your work pending for a long time will be done immediately. A friend will help you","Offer a coconut to Baba. Work will be done in one year from today. Donate Rupees 500 after completion of work.","Remember Sri SaiBaba. Success will be gained and you will celebrate","Remember Sri SaiBaba. You will get results as per your faith.","Heaven and hell are here only. Knowing this behave properly. Do not stop remembering Sri SaiBaba","Give up worry. Remember Sri SaiBaba","Give up pride. Remember Sri SaiBaba","Keep faith and wait","Remember Sri SaiBaba. You will always experience the effect of blessings of Sri SaiBaba. Do not worry","Remember Sri SaiBaba. There will be no worry.","Read Shree SaiBaba?s life story. Everything will happen as desired","You will get success through the blessings of Sri SaiBaba. Continue prayers and devotion","Success will be gained. Festival will be celebrated.","Pray and worship. Joy will be everywhere.","You are very fortunate. Remember Sri SaiBaba","The time will not come again. You are fortunate","Everybody loves and serves in different style. You will get result as per your faith","Though you will have to make a lot of efforts, you will definitely gain importance. Very few people are so fortunate.","Give importance to others. Respect their age. Success will be gained. A lot of goodwill of good deeds is with you","Remember preceptor (Guru). Everything will happen as desired","Good deeds of past life will prove fruitful. Remember Sri SaiBaba. Then everything will be right.","Donate food. Everything will be alright.","Donate food. Everything will be alright.","Donate food. Everything will be alright.","Do today?s work tomorrow. Donate food. Blessings of Sri SaiBaba are with you. An ordinary man will come forward and do your work.","Keep proper accounts and spend properly then there will be no room for anybody to criticize. Baba knows that you are working hard for others","Sri SaiBaba never discriminated. Then why do you? Donate food and see the miracle that takes place.","Exhibition of conduct, rituals, though and chanting is not useful. Love is required. Sri SaiBaba favour is also there. Do not worry.","Don?t be suspicious. Remember Sri SaiBaba. Plenty will be gained. It will be more than sufficient. However, love is required for this.","Do not have thousand doubts for small matters. Remember Sri SaiBaba. How can you afford to forget SaiBaba?","You cannot hide anything from Sri SaiBaba. Go to a temple of Lord Datta. Worry will end. Success will be gained.","Donate food. You will have blessings of Sri SaiBaba","Donate food. You will have blessings of Sri SaiBaba","Offer buttermilk to Sri SaiBaba and then donate it and see the miracle that happens. This time will not come again. Only remembrance will be there","Remember Sri SaiBaba. Everything will be alright","Good opportunity has come. People will come from outside. This is happening because you are fortunate. Do not give up remembering Sri SaiBaba","Good days will come, you will be happy.","Do not worry. Sri SaiBaba is with you. Read the 4th chapter of ?Bhagavad Gita? (A religious book of Hindus)","Remember Sri SaiBaba. All problems will be solved automatically.","As moss is removed, clean water will be visible. Similarly ignorance will be removed and you will get knowledge. Have faith in Sri SaiBaba","Give up pride. Remember Shree SaiBaba. You will not be conscious of happiness and sorrow. Sri SaiBaba?s blessings will be there.","Make use of intellect then only your deal will be successful. Control your mind using intellect. Then you will get success","You are very affectionate. But cannot tolerate insult. Remember Shree SaiBaba. Sri SaiBaba will help you in everyway.","Thing will not happen if you say I do it. Say that, all happened through the blessings of Sri SaiBaba then you will get success","You will have a big achievement. Sri SaiBaba?s blessings are also there","Two persons will come close to each other, big thing happen soon","Good things will happen but understand that it?s due to blessings of Sri SaiBaba","Man proposes God disposes. If you do not want such thing to happen. Do not give up remembering Sri SaiBaba whatsoever may be calamity","Worship the photo of Sri SaiBaba at home and see the miracle that happens","Remember Shree SaiBaba. Then everything will be alright","Your mother?s merit is more than yours. Your work will be done through her blessings. Blessings of Sri SaiBaba will be there.","?One who remembers me... I always keep him in mind!?. So says Sri SaiBaba. We do not know in what form will Baba appear and when the work is to be completed","Work, for which you are waiting, will be done accidentally. Read this one man will be sent to meet you. Have no worry.","Something which you want to happen is close. But due to doubt in your mind it is not happening. Hence remember Shree SaiBaba","Thing in your mind will be completed. You will not know when and how you will get blessings of Sri SaiBaba. Donate food.","If is difficult for the human mind to understand effect of blessings of Sri SaiBaba. Do not indulge in more thinking. You are fortunate. Hence remember Shree SaiBaba.","Miracle of Sri SaiBaba is unfathomable. Experiment it by donating food","Give meal in the name of Sri SaiBaba on the day of Holi (full moon day in the month of March). Everything will be alright","Give meal in the name of Sri SaiBaba on the day of Holi (full moon day in the month of March). Do not tell this to anybody. People of the house will ask questions as to whom and why etc., do not reply. Work will be done as desired by you.","Donate food. Blessings of Sri SaiBaba are also there with you. Do not pay attention even if people laugh at you. Two persons will come for your help.","Dreams come true. Donate food. All things will happen as desired. A stranger will help.","Sri SaiBaba?s miracle is unfathomable. Your work will be completed by meeting very old friends. Donate food on the day Holi (full moon day in the month of march)","Remember Shree SaiBaba. Everything will be alright.","Donate food. Blessings of Sri SaiBaba will be there. See what friends do for you.","Only due to blessings of Sri SaiBaba you will get a thing which is not in you fate. Remember Shree SaiBaba. Preceptor?s (Guru) blessings are with you","You have to suffer only for three months more. Remember Shree SaiBaba. Everything will be alright","Money will be spent. You will feel sorry because thing as desired has not happened. Even then remember Shree SaiBaba. Have a little patience","Mind is disturbed. Wait for two months. Remember Shree SaiBaba","You will be selected out of thousands due to your capability. You will be free from worry.","Sri SaiBaba knows that due to circumstances your desire is not fulfilled. Remember Shree SaiBaba then everything will be alright","Donate Rupees 20 in the name of Sri SaiBaba. Your work will be completed","Donate Rupees 25 in the name of Sri SaiBaba. What is the use of asking questions to friends? Sri SaiBaba is with you. Do not worry","Miracle of Sri SaiBaba is unfathomable. People can?t understand it . Remember Shree SaiBaba all will be well","Donate Rupees 12. Wish of many days will be fulfilled","Unnecessarily do not discuss things with other people. Sri SaiBaba knows all things in your mind. Have no worry","Only hard work is not sufficient. Blessings of Sri SaiBaba are also required. Remember Shree SaiBaba everything will be alright","Do not follow wrong ways. Remember Shree SaiBaba. He will appear in your dream and will show the right way","Remember Shree SaiBaba, then everything will be alright","Remember what had happened two year ago. Remember Shree SaiBaba","Give up discrimination. Wait Sri SaiBaba?s support is beyond imagination","You are tired of troubles isn?t it? Remember Shree SaiBaba. You are fortunate. Everything will be alright.","Something decided two years ago will come true now. That day is coming near. Remember Shree SaiBaba","Sri SaiBaba will take on to himself your frustration and sorrows and you will be happy. You will have a dream. Remember Shree SaiBaba","Time has come near. Remember Shree SaiBaba","Do not discriminate. Donate food. Give home made bread (Roti) to dog. The desired thing will happen. Sri SaiBaba?s blessings are also there.","It is better that you do not know everything. Presume that only Sri SaiBaba has arranged these things and remember Shree SaiBaba","Donate in the name of Sri SaiBaba. Then you will not face shortage of anything in life","Presume that what happens is only because of Sri SaiBaba?s blessings. Human intellect cannot know all.","Man is helpless before destiny. Accept this and just keep quiet. Remember Shree SaiBaba","The thing that has been discussed among friends two years ago will happen. Donate. Read Ramayana or at least have darshan of Lord Rama","Preparation will go on for three days. Then the work will be done. Miracles of saints are beyond the intellect of human beings.","Read the book ?Ramayana? for fourteen days. Something different is going to happen through your hands. Do not pay attention to good/ bad time.","Remember Shree SaiBaba. Your time has come.","It is due to the limitation of our vision. We feel that sun is affected during solar eclipse. Actually sun is not affected. Remember Shree SaiBaba and act thoughtfully","As is the faith in the mind, so is the result. If you feel that you will be defeated then you will be defeated, but if you feel that you will win then you will win. God believes in work, so one gets as he works","Remember Shree SaiBaba. All the tings are not within human capacities","Remember Shree SaiBaba to get rid of tremendous anxiety.","Remember Shree SaiBaba. Find out the cause of worry. You will know the value of the things in your possession.","Give up egoistic behaviors. Surrender to Sri SaiBaba. Everything will be alright","You will be guided in a dream. Remember Shree SaiBaba","Different people have different opinions. Hence, the work is not completed. Wait for 36 hours. You will find right way through Shree Sai?s blessings","You will have dream. Act as indicated in the dream. Blessings of Shree Sai are already there. Immediately perform Sri SaiBaba?s pooja (worship Baba)","Offer ?vida ? Pan? (betel leaf which is eaten with betel nut after meals in India) and money to Sri SaiBaba. Remember Shree SaiBaba. Wait and see what will happen. You are fortunate.","You do not think more. Your mind has to rest. Remember Shree SaiBaba. Understand that there is no difference among Lords Ram, Krishna & Sainath. Then everything will alright","Remember Shree SaiBaba. Expectations will be fulfilled","Remember Shree SaiBaba. Differences will be settled. You will find new way","You will suffer due to a small mistake. Certain things are beyond human capacity. Remember Shree SaiBaba","Behind everything there is a cause. Do not be fussy. Remember Shree SaiBaba","Worry will end after 3 days. Remember Shree SaiBaba. Accept that you are ignorant and do not make will guesses and speculations","Don?t take wrong decision. Wait for 3 days. You will be happy. Remember Shree SaiBaba","Do not doubt. Remember Shree SaiBaba then see how SaiBaba satisfies you","Donate in the name of Shree SaiBaba. Everything will be alright","Donate food for 13 days from today and see what happens. You are fortunate","Give up egoistic behavior. Remember Shree SaiBaba. Do not consider yourself as inferior while thinking about others","Remember Shree SaiBaba. Understand that as long as you remember Shree SaiBaba He is with you and act accordingly","Do not doubt. Remember Shree SaiBaba. Shree SaiBaba is with you","Give importance to other persons. Presume that Shree Sainath does everything and see what happens.","Remember Shree SaiBaba then everything will be alright","Remember Shree SaiBaba and everything will be alright","Past memories will be revived. Remember Shree SaiBaba then everything will be alright","You will not get help from relatives and friends. You have to do your own work. To achieve this remember Shree SaiBaba.","Accept routine things instead of going after new ones. Friends will come to your house. Nine persons will help you","Do not be displeased by looking at others. You are also fortunate. Surrender to Shree SaiBaba and remember him.","Start work from tomorrow and see the miracles that happen. You will get guidance in dream. Remember Shree SaiBaba","Donate one dhoti (a white cloth worn by Indian men) to a Brahmin (a person who performs holy rites). Sainath is with you. There is no cause to worry. Success will be gained","Act as per command of Baba (the answer received from this website). Ask question tomorrow and act according to Sri SaiBaba?s wishes","You will get a gift. Shree Sai?s blessings are also there. Do not worry.","Surrender to Shree Sai. Keep faith and wait. Shree SaiBaba always looks after you.","Everyone is great in his own estimation. However it will be difficult to have same feeling for others. Remember Shree SaiBaba. Shree Sai cares for you","Remember Shree SaiBaba. Everything will be alright","You start work. Remember Shree SaiBaba. Shree SaiBaba will help you in your work. Auspicious function will soon take place","Work will be done if you take the help of a friend. Baba?s blessings are also with you. You will travel. Auspicious function will take place. Donate Rupees 100","By blessings of Shree Sai you will get help from all. Start work. Have darshan of Lord Rama","Do not worry. Shree Sai takes care of your worries. Remember Shree SaiBaba. Friend will help.","Co-operation of many will be gained. You will have Shree Sai?s darshan in a photo. Friend is ready to offer you his services.","Be humble to Shree Sai. All desires will be fulfilled","Donate Rupees 3000. All people will laugh at you but do not pay attention. See the miracle of Shree Sai. Success will be gained","Donate food to two brothers. People will laugh but you do not pay attention. Shree Sai Samarth?s blessings are with you","Give up quarrel. Be humble to Shree Sai. Understand that money is not everything.","Work will be spoiled due to two persons. Hence, remember Shree SaiBaba. Keep faith and wait.","Remember Shree SaiBaba. Keep faith and wait.","You will be saved from calamity through the blessings of Shree Sai. Do good deeds. Don?t go after money.","Give up enmity. Act with love then only you will get success","You are in trouble since the time is bad. Donate food. Give up enmity. Shree SaiBaba will take care","Shree Sainath will free you from calamity. Do not worry. Give up enmity.","You will be free from calamity. Give up enmity. Remember Shree SaiBaba","Act according to advice of a woman. Worship Lord Shankar. Don?t crave form money","If your mind is suspicious how can you expect that the work be done. Donate at least a small amount. You are needed for a large project.","Do not misuse things belonging to others. This will not please God. Act as per women?s advice. Donate at least a small amount","Donate from the bottom of your heart. Otherwise you will suffer loss. Do not take things belonging to others. Remember Shree SaiBaba","Have some patience. Opportunity will come to your home. Your work will be done. Auspicious function will soon take place.","Why do you worry? Very soon you shall have good fortune.","Avoid debate. Obey woman?s advice","Avoid debate. You will have a dream. You will incur loss if you prolong debate. Remember Shree SaiBaba","you will be free from calamity through blessings of shree sai. Have no worry. Donate smoking pipe and tobacco.","Remember Shree SaiBaba then everything will be alright","Shree Sai wants your devotion. All will be right.","Remember Shree SaiBaba. Everything will be alright.","Remember Shree SaiBaba. Everything will be alright.","Your desire will be fulfilled not this year but next. People will laugh at you now, but will surrender to Shree Sai after being convinced.","Act as per advice of a friend. Brother will also help. Be humble to Shree Sai.","Work will be done through the help of a friend. Have darshan of Shree Sai","You will have a dream. Act as per dream. Your problems are now over","You will recover from disease. Be humble to Shree Sai.","SaiBaba knows everything. Desire will be fulfilled. It will not be possible to know as to who is connected with what.","Why do you have to blame Baba for nothing? Blame your deeds. Be humble to Shree Sai. Previous loss will be recovered.","Donate. Baba?s blessings are also with you","Donate a Rupee. Wish will be fulfilled. In one year everything will happen as desired.","Why are you testing Shree SaiBaba? Have faith and see what happens","Remember Shree SaiBaba. Everything will be alright. You will recollect old memories.","Work will be done through you. Remember Shree SaiBaba. Success will be gained.","How can the work be done by being suspicious? Remember Shree SaiBaba. Co-operation from a friend will be gained.","Even if a small thing is lost one becomes uneasy. Remember Shree SaiBaba. Why are you testing Sai? Be humble. Shree Sai Samarth will give you everything. You will be surprised.","You will have to establish yourself. Your wish will be fulfilled. Meeting will take place after a miracle. You will be happy.","Give up doubt and suspicion. You have two options. Accept the one which gives more importance to love rather than business consideration","Work planned five years ago will be completed. Friends will help you. Remember Shree SaiBaba","You are missing opportunity due to suspicion. Control yourself now only. Remember Shree SaiBaba. All will be right","Keep aside your thoughts and doubts. Take advice of others and act accordingly.","The more you doubt, the more you will lose. Be humble to Shree Sai then you will get success. Work cannot be done by discrimination.","Giving up doubt and have faith. Then things will take place as desired.","When you can do something in a right way. Do not go for wrong ways. Keep your mind pure. Blessings of Shree Sai are also with you.","Take friend?s advice. Keep mind calm.","Act wisely. Remember Shree SaiBaba","Give up pride and remember Shree SaiBaba. Everything will be alright.","Keep faith and wait. Everything will be alright.","Remember Shree SaiBaba. Sorrows will end and you will be happy.","Hidden matters will be disclosed. You will succeed due to the blessings of Shree Sai","Do not doubt. Shree Sainath knows everything. Keep faith. Everything will be alright.","Do not interpret wrongly due to ignorance. Remember Shree SaiBaba. Proper way will be shown.","You will suffer loss if you act with suspicion. You will land in troubles. Remember Shree SaiBaba. Way will be found.","Act after understanding. What is real and what is an outward show","Learn to recognize what is good and what is bad","Be alert. Remember Shree SaiBaba. You will know right things.","Do not adopt wrong ways. Act carefully. Remember Shree SaiBaba. Proper way will be found","Abandon bad ways. Then you will get good things. Remember Shree SaiBaba","Do not accept falsehoods as truth. Remember Shree SaiBaba. Keep faith and wait. You will get proper direction","Do not be influenced by imitations. Think properly and act. There are also people who know what is good and bad. Remember Shree SaiBaba. Proper way will be found","Cause for fear will disappear. Remember Shree SaiBaba. Keep faith and wait","Do not discriminate. Good days will come. Darkness will vanish.","Do not pay attention to flattering or criticisms. Shree Sai?s blessings are also with you. Do not worry.","Do your duties without attachment. Blessings of Shree Sainath are with you","Work will be completed through the help from two friends. You have the backing of lot of past good deeds. Hence Shree Sai?s blessings are with you. Do not worry.","Though there is deficiency yet you are loved by others. Success will be gained due to help of friends. Do not worry.","Success is very close. You will receive help from friends.","Divine plans are different from human ideas. Your path will be easier. Shree Sai?s blessings are also there","A friend will meet you due to a small incident and everything will happen right","Do not worry. You will meet an old friend at the last moment and work will be easier. Shree Sai?s blessings are also with you.","You will be happy on completion of work. Shree Sai?s blessings are also there","You are most fortunate. Surrender to Shree Sai. All your wishes will be fulfilled","Keep faith and wait. Blessings of Shree SaiBaba will be with you. Do not worry","Brother will help you. He remembers you very much. Offer coconut to Shree Sai","Brother remembers you. You will observe some similarity. You will travel. Take care that there is no error in the thing decided.","Apologize even for a small mistake. Offer a coconut to Shree Sai and apologize for your mistake otherwise you will be upset","Work carefully, otherwise do not undertake that work. Return it back, otherwise you will fall into calamity. Remember Shree SaiBaba.","Give up pride and offer a coconut to Shree Sai. Mind will become calm Shree Sai?s blessings are also there.","You will get respect in royal court (government). Blessings of Lord Ram and Vittal are also there. Brother will help you. Remember Shree SaiBaba","Your family and you are very fortunate. Do not worry. Shree Sainath takes care of all your worries.","Matter troubling you for last six years will be resolved. You will recover from diseases. You are fortunate. Offer a smoking pipe and tobacco as a remembrance to Baba","You will celebrate. Remember Shree SaiBaba","You will realize the truth. Mind will be peaceful. Remember Shree SaiBaba", ];
  
	  // Handle inputNumber for a specific answer
	  if (inputNumber && inputNumber >= 1 && inputNumber <= answers.length) {
		return answers[inputNumber - 1]; // Adjust for zero-based index
	  }

	  // Generate random index if no valid inputNumber is provided
	  const randomIndex = Math.floor(Math.random() * answers.length);
	  return answers[randomIndex];
	}

	  const [
		question2SaiBaba,
		number2SaiBaba,
		randomNumber
	  ] = result;
	  
	  let saibabasAnswer;
	
	// Example usage:
	// console.log(showAnswer(number2SaiBaba)); // Get the answer at index 5
	// console.log(showAnswer());   // Get a random answer

	if (!randomNumber) {
		if (number2SaiBaba > 1 || number2SaiBaba < 720) {
			saibabasAnswer = showAnswer(number2SaiBaba);
		} else {
			console.error("Invalid number2SaiBaba: Must be between 1 and 720");
			app.alert("Invalid number2SaiBaba: Must be between 1 and 720");
		}
	} else {
		saibabasAnswer = showAnswer();
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

  (async () => {
	try {
	  const auditReport = `- <mark>Ask Sai Baba:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **Question: ${question2SaiBaba || "In Memory!"}**; <mark>**Answer:** ${saibabasAnswer}</mark>`;
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
	  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);
	} catch (error) {
	  console.error(error.message);
	}
  })();

  }

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
}, // appOption

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

	  const auditReport = `- <mark>Table - Randomizer:</mark> ***When:** ${YYMMDD}_${HHMMSS}*; **UUID:** ${noteUUID} ; <mark>**Data:**</mark> ${finalResultz}`;
	  await app.insertNoteContent({ uuid: auditnoteUUID }, auditReport);
	  await app.navigate(`https://www.amplenote.com/notes/${auditnoteUUID}`);

		app.alert(finalOutput);
		console.log(finalOutput);

	}
	},
/* ----------------------------------- */
}
}