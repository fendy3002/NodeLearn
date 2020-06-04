import redis = require("redis");
const client = redis.createClient({
    host: "127.0.0.1",
    port: "6379",
});
import Redlock = require('redlock');
let redlock = new Redlock([client], {
    driftFactor: 0.01,
    retryCount: 20,
    retryDelay: 2000,
    retryJitter: 200
});
let ttl = 30000; // 30 secs
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

let lockWatch: any = {

};

const spawn = async () => {
    let lockIndex = getRandomInt(0, lockArr.length - 1);

    if (lockWatch[lockArr[lockIndex]]) {
        console.log(lockArr[lockIndex] + " awaiting");
    }
    let lock = await redlock.lock(lockArr[lockIndex], ttl);
    if (process.env.LEVEL == "DEBUG") {
        console.log(lockArr[lockIndex] + " locked");
    }
    lockWatch[lockArr[lockIndex]] = lockWatch[lockArr[lockIndex]] ?? 0;
    lockWatch[lockArr[lockIndex]]++;
    if (lockWatch[lockArr[lockIndex]] > 1) {
        console.log(lockArr[lockIndex] + " double");
    }
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, taskLength);
    });
    await lock.unlock();
    if (process.env.LEVEL == "DEBUG") {
        console.log(lockArr[lockIndex] + " released");
    }
    lockWatch[lockArr[lockIndex]]--;
}

const doTask = async () => {
    let promises: any[] = [];
    for (let loop = 0; loop < 20; loop++) {
        for (let i = 0; i < 100; i++) {
            promises.push(spawn());
        }
        await Promise.all(promises);
    }
};
doTask();