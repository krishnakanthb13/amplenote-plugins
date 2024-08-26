---
title: Calendar 2.0
uuid: 02a65ee0-639b-11ef-96c6-b6c19b417745
version: 172
created: '2024-08-26T16:34:49+05:30'
tags:
  - '-t/amplenote/mine'
  - '-9-permanent'
---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

Thank you for checking out this plugin! If you've ever wanted to bring a little more organization and ease to your note-taking, you're in the right place. This tool will help you create interactive monthly calendars directly within your notes, making it easier than ever to track your daily activities and stay on top of your schedule.

\

No matter if you're a productivity enthusiast or just someone looking for a better way to organize your notes, this plugin is designed with you in mind. Let's dive in and see how this can help you transform your note-taking experience! 🌟

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/02a65ee0-639b-11ef-96c6-b6c19b417745/3bcfb3c6-7628-4d0b-b8a3-4f7f8a066ade.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### **Overview**

The Calendar Creation Plugin is a simple yet powerful tool that allows you to generate monthly calendars directly within your notes. With customizable options for selecting the month and year, along with the ability to link each day to your daily entries, this plugin is perfect for anyone looking to stay organized and efficient.

\

### **How to Use the Plugin**

1. **Selecting the Month and Year:**

    1. When you run the plugin, you’ll be prompted to select a month and year. This allows you to generate a calendar for any specific time period.

    1. The month and year you select will determine the layout and dates of your calendar.

1. **Linking Daily Entries:**

    1. You can choose whether or not to link each day in the calendar to your daily notes. If enabled, clicking on a date in the calendar will take you directly to that day’s entry.

    1. This feature is particularly useful for tracking habits, journaling, or managing daily tasks.

1. **Custom Tag Support:**

    1. The plugin allows you to select a custom tag to filter which notes are linked in the calendar.

    1. By default, the plugin uses the "daily-jots" tag, but you can change this to any other tag that suits your needs.

1. **Inserting the Calendar into Your Notes:**

    1. Once you’ve selected your options, the plugin will generate the calendar and insert it into your note.

    1. The calendar is neatly formatted, making it easy to view and navigate your monthly schedule.

\

### **Example Workflow**

Here’s how you might use the Calendar Creation Plugin in your daily routine:

1. **Start Your Month:** At the beginning of the month, use the plugin to generate a calendar for the upcoming weeks.

1. **Link Your Daily Entries:** As you create daily entries, they’ll automatically be linked to the corresponding dates in your calendar.

1. **Review and Plan:** Use the calendar to review past entries and plan for the days ahead, all from within a single note.

\

### **FAQs**

- **Q: What if I forget to select a month or year?**

    - **A:** Don’t worry! The plugin defaults to the current month and year if you don’t select anything.

- **Q: Can I use this plugin with other tags?**

    - **A:** Yes! You can customize the tag used to link notes to the calendar, making it flexible for different types of notes.

- **Q: How do I disable the links in the calendar?**

    - **A:** There’s an option to insert the calendar without links. Simply check the box when prompted.

\

Thank you for choosing the Calendar Creation Plugin! We hope it helps you stay organized and enhances your note-taking experience. 

\

