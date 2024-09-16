{
  async noteOption(app, noteUUID) {
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    // console.log("noteUUID:",noteUUID);
    // console.log("markdown:",markdown);

	const result = await app.prompt("Select if you want to Expand or Collapse all Headers.", {
		  inputs: 
		  [ 
			{ label: "This is the label", type: "radio", options: [ { label: "Collapse", value: 1 }, { label: "Expand", value: 2 } ] },
		  ] 
		
		});
	 
		if (result) {
		  const [shouldCollapseX] = result;
	 
		} else {
		  app.alert("Please select either Collapse or Expand!"));
		  return;
		}

	let shouldCollapse = shouldCollapseX === 1 ? true : false;

	function processMarkdown(markdown, shouldCollapse) {
	  // Split markdown by lines
	  let lines = markdown.split('\n');
	  
	  // Loop through each line to find headers and modify them
	  lines = lines.map(line => {
		// Regular expressions to match headers
		let headerPattern = /^(#+)\s+(.+?)\s*(<!--\s*{"collapsed":true}\s*-->)?$/;

		let match = line.match(headerPattern);
		
		if (match) {
		  let header = match[1];  // the #, ##, ### part
		  let headerContent = match[2]; // the content after the header
		  let hasCollapse = match[3]; // if the collapsed comment exists
		  
		  // Add or remove the collapsed comment based on shouldCollapse
		  if (shouldCollapse && !hasCollapse) {
			// Add the collapsed comment
			return `${header} ${headerContent} <!-- {"collapsed":true} -->`;
		  } else if (!shouldCollapse && hasCollapse) {
			// Remove the collapsed comment
			return `${header} ${headerContent}`;
		  }
		}
		
		// Return the line unchanged if it's not a header
		return line;
	  });

	  // Join the lines back into a single markdown string
	  return lines.join('\n');
	}
	
	let modifiedMarkdown = processMarkdown(markdownData, shouldCollapse);
	console.log(modifiedMarkdown);	

  }
}