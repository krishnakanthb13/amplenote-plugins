{
  async noteOption(app, noteUUID) {
    
    // Fetch the markdown content of the note using its UUID
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    // console.log("noteUUID:", noteUUID);
    // console.log("markdown:", markdown);

    // Prompt user to select if they want to collapse or expand all headers
    const result = await app.prompt("Select if you want to Expand or Collapse all Headers.", {
      inputs: [ 
        { 
          label: "This is the label", 
          type: "radio", 
          options: [
            { label: "Collapse", value: 1 }, 
            { label: "Expand", value: 2 } 
          ]
        }
      ]
    });

    // If no result is selected, show an alert and exit
    if (!result) {
      app.alert("Please select either Collapse or Expand!");
      return;
    }
	// console.log("result:", result);

    // Set shouldCollapse to true if the user selects 'Collapse', otherwise false
    let shouldCollapse = result === 1 ? true : false;
	// console.log("shouldCollapse:", shouldCollapse);

    // Function to process the markdown content and add/remove collapse comments
    function processMarkdown(markdown, shouldCollapse) {
      // Split markdown by lines for easy line-by-line processing
      let lines = markdown.split('\n');
      
      // Loop through each line to find headers and modify them accordingly
      lines = lines.map(line => {
        // Regular expression to match headers (e.g., #, ##, ###)
        let headerPattern = /^(#+)\s+(.+?)\s*(<!--\s*{"collapsed":true}\s*-->)?$/;

        // Match the line with the header pattern
        let match = line.match(headerPattern);
        
        if (match) {
          // Extract the header symbols (#, ##, ###), content, and collapse status
          let header = match[1];  // the #, ##, ### part
          let headerContent = match[2]; // the content after the header
          let hasCollapse = match[3]; // whether the collapse comment exists
          
          // Conditionally add or remove the collapse comment
          if (shouldCollapse && !hasCollapse) {
            // Add the collapsed comment if it doesn't exist
            return `${header} ${headerContent} <!-- {"collapsed":true} -->`;
          } else if (!shouldCollapse && hasCollapse) {
            // Remove the collapsed comment if it exists
            return `${header} ${headerContent}`;
          }
        }
        
        // Return the line unchanged if it's not a header
        return line;
      });

      // Join the modified lines back into a single markdown string
      return lines.join('\n');
    }

    // Process the markdown content based on user input (collapse or expand headers)
    let modifiedMarkdown = processMarkdown(markdown, shouldCollapse);
    // console.log("modifiedMarkdown:", modifiedMarkdown);

    // Replace the note's content with the modified markdown
    await app.replaceNoteContent({ uuid: noteUUID }, modifiedMarkdown);
	// console.log("Success!");
  }
}