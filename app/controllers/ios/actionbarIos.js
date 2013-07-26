
var args = arguments[0] || {};

function closeView (){
	if(args.vp){
	args.vp.hide();
	args.vp.release();
	args.vp = null;
	}
	
	args.ventana.close();
	}

var backArrow = Ti.UI.createLabel({
  color:'Gray',
  text: '\u25c3',
});
$.current.text = args.title;
$.backArrow.add(backArrow);