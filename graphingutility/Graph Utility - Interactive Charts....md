---
title: Graph Utility - Interactive Charts...
uuid: 2dd7876c-616e-11ef-a048-22074e34eefe
version: 43
created: '2024-08-23T22:08:49+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# Documentation: Advanced Charts

## Overview

This documentation provides a detailed explanation of a web-based tool that allows users to generate various types of charts using amplenote tables in a particular note & markdown table data. The tool is designed to be interactive and customizable, letting users select different chart types and specify which data from the markdown tables should be used for the chart's axes.

## How the Tool Works

1. **User Interaction**:

    1. The user starts by selecting a chart type from the options provided in the `.chart-options` panel.

    1. Next, they select a markdown table from the `tableSelect` dropdown in the `.axis-dropdowns` panel.

    1. Finally, they choose which columns from the table will be used for the X, Y, and (if applicable) Z axes.

1. **Chart Rendering**:

    1. Based on the user’s selections, JavaScript code (not included in this snippet) will parse the markdown table data and use it to render a chart in the canvas element using Chart.js.

1. **Dynamic Updates**:

    1. The chart will update in real-time as the user changes their selections, providing an interactive experience.

### Conclusion

This tool is a powerful, interactive way to visualize data from markdown tables in various chart formats. The combination of intuitive UI elements, tooltips, and responsive design makes it accessible and user-friendly, even for those with limited technical knowledge. Users can quickly generate and customize charts to suit their data visualization needs.

---

## Structure of the HTML Document

The document is structured into three main sections:

1. **Chart Options**: A panel for selecting different types of charts.

1. **Chart Container**: The area where the chart is displayed.

1. **Axis Dropdowns**: A panel for selecting the data that will populate the X, Y, and Z axes of the chart.

Additionally, a footer is included for branding and navigation purposes.

## Detailed Breakdown

### `<head>` Section

The head section includes important resources that make the tool functional:

- **Meta Tags**: These tags define the character encoding and viewport settings to ensure the page is responsive and displays correctly on all devices.

- **Chart.js Library**: The Chart.js library is included via a CDN (Content Delivery Network). This library is responsible for rendering various types of charts on the canvas element.

- **CSS Styles**: Custom styles are defined here to control the layout and appearance of the tool.

### `<body>` Section

#### 1. **Container Div**

- **Purpose**: The primary wrapper that holds all content on the page, styled to center the content and provide a neat layout.

- **Children Elements**:

    - `.chart-options`: Contains radio buttons that allow users to select the type of chart they want to generate.

    - `.chart-container`: Holds the canvas element where the chart will be rendered.

    - `.axis-dropdowns`: Contains dropdowns for selecting which table data to use for the chart's axes.

#### 2. **Chart Options Panel (`.chart-options`)**

- **Inputs**:

    - **Radio Buttons (`<input type="radio" name="chartType">`)**:

        - **Purpose**: Allow the user to select the type of chart they want to generate (e.g., Line Chart, Bar Chart, Pie Chart, etc.).

        - **Attributes**:

            - `value`: Defines the type of chart (e.g., "line", "bar", "pie").

            - `checked`: Pre-selects a specific chart type as the default option.

        - **Tooltip Information**: Each chart option includes an info icon (`<i class="fa fa-info-circle">`) with a tooltip (`<span class="tooltiptext">`) that provides additional details about the chart type. The tooltip is shown when the user hovers over the icon, offering guidance on how to best use each chart type.

- **User Interaction**: When a user selects a radio button, it triggers the rendering of the corresponding chart type in the chart container.

#### 3. **Chart Container (`.chart-container`)**

- **Canvas Element (`<canvas id="myChart" width="400" height="200">`)**:

    - **Purpose**: This is where the chart will be drawn using the Chart.js library.

    - **Attributes**:

        - `id`: Uniquely identifies the canvas element so it can be targeted by JavaScript to render the chart.

        - `width` and `height`: Define the initial dimensions of the canvas. However, CSS controls the responsive behavior to ensure the chart scales correctly with the browser window size.

- **User Interaction**: The chart displayed in this area updates dynamically based on the user’s selections in the chart options and axis dropdowns panels.

#### 4. **Axis Dropdowns Panel (`.axis-dropdowns`)**

- **Select Elements (`<select id="tableSelect">`, `<select id="xAxisSelect">`, `<select id="yAxisSelect">`, `<select id="zAxisSelect">`)**:

    - **Purpose**: Allow users to choose which data from the selected markdown table should populate the X, Y, and Z axes of the chart.

    - **Attributes**:

        - `id`: Uniquely identifies each dropdown to manage user input. IDs include `tableSelect`, `xAxisSelect`, `yAxisSelect`, and `zAxisSelect`.

- **Label Elements**:

    - **Purpose**: Provide clear instructions to the user on what each dropdown is for (e.g., "Select X-Axis", "Select Y-Axis").

