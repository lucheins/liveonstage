var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);
var module = require('net.bajawa.pager');

var data = require('dataExport');
var table = Ti.UI.createTableView()
var categories1 = data.getCategories($.activity, table);

var dummyTableData = (function () {
		var a = [];
		for (var i=0; i < 100; i++) a.push({ title: "I am item " + i });
		return a;
	}());
	
var pagerDataScrolling = [
		{ title: "Categories",	view: table },
		{ title: "Live Shows",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Campaigns",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Upcomming",	view: Ti.UI.createTableView({ data: dummyTableData }) },
		{ title: "Artist",	view: Ti.UI.createTableView({ data: dummyTableData }) }		
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




