---
title: 'Task Manager Pro: Overall Eisenhower Matrix!'
uuid: bd5244fa-72c0-11ef-870a-eeba9115991d
version: 9
created: '2024-09-14T23:12:40+05:30'
tags:
  - '-2-literature'
  - '-t/amplenote/mine'
  - '-9-permanent'
---

## Detailed Code Documentation: **Eisenhower Matrix Task Manager**

This code defines an asynchronous function `"Overall E.M.!"` designed to generate a report for tasks organized by the Eisenhower Matrix. The report summarizes tasks by their importance and urgency and outputs them into a new note on Amplenote, complete with tags and progress indicators.

### **High-Level Overview**

- **Purpose:**

    - The function generates a task report categorized by the Eisenhower Matrix: Important & Urgent (🔥), Important but Not Urgent (⚡), Not Important but Urgent (⚾), and Not Important & Not Urgent (🗑️).

    - This report is stored in a newly created note, organized in a table format, and linked for easy navigation.

    - A progress bar feature is provided, using customizable emoji sets for visual representation.

---

### **Code Breakdown**

#### 1. **Initializing Variables**

- **`results` (Set):**

    - This holds the final list of unique notes with task details. The use of a `Set` ensures that no duplicate entries are added.

- **`notesGroupNames` (Set):**

    - This stores the names of notes grouped by tags. Like `results`, a `Set` is used to avoid duplicates.

---

#### 2. **Filtering Notes by Group**

- **`notesG = await app.filterNotes({ })`:**

    - This function fetches a filtered list of notes. In this case, it's set to retrieve all notes (`{}`), but it can be customized by specifying a group (like `taskLists`).

- **Sorting Notes:**

    - The notes are sorted alphabetically by their name (`notesG.sort((a, b) => nameA.localeCompare(nameB));`).

    - They are then re-sorted by their tags (`notesG.sort((a, b) => a.tags.join(", ").localeCompare(b.tags.join(", ")));`).

---

#### 3. **Processing Each Note**

The core logic for processing notes and tasks follows:

- **Retrieve Tasks:**

    - `const taskAll = await app.getNoteTasks({ uuid: noteHandleG.uuid }, { includeDone: false })` retrieves all tasks for each note that are not marked as done.

- **Classify Tasks:**

    - The code categorizes tasks into the four Eisenhower quadrants:

        - **Quadrant 1:** Important & Urgent (🔥)

        - **Quadrant 2:** Important & Not Urgent (⚡)

        - **Quadrant 3:** Not Important & Urgent (⚾)

        - **Quadrant 4:** Not Important & Not Urgent (🗑️)

- **Total Score Calculation:**

    - The total score of all tasks is computed using `const totalScore = parseFloat(taskAll.reduce((sum, task) => sum + (task.score \|\| 0), 0).toFixed(2));`.

- **Add to Results:**

    - For each note, if it contains any tasks in any quadrant, a row is added to the `notesGroupNames` set. This row contains:

        - **Tags:** The note's tags.

        - **Note Link:** A clickable link to the note.

        - **Task Counts:** The number of tasks in each quadrant.

        - **Total Score:** Sum of all task scores.

---

#### 4. **Preparing the Final Output**

- **`results = Array.from(notesGroupNames);`:**

    - Converts the set of note details into an array to enable easier handling.

- **Markdown Table:**

    - A table with headers is created for the report. It includes:

        - **Tags 🏷️**

        - **Note Link 🔗**

        - **🔥 (Important & Urgent)**

        - **⚡ (Important but Not Urgent)**

        - **⚾ (Not Important but Urgent)**

        - **🗑️ (Not Important & Not Urgent)**

        - **🔢 (Total Task Score)**

        - **✒️ (Comments)**

- **Readme Notes:**

    - A detailed readme section is included at the top of the report. It explains the table and how to interpret the different sections, symbols, and tasks.

---

#### 5. **Creating a New Note**

- **Generating Filename:**

    - The note's filename is based on the current date and time (`TM_Overall_E_M_YYMMDD_HHMMSS`), ensuring uniqueness.

- **Creating Note and Inserting Content:**

    - A new note is created with the filename and assigned to the tag `-reports/-task-manager`.

    - The markdown table (generated earlier) is inserted into the new note.

- **Navigate to New Note:**

    - Once the note is created, the function automatically navigates to the new note's URL (`https://www.amplenote.com/notes/${noteUUIDNew}`).

---

### **How To Use**

1. **Set Up in Amplenote:**

    1. This function is designed to run in an environment like Amplenote's task manager. It filters and processes tasks from your notes.

1. **Customize Emoji Sets:**

    1. You can customize the emoji progress bar by modifying the `emojiSets` object or selecting a different set through `app.settings\["Emoji"\]`.

1. **Run the Report:**

    1. When the function is run, it processes all notes, categorizes tasks using the Eisenhower matrix, and generates a new note with the summarized report.

1. **Analyze the Output:**

    1. Review the generated table for task distribution across Eisenhower quadrants. Use the task progress bar to quickly assess the status of task completion.

---

### **Conclusion**

This script automates the process of categorizing tasks based on urgency and importance, generates insightful reports, and provides visual feedback via customizable progress bars. It helps in organizing and prioritizing tasks efficiently by leveraging the Eisenhower Matrix framework.