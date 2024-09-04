---
title: Calendar Pro Docs
uuid: c13a4d68-6ad4-11ef-b13d-126797ff7670
version: 6
created: '2024-09-04T21:15:47+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

### Detailed Code Documentation

---

#### **1. Class: `Settings`**

- **Purpose:** Stores the settings related to calendar creation.

- **Inputs:**

    - `dailyJotLink` (Boolean): Determines if links to daily jots are included in the calendar.

    - `sectionHeader` (String): The header to be displayed at the top of the calendar section.

    - `monthYear` (String): The month and year for which the calendar is being created, formatted as `MM-YYYY`.

- **Effect on Output:**

    - Controls how the calendar is structured (e.g., with or without links).

    - Defines the header that appears above the calendar.

    - Specifies the date range for the calendar.

---

#### **2. Function: `noteOption.Monthly`**

- **Purpose:** Handles the creation of a monthly calendar based on user input.

- **Inputs:**

    - `app` (Object): Reference to the Amplenote app.

    - `noteUUID` (String): Unique identifier for the note where the calendar will be inserted.

- **Prompt Inputs:**

    - `Month` (Dropdown): Allows the user to select the month. Defaults to the current month if left empty.

    - `Year` (Dropdown): Allows the user to select the year. Defaults to the current year if left empty.

    - `Insert Calendar without links` (Checkbox): If checked, no links to daily jots are included.

    - `Select a Different Tag` (Tags Input): Allows selecting a tag for filtering daily jots. Defaults to 'daily-jots'.

- **Effect on Output:**

    - Generates and inserts a calendar for the selected month and year.

    - Adjusts the calendar content based on the inclusion of links and the selected tag.

---

#### **3. Function: `noteOption.Yearly`**

- **Purpose:** Handles the creation of a yearly calendar.

- **Inputs:**

    - `app` (Object): Reference to the Amplenote app.

    - `noteUUID` (String): Unique identifier for the note where the calendar will be inserted.

- **Prompt Inputs:**

    - `Year` (Dropdown): Allows the user to select the year. Defaults to the current year if left empty.

    - `Insert Calendar without links` (Checkbox): If checked, no links to daily jots are included.

    - `Select a Different Tag` (Tags Input): Allows selecting a tag for filtering daily jots. Defaults to 'daily-jots'.

- **Effect on Output:**

    - Generates a calendar for each month of the selected year.

    - The calendar is combined into a single note, organized with monthly headers.

---

#### **4. Function: `noteOption.Quarterly`**

- **Purpose:** Handles the creation of a quarterly calendar.

- **Inputs:**

    - `app` (Object): Reference to the Amplenote app.

    - `noteUUID` (String): Unique identifier for the note where the calendar will be inserted.

- **Prompt Inputs:**

    - `Insert Calendar without links` (Checkbox): If checked, no links to daily jots are included.

    - `Select a Different Tag` (Tags Input): Allows selecting a tag for filtering daily jots. Defaults to 'daily-jots'.

- **Effect on Output:**

    - Generates a calendar for the last three months.

    - Organizes the content into a quarterly format and inserts it into the specified note.

---

#### **5. Function: `insertText.Monthly`**

- **Purpose:** Inserts a monthly calendar directly into the selected text area.

- **Inputs:**

    - `app` (Object): Reference to the Amplenote app.

    - `noteUUID` (String): Unique identifier for the note where the calendar will be inserted.

- **Prompt Inputs:**

    - `Month` (Dropdown): Allows the user to select the month. Defaults to the current month if left empty.

    - `Year` (Dropdown): Allows the user to select the year. Defaults to the current year if left empty.

    - `Insert Calendar without links` (Checkbox): If checked, no links to daily jots are included.

    - `Select a Different Tag` (Tags Input): Allows selecting a tag for filtering daily jots. Defaults to 'daily-jots'.

- **Effect on Output:**

    - Inserts the generated monthly calendar at the cursor position within the note.

---

#### **6. Helper Functions**

- **`_getDailyJotsForMonth`:**

    - **Purpose:** Retrieves daily jot notes for a given month and year, based on a specified tag.

    - **Effect on Output:** Determines which days in the calendar have associated jots with links.

- **`_createMonthlyCalendar`:**

    - **Purpose:** Creates a formatted calendar for the month, optionally including links to daily jots.

    - **Effect on Output:** Generates the calendar structure, with or without clickable links.

- **`_getMonthYearHeader`:**

    - **Purpose:** Returns a formatted string to be used as a header for the calendar, based on the month and year.

    - **Effect on Output:** Customizes the calendar's header with month and year information.

- **`_parseMonthYear`:**

    - **Purpose:** Converts a `MM-YYYY` string into a month name and year.

    - **Effect on Output:** Ensures correct date formatting within the calendar.

- **`_getCurrentMonthYear`:**

    - **Purpose:** Returns the current month and year in `MM-YYYY` format.

    - **Effect on Output:** Provides default date values if none are specified by the user.

---

This detailed documentation provides a structured and comprehensive guide to understanding the purpose and functionality of each component within the `Calendar Pro.js` code. It is designed to be referenced easily by users with varying levels of familiarity with the codebase.