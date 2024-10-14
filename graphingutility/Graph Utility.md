---
title: Graph Utility
uuid: 2d631ce2-6169-11ef-a048-22074e34eefe
version: 834
created: '2024-08-23T21:33:02+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

Introducing the **Markdown Table to Chart Plugin**, a powerful tool designed to seamlessly convert markdown tables into interactive charts with ease. Whether you’re a developer, data analyst, or content creator, this plugin bridges the gap between raw data and visual representation, enhancing your workflow and making your data more accessible and engaging.

\

**Why This Plugin?** Markdown is a popular format for writing and documenting, especially in technical environments. However, conveying data through tables alone can sometimes be limiting, especially when trying to highlight trends or insights at a glance. This plugin addresses that limitation by transforming markdown tables into visually appealing charts, all within your existing workflow. No need for external tools or complex configurations—everything happens directly where you work, in and around Amplenote.

\

**How It Works?** The plugin automates the process of identifying markdown tables within your Amplenote Note, allowing you to select the table you want to visualize. With a few simple clicks, you can choose which columns to represent on the X, Y, or even Z axes, giving you full control over the chart’s structure. Once configured, the plugin uses Chart.js, a powerful and flexible JavaScript library, to generate the chart instantly. The chart is then embedded directly into your document, maintaining a cohesive and streamlined experience (Viewer - Some work is in progress!).

\

**User-Friendly Design!** The interface is designed to be intuitive, minimizing the learning curve so you can get started quickly. Dropdown menus populate with your table data, making it easy to select and customize your charts. Whether you need a line chart, bar chart, or scatter plot, the plugin supports a variety of chart types, ensuring that your data is displayed in the most effective format.

\

**Enhanced Workflow Integration!** The Markdown Table to Chart Plugin is designed to integrate smoothly into your existing setup. This plugin enhances your ability to present data without breaking your flow.

\

