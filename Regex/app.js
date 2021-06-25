let regex = /\{(.*?)\.Name\}/g;
let string = "{sender.Name} asked for your approval for {summary}";
let result = regex.exec(string);
console.log(result);
regex.lastIndex = 0;
let result2 = string.matchAll(regex);

for (const match of result2) {
    console.log("match", match);
    console.log("match", match.index);
}
regex.lastIndex = 0;
let result3 = string.match(regex);
console.log(result3);