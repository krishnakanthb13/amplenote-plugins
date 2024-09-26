---
title: "\U0001F4F8 Gallery - List! Docs"
uuid: 356bc1ea-5be8-11ef-8800-22074e34eefe
version: 7
created: '2024-08-16T21:27:15+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# **Documentation: Image Gallery Listing Script**

This document provides a detailed explanation of the `List!` function, which prompts the user to select specific tags and options, filters notes in Amplenote based on the selected tags, extracts images, and generates a list in either a document or table format. The script is designed to be user-friendly, making it accessible even for those with minimal coding experience.

## Introduction

The `List!` function is a powerful tool that allows users to create a gallery of images stored within their Amplenote notes. It offers flexibility in filtering notes by tags, choosing the inclusion of non-Amplenote images, and formatting the output as either a table or document. This function enhances the user's ability to manage and view images by creating a comprehensive gallery list.

---

## User Inputs

### **1. Select Tags \[OR\] (Each tag is searched separately)**

- **Type:** Tags Input

- **Limit:** 10 tags

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Description:** This input allows the user to select up to 10 tags. The function will search for notes that contain any of these tags independently. This means that if a note contains any one of the selected tags, it will be included in the results.

- **Final View Reflection:** Notes containing any of these tags will be filtered and their images listed in the final output.

### **2. Select Tags \[AND\] (Combined tag is searched)**

- **Type:** Tags Input

- **Limit:** 10 tags

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Description:** This input allows the user to select up to 10 tags that must all be present in a note for it to be included in the results. The notes returned will be those that have all the selected tags simultaneously.

- **Final View Reflection:** Only notes containing all of these tags will be filtered and their images listed in the final output.

### **3. Include Non-Amplenote Images (Default: Only Amplenote Images)**

- **Type:** Checkbox

- **Description:** This checkbox determines whether to include images that are not hosted on the Amplenote domain. By default, only images from Amplenote (`https://images.amplenote.com/`) are included.

- **Final View Reflection:** If checked, images from other domains will be included in the gallery list. If unchecked, only Amplenote-hosted images will appear in the list.

### **4. Get the details in a Table Format! (Default: Document Format!)**

- **Type:** Checkbox

- **Description:** This checkbox allows the user to choose the format in which the image details will be presented. By default, the list is generated in a document format with images and details in paragraphs. If the checkbox is selected, the output will be formatted as a markdown table.

- **Final View Reflection:**

    - **Checked:** The image list is formatted as a table with columns for note name, tags, creation date, update date, and images.

    - **Unchecked:** The image list is formatted as a document with each note's images listed in paragraphs.

---

## Script Functionality Overview

### **1. Prompting the User**

The function begins by prompting the user to select the inputs described above. This is done using the `app.prompt` method, which displays a dialog with the provided inputs.

### **2. Extracting User Inputs**

Once the user provides their input, the script extracts these values into variables:

- `tagNamesOr`: Holds the selected tags for an OR search.

- `tagNamesAnd`: Holds the selected tags for an AND search.

- `allImages`: Boolean value indicating whether to include non-Amplenote images.

- `mdTable`: Boolean value indicating whether to format the results as a table.

### **3. Filtering Notes Based on Tags**

- **OR Search:** If `tagNamesOr` is provided, the script splits the tags and searches for notes containing any of these tags. The notes are accumulated in the `filteredNotes` array.

- **AND Search:** If `tagNamesAnd` is provided, the script searches for notes containing all the selected tags simultaneously. These notes are also added to the `filteredNotes` array.

- **Default Behavior:** If no tags are selected, the script defaults to filtering notes excluding a specific group named `^vault`.

### **4. Removing Duplicate Notes**

The script ensures that no duplicate notes are present in the `filteredNotes` array by converting it into a `Set`, which inherently removes duplicates.

### **5. Initializing the Results Structure**

The script prepares structures to hold the results:

- `markdownTable`: A string to hold the markdown-formatted table.

- `markdownDocs`: A string to hold the markdown-formatted document.

### **6. Defining Regex Patterns**

Two regex patterns are defined to extract image URLs and identifiers:

- `regex`: Matches the domain of Amplenote-hosted images.

- `regex2`: Matches the image identifier at the end of a URL.

### **7. Processing Each Note**

For each note in the filtered list, the script:

- Retrieves the note content.

- Applies a regex pattern to extract image URLs and optional captions based on whether non-Amplenote images are included.

- Formats the images into either a table or document format.

### **8. Generating the Final Markdown Output**

Depending on the user's selection (`mdTable`), the script appends the formatted images into either:

- `markdownTable`: If the table format is selected.

- `markdownDocs`: If the document format is selected.

### **9. Creating a New Note**

- **Naming Convention:** The new note is named using the pattern `Image_Gallery_List_YYMMDD_HHMMSS`, where `YYMMDD` and `HHMMSS` represent the current date and time.

- **Tagging:** The new note is tagged with `-image-gallery`.

- **Content Replacement:** The script replaces the content of the newly created note with the final markdown output.

---

## Conclusion

This script provides a user-friendly way to generate a gallery of images from Amplenote notes, filtered by tags and formatted to the user's preference. By following the steps and understanding each input, users can easily create a comprehensive image list that suits their needs.