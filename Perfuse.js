/**

    Version: 0.1

**/

var Observable = require("FuseJS/Observable")
var log = require("Utils").log;
var _ = require("lodash");

var getType = function(elem) {
    return Object.prototype.toString.call(elem).slice(8, -1);
};

var isObject = function(elem) {
    return getType(elem) === 'Object';
};

var Perfuse = {
    makeObservable: function(obj) {
        // Nothing todo here
        if (obj instanceof Observable) {
            return obj;
        }

        // lets get the ignored properties
        var ignored = obj._ignore;

        // if we get an array make it and all its items observable
        if (obj instanceof Array) {
            var arr = Observable();

            for (var i = 0; i < obj.length; i++) {
                arr.add(this.makeObservable(obj[i]));
            }

            return arr;
        }

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                // lets ignore private stuff
                if (property.charAt(0) == '_') {
                    continue;
                }

                // Nothing todo here
                if (obj[property] instanceof Observable) {
                    continue;
                }

                // if the property is ignored... ignore it
                if (ignored != null && ignored.indexOf(property) !== -1) {
                    continue;
                }

                if (obj[property] instanceof Array) {
                    obj[property] = this.makeObservable(obj[property])
                    continue;
                }

                if (isObject(obj[property])) {
                    obj[property] = Observable(this.makeObservable(obj[property]));
                    continue;
                }

                obj[property] = Observable(obj[property])
            }
        }

        return obj;
    },

    makePersistable: function(obj) {
        if (_.has(obj, "_isLeaf")) {
            // is it an observable list
            // get values and then go over all elements --> makePersistable
            if (obj._values.length > 1) {
                var unpackedArray = _.clone(obj._values);
                for (var i = 0; i < unpackedArray.length; i++) {
                    unpackedArray[i] = this.makePersistable(unpackedArray[i]);
                }
                return unpackedArray;
            }
            // is it an observable
            // get value and then go over all properties --> makePersistable
            else {
                var unpackedObj = obj.value;
                for (var prop in unpackedObj) {
                    if (unpackedObj.hasOwnProperty(prop)) {
                        unpackedObj[prop] = this.makePersistable(unpackedObj[prop]);
                    }
                }
                return unpackedObj;
            }
        } else if (obj instanceof Array) {
            // is it a normal Array
            // go over all elements --> makePersistable
            var clonedArray = _.clone(obj);
            for (var i = 0; i < clonedArray.length; i++) {
                clonedArray[i] = this.makePersistable(clonedArray[i]);
            }
            return clonedArray;
        } else if (isObject(obj)) {
            // is it a normal object
            // go over all properties --> makePersistable
            var clonedObj = _.clone(obj)
            for (var prop in clonedObj) {
                if (clonedObj.hasOwnProperty(prop)) {
                    clonedObj[prop] = this.makePersistable(clonedObj[prop]);
                }
            }
            return clonedObj;
        } else {
            // is it a value type? --> return value
            // return value
            var clonedObj = _.clone(obj);
            return clonedObj;
        }
    }
}

module.exports = Perfuse;
