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
		
        "Roman": async function(app) {
            // Provided romanize function
            function romanize(num) {
                if (!+num) return false;
                var digits = String(+num).split("")
                    , key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"
                       , "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"
                       , "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
                    , roman = ""
                    , i = 3;
                while (i--) {
                    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
                }
                return Array(+digits.join("") + 1).join("M") + roman;
            }
            // Function to convert date to Roman numerals
            function convertDateToRoman(date) {
                const day = romanize(date.getDate());
                const month = romanize(date.getMonth() + 1); // getMonth() is zero-based
                const year = romanize(date.getFullYear());
                return `${day}/${month}/${year}`;
            }
            // Function to convert time to Roman numerals
            function formatTimeToRoman(date) {
                const hours = romanize(date.getHours());
                const minutes = romanize(date.getMinutes());
                const seconds = romanize(date.getSeconds());
                return `${hours}:${minutes}:${seconds}`;
            }
            const date = new Date();
            const romanDate = convertDateToRoman(date);
            const time = formatTimeToRoman(date);
            const dateTime = `${romanDate}, ${time}`;
            return dateTime;
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
        },
        "UnixToDateTime": async function(app, text) {
        text = text.trim();
        if (/^\d+$/.test(text)) {
            const timestamp = parseInt(text, 10);
            if (!isNaN(timestamp)) {
                const date = new Date(timestamp * 1000);
                return date.toLocaleString();
            } else {
                return "Invalid Unix timestamp";
            }
        } else {
            return "Invalid input for Unix timestamp";
        }
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