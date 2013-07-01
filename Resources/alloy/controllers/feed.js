function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.feed = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "feed"
    });
    $.__views.feed && $.addTopLevelView($.__views.feed);
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Load",
        id: "__alloyId3"
    });
    $.__views.feed.add($.__views.__alloyId3);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.feed.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;