var Observable = require("FuseJS/Observable")
var data = require("SampleData").data
var easyData = require("SampleData").easyData
var log = require("Utils").log
var Perfuse = require("Perfuse")

var items = Perfuse.makeObservable(data);
log("items", items);

var changeFirstName = function(object) {
    var item = object.data;
    log("observable", item)
    var persi = Perfuse.makePersistable(item);
    log("persistable", persi)
}

var foo = {
    array: Observable([2,3,4]),
    obs: Observable({
        test: Observable({
            prop1: 2,
            prop2: "qwe"
        })
    }),
    strArray: ["qwe", "werw2", "asda"],
    objArray: [{
        prop1: 2
    }, {
        prop1: 3,
        prop2: "Peter"
    }]
};

// log("foo", foo)
// var bar = Perfuse.makeObservable(foo);
// log("bar", bar);
// var foo2 = Perfuse.makePersistable(bar);
// log("foo2", foo2);

module.exports = {
    items: items,
    changeFirstName
}
