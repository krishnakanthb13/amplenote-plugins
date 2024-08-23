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
                    { label: "Download all Tables - Markdown", value: "2" },
                    { label: "Copy all Tables from this Note to a new Note", value: "3" }
                ]
            }
            ]
        }
    );

      // Extract user inputs
      //const downloadOption = result;
      // console.log("result:", result);
	
	//const note = await app.notes.find(noteUUID);
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
	
	const noteUUIDx = noteUUID;
	const note = await app.notes.find(noteUUIDx);

	const cleanedContentz = `
Note Name:${note.name}
Note Tags:${note.tags}
Note UUID:${noteUUID}

---

${cleanedContent}

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

    // Determine the format and trigger the appropriate download
    if (result === "3") {
		const newNoteName = `Tables Copy ${YYMMDD}_${HHMMSS}`;
		const newTagName = ['-tables-copy'];
		let noteUUIDz = await app.createNote(newNoteName, newTagName);
		await app.replaceNoteContent({ uuid: noteUUIDz }, cleanedContentz);
		await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
        // console.log("cleanedContentz:", cleanedContentz);
    } else if (result === "2") {
        downloadTextFile(cleanedContentz, "Markdown_Tables.txt");
        // console.log("cleanedContentz:", cleanedContentz);
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
      <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-box-plot@1.1.2/dist/chartjs-chart-box-plot.min.js"></script>
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
         width: 100%;
         max-width: 1000px;
         height: 50%;
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
         flex: 4;
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
            <span class="tooltiptext">A Line Chart shows trends over time or categories with lines connecting data points.<br><br>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="area" checked> Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<br><br>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <!--<label>
            <input type="radio" name="chartType" value="boxplot" checked> Box Plot Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Area Chart shows trends over time or categories with lines connecting data points, with space under the line filled.<br><br>Note: Select Dimensions in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label> -->
            <label>
            <input type="radio" name="chartType" value="bar"> Bar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Bar Chart compares quantities across different categories with rectangular bars.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
			<label>
            <input type="radio" name="chartType" value="histogram"> Histogram
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Histogram shows the distribution of a dataset with bars representing frequency of data ranges.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pie"> Pie Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pie Chart displays proportions of a whole with slices of a circle.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            </label>
            <label>
            <input type="radio" name="chartType" value="doughnut"> Doughnut Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Doughnut charts are used to show the proportions of categorical data, with the size of each piece representing the proportion of each category.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="polarArea"> Polar Area Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="waterfall"> Waterfall Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Waterfall Chart displays cumulative values with bars showing the impact of incremental changes.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <br>
            <center>Advanced Charts:</center>
            <br>
            <label>
            <input type="radio" name="chartType" value="mixed"> Mixed Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Mixed Chart combines a bar chart with a line chart to show the relative importance of two different factors.<br><br>Note: Select Dimensions/Measures in X-Axis (Line) & Measures in Y-Axis (Bars).</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="pareto"> Pareto Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Pareto Chart combines a bar chart with a line chart to show the relative importance of different factors.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="scatter"> Scatter Plot
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Scatter Plot shows the relationship between two numerical variables with points plotted on an X-Y axis.<br><br>Note: Select Measures in X-Axis & Measures in Y-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="bubble"> 3D Bubble Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A 3D Bubble Chart represents three variables with bubbles of varying size, and points plotted on an X-Y axis.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
            </span>
            </label>
            <label>
            <input type="radio" name="chartType" value="radar"> 3D Radar Chart
            <span class="tooltip">
            <i class="fa fa-info-circle" style="color:blue"></i>
            <span class="tooltiptext">A Radar chart displays multivariate data stacked at an axis with the same central point.<br><br>Note: Select Dimensions/Measures in X-Axis & Measures in Y-Axis & Measures in Z-Axis.</span>
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
               <span class="tooltiptext">Lists all the Tables in the Current Note!</span>
               </span>
               </label>
               <select id="tableSelect"></select>
               <br>
               <label for="xAxisSelect"> Select X-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Horizontal Line / Axis!</span>
               </span>
               </label>
               <select id="xAxisSelect"></select>
               <label for="yAxisSelect"> Select Y-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Vertical Line / Axis!</span>
               </span>
               </label>
               <select id="yAxisSelect"></select>
               <label for="zAxisSelect"> Select Z-Axis:
               <span class="tooltip">
               <i class="fa fa-info-circle" style="color:blue"></i>
               <span class="tooltiptext">Depth / Size!</span>
               </span>
               </label>
               <select id="zAxisSelect"></select>
               <br>
               Note Name:${note.name}<br>
               Note Tags:${note.tags}<br>
               Note UUID:${noteUUID}
            </div>
         </div>
      </div>
      <script>
         // Sample markdown data
         const markdownData = \`
${cleanedContent}
\`;
         
         
         // Function to parse the markdown data
         function parseMarkdownTables(markdown) {
         // Split the markdown content into sections based on the '---' delimiter
         const sections = markdown.split(/\\n---\\n/).filter(section => section.trim());
         // console.log('Sections:', sections);
         
         // Extract tables from each section
         return sections.map((section, index) => {
         // console.log(\`Processing section \${index + 1}:\`, section);
         // Split the section to get the table part, ignoring the first line (table name)
         const tablePart = section.split('\\n').slice(2).join('\\n').trim();
         // console.log('Table part:', tablePart);
         return tablePart; // Return the table part directly without headers
         });
         }
         
         // Parse the markdown data
         const tables = parseMarkdownTables(markdownData);
         
         // Get the select element
         const tableSelect = document.getElementById('tableSelect');
         
         // Populate the select element with table headers
         tables.forEach((_, index) => {
         const header = \`Table \${index + 1}\`;
         const option = document.createElement('option');
         option.value = index;
         option.textContent = \`\${header}\`;
         tableSelect.appendChild(option);
         });
         
         // console.log("tables:", tables);
         let markdownTable = tables[0];
         
         
      </script>
      <script>
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
         
             const headers = rows[0]?.split('|').slice(1, -1).map(header => header.trim()) || [];
             const data = rows.slice(2).map(row => {
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
							}];
						case 'radar':
							return [
								{
									label: \`\${xAxis}\`,
									data: data.map(item => item[xAxis]),
									backgroundColor: 'rgba(75, 192, 192, 0.2)',
									borderColor: 'rgba(75, 192, 192, 1)',
									borderWidth: 1,
								},
								{
									label: \`\${yAxis}\`,
									data: data.map(item => item[yAxis]),
									backgroundColor: 'rgba(153, 102, 255, 0.2)',
									borderColor: 'rgba(153, 102, 255, 1)',
									borderWidth: 1,
								},
								{
									label: \`\${zAxis}\`,
									data: data.map(item => item[zAxis]),
									backgroundColor: 'rgba(255, 159, 64, 0.2)',
									borderColor: 'rgba(255, 159, 64, 1)',
									borderWidth: 1,
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
         
               
      </script>
   </body>
</html>
`;

        downloadTextFile(htmlTemplate, "InteractiveCharts.html");
        // console.log("htmlTemplate:", htmlTemplate);
    }


	}
/* ----------------------------------- */
  }
}