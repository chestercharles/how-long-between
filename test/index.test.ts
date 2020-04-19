import { expect } from "chai";
import howLongBetween from "../src";

describe("calculates time between", function () {
  it("Jan 31st and Feb 28th", function () {
    const startDate = new Date("Jan 31 2020 17:00:00");
    const endDate = new Date("Feb 28 2020 17:00:00");

    const { days, months } = howLongBetween(startDate, endDate);
    expect(days).to.equal(28, "days");
    expect(months).to.equal(0, "months");
  });
  it("Jan 31st and Mar 31st", function () {
    const startDate = new Date("Jan 31 2020 17:00:00");
    const endDate = new Date("Mar 31 2020 17:00:00");

    const { days, months } = howLongBetween(startDate, endDate);
    expect(days).to.equal(0, "days");
    expect(months).to.equal(2, "months");
  });
  it("Jan 29nd and Feb 29nd", function () {
    const startDate = new Date("Jan 29 2020 17:00:00");
    const endDate = new Date("Feb 29 2020 17:00:00");

    const { days, months } = howLongBetween(startDate, endDate);
    expect(days).to.equal(0, "days");
    expect(months).to.equal(1, "months");
  });
  it("Jan 29nd and Feb 28nd of the following year", function () {
    const startDate = new Date("Jan 29 2020 17:00:00");
    const endDate = new Date("Feb 28 2021 17:00:00");

    const { days, months, years } = howLongBetween(startDate, endDate);
    expect(days).to.equal(30, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(1, "years");
  });
  it("Dec 2nd and Jan 2nd of the following year", function () {
    const startDate = new Date("Dec 2 2020 17:00:00");
    const endDate = new Date("Jan 2 2021 17:00:00");

    const { days, months, years } = howLongBetween(startDate, endDate);
    expect(days).to.equal(0, "days");
    expect(months).to.equal(1, "months");
    expect(years).to.equal(0, "years");
  });
  it("Dec 31st and Jan 1st of the following year", function () {
    const startDate = new Date("Dec 31 2020 17:00:00");
    const endDate = new Date("Jan 1 2021 17:00:00");

    const { days, months, years } = howLongBetween(startDate, endDate);
    expect(days).to.equal(1, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(0), "years";
  });
  it("Dec 31st and Dec 31st, 1 sec later of the following year", function () {
    const startDate = new Date("Dec 31 2020 17:00:00");
    const endDate = new Date("Dec 31 2021 17:00:01");

    const { seconds, minutes, hours, days, months, years } = howLongBetween(
      startDate,
      endDate
    );
    expect(seconds).to.equal(1, "seconds");
    expect(minutes).to.equal(0, "minutes");
    expect(hours).to.equal(0, "hours");
    expect(days).to.equal(0, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(1, "years");
  });
  it("Dec 31st and Dec 31st, 1 sec earlier of the following year", function () {
    const startDate = new Date("Dec 4 2020 13:00:00 GMT");
    const endDate = new Date("Dec 4 2021 12:59:59 GMT");

    const { seconds, minutes, hours, days, months, years } = howLongBetween(
      startDate,
      endDate
    );
    expect(seconds).to.equal(59, "seconds");
    expect(minutes).to.equal(59, "minutes");
    expect(hours).to.equal(23, "hours");
    expect(days).to.equal(29, "days");
    expect(months).to.equal(11, "months");
    expect(years).to.equal(0, "years");
  });
  it("Dec 31st and Jan 1st, 1hr, 37min, and 6 secs later of 7 years later", function () {
    const startDate = new Date("Dec 31 2020 17:00:00");
    const endDate = new Date("Jan 1 2027 18:37:06");

    const { seconds, minutes, hours, days, months, years } = howLongBetween(
      startDate,
      endDate
    );
    expect(seconds).to.equal(6, "seconds");
    expect(minutes).to.equal(37, "minutes");
    expect(hours).to.equal(1, "hours");
    expect(days).to.equal(1, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(6), "years";
  });
  it("Dec 31st and Jan 1st, 1hr, 37min, and 6 secs earlier of 7 years ago", function () {
    const startDate = new Date("Dec 31 2020 18:37:06");
    const endDate = new Date("Jan 1 2027 17:00:00");

    const { seconds, minutes, hours, days, months, years } = howLongBetween(
      startDate,
      endDate
    );
    expect(seconds).to.equal(54, "seconds");
    expect(minutes).to.equal(22, "minutes");
    expect(hours).to.equal(22, "hours");
    expect(days).to.equal(0, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(6), "years";
  });
  it("now and 1 millisecond ago tomorrow", function () {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() - 1);
    endDate.setDate(endDate.getDate() + 1);

    const {
      seconds,
      minutes,
      hours,
      days,
      months,
      years,
      milliseconds,
    } = howLongBetween(startDate, endDate);
    expect(milliseconds).to.equal(999, "milliseconds");
    expect(seconds).to.equal(59, "seconds");
    expect(minutes).to.equal(59, "minutes");
    expect(hours).to.equal(23, "hours");
    expect(days).to.equal(0, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(0), "years";
  });
  it("Dec 31st and Jan 1st, 1hr, 37min, 6secs and 40ms later of 7 years later", function () {
    const startDate = new Date(
      "Dec 31 2020 17:00:00 GMT-0700 (Mountain Standard Time)"
    );
    const endDate = new Date(1798853826040);

    const {
      milliseconds,
      seconds,
      minutes,
      hours,
      days,
      months,
      years,
    } = howLongBetween(startDate, endDate);
    expect(milliseconds).to.equal(40, "milliseconds");
    expect(seconds).to.equal(6, "seconds");
    expect(minutes).to.equal(37, "minutes");
    expect(hours).to.equal(1, "hours");
    expect(days).to.equal(1, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(6, "years");
  });
  it("Dec 31st and Jan 1st, 1hr, 37min, 6secs and 40ms later of 7 years later", function () {
    const startDate = new Date(
      "Dec 31 2020 17:00:00 GMT-0700 (Mountain Standard Time"
    );
    const endDate = new Date(1798853826040);

    const {
      milliseconds,
      seconds,
      minutes,
      hours,
      days,
      months,
      years,
    } = howLongBetween(startDate, endDate);
    expect(milliseconds).to.equal(40, "milliseconds");
    expect(seconds).to.equal(6, "seconds");
    expect(minutes).to.equal(37, "minutes");
    expect(hours).to.equal(1, "hours");
    expect(days).to.equal(1, "days");
    expect(months).to.equal(0, "months");
    expect(years).to.equal(6, "years");
  });
  it("the beginning of unix time and the end of javascript", function () {
    const startDate = new Date(0);
    const endDate = new Date(8640000000000000);
    const { seconds, minutes, hours, days, months, years } = howLongBetween(
      startDate,
      endDate
    );
    expect(seconds).to.equal(0, "seconds");
    expect(minutes).to.equal(0, "minutes");
    expect(hours).to.equal(0, "hours");
    expect(days).to.equal(12, "days");
    expect(months).to.equal(8, "months");
    expect(years).to.equal(273790, "years");
  });
});
