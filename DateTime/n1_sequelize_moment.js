require('dotenv').config();
const moment = require('moment');
const sequelize = require('sequelize');

console.log('----------');
console.log("Server TZ:", process.env.TZ);
console.log("START: using native nodejs date on 2018-03-01 16:20:15");

let date = new Date('2018-03-01 16:20:15');
console.log("Log date by itself, should show 09:20:", date);
console.log("Log date as string, should show 16:20:", date.toString());
console.log();

console.log("START: using moment from previous date object");
let momentDate = moment(date);
console.log("Log as moment object, should show 16:20:", momentDate);
console.log();
console.log("START: using moment.utc from previous date object");
let momentUtc = moment.utc(date);
console.log("Log as moment object, should show 09:20:", momentUtc);
console.log();
console.log("START: using moment.utc from string 2018-03-01 16:20:15");
let momentUtc2 = moment.utc('2018-03-01 16:20:15');
console.log("Log as moment object, should show 16:20:", momentUtc2);
console.log();


let dbName = process.env.MYSQL_DATABASE;
let dbUser = process.env.MYSQL_USER;
let dbPass = process.env.MYSQL_ROOT_PASSWORD;
let dbHost = process.env.MYSQL_HOST;
let dbPort = process.env.MYSQL_PORT;

let db = new sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: "mysql",
    operatorsAliases: false,
    timezone: "+00:00"
});
let timeDataModel = db.define('time_data', {
    code: {type: sequelize.STRING, primaryKey: true},
    utc_created: {type: sequelize.DATE},
}, {
    timestamps: false,
    tableName: 'time_data'
});
let defaultData = () => new Promise((resolve, reject) => {
    console.log();
    console.log("START: using sequelize model to get date time based data");
    timeDataModel.findOne({
        where: {
            code: "default"
        },
        logging: false,
        raw: true
    }).then((data) => {
        console.log("Date stored in db should be: 2018-02-01 03:02:01");
        console.log("Date as retrieved:", data.utc_created);
        console.log("Date as moment, should show 10:02:", moment(data.utc_created));
        console.log("Date as moment.utc, should show 03:02:", moment.utc(data.utc_created));
        return Promise.resolve();
    }).then(resolve);
});
let insertData1 = () => new Promise((resolve, reject) => {
    console.log();
    console.log("START: using sequelize model to insert and get date time based data");
    console.log("insert using nodejs date");
    timeDataModel.destroy({
        where: {
            code: "data1"
        }, logging: false
    }).then(() => {
        return timeDataModel.create({
            code: "data1",
            utc_created: new Date('2018-02-01 03:02:01')
        }, {logging: false});
    }).then(() => {
        return timeDataModel.findOne({
            where: {
                code: "data1"
            },
            logging: false,
            raw: true
        });
    }).then((data) => {
        console.log("Because timezone, date stored in db should be: 2018-01-31 20:02:01");
        console.log("Date as retrieved:", data.utc_created);
        console.log("Date as moment, should show 03:02:", moment(data.utc_created));
        console.log("Date as moment.utc, should show 20:02:", moment.utc(data.utc_created));
        return Promise.resolve();
    }).then(() => {
        return timeDataModel.destroy({
            where: {
                code: "data1"
            }, logging: false
        });
    }).then(resolve);
});
let insertData2 = () => new Promise((resolve, reject) => {
    console.log();
    console.log("START: using sequelize model to insert and get date time based data");
    console.log("insert using string");
    timeDataModel.destroy({
        where: {
            code: "data2"
        }, logging: false
    }).then(() => {
        return timeDataModel.create({
            code: "data2",
            utc_created: '2018-02-01 03:02:01'
        }, {logging: false});
    }).then(() => {
        return timeDataModel.findOne({
            where: {
                code: "data2"
            },
            logging: false,
            raw: true
        });
    }).then((data) => {
        console.log("Because timezone, date stored in db should be: 2018-01-31 20:02:01");
        console.log("Date as retrieved:", data.utc_created);
        console.log("Date as moment, should show 03:02:", moment(data.utc_created));
        console.log("Date as moment.utc, should show 20:02:", moment.utc(data.utc_created));
        return Promise.resolve();
    }).then(() => {
        return timeDataModel.destroy({
            where: {
                code: "data2"
            }, logging: false
        });
    }).then(resolve);
});
let insertData3 = () => new Promise((resolve, reject) => {
    console.log();
    console.log("START: using sequelize model to insert and get date time based data");
    console.log("insert using moment.utc");
    timeDataModel.destroy({
        where: {
            code: "data3"
        }, logging: false
    }).then(() => {
        return timeDataModel.create({
            code: "data3",
            utc_created: moment.utc('2018-02-01 03:02:01').toDate()
        }, {logging: false});
    }).then(() => {
        return timeDataModel.findOne({
            where: {
                code: "data3"
            },
            logging: false,
            raw: true
        });
    }).then((data) => {
        console.log("Date stored in db should be: 2018-02-01 03:02:01");
        console.log("Date as retrieved:", data.utc_created);
        console.log("Date as moment, should show 10:02:", moment(data.utc_created));
        console.log("Date as moment.utc, should show 03:02:", moment.utc(data.utc_created));
        return Promise.resolve();
    }).then(() => {
        return timeDataModel.destroy({
            where: {
                code: "data3"
            }, logging: false
        });
    }).then(resolve);
});
let insertData4 = () => new Promise((resolve, reject) => {
    console.log();
    console.log("START: using sequelize model to insert and get date time based data");
    console.log("insert using string with +00:00 suffix");
    timeDataModel.destroy({
        where: {
            code: "data4"
        }, logging: false
    }).then(() => {
        return timeDataModel.create({
            code: "data4",
            utc_created: '2018-02-01 03:02:01+00:00'
        }, {logging: false});
    }).then(() => {
        return timeDataModel.findOne({
            where: {
                code: "data4"
            },
            logging: false,
            raw: true
        });
    }).then((data) => {
        console.log("Date stored in db should be: 2018-02-01 03:02:01");
        console.log("Date as retrieved:", data.utc_created);
        console.log("Date as moment, should show 10:02:", moment(data.utc_created));
        console.log("Date as moment.utc, should show 03:02:", moment.utc(data.utc_created));
        return Promise.resolve();
    }).then(() => {
        return timeDataModel.destroy({
            where: {
                code: "data4"
            }, logging: false
        });
    }).then(resolve);
});

defaultData()
.then(insertData1)
.then(insertData2)
.then(insertData3)
.then(insertData4)
.then(() => {
    db.close();
    console.log('----------');
})