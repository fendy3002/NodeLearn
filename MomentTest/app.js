let moment = require('moment-timezone');
let fullDateFormat = "YYYY-MM-DD HH:mm:ss";

let first = moment(new Date().getTime());
let second = moment();
let third = moment.utc();
let fourth = third.tz(moment.tz.guess());

console.log(
    first.format(fullDateFormat),
    second.format(fullDateFormat),
    third.format(fullDateFormat),
    
    fourth.format(fullDateFormat)
);