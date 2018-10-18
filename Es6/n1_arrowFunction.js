// the syntax bottom
let arrowFunction = (param1) => {
    console.log(param1);
};

// is identical with
let normalFunction = function(param1) {
    console.log(param1);
};

// arrow function can return immediately
let arrowReturn = (param1) => (param1 + 5);
let arrowReturnJson = (param1) => ({ obj: param1 });

// which is identical to
let arrowReturnNormal = (param1) => {
    return (param1 + 5)
};
let arrowReturnJsonNormal = (param1) => {
    return { "obj": param1 };
};

// then the function below
let nestedArrowFunction1 = (param1) => (param2) => (param3) => {
    return param1 + param2 + param3;
};

// is the same with function below
let nestedNormalFunction1 = function(param1){
    return function(param2){
        return function(param3){
            return param1 + param2 + param3;
        }
    }
};

// which I use many times as constructor -> param -> promise callback format. example:
let writeToFile = (fileWriter, filePath) => (contentToWrite) => (resolve, reject) => {
    fileWriter(filePath, contentToWrite, (err) => {
        if(err){ reject(err); }
        else{ resolve(); }
    })
};

// which is used like this:
let execWriteToFile = () => {
    let fileWriter = require("fs").writeFile;
    let filePath = require("path").join(__dirname, "log.txt");

    let writeToFileObj = writeToFile(fileWriter, filePath);
    new Promise(writeToFileObj("Hello World"));
};