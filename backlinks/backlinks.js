{
  async noteOption(app, noteUUID) {
    // Create a variable to store all referencing note handles in markdown format
    let referencesMarkdown = '';
    
    // Iterate through all referencing note handles
    for await (const referencingNoteHandle of app.getNoteBacklinks({ uuid: noteUUID })) {
      referencesMarkdown += `- Note: [${referencingNoteHandle.name}](https://www.amplenote.com/notes/${referencingNoteHandle.uuid})\n`;
      referencesMarkdown += `- Tags: ${referencingNoteHandle.tags.join(", ")}\n`;
      const url = `(https://www.amplenote.com/notes/${noteUUID})`;
      console.log("url", url);

      // Fetch the markdown content of the referencing note
      const markdownContent = await app.getNoteContent({ uuid: referencingNoteHandle.uuid });
      console.log("markdownContent", markdownContent);

      // Remove any empty lines from the content
      const lines = markdownContent.split('\n').filter(line => line.trim() !== '');
      
      let inSection = false;
      let sectionContent = '';
      let parentIndentLevel = null;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Start capturing if the URL is found in any line
        if (line.includes(url)) {
          inSection = true; // Start capturing content
          
          // Capture the URL line
          sectionContent += '> ' + line + '\n';
          
          // Determine the indentation level of the URL line
          const urlMatch = line.match(/^(\s*)/);
          parentIndentLevel = urlMatch ? urlMatch[1].length : 0;
          continue;
        }

        // Capture content within the section if URL has been found
        if (inSection) {
          // Continue capturing headers without stopping at them
          if (line.startsWith('#')) {
            sectionContent += '> ' + line + '\n';
            continue;
          }

          // Check for main bullet points or numbered list items
          const bulletMatch = line.match(/^(\s*)([-*+]\s|\d+\.\s)/);
          if (bulletMatch) {
            const currentIndent = bulletMatch[1].length;
            
            // Capture only child bullets that are indented more than the parent bullet
            if (currentIndent > parentIndentLevel) {
              sectionContent += '> ' + line + '\n';
            } 
            // Stop capturing if we encounter a bullet at the same or lesser indentation
            else {
              break;
            }
          } else {
            // Capture regular lines in the section
            sectionContent += '> ' + line + '\n';
          }
        }
      }
      
      // Add the section content or a message if not found
      referencesMarkdown += `- Section containing URL:\n${sectionContent || 'Section not found'}\n\n`;
    }

    // Output the final markdown
    console.log("References in Markdown:\n\n" + referencesMarkdown);
  }
}
