---
title: Tagger 2.0
uuid: 47e5a396-8c66-11ef-be52-ceeb1c0a5b1e
version: 5
created: '2024-10-17T14:30:41+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

This plugin customizes a note by modifying its name, adding tags, and applying predefined settings based on user input, handling asynchronous interactions with the application API for seamless updates. It enhances note organization by allowing users to add multiple tags and emojis, making it easier to sort and filter notes based on various criteria such as status, priority, or type. The predefined options offer standardized formatting for users who frequently use similar tags or formats, streamlining the customization process.

\

The intuitive prompt-based interface and asynchronous updates ensure a user-friendly experience and efficient note management. Additionally, the plugin's flexibility and scalability make it adaptable to evolving user needs, providing a practical tool for advanced note organization and customization.

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

### <mark>General - Calling the Plugin - Tagger 2.0</mark>

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/c006fe15-93d2-4396-af40-65defc06a560.gif)

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/2c4e0503-b825-4233-9c41-a36c14021a26.png) [^1] 

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

This plugin allows users to customize their notes by modifying names, adding tags, and applying predefined settings. It interacts asynchronously with the application API to ensure smooth and responsive updates.

- <mark style="color:#F8D616;">Customize Your Note:<!-- {"cycleColor":"25"} --></mark>

    - The plugin will prompt you with options to customize the note:

    - **Tags Selection:** Choose up to 10 tags to add to the note.

    - **Single Tag**: Type a single tag to add to the note.

    - **Emoji Selection:** Pick an emoji to represent the note's status or type. Choose its position as either a prefix or suffix.

    - **Predefined Options:** Select a predefined sample for quick customization, which includes preset emojis and tags.

- <mark style="color:#F8D616;">Complete Customization:<!-- {"cycleColor":"25"} --></mark>

    - After providing your inputs, the plugin will:

        - Update the note’s name with the selected emoji.

        - Add the specified tags to the note.

        - Apply predefined settings if no other customization is selected.

