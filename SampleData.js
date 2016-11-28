var data = [{
    "_ignore": ["array"],
    "id": 1,
    "first_name": "FRANZ",
    "last_name": "Spencer",
    "array": [{
        "_ignore": ["name"],
        "name": "Quo Lux",
        "date": "11/18/2016"
    }, {
        "_ignore": ["date"],
        "name": "Vagram",
        "date": "8/13/2016"
    }],
    "complex": {
        "_ignore": ["ignored"],
        "test": "asdasd",
        "ignored": true
    }
}]

var easyData = {
    "name": "ASDASD",
    "age": 23
}

module.exports = {
    data,
    easyData
}