In summary, this plugin is an essential tool for anyone looking to elevate their markdown documentation by converting tables into insightful, interactive charts effortlessly.

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/2d631ce2-6169-11ef-a048-22074e34eefe/4ea73370-db32-42ab-b572-c1d41f3472ea.png) [^1]    ![](https://images.amplenote.com/2d631ce2-6169-11ef-a048-22074e34eefe/f56412d9-e337-4d1a-8165-a2b120e9c19e.png) [^2]  ![](https://images.amplenote.com/2d631ce2-6169-11ef-a048-22074e34eefe/059a72a8-69a6-4e84-94d2-e2896c324900.png) [^3]

\

![](https://images.amplenote.com/2d631ce2-6169-11ef-a048-22074e34eefe/00af011b-823b-4193-ab72-5174c2e0708e.gif)

- <mark style="background-color:undefined;">**Demo with Valid Data - Gold Prize Trend in India.**<!-- {"backgroundCycleColor":"58"} --></mark>

![](https://images.amplenote.com/2d631ce2-6169-11ef-a048-22074e34eefe/9f14f443-158b-4530-8dc1-f55e14b3889c.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### Getting Started <mark style="color:#F8914D;">\[Readme!\]<!-- {"cycleColor":"24"} --></mark>

- After installing, Open your Note Options (Three dots on top right of the Note.) You will see Three Options.

- `Graph Utility: Download!`

    - `Download - Interactive Charts (Recommended)` Download a HTML file with all the Interactive Chart Options, with all the table data from the note that you are selecting from.

    - `Download all Tables - MD` This option will let you download a formatted markdown type of all the tables present in the note that you selected from, this can be used in the above HTML, by editing using a notepad or any other software that support markdown tables.

    - `Download all Tables - CSV` This option will let you download a formatted comma separated file type of all the tables present in the note that you selected from, this can be used to open in excel and continue analytics.

    - `Copy all Tables from this Note to a new Note` If you have to many data points or to much noise data, which is not letting you focus on your data, then move all your data in tables alone into a clean and separate note.

- `Graph Utility: Viewer!`

    - Do not want to download the data or create unnecessary duplication of data, best is to use this option. Upon selecting, this inserts a HTML embed into your current Note from you selected it. In which you will have options to play around.

    - For Row wise data, use Transposed Option in the table Selection dropdown.

    - To Save the Graph, right click on the image and click on `Save Image as..` or  `Copy Image`.

- `Graph Utility: Update Viewer!`

    - Once you insert a Viewer, by default that note will be considered as the default data source for the Embed. Incase if you want to use a different note as it's data source you need to select this option.

    - Note: If you are planning to insert a new viewer in a different note, that particular note will be updated as the Source. And the way how this Embed works is, it is universal across your notes. Hence when going back to earlier note where the Viewer was already inserted, then you need to use this `Update Viewer` Option, for the Plugin to pick up the latest note as its source.

### Features

- **`Easy Table Selection:`** Automatically identifies tables in your markdown. You just have to select which table that you want to select in the order in which it is present in your note.

- **`Variety of Chart Types:`** Line, bar, pie, and advanced charts as well.

- **`Customizable Axes:`** Choose which data goes on the X, Y, or Z axis. (Limited to Column data alone for now!)

- **`Immediate Visualization:`** View your chart right in your document. Quickly compare and see which one suits you best for your visualization.

- **`Select your Fav Animations:`** Feeling overwhelmed by your data. Have some fidgeting with some animation, see which one is distracting you and get a chance to unwind occasionally.

- Troubleshooting

    - No Tables Found? Make sure your markdown contains properly formatted tables.

    - Chart Not Showing? Ensure you’ve selected the right data for the chart’s axes.

For more details, refer to the Full Documentation in the Instruction below or comment if you need support.

\

`Happy charting! 🎉`

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name<!-- {"cell":{"colwidth":105}} -->|Graph Utility|
|icon<!-- {"cell":{"colwidth":105}} -->|query_stats|
|setting<!-- {"cell":{"colwidth":105}} -->|Current_Note_UUID \[Do not Edit!\]|
|description|Thinking to Visualize your Tables. Look no were else, this is your Go To Plugin Tool.|
|instructions|[Graph Utility - Download!](https://www.amplenote.com/notes/d08099c8-616d-11ef-beb6-b6c19b417745) <br />[Graph Utility - Viewer!](https://www.amplenote.com/notes/05aef748-616e-11ef-a048-22074e34eefe) <br />[Graph Utility - Interactive Charts...](https://www.amplenote.com/notes/2dd7876c-616e-11ef-a048-22074e34eefe) <br />[Graph Utility - Animations](https://www.amplenote.com/notes/edd30c6a-623d-11ef-bed3-b6c19b417745) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
	noteOption: {
/* ----------------------------------- */
"Download!":  async function (app, noteUUID) {
    // Prompt the user to select tags and choose options
    const result = await app.prompt(
        "Select any one of the Option Below!",
        {
            inputs: [
            {
                label: "Select the format that you want to download / copy in!",
                type: "radio",
                options: [
                    { label: "Download - Interactive Charts (Recommended)", value: "1" },
                    { label: "Download all Tables - MD", value: "2" },
                    { label: "Download all Tables - CSV", value: "4" },
                    { label: "Copy all Tables from this Note to a new Note", value: "3" }
                ]
            }
            ]
        }
    );

      // Extract user inputs
      // const downloadOption = result;
      // console.log("result:", result);
	
	//const note = await app.notes.find(noteUUID);
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    // console.log("Initial markdown:", markdown);

    // Function to remove HTML comments
    const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();
	
	// *************************************************************** //

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

	// *************************************************************** //

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
          // currentTable.push(`| ${headers} |`); // Automatically Adding Columns is disabled for now!
          // console.log("Added headers to empty table row:", currentTable);
        }

        currentTable.push(line);
        // console.log("Current table content:", currentTable);
      } else if (inTable) {
        inTable = false;
        // console.log("End of table detected, inTable set to false.");

        const tableContent = currentTable.join('\n');
        // console.log("Current table content before cleaning:", tableContent);

        // tables.push(removeEmptyRowsAndColumns(tableContent));
        tables.push(tableContent);
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

	// *************************************************************** //

	function transposeMarkdownTables(content) {
		// Step 1: Split content based on "---"
		let sections = content.split('---');
		// console.log("sections:",sections);
		
		let processedSections = sections.map(section => {
			let lines = section.trim().split('\n');
			if (lines.length < 3) return section; // Not a valid table section
			
			// Step 2a: Extract header
			let header = lines[0].trim();
			let transposedHeader = header + " (Transposed)";
			// console.log("transposedHeader:",transposedHeader);
			
			// Step 2b: Extract table rows, ignore first two lines
			let tableRows = lines.slice(3).map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));
			// console.log("tableRows:",tableRows);
			
			// Check if tableRows has data
			if (tableRows.length === 0 || tableRows[0].length === 0) {
				return section; // Return original if no valid table rows are found
			}

			// Separate the first two rows (0 and 1) and the rest for transposing
			let firstTwoRows = tableRows.slice(0, 2);
			let restRows = tableRows.slice(2);
			
			// Step 2c: Transpose the table
			let transposedRows = transposeArray(restRows);
			// console.log("transposedRows:",transposedRows);
			
			// Step 2d: Add two empty rows at the start
			let columnCount = transposedRows[0].length;
			let firstRow = '| ' + Array(columnCount).fill(' ').join(' | ') + ' |';
			let separatorRow = '| ' + Array(columnCount).fill('-').join(' | ') + ' |';
			
			let transposedTable = [
				firstRow,
				separatorRow,
				...transposedRows.map(row => '| ' + row.join(' | ') + ' |')
			].join('\n');
			
			// Step 2e: Combine header with transposed table
			return `${transposedHeader}\n\n\n${transposedTable}`;
		});
		
		// console.log("processedSections:",processedSections);

		// Step 3: Reassemble the processed sections
		return processedSections.join('\n\n---\n\n');
	}

	// Helper function to transpose a 2D array
	function transposeArray(array) {
		return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
	}

	const transposeContent = transposeMarkdownTables(cleanedContent);
	// console.log("transposeContent:",transposeContent);

	// *************************************************************** //
	
	const noteUUIDx = noteUUID;
	const note = await app.notes.find(noteUUIDx);

	const cleanedContentz = `
Note Name: ${note.name}
Note Tags: ${note.tags}
Note UUID: ${noteUUID}

---

${cleanedContent}

---

${transposeContent}

`;

    // Function to get the current date and time in YYMMDD and HHMMSS format
    function getCurrentDateTime() {
        const now = new Date();
        const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
        const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
        return { YYMMDD, HHMMSS };
    }
    const { YYMMDD, HHMMSS } = getCurrentDateTime();

    // Function to download the data as a text file
    function downloadTextFile(resultText, filename) {
        let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${YYMMDD}_${HHMMSS}_${noteUUID}_${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

	// Function to convert the markdown file into csv
	function convertMarkdownToCSV(content) {
		// Step 1: Remove #, ##, ### at the start of lines but keep the content
		let cleanedContent = content.split('\n').map(line => {
			return line.replace(/^#+\s*/, ''); // Remove leading # followed by any amount of spaces
		}).join('\n');
		
		// Step 2: Split the content by lines
		let lines = cleanedContent.split('\n');

		// Step 3: Process each line (remove pipes and add commas + quotes)
		let csvLines = lines.map(line => {
			// Skip lines that don't represent a table (those that don't contain '|')
			if (!line.includes('|')) return '';

			// Remove leading and trailing pipes and trim spaces
			let cleanedLine = line.trim().replace(/^\|/, '').replace(/\|$/, '').trim();

			// Replace pipes with commas, add quotes around each value
			let csvLine = cleanedLine.split('|').map(cell => `"${cell.trim()}"`).join(',');

			return csvLine;
		}).filter(line => line !== ''); // Remove any empty lines

		// Step 4: Join all processed lines to form CSV content
		return csvLines.join('\n');
	}

    // Determine the format and trigger the appropriate download
    if (result === "3") {
		const newNoteName = `Tables Copy ${YYMMDD}_${HHMMSS}`;
		const newTagName = ['-reports/-tables-copy'];
		let noteUUIDz = await app.createNote(newNoteName, newTagName);
		await app.replaceNoteContent({ uuid: noteUUIDz }, cleanedContentz);
		await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
        // console.log("cleanedContentz:", cleanedContentz);
    } else if (result === "2") {
        downloadTextFile(cleanedContentz, "Markdown_Tables.md");
        // console.log("cleanedContentz:", cleanedContentz);
    } else if (result === "4") {
        const csvContent = convertMarkdownToCSV(cleanedContentz);
        downloadTextFile(csvContent, "Markdown_Tables.csv");
        // console.log("csvContent:", csvContent);
    } else if (result === "1") {

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Advanced Charts with Markdown Data</title>
      <!-- Include Chart.js -->
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <!-- Include chartjs-chart-box-plot -->
      <!-- <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-box-plot@1.1.2/dist/chartjs-chart-box-plot.min.js"></script> -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
         body {
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         margin: 0;
         font-family: Arial, sans-serif;
         }
         .container {
         display: flex;
         width: 90%;
         max-width: 1600px;
         height: 80%;
         font-size: 13px;
         background-color: rgb(245,245,245);
         }
         .chart-options {
         flex: 1;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         padding: 10px;
         box-shadow: 2px 0 5px rgba(0,0,0,0.1);
         }
         .chart-options label {
         margin-bottom: 10px;
         }
         .axis-select {
         display: flex;
         flex-direction: column;
         margin-top: 20px;
         }
         .chart-container {
         flex: 5;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 10px;
         }
         .chart-container canvas {
         width: 100%;
         height: 100%;
         }
         .axis-dropdowns {
         flex: 1;
         display: flex;
         flex-direction: column;
         align-items: flex-center;
         padding: 10px;
         box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
         }
         .axis-dropdowns select {
         margin-bottom: 10px;
         }
         .info-button {
         font-size: 12px; /* Adjust the size as needed */
         padding: 0; /* Optional: remove default padding */
         border: none; /* Optional: remove default border */
         background: transparent; /* Optional: remove default background */
         }
         .tooltip {
         position: relative;
         display: inline-block;
         cursor: pointer;
         font-size: 12px; /* Adjust size of the info icon */
         }
         .tooltip .tooltiptext {
         visibility: hidden;
         width: 200px; /* Adjust width as needed */
         background-color: #555; /* Background color of the tooltip */
         color: #fff; /* Text color */
         text-align: center;
         border-radius: 5px;
         padding: 5px;
         position: absolute;
         z-index: 1;
         bottom: 125%; /* Position above the info icon */
         left: 50%;
         margin-left: -100px; /* Center the tooltip */
         opacity: 0;
         transition: opacity 0.3s;
         }
         .tooltip:hover .tooltiptext {
         visibility: visible;
         opacity: 1;
         }
		/* Footer styles */
		footer {
			position: fixed; /* Fixes the footer at the bottom */
			left: 0; /* Aligns the footer to the far left */
			bottom: 0; /* Aligns the footer to the bottom */
			width: 100%; /* Makes the footer span the full width of the page */
			padding: 10px; /* Adds some padding */
			text-align: left; /* Aligns text to the left */
			margin: 0; /* Removes default margins */
			background: none; /* Removes any background color */
			color: #000; /* Sets text color (adjust as needed) */
			font-size: 14px; /* Adjusts font size */
		}

		footer a {
			color: #ffeb3b; /* Adjust color if needed */
			text-decoration: none;
		}

		footer a:hover {
			text-decoration: underline;
		}
      </style>
   </head>
   <body>
      <div class="container">
         <div class="chart-options">
            <center>Simple Charts:</center>
            <br>
            <label>
            <input type="radio" name="chartType" value="line" checked> Line Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Line Chart shows trends over time or categories with lines connecting data points.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="area" checked> Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <!--<label>
            <input type="radio" name="chartType" value="boxplot" checked> Box Plot Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label> -->
            <label>
            <input type="radio" name="chartType" value="bar"> Bar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Bar Chart compares quantities across different categories with rectangular bars.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
			<label>
            <input type="radio" name="chartType" value="histogram"> Histogram
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Histogram shows the distribution of a dataset with bars representing frequency of data ranges.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pie"> Pie Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pie Chart displays proportions of a whole with slices of a circle.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            </label>
            <label>
            <input type="radio" name="chartType" value="doughnut"> Doughnut Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Doughnut charts are used to show the proportions of categorical data, with the size of each piece representing the proportion of each category.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="polarArea"> Polar Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="waterfall"> Waterfall Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Waterfall Chart displays cumulative values with bars showing the impact of incremental changes.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <br>
            <center>Advanced Charts:</center>
            <br>
            <label>
            <input type="radio" name="chartType" value="mixed"> Mixed Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Mixed Chart combines a bar chart with a line chart to show the relative importance of two different factors.<hr>Note: Select Dimensions/Measures in X-Axis (Line) & Measures in Y-Axis (Bars).</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pareto"> Pareto Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pareto Chart combines a bar chart with a line chart to show the relative importance of different factors.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="scatter"> Scatter Plot
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Scatter Plot shows the relationship between two numerical variables with points plotted on an X-Y axis.<hr>Note: Select Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="bubble"> 3D Bubble Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A 3D Bubble Chart represents three variables with bubbles of varying size, and points plotted on an X-Y axis.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="radar"> 3D Radar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Radar chart displays multivariate data stacked at an axis with the same central point.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
            </span>
            </label>

			</div>
         <div class="chart-container">
            <canvas id="myChart" width="400" height="200"></canvas>
         </div>
         <div class="axis-dropdowns">
            <div class="axis-select">
               <br><br>
               <label for="tableSelect"> Select Table:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Lists all the Tables in the Current Note!<hr>If the data is in Row Format, then use (Transposed)</span>
               </span>
               </label>
               <select id="tableSelect" multiple></select>
               <br>
               <label for="xAxisSelect"> Select X-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Horizontal Line / Axis!</span>
               </span>
               </label>
               <select id="xAxisSelect" multiple></select>
               <label for="yAxisSelect"> Select Y-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Vertical Line / Axis!</span>
               </span>
               </label>
               <select id="yAxisSelect" multiple></select>
               <label for="zAxisSelect"> Select Z-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Depth / Size!</span>
               </span>
               </label>
               <select id="zAxisSelect" multiple></select>
               <br>
			   <label> Note Name:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${note.name}</span>
               </span>
			   </label>
			   <label> Note Tags:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${note.tags}</span>
               </span>
			   </label>
			   <label> Note UUID:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${noteUUID}</span>
               </span>
			   </label>
			   <br>
				<label for="easingSelect"> Select Easing Function:
					<span class="tooltip">
						<i class="fa fa-info-circle" style="color:blue"></i>
						<span class="tooltiptext">Choose how the animation progresses over time.</span>
					</span>
				</label>
				<select id="easingSelect">
					<option value="linear">Linear</option>
					<option value="easeInQuad">Ease In Quad</option>
					<option value="easeOutQuad">Ease Out Quad</option>
					<option value="easeInOutQuad">Ease In Out Quad</option>
					<option value="easeInCubic">Ease In Cubic</option>
					<option value="easeOutCubic">Ease Out Cubic</option>
					<option value="easeInOutCubic">Ease In Out Cubic</option>
					<option value="easeInQuart">Ease In Quart</option>
					<option value="easeOutQuart">Ease Out Quart</option>
					<option value="easeInOutQuart">Ease In Out Quart</option>
					<option value="easeInQuint">Ease In Quint</option>
					<option value="easeOutQuint">Ease Out Quint</option>
					<option value="easeInOutQuint">Ease In Out Quint</option>
					<option value="easeInBounce">Ease In Bounce</option>
					<option value="easeOutBounce">Ease Out Bounce</option>
					<option value="easeInOutBounce">Ease In Out Bounce</option>
					<option value="easeInElastic">Ease In Elastic</option>
					<option value="easeOutElastic">Ease Out Elastic</option>
					<option value="easeInOutElastic">Ease In Out Elastic</option>
					<option value="easeInBack">Ease In Back</option>
					<option value="easeOutBack">Ease Out Back</option>
					<option value="easeInOutBack">Ease In Out Back</option>
				</select>
            </div>
         </div>
      </div>
	<footer>
		<p>&copy; BKK 2024 | <a href="https://public.amplenote.com/sDBcbB/graph-utility" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
	</footer>
      <script>
	  
        _loadLibrary("https://cdn.jsdelivr.net/npm/chart.js").then(() => {
			
         // Sample markdown data
         const markdownData = \`
${cleanedContent}

---

${transposeContent}
\`;
         
         // Function to parse the markdown data
		function parseMarkdownTables(markdown) {
			// Split the markdown content into sections based on the '---' delimiter
			const sections = markdown.split(/\\n---\\n/).filter(section => section.trim());
			
			// Extract tables from each section
			return sections.map(section => {
				const lines = section.split('\\n').filter(line => line.trim());
				
				// Assuming the first line is the table title
				const title = lines[0].replace(/^#\\s*/, '');  // Remove '#' and any leading space
				
				// Get the table data (excluding title line)
				const tableData = lines.slice(1).join('\\n').trim();
				
				return { title, tableData };
			});
		}

		// Parse the markdown data
		const tablesz = parseMarkdownTables(markdownData);
		const tables = tablesz.map(table => table.tableData);

		// Get the select element
		const tableSelect = document.getElementById('tableSelect');

		// Populate the select element with table titles
		tablesz.forEach((table, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = table.title;
			tableSelect.appendChild(option);
		});
         
         // console.log("tables:", tables);
         let markdownTable = tables[0];
         
         // Function to parse a markdown table
         function parseMarkdownTable(mdTable) {
             if (!mdTable) {
                 console.error("Markdown table is undefined or empty.");
                 return { headers: [], data: [] };
             }
         
             const rows = mdTable.trim().split('\\n');
             if (rows.length < 3) {
                 console.error("Insufficient rows in markdown table to parse headers and data.");
                 return { headers: [], data: [] };
             }
         
             const headers = rows[2]?.split('|').slice(1, -1).map(header => header.trim()) || [];
             const data = rows.slice(3).map(row => {
                 const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
                 const rowObject = {};
                 headers.forEach((header, index) => {
                     rowObject[header] = isNaN(cells[index]) ? cells[index] : parseFloat(cells[index]);
                 });
                 return rowObject;
             });
         
             // console.log("Parsed headers:", headers);
             // console.log("Parsed data:", data);
         
             return {
                 headers,
                 data
             };
         }
         
         		// Initial setup
         		// const { headers, data } = parseMarkdownTable(markdownTable);
         		//updateAxisSelections(headers);
         
         		 // console.log('headers:', headers);
         		 // console.log('data:', data);
                  // Populate axis selection dropdowns with headers
         // Function to update axis selections and data
         function updateAxisSelectionsAndData(mdTable) {
             const { headers, data } = parseMarkdownTable(mdTable);
         
             if (!headers.length || !data.length) {
                 console.error("Failed to parse markdown table:", mdTable);
                 return { headers: [], data: [] };
             }
         
             // console.log("Updating axis selections with headers:", headers);
         
             // Preserve the current selections
             const currentXSelection = xAxisSelect.value;
             const currentYSelection = yAxisSelect.value;
             const currentZSelection = zAxisSelect.value;
         
             // Clear existing options
             xAxisSelect.innerHTML = '';
             yAxisSelect.innerHTML = '';
             zAxisSelect.innerHTML = '';
         
             headers.forEach(header => {
                 const optionX = document.createElement('option');
                 optionX.value = header;
                 optionX.text = header;
                 xAxisSelect.appendChild(optionX);
         
                 const optionY = document.createElement('option');
                 optionY.value = header;
                 optionY.text = header;
                 yAxisSelect.appendChild(optionY);
         
                 const optionZ = document.createElement('option');
                 optionZ.value = header;
                 optionZ.text = header;
                 zAxisSelect.appendChild(optionZ);
             });
         
             // Restore previous selections if they are still valid, otherwise set to default
             if (headers.includes(currentXSelection)) {
                 xAxisSelect.value = currentXSelection;
             } else if (headers.length > 0) {
                 xAxisSelect.value = headers[0];
             }
         
             if (headers.includes(currentYSelection)) {
                 yAxisSelect.value = currentYSelection;
             } else if (headers.length > 1) {
                 yAxisSelect.value = headers[1];
             }
         
             if (headers.includes(currentZSelection)) {
                 zAxisSelect.value = currentZSelection;
             } else if (headers.length > 2) {
                 zAxisSelect.value = headers[2];
             }
         
             return { headers, data };
         }
      		
         // Chart related variables
         let chartType = 'line';
         let myChart;
         const ctx = document.getElementById('myChart').getContext('2d');
		 const easingSelect = document.getElementById('easingSelect');
         		 
		// Function to create a chart
		function createChart(type, headers, data) {
			if (!data || !headers || !data.length) {
				return;
			}

			if (myChart) {
				myChart.destroy();
			}

			const xAxis = xAxisSelect.value;
			const yAxis = yAxisSelect.value;
			const zAxis = zAxisSelect.value;

			let datasets = getDatasets(type, data, xAxis, yAxis, zAxis);

			myChart = new Chart(ctx, {
				type: getChartType(type),
				data: {
					labels: type === 'boxplot' ? [] : data.map(item => item[xAxis]),
					datasets: datasets
				},
				options: {
					animation: {
						animateRotate: true,   // Enable rotation animation for 'pie' and 'doughnut'
						animateScale: true,    // Enable scaling animation for 'radar' and 'polarArea'
						duration: 500,        // Duration of the animation in milliseconds
						easing: easingSelect.value // Easing function for the animation
					},
					scales: type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polarArea' ? {} : {
						x: {
							beginAtZero: true,
							title: {
								display: true,
								text: xAxis
							}
						},
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: yAxis
							}
						}
					},
					plugins: {
						legend: {
							display: type !== 'piez' && type !== 'doughnutz',
						},
						tooltip: {
							callbacks: {
								label: (context) => {
									if (type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polarArea') {
										return \`\${context.label}: \${context.raw}\`;
									}
									return \`\${context.dataset.label}: \${context.raw}\`;
								}
							}
						}
					}
				}
			});
		}
        
         // Initial setup
         const initialData = updateAxisSelectionsAndData(markdownTable);
         if (initialData.data.length > 0) {
             createChart(chartType, initialData.headers, initialData.data);
         } else {
             console.error("No data to initialize chart");
         }
         
         // Update and render chart on table selection change
         tableSelect.addEventListener('change', () => {
             const selectedIndex = tableSelect.value;
             markdownTable = tables[selectedIndex];
         
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             if (data.length > 0) {
                 createChart(chartType, headers, data);
             } else {
                 console.error("No data available after table selection");
             }
         });

		// Update chart animation on dropdown change
		easingSelect.addEventListener('change', () => {
			const selectedEasing = easingSelect.value;
			myChart.options.animation.easing = selectedEasing;
			createChart(chartType, initialData.headers, initialData.data);
		});
         
         // Event listeners for chart type change
         document.querySelectorAll('input[name="chartType"]').forEach(input => {
             input.addEventListener('change', (event) => {
                 chartType = event.target.value;
                 const { headers, data } = updateAxisSelectionsAndData(markdownTable);
                 createChart(chartType, headers, data);
             });
         });
         
                  // Documentation from https://www.chartjs.org/docs/latest/
                  function getDatasets(type, data, xAxis, yAxis, zAxis) {
                     switch (type) {
                         case 'line':
                             return [{
                  			label: \`\${yAxis} vs \${xAxis}\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis]
                  			})),
                  				fill: false, // change to true for area plot & false for line chart
                  				backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  				borderColor: 'rgba(75, 192, 192, 1)',
                  				borderWidth: 1,
                             }];
                         case 'pie':
						 case 'doughnut':
                             return [{
                                 label: yAxis,
                                 data: data.map(item => item[yAxis]),
                                 backgroundColor: getRandomColors(data.length),
                                 borderColor: getRandomColors(data.length, false), // true to random color
                                 borderWidth: 1,
								 animation: {
									animateRotate: true,
									animateScale: true,
									duration: 800,
									easing: easingSelect.value
								}
                             }];
						case 'histogram':
							return [{
								label: yAxis,
								data: data.map(item => ({
									x: item[xAxis], // xAxis typically represents the bin range
									y: item[yAxis]
								})),
								backgroundColor: 'rgba(75, 192, 192, 0.5)', // More transparent color
								borderColor: 'rgba(75, 192, 192, 0.8)',
								borderWidth: 1,
								barPercentage: 1.0, // Full bar width
								categoryPercentage: 1.0,
								type: 'bar',
								// Additional histogram-specific settings
								// e.g., custom bins or scaling might be added here
							}];
                         case 'boxplot':
                             return [{
                                 label: yAxis,
                                 data: [
                                     {
                                         min: Math.min(...data.map(item => item[yAxis])),
                                         q1: calculateQuartile(data.map(item => item[yAxis]), 1),
                                         median: calculateMedian(data.map(item => item[yAxis])),
                                         q3: calculateQuartile(data.map(item => item[yAxis]), 3),
                                         max: Math.max(...data.map(item => item[yAxis])),
                                     }
                                 ],
                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                 borderColor: 'rgba(75, 192, 192, 1)',
                                 borderWidth: 1,
                             }];
                         case 'area':
                             return [{
                                 label: \`\${yAxis} vs \${xAxis}\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis]
                  			})),
                  			fill: 'origin',
                  			backgroundColor: 'rgba(75, 191, 191, 0.2)',
                  			borderColor: 'rgba(75, 191, 191, 1)',
                  			borderWidth: 1,
                             }];
                         case 'bubble':
                             return [{
                  			label: \`\${yAxis} vs \${xAxis} (Radius: \${zAxis})\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis],
                  				r: type === 'bubble' ? (item[zAxis] || 5) : undefined
                  			})),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                             }];
                         case 'pareto':
                             return [{
                  			label: \`\${yAxis} (Bars)\`,
                  			type: 'bar',
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                  		}, {
                  			label: 'Cumulative Percentage (Line)',
                  			type: 'line',
                  			data: data.map((item, index) => {
                  				const total = data.reduce((acc, curr) => acc + curr[yAxis], 0);
                  				const cumulative = data.slice(0, index + 1).reduce((acc, curr) => acc + curr[yAxis], 0);
                  				return (cumulative / total) * 100;
                  			}),
                  			borderColor: 'rgba(255, 99, 132, 1)',
                  			fill: false,
                  			borderWidth: 2,
                             }];
                         case 'mixed':
                             return [{
                  			label: \`\${yAxis} (Bars)\`,
                  			type: 'bar',
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                  		}, {
                  			label: \`\${xAxis} (Line)\`,
                  			type: 'line',
                  			data: data.map(item => item[xAxis]),
							borderColor: 'rgba(255, 99, 132, 1)',
                  			borderWidth: 1,
                             }];
                         case 'waterfall':
                             return [{
                  			label: \`\${yAxis}\`,
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: (ctx) => {
                  				const index = ctx.dataIndex;
                  				return index % 2 === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132,0.2)';
                  			},
                  			borderColor: (ctx) => {
                  				const index = ctx.dataIndex;
                  				return index % 2 === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
                  			},
                  			borderWidth: 1,
                             }];			
						case 'polarArea':
							return [{
								label: yAxis,
								data: data.map(item => item[yAxis]),
								backgroundColor: getRandomColors(data.length),
								borderColor: getRandomColors(data.length, false),
								borderWidth: 1,
								animation: {
									animateRotate: true,
									animateScale: true,
									duration: 800,
									easing: easingSelect.value
								}
							}];
						case 'radar':
							return [
								{
									label: \`\${xAxis}\`,
									data: data.map(item => item[xAxis]),
									backgroundColor: 'rgba(75, 192, 192, 0.2)',
									borderColor: 'rgba(75, 192, 192, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 500,
										easing: easingSelect.value
									 }
								},
								{
									label: \`\${yAxis}\`,
									data: data.map(item => item[yAxis]),
									backgroundColor: 'rgba(153, 102, 255, 0.2)',
									borderColor: 'rgba(153, 102, 255, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 600,
										easing: easingSelect.value
									 }
								},
								{
									label: \`\${zAxis}\`,
									data: data.map(item => item[zAxis]),
									backgroundColor: 'rgba(255, 159, 64, 0.2)',
									borderColor: 'rgba(255, 159, 64, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 700,
										easing: easingSelect.value
									 }
								}
							];
						case 'scatter':
							return [{
								label: \`\${yAxis} vs \${xAxis}\`,
								data: data.map(item => ({ x: item[xAxis], y: item[yAxis] })),
								backgroundColor: 'rgba(75, 192, 192, 0.2)',
								borderColor: 'rgba(75, 192, 192, 1)',
								borderWidth: 1,
							}];
						 // Add cases for other chart types
                         default:
                             return [{
                                 label: \`\${yAxis} vs \${xAxis}\`,
                                 data: data.map(item => ({
                                     x: item[xAxis],
                                     y: item[yAxis],
                                     r: type === 'bubble' ? (item[zAxis] || 5) : undefined
                                 })),
                                 fill: type === 'area',
                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                 borderColor: 'rgba(75, 192, 192, 1)',
                                 borderWidth: 1,
                             }];
                     }
                  }
                  
					// Helper function to get Chart.js type
					function getChartType(type) {
						const customTypes = ['histogram', 'boxplot', 'pareto', 'waterfall'];
						if (customTypes.includes(type)) {
							return 'bar'; // Custom types are mapped to 'bar'
						}
						switch (type) {
							case 'line':
							case 'bar':
							case 'bubble':
							case 'doughnut':
							case 'pie':
							case 'polarArea':
							case 'radar':
							case 'scatter':
								return type;
							case 'area':
								return 'line'; // 'area' is implemented as a 'line' chart with filling
							default:
								return 'line';
						}
					}
                  
                  function getRandomColors(count, isBorder = false) {
                     const colors = [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)'
                     ];
                     const borderColors = [
                         'rgba(255, 99, 132, 1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)'
                     ];
                     return Array.from({ length: count }, (_, i) => isBorder ? borderColors[i % borderColors.length] : colors[i % colors.length]);
                  }
                  
                  function calculateQuartile(arr, quartile) {
                             arr.sort((a, b) => a - b);
                             const q = (quartile / 4) * (arr.length + 1);
                             return arr[Math.floor(q) - 1];
                         }
                  
                         function calculateMedian(arr) {
                             arr.sort((a, b) => a - b);
                             const mid = Math.floor(arr.length / 2);
                             return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
                         }
                  
                         function calculateCumulativePercentage(data, field) {
                             const total = data.reduce((sum, item) => sum + item[field], 0);
                             let cumulative = 0;
                             return data.map(item => {
                                 cumulative += item[field];
                                 return (cumulative / total) * 100;
                             });
                         }
                  
                         function calculateWaterfallData(data, field) {
                             let cumulative = 0;
                             return data.map(item => {
                                 cumulative += item[field];
                                 return { x: item.Date, y: cumulative };
                             });
                         }
                  
                  
                         // Event listeners for chart type change
                         document.querySelectorAll('input[name="chartType"]').forEach(input => {
                             input.addEventListener('change', (event) => {
                                 chartType = event.target.value;
                                 createChart(chartType);
                             });
                         });

         // Add event listeners for axis selections
         xAxisSelect.addEventListener('change', () => {
             // console.log("xAxis changed:", xAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
         
         yAxisSelect.addEventListener('change', () => {
             // console.log("yAxis changed:", yAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
         
         zAxisSelect.addEventListener('change', () => {
             // console.log("zAxis changed:", zAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
                  // Initial chart rendering
                  // createChart(chartType);

        });

    function _loadLibrary(url) {
        return new Promise(function(resolve) {
            const script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            script.addEventListener("load", function() {
                resolve(true);
            });
            document.body.appendChild(script);
        });
    }         
               
      </script>
   </body>
</html>
`;

        downloadTextFile(htmlTemplate, "InteractiveCharts.html");
        // console.log("htmlTemplate:", htmlTemplate);
  }
},
/* ----------------------------------- */
"Viewer!":  async function (app, noteUUID) {
    // app.alert(noteUUID);
	await app.setSetting("Current_Note_UUID [Do not Edit!]", noteUUID);
	const noteUUIDz = noteUUID;
	  // Load the Chart.js library
	  // await this._loadChartJS();
	await app.insertNoteContent({ uuid: noteUUIDz },`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="2" />`);
	return null;
},
/* ----------------------------------- */
"Update!":  async function (app, noteUUID) {
    // app.alert(noteUUID);
	await app.setSetting("Current_Note_UUID [Do not Edit!]", noteUUID);
	// const noteUUIDz = noteUUID;
	  // Load the Chart.js library
	  // await this._loadChartJS();
	// await app.insertNoteContent({ uuid: noteUUIDz },`<object data="plugin://${ app.context.pluginUUID }" data-aspect-ratio="2" />`);
	app.alert("Current Note is updated for your Graph Utlity Viewer!");
	return null;
  }
},
/* ----------------------------------- */
/* async _loadChartJS() {
  // Check if the library is already loaded
  if (this._haveLoadedChartJS) return Promise.resolve(true);
 
  return new Promise(function(resolve) {
    // Create a new script element
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js");

    // Listen for the load event
    script.addEventListener("load", function() {
      this._haveLoadedChartJS = true; // Set the flag to indicate the library is loaded
      resolve(true); // Resolve the promise
    });

    // Append the script to the document body
    document.body.appendChild(script);
  });
}, */
/* ----------------------------------- */
async renderEmbed(app, ...args) {
	const noteUUID = await app.settings["Current_Note_UUID [Do not Edit!]"];
	// console.log("noteUUID", noteUUID);
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    // console.log("Initial markdown:", markdown);

    // Function to remove HTML comments
    const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();

	// *************************************************************** //

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

	// *************************************************************** //

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
          // currentTable.push(`| ${headers} |`); // Automatically Adding Columns is disabled for now!
          // console.log("Added headers to empty table row:", currentTable);
        }

        currentTable.push(line);
        // console.log("Current table content:", currentTable);
      } else if (inTable) {
        inTable = false;
        // console.log("End of table detected, inTable set to false.");

        const tableContent = currentTable.join('\n');
        // console.log("Current table content before cleaning:", tableContent);

        // tables.push(removeEmptyRowsAndColumns(tableContent));
        tables.push(tableContent);
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

	// *************************************************************** //

	function transposeMarkdownTables(content) {
		// Step 1: Split content based on "---"
		let sections = content.split('---');
		// console.log("sections:",sections);
		
		let processedSections = sections.map(section => {
			let lines = section.trim().split('\n');
			if (lines.length < 3) return section; // Not a valid table section
			
			// Step 2a: Extract header
			let header = lines[0].trim();
			let transposedHeader = header + " (Transposed)";
			// console.log("transposedHeader:",transposedHeader);
			
			// Step 2b: Extract table rows, ignore first two lines
			let tableRows = lines.slice(3).map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));
			// console.log("tableRows:",tableRows);
			
			// Check if tableRows has data
			if (tableRows.length === 0 || tableRows[0].length === 0) {
				return section; // Return original if no valid table rows are found
			}

			// Separate the first two rows (0 and 1) and the rest for transposing
			let firstTwoRows = tableRows.slice(0, 2);
			let restRows = tableRows.slice(2);
			
			// Step 2c: Transpose the table
			let transposedRows = transposeArray(restRows);
			// console.log("transposedRows:",transposedRows);
			
			// Step 2d: Add two empty rows at the start
			let columnCount = transposedRows[0].length;
			let firstRow = '| ' + Array(columnCount).fill(' ').join(' | ') + ' |';
			let separatorRow = '| ' + Array(columnCount).fill('-').join(' | ') + ' |';
			
			let transposedTable = [
				firstRow,
				separatorRow,
				...transposedRows.map(row => '| ' + row.join(' | ') + ' |')
			].join('\n');
			
			// Step 2e: Combine header with transposed table
			return `${transposedHeader}\n\n\n${transposedTable}`;
		});
		
		// console.log("processedSections:",processedSections);

		// Step 3: Reassemble the processed sections
		return processedSections.join('\n\n---\n\n');
	}

	// Helper function to transpose a 2D array
	function transposeArray(array) {
		return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
	}

	const transposeContent = transposeMarkdownTables(cleanedContent);
	// console.log("transposeContent:",transposeContent);

	// *************************************************************** //
	
	const noteUUIDx = noteUUID;
	const note = await app.notes.find(noteUUIDx);

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Advanced Charts with Markdown Data</title>
      <!-- Include Chart.js -->
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <!-- Include chartjs-chart-box-plot -->
      <!-- <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-box-plot@1.1.2/dist/chartjs-chart-box-plot.min.js"></script> -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
         body {
         display: flex;
         justify-content: center;
         align-items: center;
         height: 100vh;
         margin: 0;
         font-family: Arial, sans-serif;
         }
         .container {
         display: flex;
         width: 90%;
         max-width: 1600px;
         height: 80%;
         font-size: 13px;
         background-color: rgb(245,245,245);
         }
         .chart-options {
         flex: 1;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
         padding: 10px;
         box-shadow: 2px 0 5px rgba(0,0,0,0.1);
         }
         .chart-options label {
         margin-bottom: 10px;
         }
         .axis-select {
         display: flex;
         flex-direction: column;
         margin-top: 20px;
         }
         .chart-container {
         flex: 5;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 10px;
         }
         .chart-container canvas {
         width: 100%;
         height: 100%;
         }
         .axis-dropdowns {
         flex: 1;
         display: flex;
         flex-direction: column;
         align-items: flex-center;
         padding: 10px;
         box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
         }
         .axis-dropdowns select {
         margin-bottom: 10px;
         }
         .info-button {
         font-size: 12px; /* Adjust the size as needed */
         padding: 0; /* Optional: remove default padding */
         border: none; /* Optional: remove default border */
         background: transparent; /* Optional: remove default background */
         }
         .tooltip {
         position: relative;
         display: inline-block;
         cursor: pointer;
         font-size: 12px; /* Adjust size of the info icon */
         }
         .tooltip .tooltiptext {
         visibility: hidden;
         width: 200px; /* Adjust width as needed */
         background-color: #555; /* Background color of the tooltip */
         color: #fff; /* Text color */
         text-align: center;
         border-radius: 5px;
         padding: 5px;
         position: absolute;
         z-index: 1;
         bottom: 125%; /* Position above the info icon */
         left: 50%;
         margin-left: -100px; /* Center the tooltip */
         opacity: 0;
         transition: opacity 0.3s;
         }
         .tooltip:hover .tooltiptext {
         visibility: visible;
         opacity: 1;
         }
		/* Footer styles */
		footer {
			position: fixed; /* Fixes the footer at the bottom */
			left: 0; /* Aligns the footer to the far left */
			bottom: 0; /* Aligns the footer to the bottom */
			width: 100%; /* Makes the footer span the full width of the page */
			padding: 10px; /* Adds some padding */
			text-align: left; /* Aligns text to the left */
			margin: 0; /* Removes default margins */
			background: none; /* Removes any background color */
			color: #000; /* Sets text color (adjust as needed) */
			font-size: 14px; /* Adjusts font size */
		}

		footer a {
			color: #ffeb3b; /* Adjust color if needed */
			text-decoration: none;
		}

		footer a:hover {
			text-decoration: underline;
		}
      </style>
   </head>
   <body>
      <div class="container">
         <div class="chart-options">
            <center>Simple Charts:</center>
            <br>
            <label>
            <input type="radio" name="chartType" value="line" checked> Line Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Line Chart shows trends over time or categories with lines connecting data points.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="area" checked> Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <!--<label>
            <input type="radio" name="chartType" value="boxplot" checked> Box Plot Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<hr>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label> -->
            <label>
            <input type="radio" name="chartType" value="bar"> Bar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Bar Chart compares quantities across different categories with rectangular bars.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
			<label>
            <input type="radio" name="chartType" value="histogram"> Histogram
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Histogram shows the distribution of a dataset with bars representing frequency of data ranges.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pie"> Pie Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pie Chart displays proportions of a whole with slices of a circle.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            </label>
            <label>
            <input type="radio" name="chartType" value="doughnut"> Doughnut Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Doughnut charts are used to show the proportions of categorical data, with the size of each piece representing the proportion of each category.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="polarArea"> Polar Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="waterfall"> Waterfall Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Waterfall Chart displays cumulative values with bars showing the impact of incremental changes.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <br>
            <center>Advanced Charts:</center>
            <br>
            <label>
            <input type="radio" name="chartType" value="mixed"> Mixed Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Mixed Chart combines a bar chart with a line chart to show the relative importance of two different factors.<hr>Note: Select Dimensions/Measures in X-Axis (Line) & Measures in Y-Axis (Bars).</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pareto"> Pareto Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pareto Chart combines a bar chart with a line chart to show the relative importance of different factors.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="scatter"> Scatter Plot
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Scatter Plot shows the relationship between two numerical variables with points plotted on an X-Y axis.<hr>Note: Select Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="bubble"> 3D Bubble Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A 3D Bubble Chart represents three variables with bubbles of varying size, and points plotted on an X-Y axis.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="radar"> 3D Radar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Radar chart displays multivariate data stacked at an axis with the same central point.<hr>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
            </span>
            </label>

			</div>
         <div class="chart-container">
            <canvas id="myChart" width="400" height="200"></canvas>
         </div>
         <div class="axis-dropdowns">
            <div class="axis-select">
               <br><br>
               <label for="tableSelect"> Select Table:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Lists all the Tables in the Current Note!<hr>If the data is in Row Format, then use (Transposed)</span>
               </span>
               </label>
               <select id="tableSelect" multiple></select>
               <br>
               <label for="xAxisSelect"> Select X-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Horizontal Line / Axis!</span>
               </span>
               </label>
               <select id="xAxisSelect" multiple></select>
               <label for="yAxisSelect"> Select Y-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Vertical Line / Axis!</span>
               </span>
               </label>
               <select id="yAxisSelect" multiple></select>
               <label for="zAxisSelect"> Select Z-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Depth / Size!</span>
               </span>
               </label>
               <select id="zAxisSelect" multiple></select>
               <br>
			   <label> Note Name:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${note.name}</span>
               </span>
			   </label>
			   <label> Note Tags:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${note.tags}</span>
               </span>
			   </label>
			   <label> Note UUID:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">${noteUUID}</span>
               </span>
			   </label>
			   <br>
				<label for="easingSelect"> Select Easing Function:
					<span class="tooltip">
						<i class="fa fa-info-circle" style="color:blue"></i>
						<span class="tooltiptext">Choose how the animation progresses over time.</span>
					</span>
				</label>
				<select id="easingSelect">
					<option value="linear">Linear</option>
					<option value="easeInQuad">Ease In Quad</option>
					<option value="easeOutQuad">Ease Out Quad</option>
					<option value="easeInOutQuad">Ease In Out Quad</option>
					<option value="easeInCubic">Ease In Cubic</option>
					<option value="easeOutCubic">Ease Out Cubic</option>
					<option value="easeInOutCubic">Ease In Out Cubic</option>
					<option value="easeInQuart">Ease In Quart</option>
					<option value="easeOutQuart">Ease Out Quart</option>
					<option value="easeInOutQuart">Ease In Out Quart</option>
					<option value="easeInQuint">Ease In Quint</option>
					<option value="easeOutQuint">Ease Out Quint</option>
					<option value="easeInOutQuint">Ease In Out Quint</option>
					<option value="easeInBounce">Ease In Bounce</option>
					<option value="easeOutBounce">Ease Out Bounce</option>
					<option value="easeInOutBounce">Ease In Out Bounce</option>
					<option value="easeInElastic">Ease In Elastic</option>
					<option value="easeOutElastic">Ease Out Elastic</option>
					<option value="easeInOutElastic">Ease In Out Elastic</option>
					<option value="easeInBack">Ease In Back</option>
					<option value="easeOutBack">Ease Out Back</option>
					<option value="easeInOutBack">Ease In Out Back</option>
				</select>
            </div>
         </div>
      </div>
	<footer>
		<p>&copy; BKK 2024 | <a href="https://public.amplenote.com/sDBcbB/graph-utility" target="_blank" style="color: #ffeb3b; text-decoration: none;">Open Source</a></p>
	</footer>
      <script>
	  
        _loadLibrary("https://cdn.jsdelivr.net/npm/chart.js").then(() => {
			
         // Sample markdown data
         const markdownData = \`
${cleanedContent}

---

${transposeContent}
\`;
         
         // Function to parse the markdown data
		function parseMarkdownTables(markdown) {
			// Split the markdown content into sections based on the '---' delimiter
			const sections = markdown.split(/\\n---\\n/).filter(section => section.trim());
			
			// Extract tables from each section
			return sections.map(section => {
				const lines = section.split('\\n').filter(line => line.trim());
				
				// Assuming the first line is the table title
				const title = lines[0].replace(/^#\\s*/, '');  // Remove '#' and any leading space
				
				// Get the table data (excluding title line)
				const tableData = lines.slice(1).join('\\n').trim();
				
				return { title, tableData };
			});
		}

		// Parse the markdown data
		const tablesz = parseMarkdownTables(markdownData);
		const tables = tablesz.map(table => table.tableData);

		// Get the select element
		const tableSelect = document.getElementById('tableSelect');

		// Populate the select element with table titles
		tablesz.forEach((table, index) => {
			const option = document.createElement('option');
			option.value = index;
			option.textContent = table.title;
			tableSelect.appendChild(option);
		});
         
         // console.log("tables:", tables);
         let markdownTable = tables[0];
         
         // Function to parse a markdown table
         function parseMarkdownTable(mdTable) {
             if (!mdTable) {
                 console.error("Markdown table is undefined or empty.");
                 return { headers: [], data: [] };
             }
         
             const rows = mdTable.trim().split('\\n');
             if (rows.length < 3) {
                 console.error("Insufficient rows in markdown table to parse headers and data.");
                 return { headers: [], data: [] };
             }
         
             const headers = rows[2]?.split('|').slice(1, -1).map(header => header.trim()) || [];
             const data = rows.slice(3).map(row => {
                 const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
                 const rowObject = {};
                 headers.forEach((header, index) => {
                     rowObject[header] = isNaN(cells[index]) ? cells[index] : parseFloat(cells[index]);
                 });
                 return rowObject;
             });
         
             // console.log("Parsed headers:", headers);
             // console.log("Parsed data:", data);
         
             return {
                 headers,
                 data
             };
         }
         
         		// Initial setup
         		// const { headers, data } = parseMarkdownTable(markdownTable);
         		//updateAxisSelections(headers);
         
         		 // console.log('headers:', headers);
         		 // console.log('data:', data);
                  // Populate axis selection dropdowns with headers
         // Function to update axis selections and data
         function updateAxisSelectionsAndData(mdTable) {
             const { headers, data } = parseMarkdownTable(mdTable);
         
             if (!headers.length || !data.length) {
                 console.error("Failed to parse markdown table:", mdTable);
                 return { headers: [], data: [] };
             }
         
             // console.log("Updating axis selections with headers:", headers);
         
             // Preserve the current selections
             const currentXSelection = xAxisSelect.value;
             const currentYSelection = yAxisSelect.value;
             const currentZSelection = zAxisSelect.value;
         
             // Clear existing options
             xAxisSelect.innerHTML = '';
             yAxisSelect.innerHTML = '';
             zAxisSelect.innerHTML = '';
         
             headers.forEach(header => {
                 const optionX = document.createElement('option');
                 optionX.value = header;
                 optionX.text = header;
                 xAxisSelect.appendChild(optionX);
         
                 const optionY = document.createElement('option');
                 optionY.value = header;
                 optionY.text = header;
                 yAxisSelect.appendChild(optionY);
         
                 const optionZ = document.createElement('option');
                 optionZ.value = header;
                 optionZ.text = header;
                 zAxisSelect.appendChild(optionZ);
             });
         
             // Restore previous selections if they are still valid, otherwise set to default
             if (headers.includes(currentXSelection)) {
                 xAxisSelect.value = currentXSelection;
             } else if (headers.length > 0) {
                 xAxisSelect.value = headers[0];
             }
         
             if (headers.includes(currentYSelection)) {
                 yAxisSelect.value = currentYSelection;
             } else if (headers.length > 1) {
                 yAxisSelect.value = headers[1];
             }
         
             if (headers.includes(currentZSelection)) {
                 zAxisSelect.value = currentZSelection;
             } else if (headers.length > 2) {
                 zAxisSelect.value = headers[2];
             }
         
             return { headers, data };
         }
      		
         // Chart related variables
         let chartType = 'line';
         let myChart;
         const ctx = document.getElementById('myChart').getContext('2d');
		 const easingSelect = document.getElementById('easingSelect');
         		 
		// Function to create a chart
		function createChart(type, headers, data) {
			if (!data || !headers || !data.length) {
				return;
			}

			if (myChart) {
				myChart.destroy();
			}

			const xAxis = xAxisSelect.value;
			const yAxis = yAxisSelect.value;
			const zAxis = zAxisSelect.value;

			let datasets = getDatasets(type, data, xAxis, yAxis, zAxis);

			myChart = new Chart(ctx, {
				type: getChartType(type),
				data: {
					labels: type === 'boxplot' ? [] : data.map(item => item[xAxis]),
					datasets: datasets
				},
				options: {
					animation: {
						animateRotate: true,   // Enable rotation animation for 'pie' and 'doughnut'
						animateScale: true,    // Enable scaling animation for 'radar' and 'polarArea'
						duration: 500,        // Duration of the animation in milliseconds
						easing: easingSelect.value // Easing function for the animation
					},
					scales: type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polarArea' ? {} : {
						x: {
							beginAtZero: true,
							title: {
								display: true,
								text: xAxis
							}
						},
						y: {
							beginAtZero: true,
							title: {
								display: true,
								text: yAxis
							}
						}
					},
					plugins: {
						legend: {
							display: type !== 'piez' && type !== 'doughnutz',
						},
						tooltip: {
							callbacks: {
								label: (context) => {
									if (type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polarArea') {
										return \`\${context.label}: \${context.raw}\`;
									}
									return \`\${context.dataset.label}: \${context.raw}\`;
								}
							}
						}
					}
				}
			});
		}
        
         // Initial setup
         const initialData = updateAxisSelectionsAndData(markdownTable);
         if (initialData.data.length > 0) {
             createChart(chartType, initialData.headers, initialData.data);
         } else {
             console.error("No data to initialize chart");
         }
         
         // Update and render chart on table selection change
         tableSelect.addEventListener('change', () => {
             const selectedIndex = tableSelect.value;
             markdownTable = tables[selectedIndex];
         
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             if (data.length > 0) {
                 createChart(chartType, headers, data);
             } else {
                 console.error("No data available after table selection");
             }
         });

		// Update chart animation on dropdown change
		easingSelect.addEventListener('change', () => {
			const selectedEasing = easingSelect.value;
			myChart.options.animation.easing = selectedEasing;
			createChart(chartType, initialData.headers, initialData.data);
		});
         
         // Event listeners for chart type change
         document.querySelectorAll('input[name="chartType"]').forEach(input => {
             input.addEventListener('change', (event) => {
                 chartType = event.target.value;
                 const { headers, data } = updateAxisSelectionsAndData(markdownTable);
                 createChart(chartType, headers, data);
             });
         });
         
                  // Documentation from https://www.chartjs.org/docs/latest/
                  function getDatasets(type, data, xAxis, yAxis, zAxis) {
                     switch (type) {
                         case 'line':
                             return [{
                  			label: \`\${yAxis} vs \${xAxis}\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis]
                  			})),
                  				fill: false, // change to true for area plot & false for line chart
                  				backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  				borderColor: 'rgba(75, 192, 192, 1)',
                  				borderWidth: 1,
                             }];
                         case 'pie':
						 case 'doughnut':
                             return [{
                                 label: yAxis,
                                 data: data.map(item => item[yAxis]),
                                 backgroundColor: getRandomColors(data.length),
                                 borderColor: getRandomColors(data.length, false), // true to random color
                                 borderWidth: 1,
								 animation: {
									animateRotate: true,
									animateScale: true,
									duration: 800,
									easing: easingSelect.value
								}
                             }];
						case 'histogram':
							return [{
								label: yAxis,
								data: data.map(item => ({
									x: item[xAxis], // xAxis typically represents the bin range
									y: item[yAxis]
								})),
								backgroundColor: 'rgba(75, 192, 192, 0.5)', // More transparent color
								borderColor: 'rgba(75, 192, 192, 0.8)',
								borderWidth: 1,
								barPercentage: 1.0, // Full bar width
								categoryPercentage: 1.0,
								type: 'bar',
								// Additional histogram-specific settings
								// e.g., custom bins or scaling might be added here
							}];
                         case 'boxplot':
                             return [{
                                 label: yAxis,
                                 data: [
                                     {
                                         min: Math.min(...data.map(item => item[yAxis])),
                                         q1: calculateQuartile(data.map(item => item[yAxis]), 1),
                                         median: calculateMedian(data.map(item => item[yAxis])),
                                         q3: calculateQuartile(data.map(item => item[yAxis]), 3),
                                         max: Math.max(...data.map(item => item[yAxis])),
                                     }
                                 ],
                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                 borderColor: 'rgba(75, 192, 192, 1)',
                                 borderWidth: 1,
                             }];
                         case 'area':
                             return [{
                                 label: \`\${yAxis} vs \${xAxis}\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis]
                  			})),
                  			fill: 'origin',
                  			backgroundColor: 'rgba(75, 191, 191, 0.2)',
                  			borderColor: 'rgba(75, 191, 191, 1)',
                  			borderWidth: 1,
                             }];
                         case 'bubble':
                             return [{
                  			label: \`\${yAxis} vs \${xAxis} (Radius: \${zAxis})\`,
                  			data: data.map(item => ({
                  				x: item[xAxis],
                  				y: item[yAxis],
                  				r: type === 'bubble' ? (item[zAxis] || 5) : undefined
                  			})),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                             }];
                         case 'pareto':
                             return [{
                  			label: \`\${yAxis} (Bars)\`,
                  			type: 'bar',
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                  		}, {
                  			label: 'Cumulative Percentage (Line)',
                  			type: 'line',
                  			data: data.map((item, index) => {
                  				const total = data.reduce((acc, curr) => acc + curr[yAxis], 0);
                  				const cumulative = data.slice(0, index + 1).reduce((acc, curr) => acc + curr[yAxis], 0);
                  				return (cumulative / total) * 100;
                  			}),
                  			borderColor: 'rgba(255, 99, 132, 1)',
                  			fill: false,
                  			borderWidth: 2,
                             }];
                         case 'mixed':
                             return [{
                  			label: \`\${yAxis} (Bars)\`,
                  			type: 'bar',
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  			borderColor: 'rgba(75, 192, 192, 1)',
                  			borderWidth: 1,
                  		}, {
                  			label: \`\${xAxis} (Line)\`,
                  			type: 'line',
                  			data: data.map(item => item[xAxis]),
							borderColor: 'rgba(255, 99, 132, 1)',
                  			borderWidth: 1,
                             }];
                         case 'waterfall':
                             return [{
                  			label: \`\${yAxis}\`,
                  			data: data.map(item => item[yAxis]),
                  			backgroundColor: (ctx) => {
                  				const index = ctx.dataIndex;
                  				return index % 2 === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132,0.2)';
                  			},
                  			borderColor: (ctx) => {
                  				const index = ctx.dataIndex;
                  				return index % 2 === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
                  			},
                  			borderWidth: 1,
                             }];			
						case 'polarArea':
							return [{
								label: yAxis,
								data: data.map(item => item[yAxis]),
								backgroundColor: getRandomColors(data.length),
								borderColor: getRandomColors(data.length, false),
								borderWidth: 1,
								animation: {
									animateRotate: true,
									animateScale: true,
									duration: 800,
									easing: easingSelect.value
								}
							}];
						case 'radar':
							return [
								{
									label: \`\${xAxis}\`,
									data: data.map(item => item[xAxis]),
									backgroundColor: 'rgba(75, 192, 192, 0.2)',
									borderColor: 'rgba(75, 192, 192, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 500,
										easing: easingSelect.value
									 }
								},
								{
									label: \`\${yAxis}\`,
									data: data.map(item => item[yAxis]),
									backgroundColor: 'rgba(153, 102, 255, 0.2)',
									borderColor: 'rgba(153, 102, 255, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 600,
										easing: easingSelect.value
									 }
								},
								{
									label: \`\${zAxis}\`,
									data: data.map(item => item[zAxis]),
									backgroundColor: 'rgba(255, 159, 64, 0.2)',
									borderColor: 'rgba(255, 159, 64, 1)',
									borderWidth: 1,
									 animation: {
										animateRotate: true,
										animateScale: true,
										duration: 700,
										easing: easingSelect.value
									 }
								}
							];
						case 'scatter':
							return [{
								label: \`\${yAxis} vs \${xAxis}\`,
								data: data.map(item => ({ x: item[xAxis], y: item[yAxis] })),
								backgroundColor: 'rgba(75, 192, 192, 0.2)',
								borderColor: 'rgba(75, 192, 192, 1)',
								borderWidth: 1,
							}];
						 // Add cases for other chart types
                         default:
                             return [{
                                 label: \`\${yAxis} vs \${xAxis}\`,
                                 data: data.map(item => ({
                                     x: item[xAxis],
                                     y: item[yAxis],
                                     r: type === 'bubble' ? (item[zAxis] || 5) : undefined
                                 })),
                                 fill: type === 'area',
                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                 borderColor: 'rgba(75, 192, 192, 1)',
                                 borderWidth: 1,
                             }];
                     }
                  }
                  
					// Helper function to get Chart.js type
					function getChartType(type) {
						const customTypes = ['histogram', 'boxplot', 'pareto', 'waterfall'];
						if (customTypes.includes(type)) {
							return 'bar'; // Custom types are mapped to 'bar'
						}
						switch (type) {
							case 'line':
							case 'bar':
							case 'bubble':
							case 'doughnut':
							case 'pie':
							case 'polarArea':
							case 'radar':
							case 'scatter':
								return type;
							case 'area':
								return 'line'; // 'area' is implemented as a 'line' chart with filling
							default:
								return 'line';
						}
					}
                  
                  function getRandomColors(count, isBorder = false) {
                     const colors = [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)'
                     ];
                     const borderColors = [
                         'rgba(255, 99, 132, 1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)'
                     ];
                     return Array.from({ length: count }, (_, i) => isBorder ? borderColors[i % borderColors.length] : colors[i % colors.length]);
                  }
                  
                  function calculateQuartile(arr, quartile) {
                             arr.sort((a, b) => a - b);
                             const q = (quartile / 4) * (arr.length + 1);
                             return arr[Math.floor(q) - 1];
                         }
                  
                         function calculateMedian(arr) {
                             arr.sort((a, b) => a - b);
                             const mid = Math.floor(arr.length / 2);
                             return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
                         }
                  
                         function calculateCumulativePercentage(data, field) {
                             const total = data.reduce((sum, item) => sum + item[field], 0);
                             let cumulative = 0;
                             return data.map(item => {
                                 cumulative += item[field];
                                 return (cumulative / total) * 100;
                             });
                         }
                  
                         function calculateWaterfallData(data, field) {
                             let cumulative = 0;
                             return data.map(item => {
                                 cumulative += item[field];
                                 return { x: item.Date, y: cumulative };
                             });
                         }
                  
                  
                         // Event listeners for chart type change
                         document.querySelectorAll('input[name="chartType"]').forEach(input => {
                             input.addEventListener('change', (event) => {
                                 chartType = event.target.value;
                                 createChart(chartType);
                             });
                         });

         // Add event listeners for axis selections
         xAxisSelect.addEventListener('change', () => {
             // console.log("xAxis changed:", xAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
         
         yAxisSelect.addEventListener('change', () => {
             // console.log("yAxis changed:", yAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
         
         zAxisSelect.addEventListener('change', () => {
             // console.log("zAxis changed:", zAxisSelect.value);
             const { headers, data } = updateAxisSelectionsAndData(markdownTable);
             createChart(chartType, headers, data);
         });
                  // Initial chart rendering
                  // createChart(chartType);

        });

    function _loadLibrary(url) {
        return new Promise(function(resolve) {
            const script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            script.addEventListener("load", function() {
                resolve(true);
            });
            document.body.appendChild(script);
        });
    }         
               
      </script>
   </body>
</html>
`;

return(htmlTemplate);

	},
/* ----------------------------------- */
  // This method handles the plugin call triggered by the button
  // async onEmbedCall(app, ...args) {
		// const noteUUID = await app.settings["Current_Note_UUID [Do not Edit!]"];
  // },
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- August 22nd, 2024 - Built the basic frame work of the viewer, using markdown data as source for charts, added basic charts, x and y axis details. Tested with dummy data, was working fine. Fixed the the data fetched from the amplenote, like formatting, cleaning up empty rows, applying headers if there isn't or generally, removing any html comment tags etc. To handle multiple tables in a note is challenging, a separate method need to be followed.

- August 23rd, 2024 - Started from where I left off. After multiple iterations completed the worked code to fetch multiple tables from amplenote note, and make into a clean and organized format. Also figured out a way to fetch data from those tables separately, and use them into the charts that were already existing, this step was challenging, multiple parameters and functions involved. I figured out to give an download option, and included html, md, and copy only tables to new note. Then added advanced charts and gave some info into the chart, about the note from which the table data is extracted from. Also added info buttons for easy readability and understanding on how to use. When implementing the Embed, stuck with few errors as the scripts word independently, hence some scripts from chart.js were not utilized by my create chart scripts. Hence Embed is going on Hold, until I figure out a solution.

- August 24th, 2024 - Images, Documentation, Publish, Email, Discord! After Lucian confirmed and shared the update to fix the above mentioned embed issue, tested it and it was working, implemented, added Animations and also add documentation for the Animations as well. You will thank me for it, as it clearly can help you to `figit `with when you are feeling overwhelmed by your number work! haha! Also added Update View option!

- August 25th, 2024 + August 26th, 2024 - Added Transpose for Row wise data. Disabled Auto populate column names and use the names already existing in the Table. Skipping download Image option, as right click and save as is enabled by default. Testing of all the feature mentioned earlier in this line, and also respective documentations required. Added Multiselect, in the backend still working on it (Will be applicable only for few charts!).

- October 14th, 2024 - Updated the name of the selection. Added CSV Download Option. Tested. Rolled-out.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~**Markdown Parsing:** Splits and extracts tables from markdown text.~~

- ~~**Dropdown Population:** Fills dropdown with table options.~~

- ~~**Table Data Extraction:** Retrieves headers and rows from selected table.~~

- ~~**Axis Dropdown Updates:** Updates X, Y, Z axis dropdowns based on table data.~~

- ~~**Chart Creation:** Uses Chart.js to render charts based on selected table and axis.~~

- ~~**Interactive Updates:** Re-renders chart on table or axis change.~~

- ~~**Dataset Generation:** Prepares datasets for Chart.js visualization.~~

- ~~Figure out a way to get the Embed working. - <mark style="color:#F8914D;">**In progress**<!-- {"cycleColor":"24"} --></mark>~~

- ~~Have the Ability to <mark style="color:#F8914D;">Select Rows as data chain<!-- {"cycleColor":"24"} --></mark> for the Graphs. Currently only support Columns.~~

    - ~~Transpose the table as per requirements. Use Transpose for Row wise Data.~~

- ~~Have to Ability to <mark style="color:#F8914D;">Select First Column or Row as Headers<!-- {"cycleColor":"24"} --></mark>. Currently applies Headers irrespective of how the source table is.~~

    - ~~Disabled auto populate Column names~~

- ~~Provide a <mark style="color:#F8914D;">download Image option<!-- {"cycleColor":"24"} --></mark> or save image option or copy image option to the Interactive charts.~~

    - ~~Right click and save Image!~~

    - ~~CSV format.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Note: Upon request, will implement <mark style="color:#F8914D;">Audit function<!-- {"cycleColor":"24"} --></mark> similar to [Gallery](https://public.amplenote.com/LpRxpX/gallery) Plugin. (If at least 15 comment or unique interactions of implementation of Audit is useful, I can make it happen).

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^4]   For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 8h 9m + 11h 48m + 5h 49m + 3h 40m + 4h 46m + 1h 10m = \~35h 24m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

 

\

[^1]: New note
    Publish note
    + Add collaborators
    Apply Vault encryption
    Delete note
    Q Find in note...
    No Graph Utility Test: Download!
    Graph Utility Test: Viewer!

[^2]: ra Graph Utility Test
    X
    Select any one of the Option Below!
    Select the format that you want to download / copy in!
    Download - Interactive Charts (Recommended)
    O
    Download all Tables - Markdown
    Copy all Tables from this Note to a new Note
    SUBMIT
    Cancel

[^3]: Na Graph Utility
    X
    Select any one of the Option Below!
    Select the format that you want to download / copy in!
    O
    Download - Interactive Charts (Recommended)
    O
    Download all Tables - MD
    O
    Download all Tables - CSV
    O
    Copy all Tables from this Note to a new Note
    SUBMIT
    Cancel

[^4]: [High-Level Explanation of the Code]()

    ### High-Level Overview of the JavaScript Code

    This JavaScript code is designed to dynamically parse markdown table data, update chart axes, and render various types of charts using the Chart.js library. Here's a high-level explanation of how the code works:

    - **Parsing Markdown Tables**:

        - The code begins by reading a string of markdown data containing one or more tables. A function called `parseMarkdownTables` splits this data into individual tables, which are then processed separately.

    - **Populating the Dropdown Menu**:

        - Once the tables are parsed, the code populates a dropdown menu with options corresponding to each table. This allows the user to select which table they want to visualize.

    - **Extracting Data from Tables**:

        - When a table is selected, another function `parseMarkdownTable` extracts the headers (column names) and data (rows) from that table. This structured data is essential for generating charts.

    - **Updating Axis Selections**:

        - Based on the selected table, the code dynamically updates dropdowns for the X, Y, and Z axes, allowing the user to choose which columns of data should be plotted on each axis.

    - **Creating and Rendering Charts**:

        - The core of the code involves creating a chart based on the selected table and axis configurations. It uses Chart.js to render various types of charts (e.g., line, bar, pie) on a canvas element. The chart is automatically updated whenever the user changes the selected table or axis.

    - **Handling User Interactions**:

        - The code is designed to be interactive. Whenever the user selects a different table or changes an axis, the chart is re-rendered to reflect the new data and configuration.

    - **Generating Datasets**:

        - Depending on the chart type, the code generates datasets that define how the data should be visualized (e.g., data points, colors, labels). These datasets are passed to Chart.js for rendering.

    ### Summary

    In essence, this code allows users to visualize markdown table data dynamically by selecting tables and configuring chart axes. It automates the process of chart creation and ensures that the visual output reflects the latest user selections.

