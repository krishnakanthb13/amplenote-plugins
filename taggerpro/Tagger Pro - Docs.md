---
title: Tagger Pro - Docs
uuid: 8ee73a24-5229-11ef-8c2f-0663d8339c46
version: 127
created: '2024-08-04T11:49:52+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# Detailed Documentation for `insertText` Function

\

## Overview

The `insertText` function is an asynchronous method designed to modify and update a note within an application. It allows users to customize the note by adding tags and an emoji to its name, based on inputs provided through a user prompt. The function performs several tasks including finding the note, presenting options for customization, handling user inputs, and updating the note accordingly.

\

## Function Definition

```javascript
async insertText(app, noteUUID) {
    // Function implementation...
}
```

- **Parameters**:

    - `app`: An object representing the application context. It provides methods to interact with notes, such as finding a note, updating its name, and adding tags.

    - `noteUUID`: A unique identifier for the note that will be modified.

\

## Step-by-Step Explanation

\

### 1. Finding the Note

```javascript
const note = await app.findNote({uuid: app.context.noteUUID});
```

- **Description**: This line retrieves the note using the provided `noteUUID`.

- **What it Takes In**: A UUID that uniquely identifies the note.

- **What it Does**: It queries the application for the note associated with the given UUID.

- **Reflection**: The retrieved note object is stored in the `note` variable, which will be used later to update the note's name.

\

### 2. Prompt for Customization

```javascript
const result = await app.prompt("Customize your note", {
    inputs: [
        {
            label: "Select the tags (Max 10) to add to the Note!",
            type: "tags",
            limit: 10
        },
        {
            label: "Type a Tag to apply (Not Existing* / Existing) - (* - Preferred)",
            placeholder: "Your tag here",
            type: "string",
        },
        {
            label: "Select emoji",
            type: "select",
            options: [
                // Emoji options
            ]
        },
        { 
          label: "Select position", 
          type: "select", 
          options: [
            { label: "Prefix", value: "" }, // Set an empty value for Prefix
            { label: "Suffix", value: "suffix" }
          ] 
        },
        {
          label: "Predefined Options (Advanced - Check+Modify Code Based on your Specific Requirments)",
          type: "select",
          options: [
                // Predefined options
          ]
        }
    ]
});
```

- **Description**: This block displays a prompt to the user for note customization. The prompt includes several input fields:

    - **Tags Input**: Allows users to select multiple tags (up to 10) to add to the note.

    - **Single Tag Input**: Lets users type a single tag, either new or existing, to be added to the note.

    - **Emoji Selector**: Provides a list of emojis that the user can choose from.

    - **Position Selector**: Allows users to specify if the emoji should be added as a prefix or suffix to the note's name.

    - **Predefined Options:** Allows users to build specific `tag+prefix+suffixs` should be added note.

- **What it Takes In**: User selections and inputs from the prompt.

- **What it Does**: Collects user preferences for modifying the note.

- **Reflection**: The `result` variable stores the user's inputs, which will be used to update the note.

\

### 3. Handling Cancellation

```javascript
if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
}
```

- **Description**: Checks if the user canceled the prompt.

- **What it Takes In**: The `result` variable from the prompt.

- **What it Does**: If `result` is falsy (i.e., the user canceled the prompt), it shows an alert message and exits the function.

- **Reflection**: The function terminates without making any changes to the note.

\

### 4. Processing User Inputs

```javascript
const [multiTag, singleTag, emoji, position, predefined] = result;
```

- **Description**: De-structures the user inputs into separate variables.

- **What it Takes In**: The `result` array from the prompt.

- **What it Does**: Assigns individual elements of the result to corresponding variables.

- **Reflection**: Provides access to each user input for further processing.

\

### 5. Handling Note Name Modifications

```javascript
if (emoji) {
    let updatedName = note.name;

    if (position === "suffix") {
        updatedName = `${note.name} ${emoji}`; // Add emoji as suffix
    } else {
        updatedName = `${emoji} ${note.name}`; // Add emoji as prefix
    }

    await app.setNoteName(note, updatedName);
}
```

- **Description**: Updates the note's name with the selected emoji.

- **What it Takes In**: The note object, emoji, and position (prefix or suffix).

