
$.bottomModal.addEventListener('click',function(){
	
	var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
	var band = 0;	    
	if($.description.value!= '')
	{
		if (filter.test($.description.value))  
		{ 
			band = band + 1;  
		} else {
				alert("Please enter a valid video description");  
			}
	} else {  
        alert("Video description is required");  
    } 
    
    if ($.videoName.value != '')  
    {  		
		if (filter.test($.videoName.value))  
		{  
		   band = band + 1;  
		} else {
			alert("Please enter a valid video name");  
		}
	}else  
    {  
        alert("Video name is required");  
    } 
    
    if(band == 2)
    {
    	var args = {       		
				event_id: 0,
				live_video: 1,
				title: $.videoName.value,
				description: $.description.value
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
    }
	
});
