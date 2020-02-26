/**
 * Name: Sifiso
 * Surname: Myeza
 * 
 * Assessment: Build a calendar using vanilla Javascript
 * 
 * Due: 28th of February 2020
 */


// Constant variables
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"];
const YEAR_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TODAY = new Date();

class Day {
  /**
   * A Day class which contains the day and the date of the day
   * 
   * @param {*} day 
   * @param {*} dayDate 
   */
  constructor(day, dayDate) {
    this.day = day;
    this.dayDate = dayDate;
  }
}

class Calendar {
  /**
   * The Calendar class which is responsible for creating the calendar
   * 
   * @param {*} year 
   * @param {*} month 
   */
  constructor(year = TODAY.getFullYear(), month = YEAR_MONTHS[TODAY.getMonth()]) {
    this.year = year;
    this.month = month;
    this.days = this.getDays()
  }

  getYear() {
    /**
     * A fucntion to retrieve calendar year
     */
    return this.year;
  }

  setYear(year) {
    /**
     * A function to set the calendar year
     */
    this.year = year;
  }

  getMonth() {
    /**
     * A function to get the calendar month
     */
    return this.month;
  }

  setMonth(month) {
    /**
     * A function to set the calendar month
     */
    this.month = month;
  }

  displayCalendar() {
    /**
     * A function for displaying the calendar
     */

    // Table body element
    let calendarTableBody = document.getElementById("calendar-table-body");
    // Table Year / Month container element
    let calendarYearMonth = document.getElementById("calendar-year-month");

    calendarYearMonth.innerHTML = `${this.getYear()} / ${this.getMonth()}`;

    // Table row element
    let calendarTableRow = document.createElement("tr");
    let emptyDaysPrior = Math.abs(0 - WEEK_DAYS.indexOf(this.getDays()[0].day))

    // A for loop responsible for populating the calendar with the data.
    for (let j = 0; j < this.getDays().length; j++) {
      // Table row data element
      let calendarTableRowCell = document.createElement("td");

      // Append pre empty days for the specific month with underscores
      if (j == 0 && this.getDays()[0].day != "Sun") {
        for (let i = 0; i < emptyDaysPrior; i++) {
          calendarTableRowCell = document.createElement("td");
          calendarTableRowCell.appendChild(document.createTextNode("_"));
          calendarTableRow.appendChild(calendarTableRowCell);
        }
        calendarTableRowCell = document.createElement("td");
      } 
      if (this.getDays()[j].day == "Sun") {
        // Begin each new week on the new table row
        calendarTableRow = document.createElement("tr");
        // Load the cell content
        calendarTableRowCell.appendChild(document.createTextNode(this.getDays()[j].dayDate));
      } else {
        // Load the cell content
        calendarTableRowCell.appendChild(document.createTextNode(this.getDays()[j].dayDate));
      }
      // Load the row content and table content
      calendarTableRow.appendChild(calendarTableRowCell);
      calendarTableBody.appendChild(calendarTableRow);
    }
  }

  
  nextYearMonth() {
    /**
     * A function for navigating to the next month
     */
    let year = YEAR_MONTHS.indexOf(this.getMonth()) == 11 ? this.getYear() + 1 : this.getYear();
    let month_index = (YEAR_MONTHS.indexOf(this.getMonth()) + 1) % 12;

    this.setYear(year);
    this.setMonth(YEAR_MONTHS[month_index]);
  }

  previousYearMonth() {
    /**
     * A function for navigating to the previous month
     */
    let year = YEAR_MONTHS.indexOf(this.getMonth()) == 0 ? this.getYear() - 1 : this.getYear();
    let month_index = YEAR_MONTHS.indexOf(this.getMonth()) == 0 ? 11 :  YEAR_MONTHS.indexOf(this.getMonth()) - 1;
    
    this.setYear(year);
    this.setMonth(YEAR_MONTHS[month_index]);
  }

  getDays() {
    /**
     * A function for retrieving month days
     */
    let day_index = (new Date(this.getYear(), YEAR_MONTHS.indexOf(this.getMonth()))).getDay();

    let days = [];

    for (let index = 0; index < this.getNumberOfMonthDays(); index++) {
      if (day_index == 7) {
        day_index = 0;
      }
      
      days.push(new Day(WEEK_DAYS[day_index], index + 1));

      day_index += 1;
    }

    return days;
  }

  getNumberOfMonthDays() {
    /**
     * A function to get the number of days in a month
     */
    let monthDays = 30;
    if (this.getMonth() == "Feb") {
      if (this.getYear() % 4 == 0) {
        monthDays = 29;
      } else {
        monthDays = 28;
      }
    } else if (YEAR_MONTHS.indexOf(this.getMonth()) == 11 || YEAR_MONTHS.indexOf(this.getMonth()) % 2 == 0) {
      monthDays =  31;
    }
    return monthDays;
  }
}

// Creating a calendar with default values
let calendar = new Calendar()

// Executing next and previous functions
console.log(calendar.getNumberOfMonthDays(), calendar.getMonth(), calendar.getYear())
console.log(calendar.getDays())
calendar.nextYearMonth()
console.log("****************************Next Month********************************")
console.log(calendar.getNumberOfMonthDays(), calendar.getMonth(), calendar.getYear())
console.log(calendar.getDays())
calendar.previousYearMonth()
console.log("*************************Previous Month*******************************")
console.log(calendar.getNumberOfMonthDays(), calendar.getMonth(), calendar.getYear())
console.log(calendar.getDays())
calendar.previousYearMonth()
console.log("*************************Previous Month*******************************")
console.log(calendar.getNumberOfMonthDays(), calendar.getMonth(), calendar.getYear())
console.log(calendar.getDays())

calendar.displayCalendar()
