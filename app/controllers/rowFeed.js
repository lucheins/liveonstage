var args = arguments[0] || {};
$.title.text = args.title || '';
$.title.link = args.link;
if(args.check_date == 'date')
{
	$.date.text = args.date || '';
	$.date.link = args.link;
} else {
	$.date.hide;
}

if(args.id > 0)
{
	var percent = args.received / 10;
	$.bar.value = percent;
	$.labelBar.text = args.received + '% to goal';
	$.bar.link = args.link;
	$.labelBar.link = args.link;
	$.viewBar.link = args.link;
} else {
	$.viewBar.hide();
	$.bar.height = 10;
	$.bar.hide;
}

$.author.text = args.author || '';
$.guest.text = args.guest || '';
$.image.image = args.image;

$.rowFeed.link = args.link;
$.author.link = args.link;
$.guest.link = args.link;
$.image.link = args.link;
$.imageGuest.link = args.link;