{
  noteOption(app, noteUUID) {

    const result = await app.prompt("This is the message", {
      inputs: [ 
        
        { label: "This is the label", placeholder: "This is the placeholder", type: "text" },
        { label: "This is the label", type: "checkbox" },
        { label: "This is the label", type: "select", options: [ { label: "something", value: 1 }, { label: "other", value: 2 } ] },
        { label: "This is the label", type: "radio", options: [ { label: "something", value: 1 }, { label: "other", value: 2 } ] },
      ] 
    
    });
 
    if (result) {
      const [ textResult, checkboxResult, selectResult ] = result;
 
    } else {
      // User canceled
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
    
    // Example Usage
    const result = rollDice({
      numDice: 5,
      faces: 10
    });
    
    console.log("Rolls:", result.rolls);
    console.log("Total:", result.total);

  }
}