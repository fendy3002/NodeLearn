// getting data in other language
let getUser = (id) => {
    return {
        "name": "",
        "address" : ""
    };
};
let getCountry = () => {
    return [{
        code: "id",
        name: "Indonesia"
    }];
};

// usage
let user = getUser(1);
let countries = getCountry();
user.country = countries[0];
console.log("Get user in other language", user);

// getting data in nodejs
let getUserNode = (id, callback) => {
    callback({
        "name": "",
        "address" : ""
    });
};
let getCountryNode = (callback) => {
    callback([{
        code: "id",
        name: "Indonesia"
    }])
};

// usage
getUserNode(1, (user) => {
    getCountryNode((countries) => {
        user.country = countries[0];
        console.log("user node", user);
    });
});

// Using promise to prevent deep nesting
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

// promise usage
getUserPromise(1)
.then(user => {
    return getCountryPromise().then((countries) => {
        user.country = countries[0];
        return Promise.resolve(user);
    });
}).then(userWithCountry => {
    console.log("User promise", userWithCountry);
});


// beware, callback function usually return void, 
// and returned object from callback
// cannot be transferred to higher call stack, like below:
let undefinedPromise = getUserNode(1, (user) => {
    return Promise.resolve(user);
});
console.log("undefinedPromise", undefinedPromise);
// if used, it will result error
let errorInPromise = new Promise((resolve, reject) => {
    undefinedPromise.then(() => { 
        // won't get here
        console.log("Not executed");
        resolve();
    });
});
errorInPromise.catch((err) => {
    console.log("Promise can also catch error", err);
})