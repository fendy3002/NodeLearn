import redis = require("redis");
const client = redis.createClient({
    host: "127.0.0.1",
    port: "6379",
});
import Redlock = require('redlock');
let ttl = 30000; // 30 secs

const doTask = async () => {
    for(let i = 0; i < 20; i++){
        let redlock = new Redlock([client], {
            driftFactor: 0.01,
            retryCount: 10,
            retryDelay: 1000,
            retryJitter: 200
        });
    
        console.log(`acquiring lock ${i}`);
        let lock = await redlock.lock("_L_01", ttl);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        console.log(`unlocking lock ${i}`);
        await lock.unlock();    
    }

    client.quit();
};
doTask().catch(err => {
    console.log(err);
});