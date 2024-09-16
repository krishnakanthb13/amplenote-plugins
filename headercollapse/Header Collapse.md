---
title: Header Collapse
uuid: d87b3a3c-7407-11ef-b352-eeba9115991d
version: 181
created: '2024-09-16T14:14:14+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# [<mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>][^1] 

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/d87b3a3c-7407-11ef-b352-eeba9115991d/b17f8719-8138-484e-80cc-9450170de852.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### **Step-by-Step User Guide for the "Header Collapse" Plugin**

**Purpose:** This plugin allows you to toggle between collapsing or expanding headers in a Amplenote' markdown notes by adding or removing a special "collapsed" comment.

---

### **How to Use the "Header Collapse" Plugin**

- **Step 1: Access the Plugin**

    - Make sure you are in the environment where the "Header Collapse" plugin is installed.

- **Step 2: Open the Note**

    - Navigate to the note you want to modify. The note should contain markdown with headers (`#`, `##`, `###`) that you wish to collapse or expand.

- **Step 3: Trigger the Plugin**

    - Run the "Header Collapse" plugin. The method to do this depends (e.g., clicking a button or using a command).

- **Step 4: Select Action (Collapse or Expand)**

    - Once the plugin runs, a prompt will appear asking you to choose between two options:

        - **Collapse**: Adds `<!-- {"collapsed":true} -->` at the end of each header.

        - **Expand**: Removes `<!-- {"collapsed":true} -->` from any headers where it exists.

- **Step 5: Confirm the Selection**

    - After selecting either "Collapse" or "Expand", click on "Submit" to confirm your choice.

- **Step 6: View the Updated Note**

    - The plugin will process the note and apply the changes. Your headers will now be collapsed or expanded based on your selection.

---

### **Frequently Asked Questions (FAQ)**

- **Q1: What does "Collapsing" a header do?**

    - Collapsing a header adds the `<!-- {"collapsed":true} -->` comment to it, which can be used by Amplenote's markdown processors or apps to visually collapse or hide the content under that header.

- **Q2: What happens when I choose "Expand"?**

    - Choosing "Expand" will remove the `<!-- {"collapsed":true} -->` comment from any header where it exists, ensuring that the content under the header is expanded and visible.

- **Q3: Will the plugin affect any part of the note other than the headers?**

    - No, the plugin only modifies headers (`#`, `##`, `###`) and will not change any other part of the markdown content.

- **Q4: Can I apply this to specific headers, or does it affect the whole note?**

    - This plugin applies the action (collapse or expand) to all headers within the note. It cannot be applied to individual headers selectively.

- **Q5: What should I do if I accidentally choose the wrong option?**

    - Simply run the plugin again and choose the correct option (either "Collapse" or "Expand") to revert the changes.

- **Q6: Does this plugin work with all markdown notes?**

    - Yes, it works with any Amplenote markdown notes containing headers (`#`, `##`, `###`). However, it relies on headers being in proper markdown format to detect and modify them.

