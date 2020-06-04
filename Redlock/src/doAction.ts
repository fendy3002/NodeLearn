import redis = require("redis");
const client = redis.createClient({
    host: "127.0.0.1",
    port: "6379",
});
import actionRaw from './action';
let action: any = null;
let taskLength = 1000; // 1 secs

let lockArr = [
    "L_2930",
    "L_2419",
    "L_2437",
    "L_2349",
    "L_2799",
    "L_2339",
    "L_2753",
    "L_2556",
    "L_2146",
    "L_2777",
    "L_2416",
    "L_2144",
    "L_2039",
    "L_2249",
    "L_2137",
    "L_2026",
    "L_2015",
    "L_2710",
    "L_2077",
    "L_2204",
    "L_2889",
    "L_2027",
    "L_2023",
    "L_2550",
    "L_2514",
    "L_2868",
    "L_2539",
    "L_2433",
    "L_2492",
    "L_2512",
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const spawn = async (lockIndex1, lockIndex2) => {
    await action(async() => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, taskLength);
        });
    }).withLock(lockArr[lockIndex1])
    .withLock(lockArr[lockIndex2])
    .exec();
}

const deadlock = async() => {
    let promises: any[] = [];

    promises.push(spawn(1, 2));
    promises.push(spawn(2, 1));
    promises.push(spawn(1, 2));
    promises.push(spawn(2, 1));
    promises.push(spawn(1, 2));
    promises.push(spawn(2, 1));
    promises.push(spawn(1, 2));
    promises.push(spawn(2, 1));
    await Promise.all(promises);
    promises = [];
};

const allToOne = async() => {
    let promises: any[] = [];

    promises.push(spawn(3, 1));
    promises.push(spawn(4, 1));
    promises.push(spawn(5, 1));
    promises.push(spawn(6, 1));
    promises.push(spawn(7, 1));
    promises.push(spawn(8, 1));
    promises.push(spawn(1, 2));
    promises.push(spawn(2, 1));
    await Promise.all(promises);
    promises = [];
};

const randomSpawn = async() => {
    let promises: any[] = [];
    for (let loop = 0; loop < 20; loop++) {
        for (let i = 0; i < 100; i++) {
            let lockIndex1 = getRandomInt(0, lockArr.length - 1);
            let lockIndex2 = getRandomInt(0, lockArr.length - 1);
            promises.push(spawn(lockIndex1, lockIndex2));
        }
        await Promise.all(promises);
        promises = [];
    }
};

const doTask = async () => {
    action = await actionRaw(client);
    
    await allToOne();
    await deadlock();
    await randomSpawn();
};
doTask();