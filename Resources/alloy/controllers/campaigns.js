function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.campaigns = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Campaigns",
        id: "campaigns"
    });
    $.__views.campaigns && $.addTopLevelView($.__views.campaigns);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "I am Campaigns",
        id: "__alloyId2"
    });
    $.__views.campaigns.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;