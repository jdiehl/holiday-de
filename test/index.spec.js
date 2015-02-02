/*jshint mocha: true*/
'use strict';

var holiday = require('../index');

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

  var testData = loadTestData();

  it('should determine the correct holidays', function () {
    Object.keys(testData).forEach(function (state) {
      holiday.setState(state);
      var date = new Date(2000, 0, 1);
      while (date.getFullYear() < 2020) {
        var test = !holiday.isHoliday(date);
        var check = !testData[state][makeDateString(date)];
        console.assert(test === check, date, 'in', state, 'should be', check || 'no holiday');
        date = new Date(date.valueOf() + 86400000);
      }
    });
  });

});
