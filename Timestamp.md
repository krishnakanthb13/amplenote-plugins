---
title: Timestamp
uuid: 0fc33c04-3d0a-11ef-92e0-6ef34fa959ce
version: 1406
created: '2024-07-08T14:42:30+05:30'
tags:
  - '-location/amplenote/plugins'
---

1. [Welcome Note:](#Welcome_Note:) 

    1. [Table - Plugin Parameters:](#Table_-_Plugin_Parameters:) 

    1. [Initial Things TODO after installation: ](#Initial_Things_TODO_after_installation:_) 

    1. [Demo:](#Demo:) 

        1. [General - Calling the Plugin - Timestamp](#General_-_Calling_the_Plugin_-_Timestamp) 

        1. [Timestamp: Plugin Settings](#Timestamp:_Plugin_Settings) 

        1. [Timestamp: Digital ](#Timestamp:_Digital_) 

        1. [Timestamp: Analog](#Timestamp:_Analog) 

        1. [Timestamp: Text ](#Timestamp:_Text_) 

        1. [Timestamp: Unix ](#Timestamp:_Unix_) 

    1. [Documentation:](#Documentation:) 

        1. [Timestamp: Digital ](#Timestamp:_Digital_) 

        1. [Timestamp: Analog](#Timestamp:_Analog) 

        1. [Timestamp: Text ](#Timestamp:_Text_) 

        1. [Timestamp: Unix ](#Timestamp:_Unix_) 

    1. [Code Base:](#Code_Base:) 

    1. [Additional Information:](#Additional_Information:) 

        1. [Change Log:](#Change_Log:) 

        1. [Implemented & Upcoming:](#Implemented_&_Upcoming:) 

---

# <mark style="color:#9AD62A;">Welcome Note:<!-- {"cycleColor":"26"} --></mark>

I am Krishna, and I am from Chennai, India. I am a newbie to Programming. I am good in database queries, recently explored few options using `html, js, css` and found it very interesting. With the help of AI I was learning thing quickly, if I learnt or not, I was able to generate and implement a lot of different ideas using AI. Then I started my migration process from `Google Task + Calendar + Docs `to Amplenote, I started exploring a lot of new possibilities and functionality if you try to get over the initial hurdles of setting up the things how you want and exploring the new features that it gives altogether. I wanted to contribute few thing here and there. Hence this was possible.

\

This is my First creation and rolling out to a wide audience. I hope its useful to you in someway or the other.

---

## <mark style="color:#F8D616;">Table - Plugin Parameters:<!-- {"cycleColor":"25"} --></mark>

| | |
|-|-|
|name<!-- {"cell":{"colwidth":116}} -->|Timestamp<!-- {"cell":{"colwidth":572}} -->|
|icon<!-- {"cell":{"colwidth":116}} -->|update<!-- {"cell":{"colwidth":572}} -->|
|description<!-- {"cell":{"colwidth":116}} -->|Different types of Timestamps. Every possibility that you can think of. You can modify them based on your needs using the info given in the below details using the different details in the below (View note Link).<!-- {"cell":{"colwidth":572}} -->|
|setting<!-- {"cell":{"colwidth":105}} -->|timestamp for digital - structure<!-- {"cell":{"colwidth":572}} -->|
|setting<!-- {"cell":{"colwidth":116}} -->|timestamp text - pre script<!-- {"cell":{"colwidth":572}} -->|
|setting<!-- {"cell":{"colwidth":116}} -->|timestamp text - post script<!-- {"cell":{"colwidth":572}} -->|
|setting|timestamp analog - theme - dark / light / neon<!-- {"cell":{"colwidth":572}} -->|
|setting|timestamp analog - post script<!-- {"cell":{"colwidth":572}} -->|
## <mark style="color:#F8D616;">Initial Things TODO after installation:<!-- {"cycleColor":"25"} --></mark> 

1. Right click and navigate to [Plugin Settings](https://www.amplenote.com/account/plugins), Search for <mark style="color:#F8D616;">Timestamp<!-- {"cycleColor":"25"} --></mark> (Should be there if the Plugin is Installed).<!-- {"indent":1} -->

    1. Check if the Plugin is Active. \[Using the Slide Button\]

    1. Click on the Gear Icon `⚙`. 

    1. Then, fill the input boxes with basic items. <mark style="color:#44C9DE;">\[Without the double inverted commas `""`\]<!-- {"cycleColor":"28"} --></mark>

        1. timestamp for digital - structure = <mark style="color:#CE60D7;">"M do, Y (H:n:s)",<!-- {"cycleColor":"31"} --></mark> 

        1. timestamp text - pre script = <mark style="color:#CE60D7;">"Hello!",<!-- {"cycleColor":"31"} --></mark> 

        1. timestamp text - post script = <mark style="color:#CE60D7;">"What's on your mind?",<!-- {"cycleColor":"31"} --></mark> 

        1. timestamp analog - theme - dark / light / neon = <mark style="color:#CE60D7;">"light",<!-- {"cycleColor":"31"} --></mark> 

        1. timestamp analog - post script = <mark style="color:#CE60D7;">"What's on your mind?".<!-- {"cycleColor":"31"} --></mark>

    1. Test out all the Features. \[Four available as of July 10th, 2024\]

        1. Start with typing `{` and explore all the different ways to input your Timestamps.

        1. Modify the [Plugin Settings](https://www.amplenote.com/account/plugins), based on your needs by referring the below Documentations.

        1. Find the right fit for your needs and requirements. You can always build it on it further or suggest a new idea.

---

## <mark style="color:#F8D616;">Demo:<!-- {"cycleColor":"25"} --></mark>

### <mark>General - Calling the Plugin - Timestamp</mark>

![](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/7f9efcdf-d517-456f-acd0-870800a65916.gif)

---

### <mark>Timestamp: Plugin Settings</mark>

[Plugin Settings](https://www.amplenote.com/account/plugins)  > Timestamp

![a9f6a0c9-7baa-4b64-86c7-9cae1b9e18f2.png|557](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/a9f6a0c9-7baa-4b64-86c7-9cae1b9e18f2.png) [^1]

---

### <mark>Timestamp: Digital</mark> 

![](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/a94e9044-1c64-485a-89a5-69932d6cc388.gif)

---

### <mark>Timestamp: Analog</mark>

![6f77a141-be7b-4f99-a8cb-5bd35a8eeb6a.gif|744](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/6f77a141-be7b-4f99-a8cb-5bd35a8eeb6a.gif)

![f3642964-b336-4910-ad6c-03a52e99c1a8.gif|744](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/f3642964-b336-4910-ad6c-03a52e99c1a8.gif)

![](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/f239dea8-94f5-43c4-8b91-eb11c439f99e.png) [^2]

---

### <mark>Timestamp: Text</mark> 

![](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/9d07ce02-9619-402a-818e-37ee8ebcf995.gif)

---

### <mark>Timestamp: Unix</mark> 

![2bca9c21-a772-4848-82b5-b051d1e0fd86.gif|648](https://images.amplenote.com/0fc33c04-3d0a-11ef-92e0-6ef34fa959ce/2bca9c21-a772-4848-82b5-b051d1e0fd86.gif)

---

## <mark style="color:#F8D616;">Documentation:<!-- {"cycleColor":"25"} --></mark>

### <mark>Timestamp: Digital</mark> 

1. <mark style="color:#E5569E;">For Whom: \[Fully customizable options available! Play around with the date formats and enjoy Timestamping your Notes.\]<!-- {"cycleColor":"32"} --></mark><!-- {"indent":1} -->

    1. <mark style="color:#9AD62A;">(Use cases, are limitless, all the options that a Time can give you!<!-- {"cycleColor":"26"} --></mark><!-- {"indent":2} -->

    1. <mark style="color:#F8D616;">How To: This is a single step.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">By using Curly brackets / braces. `{` navigate using arrow keys or start typing `timpstamp / digital.`<!-- {"cycleColor":"25"} --></mark>

        1. <mark style="color:#F8D616;">Once its highlighted, hit Enter / Return.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">Current Timestamp will be inserted at the cursor location.<!-- {"cycleColor":"25"} --></mark> <mark style="color:#CE60D7;">\[This can be customized using below List of Options\].<!-- {"cycleColor":"31"} --></mark>

    1. [List of Options][^3] 

    1. [Best Formats][^4]  

### <mark>Timestamp: Analog</mark>

1. <mark style="color:#E5569E;">For Whom: \[This version is for them who are used to check the ticking hands to tell them the time.\]<!-- {"cycleColor":"32"} --></mark><!-- {"indent":1} -->

    1. <mark style="color:#9AD62A;">(Use cases, if you are used to the Analog-ness and only a hand position can make you visualize the spatial gap to the next quarter or half of the day and feel the time)<!-- {"cycleColor":"26"} --></mark><!-- {"indent":2} -->

    1. <mark style="color:#F8D616;">How To: This is a double step.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">By using Curly brackets / braces. `{` navigate using arrow keys or start typing `timpstamp / analog.`<!-- {"cycleColor":"25"} --></mark>

        1. <mark style="color:#F8D616;">Once its highlighted, hit Enter / Return.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">You should receive a few lines of code, select all of it and using the hover menu > more options > click on `Timestamp: Analog. `<!-- {"cycleColor":"25"} --></mark>

        1. <mark style="color:#F8D616;">This should only take a couple of seconds, voilà you have your Analog Clock.<!-- {"cycleColor":"25"} --></mark> <mark style="color:#CE60D7;">\[You have three Themes that you can choose from, along with some Post Scripting features\].<!-- {"cycleColor":"31"} --></mark>

    1. [Templates - Pre and Post Scripts][^5] 

### <mark>Timestamp: Text</mark> 

1. <mark style="color:#E5569E;">For Whom: \[This version is for them who like to read time through text more than skimming numbers.\]<!-- {"cycleColor":"32"} --></mark><!-- {"indent":1} -->

    1. <mark style="color:#9AD62A;">(Very useful if you are like me, someone used to hearing the time or someone telling you the time!)<!-- {"cycleColor":"26"} --></mark><!-- {"indent":2} -->

    1. <mark style="color:#F8D616;">How To: This is a single step.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">By using Curly brackets / braces. `{` navigate using arrow keys or start typing `timpstamp / text.`<!-- {"cycleColor":"25"} --></mark>

        1. <mark style="color:#F8D616;">Once its highlighted, hit Enter / Return.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">This will insert the Time in text format (telling the time!)<!-- {"cycleColor":"25"} --></mark> <mark style="color:#CE60D7;">\[You have Pre and Post Scripting features\].<!-- {"cycleColor":"31"} --></mark>

    1. [Templates - Pre and Post Scripts][^6] 

### <mark>Timestamp: Unix</mark> 

1. <mark style="color:#E5569E;">For Whom: \[Straight forward, just enters the Timestamp in Unix Format. If you need it!\]<!-- {"cycleColor":"32"} --></mark><!-- {"indent":1} -->

    1. <mark style="color:#9AD62A;">(Use cases may be, creating a Unique number to search for, instead of words!)<!-- {"cycleColor":"26"} --></mark><!-- {"indent":2} -->

    1. <mark style="color:#F8D616;">How To: How To: This is a single step.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">By using Curly brackets / braces. `{` navigate using arrow keys or start typing `timpstamp / unix.`<!-- {"cycleColor":"25"} --></mark>

        1. <mark style="color:#F8D616;">Once its highlighted, hit Enter / Return.<!-- {"cycleColor":"25"} --></mark> 

        1. <mark style="color:#F8D616;">This will insert the Time, simple and straight forward.<!-- {"cycleColor":"25"} --></mark>

---

## <mark style="color:#F8D616;">Code Base:<!-- {"cycleColor":"25"} --></mark>

```
{
    insertText: {

        "Digital": async function(app) {
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
            let formatString = String(app.settings["timestamp for digital - structure"]);
            let today = new Date();
            let timeStamp = formatDate(formatString, today);
            return timeStamp;

        },
        "Analog": async function(app) {

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

            // -------------------- Function: Generate SVG --------------------
            // Main function to format date strings based on the provided format
            function generateClockSVG() {
                // Get the current time
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const seconds = now.getSeconds();

                // Calculate the angles for the hands
                const secondAngle = seconds * 6;
                const minuteAngle = minutes * 6 + seconds * 0.1;
                const hourAngle = (hours % 12) * 30 + minutes * 0.5;

                // SVG content
                const svgContent1 = `
<svg width="80" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Clock face -->
  <circle cx="50" cy="50" r="48" stroke="#333" stroke-width="4" fill="#1c1c1c"/>
  <!-- Hour hand -->
  <line x1="50" y1="50" x2="50" y2="30" stroke="#ccc" stroke-width="5" transform="rotate(${hourAngle}, 50, 50)"/>
  <!-- Minute hand -->
  <line x1="50" y1="50" x2="50" y2="20" stroke="#ccc" stroke-width="3" transform="rotate(${minuteAngle}, 50, 50)"/>
  <!-- Second hand -->
  <line x1="50" y1="50" x2="50" y2="10" stroke="#fff" stroke-width="1" transform="rotate(${secondAngle}, 50, 50)"/>
  <!-- Center circle -->
  <circle cx="50" cy="50" r="3" fill="#fff"/>
  <!-- Hour ticks -->
  <g stroke="#666" stroke-width="2">
    <line x1="50" y1="2" x2="50" y2="8"/>
    <line x1="50" y1="92" x2="50" y2="98"/>
    <line x1="2" y1="50" x2="8" y2="50"/>
    <line x1="92" y1="50" x2="98" y2="50"/>
  </g>
  <!-- Minute ticks -->
  <g stroke="#555" stroke-width="1">
    <line x1="50" y1="4" x2="50" y2="6"/>
    <line x1="50" y1="94" x2="50" y2="96"/>
    <line x1="4" y1="50" x2="6" y2="50"/>
    <line x1="94" y1="50" x2="96" y2="50"/>
  </g>
</svg>
  `;

                const svgContent2 = `
<svg width="80" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Clock face -->
  <circle cx="50" cy="50" r="48" stroke="#ccc" stroke-width="4" fill="#f9f9f9"/>
  <!-- Hour hand -->
  <line x1="50" y1="50" x2="50" y2="30" stroke="#333" stroke-width="5" transform="rotate(${hourAngle}, 50, 50)"/>
  <!-- Minute hand -->
  <line x1="50" y1="50" x2="50" y2="20" stroke="#333" stroke-width="3" transform="rotate(${minuteAngle}, 50, 50)"/>
  <!-- Second hand -->
  <line x1="50" y1="50" x2="50" y2="10" stroke="#333" stroke-width="1" transform="rotate(${secondAngle}, 50, 50)"/>
  <!-- Center circle -->
  <circle cx="50" cy="50" r="3" fill="#333"/>
  <!-- Hour ticks -->
  <g stroke="#bbb" stroke-width="2">
    <line x1="50" y1="2" x2="50" y2="8"/>
    <line x1="50" y1="92" x2="50" y2="98"/>
    <line x1="2" y1="50" x2="8" y2="50"/>
    <line x1="92" y1="50" x2="98" y2="50"/>
  </g>
  <!-- Minute ticks -->
  <g stroke="#aaa" stroke-width="1">
    <line x1="50" y1="4" x2="50" y2="6"/>
    <line x1="50" y1="94" x2="50" y2="96"/>
    <line x1="4" y1="50" x2="6" y2="50"/>
    <line x1="94" y1="50" x2="96" y2="50"/>
  </g>
</svg>
        `;

                const svgContent3 = `
<svg width="80" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Clock face -->
  <circle cx="50" cy="50" r="48" stroke="#00ff00" stroke-width="4" fill="#000"/>
  <!-- Hour hand -->
  <line x1="50" y1="50" x2="50" y2="30" stroke="#ff00ff" stroke-width="5" transform="rotate(${hourAngle}, 50, 50)"/>
  <!-- Minute hand -->
  <line x1="50" y1="50" x2="50" y2="20" stroke="#00ffff" stroke-width="3" transform="rotate(${minuteAngle}, 50, 50)"/>
  <!-- Second hand -->
  <line x1="50" y1="50" x2="50" y2="10" stroke="#ffff00" stroke-width="1" transform="rotate(${secondAngle}, 50, 50)"/>
  <!-- Center circle -->
  <circle cx="50" cy="50" r="3" fill="#ff00ff"/>
  <!-- Hour ticks -->
  <g stroke="#00ff00" stroke-width="2">
    <line x1="50" y1="2" x2="50" y2="8"/>
    <line x1="50" y1="92" x2="50" y2="98"/>
    <line x1="2" y1="50" x2="8" y2="50"/>
    <line x1="92" y1="50" x2="98" y2="50"/>
  </g>
  <!-- Minute ticks -->
  <g stroke="#00ff00" stroke-width="1">
    <line x1="50" y1="4" x2="50" y2="6"/>
    <line x1="50" y1="94" x2="50" y2="96"/>
    <line x1="4" y1="50" x2="6" y2="50"/>
    <line x1="94" y1="50" x2="96" y2="50"/>
  </g>
</svg>
        `;

                // -------------------- Main Process --------------------
                // Get settings from the main application and create the SVG
                // Return the SVG string
                let svgContent;

                let condition = "light"; // Replace with your actual condition
                let themeSetting = app.settings["timestamp analog - theme - dark / light / neon"];
    
                if (themeSetting === "dark") {
                    svgContent = svgContent1; // Replace svgContent1 with your content for Dark mode
                } else if (themeSetting === "light") {
                    svgContent = svgContent2; // Replace svgContent2 with your content for Light mode
                } else if (themeSetting === "neon") {
                    svgContent = svgContent3; // Replace svgContent3 with your content for neon mode
                } else {
                    // Handle default case if needed
                }

                return svgContent;
            }
            // Usage example
            const svgImage = generateClockSVG();

            // `app.context.pluginUUID` is always supplied - it is the UUID of the plugin note
            await app.context.replaceSelection(svgImage);
            return null;

        },
        "Text": async function(app) {

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
            // Function to get Text time
            function getTextualTime(hour, minutes) {
                if (hour > 23 || hour < 0 || minutes > 59 || minutes < 0) {
                    return "Invalid time";
                }

                if (minutes === 0) {
                    return `It's ${convertHour(hour)} o'clock`;
                }

                if (minutes === 15) {
                    return `It's a quarter past ${convertHour(hour)}`;
                }

                if (minutes === 30) {
                    return `It's half past ${convertHour(hour)}`;
                }

                if (minutes === 45) {
                    return `It's a quarter to ${convertHour((hour + 1) % 24)}`;
                }

                if (minutes < 30) {
                    return `It's ${convertMinutes(minutes)} past ${convertHour(hour)}`;
                }

                return `It's ${convertMinutes(60 - minutes)} to ${convertHour((hour + 1) % 24)}`;
            }

            // -------------------- Helper Function: Converting Hours --------------------
            function convertHour(hour) {
                const hours = [
                    "Twelve", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven"
                ];
                return hours[hour % 12];
            }

            // -------------------- Helper Function: Converting Minutes --------------------      
            function convertMinutes(minutes) {
                const minutesText = [
                    "Oh", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
                    "Eighteen", "Nineteen"
                ];
                if (minutes < 20) {
                    return minutesText[minutes];
                }
                const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty"];
                const tensDigit = Math.floor(minutes / 10);
                const unitDigit = minutes % 10;
                return unitDigit === 0 ? tens[tensDigit] : `${tens[tensDigit]}-${minutesText[unitDigit]}`;
            }

            // -------------------- Helper Function: Converting As Proper Text --------------------  
            function getCurrentTimeTextual() {
                const now = new Date();
                const hour = now.getHours();
                const minutes = now.getMinutes();
                return getTextualTime(hour, minutes);
            }

            // -------------------- Main Process --------------------
            // Get Textual time and pre and post scripts that the user want to add.
            var CurrentTimeTextual = getCurrentTimeTextual();
            var prescript = String(app.settings["timestamp text - pre script"]);
            var postscript = String(app.settings["timestamp text - post script"]);

            // Initialize empty strings for conditional content
            var formattedText = "";

            // Check if prescript is present and add it to formattedText
            if (prescript) {
                formattedText += prescript + " ";
            }

            // Add the main content with first letter capitalized and a full stop
            formattedText += CurrentTimeTextual.charAt(0).toUpperCase() + CurrentTimeTextual.slice(1) + ".";

            // Check if postscript is present and add it to formattedText
            if (postscript) {
                formattedText += " " + postscript;
            }

            return formattedText;

        },
        "Unix": async function(app) {

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
            // Function to get Unix time
            function getUnixTime() {
                // Check if performance API is supported
                var isPerformanceSupported = (
                    window.performance &&
                    window.performance.now &&
                    window.performance.timing &&
                    window.performance.timing.navigationStart
                );

                // Get the timestamp in milliseconds
                var timeStampInMs = (
                    isPerformanceSupported ?
                    window.performance.now() + window.performance.timing.navigationStart :
                    Date.now()
                );

                // Convert milliseconds to seconds for Unix time
                var unixTime = Math.floor(timeStampInMs / 1000);

                return unixTime;
            }
            // -------------------- Main Process --------------------
            // Get Unix time and convert it to string
            var unixTimeString = getUnixTime().toString();

            return unixTimeString;

        },
    },

    replaceText: {
        "Analog": async function(app, text) {
            text = text.trim();
            await this._toDiagram(app, text); // Pass text to _toDiagram
            return null;
        }
    },
    async _toDiagram(app, text) {

        // Create a Blob from the SVG text
        const svgBlob = new Blob([text], {
            type: 'image/svg+xml;charset=utf-8'
        });
        const svgDataURL = await this._dataURLFromBlob(svgBlob);
        const pngDataURL = await this._svgToPng(svgDataURL);
        const noteHandle = {
            uuid: app.context.noteUUID
        };
        const fileURL = await app.attachNoteMedia(noteHandle, pngDataURL);
        const appendedFileURL = fileURL + '?text=' + window.encodeURIComponent(window.btoa(text));

        const time = new Date().toLocaleString();

        // Generate the desired output format
        const output = `![${time || ''}](${fileURL})` + ' ' + app.settings["timestamp analog - post script"] + '.';

        // Insert the formatted output into the note
        app.context.replaceSelection(output).trim();
        return null;

    },
    async _svgToPng(svgBase64) {
        return new Promise(function(resolve, reject) {
            let image = new Image();
            image.src = svgBase64;
            image.onload = function() {
                let canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                let output = canvas.toDataURL('image/png');
                resolve(output);
            };
            image.onerror = function(error) {
                reject(new Error(`Image load error: ${error}`));
            };
        });
    },
    async _dataURLFromBlob(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = event => {
                resolve(event.target.result);
            };

            reader.onerror = function(event) {
                reader.abort();
                reject(new Error(`File read error: ${event.target.error}`));
            };

            reader.readAsDataURL(blob);
        });
    }

}
```

---

## <mark style="color:#F8D616;">Additional Information:<!-- {"cycleColor":"25"} --></mark>

---

### <mark style="color:#F5614C;">**Change Log:**<!-- {"cycleColor":"23"} --></mark>

- July 08th, 2024 (15:01:28) - Created this note. Basic structure built. Looks good!

- July 08th, 2024 (15:06:17) - Made this Public - [https://public.amplenote.com/qMzEXtAnVzeHR6nDLdWacfDR](https://public.amplenote.com/qMzEXtAnVzeHR6nDLdWacfDR) 

- July 09th, 2024 (00:28:50) - Completed the Numeric / Digital Timestamp Part of this Code!

- July 09th, 2024 (16:10:52) - Completed the Unix Timestamp Part of this Code!

- July 09th, 2024 (17:02:42) - Completed the Text Timestamp Part of this Code!

- July 10th, 2024 (11:33:43) - Completed the Analog Timestamp Part of this Code!

- July 10th, 2024 (12:35:10) - Completed the Building and Formatting of the overall Document!

- July 10th, 2024 (14:01:48) - Completed the Demo, Text, Visual, Testing as well!

---

### <mark style="color:#F5614C;">**Implemented & Upcoming:**<!-- {"cycleColor":"23"} --></mark>

- ~~Refer notes and start building one by one.~~

    - ~~Numeric / Digital  Timestamp~~

    - ~~Analog Timestamp~~

    - ~~Text Timestamp~~

    - ~~Unix Timestamp~~

- Final Touch's

    - ~~Building~~

    - ~~Formatting~~

    - ~~Documenting & Demo~~

        - ~~Text~~

        - ~~Visual~~

    - ~~Testing the Final Format~~

    - Roll-out \[Approval Pending! + Next Steps!\]

<mark style="color:#9AD62A;">**Future Ideas in the Bucket:**<!-- {"cycleColor":"26"} --></mark>

- Let me think 😜.

---

[Code Explanation][^7]  For Curious Readers and Explores! Thank you if you have made till here. You are Awesome, if you are reading this! 😀. Have a Great Day Ahead!

---

[^1]: Plugins >
    Timestamp
    Different types of Timestamps. Every possibility that you can think of. You can modify them
    based on your needs using the info given in the below details using the different details in the
    below (View note Link).
    Settings
    timestamp for digital - structure
    M do, Y (H:n:s)
    timestamp text - pre script
    Hello!
    timestamp text - post script
    What's on your mind?..
    timestamp analog - theme - dark / light / neon
    light
    timestamp analog - post script
    What's on your mind?..
    SAVE CHANGES
    Cancel

[^2]: What's on your mind?...
    What's on your mind?..
    What's on your mind?..

[^3]: [List of Options]()

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

[^4]: [Best Formats]()

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

    ---

    Do not limit yourself to these. Play around with all the List of Options available. Happy Timestamping!

[^5]: [Templates - Pre and Post Scripts]()

    <mark style="color:#8D68DA;">**Pre-Script (How's Your Day?)**<!-- {"cycleColor":"30"} --></mark>

    - **Simple:** "Hey! How's your day going so far?"

    - **Time-Specific:** "It's **@now**. How are things feeling at this point in the day?"

    - **Motivational:** "**@now** - Let's crush the rest of the day!"

    <mark style="color:#8D68DA;">**Post-Script (Action Prompts)**<!-- {"cycleColor":"30"} --></mark>

    - **"What's on your mind?"** (General prompt for brainstorming)

    - **"What's on your to-do list?"** (Focuses on tasks)

    - **"What's on your calendar now?"** (Reminds you about upcoming events)

    - **"Quick brain dump!"** (Encourages capturing fleeting thoughts)

    - **"Priority check - what needs to get done?"** (Focuses on action)

    - **"Planning time - what are my goals for the rest of the day/week?"** (Encourages strategic planning)

    <mark style="color:#8D68DA;">**Combining Pre and Post for Impact**<!-- {"cycleColor":"30"} --></mark>

    - **"**@now\*\* - Feeling productive! What's on your to-do list for the rest of the day?"\*\*

    - **"It's already @now! Let's do something awesome. What's on your mind?"**

    - **"Just checking in at @now. Quick brain dump - what needs your attention?"**

    \

[^6]: [Templates - Pre and Post Scripts]()

    <mark style="color:#8D68DA;">**Pre-Script (How's Your Day?)**<!-- {"cycleColor":"30"} --></mark>

    - **Simple:** "Hey! How's your day going so far?"

    - **Time-Specific:** "It's **@now**. How are things feeling at this point in the day?"

    - **Motivational:** "**@now** - Let's crush the rest of the day!"

    <mark style="color:#8D68DA;">**Post-Script (Action Prompts)**<!-- {"cycleColor":"30"} --></mark>

    - **"What's on your mind?"** (General prompt for brainstorming)

    - **"What's on your to-do list?"** (Focuses on tasks)

    - **"What's on your calendar now?"** (Reminds you about upcoming events)

    - **"Quick brain dump!"** (Encourages capturing fleeting thoughts)

    - **"Priority check - what needs to get done?"** (Focuses on action)

    - **"Planning time - what are my goals for the rest of the day/week?"** (Encourages strategic planning)

    <mark style="color:#8D68DA;">**Combining Pre and Post for Impact**<!-- {"cycleColor":"30"} --></mark>

    - **"**@now\*\* - Feeling productive! What's on your to-do list for the rest of the day?"\*\*

    - **"It's already @now! Let's do something awesome. What's on your mind?"**

    - **"Just checking in at @now. Quick brain dump - what needs your attention?"**

[^7]: [Code Explanation]()

    <mark>**1. Utility Function: Count Characters**:</mark> This function counts the occurrences of a specific character in a string.

    <mark>**2. Function: Format Date**:</mark> The main function to format the date string based on the given format.

    <mark>**3. Helper Functions**:</mark> Several helper functions (`getMonthFull`, `getMonthAbbreviation`, etc.) are used to get specific parts of the date, like the full month name, month abbreviation, day suffix, etc.

    <mark>**4. Building the Formatted String**:</mark> This section processes each character in the format string and builds the final formatted date string by switching on the format characters.

    <mark>**5. Main Process**:</mark> This section retrieves the date format from the app's settings, gets the current date, formats it using the `formatDate` function, and returns the formatted timestamp.

