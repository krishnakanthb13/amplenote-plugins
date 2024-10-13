---
title: Calendar Pro
uuid: 02a65ee0-639b-11ef-96c6-b6c19b417745
version: 408
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

### <mark style="color:#BBA215;">Calendar Pro:<!-- {"cycleColor":"25"} --></mark>

![](https://images.amplenote.com/02a65ee0-639b-11ef-96c6-b6c19b417745/9f5c64b7-1679-4c4a-9b44-9111373e98d1.gif)

<mark style="color:#F2998C;">**Note:**<!-- {"cycleColor":"34"} --></mark> To the call the Plugin, you need to now click on **`ctrl + o `**and select the options to call the plugin.

### <mark style="color:#BBA215;">Calendar 2.0:<!-- {"cycleColor":"25"} --></mark>

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

1. **Inserting the Calendar into Your Notes under a Designated Tag: `-reports/-calendar-pro`**

    1. Once you’ve selected your options, the plugin will generate the calendar and insert it into your note or take you to the respective note!.

    1. The calendar is neatly formatted, making it easy to view and navigate your monthly schedule.

    1. Generated time is also captured!

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
|Name<!-- {"cell":{"colwidth":102}} -->|Calendar Pro<!-- {"cell":{"colwidth":834}} -->|
|Icon<!-- {"cell":{"colwidth":105}} -->|event_note<!-- {"cell":{"colwidth":834}} -->|
|Setting|Default Tag to Create Calendar on.<!-- {"cell":{"colwidth":834}} -->|
|Setting|Yearly Option \[Do not Edit!\]<!-- {"cell":{"colwidth":834}} -->|
|Setting|Quarterly Option \[Do not Edit!\]<!-- {"cell":{"colwidth":834}} -->|
|Setting|Monthly Option \[Do not Edit!\]<!-- {"cell":{"colwidth":834}} -->|
|Description|[^1]<!-- {"cell":{"colwidth":834}} -->|
|Instructions|[Calendar Pro Docs](https://www.amplenote.com/notes/c13a4d68-6ad4-11ef-b13d-126797ff7670) <!-- {"cell":{"colwidth":834}} -->|
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
  // Function to handle month and year selection from a prompt, including calendar creation. -- noteOption
  appOption: {
    "Monthly": async function(app, noteUUID) {
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

      // Fetch daily jots for the current month
	  const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag) : new Map();

	  // ----------------------------------------------------------------------
	  // Function to get current date and time formatted as YYMMDD_HHMMSS
	  function getCurrentDateTime() {
		const now = new Date();
		// Format the date and time as per requirement
		const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
		const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
		return { YYMMDD, HHMMSS };
		}
	  const { YYMMDD, HHMMSS } = getCurrentDateTime();

        const finalContent = `
> <mark style="color:#3CC07D;">**${settings.sectionHeader} Monthly**<!-- {"cycleColor":"27"} --></mark>
> **Generated on:** ${YYMMDD}_${HHMMSS}


${this._createMonthlyCalendar(dailyJots, settings.monthYear)}


`;

      // ----------------------------------------------------------------------
	  // Create Save Retrive Save Note to View the Monthly Note Calendar Option
	  const newNoteName = `Calendar Pro: Monthly`;
	  const newTagName = ['-reports/-calendar-pro'];
      // Handle the insert note UUID.
		const noteUUIDz = await (async () => {
		  const existingUUID = await app.settings["Monthly Option [Do not Edit!]"];
		  if (existingUUID)
			  return existingUUID;
		  const newUUIDx = await app.createNote(newNoteName, newTagName);
		  await app.setSetting("Monthly Option [Do not Edit!]", newUUIDx);
		  return newUUIDx;
		})();

      // Insert the accumulated content for the whole year into the note.
	  // console.log("finalContent:", finalContent);
      await app.replaceNoteContent({ uuid: noteUUIDz }, finalContent);
	  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
      }
    },
  // --------------------------------------------------------------------------
  // Function to handle year selection from a prompt, including calendar creation. -- noteOption
     "Yearly": async function(app, noteUUID) {
		  const currentYear = new Date().getFullYear();
		  const years = [currentYear, currentYear - 1 , currentYear - 2 , currentYear - 3 , currentYear - 4]; // Adjust the range as needed
		  
		  const result = await app.prompt("Select Year (If left Empty, current Year will be considered!)", {
			inputs: [
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
		  let [yearNum, calWolinks, dailyJotreplace] = result;
		  // console.log("dailyJotreplace:", dailyJotreplace);
		  
		  // Reverse the checkbox boolean value.
		  calWolinks = !calWolinks;
		  // Default to the current month if no month is selected.
		  // monthNum = monthNum || new Date().getMonth() + 1;
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
		  // Generate the full calendar for each month of the current year.
		  const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		  ];

		  // Loop through each month of the year
		  let finalContent = '';
		  
		  for (let monthNum = 1; monthNum <= 12; monthNum++) {
			const monthName = monthNames[monthNum - 1];
			const monthYear = `${monthNum}-${yearNum}`;
			const headerName = `Calendar (${monthName}-${yearNum}):`;

			// Generate the settings for each month
			const settings = new this.Settings(
			  calWolinks, // Assume links should be inserted
			  headerName, // Header name for the calendar
			  monthYear // Current month and year
			);

			// Fetch daily jots for the current month
			// const dailyJots = await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag);
			const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag) : new Map();

		  // ----------------------------------------------------------------------
		  // Function to get current date and time formatted as YYMMDD_HHMMSS
		  function getCurrentDateTime() {
			const now = new Date();
			// Format the date and time as per requirement
			const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
			const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
			return { YYMMDD, HHMMSS };
			}
		  const { YYMMDD, HHMMSS } = getCurrentDateTime();
			
			// Generate and accumulate the calendar content for each month
			finalContent += `
> <mark style="color:#F8914D;">**${settings.sectionHeader} Yearly**<!-- {"cycleColor":"24"} --></mark>
> **Generated on:** ${YYMMDD}_${HHMMSS}


${this._createMonthlyCalendar(dailyJots, settings.monthYear)}


`;
		  }

      // ----------------------------------------------------------------------
	  // Create Save Retrive Save Note to View the Yearly Note Calendar Option
	  const newNoteName = `Calendar Pro: Yearly`;
	  const newTagName = ['-reports/-calendar-pro'];
      // Handle the insert note UUID.
		const noteUUIDz = await (async () => {
		  const existingUUID = await app.settings["Yearly Option [Do not Edit!]"];
		  if (existingUUID)
			  return existingUUID;
		  const newUUIDx = await app.createNote(newNoteName, newTagName);
		  await app.setSetting("Yearly Option [Do not Edit!]", newUUIDx);
		  return newUUIDx;
		})();
		  
		  // Insert the accumulated content for the whole year into the note.
		  // console.log("finalContent:", finalContent);
		  await app.replaceNoteContent({ uuid: noteUUIDz }, finalContent);
		  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
		},

  // --------------------------------------------------------------------------
  // Function to handle Last Quarter selection from a prompt, including calendar creation. -- noteOption
    "Quarterly": async function(app, noteUUID) {
		  const currentYear = new Date().getFullYear();
		  const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
		  const years = [currentYear, currentYear - 1 , currentYear - 2 , currentYear - 3 , currentYear - 4]; // Adjust the range as needed
		  
		  const result = await app.prompt("Last Three Months will be Selected by default", {
			inputs: [
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
		  let [calWolinks, dailyJotreplace] = result;
		  // console.log("dailyJotreplace:", dailyJotreplace);
		  
		  // Reverse the checkbox boolean value.
		  calWolinks = !calWolinks;
		  // Default to the current month if no month is selected.
		  // monthNum = monthNum || new Date().getMonth() + 1;
		  // Default to the current year if no year is selected.
		  // yearNum = yearNum || new Date().getFullYear();

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
		  // Generate the full calendar for each month of the current year.
		  const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		  ];

		  // Loop through the last three months
		  let finalContent = '';
		  
		  for (let i = 0; i < 3; i++) {
			let monthNum = currentMonth - i;
			let year = currentYear;

			// Adjust the month and year if needed (e.g., going from January to December of the previous year)
			if (monthNum <= 0) {
			  monthNum += 12;
			  year -= 1;
			}

			const monthName = monthNames[monthNum - 1];
			const monthYear = `${monthNum}-${year}`;
			const headerName = `Calendar (${monthName}-${year}):`;

			// Generate the settings for each month
			const settings = new this.Settings(
			  calWolinks, // Assume links should be inserted
			  headerName, // Header name for the calendar
			  monthYear // Selected month and year
			);

			// Fetch daily jots for the current month
			// const dailyJots = await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag);
			const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag) : new Map();

		  // ----------------------------------------------------------------------
		  // Function to get current date and time formatted as YYMMDD_HHMMSS
		  function getCurrentDateTime() {
			const now = new Date();
			// Format the date and time as per requirement
			const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
			const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
			return { YYMMDD, HHMMSS };
			}
		  const { YYMMDD, HHMMSS } = getCurrentDateTime();
			
			// Generate and accumulate the calendar content for each of the last three months
			finalContent += `
> <mark style="color:#F3DE6C;">**${settings.sectionHeader} Quarterly**<!-- {"cycleColor":"36"} --></mark>
> **Generated on:** ${YYMMDD}_${HHMMSS}


${this._createMonthlyCalendar(dailyJots, settings.monthYear)}


`;
		  }

      // ----------------------------------------------------------------------
	  // Create Save Retrive Save Note to View the Monthly Note Calendar Option
	  const newNoteName = `Calendar Pro: Quarterly`;
	  const newTagName = ['-reports/-calendar-pro'];
      // Handle the insert note UUID.
		const noteUUIDz = await (async () => {
		  const existingUUID = await app.settings["Quarterly Option [Do not Edit!]"];
		  if (existingUUID)
			  return existingUUID;
		  const newUUIDx = await app.createNote(newNoteName, newTagName);
		  await app.setSetting("Quarterly Option [Do not Edit!]", newUUIDx);
		  return newUUIDx;
		})();
		  
		  // Insert the accumulated content for the whole year into the note.
		  // console.log("finalContent:", finalContent);
		  await app.replaceNoteContent({ uuid: noteUUIDz }, finalContent);
		  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);
		},

  // --------------------------------------------------------------------------
  }, // End noteOption

  // --------------------------------------------------------------------------
  // Function to handle month and year selection from a prompt, including calendar creation. -- innerText
  insertText: {
    "Monthly": async function(app, noteUUID) {
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

        // Fetch daily jots for the current month
		const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear, defaultTag) : new Map();

		  // ----------------------------------------------------------------------
		  // Function to get current date and time formatted as YYMMDD_HHMMSS
		  function getCurrentDateTime() {
			const now = new Date();
			// Format the date and time as per requirement
			const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
			const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
			return { YYMMDD, HHMMSS };
			}
		  const { YYMMDD, HHMMSS } = getCurrentDateTime();
		
		// Generate and accumulate the calendar content for each month
        const finalContent = `
> <mark style="color:#CE60D7;">**${settings.sectionHeader} Monthly**<!-- {"cycleColor":"31"} --></mark>
> **Generated on:** ${YYMMDD}_${HHMMSS}


${this._createMonthlyCalendar(dailyJots, settings.monthYear)}


`;
        // Insert the accumulated content for the whole year into the note.
		// console.log("finalContent:", finalContent);
        await app.context.replaceSelection(finalContent);
      }
    },
  
  // --------------------------------------------------------------------------
  }, // End insertText

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

    const initialValue = `${this._getMonthYearHeader(monthYear)}\n|-|-|-|-|-|-|-|\n|S|M|T|W|T|F|S|\n`;

    const calendar = daysToPrint.reduce(reducer, initialValue);
    return calendar;
  },

  // --------------------------------------------------------------------------
  // Helper function to get the current month and year in "Month-Year" format.
  _getMonthYearHeader(monthYear) {
    const [month, year] = monthYear.split("-");
    const monthNames = ["J|A|N", "F|E|B", "M|A|R", "A|P|R", "M|A|Y", "J|U|N", "J|U|L", "A|U|G", "S|E|P", "O|C|T", "N|O|V", "D|E|C"];
    const lastTwoDigits = year.toString().slice(-2);
    const [firstDigit, secondDigit] = lastTwoDigits;
    const header = `|-|${monthNames[parseInt(month) - 1]}|${firstDigit}|${secondDigit}|-|`;
    return header;
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
  // Function to get current date and time formatted as YYMMDD_HHMMSS
/*   _getCurrentDateTime() {
	const now = new Date();
	// Format the date and time as per requirement
	const YYMMDD = now.toLocaleDateString('en-GB').split('/').reverse().join('');
	const HHMMSS = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '');
	return { YYMMDD, HHMMSS };
	}, */
  // --------------------------------------------------------------------------
}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- August 25th, 2024: Sorted out the general and my personal requirement, which will make my life way easier using the calendar plugin. Added inputs for month and year combinations. Tested it and make some tweaks.

