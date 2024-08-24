---
title: Graph Utility - Viewer!
uuid: 05aef748-616e-11ef-a048-22074e34eefe
version: 7
created: '2024-08-23T22:07:44+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

### **Function Overview: "Viewer!"**

This function serves to embed an interactive element into a note within Amplenote, using a unique identifier (`noteUUID`). This operation involves storing the identifier for later use and inserting a placeholder for a plugin-based object into the note.

---

#### **Inputs and Actions**

1. **`app`**:

    1. **Type**: Object

    1. **Role**: Represents the application context, providing access to various methods and settings related to the note and its content.

    1. **Effect**: Used to interact with the note, set settings, and insert content.

1. **`noteUUID`**:

    1. **Type**: String

    1. **Role**: A unique identifier for the note that the function will modify.

    1. **Effect**: This value is essential for identifying which note to operate on, ensuring that the correct note is updated.

#### **Process Breakdown**

1. **Setting the UUID**:

    1. **Code**: `await app.setSetting("Current_Note_UUID \[Do not Edit!\]", noteUUID);`

    1. **Explanation**: This line stores the `noteUUID` in a setting named `"Current_Note_UUID \[Do not Edit!\]"`. This makes the UUID accessible for later operations, specifically when rendering embedded content.

    1. **Effect**: The application will have a persistent reference to the current note's UUID, which is crucial for subsequent actions, such as embedding content.

1. **Inserting the Plugin Object**:

    1. **Code**: `await app.insertNoteContent({ uuid: noteUUIDz },);`

    1. **Explanation**: This command inserts an HTML `<object>` tag into the note. The object references a plugin using `app.context.pluginUUID` and is formatted to maintain a specific aspect ratio (`data-aspect-ratio="2"`).

    1. **Effect**: This insertion creates an interactive element within the note that will be rendered when viewed. The `pluginUUID` is dynamically pulled from the app's context, ensuring the correct plugin is linked.

1. **Return Statement**:

    1. **Code**: `return null;`

    1. **Explanation**: The function ends by returning `null`, indicating that no further action is needed after the insertion.

    1. **Effect**: The function terminates, having completed its task of embedding the plugin-based object into the note.

---

### **Function Overview: `renderEmbed`**

This function is responsible for rendering the embedded content within a note, specifically focusing on processing markdown tables, cleaning them up, and eventually rendering them in a final format.

---

#### **Inputs and Actions**

1. **`app`**:

    1. **Type**: Object

    1. **Role**: Represents the application context, providing access to various methods and settings related to the note and its content.

    1. **Effect**: Used to fetch note content and interact with the application's settings.

1. **`...args`**:

    1. **Type**: Array

    1. **Role**: Represents additional arguments that might be passed to the function.

    1. **Effect**: Currently, these arguments are not used directly in the function.

#### **Process Breakdown**

1. **Retrieving the Note UUID**:

    1. **Code**: `const noteUUID = await app.settings\["Current_Note_UUID \[Do not Edit!\]"\];`

    1. **Explanation**: This line retrieves the stored `noteUUID` from the settings, which was previously set by the `"Viewer!"` function.

    1. **Effect**: The retrieved UUID is used to identify and fetch the content of the note that is being processed.

1. **Fetching Note Content**:

    1. **Code**: `const markdown = await app.getNoteContent({ uuid: noteUUID });`

    1. **Explanation**: This line fetches the content of the note identified by `noteUUID`. The content is expected to be in markdown format.

    1. **Effect**: The markdown content of the note is now available for processing.

1. **Removing HTML Comments**:

    1. **Function**: `removeHtmlComments(content)`

    1. **Code**: `const removeHtmlComments = (content) => content.replace(/<!--\[\\s\\S\]\*?-->/g, '').trim();`

    1. **Explanation**: This function removes any HTML comments from the note content.

    1. **Effect**: Ensures that any hidden or commented-out content does not interfere with the processing of the tables.

1. **Processing Markdown Tables**:

    1. **Function**: `removeEmptyRowsAndColumns(table)`

    1. **Explanation**:

        1. **Row Filtering**: The function filters out completely empty rows from the markdown table.

        1. **Column Filtering**: It also filters out columns that do not contain any data across all rows.

    1. **Effect**: This results in cleaner tables, where only rows and columns with actual data are preserved, improving readability and accuracy in the final rendered content.

1. **Handling Multiple Tables**:

    1. **Code**:

    1. **Explanation**: This section of the code initializes variables to track the number of tables (`tableCount`), whether the function is currently processing a table (`inTable`), and stores the tables themselves (`tables` and `currentTable`).

    1. **Effect**: Allows the function to handle multiple tables within the markdown content, processing each one individually.

1. **Final Rendering**:

    1. **Code**:

    1. **Explanation**:

        1. **Table Assembly**: Joins the cleaned tables together, ensuring they are separated by double newlines.

        1. **Final Cleanup**: Removes any remaining HTML comments from the processed content.

        1. **HTML Template**: Prepares the final content for rendering. Although the template is empty in this example, it represents the location where the processed markdown would be inserted into an HTML structure for display.

    1. **Effect**: The function returns an HTML template ready to be rendered, containing the cleaned and processed content from the note.

---

### **Summary**

The `"Viewer!"` function is designed to embed a plugin-based object into a note, setting up the note for interactive viewing. The `renderEmbed` function complements this by processing the note's markdown content, particularly tables, to clean and prepare them for rendering. Together, these functions facilitate the embedding and display of interactive content in notes, ensuring the content is both functional and cleanly presented. This documentation serves as a guide for understanding the inputs, processes, and outcomes of these functions, making it easier to reference and modify the code as needed.