exports.getDataEvents=function(offsetHome, pageHome,campaigns,category)
{
	
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