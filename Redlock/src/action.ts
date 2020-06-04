import Redlock = require("redlock");
import lo = require('lodash');

export default async (redis) => {
    let redlock = new Redlock([redis], {
        driftFactor: 0.01,
        retryCount: 20,
        retryDelay: 2000,
        retryJitter: 200
    });
    let ttl = 30000; // 30 secs

    let exec = (handle, keysArr) => {
        return async () => {
            let lockArr = [];
            for (let key of lo.sortBy(keysArr)) {
                let lock = await redlock.lock(`_L_${key}`, ttl);
                lockArr.push(lock);
            }
            if (keysArr.length > 0) {
                console.log(keysArr.join(",") + " locked", lockArr.length);
            }
            try {
                await handle();
            } finally {
                for (let lock of lockArr) {
                    await lock.unlock();
                }
                if (keysArr.length > 0) {
                    console.log(keysArr.join(",") + " released");
                }
            }
        }
    };

    let andLock = (handle, existing: string[]) => {
        return (key: string) => {
            return {
                withLock: andLock(handle, existing.concat([key])),
                exec: exec(handle, existing.concat([key]))
            };
        };
    };

    let action = (handle) => {
        return {
            withLock: andLock(handle, []),
            exec: exec(handle, [])
        };
    };
    return action;
};