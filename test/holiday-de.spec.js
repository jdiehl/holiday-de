/*jshint mocha: true*/
'use strict';

var holiday = require('../holiday-de');

describe('#holiday-de', function () {

  function makeDateString(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    m = (m < 10 ? '0' : '') + m;
    d = (d < 10 ? '0' : '') + d;
    return y + m + d;
  }

  function loadTestData() {
    var data = require('./holidays.json');
    var testData = {};
    Object.keys(data).forEach(function (key) {
      var state = key.toLowerCase();
      testData[state] = {};
      data[key].forEach(function (entry) {
        testData[state][entry.date] = entry.name;
      });
    });
    return testData;
  }

  function testHolidayForStateInYear(state, year) {
    it('isHoliday() should determine the correct holidays for ' + year, function () {
      var date = new Date(year, 0, 1);
      while (date.getFullYear() === year) {
        var test = !holiday.isHoliday(date);
        var check = !testData[state][makeDateString(date)];
        console.assert(test === check, date.toJSON() + ' should be ' + (!check ? 'a' : 'no') + ' holiday');
        date = new Date(date.valueOf() + 86400000);
      }
    });
  }

  function testWorkdayForStateInYear(state, year) {
    it('isWorkday() should determine the correct workdays for ' + year, function () {
      var date = new Date(year, 0, 1);
      while (date.getFullYear() === year) {
        var day = date.getDay();
        var test = holiday.isWorkday(date);
        var check = day !== 0 && day !== 6 && !holiday.isHoliday(date);
        console.assert(test === check, date.toJSON() + ' should be ' + (check ? 'a' : 'no') + ' workday');
        date = new Date(date.valueOf() + 86400000);
      }
    });
  }

  var testData = loadTestData();
  Object.keys(testData).forEach(function (state) {
    describe(state, function () {
      beforeEach(function () { holiday.setState(state); });
      afterEach(function () { holiday.resetHolidays(); });
      for (var year = 2000; year < 2020; year++) {
        testHolidayForStateInYear(state, year);
        testWorkdayForStateInYear(state, year);
      }
    });
  });

  describe('special holidays', function () {
    beforeEach(function () {
      holiday.setState('nw');
      holiday.holidays['Augsburger Friedensfest'] = true;
      holiday.holidays.Heiligabend = true;
      holiday.holidays.Silvester = true;
      holiday.holidays.Rosenmontag = true;
      holiday.holidays.Gründonnerstag = true;
    });
    afterEach(function () { holiday.resetHolidays(); });
    it('isHoliday() should identify Augsburger Friedenfest as a holiday 2015', function () {
      var test = holiday.isHoliday(new Date(2015, 7, 8));
      console.assert(test, '2015-08-08 should be a holiday');
    });
    it('isHoliday() should identify Heiligabend 2015 as a holiday', function () {
      var test = holiday.isHoliday(new Date(2015, 11, 24));
      console.assert(test, '2015-12-24 should be a holiday');
    });
    it('isHoliday() should identify Silvester 2015 as a holiday', function () {
      var test = holiday.isHoliday(new Date(2015, 11, 31));
      console.assert(test, '2015-12-31 should be a holiday');
    });
    it('isHoliday() should identify Rosenmontag 2015 as a holiday', function () {
      var test = holiday.isHoliday(new Date(2015, 1, 16));
      console.assert(test, '2015-02-16 should be a holiday');
    });
    it('isHoliday() should identify Gründonnerstag 2015 as a holiday', function () {
      var test = holiday.isHoliday(new Date(2015, 3, 2));
      console.assert(test, '2015-02-04 should be a holiday');
    });
  });

});
