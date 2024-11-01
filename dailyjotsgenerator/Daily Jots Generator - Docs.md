---
title: Daily Jots Generator - Docs
uuid: cd147828-9826-11ef-8733-7b5929f76244
version: 13
created: '2024-11-01T13:26:30+05:30'
tags:
  - '-2-literature'
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# Documentation: Date List Generator Code

This code generates a list of formatted dates for use in tagging, organization, or logging. 

By following this guide, you can learn how to input various settings and understand how each input influences the generated output.

---

## Overview

The code prompts the user to provide details for generating a list of dates formatted with tags and ordinal suffixes. Based on the user’s preferences, it can generate dates in either chronological or reverse chronological order.

---

## User Inputs

Upon running the code, the user will be prompted to enter specific details that configure the output. Here is a breakdown of each input, its purpose, and how it affects the final output.

### Inputs

1. **Tags** (`label: "Select the Tags (Default: daily-jots)"`)

    1. **Type**: Tag selector (expects a tag name)

    1. **Purpose**: Specifies a tag to categorize the generated dates. If no tag is selected, the code uses `"daily-jots"` as the default tag.

    1. **Effect on Output**: The chosen tag will appear as a prefix to each date in the final list.

1. **Number of Days** (`label: "Select the Number of Days (Default: 10, if left blank)"`)

    1. **Type**: String (expects a number, parsed into an integer)

    1. **Purpose**: Determines the number of dates to generate, starting from the selected start date.

    1. **Effect on Output**: Controls the length of the generated date list. If left blank, it defaults to 10.

1. **Reverse Chronological Order** (`label: "Reverse Chronological Order (Default: Chronological)"`)

    1. **Type**: Checkbox (Boolean)

    1. **Purpose**: Sets the order in which the dates are listed.

        1. **Unchecked**: Dates are listed in chronological order (earliest to latest).

        1. **Checked**: Dates are listed in reverse chronological order (latest to earliest).

    1. **Effect on Output**: Changes the ordering of dates based on the checkbox status.

1. **Start Date** (`label: "Select the Start Date (MM/DD/YYYY)", value: <formatted today’s date>`)

    1. **Type**: String (expects a date in `MM/DD/YYYY` format)

    1. **Purpose**: Specifies the starting point for generating dates. The code defaults to today’s date if the input is blank.

    1. **Effect on Output**: Defines the beginning of the date range from which subsequent dates are calculated.

---

## How the Code Works

1. **Prompt and Collect Inputs**:

    1. When the function runs, the user is prompted to enter values for each input listed above.

    1. Default values are used if certain fields are left blank (e.g., “daily-jots” as the tag, today’s date as the start date, 10 days for number of days).

1. **Process Inputs**:

    1. Each input is processed:

        1. **Tag**: Defaults to `"daily-jots"` if not specified.

        1. **Number of Days**: Converted to an integer and defaults to `10` if blank.

        1. **Start Date**: Set to today’s date if left blank.

        1. **Chronological Order**: Checked to determine if dates should be reversed.

1. **Date Generation and Formatting**:

    1. The code generates dates starting from the specified start date, iterating up to the number of days entered.

    1. Each date is formatted to include:

        1. The tag,

        1. The month name,

        1. The day of the month with an ordinal suffix (e.g., "1st," "2nd," "3rd").

1. **Ordering**:

    1. The list is reversed if reverse chronological order is selected.

1. **Output**:

    1. The final list of dates is printed in the console for viewing or further use.

---

## Function Details

### `generateDates(startDate, days)`

- **Purpose**: Generates and formats a series of dates.

- **Parameters**:

    - `startDate` (Date object): Start date for the sequence.

    - `days` (integer): Number of days to generate.

- **Returns**: Array of formatted date strings.

### `getSuffix(day)`

- **Purpose**: Provides the correct ordinal suffix (`st`, `nd`, `rd`, `th`) for the day of the month.

- **Parameter**:

    - `day` (integer): Day of the month.

- **Returns**: String with the appropriate suffix.

---

\