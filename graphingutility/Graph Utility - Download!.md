---
title: Graph Utility - Download!
uuid: d08099c8-616d-11ef-beb6-b6c19b417745
version: 25
created: '2024-08-23T22:06:14+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

### Documentation for the JavaScript Function: `"Download!"`

This documentation provides a comprehensive explanation of the `"Download!"` function in the Graph Utility Plugin. It explains how each input is processed and how the function's different parts contribute to the final output. This is intended for developers or users who need to understand, modify, or use this function in their applications.

---

## **Function Overview**

The `"Download!"` function is designed to be an interactive utility within Amplenote that prompts the user to select an option for handling content from a note. The content may be processed, formatted, and then either downloaded in different formats or copied to a new note. The function uses asynchronous JavaScript to manage these tasks efficiently.

---

## **Step-by-Step Explanation**

### **1. Prompting the User to Select an Option**

```javascript
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
```

#### **Input:**

- **Type:** Prompt with Radio Buttons

- **Label:** "Select the format that you want to download/copy in!"

- **Options:**

    1. **Download - Interactive Charts (Recommended)**

    1. **Download all Tables - Markdown**

    1. **Copy all Tables from this Note to a new Note**

#### **Explanation:**

This section prompts the user to select one of three options. Depending on the user's choice, the function will either:

- Download interactive charts,

- Download all tables in Markdown format,

- Copy all tables to a new note.

The selected option is captured in the `result` variable for further processing.

---

### **2. Retrieving Note Content**

```javascript
const markdown = await app.getNoteContent({ uuid: noteUUID });
```

#### **Input:**

- **Type:** UUID of the Note

- **Purpose:** Fetches the entire content of the note in markdown format.

#### **Explanation:**

The content of the note specified by `noteUUID` is retrieved in markdown format, which will then be processed according to the user's selection.

---

### **3. Removing HTML Comments**

```javascript
const removeHtmlComments = (content) => content.replace(/<!--[\s\S]*?-->/g, '').trim();
```

#### **Input:**

- **Type:** String (Note Content)

- **Purpose:** Removes all HTML comments from the note content.

#### **Explanation:**

This function scans the note content for any HTML comments (i.e., content between `<!--` and `-->`) and removes them. This ensures that the final output is clean and free from any unnecessary or hidden comments.

---

### **4. Removing Empty Rows and Columns from Tables**

```javascript
const removeEmptyRowsAndColumns = (table) => {
    const rows = table.split('\n').filter(row => row.trim().startsWith('|'));
    const filteredRows = rows.filter(row => {
        const cells = row.split('|').slice(1, -1);
        const hasContent = cells.some(cell => cell.trim() !== '');
        return hasContent;
    });

    if (filteredRows.length === 0) {
        return '';
    }

    const columnCount = filteredRows[0].split('|').length - 2;
    const nonEmptyColumns = Array.from({ length: columnCount }, (_, colIndex) => 
        filteredRows.some(row => row.split('|')[colIndex + 1].trim() !== '')
    );

    const cleanedRows = filteredRows.map(row => {
        const cells = row.split('|').slice(1, -1);
        const filteredCells = cells.filter((_, i) => nonEmptyColumns[i]);
        return `| ${filteredCells.join(' | ')} |`;
    });

    return cleanedRows.join('\n');
};
```

#### **Input:**

- **Type:** String (Table content in markdown format)

- **Purpose:** Removes rows and columns from the table that are entirely empty.

#### **Explanation:**

This function processes each table by:

1. Filtering out empty rows.

1. Identifying columns that have content across rows.

1. Removing columns that are empty across all rows.

This ensures that only meaningful data remains in the tables.

---

### **5. Processing Note Content**

```javascript
const lines = markdown.split('\n');
let tableCount = 0;
let inTable = false;
const tables = [];
let currentTable = [];

lines.forEach((line, index) => {
    if (line.trim().startsWith('|')) {
        if (!inTable) {
            tableCount++;
            if (tableCount > 1) {
                tables.push('---');
            }
            tables.push(`# Table ${tableCount}\n`);
            inTable = true;
        }

        if (currentTable.length === 0 && line.split('|').every(cell => cell.trim() === '')) {
            const columnCount = line.split('|').length - 2;
            const headers = Array.from({ length: columnCount }, (_, i) => `Column ${i + 1}`).join(' | ');
            currentTable.push(`| ${headers} |`);
        }

        currentTable.push(line);
    } else if (inTable) {
        inTable = false;
        const tableContent = currentTable.join('\n');
        tables.push(removeEmptyRowsAndColumns(tableContent));
        tables.push('');
        currentTable = [];
    }
});

