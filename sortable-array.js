/**
 * SortableArray class.
 *
 * Sort array of object by their properties
 *
 *@author: Gaëtan Démurger
 * Base on Tryptich answer to this question: http://stackoverflow.com/a/979325/291541
 *
 */

/**
 * Enum sort_mode
 */
var SORT_MODE = Object.freeze({
    "STRING": 0,
	"INT": 1,
	"FLOAT": 2,
	"DATE": 3,
	"BOOL": 4,
	"FILE_EXTENSION": 5
});

/**
 * Array with sort functions
 */
var SortableArray = (function () {

    // Ignore warning: not an array instanciation but a copy of Array prototype into SortableArray's
    SortableArray.prototype = new Array();

    /**
     * Construct a sortable array
     * @constructor
     */
    function SortableArray() {}


    /**
     * Private function used by the array.sort function to easily
     * sort an array of objects.
     * @param field
     * @param reverse
     * @param {function=} primer
     * @returns {Function}
     */
    function sort_by(field, reverse, primer) {

        var key = function (x) {
            return primer ? primer(x[field]) : x[field]
        };

        return function (a, b) {
            var A = key(a),
                B = key(b);
            return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1, 1][+ !! reverse];
        }
    }

    /**
     * Sort the array by his properties
     * @param name string name of the object properties to sort
     * @param mode SORT_MODE type of sort (int, string, file extension,date,float)
     * @param asc bool|undefined true for ascending, false for descending
     */
    SortableArray.prototype.sortByProperties = function (name, mode, asc) {
        asc = (typeof asc === "undefined") ? true : asc;
        switch (mode) {
            case SORT_MODE.INT:
                this.sort(sort_by(name, asc, parseInt));
                break;
			case SORT_MODE.FLOAT:
                this.sort(sort_by(name, asc, parseFloat));
                break;
            case SORT_MODE.FILE_EXTENSION:
                this.sort(sort_by(name, asc, function (a) {
					if(typeof a === "undefined") return "";
                    var parts = a.toLowerCase().split(".");
                    a = parts[(parts.length - 1)];
                    return a.removeDiacritics().toUpperCase()
                }));
                break;
            case SORT_MODE.STRING:
                this.sort(sort_by(name, asc, function (a) {
					if(typeof a === "undefined") return "";
                    return a.removeDiacritics().toUpperCase()
                }));
                break;
			case SORT_MODE.DATE:
				this.sort(sort_by(name, asc, function (a) {
					if(typeof a === "undefined") return 0;
                    if(a instanceof Date)
						return a.getTime();
					else
						return parseInt(a);
                }));
				break;
			case SORT_MODE.BOOL:
				this.sort(sort_by(name, asc, function(a){
					if(typeof a === "undefined") return "";
					return a.toString();
					}));
				break;
            default:
                this.sort(sort_by(name, asc));
                break;
        }
        return this;
    };

    /**
     * Remove elements by property name
     * @param name string name of the property to test
     * @param value string value to delete
     */
    SortableArray.prototype.removeByProperties = function (name, value) {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i][name] == value) this.splice(i, 1);
        }
        return this;
    };

    /**
     * Clear the array
     */
    SortableArray.prototype.clear = function () {
        while (this.length > 0) {
            this.pop();
        }
        return this;
    };

    return SortableArray;
})();


/**
 * Replace diacritics from a string
 * @returns {*}
 */
String.prototype.removeDiacritics = function () {
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
    /[\310-\313]/g, /[\350-\353]/g, // E, e
    /[\314-\317]/g, /[\354-\357]/g, // I, i
    /[\322-\330]/g, /[\362-\370]/g, // O, o
    /[\331-\334]/g, /[\371-\374]/g, // U, u
    /[\321]/g, /[\361]/g, // N, n
    /[\307]/g, /[\347]/g // C, c
    ];
    var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    var str = this;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
};


