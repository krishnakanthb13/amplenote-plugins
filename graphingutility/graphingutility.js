{
  async noteOption(app, noteUUID) {
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    
    // Split content into lines
    const lines = markdown.split('\n');
    
    let tableCount = 0;
    let inTable = false;
    const tables = [];
    let currentTable = [];
    console.log("tableCount:",tableCount);
    console.log("inTable:",inTable);
    console.log("tables:",tableCount);
    console.log("tableCount:",currentTable);
    
    lines.forEach((line, index) => {
      if (line.trim().startsWith('|')) {  // Identifying table rows
        if (!inTable) {
          tableCount++;
          tables.push(`# Table ${tableCount}\n`);
          inTable = true;
        }
    console.log("tableCount:",tableCount);
    console.log("inTable:",inTable);
    console.log("tables:",tableCount);
    console.log("tableCount:",currentTable);
        
        // Check if the first row is empty
        if (currentTable.length === 0 && line.trim() === '|') {
          // Add Column headers if first line is empty
          const columnCount = line.split('|').length - 2;
          const headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`).join(' | ');
          tables.push(`| ${headers} |`);
        } else {
          currentTable.push(line);
        }
        console.log("tableCount:",tableCount);
        console.log("inTable:",inTable);
        console.log("tables:",tableCount);
        console.log("tableCount:",currentTable);

        tables.push(line);  // Add the table row to the tables array
      } else if (inTable) {
        inTable = false;
        tables.push(currentTable.join('\n'));
        currentTable = [];
      }
    });
    console.log("tableCount:",tableCount);
    console.log("inTable:",inTable);
    console.log("tables:",tableCount);
    console.log("tableCount:",currentTable);
    
    const processedContent = tables.join('\n');
    app.alert(processedContent);
    console.log("processedContent:",processedContent);
  }
}