- **What it Does**: Depending on the position selected, the emoji is added either as a prefix or suffix to the note's name. The updated name is then set for the note.

- **Reflection**: The note's name is updated to reflect the user's choice of emoji and its position.

\

### 6. Adding Multiple Tags

```javascript
if (multiTag) {
    const tagsArray = multiTag.split(',').map(tag => tag.trim());
    
    for (const tag of tagsArray) {
        if (tag) {
            await app.addNoteTag({ uuid: app.context.noteUUID }, tag);
        }
    }
}
```

- **Description**: Adds multiple tags to the note.

- **What it Takes In**: The `multiTag` string from the prompt.

- **What it Does**: Splits the `multiTag` string into an array of tags, trims each tag, and adds each tag to the note.

- **Reflection**: Tags are added to the note based on the user's input.

\

### 7. Adding a Single Tag

```javascript
if (singleTag) {
    await app.addNoteTag({ uuid: app.context.noteUUID }, singleTag);
}
```

- **Description**: Adds a single tag to the note.

- **What it Takes In**: The `singleTag` string from the prompt.

- **What it Does**: Adds the single tag to the note.

- **Reflection**: The note is updated with the additional tag provided by the user.

\

### 8. Handle Predefined Options

```javascript
if (!singleTag && !multiTag && !emoji && !position) {
  let prefixz;
  let suffixz;
  let multiTagsz;
  let updatedNamez = note.name;

  if (predefined === "1") {
    prefixz = "✅";
    suffixz = "📝";
    multiTagsz = "completed, reviewed";
  } else if (predefined === "2") {
    prefixz = "💡";
    multiTagsz = "ideabox, ideas, thinking";
  } else if (predefined === "3") {
    prefixz = "🎯";
    suffixz = "✈️";
    multiTagsz = "travel, goals";
  }

  updatedNamez = `${prefixz}${note.name}${suffixz}`;
  await app.setNoteName(note, updatedNamez);

  const tagsArrayz = multiTagsz.split(',').map(tagz => tagz.trim());
  for (const tagz of tagsArrayz) {
    if (tagz) {
      await app.addNoteTag({ uuid: app.context.noteUUID }, tagz);
    }
  }
}
```

- **Description**: Applies predefined modifications based on the coded samples + options. `tag+prefix+suffixs` 

- **What it Takes In**: **`predefined`**: The predefined sample option.

- **What it Does**: Adds the tags, prefix and suffix to the note as per the the code is defined. `tag+prefix+suffixs` 

- **Reflection**: The note is updated with the predefined structure provided by the user in the code.

\

## Conclusion

The `insertText` function provides a comprehensive way to customize a note by updating its name with an emoji and adding tags. By following the described steps, users can enhance their notes with personalized information, improving organization and readability.

---

### Here's a high-level explanation of the code:

1. **Function Definition**: An asynchronous function `insertText` is defined, which takes two parameters: `app` and `noteUUID`.

1. **Find Note**: The function starts by finding a note using the provided `noteUUID`. This is done through the `app.findNote` method.

1. **Prompt for Customization**: The function displays a prompt to the user to customize the note. The prompt includes:

    1. An input for selecting multiple tags (up to 10).

    1. An input for typing a single tag (either new or existing).

    1. A dropdown for selecting an emoji to add to the note.

    1. A dropdown to choose whether the emoji should be a prefix or suffix.

1. **Handle Cancellation**: If the user cancels the prompt, an alert is shown, and the function exits early.

1. **Process User Inputs**:

    1. The user inputs are de-structured into variables: `multiTag`, `singleTag`, `emoji`, and `position`.

    1. If an emoji is selected, the function updates the note's name by adding the emoji as either a prefix or suffix, depending on the user's choice.

1. **Add Tags**:

    1. **Multiple Tags**: If multiple tags are provided, they are split into an array, trimmed of extra spaces, and each tag is added to the note individually.

    1. **Single Tag**: If a single tag is provided, it is added to the note.

1. **Predefined Options:** Applies predefined modifications based on the coded samples + options. `tag+prefix+suffixs` 

1. **Completion**: The function completes without returning any value.

In summary, the function allows users to customize a note by updating its name with an emoji, and adding tags to it based on user input from a prompt.

---

\