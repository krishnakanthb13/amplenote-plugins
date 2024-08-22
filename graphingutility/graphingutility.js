{
  async noteOption(app, noteUUID) {
    const markdown = await app.getNoteContent({ uuid: noteUUID });

    // Function to remove HTML comments
    const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();

    const lines = markdown.split('\n');
    let tableCount = 0;
    let inTable = false;
    const tables = [];
    let currentTable = [];
    // console.log("tableCount:",tableCount);
    // console.log("inTable:",inTable);
    // console.log("tables:",tableCount);
    // console.log("tableCount:",currentTable);
    
    lines.forEach((line, index) => {
      if (line.trim().startsWith('|')) {  // Identifying table rows
        if (!inTable) {
          tableCount++;
          if (tableCount > 1) {
            tables.push('---');  // Add separator between tables
          }
          tables.push(`# Table ${tableCount}\n`);
          inTable = true;
        }
    // console.log("tableCount:",tableCount);
    // console.log("inTable:",inTable);
    // console.log("tables:",tableCount);
    // console.log("tableCount:",currentTable);

        // If first row is empty, add column headers
        if (currentTable.length === 0 && line.split('|').every(cell => cell.trim() === '')) {
          const columnCount = line.split('|').length - 2;  // -2 to exclude the leading and trailing empty cells
          const headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`).join(' | ');
          currentTable.push(`| ${headers} |`);
        }
		// console.log("tableCount:",tableCount);
		// console.log("inTable:",inTable);
		// console.log("tables:",tableCount);
		// console.log("tableCount:",currentTable);

        currentTable.push(line);
      } else if (inTable) {
        // End of table
        inTable = false;
        tables.push(currentTable.join('\n'));
        tables.push('');  // Add an additional blank line between tables
        currentTable = [];
      }
    });
    // console.log("tableCount:",tableCount);
    // console.log("inTable:",inTable);
    // console.log("tables:",tableCount);
    // console.log("tableCount:",currentTable);

    // Ensure the last table is pushed if the markdown ends with a table
    if (currentTable.length > 0) {
      tables.push(currentTable.join('\n'));
    }

    // Join all tables and remove HTML comments at the end
    const processedContent = tables.join('\n\n');
    const cleanedContent = removeHtmlComments(processedContent);

    app.alert(cleanedContent);
    console.log("cleanedContent:",cleanedContent);
  }
}