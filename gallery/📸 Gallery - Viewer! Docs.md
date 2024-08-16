---
title: "\U0001F4F8 Gallery - Viewer! Docs"
uuid: dea6ac70-5be8-11ef-9902-22074e34eefe
version: 12
created: '2024-08-16T21:31:59+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# **Detailed Documentation for the Image Viewer and Embed Functionality**

---

## **Viewer! Function**

**Purpose:** This function is designed to create or update a note within AmpleNote that serves as an image viewer. The note is tagged with `-image-gallery` and displays an embedded object that links to a plugin within the app.

### **Inputs & Process:**

1. **Note Name and Tag Initialization:**

    1. **`newNoteName`**: Set to `"Gallery: Image_Viewer"`. This is the title of the note that will be created or updated.

    1. **`newTagName`**: An array containing the tag `"-image-gallery"`. This tag categorizes the note as part of the image gallery.

1. **UUID Handling:**

    1. The function checks if the setting `Gallery_Image_Viewer_UUID` already exists in the app's settings.

        1. If it does, it uses this UUID to reference the existing note.

        1. If not, it creates a new note with the title `"Gallery: Image_Viewer"` and the tag `"-image-gallery"`.

    1. The UUID of the new or existing note is stored in the app’s settings under `Gallery_Image_Viewer_UUID`.

1. **Embedding Content in the Note:**

    1. The note content is replaced with an `<object>` tag that embeds a plugin. The `data-aspect-ratio="1"` attribute ensures that the embedded content maintains a square aspect ratio.

1. **Navigation to the Note:**

    1. After embedding the content, the app navigates to the created or updated note using the URL format `https://www.amplenote.com/notes/${noteUUID}`.

**Outcome:**

- This function effectively sets up an AmpleNote note as an image viewer, categorized under the `-image-gallery` tag, and links it to the corresponding plugin. When the note is accessed, it displays the embedded object as specified.

---

#### **`renderEmbed` Function**

**Purpose:**\
This function processes and filters notes from a specific group within AmpleNote, extracts image details from those notes, and prepares the data for embedding in the image gallery.

**Inputs & Process:**

1. **Note Retrieval:**

    1. **`notesByGroup`**: The function fetches notes excluding a specific group labeled `^vault`. This contains the notes from which images will be extracted.

    1. The fetched notes are stored in the `notes` array.

1. **Regex Pattern Definition:**

    1. **`regex2`**: A regular expression used to extract the image identifier from the URL. This identifier is typically the file name or a unique part of the URL.

1. **Image Extraction:**

    1. For each note, the function retrieves the note content using its UUID.

    1. It then checks if the setting `Gallery_Image_Viewer_AllImgs` is enabled (`app.settings\["Gallery_Image_Viewer_AllImgs"\] === 1`). If not, it sets this setting to `0`.

1. **Image URL and Caption Matching:**

    1. **`markdownImagePattern`**: Depending on the `Gallery_Image_Viewer_AllImgs` setting, the function uses different regex patterns to match either all images or only those hosted on AmpleNote.

    1. The function loops through the note content to find all matches for image URLs and captions, storing them in the `images` array.

1. **Result Entry Creation:**

    1. For each matched image, a result entry object is created with the following properties:

        1. **`href`**: The URL of the image.

        1. **`src`**: The same URL, used as the image source.

        1. **`caption`**: A combination of the image caption, note name, tags, and UUID.

        1. **`alt`**: The name of the note, used as alternative text for the image.

        1. **`tags`**: A comma-separated list of tags associated with the note.

    1. The result entry is then added to the `resultsArray2`.

1. **Duplicate Removal:**

    1. **`removeDuplicates`**: A helper function that removes duplicate entries from `resultsArray2` to ensure each image is unique in the final output.

1. **JSON Formatting:**

    1. The deduplicated array of image details is converted to a JSON string (`jsonTemplate2`), which can be used for embedding or further processing.

**Outcome:**

- The function processes notes, extracts image URLs and captions, and prepares a deduplicated list of image details. This data is ready for embedding into an image gallery or similar application, ensuring a clean and organized presentation of images.

---

### **Usage Overview:**

- The `"Viewer!"` function primarily sets up a note as an image viewer within AmpleNote, creating or updating the note as needed.

- The `renderEmbed` function processes notes to extract image data, removes duplicates, and formats the information for embedding, supporting the functionality of the image viewer.

These functions together enable the creation and management of a dynamic image gallery within AmpleNote, allowing users to view and organize their images effectively. The documentation provided ensures that developers or users can understand each step of the process, including how inputs are handled and how they affect the final output.