[![Build Status](https://travis-ci.org/jdiehl/holiday-de.svg)](https://travis-ci.org/jdiehl/holiday-de)

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

* Neujahrstag
* Heilige Drei Könige
* Tag der Arbeit
* Augsburger Friedensfest
* Mariä Himmelfahrt
* Tag der Deutschen Einheit
* Reformationstag
* Allerheiligen
* Heiligabend
* 1. Weihnachtstag
* 2. Weihnachtstag
* Silvester
* Rosenmontag
* Gründonnerstag
* Karfreitag
* Ostersonntag
* Ostermontag
* Christi Himmelfahrt
* Pfingstsonntag
* Pfingstmontag
* Fronleichnam
* Buß- und Bettag

To check which holidays are enabled for a state, call `setState()` and check the `holidays` object:

```
holiday.setState('nw');
console.log(holiday.holidays);
```

To enable a disabled holiday, set it to `true`:

```
holiday.holidays.Rosenmontag = true;
```

## Author

[Jonathan Diehl](https://github.com/jdiehl)
