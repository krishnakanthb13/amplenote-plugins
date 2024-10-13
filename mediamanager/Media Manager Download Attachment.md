---
title: Media Manager Download Attachment
uuid: b5af49f4-88b0-11ef-b6ed-62fb339586e5
version: 64
created: '2024-10-12T21:13:22+05:30'
tags:
  - '-t/amplenote/mine'
  - '-2-literature'
  - '-9-permanent'
---

Here’s a structured guide outlining how to use the download functionality of your plugin, along with the auditing feature, based on the provided code documentation.

---

### How To Use the Download Functionality

#### 1. **Initiate the Download:**

- Click on a link within the Amplenote app that is associated with a file attachment.

- The link must follow a UUID pattern (e.g., `123e4567-e89b-12d3-a456-426614174000`) for the download process to proceed.

#### 2. **UUID Validation:**

- When you click the link, the code will check if the link matches the UUID format using a regex pattern.

- If the link is a valid UUID:

    - The download process will initiate.

- If the link is **not valid**:

    - An alert will notify you: **"Link doesn't have any valid UUID attachments pattern."**

#### 3. **Downloading the File:**

- Upon validation, the following happens:

    - The application retrieves the actual attachment URL by calling `app.getAttachmentURL(link.href)`.

    - A temporary HTML anchor (`<a>`) element is created with its `href` set to the fetched URL.

    - The `download` attribute is set to prompt the browser to download the file instead of opening it.

    - The anchor element is programmatically clicked, triggering the download.

    - After the download is triggered, the anchor element is removed from the document to keep it clean.

    - <mark style="color:#F2998C;">Still we are facing some issue with download PDF files.<!-- {"cycleColor":"34"} --></mark>

#### 4. **Receiving User Feedback:**

- After the file download has been initiated, an alert will notify you: **"Your file has been downloaded."**

---

### How To Manage Audit Logs

#### 1. **Understanding Audit Logging:**

- Each time a file is downloaded, the action is logged in an audit note for tracking purposes.

- This helps maintain a record of all downloads, including timestamps and link details.

#### 2. **Audit Note UUID Management:**

- The plugin checks if there is an existing audit note by referencing `app.settings\["Media_Manager_Audit_UUID \[Do not Edit!\]"\]`.

- If an existing UUID is found, it will be used for logging.

- If no UUID exists:

    - A new audit note named **"MD Media Manager: Audit"** is created, tagged with **-reports/-media-manager**.

#### 3. **Creating an Audit Entry:**

- Each download action generates a log entry that includes:

    - **Action:** `File Download!`

    - **Link Details:** in the format `attachment://<link.href>`

    - **Date and Time:** recorded in the format `YYMMDD_HHMMSS`.

#### 4. **Inserting the Audit Entry:**

- The log entry is appended to the audit note using `app.insertNoteContent()`.

- This ensures that all download actions are documented systematically.

---

### Example Scenario

- **Clicking a Link:**

    - You click a link formatted as `123e4567-e89b-12d3-a456-426614174000`.

    - If valid, the file linked to this UUID will start downloading automatically.

- **Log Entry Creation:**

    - The following information is recorded in the audit log:

        - **Action:** File Download!

        - **Link Details:** attachment://123e4567-e89b-12d3-a456-426614174000

        - **Timestamp:** e.g., 241012_143015 (for October 12, 2024, at 2:30:15 PM).

---

### Tips for Optimal Usage

- **UUID Pattern Requirement:**

    - Ensure that all links conform to the UUID pattern for successful downloads.

- **Check for Alerts:**

    - Pay attention to alert messages to understand if a download has started or if there was an issue with the link.

- **Review Audit Logs:**

    - Regularly check the "MD Media Manager: Audit" note for a comprehensive history of downloaded files.

---

This guide should help users effectively navigate and utilize the download feature and its associated audit logging in your plugin.

---

## **Detailed Code Documentation:** 

### How It Works: 

1. **UUID Validation:**

    1. A **regex pattern** (`uuidRegex`) checks whether the `link.href` matches a UUID format. The UUID pattern is a string format with specific hexadecimal and hyphen placements, e.g., `123e4567-e89b-12d3-a456-426614174000`.

1. **Fetching and Downloading Attachment:**

    1. If the link matches the UUID format:

        1. The function calls `app.getAttachmentURL(link.href)` to get the actual attachment URL.

        1. It dynamically creates an `<a>` (anchor) element, sets its `href` to the fetched attachment URL, and assigns an empty `download` attribute. This forces the browser to download the file rather than just opening it.

        1. After programmatically simulating a click on the anchor, the anchor is removed from the document to avoid clutter.

1. **Alerting the User:**

    1. After the file download is triggered, the function uses `app.alert()` to notify the user with a message: "Your file has been downloaded."

1. **Handling Invalid UUIDs:**

    1. If the link doesn’t match the UUID pattern, an alert is shown with the message: "Link doesn't have any valid UUID attachments pattern."

---

### Function: `getCurrentDateTime()` 

#### Purpose: 

This utility function returns the current date and time in a specific format (YYMMDD for date and HHMMSS for time). This ensures that all audit log entries have accurate timestamps.

#### Output: 

- **`YYMMDD`:** The current date in the format `YYMMDD` (e.g., `241012` for October 12, 2024).

- **`HHMMSS`:** The current time in 24-hour format without colons (e.g., `143015` for 2:30:15 PM).

---

### Key Inputs and Outputs: 

1. **Inputs:**

    1. **`app`:** Provides application-level functions like fetching URLs, creating notes, managing settings, and alerts.

    1. **`link`:** The link containing the `href`, which is checked for a valid UUID pattern.

1. **Outputs:**

    1. **File Download:** A file is downloaded if the link contains a valid UUID.

    1. **Audit Report:** The download details (link, timestamp) are logged in the audit note.

### Example Scenario: 

- A user clicks a link with a valid UUID (e.g., `123e4567-e89b-12d3-a456-426614174000`).

- The file is downloaded, and a log entry is created in the **MD Media Manager: Audit** note with details like:

---

\