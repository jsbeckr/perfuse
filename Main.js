var Observable = require("FuseJS/Observable")
var data = require("SampleData").data
var easyData = require("SampleData").easyData
var log = require("Utils").log
var Perfuse = require("Perfuse")

var items = Perfuse.makeObservable(data);

// var foo = Perfuse.makeObservable(easyData);
// log("easyData obs", foo);
// var bar = Perfuse.makePersistable(foo);
// log("easyData pers", bar);

var changeFirstName = function(object) {
    var item = object.data;
    log("observable", item)
    var persi = Perfuse.makePersistable(item);
    persi.array.push("CLONE TEST");
    log("persistable", persi)
    log("observable", item)
}

var foo = {
    asd: 2,
    das: Observable(3),
    test: Observable({
        name: Observable("asdasd")
    }),
    array: [2,5,4,2],
    obsArray: Observable("test","LDAS", Observable("dfasd"))
}
log("FOO", foo);
var bar = Perfuse.makePersistable(foo);
log("bar", bar);

module.exports = {
    items: items,
    changeFirstName
}
