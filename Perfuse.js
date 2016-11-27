var Observable = require("FuseJS/Observable")

var getType = function (elem) {
  return Object.prototype.toString.call(elem).slice(8, -1);
};

var isObject = function (elem) {
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
        if (obj instanceof Array) {
            var arr = [];

            for (var i = 0; i < obj.length; i++) {
                arr.push(this.makePersistable(obj[i]));
            }

            return arr;
        }

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Observable) {
                    if (obj[property].length <= 1) {
                        obj[property] = obj[property].value
                    } else {
                        // we have a list
                        var arr = [];
                        for (var i = 0; i < obj[property].length; i++) {
                            arr.push(this.makePersistable(obj[property].getAt(i)));
                        }

                        obj[property] = arr;
                    }
                }

                if (isObject(obj[property])) {
                    obj[property] = this.makePersistable(obj[property]);
                }
            }
        }

        return obj;
    }
}

module.exports = Perfuse;
