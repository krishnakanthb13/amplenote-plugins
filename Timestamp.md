---
title: Timestamp
uuid: 0fc33c04-3d0a-11ef-92e0-6ef34fa959ce
version: 472
created: '2024-07-08T14:42:30+05:30'
tags:
  - '-location/amplenote/plugins'
---

| | |
|-|-|
|name|Timestamp<!-- {"cell":{"colwidth":474}} -->|
|icon|update<!-- {"cell":{"colwidth":474}} -->|
|description|Different types of Timestamps. Every variety that you can think of.<!-- {"cell":{"colwidth":474}} -->|
|instructions|<!-- {"cell":{"colwidth":474}} -->|
|setting|date format<!-- {"cell":{"colwidth":474}} -->|
1. Timestamp: Digital

1. Timestamp: Numeric <mark style="color:#E5569E;">\[Fully customizable options available! Play around with the date formats and enjoy Timestamping your Notes.\]<!-- {"cycleColor":"32"} --></mark>

    1. [List of Options][^1] 

    1. [Best Formats][^2] 

    1. [Code Explanation][^3] 

1. Timestamp: Analog

1. Timestamp: Text

1. Timestamp: Unix


  ```
  {
      insertText: {
        "Digital": async function(app) {
  	},
        "Numeric": async function(app) {
              // -------------------- Utility Function: Count Characters --------------------
              function countChar(str, char) {
                let count = 0;
                for (let i = 0; i < str.length; i++) {
                  if (str[i] === char) {
                    count++;
                  }
                }
                return count;
              }
            
              // -------------------- Function: Format Date --------------------
              // Main function to format date strings based on the provided format
              function formatDate(dateString, dateObj) {
                // Define various parts of the date
                const year = dateObj.getFullYear().toString();
                const yearShort = year.slice(-2);
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const monthFull = getMonthFull(dateObj.getMonth());
                const monthAbbreviation = getMonthAbbreviation(dateObj.getMonth());
                const day = dateObj.getDate().toString().padStart(2, '0');
                const daySuffix = getDaySuffix(day);
                const hours12 = (dateObj.getHours() % 12 || 12).toString().padStart(2, '0');
                const hours24 = dateObj.getHours().toString().padStart(2, '0');
                const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                const minutesFraction = (dateObj.getMinutes() / 60).toFixed(2);
                const seconds = dateObj.getSeconds().toString().padStart(2, '0');
                const milliseconds = dateObj.getMilliseconds().toString().padStart(3, '0');
                const ampmText = dateObj.getHours() < 12 ? 'AM' : 'PM';
                const timeZoneOffset = getTimeZoneOffset(dateObj);
                const timeZoneComplete = getTimeZoneComplete(dateObj);
                const timeZoneOffsetHHMM = getTimeZoneOffsetHHMM(dateObj);
                const timeZoneAbbreviation = getTimeZoneAbbreviation(dateObj);
                const timeZoneOffsetTime = getTimeZoneOffsetTime(dateObj);
                const hours24PlusMinutes = (parseInt(hours24) + parseFloat(minutesFraction)).toFixed(2);
                const hours12PlusMinutes = (parseInt(hours12) + parseFloat(minutesFraction)).toFixed(2);
                const dayOfWeek = getDayOfWeek(dateObj);
                const dayOfWeekShort = getDayOfWeekShort(dateObj);
                const dayOfWeekNumberSunday = getDayOfWeekNumber(dateObj, 'Sunday');
                const dayOfWeekNumberMonday = getDayOfWeekNumber(dateObj, 'Monday');
                const weekOfYearNumber = getWeekOfYearNumber(dateObj);
                const dayOfYear = getDayOfYear(dateObj);
                let formattedString = '';
            
                // -------------------- Helper Function: Get Full Month Name --------------------
                function getMonthFull(month) {
                  const monthsFull = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ];
                  return monthsFull[month];
                }
            
                // -------------------- Helper Function: Get Month Abbreviation --------------------
                function getMonthAbbreviation(month) {
                  const monthsAbbreviations = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                  ];
                  return monthsAbbreviations[month];
                }
            
                // -------------------- Helper Function: Get Day Suffix --------------------
                function getDaySuffix(day) {
                  if (day >= 11 && day <= 13) {
                    return 'th';
                  }
                  switch (day % 10) {
                    case 1:
                      return 'st';
                    case 2:
                      return 'nd';
                    case 3:
                      return 'rd';
                    default:
                      return 'th';
                  }
                }
            
                // -------------------- Helper Function: Get Time Zone Offset --------------------
                function getTimeZoneOffset(date) {
                  const offsetMinutes = date.getTimezoneOffset();
                  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60).toString().padStart(2, '0');
                  const offsetMinutesFormatted = (Math.abs(offsetMinutes) % 60).toString().padStart(2, '0');
                  const sign = offsetMinutes <= 0 ? '+' : '-';
                  return `${sign}${offsetHours}:${offsetMinutesFormatted}`;
                }
            
                // -------------------- Helper Function: Get Full Time Zone Info --------------------
                function getTimeZoneComplete() {
                  const dateString = new Date().toString();
                  const abbreviation = dateString.match(/([A-Z]+[\+-][0-9]+.*)/)[1];
                  return abbreviation || 'Unknown TZ';
                }
            
                // -------------------- Helper Function: Get Time Zone Offset HHMM --------------------
                function getTimeZoneOffsetHHMM() {
                  const dateString = new Date().toString();
                  const abbreviation = dateString.match(/([A-Z]+[\+-][0-9]+)/)[1];
                  return abbreviation || 'Unknown TZ';
                }
            
                // -------------------- Helper Function: Get Time Zone Abbreviation --------------------
                function getTimeZoneAbbreviation() {
                  const dateString = new Date().toString();
                  const abbreviation = dateString.match(/\(([A-Za-z\s].*)\)/)[1];
                  return abbreviation || 'Unknown TZ';
                }
            
                // -------------------- Helper Function: Get Time Zone Offset Time --------------------
                function getTimeZoneOffsetTime() {
                  const dateString = new Date().toString();
                  const abbreviation = dateString.match(/([-\+][0-9]+)\s/)[1];
                  return abbreviation || 'Unknown TZ';
                }
            
                // -------------------- Helper Function: Get Day of the Week --------------------
                function getDayOfWeek(date) {
                  const daysOfWeek = [
                    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
                  ];
                  return daysOfWeek[date.getDay()];
                }
            
                // -------------------- Helper Function: Get Short Day of the Week --------------------
                function getDayOfWeekShort(date) {
                  const daysOfWeekShort = [
                    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
                  ];
                  return daysOfWeekShort[date.getDay()];
                }
            
                // -------------------- Helper Function: Get Day of the Week Number --------------------
                function getDayOfWeekNumber(date, startDay) {
                  const day = date.getDay();
                  return startDay === 'Monday' ? (day === 0 ? 7 : day) : day + 1;
                }
            
                // -------------------- Helper Function: Get Week of the Year Number --------------------
                function getWeekOfYearNumber(date) {
                  const start = new Date(date.getFullYear(), 0, 1);
                  const diff = (date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000)) / 86400000;
                  return Math.ceil((diff + start.getDay() + 1) / 7);
                }
            
                // -------------------- Helper Function: Get Day of the Year --------------------
                function getDayOfYear(date) {
                  const start = new Date(date.getFullYear(), 0, 0);
                  const diff = (date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000)) / 86400000;
                  return Math.floor(diff);
                }
            
                // -------------------- Building the Formatted String --------------------
                for (let i = 0; i < dateString.length; i++) {
                  switch (dateString[i]) {
                    case 'Y':
                      formattedString += year;
                      break;
                    case 'y':
                      formattedString += yearShort;
                      break;
                    case 'm':
                      formattedString += month;
                      break;
                    case 'b':
                      formattedString += monthAbbreviation;
                      break;
                    case 'M':
                      formattedString += monthFull;
                      break;
                    case 'd':
                      formattedString += day;
                      break;
                    case 'o':
                      formattedString += daySuffix;
                      break;
                    case 'h':
                      formattedString += hours12;
                      break;
                    case 'H':
                      formattedString += hours24;
                      break;
                    case 'n':
                      formattedString += minutes;
                      break;
                    case 'N':
                      formattedString += minutesFraction;
                      break;
                    case 's':
                      formattedString += seconds;
                      break;
                    case 'S':
                      formattedString += milliseconds;
                      break;
                    case 'A':
                      formattedString += ampmText;
                      break;
                    case 'I':
                      formattedString += hours24PlusMinutes;
                      break;
                    case 'i':
                      formattedString += hours12PlusMinutes;
                      break;
                    case 'V':
                      formattedString += timeZoneOffset;
                      break;
                    case 'x':
                      formattedString += timeZoneOffsetHHMM;
                      break;
                    case 'z':
                      formattedString += timeZoneOffsetTime;
                      break;
                    case 'B':
                      formattedString += timeZoneComplete;
                      break;
                    case 't':
                      formattedString += timeZoneAbbreviation;
                      break;
                    case 'C':
                      formattedString += dayOfWeek;
                      break;
                    case 'c':
                      formattedString += dayOfWeekShort;
                      break;
                    case 'U':
                      formattedString += dayOfWeekNumberSunday;
                      break;
                    case 'u':
                      formattedString += dayOfWeekNumberMonday;
                      break;
                    case 'K':
                      formattedString += weekOfYearNumber;
                      break;
                    case 'J':
                      formattedString += dayOfYear;
                      break;
                    default:
                      formattedString += dateString[i];
                      break;
                  }
                }
            
                return formattedString;
              }
            
              // -------------------- Main Process --------------------
              // Get settings from the main application and create the time stamp
              let formatString = String(app.settings["date format"]);
              let today = new Date();
              let timeStamp = formatDate(formatString, today);
              return timeStamp;
  	},
        "Analog": async function(app) {
  	},
        "Text": async function(app) {
  	},
        "Unix": async function(app) {
  	},
  }
  }
  
  ```

