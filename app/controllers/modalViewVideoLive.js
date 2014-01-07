
$.bottomModal.addEventListener('click',function(){
	
	if ($.videoName.value != '')  
    {  		
		var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;  
		if (filter.test($.videoName.value))  
		{  
		     var args = {       		
				event_id: 0,
				live_video: 1,
				title: $.videoName.value
			};        	
		   		
			var win = Alloy.createController('camera',args).getView();	
			if(Ti.Platform.osname == 'android')
			{
				win.fullscreen= true;
				win.open({
						activityEnterAnimation: Ti.Android.R.anim.fade_in,
						activityExitAnimation: Ti.Android.R.anim.fade_out
				});	
			} else {
						win.orientationModes = [ Titanium.UI.LANDSCAPE_RIGHT ];
						var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
						win.open({transition:t});
			}
			$.modal.close();
		} else {
			alert("Please enter a valid video name");  
		}
	}else  
    {  
        alert("Video name is required");  
    } 
	    
	
	
});
