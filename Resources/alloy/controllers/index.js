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
    $.__views.Navigation = Ti.UI.createView({
        height: "8%",
        top: "0%",
        backgroundColor: "#fff",
        id: "Navigation"
    });
    $.__views.index.add($.__views.Navigation);
    $.__views.__alloyId2 = Ti.UI.createView({
        height: "5%",
        backgroundColor: "#d0d0d0",
        width: "100%",
        bottom: 0,
        id: "__alloyId2"
    });
    $.__views.Navigation.add($.__views.__alloyId2);
    $.__views.banner = Ti.UI.createView({
        height: "54%",
        top: "8%",
        backgroundColor: "red",
        id: "banner"
    });
    $.__views.index.add($.__views.banner);
    $.__views.buttoncontainer = Ti.UI.createView({
        height: "38%",
        top: "62%",
        backgroundColor: "green",
        id: "buttoncontainer"
    });
    $.__views.index.add($.__views.buttoncontainer);
    $.__views.buttongrid = Alloy.createWidget("com.appcelerator.buttongrid", "widget", {
        id: "buttongrid",
        __parentSymbol: $.__views.buttoncontainer
    });
    $.__views.buttongrid.setParent($.__views.buttoncontainer);
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