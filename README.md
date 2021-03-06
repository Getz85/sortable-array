Sortable-array
==============

Sortable-array.js offers advanced sorting method on javascript object's array.

##Installation

Just copy the sortable-array.js file into your project folder, and add this line into your html file:

`<script type='text/javascript' src='sortable-array.js'></script>`

If you use bower, you can get it this way:

`bower install sortable-array`

or add this dependency into your bower.json:

```
"dependencies":{
	"sortable-array": "latest"
  }
```

##How to use it

###Instantiation

You can instantiate it from an existing array.
```
var simpleArray = [{
	"name": "Second value",
	"value": 2,
},{
	"name": "First value",
	 "value": 1,
},
{
	"name": "Third value",
	 "value": 3,
}];
var sortableArray = new SortableArray(simpleArray);
```

Or create an empty one, and push, shift, pop or unshift values.
```
var sortableArray = new SortableArray();
sortableArray.push({
	"name": "Second value",
	"value": 2,
});
sortableArray.unshift({
	"name": "First value",
	 "value": 1,
});
```

###Sort array of object
Sort an array of object based on an object property.
```
var sortable = new SortableArray([{"value":2},{"value":3},{"value":1}]);
sortable.sortByProperties('value', SORT_MODE.INT, true);
```
`console.log(sortable)` wille give you `[{"value":1},{"value":2},{"value":3}]`

`sortByProperties` take 3 arguments:
* `property`: the name of the property used for sorting
* `sort_mode`: the sort type (see Sort mode below)
* `asc`: true for ascending, false for descending sort

###Sort mode
* SORT_MODE.STRING
* SORT_MODE.INT
* SORT_MODE.FLOAT
* SORT_MODE.DATE
* SORT_MODE.BOOL
* SORT_MODE.FILE_EXTENSION


###Sort simple array

As SortableArray is derivated from the Array prototype, you can use the Array.sort function (and all the others function of Array) to sort a simple array of primitive types (int, string).
```
var sortable = new SortableArray([9,4,7,3]);
sortable.sort();
```
`console.log(sortable)` will give you `[3,4,7,9]`

###Remove By Properties
Remove an element from the array by his property name
```
var sortableArray = new SortableArray();
sortableArray.push({
	"name": "Second value",
	"value": 2,
});
sortableArray.unshift({
	"name": "First value",
	 "value": 1,
});
sortable.removeByProperties("name", "First value");
```
`console.log(sortable)` will give you `[{"name": "Second value","value": 2,}]`

##Compatibility

SortableArray is only compatible with browsers supporting EcmaScript 5.
* **IE 9+**
* **Chrome 13+**
* **Firefox 4+**
* **Safari 5.1+**
* **Opera 12+**

##Contribute

I welcome and encourage community contributions!
The only requirement for pull requests: Unit tests must succeed. Don't create a pull request without testing it.
If you add a new feature, please provide some tests case in the file test/test.js.

Unit tests are based on [Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html)

