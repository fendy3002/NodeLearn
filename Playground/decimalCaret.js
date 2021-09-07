// value, selection, expected
let cases = [
    ["123,456,789", 0, 0], // 1
    ["123,456,789", 1, 1], // 2
    ["123,456,789", 2, 2], // 3
    ["123,456,789", 3, 3], // 4
    ["123,456,789", 4, 3], // 5
    ["123,456,789", 5, 4], // 6
    ["123,456,789", 6, 5], // 7
    ["123,456,789", 7, 6], // 8
    ["123,456,789", 8, 6], // 9
    ["123,456,789", 9, 7], // 10
    ["123,456,789", 10, 8], // 11
    ["123,456,789", 11, 9], // 12

    ["123,456,789.01", 0, 0], // 13
    ["123,456,789.01", 1, 1], // 14
    ["123,456,789.01", 2, 2], // 15
    ["123,456,789.01", 3, 3], // 16
    ["123,456,789.01", 4, 3], // 17
    ["123,456,789.01", 5, 4], // 18
    ["123,456,789.01", 6, 5], // 19
    ["123,456,789.01", 7, 6], // 20
    ["123,456,789.01", 8, 6], // 21
    ["123,456,789.01", 9, 7], // 22
    ["123,456,789.01", 10, 8], // 23
    ["123,456,789.01", 11, 9], // 24
    ["123,456,789.01", 12, 10], // 25
    ["123,456,789.01", 13, 11], // 26
    ["123,456,789.01", 14, 12], // 27

    ["23,456,789.01", 0, 0], // 28
    ["23,456,789.01", 1, 1], // 29
    ["23,456,789.01", 2, 2], // 30
    ["23,456,789.01", 3, 2], // 31
    ["23,456,789.01", 4, 3], // 32
    ["23,456,789.01", 5, 4], // 33
    ["23,456,789.01", 6, 5], // 34
    ["23,456,789.01", 7, 5], // 35
    ["23,456,789.01", 8, 6], // 36
    ["23,456,789.01", 9, 7], // 37
    ["23,456,789.01", 10, 8], // 38
    ["23,456,789.01", 11, 9], // 39
    ["23,456,789.01", 12, 10], // 40
    ["23,456,789.01", 13, 11], // 41

    ["0.01", 0, 0], // 42
    ["0.01", 1, 1], // 43
    ["0.01", 2, 2], // 44
    ["0.01", 3, 3], // 45
    ["0.01", 4, 4], // 46
];

const getSelectionIndexFromValue = (value, baseSelection) => {
    let decimalValue = "";
    let decimalIndex = value.indexOf(".");
    let selectionAfterDecimal = 0;
    let selectionBeforeDecimal = baseSelection;

    if (decimalIndex > -1) {
        decimalValue = value.substring(value.indexOf("."));
        selectionAfterDecimal = Math.max(baseSelection - decimalIndex, 0);
        selectionBeforeDecimal = baseSelection - selectionAfterDecimal;
    }

    let leadingDigit = (value.length - decimalValue.length) % 4;
    if (selectionBeforeDecimal < leadingDigit) { return selectionBeforeDecimal; }

    let separatorOccurance = Math.floor(((3 - leadingDigit) + selectionBeforeDecimal) / 4);
    return selectionBeforeDecimal - separatorOccurance + selectionAfterDecimal;
};

let index = 1;
for (let eachCase of cases) {
    let [value, baseSelection, expected] = eachCase;
    let actual = getSelectionIndexFromValue(value, baseSelection);
    if (expected != actual) {
        console.log(`Case ${index} expected: ${expected}, actual: ${actual}`)
    }
    index++;
}