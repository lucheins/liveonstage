var red = '#900A05';
var brightred = '#B00C07';
var black = '#000000';
var gray = '#888888';
var width = (Ti.Platform.displayCaps.platformWidth-30)/2;
var height = (Ti.Platform.displayCaps.platformWidth-30)/4;


$.buttongrid.init({
    buttons: [
        { id: 'Cloudy', title: "Cloudy" },
        { id: 'Drizzle', title: "Drizzle" },
        { id: 'Haze', title: 'Haze' },
        { id: 'Thunderstorms', title: 'Thunderstorms', click: function (e) { var win = Alloy.createController('feed').getView();
	win.open(); } }
    ],
    buttonWidth: width,
    buttonHeight: height,
    duration: 50,
    backgroundColor: "#fff",
    backgroundSelectedColor: "#f2f2f2"
});

$.index.open();