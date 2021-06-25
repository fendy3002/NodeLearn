let host = "http://example.com:3999";


let path1 = "/path/1/";
let path2 = "./path2/2";
console.log(
    new URL(path2,
        new URL(path1, host).href
    ).href
);

path1 = "/path/1";
path2 = "./path2/2";
console.log(
    new URL(path2,
        new URL(path1, host).href
    ).href
);

path1 = "/path/1/";
path2 = "/path2/2";
console.log(
    new URL(path2,
        new URL(path1, host).href
    ).href
);


path1 = "/path/1/";
path2 = "path2/2";
console.log(
    new URL(path2,
        new URL(path1, host).href
    ).href
);