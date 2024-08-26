{
  Settings: class {
    constructor(dailyJotLink, sectionHeader, monthYear) {
      this.dailyJotLink = dailyJotLink;
      this.sectionHeader = sectionHeader;
      this.monthYear = monthYear;
    }
  },

  constants: {
    version: "1.0.0",
    settingDailyJotLinkName: "Link to Daily Jot (true/false, default true)",
    settingSectionHeaderName: "Section header (default 'Calendar')",
    settingMonthYear: "Month-Year (12-2024) / (8-2024)", // New setting
  },

  // --------------------------------------------------------------------------
  noteOption: {
    "Month": async function(app) {
      const settings = new this.Settings(
        app.settings[this.constants.settingDailyJotLinkName] !== "false",
        app.settings[this.constants.settingSectionHeaderName] || "Calendar",
        app.settings[this.constants.settingMonthYear] || this._getCurrentMonthYear() // Use current month-year if not provided
      );

      const sections = await app.getNoteSections({ uuid: app.context.noteUUID });
      const section = sections.find((section) => section.heading?.text === settings.sectionHeader);
      if (section === undefined) {
        app.alert(`There needs to be a '${settings.sectionHeader}' section`);
        return;
      }

      const dailyJots = settings.dailyJotLink ? await this._getDailyJotsForMonth(app, settings.monthYear) : new Map();
      app.replaceNoteContent({ uuid: app.context.noteUUID }, this._createMonthlyCalendar(dailyJots, settings.monthYear), { section });
    },
  },

  // --------------------------------------------------------------------------
  // Impure Functions
  async _getDailyJotsForMonth(app, monthYear) {
    const [month, year] = this._parseMonthYear(monthYear);
    const dailyJots = await app.filterNotes({ tag: "-0-planner", query: `${month} ${year}` });
    const map = dailyJots.reduce((map, jot) => {
      map.set(jot.name.split(" ")[1].replace(/(st,|rd,|th,|nd,)/, ""), jot);
      return map;
    }, new Map());
    return map;
  },

  // --------------------------------------------------------------------------
  // Pure Functions
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
        ((index + 1) % 7 === 0 ? "|\n" : ""); // If we have reached Sunday start a new row
    };

    const initialValue = "|S|M|T|W|T|F|S|\n|-|-|-|-|-|-|-|-|\n";

    const calendar = daysToPrint.reduce(reducer, initialValue);
    return calendar;
  },

// --------------------------------------------------------------------------
  // Helper function to parse "Month-Year" setting
  _parseMonthYear(monthYear) {
    const [month, year] = monthYear.split("-").map(Number);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return [monthNames[month - 1], year];
  },

  // Helper function to get current month and year in "Month-Year" format
  _getCurrentMonthYear() {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-based, so add 1
    const year = today.getFullYear();
    return `${month}-${year}`;
  },
}
  // --------------------------------------------------------------------------