var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);
var module = require('net.bajawa.pager');
var categoryId = 0;
var data = require('dataExport');
var categories = Ti.UI.createTableView();
var live = Ti.UI.createTableView();
var campaigns = Ti.UI.createTableView();
var upcomming = Ti.UI.createTableView();
var artists = Ti.UI.createTableView();
data.getDataLists($.activity, live,0,0,'Videos',0);


var pagerDataScrolling = [
		{ title: "Categories",	view: categories },
		{ title: "Live Shows",	view: live },
		{ title: "Campaigns",	view: campaigns },
		{ title: "Upcomming",	view: upcomming },
		{ title: "Artist",		view: artists }		
	];
	
var viewPager = module.createViewPager(
 {
	data: pagerDataScrolling,
	initialPage: 1,
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

viewPager.addEventListener("pageChange", function (e) 
{
	if((e.to == 0) && (categories.data.length == 0))
	{
		data.getCategories($.activity, categories);
	}
    
   if((e.to == 2) && (campaigns.data.length == 0))
	{
		data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
    
    if((e.to == 3) && (upcomming.data.length == 0))
	{
		data.getDataEvents($.activity, upcomming,0,0,0,categoryId);
	}

	if((e.to == 4) && (artists.data.length == 0))
	{
		data.getDataLists($.activity, artists,0,0,'Artists',categoryId);
	}
});


categories.addEventListener('click', function(e){
		
		var title = 'Categories';
		if(e.source.link > 0)
		{
			title = e.source.text
		}		
		resetInitPage(e.source.link, title);
	});

function resetInitPage(catId, title)
{
	categoryId = catId;
	actionBar.title = title;
	live.setData([]);
	campaigns.setData([]);
	upcomming.setData([]);
	artists.setData([]);
	data.getDataLists($.activity, live,0,0,'Videos',categoryId);
	viewPager.scrollTo(1);	
}
