// getting data in other language
let getUser = (id) => {
    return {
        "name": "",
        "country": "id",
        "address" : ""
    };
};
let getCountry = () => {
    return [{
        code: "id",
        name: "Indonesia"
    }];
};

(function(){
    // usage
    let user = getUser(1);
    let countries = getCountry();
    user.country = countries[0];
    console.log("Get user in other language", user);
})()

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


let getBranch = (user) => {
    return {
        "id": "01"
    };
};
let getBranchFromIndonesia = (user) => {
    return {
        "id": "02"
    };
};

let getBranchNode = (user, callback) => {
    callback({
        "id": "01"
    });
};
let getBranchFromIndonesiaNode = (user, callback) => {
    callback({
        "id": "02"
    });
};

// handling logic
(function(){
    let user = getUser(1);
    if(user.country == "id"){
    user.branch = getBranchFromIndonesia(user);
    }
    else{
    user.branch = getBranch(user);
    }
    // continue the logic
})();

// handling logic async
getUserNode(1, (user) => {
    if(user.country == "id"){
        getBranchFromIndonesiaNode(user, (branch) => {
            user.branch = branch;
            // continue logic
        });
    }
    else{
        getBranchNode(user, (branch) => {
            user.branch = branch;
            // continue logic? doubled
        });
    }
    // can't continue from here
});