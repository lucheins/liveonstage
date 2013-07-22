exports.getCampaigns=function(activity, table,offsetHome, pageHome, category)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var band = true;
		for (var i=0; i < responses.length; i++) {	
				var link = responses[i].id;
		        var args = {
	        			name: responses[i].title,	        			
	        			link: link,
	        			image: responses[i].image_video,
	        			id: responses[i].campaign,
	        			received:  responses[i].received,
	        			row: i,
	        			isOdd: i%2
	      		};
		        var row = Alloy.createController('tileCampaigns',args).getView(); 
		        	        
				table.add(row);	 	
			 }
	     //   table.setData(tableData);
	        activity.hide(); 
		};

	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: 'Campaigns',
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category       
    };
	client.send(params);
}


exports.getListItems=function(activity, table,offsetHome, pageHome, category, author, item_id, name)
{
	var index = table.getIndexByName('rowMore');
	if(index > 0)
	{
		table.deleteRow(index);
	}	
	var tableData = table.getData();
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};
	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var more = false;
		for (var i=0; i < responses.length; i++) {	
		        if(responses[i].title != 'more')
		        {
		        	 var args = {
	        			name: responses[i].name,	        			
	        			link: responses[i].id,
	        			isOdd: i%2,
	        			page: name,
	        			title: responses[i].title,	        			
	        			message: responses[i].message,
	        			image: responses[i].image	        			
		      		};
			        var row = Alloy.createController('rowListItems',args).getView(); 	
		        } else {
		        	var row = Alloy.createController('rowMore').getView();
		        	more = true;
		        }		        
				tableData.push(row);		 	
			 }
			 if(tableData.length == 0)
			 {
			 	var row = Alloy.createController('rowEmpty').getView();	
			 	tableData.push(row);
			 }
	        table.setData(tableData);
	        activity.hide(); 
	      	if(more)
			{
				row.addEventListener('click', function(){
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;		
				exports.getListItems(activity, table,offset,pageHome,category,name);
				});
			}  
		};

	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category,
        author: author,
        item_id: item_id       
    };
	client.send(params);  
}












exports.getDataEvents=function(activity,table,offsetHome, pageHome,campaigns,category)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
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
		table.setData([]);
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
		table.setData(tableData);	
		activity.hide();		
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category,
        campaigns: campaigns,
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: 'Events'
    };
	client.send(params);	

	table.addEventListener('click', function(e)
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

exports.getCategories=function(activity, table)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CATEGORIES;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){

		var responses = JSON.parse(this.responseText);

		var band = true;
		for (var i=0; i < responses.length; i++) {	
				var link = responses[i].id;

		        var args = {
	        			name: responses[i].name,	        			
	        			link: link,
	        			
	      		};
		        var row = Alloy.createController('rowCategories',args).getView(); 	
		        
				tableData.push(row);		 	
			 }
	        table.setData(tableData);
	        activity.hide(); 
		};

	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString()       
    };
	client.send(params);
}

exports.getDataLists=function(activity, table,offsetHome, pageHome, name, category)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){

		var responses = JSON.parse(this.responseText);

		var band = true;
		for (var i=0; i < responses.length; i++) {	
				var link = responses[i].id;

		        var args = {
	        			name: responses[i].name,	        			
	        			link: link,
	        			isOdd: i%2,
	      		};
		        var row = Alloy.createController('rowCategories',args).getView(); 	
		        
				tableData.push(row);		 	
			 }
	        table.setData(tableData);
	        activity.hide(); 
		};

	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category       
    };
	client.send(params);
}