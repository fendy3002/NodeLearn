let exec1 = function() {
    console.log("START: EXEC 1");
    let a = [3, 5, 7];
    let wrongOperation = function(arr){
        arr.push(8);
        arr[1] = 4;

        return arr;
    };

    let b = wrongOperation(a);
    console.log("b:");
    console.log(b); // results [ 3, 4, 7, 8]

    console.log("a:");
    console.log(a); // results [ 3, 4, 7, 8]
    console.log("DONE: EXEC 1");
    console.log();
};

let exec2 = function() {
    console.log("START: EXEC 2");
    let a = [3, 5, 7];
    let correctOperation = function(arr){
        let result = [].concat(arr);
        result.push(8);
        result[1] = 4;

        return result;
    };

    let b = correctOperation(a);
    console.log("b:");
    console.log(b); // results [ 3, 4, 7, 8]

    console.log("a:");
    console.log(a); // results [ 3, 5, 7]
    console.log("DONE: EXEC 2");
    console.log();
};

let exec3 = function() {
    console.log("START: EXEC 3");
    let a = [3, 5, 7];
    let anotherCorrectOperation = function(arr){
        let newData = [];
        for(let i = 2; i < 4; i++){
            newData.push(i);
        }
        return arr.concat(newData);
    };

    let b = anotherCorrectOperation(a);
    console.log("b:");
    b[1] = 4; // test mutability
    console.log(b); // results [ 3, 4, 7, 2, 3]

    console.log("a:");
    console.log(a); // results [ 3, 5, 7]
    console.log("DONE: EXEC 3");
    console.log();
};

let exec4 = function() {
    console.log("START: EXEC 4");
    let a = [{v: 1}, {v: 3}];
    let anotherCorrectOperation = function(arr){
        let newData = [];
        for(let i = 2; i < 4; i++){
            newData.push({v: i});
        }
        return arr.concat(newData);
    };

    let b = anotherCorrectOperation(a);
    console.log("b:");
    b[1].v = 4; // test mutability
    console.log(b); // results [ { v: 1 }, { v: 4 }, { v: 2 }, { v: 3 } ]

    console.log("a:");
    console.log(a); // results [ { v: 1 }, { v: 4 } ]
    console.log("DONE: EXEC 4");
    console.log();
};

exec1();
exec2();
exec3();
exec4();