$.artist.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	var win = Alloy.createController('feed').getView();
	win.open();
});