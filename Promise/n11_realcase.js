// other language
let getUser = (id) => {
    return {
        "name": "",
        "address" : ""
    };
};

let user = getUser(1);
console.log("user other language", user);

// node
let getUserNode = (id, callback) => {
    callback({
        "name": "",
        "address" : ""
    });
};
let getCountry = (callback) => {
    callback([{
        code: "id",
        name: "Indonesia"
    }])
};

getUserNode(1, (user) => {
    console.log("user node", user);
    // processing
    getUserNode(2, (secondUser) => {
        getCountry((countries) => {

        });
    });
});

// Promise
let getUserPromise = (id) => {
    return new Promise((resolve, reject) => {
        if(id > 0){
            resolve({
                "name": "",
                "address" : ""
            });
        }
        else{
            reject("User not found");
        }
    });
};
let getCountryPromise = () => {
    return Promise.resolve([{
        code: "id",
        name: "Indonesia"
    }]);
    // equivalent to:
    /*
        return new Promise((resolve, reject) => {
            resolve([{
                code: "id",
                name: "Indonesia"
            }]);
        });
    */
};

getUserPromise(1)
.then(user => {
    return getCountryPromise().then((countries) => {
        user.country = countries[0];
        return Promise.resolve(user);
    });
}).then(userWithCountry => {
    console.log("User promise", userWithCountry);
});

Promise.all([
    getCountryPromise(),
    getUserPromise(1)
]).then((results) => {
    let countries = results[0];
    let user = results[1];
    user.country = countries[0];
    return Promise.resolve(user)
}).then((userWithCountry) => {
    console.log("User promise all", userWithCountry);
});

let undefinedPromise = getUserNode(1, (user) => {
    return Promise.resolve(user);
});
// will result error
// undefinedPromise.then(() => {});
console.log("undefinedPromise", undefinedPromise);