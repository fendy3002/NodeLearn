const moment = require('moment');
const sequelize = require('sequelize');

let date = new Date('2018-03-01 16:20:15');
console.log(date);
console.log(date.toString());
console.log(moment(date));

let db = new sequelize('test', 'root', 'password', {
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+00:00"
});
db.query("select CAST('2018-03-01 16:20:15' as datetime) as dt", {
    type: sequelize.QueryTypes.SELECT
}).then((data) => {
    console.log(data[0].dt);
    console.log(moment.utc(data[0].dt));

    return Promise.resolve();
}).then(() => {
    db.close();
})