---

<mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- July 08th, 2024 (15:01:28) - Created this note. Basic structure built. Looks good!

- July 08th, 2024 (15:06:17) - Made this Public - [https://public.amplenote.com/qMzEXtAnVzeHR6nDLdWacfDR](https://public.amplenote.com/qMzEXtAnVzeHR6nDLdWacfDR) 

- July 09th, 2024 (00:28:50) - Completed the Numeric Timestamp Part of this Code!

---

<mark style="color:#9AD62A;">**Next TODO:**<!-- {"cycleColor":"26"} --></mark>

- Refer notes and start building one by one.

    - Digital Timestamp

    - ~~Numeric Timestamp~~

    - Analog Timestamp

    - Text Timestamp

    - Unix Timestamp

---

[^1]: [List of Options]()

    ---

    01\.  `Y` : Full year <mark style="color:#F8D616;">(e.g., 2024)<!-- {"cycleColor":"25"} --></mark>

    02\.  `y` : Last two digits of the year <mark style="color:#F8D616;">(e.g., 24)<!-- {"cycleColor":"25"} --></mark>

    \

    03\.  `m` : Month as a zero-padded number <mark style="color:#F8D616;">(e.g., 07)<!-- {"cycleColor":"25"} --></mark>

    04\.  `b` : Abbreviated month name <mark style="color:#F8D616;">(e.g., Jul)<!-- {"cycleColor":"25"} --></mark>

    05\.  `M` : Full month name <mark style="color:#F8D616;">(e.g., July)<!-- {"cycleColor":"25"} --></mark>

    \

    06\.  `d` : Day of the month as a zero-padded number <mark style="color:#F8D616;">(e.g., 08)<!-- {"cycleColor":"25"} --></mark>

    07\.  `o` : Day of the month with suffix <mark style="color:#F8D616;">(e.g., 8th)<!-- {"cycleColor":"25"} --></mark> 

    <mark style="color:#9AD62A;">\[Note:`o` - will give you only the suffix, you need to combine it with `d`(#06)\]<!-- {"cycleColor":"26"} --></mark>

    \

    08\.  `h` : Hour in 12-hour format as a zero-padded number <mark style="color:#F8D616;">(e.g., 08 for 8 AM or 8 PM)<!-- {"cycleColor":"25"} --></mark> 

    <mark style="color:#9AD62A;">\[Note:`h` - will give you only the hour, you need to combine it with `A`(#14)\]a<!-- {"cycleColor":"26"} --></mark>

    09\.  `H` : Hour in 24-hour format as a zero-padded number <mark style="color:#F8D616;">(e.g., 20 for 8 PM)<!-- {"cycleColor":"25"} --></mark>

    \

    10\.  `n` : Minutes as a zero-padded number <mark style="color:#F8D616;">(e.g., 05)<!-- {"cycleColor":"25"} --></mark>

    11\.  `N` : Fractional minutes <mark style="color:#F8D616;">(e.g., 0.08 for 5 minutes)<!-- {"cycleColor":"25"} --></mark> 

    <mark style="color:#9AD62A;">\[Note:`N` - will give you only the fraction of how much minutes in an hour is completed, other uses with `I` (#15), `i` (#16)\]<!-- {"cycleColor":"26"} --></mark>

    \

    12\.  `s` : Seconds as a zero-padded number <mark style="color:#F8D616;">(e.g., 09)<!-- {"cycleColor":"25"} --></mark>

    13\.  `S` : Milliseconds as a zero-padded number <mark style="color:#F8D616;">(e.g., 123)<!-- {"cycleColor":"25"} --></mark>

    \

    14\.  `A` : AM/PM designation <mark style="color:#F8D616;">(e.g., AM)<!-- {"cycleColor":"25"} --></mark> 

    <mark style="color:#9AD62A;">\[Note:`A` - will give you only the suffix, you need to combine it with `h`(#08)\]<!-- {"cycleColor":"26"} --></mark>

    \

    15\.  `I` : Hours in 24-hour format plus fractional minutes <mark style="color:#F8D616;">(e.g., 20.08 for 8:05 PM)<!-- {"cycleColor":"25"} --></mark>

    16\.  `i` : Hours in 12-hour format plus fractional minutes <mark style="color:#F8D616;">(e.g., 8.08 for 8:05 AM/PM)<!-- {"cycleColor":"25"} --></mark>

    \

    17\.  `V` : Time zone offset <mark style="color:#F8D616;">(e.g., +05:30)<!-- {"cycleColor":"25"} --></mark>

    18\.  `x` : Time zone offset in HHMM format <mark style="color:#F8D616;">(e.g., GMT+0530)<!-- {"cycleColor":"25"} --></mark>

    19\.  `z` : Time zone offset without colon <mark style="color:#F8D616;">(e.g., +0530)<!-- {"cycleColor":"25"} --></mark>

    20\.  `B` : Complete time zone information <mark style="color:#F8D616;">(e.g., GMT+0530 (India Standard Time))<!-- {"cycleColor":"25"} --></mark>

    21\.  `t` : Time zone abbreviation <mark style="color:#F8D616;">(e.g., India Standard Time)<!-- {"cycleColor":"25"} --></mark>

    \

    22\.  `C` : Full day of the week <mark style="color:#F8D616;">(e.g., Monday)<!-- {"cycleColor":"25"} --></mark>

    23\.  `c` : Abbreviated day of the week <mark style="color:#F8D616;">(e.g., Mon)<!-- {"cycleColor":"25"} --></mark>

    \

    24\.  `U` : Day of the week number starting from Sunday <mark style="color:#F8D616;">(e.g., 1 for Sunday)<!-- {"cycleColor":"25"} --></mark>

    25\.  `u` : Day of the week number starting from Monday <mark style="color:#F8D616;">(e.g., 1 for Monday)<!-- {"cycleColor":"25"} --></mark>

    26\.  `K` : Week of the year number <mark style="color:#F8D616;">(e.g., 28 for the 28th week)<!-- {"cycleColor":"25"} --></mark>

    27\.  `J` : Day of the year number <mark style="color:#F8D616;">(e.g., 190 for July 8th)<!-- {"cycleColor":"25"} --></mark>

    ---

    <mark style="color:#F8914D;">Testing:<!-- {"cycleColor":"24"} --></mark>

    <mark style="color:#F8914D;">(2024,24)-(07,Jul,July)-(09,09th)-(00,12)-(12,0.20)-(23,395)-(AM)-(0.20,12.20)-(+05:30,GMT+0530 (India Standard Time),India Standard Time,GMT+0530,+0530)-(Tuesday,Tue,3,2,28,191)<!-- {"cycleColor":"24"} --></mark>

    <mark style="color:#F8914D;">(Y,y)-(m,b,M)-(d,do)-(H,h)-(n,N)-(s,S)-(A)-(I,i)-(V,B,t,x,z)-(C,c,U,u,K,J)<!-- {"cycleColor":"24"} --></mark>

    ---

[^2]: [Best Formats]()

    <mark>General:</mark>

    - Time 12 Hours: HH:MM AM/PM <mark style="color:#44C9DE;">(e.g., 2:30 PM)<!-- {"cycleColor":"28"} --></mark> = `h:n A` OR `h:n:s A`

    - Time 24 Hours: HH:MM <mark style="color:#44C9DE;">(e.g., 14:30)<!-- {"cycleColor":"28"} --></mark> = `H:n` OR `H:n:s`

    - Date: YYYY-MM-DD <mark style="color:#44C9DE;">(e.g., 2024-07-08)<!-- {"cycleColor":"28"} --></mark> = `Y-m-d`

    <mark>Date Time:</mark>

    - MM/DD/YYYY HH:MM AM/PM <mark style="color:#44C9DE;">(e.g., 07/08/2024 2:30 PM)<!-- {"cycleColor":"28"} --></mark> = `m/d/Y h:n A` OR `m/d/Y h:n:s A`

    - DD-MM-YYYY HH:MM <mark style="color:#44C9DE;">(e.g., 08-07-2024 14:30)<!-- {"cycleColor":"28"} --></mark> = `d-m-Y H:n` OR `d-m-Y H:n:s`

    - MMM/DD/YY HH:MM AM/PM <mark style="color:#44C9DE;">(e.g., Jul/08/2024 2:30 PM)<!-- {"cycleColor":"28"} --></mark> = `b/d/Y h:n A` OR `b/d/Y h:n:s A`

    - DD-MMM-YY HH:MM <mark style="color:#44C9DE;">(e.g., 08-Jul-2024 14:30)<!-- {"cycleColor":"28"} --></mark> = `d-b-Y H:n` OR `d-b-Y H:n:s`

    <mark>Date Time with Time zone:</mark>

    - YYYY-MM-DDTHH:MM:SSZ <mark style="color:#44C9DE;">(e.g., 2024-07-08T14:30:00Z for UTC time)<!-- {"cycleColor":"28"} --></mark> = `Y-m-dTH:n:sZ`

    - YYYY-MM-DDTHH:MM:SS±HH:MM <mark style="color:#44C9DE;">(e.g., 2024-07-08T14:30:00+02:00)<!-- {"cycleColor":"28"} --></mark> = `Y-m-dTH:n:sV`

    - Day, DD Mon YYYY HH:MM:SS ±HHMM <mark style="color:#44C9DE;">(e.g., Mon, 08 Jul 2024 14:30:00 +0200)<!-- {"cycleColor":"28"} --></mark> = `c, d b Y H:n:s z`

    <mark>Others:</mark>

    - YYYY-Www-D <mark style="color:#44C9DE;">(e.g., 2024-W28-1 for the first day of the 28th week of 2024)<!-- {"cycleColor":"28"} --></mark> = `Y-WK-U OR Y-WK-u`

    - YYYY-DDD <mark style="color:#44C9DE;">(e.g., 2024-189 for the 189th day of 2024)<!-- {"cycleColor":"28"} --></mark> = `Y-J`

[^3]: [Code Explanation]()

    <mark>**1. Utility Function: Count Characters**:</mark> This function counts the occurrences of a specific character in a string.

    <mark>**2. Function: Format Date**:</mark> The main function to format the date string based on the given format.

    <mark>**3. Helper Functions**:</mark> Several helper functions (`getMonthFull`, `getMonthAbbreviation`, etc.) are used to get specific parts of the date, like the full month name, month abbreviation, day suffix, etc.

    <mark>**4. Building the Formatted String**:</mark> This section processes each character in the format string and builds the final formatted date string by switching on the format characters.

    <mark>**5. Main Process**:</mark> This section retrieves the date format from the app's settings, gets the current date, formats it using the `formatDate` function, and returns the formatted timestamp.

