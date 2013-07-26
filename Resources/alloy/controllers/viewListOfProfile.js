function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
            fontSize: 20,
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
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
    if ("android" == Ti.Platform.osname) {
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
    } else {
        $.container.top = "9%", $.container.height = "91%";
        var args = {
            ventana: $.viewListOfProfile,
            vp: $.vp,
            title: args.authorname + "-" + args.view
        };
        var win = Alloy.createController("actionbarIos", args).getView();
        $.viewListOfProfile.add(win);
    }
    data.getListOfProfile($.activity, $.table, 0, 0, args.author, args.view);
    $.table.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var view = "viewCampaign";
            "Events" == args.view && (view = "viewEvent");
            "Videos" == args.view && (view = "viewVideo");
            var win = Alloy.createController(view, e.source.link).getView();
            win.fullscreen = false;
            if ("android" == Ti.Platform.osname) win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            }); else {
                var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
                win.open({
                    transition: t
                });
            }
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;