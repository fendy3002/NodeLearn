let jsonpatch = require('fast-json-patch');
let assert = require('assert');

let caseNoDiff = async() => {
    let before = {
        "foo": "foo",
        "bar": "bar"
    };
    let after = {
        "foo": "foo",
        "bar": "bar"
    };
    let compared = jsonpatch.compare(before, after);
    assert.deepEqual([], compared);
}

let case1Field = async() => {
    let before = {
        "foo": "foo",
        "bar": "bar"
    };
    let after = {
        "foo": "foo",
        "bar": "bar2"
    };
    let compared = jsonpatch.compare(before, after);
    let newBefore = jsonpatch.applyPatch(before, compared);
    assert.equal(newBefore.newDocument.bar, after.bar);
    assert.equal(before.bar, after.bar);
};

let caseNestedField = async() => {
    let before = {
        "foo": "foo",
        "bar": {
            "val": "bar"
        }
    };
    let after = {
        "foo": "foo",
        "bar": {
            "val": "baz"
        }
    };
    let compared = jsonpatch.compare(before, after);
    let newBefore = jsonpatch.applyPatch(before, compared);
    assert.equal(newBefore.newDocument.bar.val, after.bar.val);
    assert.equal(before.bar.val, after.bar.val);
};
let caseReplaceField = async() => {
    let before = {
        "foo": "foo",
        "bar": {
            "val": "bar"
        }
    };
    let after = {
        "foo": "foo",
        "baz": {
            "val": "bar"
        }
    };
    let compared = jsonpatch.compare(before, after);
    let newBefore = jsonpatch.applyPatch(before, compared);
    assert.equal(before.baz.val, after.baz.val);
};
let caseArray = async() => {
    let before = {
        "foo": "foo",
        "bar": [
            {"key": "one"},
            {"key": "two"},
        ],
        "los": [
            "one",
            "two"
        ]
    };
    let after = {
        "foo": "foo",
        "bar": [
            {"key": "two"},
            {"key": "one"},
        ],
        "los": [
            "two",
            "one"
        ]
    };
    let compared = jsonpatch.compare(before, after);
    let newBefore = jsonpatch.applyPatch(before, compared);
    assert.equal(before.bar[0].key, after.bar[0].key);
};

caseNoDiff();
case1Field();
caseNestedField();
caseReplaceField();
caseArray();