- August 26th, 2024: Added prompt for headers, month year combo, and range of years, also implemented lazy mode for not selecting any and letting it take the default mode. Added insert and removed replace options. Finalized and tested the formatting best suited for easy use. Added setting to add only calendar or linked calendar, also added a tag input, in case you do not use daily-jots as daily-jots. Or by default you can use daily-jots. Documentation, proof reading, publish, image, categories, time consumed and discord publicity.

- September 4th, 2024: Added Month to the Table Format itself. Preparation for Quarter and Yearly! Renamed Calendar 2.0 to Calendar Pro. Add Calendar Pro through insert-Option, Generate Report using note-Options for Monthly, Quarterly and Yearly, and they sit in a generic reports Tag. Added some colors for each type of Options that you choose [Template][^2], and the `date_time `info when the report has been generated!

- October 13th, 2024: Changed the calling the plugin from `noteOptions` to `appOptions`, as these do not require the need of a specific note UUID to pick up on.

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

- September 4th, 2024

    - ~~Naming~~

        - ~~**Calendar Pro: Month!**~~

            - ~~Insert existing code as of Old one.~~

            - ~~Apply minor tweaks.~~

    - ~~Note Option~~

        - ~~**Calendar Pro: Month!**~~

            - ~~Insert existing code as of Old one.~~

        - ~~**Calendar Pro: Quarter!**~~

            - ~~Insert code for generating a quarterly calendar.~~

        - ~~**Calendar Pro: Yearly!**~~

            - ~~Insert code for generating a yearly calendar.~~

    - ~~Handle Duplication~~

        - ~~**Parent Tag**~~

            - ~~Predefine as `-reports`.~~

        - ~~**Note-Option**~~

            - ~~Insert reports into the tag directory `-reports/-calendar-pro`.~~

    - ~~Navigation~~

        - ~~**Add Navigate Feature**~~

            - ~~Enable easy navigation within the plugin.~~

    - ~~Yearly Calendar Implementation~~

        - ~~**Build Yearly Calendar**~~

            - ~~Run each month in a loop.~~

            - ~~Store results separately.~~

            - ~~Add a header with month-year format (e.g., JAN24).~~

            - ~~Organize the calendar with three months in a row and four rows of data.~~

            - ~~Include a final header with the year.~~

    - ~~Plugin Strength~~

        - ~~**Enhance Plugin Utility**~~

            - ~~Make it a strong contender for long-term use in Amplenote.~~

            - ~~Include both monthly and quarterly calendar options.~~

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Start with Sunday or Start with Monday Option!

