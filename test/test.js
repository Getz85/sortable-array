describe("SortableArray test", function() {
	var myArray = new SortableArray();
	
	beforeEach(function() {
		myArray.push({
		"name": "Second value",
		"value": 2,
		"filename": "Second.txt",
		"update_date": new Date(2014,3,12),
		"amount": 12.01,
		"common": 1
		});
		myArray.push({
			"name": "Third value",
			 "value": 3,
			"filename": "Third.doc",
			"update_date": new Date(2014,04,11),
			"amount" : 12.42,
			"grant": true,
			"common": 1
		});
		myArray.push({
			"name": "First value",
			 "value": 1,
			"filename": "First.test.pdf",
			"update_date": new Date(2014,04,10),
			"amount" : 12.005,
			"grant": false,
			"common": 1
		});
	});

	  afterEach(function() {
		myArray.clear();
	  });
	  
	  it("sort by string asc", function() {
		myArray.sortByProperties('name', SORT_MODE.STRING, true);
		expect(myArray[0]["value"]).toBe(1);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(3);
	  });
	  
	  it("sort by string desc", function() {
		myArray.sortByProperties('name', SORT_MODE.STRING, false);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(1);
	  });
	  
	  it("sort by int asc", function() {
		myArray.sortByProperties('value', SORT_MODE.INT, true);
		expect(myArray[0]["value"]).toBe(1);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(3);
	  });
	  
	  it("sort by int desc", function() {
		myArray.sortByProperties('value', SORT_MODE.INT, false);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(1);
	  });
	  	  
	  it("sort by date asc", function() {
		myArray.sortByProperties('update_date', SORT_MODE.DATE, true);
		expect(myArray[0]["value"]).toBe(2);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(3);
	  });
	  
	  it("sort by date desc", function() {
		myArray.sortByProperties('update_date', SORT_MODE.DATE, false);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(2);
	  });
	  
	  it("sort by float asc", function() {
		myArray.sortByProperties('amount', SORT_MODE.FLOAT, true);
		expect(myArray[0]["value"]).toBe(1);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(3);
	  });
	  
	  it("sort by float desc", function() {
		myArray.sortByProperties('amount', SORT_MODE.FLOAT, false);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(2);
		expect(myArray[2]["value"]).toBe(1);
	  });
	  
	  it("sort by bool with undefined value asc", function() {
		myArray.sortByProperties('grant', SORT_MODE.BOOL, true);
		expect(myArray[0]["value"]).toBe(2);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(3);
	  });
	  
	  it("sort by bool with undefined value desc", function() {
		myArray.sortByProperties('grant', SORT_MODE.BOOL, false);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(2);
	  });
	  
	  it("sort by file extension asc", function() {
		myArray.sortByProperties('filename', SORT_MODE.FILE_EXTENSION, true);
		expect(myArray[0]["value"]).toBe(3);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(2);
	  });
	  
	  it("sort by file extension desc", function() {
		myArray.sortByProperties('filename', SORT_MODE.FILE_EXTENSION, false);
		expect(myArray[0]["value"]).toBe(2);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(3);
	  });  
	  
	  it("sort by file extension with no extension", function() {
		myArray.push({
		"name": "Fourth value",
		"value": 2,
		"filename": "Fourth file",
		});
		myArray.sortByProperties('filename', SORT_MODE.FILE_EXTENSION, false);
		expect(myArray[0]["value"]).toBe(2);
		expect(myArray[1]["value"]).toBe(1);
		expect(myArray[2]["value"]).toBe(3);
	  });  
	  
	  it("clear", function(){
		expect(myArray.length).toBe(3);
		myArray.clear();
		expect(myArray.length).toBe(0);
	  });
	  
	  it("removeByProperties", function(){
		expect(myArray.length).toBe(3);
		myArray.removeByProperties("property unknown", "Not Found");
		expect(myArray.length).toBe(3);
		myArray.removeByProperties("name", "Not Found");
		expect(myArray.length).toBe(3);
		myArray.removeByProperties("name", "Third value");
		expect(myArray.length).toBe(2);
		expect(myArray[0]["value"]).toBe(2);
		expect(myArray[1]["value"]).toBe(1);
		myArray.removeByProperties("common", 1);
		expect(myArray.length).toBe(0);
	  });
	  
	  it("construct sortable array from antoher array", function(){
		var sortable = new SortableArray(myArray);
		expect(sortable.length).toBe(myArray.length);
		sortable.sortByProperties('value', SORT_MODE.INT, true);
		expect(sortable[0]["value"]).toBe(1);
		expect(sortable[1]["value"]).toBe(2);
		expect(sortable[2]["value"]).toBe(3);
	  });
	  
	  it("sort on simple array", function(){
		var sortable = new SortableArray([9,4,7,3]);
		sortable.sort();
		expect(sortable[0]).toBe(3);
		expect(sortable[1]).toBe(4);
		expect(sortable[2]).toBe(7);
		expect(sortable[3]).toBe(9);
	  });
	  
});

describe("RemoveDiacritics function test", function() {
	 it("diacritics correctly removed", function() {
		expect("Vàriûs vivérra donéc nosträ Èleîfend quisquè maùris süspendïssé nûllam vitaê fëlis imperdiét".removeDiacritics())
		.toBe("Varius viverra donec nostra Eleifend quisque mauris suspendisse nullam vitae felis imperdiet");

	  });
});