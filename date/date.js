{
  
insertText(app) {
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
            let formatString = String(app.settings["timestamp for numeric - structure"]);
            let today = new Date();
            let timeStamp = formatDate(formatString, today);
            return timeStamp;
}


  
}