![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/2359ae8d-62d3-4c97-bced-ba5856280fd6.png) [^2]   >>>  ![](https://images.amplenote.com/672c22b2-521d-11ef-8c2f-0663d8339c46/1ee37943-b5dd-4bcf-8e10-58c648463d06.png) [^3]

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name<!-- {"cell":{"colwidth":116}} -->|Tagger 2.0<!-- {"cell":{"colwidth":572}} -->|
|icon<!-- {"cell":{"colwidth":116}} -->|label<!-- {"cell":{"colwidth":572}} -->|
|description<!-- {"cell":{"colwidth":116}} -->|Type `{Tagger 2.0}` in any note to specify and apply a tag (Existing - up to 10, and Non Existing - up to 1), especially useful in Jots Mode where the tag button is hidden, and includes features like user prompts for tags, emoji selection, position selection, and note name modifications.<!-- {"cell":{"colwidth":572}} -->|
|instructions|Please fine the Instructions here =  [Tagger Pro - Insert Text](https://www.amplenote.com/notes/8ee73a24-5229-11ef-8c2f-0663d8339c46) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
  // Define an asynchronous function 'noteOption' that takes 'app' and 'noteUUID' as parameters
  async insertText(app, noteUUID) {
    // Log the start of the function
    // console.log("Starting insertText function");
  
    // Find the note using the UUID
    const note = await app.findNote({uuid: app.context.noteUUID});
    // console.log("Note found:", note);
  
    // ------- Display a prompt to customize the note -------
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
            // Task Status
            { label: "Task Status: ✅ Completed", value: "✅" },
            { label: "Task Status: ⚠️ Important", value: "⚠️" },
            { label: "Task Status: 🔴 Urgent", value: "🔴" },
            { label: "Task Status: 🟡 Pending", value: "🟡" },
            { label: "Task Status: 🟢 Done", value: "🟢" },
            { label: "Task Status: ⏳ In Progress", value: "⏳" },
  
            // Note Type
            { label: "Note Type: 📝 Note", value: "📝" },
            { label: "Note Type: 💡 Idea", value: "💡" },
            { label: "Note Type: 🔍 Review", value: "🔍" },
            { label: "Note Type: 📚 Research", value: "📚" },
  
            // Priority
            { label: "Priority: 📌 Pinned", value: "📌" },
            { label: "Priority: 🔒 Confidential", value: "🔒" },
  
            // Time Management
            { label: "Time Management: 📅 Scheduled", value: "📅" },
            { label: "Time Management: 🕒 Later", value: "🕒" },
  
            // Work and Personal
            { label: "Work: 💼 Work", value: "💼" },
            { label: "Work: 🎓 Study", value: "🎓" },
            { label: "Personal: 🏠 Home", value: "🏠" },
            { label: "Personal: 🛒 Shopping", value: "🛒" },
            { label: "Personal: ✈️ Travel", value: "✈️" },
            { label: "Personal: 🎉 Event", value: "🎉" },
  
            // Miscellaneous
            { label: "Miscellaneous: ⚙️ Settings", value: "⚙️" },
            { label: "Miscellaneous: 🌟 Highlight", value: "🌟" },
            { label: "Miscellaneous: 🎯 Goal", value: "🎯" },
            { label: "Miscellaneous: 🛠️ Maintenance", value: "🛠️" },
            { label: "Miscellaneous: 💬 Discussion", value: "💬" },
            { label: "Miscellaneous: 🚀 Launch", value: "🚀" }
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
            { label: "Predefined Sample 1: Completed", value: "1" }, 
            { label: "Predefined Sample 2: Ideas", value: "2" }, 
            { label: "Predefined Sample 3: Travel Goals", value: "3" } // More Options can be added as per your Requirements!
          ] 
        }
      ] 
    });
  
    // Log the result of the prompt
    // console.log("Prompt result:", result);
  
    // ------- Check if the user has cancelled the operation -------
    if (!result) {
      // console.log("User cancelled the operation");
      app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
      return;
    }
  
    // ------- Destructure user inputs -------
    const [multiTag, singleTag, emoji, position, predefined] = result;
    // console.log("User inputs - multiTag:", multiTag, ", singleTag:", singleTag, ", emoji:", emoji, ", position:", position, ", predefined:", predefined);

    // ------- Handle Note Name Modifications -------
    if (emoji) {
      //const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);
  
      let updatedName = note.name;
  
      if (position === "suffix") {
        updatedName = `${note.name} ${emoji}`; // Add emoji as suffix
        // console.log("Updated name with prefix:", updatedName);
      } else { // old version - //} else if (position === "suffix") {
        updatedName = `${emoji} ${note.name}`; // Add emoji as prefix
        // console.log("Updated name with suffix:", updatedName);
      }
  
      await app.setNoteName(note, updatedName); // Update the note name
      // console.log("Note name updated to:", updatedName);
    }
  
    // ------- Add tags to the note if provided -------
    if (multiTag) {
      // Split the multiTag string by commas into an array of tags
      const tagsArray = multiTag.split(',').map(tag => tag.trim()); // Trim spaces around each tag
      
      // Log the separated tags
      // console.log("Multiple tags to be added:", tagsArray);
      
      // Add each tag to the note separately
      for (const tag of tagsArray) {
        if (tag) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tag);
          // console.log("Added tag:", tag);
        }
      }
      
      //return null; // Return an empty string after adding tags
    }

    // ------- Add single tag preferably new to the note if provided -------
    if (singleTag) {
      await app.addNoteTag({ uuid: app.context.noteUUID }, singleTag);
      // console.log("Single tag added:", singleTag);
      //return null;
    }

    // ------- Handle Predefined Modifications -------
    if (!singleTag && !multiTag && !emoji && !position) {
      // const noteHandle = await app.findNote({ uuid: noteUUID }); // Find the note using UUID
      // console.log("Note handle found:", note);

      // Define variables outside of the conditional blocks
      let prefixz;
      let suffixz;
      let multiTagsz;
      let updatedNamez = note.name;
      // console.log("updatedNamez:", updatedNamez);
  
      if (predefined === "1") {
        prefixz = "✅";
        suffixz = "📝";
        multiTagsz = "completed, reviewed";
      }
      else if (predefined === "2") {
        prefixz = "💡";
        multiTagsz = "ideabox, ideas, thinking";
      }
      else if (predefined === "3") {
        prefixz = "🎯";
        suffixz = "✈️";
        multiTagsz = "travel, goals";
      } 
      // More Options can be added as per your Requirements!
      // Example usage of the variables
      // console.log("Prefix:", prefixz);
      // console.log("Suffix:", suffixz);
      // console.log("Multi Tags:", multiTagsz);

      updatedNamez = `${prefixz}${note.name}${suffixz}`; // Add emoji as prefix or suffix
      await app.setNoteName(note, updatedNamez); // Update the note name
      // console.log("Note name updated to:", updatedNamez);
      
      // Split the multiTag string by commas into an array of tags
      const tagsArrayz = multiTagsz.split(',').map(tagz => tagz.trim()); // Trim spaces around each tag
      // console.log("Multiple tags to be added:", tagsArrayz);
      
      // Add each tag to the note separately
      for (const tagz of tagsArrayz) {
        if (tagz) { // Ensure the tag is not empty
          await app.addNoteTag({ uuid: app.context.noteUUID }, tagz);
          // console.log("Added tag:", tagz);
        }
      }
      
    }

    return null; // Return an empty string after adding tags
  }
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- July 11th, 2024 - Build the framework and all the basic requirements for this Plugin. 

    - Collected all the necessary codes, templates, and references. 

    - Build the Plugin to handle single tag and multiple tags correctly. Also how to handle new tag and already existing tag. 

    - Fixed all the error handling methods. 

    - Added the feature to prefix and suffix the desired Emoji or Any Text can be added by default.

    - Added the Predefined Template / Format to handle multiple addition in a single click, after be configured in the Code based on users perferences.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Understanding the Requirements~~

