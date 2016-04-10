/**
 * Created by luke on 4/8/16.
 * global.js
 */
var global = {}
var MOD = {}


function create(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = create(obj[key]);
    }

    return temp;
}
