var args = arguments[0] || {};
$.title.text = args.title || '';

if(args.check_date == 'date')
{
	$.date.text = args.date || '';	
} else {
	$.date.hide;
}
$.author.text = args.author || '';
$.guest.text = args.guest || '';
$.image.image = args.image;

