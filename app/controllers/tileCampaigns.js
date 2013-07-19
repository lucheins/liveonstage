var args = arguments[0] || {};
$.title.text = args.name || '';
$.title.link = args.link;
$.tile.width = '100%';


var isTablet = (width > 899 || height > 899);
var deviceHeight = Ti.Platform.displayCaps.platformHeight;
var deviceWidth = Ti.Platform.displayCaps.platformWidth;

var height = 240;
$.tile.height = height+'dp';
$.tile.top = height * args.row;


var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
if(args.image != null)
{
	imageLink = args.image;
	if(imageLink.substring(0,4) != 'http')
	{
		imageLink = Alloy.Globals.DOMAIN + imageLink;
	}
}

$.cover.image = imageLink;
$.cover.touchEnabled = false

		