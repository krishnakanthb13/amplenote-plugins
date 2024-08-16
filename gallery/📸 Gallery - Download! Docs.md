---
title: "\U0001F4F8 Gallery - Download! Docs"
uuid: 620af892-5be8-11ef-a44a-22074e34eefe
version: 21
created: '2024-08-16T21:28:30+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# **Documentation for the Image Download Script**

This document serves as a comprehensive guide to understand the functionality of the Image Download script. The script allows users to filter notes in AmpleNote by tags, extract image URLs and metadata, and download the results in various formats. This documentation will walk you through each input, the process behind the scenes, and the final outcome.

---

## **1. User Prompt for Inputs**

The script begins by prompting the user to select various options through an interactive dialog. These options will determine how the notes are filtered and the format in which the image data is downloaded.

### **1.1 Select Tags \[OR\]**

- **Type:** `tags`

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Description:** This input allows the user to select up to 10 tags. The script will search for notes that contain any of these tags. Each tag is searched separately, meaning if a note has any one of the selected tags, it will be included in the results.

- **Impact on Final Output:** Notes that match any of the selected tags will be processed for image extraction.

### **1.2 Select Tags \[AND\]**

- **Type:** `tags`

- **Limit:** 10

- **Placeholder:** "Enter tag/'s' (Max 10)"

- **Description:** This input allows the user to select up to 10 tags. The script will search for notes that contain all the selected tags combined. A note must have all the tags to be included in the results.

- **Impact on Final Output:** Only notes that match the exact combination of all selected tags will be processed for image extraction.

### **1.3 Include Non-Amplenote Images**

- **Type:** `checkbox`

- **Description:** This checkbox determines whether to include images from external sources or only images hosted on the AmpleNote domain.

- **Checked:** Both AmpleNote and non-AmpleNote image URLs will be extracted.

- **Unchecked (Default):** Only AmpleNote image URLs (`https://images.amplenote.com/`) will be extracted.

- **Impact on Final Output:** Depending on the selection, the script will either include or exclude non-AmpleNote images in the final download.

### **1.4 Select the Format That You Want to Download In**

- **Type:** `radio`

- **Options:**

    - **HTML Gallery Download (Recommended):** `"html"`

    - **Markdown Image Links:** `"datahtml"`

    - **Image Properties JSON:** `"json"`

    - **Image Properties RAW File:** `"raw"`

- **Description:** This input allows the user to select the format in which they want to download the extracted image data. The format chosen will determine the structure and content of the downloaded file.

- **Impact on Final Output:** The script will generate and download a file based on the selected format.

---

## **2. Filtering Notes Based on Tags**

### **2.1 Tag Filtering Logic**

After the user has made their selections, the script filters the notes based on the chosen tags:

- **OR Tags:** If the user has selected any tags in the "Select Tags \[OR\]" input, the script will gather notes that contain any of these tags.

- **AND Tags:** If the user has selected tags in the "Select Tags \[AND\]" input, the script will gather notes that contain all the selected tags.

- **Fallback:** If no tags are selected, the script defaults to gathering notes from the "^vault" group.

### **2.2 Removing Duplicates**

The script ensures that no duplicate notes are included in the final list by using a `Set` to remove duplicates.

---

## **3. Image Extraction from Notes**

### **3.1 Regex Patterns**

The script uses regular expressions (regex) to identify and extract image URLs from the note content:

- **Default Regex Pattern:** Extracts only AmpleNote image URLs.

- **Alternative Regex Pattern:** If the "Include Non-Amplenote Images" checkbox is selected, a broader regex pattern is used to extract all image URLs.

### **3.2 Processing Images**

For each note, the script scans the content for image URLs and associated captions. If images are found, they are stored along with metadata such as note tags, names, URLs, and UUIDs.

---

## **4. Generating the Download File**

Based on the format selected in **1.4**, the script processes the extracted image data into different templates for downloading:

### **4.1 HTML Gallery Download (Recommended)**

- **Format Code:** `"html"`

- **Content:** A structured HTML file containing image galleries. Each image is linked to its source, and captions are displayed with note details.

### **4.2 Markdown Image Links**

- **Format Code:** `"datahtml"`

- **Content:** A simple text file containing markdown-formatted image links. This format is ideal for embedding images into markdown documents.

### **4.3 Image Properties JSON**

- **Format Code:** `"json"`

- **Content:** A JSON file containing an array of image metadata objects. Each object includes details like note name, tags, UUID, and image caption.

### **4.4 Image Properties RAW File**

- **Format Code:** `"raw"`

- **Content:** A plain text file where each line represents an image and its associated metadata, separated by commas.

### **4.5 Deduplication and Download**

Before downloading, the script removes any duplicate entries to ensure the final file is clean. The file is then downloaded with a timestamped filename for easy reference.

---

## **5. Helper Functions**

### **5.1 Date-Time Formatting**

The script includes a function to format the date and time in a locale-specific string, making the timestamps in the metadata human-readable.

### **5.2 Download Function**

A helper function is used to generate and trigger the download of the formatted text file.

### **5.3 Removing Duplicates**

Another helper function ensures that the results array is free from duplicate entries by comparing the serialized version of each object.

---

## **6. Final Output**

The final output is a downloadable file based on the user’s choices in the initial prompt. The script handles all necessary processing to extract and organize image data from AmpleNote into the desired format. The user ends up with a file that can be used for various purposes, such as creating galleries, embedding images in markdown documents, or archiving image metadata.

---

This concludes the documentation. The script is designed to be flexible and user-friendly, allowing for tailored downloads based on specific tags and formats. Users can reference this document to understand each step and input involved in the process.