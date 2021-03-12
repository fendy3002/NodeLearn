let moment = require('moment-timezone');
let fullDateFormat = "YYYY-MM-DD HH:mm:ss";
let timezone = 'Asia/Jakarta';

let utcMoment = moment.utc();
let localMoment = moment.tz(timezone);

console.log(utcMoment.format(fullDateFormat));
console.log(localMoment.format(fullDateFormat));

let utcToLocalMomentTrue = moment.utc().tz(timezone, true);
let utcToLocalMomentFalse = moment.utc().tz(timezone, false);
let localToUtcMomentTrue = moment.tz(timezone).utc(true);
let localToUtcMomentFalse = moment.tz(timezone).utc(false);

console.log();
console.log(utcToLocalMomentTrue.format(fullDateFormat));
console.log(utcToLocalMomentFalse.format(fullDateFormat));
console.log(localToUtcMomentTrue.format(fullDateFormat));
console.log(localToUtcMomentFalse.format(fullDateFormat));
