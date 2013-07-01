function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId9 = Alloy.createController("feed", {
        id: "__alloyId9"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: true
        }),
        title: "Feed",
        icon: "KS_nav_ui.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.__alloyId11 = Alloy.createController("campaigns", {
        id: "__alloyId11"
    });
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11.getViewEx({
            recurse: true
        }),
        title: "Campaigns",
        icon: "KS_nav_views.png",
        id: "__alloyId10"
    });
    $.__views.index.addTab($.__views.__alloyId10);
    $.__views.__alloyId14 = Alloy.createController("artists", {
        id: "__alloyId14"
    });
    $.__views.__alloyId13 = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: true
        }),
        title: "Artists",
        icon: "KS_nav_views.png",
        id: "__alloyId13"
    });
    $.__views.index.addTab($.__views.__alloyId13);
    $.__views.__alloyId17 = Alloy.createController("calendar", {
        id: "__alloyId17"
    });
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.__alloyId17.getViewEx({
            recurse: true
        }),
        title: "Calendar",
        icon: "KS_nav_views.png",
        id: "__alloyId16"
    });
    $.__views.index.addTab($.__views.__alloyId16);
    $.__views.__alloyId20 = Alloy.createController("login", {
        id: "__alloyId20"
    });
    $.__views.__alloyId19 = Ti.UI.createTab({
        window: $.__views.__alloyId20.getViewEx({
            recurse: true
        }),
        title: "Login",
        icon: "KS_nav_views.png",
        id: "__alloyId19"
    });
    $.__views.index.addTab($.__views.__alloyId19);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;