`Happy planning! 📅✨`

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Calendar 2.0|
|Icon<!-- {"cell":{"colwidth":105}} -->|event_note|
|Setting|Default Tag to Create Calendar on.|
|Description|A plugin that prompts users to select a month and year, then generates and inserts a customizable calendar with optional links to daily notes.<br />Inspired from: [Calendar Plugin](https://public.amplenote.com/F69rH25euLVVrzxZ1M1YGe2v) |
|Instructions|[Calendar 2.0 Docs](https://www.amplenote.com/notes/82057ddc-639c-11ef-843f-22074e34eefe) |
---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
  // --------------------------------------------------------------------------
  // Class definition for settings related to the calendar feature.
  Settings: class {
    constructor(dailyJotLink, sectionHeader, monthYear) {
      this.dailyJotLink = dailyJotLink;
      this.sectionHeader = sectionHeader;
      this.monthYear = monthYear;
    }
  },
  // --------------------------------------------------------------------------
  // Function to handle month and year selection from a prompt, including calendar creation.
  noteOption: {
    "Month": async function(app, noteUUID) {
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear - 1 , currentYear - 2 , currentYear - 3 , currentYear - 4]; // Adjust the range as needed

      const result = await app.prompt("Select Month and Year (If left Empty, current Month-Year will be considered!)", {
        inputs: [
          {
            label: "Month",
            type: "select",
            options: [
              { label: "January", value: "1" },
              { label: "February", value: "2" },
              { label: "March", value: "3" },
              { label: "April", value: "4" },
              { label: "May", value: "5" },
              { label: "June", value: "6" },
              { label: "July", value: "7" },
              { label: "August", value: "8" },
              { label: "September", value: "9" },
              { label: "October", value: "10" },
              { label: "November", value: "11" },
              { label: "December", value: "12" }
            ]
          },
          {
            label: "Year",
            type: "select",
            options: years.map(year => ({ label: year.toString(), value: year.toString() }))
          },
          { 
            label: "Insert Calendar without links (Unchecked - Link to Daily Jot)", 
            type: "checkbox" 
          },
          { 
            label: "Select a Different Tag (Default:'daily-jots')", 
            type: "tags", 
            limit: 1, 
            placeholder: "Enter tag (Max 1)" 
          }
        ]
      });

      // ----------------------------------------------------------------------
      // Extract results from the prompt and handle default values.
      let [monthNum, yearNum, calWolinks, dailyJotreplace] = result;
      // console.log("dailyJotreplace:", dailyJotreplace);
	  
      // Reverse the checkbox boolean value.
      calWolinks = !calWolinks;
      // Default to the current month if no month is selected.
      monthNum = monthNum || new Date().getMonth() + 1;
      // Default to the current year if no year is selected.
      yearNum = yearNum || new Date().getFullYear();

      // ----------------------------------------------------------------------
      // Handle the default tag settings based on the user input.
      const defaultTag = await (async () => {
        if (dailyJotreplace) {
          await app.setSetting("Default Tag to Create Calendar on.", dailyJotreplace);
        }
        const existingTag = await app.settings["Default Tag to Create Calendar on."] || "daily-jots";
    	return existingTag;
        // console.log("existingTag:",existingTag);
      })();
		
      // console.log("defaultTag:",defaultTag);

      // ----------------------------------------------------------------------
      // Create and insert the calendar content if the month and year are provided.
      if (monthNum && yearNum) {

        // Create monthName from monthNum
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[parseInt(monthNum) - 1];
        
        const monthYear = `${monthNum}-${yearNum}`;
        const headerName = `Calendar (${monthName}-${yearNum}):`;
        const settings = new this.Settings(
          calWolinks, // Insert or not insert links based on checkbox
          headerName, // Header name for the calendar
          monthYear // Selected month and year
        );

        const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag) : new Map();
        const finalContent = `
> ${settings.sectionHeader}


${this._createMonthlyCalendar(dailyJots, settings.monthYear)}


`;
        // console.log("finalContent:", finalContent);
        app.insertNoteContent({ uuid: noteUUID }, finalContent);
      }
    },
  },

  // --------------------------------------------------------------------------
  // Function to retrieve daily jot notes for a given month and year.
  async _getDailyJotsForMonth(app, monthYear, defaultTag) {
    const [month, year] = this._parseMonthYear(monthYear);
    const dailyJots = await app.filterNotes({ tag: `${defaultTag}`, query: `${month} ${year}` });
    const map = dailyJots.reduce((map, jot) => {
      map.set(jot.name.split(" ")[1].replace(/(st,|rd,|th,|nd,)/, ""), jot);
      return map;
    }, new Map());
    return map;
  },

  // --------------------------------------------------------------------------
  // Function to create a formatted calendar for the month, including links to notes if applicable.
  _createMonthlyCalendar(dailyJots, monthYear) {
    const [month, year] = this._parseMonthYear(monthYear);
    const today = new Date(`${month} 1, ${year}`);
    const dayOfWeek = today.getDay();
    const totalDays = (new Date(year, today.getMonth() + 1, 0)).getDate();
    const daysToPrint = Array.from(" ".repeat(dayOfWeek)).concat(Array.from({ length: totalDays }, (e, i) => `${i + 1}`));

    const reducer = (content, day, index) => {
      const dayCell = dailyJots.has(day) ? `[${day}](https://www.amplenote.com/notes/${dailyJots.get(day).uuid})` : day;
      return content +
        "|" +
        dayCell +
        ((index + 1) % 7 === 0 ? "|\n" : ""); // If we have reached Sunday, start a new row
    };

    const initialValue = "|S|M|T|W|T|F|S|\n|-|-|-|-|-|-|-|-|\n";

    const calendar = daysToPrint.reduce(reducer, initialValue);
    return calendar;
  },

  // --------------------------------------------------------------------------
  // Helper function to parse a "Month-Year" string into month name and year.
  _parseMonthYear(monthYear) {
    const [month, year] = monthYear.split("-").map(Number);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return [monthNames[month - 1], year];
  },

  // --------------------------------------------------------------------------
  // Helper function to get the current month and year in "Month-Year" format.
  _getCurrentMonthYear() {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-based, so add 1
    const year = today.getFullYear();
    return `${month}-${year}`;
  },
  // --------------------------------------------------------------------------
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- August 25th, 2024: Sorted out the general and my personal requirement, which will make my life way easier using the calendar plugin. Added inputs for month and year combinations. Tested it and make some tweaks.

