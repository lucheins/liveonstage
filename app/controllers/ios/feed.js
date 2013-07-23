/*var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);*/
var activeTab = arguments[0] || {};
var categoryId = 0;
var data = require('dataExport');
var categories = Ti.UI.createTableView();
var live = Ti.UI.createTableView();
var campaigns = Ti.UI.createScrollView({
			width:"100%",
			height:"100%",
			contentWidth:"auto",
			contentHeight:"auto",
			top:0,
			left:0
		})
var upcomming = Ti.UI.createTableView();
var artists = Ti.UI.createTableView();

if (activeTab == 1){
	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
}

if (activeTab == 2){
	data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
if (activeTab == 3){
		data.getListItems($.activity, upcomming,0,0,categoryId,0,0,'Events');
	}
if (activeTab == 4){
		data.getDataLists($.activity, artists,0,0,'Artists',categoryId);
	}

$.videosScreen.add(live);
$.categoriesScreen.add(categories);
$.campaignsScreen.add(campaigns);
$.upcomingScreen.add(upcomming);
$.artistsScreen.add(artists);



$.feedWin.open();


$.scrollableView.currentPage = activeTab;
var osname = Ti.Platform.osname,
     height = Ti.Platform.displayCaps.platformHeight,
     width = Ti.Platform.displayCaps.platformWidth;     
     scrollunit = width/5;     

    var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
   
    if (isTablet) {
       $.NavContainer.width = width;
       $.barContainer.width = '100%';
       $.topNav.setScrollingEnabled = false;       
    } else {    	
    	$.topNav.scrollTo(60 , 0);	
    };
    
    var cualquiera = $.NavContainer.width - width;
    scrollunit = scrollunit + (cualquiera/5);   
    $.menuBar.scrollTo(-scrollunit * activeTab, 0);
    
    


$.categories.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(0);
  	
  	
});
$.videos.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(1);
  	
});
$.campaigns.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(2);
  	
});
$.upcoming.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(3);
  	
});
$.artists.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(4);
});


$.scrollableView.addEventListener("scroll", function(e){
	var topScroll = 0;
	if (!isTablet) {	
		if ($.scrollableView.currentPage == 1){
			topScroll = 60;
		};
		if ($.scrollableView.currentPage == 2){
			topScroll = 160;
		};
		if ($.scrollableView.currentPage == 3){
			topScroll = 180;
		};
		if ($.scrollableView.currentPage != 4){
			$.topNav.scrollTo(topScroll , 0);
		};
	} 
	$.menuBar.scrollTo(-scrollunit * $.scrollableView.currentPage , 0);
});


$.scrollableView.addEventListener("scrollend", function(e){
	
	if(($.scrollableView.currentPage == 0) && (categories.data.length == 0))
	{
		data.getCategories($.activity, categories);
	}
	
	if(($.scrollableView.currentPage == 1) && (live.data.length == 0))
	{
		data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
	}
    
   if(($.scrollableView.currentPage == 2))
	{
		data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
    
    if(($.scrollableView.currentPage == 3) && (upcomming.data.length == 0))
	{
		data.getListItems($.activity, upcomming,0,0,categoryId,0,0,'Events');
	}

	if(($.scrollableView.currentPage == 4) && (artists.data.length == 0))
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
	
	live.setData([]);
	//campaigns.setData([]);
	campaigns.removeAllChildren();
	upcomming.setData([]);
	artists.setData([]);
	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
	$.scrollableView.scrollToView(1);	
}

live.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var win = Alloy.createController('viewVideo', e.source.link).getView();
		    win.open(
		    	//ANIMAR????????
		    );			
		}		
	});

upcomming.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var win = Alloy.createController('viewEvent', e.source.link).getView();			
			//$.feedWin.add(win);
			win.open(
				//ANIMAR????????
			);									
		}		
	});