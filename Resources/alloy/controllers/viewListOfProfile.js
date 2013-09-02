function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewListOfProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewListOfProfile = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewListOfProfile"
    });
    $.__views.viewListOfProfile && $.addTopLevelView($.__views.viewListOfProfile);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 100,
        id: "activity"
    });
    $.__views.viewListOfProfile.add($.__views.activity);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.viewListOfProfile.add($.__views.container);
    $.__views.table = Ti.UI.createTableView({
        top: "0dp",
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var data = require("dataExport");
    var actionBar;
    $.viewListOfProfile.addEventListener("open", function() {
        if ($.viewListOfProfile.activity) {
            actionBar = $.viewListOfProfile.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = args.authorname + " - " + args.view;
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    $.viewListOfProfile.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    data.getListOfProfile($.activity, $.table, 0, 0, args.author, args.view);
    $.table.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var view = "viewCampaign";
            "Events" == args.view && (view = "viewEvent");
            "Videos" == args.view && (view = "viewVideo");
            var win = Alloy.createController(view, e.source.link).getView();
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    $.table.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;