- August 26th, 2024: Added prompt for headers, month year combo, and range of years, also implemented lazy mode for not selecting any and letting it take the default mode. Added insert and removed replace options. Finalized and tested the formatting best suited for easy use. Added setting to add only calendar or linked calendar, also added a tag input, in case you do not use daily-jots as daily-jots. Or by default you can use daily-jots. Documentation, proof reading, publish, image, categories, time consumed and discord publicity.

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~**Month + Year Combo**~~

    - ~~**Add Prompt to Manage Header:** Introduce a popup/prompt to input the month and year.~~

    - ~~**Automatic Header Creation:** The plugin automatically generates a header based on the selected month and year and inserts the calendar below it.~~

    - ~~**Default to Current Month/Year:** If the user leaves the fields blank, the current month and year will be used by default.~~

- ~~**Header Management**~~

    - ~~**Inserting Data:** Add an option to insert data below the header rather than replacing the existing content.~~

    - ~~**Dynamic Header Combination:** Consider creating a dynamic header using the selected month and year. Replace the old header and content if this option is selected.~~

- ~~**Calendar Insertion**~~

    - ~~**Inserting Calendars:** The plugin inserts the calendar into the note from the selected note option.~~

- ~~**Settings and Options**~~

    - ~~**Insert Calendar Without Tags:** Add an option in the settings to insert the calendar without tags.~~

    - ~~**Feature:** This feature is already available as "Insert Calendar without links (Unchecked - Link to Daily Jot Notes)".~~

    - ~~**Use Different Tags:** Allow users to select a different tag instead of using the default "daily-jots."~~

    - ~~**Feature:** This option is available as "Select a Different Tag (Default: 'daily-jots')."~~

- ~~**Additional Tasks**~~

    - ~~**Create a Testing Note:** Generate a new note for testing with all the required details.~~

    - ~~**Documentation:** Prepare comprehensive documentation, including GIFs for demonstration.~~

    - ~~**Proofreading:** Ensure that the documentation is proofread for accuracy and clarity.~~

    - ~~**Publishing:** Publish the documentation and the plugin as per your requirements.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Start with Sunday or Start with Monday Option!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^1]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 3h 40m + 8h 36m = \~12h 16m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: [High-Level Explanation of the Code]()

    This code defines a plugin that allows users to generate a calendar for a selected month and year within Amplenote, with the option to link each day to specific daily notes. Here's how it works at a high level:

    - **User Interaction**: The plugin starts by prompting the user to select a month and year, decide whether to include links to daily notes, and optionally choose a different tag for filtering notes.

    - **Settings and Defaults**: If the user does not select a month or year, the current month and year are used as defaults. The plugin also manages a default tag setting that determines which notes to link to the calendar days.

    - **Calendar Creation**: Based on the user's selections, the plugin generates a calendar for the specified month. If the user opted to include links, each day on the calendar will link to the corresponding daily note if it exists.

    - **Content Insertion**: The generated calendar, along with a header, is then inserted into the user's note.

    - **Helper Functions**: The code includes several utility functions to parse the month-year format, retrieve daily notes based on the selected tag and date, and format the calendar in a readable structure.

    In summary, this plugin simplifies the process of creating a monthly calendar within notes, with the flexibility to link each day to relevant daily entries.

