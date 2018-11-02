let getUser = (id) => {
    return new Promise((resolve, reject) => {
        if(id > 0){
            resolve({
                "name": "",
                "country": "id",
                "address" : ""
            });
        }
        else{
            reject("User not found");
        }
    });
};
let getCountry = () => {
    return Promise.resolve([{
        code: "id",
        name: "Indonesia"
    }]);
};
let getBranch = () => {
    return Promise.resolve({
        "id": "02"
    });
};
let getBranchFromIndonesia = () => {
    return Promise.resolve({
        "id": "02"
    });
};

// Handling conditional
getUser(1)
.then((user) => {
    if(user.country == "id"){
        return getBranchFromIndonesia(user).then(branch => {
            user.branch = branch;
            return Promise.resolve(user);
        });
    } else{
        return getBranch(user).then(branch => {
            user.branch = branch;
            return Promise.resolve(user);
        });
    }
}).then((userWithBranch) => {
    console.log("userWithBranch", userWithBranch);
    // continue with code
});

// promise.resolve
(function(){
    let getUser2 = null;
    // this code
    getUser2 = (id) => {
        return Promise.resolve({ name: "Asimov" });
    };

    // is same with this code
    getUser2 = (id) => {
        return new Promise((resolve, reject) => {
            resolve({name: "Asimov"});
        });
    };

    // which used like this
    getUser2(1).then((user) => {
        // code
    });
})();

// Promise.all will run many promises
// at (technically) same time
// Technically, promise.all merge many promises into one flow
let getUserWithCountry = Promise.all([
    getCountry(), // countries first
    getUser(1)
]).then((results) => {
    // countries at first result
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