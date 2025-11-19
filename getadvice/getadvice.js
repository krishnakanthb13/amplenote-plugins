{
  /* -------------------------------------------------------------------------- */
  /*                                 Get Advice                                 */
  /* -------------------------------------------------------------------------- */
  async noteOption(app, noteUUID) {
    try {
      const note = await app.notes.find(noteUUID);
      const result = await app.prompt("Enter topic (Leave blank for Random)");

      // 1. Determine URL
      let url = "https://api.adviceslip.com/advice";
      if (result) {
        url = `https://api.adviceslip.com/advice/search/${result}`;
      }

      // 2. Fetch
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const data = await response.json();
      let finalAdvice = "";

      // 3. Handle different JSON structures (The Logic Fix)
      if (result) {
        // Search returns { slips: [...] } or { message: ... }
        if (data.message) {
          app.alert(`No advice found for "${result}".`);
          return;
        }
        // Pick a random slip from the search results
        const randomIndex = Math.floor(Math.random() * data.slips.length);
        finalAdvice = data.slips[randomIndex].advice;
      } else {
        // Random returns { slip: { advice: ... } }
        finalAdvice = data.slip.advice;
      }

      // 4. Insert content (Preserves Markdown)
      // note.insertContent appends to the bottom of the note
      await note.insertContent(`> 💡 **Advice:** ${finalAdvice}\n`);

    } catch (error) {
      console.error(error);
      app.alert("Could not fetch advice.");
    }
  }
}