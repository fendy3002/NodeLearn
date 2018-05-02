let initialData = {
    "one": "1",
    "two": "2",
    "three": "3"
};
 
// the syntax below
let copyBySpread = {...initialData};

// is functioning like below
let copyManual = {
    "one": initialData.one,
    "two": initialData.two,
    "three": initialData.three
};

// or if we want to do it without knowing the content beforehand
let copyAuto = {};
Object.keys(initialData).forEach(function(key) {
    copyAuto[key] = initialData[key];
});

// or in ES5 there are a utility for that
let copyAuto2 = Object.assign({}, initialData);

// which is useful to shallow copy object and prevent mutability