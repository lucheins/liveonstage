var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);
var module = require('net.bajawa.pager');

var data = require('dataExport');
var table = Ti.UI.createTableView();
var table1 = Ti.UI.createTableView();
var table2 = Ti.UI.createTableView();
var table3 = Ti.UI.createTableView();
var table4 = Ti.UI.createTableView();
data.getCategories($.activity, table);
data.getDataEvents($.activity, table1,0,0,0,0);
data.getDataEvents($.activity, table2,0,0,1,0);
data.getDataLists($.activity, table3,0,0,'Videos',0);
data.getDataLists($.activity, table4,0,0,'Artists',0);

var dummyTableData = (function () {
		var a = [];
		for (var i=0; i < 100; i++) a.push({ title: "I am item " + i });
		return a;
	}());
	
var pagerDataScrolling = [
		{ title: "Categories",	view: table },
		{ title: "Live Shows",	view: table3 },
		{ title: "Campaigns",	view: table2 },
		{ title: "Upcomming",	view: table1 },
		{ title: "Artist",		view: table4 }		
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




