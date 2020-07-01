import DoTryFinally from './DoTryFinally';

let doTask = async () => {
    try {
        await DoTryFinally();
    } catch (err) {
        console.log("top level err " + err)
    }
};
doTask();