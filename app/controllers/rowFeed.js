var args = arguments[0] || {};
$.title.text = args.title || '';

if(args.check_date == 'date')
{
	$.date.text = args.date || '';	
} else {
	$.date.hide;
}

if(args.id > 0)
{
	var percent = args.received / 10;
	$.bar.value = percent;
	$.labelBar.text = args.received + '% to goal'
} else {
	$.viewBar.hide();
	$.bar.height = 10;
	$.bar.hide;
}

$.author.text = args.author || '';
$.guest.text = args.guest || '';
$.image.image = args.image;

