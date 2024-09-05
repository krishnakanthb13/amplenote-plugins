---
title: Time - Progress Bar Docs
uuid: ffc8dd2e-6b9c-11ef-a330-22d98565c2c0
version: 8
created: '2024-09-05T21:09:11+05:30'
tags:
  - '-2-literature'
  - '-9-permanent'
  - '-t/amplenote/mine'
---

# How To: Time Progress and Goal Progress Bar

This documentation will guide you through the functionality, inputs, and behavior of the "Time Progress and Goals Progress Bar" system implemented in JavaScript and HTML.

## Overview

The system allows tracking the progress of time for the current day and for multiple long-term goals (such as monthly, quarterly, or yearly). It dynamically updates the progress bars in real-time and displays the percentage completion for each.

### Components

1. **Today's Time Progress**: A progress bar that visually represents how much of the current day has passed, based on a custom start and end time.

1. **Goal Progress Bars**: Multiple progress bars track the completion of defined goals (like a month, quarter, or year) with their respective start and end dates.

---

## Code Breakdown

### 1. `noteOption` Function

This function creates or retrieves a specific note that shows the time and goals progress bar. It also handles the display settings like "Peek Viewer".

#### **Inputs:**

- `app`: The application instance, which provides the context for creating or retrieving notes and settings.

#### **Key Actions:**

- **New Note Creation**: If a note with the UUID for the time/goal progress bar doesn't exist, it creates a new one.

- **Peek Viewer Handling**: Based on the user’s settings, it decides whether to display the progress bar in the sidebar or as a standalone note.

### 2. `renderEmbed` Function

This is the core function that generates the HTML, CSS, and JavaScript code for embedding the time and goal progress bars.

#### **Inputs:**

- `app`: The application instance, used for dynamic data fetching or interactions.

- `args`: Additional parameters passed for custom configurations (optional).

---

## HTML and CSS Structure

### **HTML Overview:**

- **Container Elements**: There are two main sections:

    1. **Today's Time Progress**: Displays a progress bar representing the passage of time for the current day.

    1. **Goal Days Progress**: Displays progress bars for the defined goals (monthly, quarterly, yearly).

### **CSS Styling:**

- The CSS uses a **flexbox layout** for alignment, making the content responsive and scrollable.

- Progress bars are styled with rounded corners, gradients, and smooth animations for a modern look.

---

## JavaScript Logic

### 1. **Time Progress (for Today)**

The current day's progress is calculated based on custom start and end times.

#### **Inputs:**

- `customDayTime.start`: The time when the progress bar starts (e.g., `"06:00"` for 6 AM).

- `customDayTime.end`: The time when the progress bar ends (e.g., `"21:00"` for 9 PM).

#### **Behavior:**

- The function calculates the percentage of time that has passed between the start and end times and updates the progress bar accordingly.

- The progress is updated every minute using `setInterval`.

### 2. **Goal Progress Bars**

Multiple goals (e.g., for a month, quarter, or year) are defined with their respective start and end dates.

#### **Inputs:**

- `goals\[\]`: An array of goal objects, where each object contains:

    - `name`: The label for the goal (e.g., `"September 2024"`).

    - `startDate`: The start date of the goal (e.g., `"2024-09-01"`).

    - `endDate`: The end date of the goal (e.g., `"2024-09-30"`).

#### **Behavior:**

- For each goal, the progress percentage is calculated based on how much time has passed between the start and end dates.

- Each progress bar is dynamically created and updated every minute to reflect real-time progress.

---

## Example of Inputs and Outputs

### 1. **Custom Time Progress**

```javascript
const customDayTime = {
    start: "06:00",  // Start time for the day (e.g., 6 AM)
    end: "21:00"     // End time for the day (e.g., 9 PM)
};
```

- **Effect**: The progress bar will show how much of the time between 6 AM and 9 PM has passed, updating every minute.

### 2. **Goal Definition**

```javascript
const goals = [
    { name: "September 2024", startDate: "2024-09-01", endDate: "2024-09-30" },
    { name: "Quarter III 2024", startDate: "2024-07-01", endDate: "2024-09-30" },
    { name: "Year 2024", startDate: "2024-01-01", endDate: "2024-12-30" }
];
```

- **Effect**: Three progress bars will be created, each representing the progress for the month of September, Q3 of 2024, and the entire year of 2024.

---

## How to Customize

### 1. **Change Time Settings**

- Modify `customDayTime.start` and `customDayTime.end` to change the time window for today's progress.

### 2. **Add New Goals**

- Add new objects to the `goals\[\]` array with custom `startDate`, `endDate`, and `name` properties to track additional goals.

### 3. **Style Adjustments**

- Customize the `progress-container`, `progress-bar`, and other CSS classes to change the appearance of the progress bars (e.g., colors, size, animations).

---

## Output

- A responsive, dynamically updating webpage that displays the progress for today and multiple long-term goals. It’s designed for easy integration into Amplenote or other apps with similar APIs for note creation and embedding content.

### Example Screenshot:

The output will be a webpage where:

- **Today's Time Progress**: Shows "0%–100%" based on the time passed in the day.

- **Goal Days Progress**: Shows multiple goals with real-time updates.

---

This guide should help you implement, customize, and extend the Time and Goal Progress bar functionality​.