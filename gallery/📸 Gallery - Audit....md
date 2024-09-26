---
title: "\U0001F4F8 Gallery - Audit..."
uuid: 543b546a-5d40-11ef-aaa7-b6c19b417745
version: 25
created: '2024-08-18T14:30:34+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

## Audit + Creating and Retrieval + Navigation

#### 1. **Date and Time Formatting**

- The function `getCurrentDateTime()` is used to get the current date and time, formatted as `YYMMDD_HHMMSS`.

- This format is crucial for timestamping the audit log entries, providing an accurate record of when actions are taken.

#### 2. **Creating or Retrieving Notes**

- The script first attempts to retrieve existing notes or create new ones if they don't exist. There are two main notes involved:

    1. Example - **Gallery Image Viewer Note:** This note is where the gallery content will be embedded.

    1. Example - **Gallery Image Audit Note:** This note logs the actions taken within the gallery viewer.

- The script checks if these notes already exist by looking for a stored `UUID` (Universally Unique Identifier).

- If the `UUID` exists, it retrieves the corresponding note. If not, it creates a new note and stores its `UUID` in the plugin settings to avoid creating duplicates in the future.

#### 3. **Audit Report Creation**

- An audit log is crucial for tracking actions taken in the gallery viewer. The script generates an audit entry each time the gallery is accessed.

- The audit log includes:

    - The name of the gallery option used (in this case, Example - "Viewer!").

    - A note about the images being displayed (here, it indicates that all images are shown).

    - A link to the gallery note, allowing quick access to it.

    - The exact timestamp of when the action was performed (`YYMMDD_HHMMSS`).

- The audit entry is then inserted into the `Gallery Image Audit Note`, ensuring that there is a record of each interaction with the gallery viewer.

#### 4. **Navigating to the Gallery Note**

- After setting up the notes and logging the audit entry, the script updates the content of the `Gallery Image Viewer Note` with an embedded object.

- This object points to the plugin, allowing the gallery to be viewed directly within the note.

- Finally, the script navigates the user to the gallery note, so they can immediately interact with the embedded gallery.

### Key Features Explained

- **Navigation:**

    - The script concludes by navigating the user to the gallery note's URL in AmpleNote. This ensures that after setting up or updating the gallery, the user is automatically taken to the right place to view and interact with it.

    - The URL used in navigation is dynamically generated based on the `UUID` of the gallery note.

- **Audit Features:**

    - The audit log serves as a history of all interactions with the gallery viewer. It provides a detailed record of what options were selected and when they were accessed.

    - This feature is especially useful for tracking usage, troubleshooting, or reviewing past actions. Each entry in the audit log is timestamped and linked to the specific gallery note involved, ensuring transparency and traceability.

This script not only helps manage the gallery content efficiently but also ensures that all actions are logged for future reference, providing a seamless experience for both new and experienced users.

---

\