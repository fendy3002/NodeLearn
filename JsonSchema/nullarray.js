let Validator = require('jsonschema').Validator;
let v = new Validator();

let schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "birth": {
            'type': 'string',
            'format': 'date',
            'name': "Birth date"
        },
        "address": {
            "type": "object",
            "properties": {
                "lines": {
                    "type": "array",
                    "items": { "type": "string" }
                },
                "zip": { "type": "string" },
                "city": { "type": "string", "required": true },
                "country": { "type": "string" },
                "area": { "type": "string" }
            },
            "required": ["country"]
        },
        "votes": { "type": "integer", "minimum": 1 },
        "isWorkforce": { "type": "boolean" },
        "isVip": { "type": "boolean" }
    },
    "required": ["isWorkforce"]
};

console.log(v.validate({
    "name": "Barack Obama",
    "birth": "2010-01-01",
    "address": {
        "lines": ["1600 Pennsylvania Avenue Northwest"],
        "zip": "DC 20500",
        "city": "Washington",
        "country": "USA"
    },
    "votes": 1600,
    "isWorkforce": false
}, schema).errors);
console.log(v.validate({
    "name": "Barack Obama",
    "birth": "2010-01-01",
    "address": {
        "zip": "DC 20500",
        "city": "Washington",
        "country": "USA"
    },
    "votes": 1600,
    "isWorkforce": false
}, schema).errors);