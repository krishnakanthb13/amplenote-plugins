---
title: Calendar 2.0 Docs
uuid: 82057ddc-639c-11ef-843f-22074e34eefe
version: 20
created: '2024-08-26T16:45:31+05:30'
tags:
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# Plugin Documentation: Calendar Creation Plugin

## Overview

This plugin enables users to generate a customizable monthly calendar within their notes. The calendar can include links to daily entries (jots) and allows users to specify the month, year, and tagging preferences. The calendar is inserted directly into a note, providing an organized and interactive view of the selected month.

---

## 1. **Settings Class**

### **Purpose**

The `Settings` class is a core part of the plugin that stores configuration details related to the calendar creation process. These settings dictate how the calendar will be generated and displayed.

### **Inputs**

- **`dailyJotLink`**: A boolean value indicating whether to include links to daily jots in the calendar. If `true`, each day in the calendar will link to the corresponding daily jot if available.

- **`sectionHeader`**: A string that defines the header for the calendar section in the note. This typically includes the month and year of the calendar.

- **`monthYear`**: A string representing the selected month and year in the format "MM-YYYY". This determines which month's calendar will be generated.

### **Functionality**

The class constructor initializes the settings with the provided values, which will be used later in the process of creating and inserting the calendar into the note.

### **Impact on Final View**

The settings defined here directly influence the appearance and functionality of the calendar in the note, including whether links are included, the title of the calendar section, and which month's calendar is displayed.

---

## 2. **noteOption.Month Function**

### **Purpose**

The `noteOption.Month` function is the main driver of the plugin, responsible for interacting with the user, capturing their preferences, and generating the calendar accordingly.

### **Inputs**

- **`app`**: The Amplenote note-taking application's API object, providing methods to interact with the app, such as displaying prompts and inserting content.

- **`noteUUID`**: A unique identifier for the note where the calendar will be inserted.

### **User Prompt**

Upon invocation, the function prompts the user with the following options:

- **`Month`**: A dropdown selection for the user to choose the desired month (e.g., January, February, etc.).

- **`Year`**: A dropdown selection for the user to choose the desired year. By default, it provides a range of years (last year, current year, next two years).

- **`Insert Calendar without links`**: A checkbox that, if checked, creates a calendar without links to daily jots. If unchecked, the calendar will include links to daily entries.

- **`Select a Different Tag`**: A tag selection input, limited to one tag, allowing the user to specify a different tag for filtering daily jots. If no tag is selected, it defaults to "daily-jots."

### **Functionality**

1. **Extracting User Input**: The function captures the user's selections from the prompt and handles default values if the user skips any input.

1. **Processing Defaults**: If the user does not select a month or year, the current month and year are used.

1. **Tag Management**: If the user selects a different tag, it updates the default tag setting. If not, it uses the existing default tag or falls back to "daily-jots."

1. **Calendar Generation**: Using the captured month, year, and other settings, the function generates a calendar. If links are enabled, it includes links to daily jots based on the selected tag.

### **Impact on Final View**

The calendar, with the chosen month, year, and settings, is inserted into the specified note. The calendar will appear with a header and optionally include links to daily entries, depending on the user's selections.

---

## 3. **_getDailyJotsForMonth Function**

### **Purpose**

The `_getDailyJotsForMonth` function retrieves daily notes (jots) for the specified month and year, filtered by the selected tag. This function is critical when the calendar is configured to include links to daily jots.

### **Inputs**

- **`app`**: The Amplenote application API object.

- **`monthYear`**: The month and year string in "MM-YYYY" format.

- **`defaultTag`**: The tag used to filter notes, typically "daily-jots" or any user-selected alternative.

### **Functionality**

1. **Parsing Month and Year**: The function parses the `monthYear` string to separate the month and year.

1. **Filtering Notes**: It queries the app for notes tagged with the specified tag and created in the selected month and year.

1. **Mapping Notes**: The function creates a map where each day of the month is mapped to its corresponding jot, removing ordinal indicators (e.g., "st", "nd", "rd", "th").

### **Impact on Final View**

If links are enabled, the retrieved jots are used to create clickable links for each corresponding day in the calendar, enhancing the calendar's interactivity.

---

## 4. **_createMonthlyCalendar Function**

### **Purpose**

The `_createMonthlyCalendar` function formats the monthly calendar, creating a structured layout that can include links to daily jots.

### **Inputs**

- **`dailyJots`**: A map of daily notes for the month, where each day is linked to its corresponding jot.

- **`monthYear`**: The month and year string in "MM-YYYY" format.

### **Functionality**

1. **Month and Year Parsing**: The function first parses the `monthYear` string to get the full month name and year.

1. **Day Calculation**: It calculates the day of the week for the first day of the month and determines the total number of days in the month.

1. **Calendar Layout**: The days of the month are laid out in a table format, with each day potentially linking to its corresponding jot if links are enabled.

1. **Row Creation**: The days are organized into rows by week, starting each new row on Sunday.

### **Impact on Final View**

The output is a formatted calendar with each day of the month. If applicable, days with linked jots are clickable, providing quick access to the corresponding notes.

---

## 5. **_parseMonthYear Function**

### **Purpose**

The `_parseMonthYear` function is a utility that converts a "MM-YYYY" formatted string into a full month name and year.

### **Inputs**

- **`monthYear`**: The month and year string in "MM-YYYY" format.

### **Functionality**

- **Month and Year Extraction**: The function splits the input string to extract the month number and year.

- **Conversion**: It converts the month number to its corresponding name (e.g., "01" to "January").

### **Impact on Final View**

This parsed information is used to format the calendar's header and ensure the correct month is displayed.

---

## 6. **_getCurrentMonthYear Function**

### **Purpose**

The `_getCurrentMonthYear` function is a utility to generate the current month and year in "MM-YYYY" format.

### **Inputs**

- **None**: This function relies on the current date.

### **Functionality**

- **Date Retrieval**: It gets the current date from the system and extracts the month and year.

- **Formatting**: The month and year are formatted into a string in "MM-YYYY" format.

### **Impact on Final View**

This utility is primarily used to set default values for the month and year if the user does not provide them, ensuring the calendar reflects the current month by default.

---

## Conclusion

This plugin provides a flexible and interactive way to generate monthly calendars within notes, with options to link each day to specific daily jots. The detailed settings and utilities allow users to customize the calendar based on their preferences, making it a powerful tool for organizing and navigating notes by date.

\

By understanding the purpose and functionality of each component, you can effectively customize and integrate this plugin into your note-taking workflow.

---

### High Level Explanation of the Code:

1. **Settings Class**: Defines a class to store settings related to calendar creation.

1. **`noteOption.Month` Function**: Handles the logic for selecting a month and year via a prompt and then creating a calendar.

1. **Default Values Handling**: Ensures default values are set for the month, year, and tag if the user doesn't provide them.

1. **`_getDailyJotsForMonth` Function**: Retrieves daily jot notes for the selected month and year.

1. **`_createMonthlyCalendar` Function**: Creates the actual calendar content, including links to daily jots if applicable.

1. **Helper Functions**: Contains utility functions to parse month-year strings and get the current month-year.