- **Q7: Can I see the modified markdown code after the plugin runs?**

    - Yes, the markdown content is updated with the collapse comments visible, allowing you to manually edit it if needed.  **Can be done using the** [**Markdown Plugin**](https://www.amplenote.com/plugins/KKfwtmMVtoxSCdsK5bNdnad8)**.**

- **Q8: Does collapsing a header actually hide content in all notes?**

    - No, collapsing only adds the `<!-- {"collapsed":true} -->` comment, only to the current note that you run it on.

- **Q9: How can I restore the original note if needed?**

    - If you want to restore the original note without collapse comments, simply select "Expand" when running the plugin. This will remove all collapse comments from the headers.

- **Q10: Is there any impact on the note content when the headers are collapsed or expanded?**

    - No, collapsing or expanding headers does not change the actual content of the note. Only the collapse comments are added or removed.

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name|Header Collapse|
|icon|title|
|description|Collapse and Expand all the Headers in your Note.|
|instructions|[Header Collapse Code Docs](https://www.amplenote.com/notes/87aaa2dc-7407-11ef-923e-eeba9115991d) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
  async noteOption(app, noteUUID) {
    
    // Fetch the markdown content of the note using its UUID
    const markdown = await app.getNoteContent({ uuid: noteUUID });
    // console.log("noteUUID:", noteUUID);
    // console.log("markdown:", markdown);

    // Prompt user to select if they want to collapse or expand all headers
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

    // If no result is selected, show an alert and exit
    if (!result) {
      app.alert("Please select either Collapse or Expand!");
      return;
    }
	// console.log("result:", result);

    // Set shouldCollapse to true if the user selects 'Collapse', otherwise false
    let shouldCollapse = result === 1 ? true : false;
	// console.log("shouldCollapse:", shouldCollapse);

    // Function to process the markdown content and add/remove collapse comments
    function processMarkdown(markdown, shouldCollapse) {
      // Split markdown by lines for easy line-by-line processing
      let lines = markdown.split('\n');
      
      // Loop through each line to find headers and modify them accordingly
      lines = lines.map(line => {
        // Regular expression to match headers (e.g., #, ##, ###)
        let headerPattern = /^(#+)\s+(.+?)\s*(<!--\s*{"collapsed":true}\s*-->)?$/;

        // Match the line with the header pattern
        let match = line.match(headerPattern);
        
        if (match) {
          // Extract the header symbols (#, ##, ###), content, and collapse status
          let header = match[1];  // the #, ##, ### part
          let headerContent = match[2]; // the content after the header
          let hasCollapse = match[3]; // whether the collapse comment exists
          
          // Conditionally add or remove the collapse comment
          if (shouldCollapse && !hasCollapse) {
            // Add the collapsed comment if it doesn't exist
            return `${header} ${headerContent} <!-- {"collapsed":true} -->`;
          } else if (!shouldCollapse && hasCollapse) {
            // Remove the collapsed comment if it exists
            return `${header} ${headerContent}`;
          }
        }
        
        // Return the line unchanged if it's not a header
        return line;
      });

      // Join the modified lines back into a single markdown string
      return lines.join('\n');
    }

    // Process the markdown content based on user input (collapse or expand headers)
    let modifiedMarkdown = processMarkdown(markdown, shouldCollapse);
    // console.log("modifiedMarkdown:", modifiedMarkdown);

    // Replace the note's content with the modified markdown
    await app.replaceNoteContent({ uuid: noteUUID }, modifiedMarkdown);
	// console.log("Success!");
  }
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- September 16th, 2024: Yesterday I was editing few things on amplenote, and realized that the headers collapse and expand features are working with an update in the backend markdown code. Then I tried with the bullets, it did not, seems where is a different hidden layer where its saved along with the pointer location and other features. Well I wanted to created a plugin will at lease collapse and expand only Headers from now. Listed out the requirements, build the code, adding necessary tweaking an updates that are required, tested on testing note, and did the documentation, how tos, verified the documentations, got the gif explaining how to get it done, published it and shared on discord too.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~September 16th, 2024~~

    - ~~Understood the requirement, wrote a manifest guide~~

    - ~~Obtained the bits and pieces of the code required to get this done.~~

    - ~~Build the functional aspect of the code.~~

    - ~~Tested in with some text in between.~~

    - ~~Got all the text, image details required for the plugin, and proof read it.~~

    - ~~Published and updated in Discord.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Once similar in note feature is released for bullet (numbered and icons) points, then I can do something similar to them too.

- Need to think!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^2]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 2h 29m = \~2h 29m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

\

[^1]: [<mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>]()

    **Welcome to the Header Collapse Plugin!**

    \

    I'm excited to have you here. This plugin is designed to simplify your markdown experience by allowing you to easily collapse or expand headers within your notes. Whether you’re working on large documents or organizing content, this tool helps keep your notes clean and manageable. With just a quick prompt, you can choose to collapse all headers for a tidier view or expand them to review the full content. It’s easy to use, non-intrusive, and ensures that your content remains organized without altering the core text. 

    \

    Try it out and take control of your markdown headers!

[^2]: [High-Level Explanation of the Code]()

    This code is a plugin designed to allow users to manage the state of headers in a Amplenote's markdown note, specifically adding or removing a "collapsed" comment on headers. The user is prompted with an option to either "Collapse" or "Expand" all headers in the note. Based on their choice:

    - If "Collapse" is selected, a comment (`<!-- {"collapsed":true} -->`) is added to the end of each header (`#`, `##`, `###`).

    - If "Expand" is selected, any existing "collapsed" comments are removed from the headers.

    How? The plugin works by first fetching the content of the note, asking the user for their preference (collapse or expand), processing the markdown content to modify headers accordingly, and then updating the note with the new content. It ensures that only headers are affected, leaving the rest of the note's content unchanged. The overall goal is to give users control over how headers are displayed or collapsed in their notes.

