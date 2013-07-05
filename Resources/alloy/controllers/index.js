function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId9 = Ti.UI.createView({
        id: "__alloyId9"
    });
    $.__views.index.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        text: "Soy Pantalla 1",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Alloy.createController("tabs").getView();
    $.index.add(win);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;