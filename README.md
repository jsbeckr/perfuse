# Perfuse

Having a JavaScript object or an array of objects and turning them into Fuse observables is a tedious job. Especially when it comes to unwrap an observable and getting a plain JavaScript object back, which you can then persist or use in a REST call.

Maybe Perfuse can help you with that!

## Installation

Not much of a installation routing right now. Just clone the repo and copy the `Perfuse.js` to your project.

**Don't forget to add all .js files to your bundle** 

```javascript
{
  "RootNamespace":"",
  "Packages": [
  	"Fuse",
  	"FuseJS"
  ],
  "Includes": [
    "*",
    "**.js:Bundle"
  ]
}
```

## Usage

### Perfuse.makeObservable(thing)

Makes a JavaScript object *or* an array of objects completely observable.

```javascript
var Perfuse = require("Perfuse");

var items = Perfuse.makeObservable(thing);
```

### Perfuse.makePersistable(thing)

Converts an observable JavaScript object *or* array back to a plain object.

```javascript
var Perfuse = require("Perfuse");

var thing = Perfuse.makePersistable(items);
```

### Ignoring Properties

You can also ignore certain properties. Just put an array of ignored property names in the object you want to make observable. The array has to be called `_ignored`. You can declare different ignored properties for different objects in an array.

An example is shown in the next section.

## Example

**Sample Data**

```javascript
{
    "_ignore": ["last_name"],
    "id": 1,
    "first_name": "PETER",
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
}
```

**Turn into a fully observable object**

```javascript
var Perfuse = require("Perfuse");

var items = Perfuse.makeObservable(data);
```

**Resulting object**

```javascript
{
    "_ignore": [
        "last_name"
    ],
    "id": {
        "_subscribers": [
            null
        ],
        "_isLeaf": true,
        "_values": [
            1
        ]
    },
    "first_name": {
        "_subscribers": [
            null
        ],
        "_isLeaf": true,
        "_values": [
            "FRITZ"
        ]
    },
    "last_name": "Spencer",
    "array": {
        "_subscribers": [
            null
        ],
        "_isLeaf": true,
        "_values": [{
            "_ignore": [
                "name"
            ],
            "name": "Quo Lux",
            "date": {
                "_subscribers": [
                    null
                ],
                "_isLeaf": true,
                "_values": [
                    "11/18/2016"
                ]
            }
        }, {
            "_ignore": [
                "date"
            ],
            "name": {
                "_subscribers": [
                    null
                ],
                "_isLeaf": true,
                "_values": [
                    "Vagram"
                ]
            },
            "date": "8/13/2016"
        }]
    },
    "complex": {
        "_subscribers": [
            null
        ],
        "_isLeaf": true,
        "_values": [{
            "_ignore": [
                "ignored"
            ],
            "test": {
                "_subscribers": [
                    null
                ],
                "_isLeaf": true,
                "_values": [
                    "asdasd"
                ]
            },
            "ignored": true
        }]
    }
}
```

## Todos

- [ ] Tests :grin:
- [ ] Globally ignore properties (useful for arrays)
- [ ] Support for Observable functions
- [ ] Support Fuse Package Management once it is released