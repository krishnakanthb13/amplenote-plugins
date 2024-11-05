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
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Start capturing if the URL is found in any line
        if (line.includes(url)) {
          inSection = true; // Start capturing content
          sectionContent += '> ' + line + '\n';
          continue;
        }

        // Capture content within the section if URL has been found
        if (inSection) {
          // Stop capturing if we hit another header or divider
          if (line.startsWith('#') || line.startsWith('---')) {
            break;
          }

          // Check for main bullet points or numbered list items
          if (/^(\s*[-*+]\s|\s*\d+\.\s)/.test(line)) {
            sectionContent += '> ' + line + '\n'; // Start capturing bullet content
            
            // Capture all child lines until the next main bullet, header, or divider
            i++;
            while (i < lines.length && !/^(\s*[-*+]\s|\s*\d+\.\s)/.test(lines[i]) && !lines[i].startsWith('#') && !lines[i].startsWith('---')) {
              sectionContent += '> ' + lines[i] + '\n';
              i++;
            }
            i--; // Step back to allow the outer loop to continue at the right spot
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
