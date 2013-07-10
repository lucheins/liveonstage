function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        title: Alloy.Globals.NAME_PAGE,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.buttongrid = Alloy.createWidget("com.appcelerator.buttongrid", "widget", {
        id: "buttongrid",
        __parentSymbol: $.__views.index
    });
    $.__views.buttongrid.setParent($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var width = (Ti.Platform.displayCaps.platformWidth - 30) / 2;
    var height = (Ti.Platform.displayCaps.platformWidth - 30) / 4;
    $.buttongrid.init({
        buttons: [ {
            id: "Cloudy",
            title: "Cloudy"
        }, {
            id: "Drizzle",
            title: "Drizzle"
        }, {
            id: "Haze",
            title: "Haze"
        }, {
            id: "Thunderstorms",
            title: "Thunderstorms",
            click: function() {
                var win = Alloy.createController("feed").getView();
                win.open();
            }
        } ],
        buttonWidth: width,
        buttonHeight: height,
        duration: 50,
        backgroundColor: "#fff",
        backgroundSelectedColor: "#f2f2f2"
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;