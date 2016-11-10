[![Build Status](https://travis-ci.org/jdiehl/holiday-de.svg)](https://travis-ci.org/jdiehl/holiday-de)
[![Coverage Status](https://coveralls.io/repos/jdiehl/holiday-de/badge.svg)](https://coveralls.io/r/jdiehl/holiday-de)
[![Dependency Status](https://david-dm.org/jdiehl/holiday-de.svg)](https://david-dm.org/jdiehl/holiday-de)

# holiday-de

Determine whether a given date is a German holiday

## Usage

```
var holiday = require('holiday-de');

// set the state (Bundesland)
holiday.setState('nw');

// check your dates -> returns true
holiday.isHoliday(new Date(2015, 0, 1));
```

Footnote: holiday-de plays nice with [moment](http://momentjs.com).

## List of supported states (Bundesländer)

* `bw`: Baden-Württemberg
* `by`: Bayern
* `be`: Berlin
* `bb`: Brandenburg
* `hb`: Bremen
* `hh`: Hamburg
* `he`: Hessen
* `mv`: Mecklenburg-Vorpommern
* `ni`: Niedersachsen
* `nw`: Nordrhein-Westfalen
* `rp`: Rheinland-Pfalz
* `sl`: Saarland
* `sn`: Sachsen
* `st`: Sachsen-Anhalt
* `sh`: Schleswig-Holstein
* `th`: Thüringen

## List of supported holidays

* `Neujahrstag`
* `Heilige Drei Könige`
* `Tag der Arbeit`
* `Augsburger Friedensfest`
* `Mariä Himmelfahrt`
* `Tag der Deutschen Einheit`
* `Reformationstag`
* `Allerheiligen`
* `Heiligabend`
* `1. Weihnachtstag`
* `2. Weihnachtstag`
* `Silvester`
* `Rosenmontag`
* `Gründonnerstag`
* `Karfreitag`
* `Ostersonntag`
* `Ostermontag`
* `Christi Himmelfahrt`
* `Pfingstsonntag`
* `Pfingstmontag`
* `Fronleichnam`
* `Buß- und Bettag`

Note that in 2017 `Reformationstag` is a holiday in all states.

To check which holidays are enabled for a state, call `setState()` and check the `holidays` object:

```
holiday.setState('nw');
console.log(holiday.holidays);
```

To enable a additional holidays, set them to `true` in the `holidays` object:

```
holiday.holidays.Rosenmontag = true;
holiday.holidays['Augsburger Friedensfest'] = true;
```

## Author

[Jonathan Diehl](https://github.com/jdiehl)
