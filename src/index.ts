function isValidDate(dateObject: Date): boolean {
  return new Date(dateObject).toString() !== "Invalid Date";
}

export default function howLongBetween(startDate: Date, endDate: Date) {
  let milliseconds = 0,
    seconds = 0,
    minutes = 0,
    hours = 0,
    days = 0,
    months = 0,
    years = 0;

  const calendarYearsBetween = endDate.getFullYear() - startDate.getFullYear();

  // If the dates are more than 1 calendar year apart we can shift the
  // end date year and just add the amount we shifted by to the year count
  let floatStart = new Date(startDate);
  if (calendarYearsBetween > 1) {
    years = calendarYearsBetween - 1;
    floatStart.setFullYear(floatStart.getFullYear() + years);
  }

  // Shift the month of our start date forward until
  // we pass our end date or hit the end of javascript
  let addDays = 0;
  while (true) {
    let tryDate = new Date(floatStart);

    // When incrementing a date by a month, the following scenarios can happen:
    //
    // In a leap year
    // Jan 30th -> Mar 1st
    // Jan 31st -> Mar 2nd
    //
    // In a non-leap year
    // Jan 29th -> Mar 1st
    // Jan 30th -> Mar 2nd
    // Jan 31st -> Mar 3rd
    //
    // Any year
    // Mar 31st -> May 1st
    // May 31st -> Jul 1st
    // Aug 31st -> Oct 1st
    // Oct 31st -> Dec 1st
    //
    // If we encounter one of those scenarios, then the subsequent month incrementation
    // should be by the number of days that needs to be added to the "tryDate" in order to
    // make it 2 months from the "tryDate" two loops previous
    if (addDays > 0) {
      tryDate.setDate(tryDate.getDate() + addDays);
      addDays = 0;
    } else {
      tryDate.setMonth(tryDate.getMonth() + 1);
      addDays = floatStart.getDate() - tryDate.getDate();
    }

    if (isValidDate(tryDate) && tryDate <= endDate) {
      months = months + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  // Shift the day of our floatStart forward until
  // we pass our end date or hit the end of javascript
  while (true) {
    let tryDate = new Date(floatStart);
    tryDate.setDate(tryDate.getDate() + 1);
    if (isValidDate(tryDate) && tryDate <= endDate) {
      days = days + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  // Shift the hours of our floatStart forward until
  // we pass our end date or hit the end of javascript
  while (true) {
    let tryDate = new Date(floatStart);
    tryDate.setHours(tryDate.getHours() + 1);
    if (isValidDate(tryDate) && tryDate <= endDate) {
      hours = hours + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  // Shift the minutes of our floatStart forward until
  // we pass our end date or hit the end of javascript
  while (true) {
    let tryDate = new Date(floatStart);
    tryDate.setMinutes(tryDate.getMinutes() + 1);
    if (isValidDate(tryDate) && tryDate <= endDate) {
      minutes = minutes + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  // Shift the seconds of our floatStart forward until
  // we pass our end date or hit the end of javascript
  while (true) {
    let tryDate = new Date(floatStart);
    tryDate.setSeconds(tryDate.getSeconds() + 1);
    if (isValidDate(tryDate) && tryDate <= endDate) {
      seconds = seconds + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  // Shift the milliseconds of our floatStart forward until
  // we pass our end date or hit the end of javascript
  while (true) {
    let tryDate = new Date(floatStart);
    tryDate.setMilliseconds(tryDate.getMilliseconds() + 1);
    if (isValidDate(tryDate) && tryDate <= endDate) {
      milliseconds = milliseconds + 1;
      floatStart = tryDate;
    } else {
      break;
    }
  }

  if (months >= 12) {
    // If we counted more than 12 months between the floated started date and
    // the end date then just increment years and set months to the remainder
    years = years + 1;
    months = months % 12;
  }

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
  };
}

/**
 * Returns the amount of time between now and the end of JavaScript
 */
export function howLongUntilJavaScriptBreaks() {
  return howLongBetween(new Date(), new Date(8640000000000000));
}