- ~~Build the framework~~

    - ~~Lots of emojis + Groupings~~

    - ~~Add prefix and suffixing options~~

    - ~~Error handling~~

    - ~~handle multi tagging array~~

    - ~~handle single tagging along with multi tagging array~~

    - ~~handling errors and cleanup nulls or empty spaces~~

    - ~~adding console logs and testing the requirements~~

    - ~~fix multi tags as single tag issue - for loop~~

    - ~~handling default options for select position~~

    - ~~cleaned up logs for query optimization~~

    - ~~minor tweaks~~

- ~~Testing~~

    - ~~changes to error logs~~

    - ~~handling spaces~~

    - ~~Documentation~~

- Final

    - ~~change log update~~

    - ~~time invested update~~

    - ~~Gifts - how tos~~

    - ~~documentation fixing~~

    - ~~publishing~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Add Tagger to Multiple Notes / A Particular Tag (Exclusion Criteria's - Involved!)

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[Code Explanation!][^4]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 4h 32m \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: Tagger 2.0
    X
    Customize your note
    Select the tags (Max 10) to add to the Note!
    Search for a tag
    Type a Tag to apply (Not Existing\* / Existing) - (\* - Preferred)
    Your tag here
    Select emoji
    Select position
    Prefix
    Predefined Options (Advanced - Check+Modify Code Based on your Spe.
    SUBMIT
    Cancel

[^2]: label: "Predefined Options (Advanced - Check+Modify Code Based on your Specific Requirments)",
    type: "select",
    options: \[
    { label: "Predefined Sample 1: Completed", value: "1" },
    { label: "Predefined Sample 2: Ideas", value: "2" },
    { label: "Predefined Sample 3: Travel Goals", value: "3" } // More Options can be added as per your Requirements!

[^3]: if (predefined === "1") {
    prefixz = "V ";
    suffixz = "
    multiTagsz = "completed, reviewed";
    F
    else if (predefined === "2") {
    prefixz = "9
    multiTagsz = "ideabox, ideas, thinking";
    }
    else if (predefined === "3") {
    prefixz = "3";
    suffixz = " ";
    multiTagsz = "travel, goals";
    // More Options can be added as per your Requirements!

[^4]: [Code Explanation!]()

    ### Here's a high-level explanation of the code:

    - **Function Definition**: An asynchronous function `insertText` is defined, which takes two parameters: `app` and `noteUUID`.

    - **Find Note**: The function starts by finding a note using the provided `noteUUID`. This is done through the `app.findNote` method.

    - **Prompt for Customization**: The function displays a prompt to the user to customize the note. The prompt includes:

        - An input for selecting multiple tags (up to 10).

        - An input for typing a single tag (either new or existing).

        - A dropdown for selecting an emoji to add to the note.

        - A dropdown to choose whether the emoji should be a prefix or suffix.

    - **Handle Cancellation**: If the user cancels the prompt, an alert is shown, and the function exits early.

    - **Process User Inputs**:

        - The user inputs are de-structured into variables: `multiTag`, `singleTag`, `emoji`, and `position`.

        - If an emoji is selected, the function updates the note's name by adding the emoji as either a prefix or suffix, depending on the user's choice.

    - **Add Tags**:

        - **Multiple Tags**: If multiple tags are provided, they are split into an array, trimmed of extra spaces, and each tag is added to the note individually.

        - **Single Tag**: If a single tag is provided, it is added to the note.

    - **Predefined Options:** Applies predefined modifications based on the coded samples + options. `tag+prefix+suffixs` 

    - **Completion**: The function completes without returning any value.

    In summary, the function allows users to customize a note by updating its name with an emoji, and adding tags to it based on user input from a prompt.

