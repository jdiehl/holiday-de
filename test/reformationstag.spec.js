/*eslint-env mocha*/
/*eslint no-console: 0 strict: 0*/
'use strict';

var holiday = require('../holiday-de');
var states = require('./states.json');
var statesWithReformationstag = ['bb', 'mv', 'sn', 'st', 'th'];

describe('#reformationstag', function () {
  var date2017 = new Date(2017, 9, 31);
  var date2018 = new Date(2018, 9, 31);

  afterEach(function () {
    holiday.resetHolidays();
  });

  states.forEach(function (state) {
    it ('isHoliday() should identify Reformationstag in 2017 for ' + state, function () {
      holiday.setState(state);
      var test = holiday.isHoliday(date2017);
      console.assert(test, '2017-09-31 should be a holiday');
    });
  });

  states.forEach(function (state) {
    var shouldTest = statesWithReformationstag.indexOf(state) >= 0 ? 'Reformationstag' : false;
    var shouldString = shouldTest ? '' : ' not';
    it ('isHoliday() should' + shouldString + 'identify Reformationstag in 2018 for ' + state, function () {
      holiday.setState(state);
      var test = holiday.isHoliday(date2018);
      console.assert(test === shouldTest, '2018-09-31 should' + shouldString + ' be a holiday');
    });
  });

});