- **Tooltip Information**: Like the chart options, these dropdowns have tooltips with additional information about what each axis represents and how it should be used.

#### 5. **Footer**

- **Content**:

    - **Text**: Includes copyright information (`&copy; BKK 2024`) and a link to open-source information.

    - **CSS Styling**: The footer is fixed at the bottom of the page, ensuring it is always visible.

- **Purpose**: To provide branding and easy navigation to additional resources or information.

---

## Code Documentation: JavaScript Chart Integration with Dynamic Markdown Table Parsing

This document provides a detailed explanation of the JavaScript code used to parse markdown tables, update chart axes dynamically, and render various types of charts using the Chart.js library. The code is intended to work with dynamically selected markdown table data and render a chart based on user inputs.

### **1. Initial Setup and Parsing Markdown Data**

#### **1.1. Markdown Data (Input)**

```javascript
const markdownData = `
`;
```

- **Purpose**: This variable is intended to store the markdown table data that will be parsed and visualized as a chart. The actual content of `markdownData` should be markdown-formatted tables.

- **Usage**: It serves as the source data that is parsed and used throughout the script.

    - **Note:** Data from the download Markdown can be place with the `\`\``, or any markdown table data can be placed here for the charts to work automatically.

#### **1.2. `parseMarkdownTables(markdown)` Function**

```javascript
function parseMarkdownTables(markdown) {
    const sections = markdown.split(/\n---\n/).filter(section => section.trim());
    return sections.map((section, index) => {
        const tablePart = section.split('\n').slice(2).join('\n').trim();
        return tablePart; 
    });
}
```

- **Input**: Takes a `markdown` string containing one or more markdown tables.

- **Process**:

    - Splits the markdown content into sections using `---` as a delimiter.

    - Filters out any empty sections.

    - Extracts the table part by removing the first two lines (presumably the table header).

- **Output**: Returns an array of markdown table strings.

- **Reflection**: This function parses multiple tables from the markdown content and stores each as a separate string for later use.

### **2. Populating the Select Element**

#### **2.1. Populating `tableSelect` Dropdown**

```javascript
const tables = parseMarkdownTables(markdownData);
const tableSelect = document.getElementById('tableSelect');

tables.forEach((_, index) => {
    const header = `Table ${index + 1}`;
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${header}`;
    tableSelect.appendChild(option);
});
```

- **Input**: The `tables` array (output from `parseMarkdownTables`) and the `tableSelect` HTML element.

- **Process**:

    - Iterates over the `tables` array.

    - For each table, creates an `option` element and appends it to the `tableSelect` dropdown.

- **Output**: Populates the `tableSelect` dropdown with options corresponding to each parsed table.

- **Reflection**: Allows the user to select a table from the parsed markdown data.

### **3. Parsing Individual Markdown Tables**

#### **3.1. `parseMarkdownTable(mdTable)` Function**

```javascript
function parseMarkdownTable(mdTable) {
    const rows = mdTable.trim().split('\n');
    const headers = rows[0]?.split('|').slice(1, -1).map(header => header.trim()) || [];
    const data = rows.slice(2).map(row => {
        const cells = row.split('|').slice(1, -1).map(cell => cell.trim());
        const rowObject = {};
        headers.forEach((header, index) => {
            rowObject[header] = isNaN(cells[index]) ? cells[index] : parseFloat(cells[index]);
        });
        return rowObject;
    });
    return { headers, data };
}
```

- **Input**: A markdown table string (`mdTable`).

- **Process**:

    - Splits the markdown table into rows.

    - Extracts the header row and trims the cells to remove whitespace.

    - Extracts data rows and maps each cell to the corresponding header.

    - Converts numeric strings to floats.

- **Output**: An object containing two arrays: `headers` and `data`.

- **Reflection**: This function converts a markdown table into a structured JavaScript object, which is crucial for chart generation.

### **4. Updating Axis Selections and Data**

#### **4.1. `updateAxisSelectionsAndData(mdTable)` Function**

```javascript
function updateAxisSelectionsAndData(mdTable) {
    const { headers, data } = parseMarkdownTable(mdTable);
    const currentXSelection = xAxisSelect.value;
    const currentYSelection = yAxisSelect.value;
    const currentZSelection = zAxisSelect.value;

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
```

- **Input**: The markdown table string (`mdTable`).

- **Process**:

    - Parses the table to extract headers and data.

    - Saves current axis selections.

    - Clears existing options in axis selection dropdowns (`xAxisSelect`, `yAxisSelect`, `zAxisSelect`).

    - Populates the dropdowns with new headers.

    - Restores previous selections if valid; otherwise, defaults to the first available headers.

- **Output**: Returns the updated headers and data.

- **Reflection**: This function ensures that the axis selections in the dropdowns are updated according to the selected table, allowing for dynamic chart generation based on the current table's structure.

### **5. Chart Creation and Rendering**

#### **5.1. Chart Setup and Initialization**

```javascript
let chartType = 'line';
let myChart;
const ctx = document.getElementById('myChart').getContext('2d');

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
                    display: type !== 'pie' && type !== 'doughnut',
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (type === 'pie' || type === 'doughnut' || type === 'radar' || type === 'polarArea') {
                                return `${context.label}: ${context.raw}`;
                            }
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}
```

- **Input**: `type` (chart type), `headers` (array of headers), `data` (array of data objects).

- **Process**:

    - Destroys any existing chart instance to avoid overlap.

    - Extracts axis selections (`xAxis`, `yAxis`, `zAxis`).

    - Generates datasets for the chart based on the selected chart type and axis data.

    - Creates a new chart using Chart.js, configuring it with the generated datasets and other options.

- **Output**: A rendered chart on the `myChart` canvas.

- **Reflection**: This function is the core of the chart rendering process, taking parsed data and generating a visual representation based on user-selected parameters.

### **6. Handling User Interactions**

#### **6.1. Handling Table Selection Changes**

```javascript
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
```

- **Input**: User-selected table from the `tableSelect` dropdown.

- **Process**:

    - Updates the `markdownTable` with the selected table.

- Updates axis selections and data based on the new table.

- Recreates the chart with the updated data.

- **Output**: A chart reflecting the data from the newly selected table.

- **Reflection**: Ensures that the chart is always synchronized with the user's selection, providing a dynamic and responsive user experience.

#### **6.2. Handling Axis Selection Changes**

```javascript
xAxisSelect.addEventListener('change', () => {
    const { headers, data } = updateAxisSelectionsAndData(markdownTable);
    createChart(chartType, headers, data);
});

