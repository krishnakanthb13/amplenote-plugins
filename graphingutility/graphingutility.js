{
  async noteOption(app, noteUUID) {
    const markdown = await app.getNoteContent({ uuid: noteUUID });

    // console.log("Initial markdown:", markdown);

    // Function to remove HTML comments
    const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();

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
          currentTable.push(`| ${headers} |`);
          // console.log("Added headers to empty table row:", currentTable);
        }

        currentTable.push(line);
        // console.log("Current table content:", currentTable);
      } else if (inTable) {
        inTable = false;
        // console.log("End of table detected, inTable set to false.");

        const tableContent = currentTable.join('\n');
        // console.log("Current table content before cleaning:", tableContent);

        tables.push(removeEmptyRowsAndColumns(tableContent));
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
    // console.log("Cleaned content after removing HTML comments:", cleanedContent);

    // app.alert(cleanedContent);
    // console.log("Final cleaned content:", cleanedContent);
  }
}