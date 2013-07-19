function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.tile = Ti.UI.createView({
        id: "tile"
    });
    $.__views.tile && $.addTopLevelView($.__views.tile);
    $.__views.videocover = Ti.UI.createView({
        width: "100%",
        height: "90%",
        top: 0,
        left: 0,
        id: "videocover"
    });
    $.__views.tile.add($.__views.videocover);
    $.__views.cover = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        id: "cover"
    });
    $.__views.videocover.add($.__views.cover);
    $.__views.coverEfect = Ti.UI.createImageView({
        id: "coverEfect"
    });
    $.__views.videocover.add($.__views.coverEfect);
    $.__views.title = Ti.UI.createLabel({
        height: "10%",
        top: "90%",
        id: "title"
    });
    $.__views.tile.add($.__views.title);
    $.__views.__alloyId6 = Ti.UI.createProgressBar({
        width: "100%",
        id: "__alloyId6"
    });
    $.__views.tile.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        text: "12",
        id: "__alloyId7"
    });
    $.__views.tile.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        text: "13",
        id: "__alloyId8"
    });
    $.__views.tile.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        text: "14",
        id: "__alloyId9"
    });
    $.__views.tile.add($.__views.__alloyId9);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.name || "";
    $.title.link = args.link;
    $.tile.width = "100%";
    Ti.Platform.displayCaps.platformHeight;
    Ti.Platform.displayCaps.platformWidth;
    var height = 240;
    $.tile.height = height + "dp";
    $.tile.top = height * args.row;
    var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
    if (null != args.image) {
        imageLink = args.image;
        "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
    }
    $.cover.image = imageLink;
    $.cover.touchEnabled = false;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;