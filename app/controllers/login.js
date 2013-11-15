var id = arguments[0] || {};
if (Ti.Platform.osname == 'android'){
var actionBar;
$.login.addEventListener("open", function() {
    
        if (! $.login.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.login.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Login";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
				
				var win = Alloy.createController('viewEvent', id).getView();		
				win.fullscreen= false;	
				if(Ti.Platform.osname == 'android')
				{
					win.open({
					        activityEnterAnimation: Ti.Android.R.anim.fade_in,
					        activityExitAnimation: Ti.Android.R.anim.fade_out
					    });	
				} else {
					var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
					win.open({transition:t});
				}	
				$.login.close();
                };
            }
        }   
});
}
else {	
	$.container.top = '9%';
	$.container.height = '91%';	
var args = {
	ventana: $.login,
	title: "Login"       			
	};
	      		
var win = Alloy.createController('actionbarIos',args).getView();
$.login.add(win);
}

function checkdata(value)  
	{  
	    var testresults = false;  
	    var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;  
	    if (filter.test(value))  
	    {  
	        testresults = true;  
	    }  
	     
	    return (testresults);  
	};

$.buttonLogin.addEventListener('click',function(e) {
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_LOGIN;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		if (response.id > 0)  
	    {  
	        alert("Welcome " + response.name + ".");  
	        $.username.blur();  
        	$.password.blur();  
        	Ti.App.Properties.setString('user_id', response.id);	  
        	Ti.App.Properties.setString('username', response.username);	
        	var win = Alloy.createController('viewEvent', id).getView();		
				win.fullscreen= false;	
				if(Ti.Platform.osname == 'android')
				{
					win.open({
					        activityEnterAnimation: Ti.Android.R.anim.fade_in,
					        activityExitAnimation: Ti.Android.R.anim.fade_out
					    });	
				} else {
					var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
					win.open({transition:t});
				}	       	   
	        $.login.close();
	    }  
	    else  
	    {  
	        alert('Failed credentials');  
		}; 
		$.activity.hide(); 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
	
	if ($.username.value != '' && $.password.value != '')  
    {  
    	if (!checkdata($.username.value))  
        {  
             alert("Please enter a valid username");  
        } else  
        {  
	        if (!checkdata($.password.value))  
	        {  
	             alert("Please enter a valid password");  
	        } else
        	{
        		var user1 = Ti.Utils.base64encode($.username.value + '-' + $.password.value) ;
        		var params = {
				    tc: Alloy.Globals.USER_MOBILE.toString(),
				    u:  user1.toString()
				};
				client.send(params);       
		    }
	    } 
    }  
    else  
    {  
        alert("Username/Password are required");  
    } 
		
});


