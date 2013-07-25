var args = arguments[0] || {};
var height = 360;
$.container.height = '30dp';
$.container.top = (height * args.row)+'dp';

$.text.text = args.text;