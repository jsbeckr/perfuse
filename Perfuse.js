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
        if (_.has(obj, "_isLeaf")) {
            // list of observables
            // get all values --> makeObservable
            if (obj._values.length > 1) {
                var unpackedArray = obj._values;
                for (var i = 0; i < unpackedArray.length; i++) {
                    if (isObject(unpackedArray[i])) {
                        unpackedArray[i] = this.makeObservable(unpackedArray[i]);
                    }
                }
                return Observable(unpackedArray);
            }
            // simple observable
            // .value --> makeObservable pro
            else {
                var unpackedObj = obj.value;

                // Special case if the unpacked value is an array
                // --> mimic Observable behavior
                if (unpackedObj instanceof Array) {
                    for (var i = 0; i < unpackedObj.length; i++) {
                        // if array element is an object --> make it observable
                        if (isObject(unpackedObj[i])) {
                            unpackedObj[i] = this.makeObservable(unpackedObj[i]);
                        }
                    }
                    return Observable(unpackedObj);
                }

                for (var prop in unpackedObj) {
                    if (unpackedObj.hasOwnProperty(prop)) {
                        // let's ignore private stuff
                        if (prop.charAt(0) === "_") {
                            continue;
                        }

                        unpackedObj[prop] = this.makeObservable(unpackedObj[prop]);
                    }
                }
                return Observable(unpackedObj);
            }
        } else if (obj instanceof Array) {
            // array
            // clone array --> makeObservable foreach
            var clonedArr = _.clone(obj);
            for (var i = 0; i < clonedArr.length; i++) {
                // if array element is an object --> make it observable
                if (isObject(clonedArr[i])) {
                    clonedArr[i] = this.makeObservable(clonedArr[i]);
                }
            }
            var dummyObservable = Observable();
             dummyObservable.addAll(clonedArr);
            return dummyObservable;
        } else if (isObject(obj)) {
            // simple object
            // clone object --> makeObservable foreach property
            var clonedObj = _.clone(obj);
            for (var prop in clonedObj) {
                if (clonedObj.hasOwnProperty(prop)) {
                    // let's ignore private stuff
                    if (prop.charAt(0) === "_") {
                        continue;
                    }

                    clonedObj[prop] = this.makeObservable(clonedObj[prop]);
                }
            }
            return Observable(clonedObj);
        } else {
            // simple value Observable(obj)
            return Observable(obj);
        }
    },

    makePersistable: function(obj) {
        if (_.has(obj, "_isLeaf")) {
            // is it an observable list
            // get values and then go over all elements --> makePersistable
            if (obj._values.length > 1) {
                var unpackedArray = obj._values;
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
