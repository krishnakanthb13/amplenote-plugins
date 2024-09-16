---
title: Header Collapse Code Docs
uuid: 87aaa2dc-7407-11ef-923e-eeba9115991d
version: 20
created: '2024-09-16T14:11:59+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
  - '-2-literature'
---

### **Detailed Code Documentation for `Header Collapse` Plugin**

#### **Overview**

The **`Header Collapse `**is part of a plugin designed to modify the headers within an Amplenote markdown note. It prompts the user to either collapse or expand all headers (`#`, `##`, `###`), where collapsing adds a special comment (`<!-- {"collapsed":true} -->`) at the end of each header. Expanding removes this comment.

This function:

1. Fetches the markdown content of a note.

1. Prompts the user to select "Collapse" or "Expand."

1. Modifies the markdown content based on the user's choice.

1. Updates the note with the modified content.

---

### **Function Signature**

```js
async noteOption(app, noteUUID)
```

- **`app`**: Represents the application interface to interact with notes and perform actions like fetching and replacing note content.

- **`noteUUID`**: The unique identifier (UUID) for the note whose content is being modified.

---

### **Step-by-Step Explanation**

#### **1. Fetch Markdown Content**

```js
const markdown = await app.getNoteContent({ uuid: noteUUID });
```

- **Purpose**: This line fetches the content of the note with the provided `noteUUID`.

- **Input**: `noteUUID` (string), which is the unique identifier of the note.

- **Output**: The `markdown` variable contains the fetched markdown content in string format.

---

#### **2. Prompt the User for Action (Collapse or Expand)**

```js
const result = await app.prompt("Select if you want to Expand or Collapse all Headers.", {
  inputs: [ 
    { 
      label: "This is the label", 
      type: "radio", 
      options: [
        { label: "Collapse", value: 1 }, 
        { label: "Expand", value: 2 } 
      ]
    }
  ]
});
```

- **Purpose**: This block prompts the user with a dialog box to choose between collapsing or expanding all headers. The prompt offers two radio options: "Collapse" or "Expand."

- **Input**: The prompt message ("Select if you want to Expand or Collapse all Headers.") and two radio button options:

    - "Collapse" (with a value of `1`)

    - "Expand" (with a value of `2`)

- **Output**: The `result` variable holds the user's choice:

    - `1`: User chose to collapse headers.

    - `2`: User chose to expand headers.

---

#### **3. Check for User Selection**

```js
if (!result) {
  app.alert("Please select either Collapse or Expand!");
  return;
}
```

- **Purpose**: This checks if the user made a selection. If no option is selected, the function shows an alert and terminates.

- **Input**: The `result` from the prompt.

- **Output**: If the user does not select an option, an alert message is displayed, and the function exits without making changes.

---

#### **4. Set `shouldCollapse` Flag**

```js
let shouldCollapse = result === 1 ? true : false;
```

- **Purpose**: This line determines whether the headers should be collapsed (`true`) or expanded (`false`), based on the user's input.

- **Input**: `result`, which is either `1` (Collapse) or `2` (Expand).

- **Output**:

    - If `result` is `1`, `shouldCollapse` is set to `true` (headers will be collapsed).

    - If `result` is `2`, `shouldCollapse` is set to `false` (headers will be expanded).

---

#### **5. Process the Markdown (Add/Remove Collapse Comments)**

```js
function processMarkdown(markdown, shouldCollapse) {
  let lines = markdown.split('\n');
  
  lines = lines.map(line => {
    let headerPattern = /^(#+)\s+(.+?)\s*(<!--\s*{"collapsed":true}\s*-->)?$/;
    let match = line.match(headerPattern);
    
    if (match) {
      let header = match[1];
      let headerContent = match[2];
      let hasCollapse = match[3];
      
      if (shouldCollapse && !hasCollapse) {
        return `${header} ${headerContent} <!-- {"collapsed":true} -->`;
      } else if (!shouldCollapse && hasCollapse) {
        return `${header} ${headerContent}`;
      }
    }
    return line;
  });

  return lines.join('\n');
}
```

- **Purpose**: This function processes the markdown content, line by line, and adds or removes the collapse comment based on the value of `shouldCollapse`.

    - **Regular Expression Explanation**:

        - `^(#+)\\s+(.+?)\\s\*(<!--\\s\*{"collapsed":true}\\s\*-->)?$`

            - `^(#+)`: Matches one or more `#` characters (indicating headers).

            - `\\s+`: Matches one or more spaces after the header characters.

            - `(.+?)`: Captures the header content.

            - `(<!--\\s\*{"collapsed":true}\\s\*-->)?`: Optionally matches the `collapsed` comment.

- **Input**:

    - `markdown` (the note content in markdown format).

    - `shouldCollapse` (a Boolean indicating whether to collapse or expand headers).

- **Output**: The modified markdown content with either collapse comments added or removed from the headers.

---

#### **6. Replace the Note Content**

```js
await app.replaceNoteContent({ uuid: noteUUID }, modifiedMarkdown);
```

- **Purpose**: This line replaces the note's content with the newly processed markdown.

- **Input**:

    - `noteUUID` (the unique identifier of the note).

    - `modifiedMarkdown` (the markdown content after processing).

- **Output**: The note is updated with the modified content.

---

### **How To Use This Code**

1. **Call the Function**: The `noteOption` function is designed to be invoked in an Amplenote' s environment where you can access the `app` object and the `noteUUID`.

1. **User Interaction**: The user will be prompted to select whether they want to collapse or expand headers.

1. **Result**:

    - If the user selects "Collapse", all headers will have `<!-- {"collapsed":true} -->` added at the end.

    - If the user selects "Expand", any existing `<!-- {"collapsed":true} -->` comments will be removed.

---

### **Inputs and Outputs Summary**

- **Inputs**:

    1. `app`: Provides functionality to interact with notes (fetching and replacing content).

    1. `noteUUID`: A string representing the unique identifier of the note.

    1. User Selection: The user chooses between "Collapse" (value `1`) or "Expand" (value `2`).

- **Outputs**:

    1. The note's markdown content is updated:

        - Headers are collapsed with `<!-- {"collapsed":true} -->` or expanded (comment removed).