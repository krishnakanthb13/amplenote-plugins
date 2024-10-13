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
	  // await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);

		// Retrieve the Peek View setting from settings, defaulting to "Yes" if not set
		const peekviewEnable = await app.settings["Peek Viewer [Yes / No]"] || "Yes";
		// console.log ("peekviewEnable",peekviewEnable);

		// Open the note in the sidebar if Peek View is enabled, otherwise navigate to the note's URL
		await (peekviewEnable.toLowerCase() === "yes"
			? app.openSidebarEmbed(1, 'sidebar', finalContent) // Peek View is enabled
			// console.log ("Note opened in Side Bar");
			: app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`)); // Peek View is disabled
			// console.log ("Navigated to the note");

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
		  // await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);

		// Retrieve the Peek View setting from settings, defaulting to "Yes" if not set
		const peekviewEnable = await app.settings["Peek Viewer [Yes / No]"] || "Yes";
		// console.log ("peekviewEnable",peekviewEnable);

		// Open the note in the sidebar if Peek View is enabled, otherwise navigate to the note's URL
		await (peekviewEnable.toLowerCase() === "yes"
			? app.openSidebarEmbed(1, 'sidebar', noteUUIDz) // Peek View is enabled
			// console.log ("Note opened in Side Bar");
			: app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`)); // Peek View is disabled
			// console.log ("Navigated to the note");

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
		  // await app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`);

		// Retrieve the Peek View setting from settings, defaulting to "Yes" if not set
		const peekviewEnable = await app.settings["Peek Viewer [Yes / No]"] || "Yes";
		// console.log ("peekviewEnable",peekviewEnable);

		// Open the note in the sidebar if Peek View is enabled, otherwise navigate to the note's URL
		await (peekviewEnable.toLowerCase() === "yes"
			? app.openSidebarEmbed(1, 'sidebar', noteUUIDz) // Peek View is enabled
			// console.log ("Note opened in Side Bar");
			: app.navigate(`https://www.amplenote.com/notes/${noteUUIDz}`)); // Peek View is disabled
			// console.log ("Navigated to the note");

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