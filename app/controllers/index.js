var win = Alloy.createController('tabs').getView();
var nav = Alloy.createController('topMenu').getView();
$.index.add(nav);
$.index.add(win);
$.index.open();