

let errorTask = async () => {
    throw new Error("Custom error");
};

let firstLevelError = async () => {
    return await errorTask();
};
let secondLevelError = async () => {
    return firstLevelError();
};
let thirdLevelError = () => {
    return secondLevelError();
};
let thirdLevelError2 = () => {
    return firstLevelError();
};

let doTask = async () => {
    try {
        await thirdLevelError();
    } catch (ex) {
        console.log(ex);
    }
    try {
        await thirdLevelError2();
    } catch (ex) {
        console.log(ex);
    }
};
doTask();