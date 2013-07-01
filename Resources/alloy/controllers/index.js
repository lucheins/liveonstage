function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId6 = Alloy.createController("feed", {
        id: "__alloyId6"
    });
    $.__views.__alloyId5 = Ti.UI.createTab({
        window: $.__views.__alloyId6.getViewEx({
            recurse: true
        }),
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId5"
    });
    $.__views.index.addTab($.__views.__alloyId5);
    $.__views.__alloyId9 = Alloy.createController("campaigns", {
        id: "__alloyId9"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: true
        }),
        title: "Campaigns",
        icon: "KS_nav_views.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.__alloyId12 = Alloy.createController("artists", {
        id: "__alloyId12"
    });
    $.__views.__alloyId11 = Ti.UI.createTab({
        window: $.__views.__alloyId12.getViewEx({
            recurse: true
        }),
        title: "Artists",
        icon: "KS_nav_views.png",
        id: "__alloyId11"
    });
    $.__views.index.addTab($.__views.__alloyId11);
    $.__views.__alloyId15 = Alloy.createController("calendar", {
        id: "__alloyId15"
    });
    $.__views.__alloyId14 = Ti.UI.createTab({
        window: $.__views.__alloyId15.getViewEx({
            recurse: true
        }),
        title: "Calendar",
        icon: "KS_nav_views.png",
        id: "__alloyId14"
    });
    $.__views.index.addTab($.__views.__alloyId14);
    $.__views.__alloyId18 = Alloy.createController("login", {
        id: "__alloyId18"
    });
    $.__views.__alloyId17 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
            recurse: true
        }),
        title: "Login",
        icon: "KS_nav_views.png",
        id: "__alloyId17"
    });
    $.__views.index.addTab($.__views.__alloyId17);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;