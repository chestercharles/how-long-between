# how-long-between

Calculates the years, months, days, hours, minutes, seconds and milliseconds between two dates

[![Build Status](https://travis-ci.com/chestercharles/how-long-between.svg?branch=master)](https://travis-ci.com/chestercharles/how-long-between)

## Install

```
npm i --save how-long-between
```

## Usage

```
import howLongBetween from 'how-long-between';

const today = new Date('Fri Apr 17 2020 12:54:09 GMT-0700 (Mountain Standard Time)');
const myBirthday = new Date('Wed May 6 2020 12:54:09 GMT-0700 (Mountain Standard Time)');

const {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
  } = howLongBetween(today, myBirthday);
```

## Business Rules

One month from a date is the number of days in that month added to the date. So one month from January 31st would be March 2nd if that year was a leap year or March 3rd if that was not a leap year. Therefore, the amount of time between May 13st and Jun 30th is 30 days _not_ one month.

Similiarly, one year from a date is the number of days in that year added to the date. So 1 year from February 29th would be March 1st of the following year.
