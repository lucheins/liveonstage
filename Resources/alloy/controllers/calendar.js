function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.calendar = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Calendar",
        id: "calendar"
    });
    $.__views.calendar && $.addTopLevelView($.__views.calendar);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "I am Calendar",
        id: "__alloyId0"
    });
    $.__views.calendar.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;