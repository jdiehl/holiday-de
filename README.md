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

## Author

[Jonathan Diehl](https://github.com/jdiehl)
