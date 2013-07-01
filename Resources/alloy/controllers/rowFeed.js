function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowFeed = Ti.UI.createTableViewRow({
        height: "100dp",
        touchEnabled: true,
        hasChild: true,
        id: "rowFeed"
    });
    $.__views.rowFeed && $.addTopLevelView($.__views.rowFeed);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "110dp",
        top: "5dp",
        color: "#6cb1d5",
        id: "title"
    });
    $.__views.rowFeed.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "110dp",
        top: "40dp",
        color: "#717777",
        id: "author"
    });
    $.__views.rowFeed.add($.__views.author);
    $.__views.date = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            height: "auto"
        },
        left: "110dp",
        top: "60dp",
        color: "#717777",
        id: "date"
    });
    $.__views.rowFeed.add($.__views.date);
    $.__views.image = Ti.UI.createImageView({
        width: "98dp",
        height: "80dp",
        left: "5dp",
        top: "10dp",
        id: "image"
    });
    $.__views.rowFeed.add($.__views.image);
    $.__views.guest = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            height: "auto"
        },
        left: "130dp",
        bottom: "5dp",
        color: "#6cb1d5",
        id: "guest"
    });
    $.__views.rowFeed.add($.__views.guest);
    $.__views.imageGuest = Ti.UI.createImageView({
        image: "/images/guest.png",
        left: "110dp",
        bottom: "5dp",
        width: "17dp",
        height: "17dp",
        id: "imageGuest"
    });
    $.__views.rowFeed.add($.__views.imageGuest);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.title || "";
    "date" == args.check_date ? $.date.text = args.date || "" : $.date.hide;
    $.author.text = args.author || "";
    $.guest.text = args.guest || "";
    $.image.image = args.image;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;