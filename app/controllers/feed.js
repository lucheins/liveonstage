 var osname = Ti.Platform.osname,
        version = Ti.Platform.version,
        height = Ti.Platform.displayCaps.platformHeight,
        width = Ti.Platform.displayCaps.platformWidth;

    var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
    
   
    if (isTablet) {
       $.NavContainer.width = '100%';
       $.topNav.scrollingEnabled = 'false';
     }
    
getDataFeed(0,0,0,0,0);

$.feedWin.open();
$.scrollableView.currentPage = 1;
if (!isTablet) {
$.topNav.scrollTo(60 , 0);
}
if(Ti.Platform.osname != 'android')
{
	$.barra.animate({ left: '20%', duration: 50 }, function () {
		$.barra.left = '20%'; 
	});	
}


function getDataFeed(offsetHome, pageHome,upcoming, live, campaigns)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_FEED;
	client.open('POST',url);
	client.ondatastream = function(e){
     	$.activity.show(); 
	};
	client.onload = function(){	
		var buttonMore = Ti.UI.createButton({
			title: 'View more..',
			width: '120dp',	
		});		
		var buttonBack = Ti.UI.createButton({
			title: 'Back Top',
			width: '120dp',					
		});	 
		var json = this.responseText;
		var responses = JSON.parse(json);
		$.data.setData([]);
		var band = true;
		for (var i=0; i < responses.length; i++) {			
			 
			 if (responses[i].title == 'more') 
			 {
			 	var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });				 	
				row.add(buttonMore); 
				band = false;
			 } else {
			 	
			 	var link = 'event_' + responses[i].id;
			 	var labelEnd = responses[i].confirmed;
			 	if(responses[i].video_id > 0)
			 	{
			 		link = 'video_' + responses[i].video_id;
			 		labelEnd = responses[i].watching;
			 	}
			 	 var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
		        if(responses[i].video_thumb != null)
		        {
		        	imageLink = responses[i].video_thumb;
		        } else {
		        	if(responses[i].thumb != null)
		        	{
		        		imageLink = Alloy.Globals.DOMAIN + responses[i].thumb;
		        	}
		        }

			 	var args = {
	        			title: responses[i].title,
	        			author: responses[i].name,
	        			date: responses[i].startdate,
	        			image: imageLink,
	        			guest: labelEnd,
	        			check_date: responses[i].check_date,
	        			link: link,
	        			id: responses[i].campaign,
	        			received:  responses[i].received
	      		};
	      		var row = Alloy.createController('rowFeed',args).getView(); 				 	
			 }
			      
	        tableData.push(row);
		};
		
		if ((band) && ((offsetHome > 0)||(i == 0)))
		{
			var row = Ti.UI.createTableViewRow({
				 	height: '50dp',
				 });			 	
			
			if (offsetHome > 0)
			{			
				row.add(buttonBack); 				
			} else {
				var text = Ti.UI.createLabel({
			        text: 'No Find Videos',
			        font:{
			             fontSize:'20dp',
			    	     },				        
				    color: "#717777",
				      });
				row.add(text);	
			}				
			tableData.push(row);
		}
		
	    buttonMore.addEventListener('click', function(){
			pageHome = pageHome + 1;
			var offset = pageHome * Alloy.Globals.LIMIT;
			table = getDataFeed(offset, pageHome, upcoming, live, campaigns);			
		});			
		buttonBack.addEventListener('click', function(){
					pageHome = 0;			
					table = getDataFeed(pageHome, pageHome, upcoming, live, campaigns);			
				}); 
		$.data.setData(tableData);	
		$.activity.hide();		
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        upcoming: upcoming,
        live: live,
        campaigns: campaigns,
        tc: Alloy.Globals.USER_MOBILE.toString(),
    };
	client.send(params);	
	
	$.data.addEventListener('click', function(e)
	{
		var link = e.source.link;
		var elements = link.split('_');
		var id = elements[1];
		if (elements[0] == 'event')
		{
			var win = Alloy.createController('viewEvent', id).getView();
		} else {
			var win = Alloy.createController('viewVideo', id).getView();
		}
		win.open();		
	});
};

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

	var convert = 1;
	if(Ti.Platform.osname == 'android')
	{
		convert = (Titanium.Platform.displayCaps.dpi / 160);
	}


	if ($.scrollableView.currentPage == 0){
			
		$.barra.animate({ left: '0%', duration: 50 }, function () {
			    $.barra.left = '0%'; 
			});
	if (!isTablet) {
       
		$.topNav.scrollTo(0 , 0);
	}
	};
	if ($.scrollableView.currentPage == 1){
		
		if ($.barra.left != '20%')
		{
			$.barra.animate({ left: '20%', duration: 50 }, function () {
			    $.barra.left = '20%'; 
			});
		};
		if (!isTablet) {
		$.topNav.scrollTo(60 * convert , 0);
		}
	};
	if ($.scrollableView.currentPage == 2){
		
		if ($.barra.left != '40%')
		{
			$.barra.animate({ left: '40%', duration: 50 }, function () {
			    $.barra.left = '40%'; 
			});
		};
		if (!isTablet) {
		$.topNav.scrollTo(160 * convert , 0);
		}
	};
	if ($.scrollableView.currentPage == 3){
		
		if ($.barra.left != '60%')
		{
			$.barra.animate({ left: '60%', duration: 50 }, function () {
			    $.barra.left = '60%'; 
			});
		};
		if (!isTablet) {
		$.topNav.scrollTo(180 * convert , 0);
		}
	};
	if ($.scrollableView.currentPage == 4){
		if ($.barra.left != '80%')
		{
			$.barra.animate({ left: '80%', duration: 50 }, function () {
			    $.barra.left = '80%'; 
			});
		}
	};
});