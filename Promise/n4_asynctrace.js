

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

let returnTask = async() => {
    return 1;
};
let firstLevelReturn = async() => {
    return await returnTask();
};
let secondLevelReturn = async() => {
    return firstLevelReturn();
};
let thirdLevelReturn = () => {
    return secondLevelReturn();
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
    console.log(await thirdLevelReturn());
};
doTask();