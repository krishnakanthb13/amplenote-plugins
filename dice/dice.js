{
  async noteOption(app, noteUUID) {

    const existingSetting = await app.settings["Previous_Roll"];
    let result;

    if (existingSetting) {

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
    ] = (existingSetting || "") // Ensure existingSetting is not null or undefined
      .split(",")
      .map((value, index) => {
        const defaults = [1, 6, 1, 6, false, 0, false, 0, false, 0, 1, false]; // Default values
        if (value === undefined || value === null || value.trim() === "") {
          return defaults[index]; // Use default if value is missing or empty
        }
        // Parse value based on expected type
        if ([0, 1, 2, 3, 5, 7, 9, 10].includes(index)) return Number(value) || defaults[index]; // Numbers
        if ([4, 6, 8, 11].includes(index)) return value.toLowerCase() === "true"; // Booleans
        return value; // Strings or other types (not expected here)
      });
      
    result = await app.prompt("Roll the Dice!", {
      inputs: [ 
        
        { label: "Number of Dice", type: "string", value: numDice },
        { label: "Number of Faces", type: "string", value: faces },
        { label: "Minimum Number", type: "string", value: min },
        { label: "Maximum Number", type: "string", value: max },
        { label: "Keep Highest Roll", type: "checkbox", value: keepHighest },
        { label: "Keep Highest Roll Count", type: "string", value: keepCount },
        { label: "Drop Highest Roll", type: "checkbox", value: dropHighest },
        { label: "Drop Highest Roll Count", type: "string", value: dropCount },
        { label: "Explode", type: "checkbox", value: explode },
        { label: "Explode Target", type: "string", value: explodeTarget },
        { label: "Sort the output", type: "select", options: [ { label: "None", value: 1 }, { label: "Ascending", value: 2 }, { label: "Decending", value: 3 } ], value: sortOption || 1 },
        { label: "Unique", type: "checkbox", value: unique },
      ] 
    
    });
      
    } else {

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
      ] 
    
    });

    }
 
   
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
      ] = result;

      await app.setSetting("Previous_Roll", result);
  
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
    } else {
      console.log("User canceled input.");
    }

  }
}