- [Future Plan - Amplenote Plugins!](https://www.amplenote.com/notes/78995798-3f78-11ef-9b28-26e37c279344) 

---

[High-Level Explanation of the Code][^3] For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

Time Invested For this Plugin: 3h 40m + 8h 36m + 6h 42m + 20m = \~12h 36m. \[Not including the ideas popping up randomly when doing daily rituals, only Screen Time.\]

[^1]: 
    - <mark style="color:#F8914D;">**Calendar Pro**<!-- {"cycleColor":"24"} --></mark> - Now Supports Quarterly, Yearly, along with the Monthly Template. And Monthly can also be accessed from insert Options.

    - <mark style="color:#BBA215;">**Calendar 2.0**<!-- {"cycleColor":"25"} --></mark> - A plugin that prompts users to select a month and year, then generates and inserts a customizable calendar with optional links to daily notes. Inspired from: [Calendar Plugin](https://public.amplenote.com/F69rH25euLVVrzxZ1M1YGe2v) ,  [Calendar 2.0 Docs](https://www.amplenote.com/notes/82057ddc-639c-11ef-843f-22074e34eefe) 

[^2]: [Template]()

    > <mark style="color:#F8914D;">**Calendar (January-2024): Yearly note-option**<!-- {"cycleColor":"24"} --></mark>
    >
    > <mark style="color:#F3DE6C;">**Calendar (January-2024): Quarterly note-option**<!-- {"cycleColor":"36"} --></mark>
    >
    > <mark style="color:#3CC07D;">**Calendar (August-2024): Monthly note-Option**<!-- {"cycleColor":"27"} --></mark>
    >
    > \
    >
    > <mark style="color:#CE60D7;">**Calendar (September-2024): Month insert-Text**<!-- {"cycleColor":"31"} --></mark>

[^3]: [High-Level Explanation of the Code]()

    ### High-Level Code Explanation

    The code in `Calendar Pro.js` is designed to create and manage calendars within the Amplenote application. The primary purpose is to automate the generation of monthly, quarterly, and yearly calendars, which can be inserted into notes within the app.

    ### Key Features:

    - **Calendar Creation:**

        - The code allows users to generate calendars for a specific month, quarter, or entire year. These calendars can include links to daily notes, helping users quickly access their notes for specific dates.

    - **User Input Integration:**

        - The code prompts the user to select a month, year, and other options, such as whether to include links to daily notes or to use a different tag for filtering the notes. This makes the calendar generation process customizable and user-friendly.

    - **Flexible Tag Management:**

        - Users can choose specific tags to filter the daily notes that are linked in the calendar, ensuring that only relevant notes are included.

    - **Automated Insertion:**

        - Once generated, the calendars are automatically inserted into a specified note or at the cursor's position within a note, depending on the user's selection. This automation streamlines the process of updating or creating calendar-based notes.

    - **Customization and Navigation:**

        - The code is designed to be flexible, with options for customization in terms of layout, content inclusion, and navigation. Users can navigate to the generated notes directly from the application.

    ### Overall Purpose:

    The overall goal of this script is to enhance productivity within Amplenote by providing an efficient way to generate and manage calendars that are integrated with the user's daily notes. The code simplifies the process of keeping track of tasks, appointments, and notes on a monthly, quarterly, or yearly basis, making it a valuable tool for users who rely on calendar-based organization.

