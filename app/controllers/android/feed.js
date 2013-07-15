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
		style: module.SCROLLING,
		backgroundColor: "#ffffff",
		backgroundColorSelected: "#f2f2f2",
		lineColor: "#e4473e",
		lineColorSelected: "#e4473e",
		lineHeight: 2,
		lineHeightSelected: 7,
		font: {
			size: 16,
			color: "#000000",
			colorSelected: "#000000"
			},
		padding: {
			left: 20,
			top: 12,
			right: 20,
			bottom: 12
			},
		}
	}		
);

var actionBar;

$.feedWin.addEventListener("open", function() {
    
        if (! $.feedWin.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.feedWin.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Categories";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    Ti.API.info("Home icon clicked!");
                };
            }
        }
    
});
	

$.feedWin.add(viewPager);
$.feedWin.open();




