var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);
var module = require('net.bajawa.pager');



var dummyTableData = (function () {
		var a = [];
		for (var i=0; i < 100; i++) a.push({ title: "I am item " + i });
		return a;
	}());
	
	var dummyTableData1 = (function () {
		var a = [];
		for (var i=0; i < 100; i++) a.push({ title: "you am item " + i });
		return a;
	}());

var pagerDataScrolling = [
		{ title: "First tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Second tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Third tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Fourth tab",	view: Ti.UI.createTableView({ data: dummyTableData1 }) },
		{ title: "Fifth tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Sixth tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Seventh tab",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Eight tab",	view: Ti.UI.createTableView({ data: dummyTableData }) }
	];

var viewPager = module.createViewPager(
 {
	data: pagerDataScrolling,
	tabs: {
		style: module.SCROLLING
		}
	}		
);

$.feedWin.add(viewPager);
$.feedWin.open();




