var Observable = require("FuseJS/Observable")
var data = require("SampleData").data
var log = require("Utils").log
var Perfuse = require("Perfuse")

var items = Perfuse.makeObservable(data);

var changeFirstName = function(object) {
    var item = object.data;
    log("observable", item)
}

module.exports = {
    items: items,
    changeFirstName
}
