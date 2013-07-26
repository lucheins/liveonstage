var args = arguments[0] || {};
$.title.text = args.name || '';

var isTablet = (width > 899 || height > 899);
var deviceHeight = Ti.Platform.displayCaps.platformHeight;
var deviceWidth = Ti.Platform.displayCaps.platformWidth;

var height = 360;
$.container.height = height+'dp';
$.container.top = (height * args.row)+'dp';


var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
if(args.image.length > 0)
{
	imageLink = args.image;
	if(imageLink.substring(0,4) != 'http')
	{
		imageLink = Alloy.Globals.DOMAIN + imageLink;
	}
};

$.cover.image = imageLink;

if (args.campaing != null)
{
	var pB=Titanium.UI.createProgressBar({
    top:0,
    width:'90%',
    height:'auto',
    min:0,
    max:10,
    value:4,
    color:'#000',
    font:{fontSize:14, fontWeight:'bold'},
    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
});
$.progressBar.add(pB);
pB.show();
$.accomplished.text = '$' + args.received + ' Pledged';
$.days.text = args.days + ' Days to go';
$.percentage.text = args.percent + ' % Funded';
} else {
	$.videos.text = args.videos + ' videos publised.';
	var textInfo = '';  
	if(args.status){
		textInfo = args.status;
	}	
	if((args.about) && (textInfo ==''))
	{
		textInfo =  args.about;	
	} 
	var top = 5;
	if(textInfo != '')
	{
		if(textInfo.length > Alloy.Globals.ABOUT)
		{
			textInfo = textInfo.substring(0,Alloy.Globals.ABOUT - 2) + '...';			
		}
		$.about.text = textInfo;
		$.about.top = 0;
		top = 25;
	}	
	$.views.text = args.views + ' Profile views';
	$.videos.top = top;
	$.views.top = top + 15;	
}


$.videocover.addEventListener('click', function(e){
	var args1 = {
	       video: args.link,	        			
	       author: args.id
	 };
	
	var win = Alloy.createController('viewProfile', args1).getView();	
	if(Ti.Platform.osname == 'android')
	{
		win.fullscreen= false;
		win.open({
		        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
		    });	
	} else {
		var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
		win.open({transition:t});
	}
});		