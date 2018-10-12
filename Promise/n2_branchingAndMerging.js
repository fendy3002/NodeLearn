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
};

// Promise.all will run many promises
// at (technically) same time
// Technically, promise.all merge many promises into one flow
let getUserWithCountry = Promise.all([
    getCountryPromise(),
    getUserPromise(1)
]).then((results) => {
    let countries = results[0];
    let user = results[1];
    user.country = countries[0];
    return Promise.resolve(user)
});

// it can later be branched
getUserWithCountry.then((userWithCountry) => {
    console.log("Branch 1", userWithCountry);
    // for example, here we insert to database
});
// 2nd branch
getUserWithCountry.then((userWithCountry) => {
    console.log("Branch 2", userWithCountry);
    // and in other branch, we update the cache
    // or send notification
});