if (currentTable.length > 0) {
    const tableContent = currentTable.join('\n');
    tables.push(removeEmptyRowsAndColumns(tableContent));
}
```

#### **Input:**

- **Type:** Array of Strings (Lines from Note Content)

- **Purpose:** Detects and processes tables within the note content.

#### **Explanation:**

- **Splitting Lines:** The note content is split into individual lines.

- **Table Detection:** The function detects where tables start and end, counting each table.

- **Adding Headers:** If a table is detected without headers, headers are added automatically.

- **Processing Tables:** The `removeEmptyRowsAndColumns` function is applied to each table to clean it up.

- **Final Assembly:** All cleaned tables are collected together, separated by a `---` marker if there are multiple tables.

---

### **6. Final Content Preparation**

```javascript
const processedContent = tables.join('\n\n');
const cleanedContent = removeHtmlComments(processedContent);
```

#### **Input:**

- **Type:** Array of Strings (Processed tables)

- **Purpose:** Assembles the final cleaned content.

#### **Explanation:**

- **Joining Tables:** The cleaned tables are joined together into a single string.

- **Removing HTML Comments:** Any remaining HTML comments are removed to ensure the final content is clean.

---

### **7. Preparing Final Content with Note Metadata**

```javascript
const noteUUIDx = noteUUID;
const note = await app.notes.find(noteUUIDx);

const cleanedContentz = `
Note Name: ${note.name}
Note Tags: ${note.tags}
Note UUID: ${noteUUID}

---

${cleanedContent}
`;
```

#### **Input:**

- **Type:** Note Metadata (Name, Tags, UUID)

- **Purpose:** Adds metadata information to the final content.

#### **Explanation:**

- **Note Metadata:** The note's name, tags, and UUID are retrieved and prepended to the cleaned content.

- **Final Content:** This forms the final content that will be used depending on the user’s selected option.

---

### **8. Downloading the File**

```javascript
function downloadTextFile(resultText, filename) {
    let blob = new Blob([resultText], { type: "text/plain;charset=utf-8" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${YYMMDD}_${HHMMSS}_${noteUUID}_${filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
```

#### **Input:**

- **Type:** String (Final content and filename)

- **Purpose:** Triggers a download of the final content as a text file.

#### **Explanation:**

- **Blob Creation:** The final content is converted into a blob (a file-like object of raw data).

- **Download Trigger:** A temporary link is created and clicked programmatically to trigger the download. The filename includes a timestamp and the note UUID.

---

### **9. Handling the User's Choice**

```javascript
if (result === "3") {
    const newNoteName = `Tables Copy ${YYMMDD}_${HHMMSS}`;
    const newTagName = ['-tables-copy'];
    let noteUUIDz = await app.createNote(newNoteName, newTagName);
    await app.replaceNoteContent({ uuid: noteUUIDz }, cleanedContentz);
    await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
} else if (result === "2") {
    downloadTextFile(cleanedContentz, "Markdown_Tables.txt");
} else if (result === "1") {

const htmlTemplate = `
`;

    downloadTextFile(htmlTemplate, "InteractiveCharts.html");
}
```

#### **Input:**

- **Type:** User Selection (`result`)

- **Purpose:** Executes different actions based on the user’s choice.

#### **Explanation:**

- **Option 1:** If the user selects `"Download - Interactive Charts"`, the content is prepared as an HTML file for interactive charts.

    - The HTML file works as smooth as a butter, with all its functionality.

- **Option 2:** If the user selects `"Download all Tables - Markdown"`, the content is downloaded as a `.txt` file containing all tables in markdown format. 

    - This content can be used in the above HTML file, and also as a backup file.

- **Option 3:** If the user selects `"Copy all Tables from this Note to a new Note"`, a new note is created with the cleaned content, and the user is navigated to the new note.

    - Very useful when you want to collect all the tables from a single note and copy it to a new note and start working on it, without any other further information.

---

## **Summary**

This function is a comprehensive utility that allows users to handle note content in different ways, providing flexibility in how content is downloaded or copied. It processes tables within a note, ensuring they are clean and free from empty rows and columns, and allows users to download or copy this processed content according to their needs. The documentation provided here explains each part of the function in detail, making it easy for developers to understand and modify as required.