yAxisSelect.addEventListener('change', () => {
    const { headers, data } = updateAxisSelectionsAndData(markdownTable);
    createChart(chartType, headers, data);
});

zAxisSelect.addEventListener('change', () => {
    const { headers, data } = updateAxisSelectionsAndData(markdownTable);
    createChart(chartType, headers, data);
});
```

- **Input**: User-selected axis (`xAxis`, `yAxis`, or `zAxis`).

- **Process**:

    - Updates axis selections and data.

    - Recreates the chart to reflect the new axis configuration.

- **Output**: A chart that visualizes the data along the newly selected axes.

- **Reflection**: This functionality allows users to explore different dimensions of their data by simply changing axis selections.

### **7. Generating Datasets for Charts**

#### **7.1. `getDatasets(type, data, xAxis, yAxis, zAxis)` Function**

```javascript
function getDatasets(type, data, xAxis, yAxis, zAxis) {
    let datasets = [];
    switch (type) {
        case 'line':
        case 'bar':
        case 'scatter':
        case 'bubble':
            datasets.push({
                label: `${yAxis} vs ${xAxis}`,
                data: data.map(item => ({
                    x: item[xAxis],
                    y: item[yAxis],
                    r: item[zAxis] || 5 
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            });
            break;
        case 'pie':
        case 'doughnut':
        case 'polarArea':
            datasets.push({
                label: yAxis,
                data: data.map(item => item[yAxis]),
                backgroundColor: data.map((_, i) => `hsl(${i * (360 / data.length)}, 70%, 60%)`),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            });
            break;
        case 'radar':
            datasets.push({
                label: yAxis,
                data: data.map(item => item[yAxis]),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)'
            });
            break;
        case 'boxplot':
            datasets.push({
                label: yAxis,
                data: data.map(item => item[yAxis]),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            });
            break;
    }
    return datasets;
}
```

- **Input**: Chart `type`, parsed `data`, selected `xAxis`, `yAxis`, and `zAxis`.

- **Process**:

    - Depending on the chart type, maps the data to the appropriate format for Chart.js.

    - Configures each dataset's appearance (colors, borders, etc.).

- **Output**: An array of datasets formatted for the specified chart type.

- **Reflection**: This function customizes how data is visualized based on chart type, allowing for flexibility in data representation.

### **8. Utility Function: Chart Type Mapping**

#### **8.1. `getChartType(type)` Function**

```javascript
function getChartType(type) {
    const chartTypeMap = {
        line: 'line',
        bar: 'bar',
        scatter: 'scatter',
        pie: 'pie',
        doughnut: 'doughnut',
        radar: 'radar',
        polarArea: 'polarArea',
        bubble: 'bubble',
        boxplot: 'boxplot'
    };
    return chartTypeMap[type] || 'line';
}
```

- **Input**: `type` (string representing the desired chart type).

- **Process**: Maps the input `type` to a valid Chart.js type.

- **Output**: The corresponding Chart.js type string.

- **Reflection**: Ensures compatibility between user-selected chart types and Chart.js supported types.

### **Conclusion**

This code effectively parses markdown tables and generates dynamic charts using Chart.js based on user input. It provides a flexible and interactive way to visualize markdown data, allowing for dynamic changes in the data source and the axes used in the chart.

---

\