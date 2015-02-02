(function (exports) {
  'use strict';

  // calculate the date of easter sunday for the given year
  function calculateEasterSunday(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);

    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = (h + l - 7 * m + 114) % 31;
    day = Math.round(day + 1);
    return new Date(year, month  - 1, day);
  }

  function isBussUndBettag(date) {
    if (date.getMonth() !== 10) return false;

    // The last Wednesday before Nov 23rd
    var year = date.getFullYear();
    var dayOfWeek = new Date(year, 10, 22).getDay();
    var daysAdjust = (dayOfWeek - 3);
    if (daysAdjust < 0) daysAdjust += 7;
    var day = new Date(year, 11, 22 - daysAdjust);
    return day.getDate() === date.getDate();
  }

  exports.resetHolidays = function () {
    exports.holidays = {
      Neujahrstag: true,
      Karfreitag: true,
      Ostersonntag: true,
      Ostermontag: true,
      'Tag der Arbeit': true,
      'Christi Himmelfahrt': true,
      Pfingstmontag: true,
      Pfingstsonntag: true,
      'Tag der Deutschen Einheit': true,
      '1. Weihnachtstag': true,
      '2. Weihnachtstag': true
    };
  };

  exports.setState = function (state) {
    exports.resetHolidays();
    switch (state) {
    case 'bw':
      exports.holidays['Heilige Drei Könige'] = true;
      exports.holidays.Fronleichnam = true;
      exports.holidays.Allerheiligen = true;
      break;
    case 'by':
      exports.holidays['Heilige Drei Könige'] = true;
      exports.holidays.Fronleichnam = true;
      exports.holidays['Mariä Himmelfahrt'] = true;
      exports.holidays.Allerheiligen = true;
      break;
    case 'bb':
      exports.holidays.Reformationstag = true;
      break;
    case 'he':
      exports.holidays.Fronleichnam = true;
      break;
    case 'mv':
      exports.holidays.Reformationstag = true;
      break;
    case 'nw':
    case 'rp':
      exports.holidays.Fronleichnam = true;
      exports.holidays.Allerheiligen = true;
      break;
    case 'sl':
      exports.holidays.Fronleichnam = true;
      exports.holidays['Mariä Himmelfahrt'] = true;
      exports.holidays.Allerheiligen = true;
      break;
    case 'sn':
      exports.holidays.Reformationstag = true;
      exports.holidays['Buß- und Bettag'] = true;
      break;
    case 'st':
      exports.holidays['Heilige Drei Könige'] = true;
      exports.holidays.Reformationstag = true;
      break;
    case 'th':
      exports.holidays.Reformationstag = true;
      break;
    }
  };

  exports.isHoliday = function (date) {
    var month = date.getMonth();
    var day = date.getDate();

    function check(name, m, d) {
      return (exports.holidays[name] && month === m && day === d) ? name : false;
    }

    // check fixed holidays
    var r;
    if ((r = check('Neujahrstag', 0, 1))) return r;
    if ((r = check('Heilige Drei Könige', 0, 6))) return r;
    if ((r = check('Tag der Arbeit', 4, 1))) return r;
    if ((r = check('Augsburger Friedensfest', 7, 8))) return r;
    if ((r = check('Mariä Himmelfahrt', 7, 15))) return r;
    if ((r = check('Tag der Deutschen Einheit', 9, 3))) return r;
    if ((r = check('Reformationstag', 9, 31))) return r;
    if ((r = check('Allerheiligen', 10, 1))) return r;
    if ((r = check('Heiligabend', 11, 24))) return r;
    if ((r = check('1. Weihnachtstag', 11, 25))) return r;
    if ((r = check('2. Weihnachtstag', 11, 26))) return r;
    if ((r = check('Silvester', 11, 31))) return r;

    // check variable holidays
    var year = date.getFullYear();
    var tsYearStart = new Date(year, 0, 1).valueOf();
    var easterDays = Math.round((calculateEasterSunday(year).valueOf() - tsYearStart) / 86400000);
    var diff = Math.round((date.valueOf() - tsYearStart) / 86400000) - easterDays;

    function checkVar(name, d) {
      return (exports.holidays[name] && diff === d) ? name : false;
    }

    if ((r = checkVar('Rosenmontag', -48))) return r;
    if ((r = checkVar('Gründonnerstag', -3))) return r;
    if ((r = checkVar('Karfreitag', -2))) return r;
    if ((r = checkVar('Ostersonntag', 0))) return r;
    if ((r = checkVar('Ostermontag', 1))) return r;
    if ((r = checkVar('Christi Himmelfahrt', 39))) return r;
    if ((r = checkVar('Pfingstsonntag', 49))) return r;
    if ((r = checkVar('Pfingstmontag', 50))) return r;
    if ((r = checkVar('Fronleichnam', 60))) return r;

    // check Bu&- und Bettag
    if (exports.holidays['Buß- und Bettag'] && isBussUndBettag(date)) return 'Buß- und Bettag';

    return false;
  };

  exports.isWorkday = function (date) {
    var day = date.getDay();
    if (day === 0 || day === 6) return false;
    return !exports.isHoliday(date);
  };
}(typeof exports === 'undefined' ? (window.holiday = {}) : exports));
